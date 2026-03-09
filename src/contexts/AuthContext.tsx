import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null, user: null, isAdmin: false, loading: true,
  signIn: async () => ({ error: null }), signOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const resolveAdminRole = async (nextUser: User | null) => {
      if (!nextUser) {
        if (isMounted) setIsAdmin(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc("has_role", { _user_id: nextUser.id, _role: "admin" });

        if (error) {
          console.error("Failed to resolve admin role", error);
          if (isMounted) setIsAdmin(false);
          return;
        }

        if (isMounted) setIsAdmin(!!data);
      } catch (error) {
        console.error("Unexpected admin role check failure", error);
        if (isMounted) setIsAdmin(false);
      }
    };

    const applySession = async (nextSession: Session | null) => {
      if (!isMounted) return;

      setSession(nextSession);
      const nextUser = nextSession?.user ?? null;
      setUser(nextUser);
      await resolveAdminRole(nextUser);

      if (isMounted) setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      void applySession(nextSession);
    });

    supabase.auth
      .getSession()
      .then(({ data: { session: nextSession } }) => {
        void applySession(nextSession);
      })
      .catch((error) => {
        console.error("Failed to load session", error);
        if (isMounted) {
          setSession(null);
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ session, user, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
