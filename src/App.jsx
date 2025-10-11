import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from './routes/router.jsx'
import supabase from "./supabase-client"
import { SessionContext } from "./components/hooks/SessionContext.jsx";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current session (if user already logged in)
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
      // console.log(data.session)
    };
    getSession();

    // Listen for auth state changes (login/logout/refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Checking session...
      </div>
    );
  }

  return (
    <SessionContext.Provider value={session}>
      <RouterProvider router={router} />
    </SessionContext.Provider>
  );;
}

