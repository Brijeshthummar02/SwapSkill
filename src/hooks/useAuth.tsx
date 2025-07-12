import { useState, useEffect, createContext, useContext } from 'react';
import { authHelpers } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  refetchUser: () => void;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  refetchUser: () => {},
  onLogin: () => {},
  onRegister: () => {},
  onLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });

  const refetchUser = async () => {
    const { data } = await authHelpers.getSession();
    setSession(data.session);
    setUser(data.session?.user ?? null);
  };

  useEffect(() => {
    const getSession = async () => {
      await refetchUser();
      setLoading(false);
    };

    getSession();

    const { data: authListener } = authHelpers.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const onLogin = () => setAuthModal({ isOpen: true, mode: 'login' });
  const onRegister = () => setAuthModal({ isOpen: true, mode: 'register' });
  const onLogout = async () => {
    await authHelpers.signOut();
  };

  const value = {
    session,
    user,
    loading,
    refetchUser,
    onLogin,
    onRegister,
    onLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {/* Render AuthModal here so it can be triggered from anywhere */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};