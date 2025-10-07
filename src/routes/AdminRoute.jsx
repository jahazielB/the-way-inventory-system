import { Navigate,Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase-client"

export const AdminRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      // Get user role from your "users" table
      const { data: userData } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      setAuthorized(userData?.role === "admin");
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <div className="p-4">Checking authentication...</div>;
  if (!authorized) return <Navigate to="/login" replace />;

  return <Outlet/>;
};
