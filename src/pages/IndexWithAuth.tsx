import React from "react";
import { useAuth } from "@/hooks/useAuth";
import Index from "@/pages/Index";
import { authHelpers } from "@/lib/supabase";

const IndexWithAuth = () => {
  const { user } = useAuth();

  const handleLogin = async (loginData: {
    email: string;
    password: string;
  }) => {
    try {
      const { error } = await authHelpers.signIn(loginData.email, loginData.password);
      if (error) {
        console.error("Login error:", error);
        throw error;
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const handleRegister = async (registerData: {
    name: string;
    email: string;
    password: string;
    location: string;
  }) => {
    try {
      const { error } = await authHelpers.signUp(
        registerData.email,
        registerData.password,
        {
          full_name: registerData.name,
          location: registerData.location,
        }
      );
      if (error) {
        console.error("Registration error:", error);
        throw error;
      }
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await authHelpers.signOut();
      if (error) {
        console.error("Logout error:", error);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Transform Supabase user to match expected interface
  const currentUser = user
    ? {
        id: user.id,
        name: user.user_metadata?.full_name || user.email || "User",
        email: user.email || "",
        profilePhoto: user.user_metadata?.avatar_url || null,
        isOnline: true,
        rating: 0,
        reviewCount: 0,
        location: user.user_metadata?.location || "",
      }
    : null;

  return (
    <Index
      currentUser={currentUser}
      onLogin={handleLogin}
      onRegister={handleRegister}
      onLogout={handleLogout}
    />
  );
};

export default IndexWithAuth;
