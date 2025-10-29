import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from './routes/router.jsx';
import supabase from "./supabase-client";
import { SessionContext } from "./components/hooks/SessionContext.jsx";

const IDLE_TIMEOUT_MINUTES = 15; // test with 15 mins
const CHECK_INTERVAL_MS = 5 * 60 * 1000; // check every 5 min
const LAST_ACTIVE_UPDATE_MS = 10 *60 * 1000; // update last_active in DB max every 10 min

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastActiveLocal, setLastActiveLocal] = useState(new Date());
  const [lastDbUpdate, setLastDbUpdate] = useState(new Date(0));
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Get current session and listen for auth changes
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

  useEffect(() => {
    if (!session?.user?.id) return;

    const userId = session.user.id;

    const updateLastActive = async () => {
      const now = new Date();
      setLastActiveLocal(now);

      // Throttle DB updates
      if (now - lastDbUpdate > LAST_ACTIVE_UPDATE_MS && isOnline) {
        try {
          await supabase.from("users").update({ last_active: now }).eq("id", userId);
          setLastDbUpdate(now);
        } catch (err) {
          console.warn("Could not update last_active:", err.message);
        }
      }
    };

    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach(e => window.addEventListener(e, updateLastActive));

    const interval = setInterval(async () => {
      const diffMinutes = (new Date() - lastActiveLocal) / 1000 / 60;
      if (diffMinutes > IDLE_TIMEOUT_MINUTES) {
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

    // When user comes back online, sync last_active if needed
    const syncLastActive = async () => {
      if (!session?.user?.id) return;
      try {
        await supabase.from("users").update({ last_active: lastActiveLocal }).eq("id", userId);
      } catch (err) {
        console.warn("Sync failed:", err.message);
      }
    };

    if (isOnline) syncLastActive();

    window.addEventListener("online", syncLastActive);

    return () => {
      events.forEach(e => window.removeEventListener(e, updateLastActive));
      window.removeEventListener("online", syncLastActive);
      clearInterval(interval);
    };
  }, [session, lastActiveLocal, lastDbUpdate, isOnline]);

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
