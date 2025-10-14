import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")! // required for admin updates
);

// 🔧 Define reusable CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // or replace * with your domain for production
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  // ✅ Handle preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { user_id, email, password, profile_updates } = await req.json();

    // 1️⃣ Update email/password in auth.users
    if (email || password) {
      const { error: authError } = await supabase.auth.admin.updateUserById(user_id, {
        email,
        password,
      });
      if (authError) throw authError;
    }

    // 2️⃣ Merge the email into your users table update (if provided)
    const updates = {
      ...(profile_updates || {}),
      ...(email ? { email } : {}),
    };

    // 3️⃣ Update your users table
    if (Object.keys(updates).length > 0) {
      const { error: userError } = await supabase
        .from("users")
        .update(updates)
        .eq("id", user_id);

      if (userError) throw userError;
    }

    // 4️⃣ Return success response
    return new Response(
      JSON.stringify({ success: true, message: "User updated in both tables." }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    console.error("Update error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: corsHeaders,
    });
  }
});
