import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase-client";
import LandingPage from "./landingpage";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error || !data.session) throw new Error("No active session");

        const user = data.session.user;

        // Look up role in your `users` table
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .single();

        if (userError || !userData) {
          await supabase.auth.signOut();
          alert("Account not found in users table.");
          navigate("/login");
          return;
        }
        await supabase
          .from("users")
          .update({ is_logged_in: true, last_active: new Date() })
          .eq("id", user.id);

        // Redirect based on role
        if (userData.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/user");
        }
      } catch (err) {
        console.error("Auth callback error:", err.message);
        navigate("/login");
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen text-lg">
      Verifying...
    </div>
  );
};

export default AuthCallback;
