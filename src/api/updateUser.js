import supabase from "../supabase-client";

export const updateUser = async (userId, email, password, profileUpdates = {}) => {
  try {
    const {data:{session}}= await supabase.auth.getSession()

    if (!session){
        console.error("No session found")
        return {success:false ,message: "user not authenticated"}
    }
    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/update-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          user_id: userId,
          email,
          password,
          profile_updates: profileUpdates,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to update user");

    return { success: true, message: data.message || "User updated successfully" };
  } catch (err) {
    console.error("❌ updateUser error:", err);
    return { success: false, message: err.message };
  }
};
