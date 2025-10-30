import { useEffect, useState, useRef } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from './routes/router.jsx';
import supabase from "./supabase-client";
import { SessionContext } from "./components/hooks/SessionContext.jsx";

const IDLE_TIMEOUT_MINUTES = 15; // logout after 15 min idle
const CHECK_INTERVAL_MS = 60 * 1000; // check every 1 min
const LAST_ACTIVE_UPDATE_MS = 10 * 60 * 1000; // update last_active in DB max every 10 min

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // refs to avoid triggering effects multiple times
  const lastActiveRef = useRef(new Date());
  const lastDbUpdateRef = useRef(new Date(0));
  const hasLoggedOutRef = useRef(false);

  // Get session and listen for auth changes
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Listen for online/offline changes
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Update last_active and handle idle logout
  useEffect(() => {
    if (!session?.user?.id) return;

    const userId = session.user.id;

    // Debounced update function
    const updateLastActive = async () => {
      const now = new Date();
      lastActiveRef.current = now;

      // Only update DB if enough time passed and online
      if (now - lastDbUpdateRef.current >= LAST_ACTIVE_UPDATE_MS && isOnline) {
        try {
          await supabase.from("users").update({ last_active: now }).eq("id", userId);
          lastDbUpdateRef.current = now;
        } catch (err) {
          console.warn("Could not update last_active:", err.message);
        }
      }
    };

    // User activity events
    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach(e => window.addEventListener(e, updateLastActive));

    // Idle check interval
    const interval = setInterval(async () => {
      const diffMinutes = (new Date() - lastActiveRef.current) / 1000 / 60;
      if (diffMinutes > IDLE_TIMEOUT_MINUTES && !hasLoggedOutRef.current) {
        hasLoggedOutRef.current = true; // ensure only logs out once
        alert("Session expired due to inactivity.");

        try {
          if (isOnline) {
            await supabase.from("users").update({ is_logged_in: false, last_active: null }).eq("id", userId);
          }
          await supabase.auth.signOut();
        } catch (err) {
          console.warn("Logout error (offline?):", err.message);
        }
        window.location.href = "/login";
      }
    }, CHECK_INTERVAL_MS);

    // Sync last_active when coming online
    const syncLastActive = async () => {
      if (!session?.user?.id) return;
      try {
        await supabase.from("users").update({ last_active: lastActiveRef.current }).eq("id", userId);
        lastDbUpdateRef.current = new Date();
      } catch (err) {
        console.warn("Sync failed:", err.message);
      }
    };
    window.addEventListener("online", syncLastActive);

    return () => {
      events.forEach(e => window.removeEventListener(e, updateLastActive));
      window.removeEventListener("online", syncLastActive);
      clearInterval(interval);
    };
  }, [session, isOnline]);

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
  );
}
