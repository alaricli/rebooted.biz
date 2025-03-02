"use client";

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
const AccountPage: React.FC = () => {
  const router = useRouter();

  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/public/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(true);
        router.push("/account");
      }

      if (response.status === 401) {
        setWrongPassword(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  async function handleLogout() {
    setIsAuthenticated(false);
    router.push("/account");
  }

  return (
    <div>
      {isAuthenticated ? (
        <div className="flex flex-col items-center justify-center h-screen space-y-2">
          <h1>Your Account</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen space-y-2">
          <h1 className="text-2xl font-bold">Login</h1>
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center justify-center space-y-2"
          >
            <input
              type="username"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded-md"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Login
            </button>
          </form>
          {wrongPassword && (
            <div>
              <div className="flex items-center justify-center space-y-2">
                <h2 className="text-red-500">
                  Invalid username and/or password
                </h2>
                <div className="flex items-center justify-center space-x-2">
                  <h2>Forgot your password?</h2>
                  <button className="border p-2 rounded-md">
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center justify-center space-x-2">
            <h2>Don't have an account?</h2>
            <button className="border p-2 rounded-md">Sign Up</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
