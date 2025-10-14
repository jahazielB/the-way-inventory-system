import supabase from "../supabase-client";

export async function deleteUser(user_id) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { success: false, message: "No active session" };
  }

  const res = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-user`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ user_id }),
    }
  );

  const data = await res.json();
  if (!res.ok) return { success: false, message: data.error || "Failed" };
  return { success: true, message: data.message };
}
