"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  checkAuth: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function checkAuth() {
    console.log("Checking auth");
    try {
      const response = await fetch(
        "http://localhost:8080/api/user/user-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking auth", error);
      setIsAuthenticated(false);
    }
  }

  async function logout() {
    try {
      const response = await fetch("http://localhost:8080/api/public/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setIsAuthenticated(false);
      } else {
        console.error("Error logging out");
      }
    } catch (error) {
      console.error("Error logging out", error);
    }
  }

  useEffect(() => {
    try {
      checkAuth();
    } catch (error) {
      console.error("Error checking auth", error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
