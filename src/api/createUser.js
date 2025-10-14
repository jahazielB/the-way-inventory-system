// src/api/createUser.js
import supabase from "../supabase-client";
const SUPABASE_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-user`;

export async function createUser({ email, password, role, profile_name }) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch(SUPABASE_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ email, password, role, profile_name }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to create user");
    }

    return data; // success response from your Edge Function
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw error;
  }
}
