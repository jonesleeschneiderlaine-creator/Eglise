import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '../../lib/supabase';

const AuthContext = createContext(null);

const fetchProfile = async (userId) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

    if (error) throw error;
    return data;
};

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const authSyncPausedRef = useRef(false);

    const syncAuth = useCallback(async (nextSession, options = {}) => {
        if (authSyncPausedRef.current && !options.force) {
            return;
        }

        setSession(nextSession);
        setError('');

        if (!nextSession?.user) {
            setProfile(null);
            setLoading(false);
            return;
        }

        try {
            const nextProfile = await fetchProfile(nextSession.user.id);

            if (!nextProfile) {
                await supabase.auth.signOut();
                setProfile(null);
                setError('Compte non autorise.');
            } else {
                setProfile(nextProfile);
            }
        } catch (profileError) {
            setProfile(null);
            setError(profileError.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            syncAuth(data.session, { force: true });
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, nextSession) => {
            syncAuth(nextSession);
        });

        return () => subscription.unsubscribe();
    }, [syncAuth]);

    const signIn = async ({ email, password }) => {
        setLoading(true);
        setError('');

        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
        });

        if (signInError) {
            setLoading(false);
            setError('Connexion echouee. Verifiez email et mot de passe.');
            throw signInError;
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setProfile(null);
        setSession(null);
        setLoading(false);
    };

    const refreshProfile = async () => {
        if (!session?.user?.id) return null;
        const nextProfile = await fetchProfile(session.user.id);
        setProfile(nextProfile);
        return nextProfile;
    };

    const runWithAuthStateSuppressed = async (callback) => {
        const previousSession = session;
        const previousProfile = profile;

        authSyncPausedRef.current = true;

        try {
            return await callback({ previousSession, previousProfile });
        } finally {
            authSyncPausedRef.current = false;

            if (previousSession?.access_token && previousSession?.refresh_token) {
                await supabase.auth.setSession({
                    access_token: previousSession.access_token,
                    refresh_token: previousSession.refresh_token,
                });
                setSession(previousSession);
                setProfile(previousProfile);
                setLoading(false);
            } else {
                const {
                    data: { session: latestSession },
                } = await supabase.auth.getSession();
                await syncAuth(latestSession, { force: true });
            }
        }
    };

    const value = useMemo(() => ({
        session,
        profile,
        loading,
        error,
        isAuthenticated: Boolean(session?.user && profile),
        signIn,
        signOut,
        refreshProfile,
        runWithAuthStateSuppressed,
        setError,
    }), [session, profile, loading, error]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }

    return context;
};
