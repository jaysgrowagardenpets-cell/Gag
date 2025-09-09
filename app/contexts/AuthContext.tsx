import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChange } from "../lib/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<{ user: User | null; error: string | null }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ user: User | null; error: string | null }>;
  logOut: () => Promise<{ error: string | null }>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    const { signUp: firebaseSignUp } = await import("../lib/auth");
    return firebaseSignUp(email, password, displayName);
  };

  const signIn = async (email: string, password: string) => {
    const { signIn: firebaseSignIn } = await import("../lib/auth");
    return firebaseSignIn(email, password);
  };

  const logOut = async () => {
    const { logOut: firebaseLogOut } = await import("../lib/auth");
    return firebaseLogOut();
  };

  const resetPassword = async (email: string) => {
    const { resetPassword: firebaseResetPassword } = await import(
      "../lib/auth"
    );
    return firebaseResetPassword(email);
  };

  const value: AuthContextType = {
    user,
    loading,
    signUp,
    signIn,
    logOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
