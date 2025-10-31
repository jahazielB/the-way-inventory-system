import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import type { Database } from "../../_shared/database.types"; // optional if you have typed schema

// Initialize Supabase client with service role key
const supabase = createClient<Database>(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// Common CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // or specify your domain like "https://yourapp.vercel.app"
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req) => {
  // Handle CORS preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Calculate cutoff date (60 days ago)
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 60);

    // Delete approvals older than 60 days
    const { error, count } = await supabase
      .from("approvals")
      .delete({ count: "exact" })
      .lt("created_at", cutoffDate.toISOString());

    if (error) {
      console.error("❌ Error deleting old approvals:", error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    

    return new Response(
      JSON.stringify({
        success: true,
        deleted_count: count ?? 0,
        cutoff_date: cutoffDate.toISOString(),
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("⚠️ Unexpected error:", err);
    return new Response(
      JSON.stringify({ success: false, error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
