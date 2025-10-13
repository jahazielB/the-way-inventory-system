import { Navigate,Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase-client"
import { useSession } from "../components/hooks/SessionContext";

export const AdminRoute = ({ allowedRoles }) => {
  const session = useSession();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkAuth = async () => {
    if (!session) {
      setAuthorized(false);
      setLoading(false);
      return;
    }
      // Get user role from your "users" table
      const { data: userData,error } = await supabase
        .from("users")
        .select("role")
        .eq("id", session.user.id)
        .single();
    if (error){
        console.error("Error: ", error.message)
        setAuthorized(false)

    }else{
        setAuthorized(allowedRoles.includes(userData?.role));
      
    }
    setLoading(false);
}

    
    checkAuth();
  }, [session,allowedRoles]);

  if (loading) return <div className="flex items-center justify-center h-screen text-lg">Checking authentication...</div>;
  if (!authorized) return <Navigate to="/login" replace />;

  return <Outlet/>;
};
