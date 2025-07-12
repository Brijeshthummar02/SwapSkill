import { useState, useEffect, createContext, useContext } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import type { AdminUser } from "@/types/admin";
import { useAuth } from "./useAuth";

interface AdminAuthContextType {
  isAdmin: boolean;
  adminUser: AdminUser | null;
  loading: boolean;
  checkAdminAccess: (user: User | null) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAdmin: false,
  adminUser: null,
  loading: true,
  checkAdminAccess: () => false,
});

export const AdminAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user: currentUser } = useAuth();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAdminAccess = (user: User | null): boolean => {
    if (!user) return false;

    try {
      // Check if user has admin role in user metadata or custom claims
      const userRole = user.user_metadata?.role || user.app_metadata?.role;

      return (
        userRole === "admin" || user.email === import.meta.env.VITE_ADMIN_EMAIL
      );
    } catch (error) {
      console.error("Error checking admin access:", error);
      return false;
    }
  };

  useEffect(() => {
    const initializeAdminCheck = async () => {
      if (currentUser) {
        const isAdminUser = checkAdminAccess(currentUser);
        if (isAdminUser) {
          setAdminUser({
            id: currentUser.id,
            email: currentUser.email || "",
            name:
              currentUser.user_metadata?.full_name ||
              currentUser.email ||
              "Admin User",
            isAdmin: true,
            adminPermissions: [
              { id: "1", name: "user_management", description: "Manage users" },
              {
                id: "2",
                name: "content_moderation",
                description: "Moderate content",
              },
              {
                id: "3",
                name: "swap_monitoring",
                description: "Monitor swaps",
              },
              {
                id: "4",
                name: "communications",
                description: "Send announcements",
              },
              {
                id: "5",
                name: "reports_analytics",
                description: "View reports",
              },
            ],
            lastAdminActivity: new Date().toISOString(),
          });
        } else {
          setAdminUser(null);
        }
      } else {
        setAdminUser(null);
      }
      setLoading(false);
    };

    initializeAdminCheck();
  }, [currentUser]);

  return (
    <AdminAuthContext.Provider
      value={{
        isAdmin: !!adminUser,
        adminUser,
        loading,
        checkAdminAccess,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

export { AdminAuthContext };
