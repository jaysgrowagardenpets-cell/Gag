import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { useAuth } from "./AuthContext";

interface AdminContextType {
  isAdmin: boolean;
  adminLoading: boolean;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  adminLoading: true,
});

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

interface AdminProviderProps {
  children: React.ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setAdminLoading(true);
      return;
    }

    if (user && user.email === "jaysgrowagardenpets@gmail.com") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }

    setAdminLoading(false);
  }, [user, loading]);

  const value = {
    isAdmin,
    adminLoading,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
