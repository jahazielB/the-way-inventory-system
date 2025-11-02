// Disable Supabase JWT auth so we can use our custom CRON secret
export const config = {
  auth: false,
};

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import type { Database } from "../../_shared/database.types"; // optional

const supabase = createClient<Database>(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const CRON_SECRET = Deno.env.get("CRON_SECRET");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // 🔒 Custom Bearer auth check
  const authHeader = req.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${CRON_SECRET}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: corsHeaders,
    });
  }

  try {
    // 🧹 Example logic: delete records older than 60 days
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 60);

    const { error, count } = await supabase
      .from("approvals")
      .delete({ count: "exact" })
      .lt("created_at", cutoffDate.toISOString());

    if (error) throw error;

    return new Response(
      JSON.stringify({
        success: true,
        deleted_count: count ?? 0,
        cutoff_date: cutoffDate.toISOString(),
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
