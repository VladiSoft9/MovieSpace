import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../supabase";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            console.log("Current session:", session);
            setLoading(false);
        };
        fetchSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

  const signUp = (email, password) =>
    supabase.auth.signUp({ email, password });

  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });

  const signOut = () => supabase.auth.signOut();

    return (
        <AuthContext.Provider value={{ session, loading, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export { AuthProvider, useAuth };