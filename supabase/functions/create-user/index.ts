// supabase/functions/create-user/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, serviceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // or set to "http://localhost:5173" if you want to restrict
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};


serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {status:200, headers: corsHeaders });
  }
  // Only allow POST
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const { email, password, role, profile_name} = await req.json();

    if (!email || !password || !role || !profile_name) {
      return new Response("Missing required fields", { status: 400 , headers: { ...corsHeaders,"Content-Type": "application/json" }});
    }

    // Create auth user using the service role key
    const { data: user, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // skip email verification
    });

    if (createError) throw createError;

    // Insert into your custom users table
    const { error: insertError } = await supabase
      .from("users")
      .insert([{ id: user.user.id, email, role, profile_name, created_at:new Date() }]);

    if (insertError) throw insertError;

    return new Response(
      JSON.stringify({ success: true, user: user.user, message: `User ${email} created successfully.`  }),
      {
        headers: { ...corsHeaders,"Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders,"Content-Type": "application/json" },
      status: 500,
    });
  }
});
