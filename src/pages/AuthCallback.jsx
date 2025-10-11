import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase-client";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
        navigate("/login");
        return;
      }

      if (data.session) {
        const { data: userData, error:userError } = await supabase
          .from("users")
          .select("role")
          .eq("id", data.session.user.id)
          .single();
// If not found → logout + redirect
        if (userError||!userData){
            await supabase.auth.signOut();
            alert("This account isn't registered!")
            navigate("/login")
            return
        }

        if (userData?.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/user");
        }
      } else {
        navigate("/login");
      }
    };

    handleCallback();
  }, [navigate]);


  return (
    <div className="flex items-center justify-center h-screen text-lg">
      Checking session...
    </div>
  );
};

export default AuthCallback;
