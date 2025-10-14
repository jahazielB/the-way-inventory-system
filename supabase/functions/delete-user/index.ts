import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")! // needed for admin delete
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response("Missing Authorization header", {
        status: 401,
        headers: corsHeaders,
      });
    }

    // Optional: verify the user calling this is allowed (e.g., admin)
    const token = authHeader.replace("Bearer ", "");
    const supabaseAuth = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    const {
      data: { user },
    } = await supabaseAuth.auth.getUser();

    if (!user) {
      return new Response("Invalid user session", {
        status: 401,
        headers: corsHeaders,
      });
    }

    // ✅ parse user_id to delete
    const { user_id } = await req.json();
    if (!user_id)
      return new Response("Missing user_id", {
        status: 400,
        headers: corsHeaders,
      });

    // 1️⃣ Delete from auth
    const { error: authError } = await supabase.auth.admin.deleteUser(user_id);
    if (authError) throw authError;

    // 2️⃣ Delete from your users table
    const { error: dbError } = await supabase.from("users").delete().eq("id", user_id);
    if (dbError) throw dbError;

    return new Response(
      JSON.stringify({ success: true, message: "User deleted successfully." }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    console.error("Delete error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: corsHeaders,
    });
  }
});
