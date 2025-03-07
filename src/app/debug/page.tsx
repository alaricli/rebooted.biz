"use client";

import { useAuth } from "../context/auth_context";

export default function DebugPage() {
  const { isAuthenticated, checkAuth, logout } = useAuth();

  const handleTestLogin = async () => {
    const response = await fetch("http://localhost:8080/api/public/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "user2",
        password: "password",
      }),
      credentials: "include",
    });
    console.log(response);
    if (response.ok) {
      checkAuth(); // Update auth state after successful login
    }
  };

  return (
    <div>
      <main className="container mx-auto min-h-screen flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center p-4">Debug</h1>
        <div className="flex flex-col gap-4 border-2 border-gray-300 rounded-md p-4">
          <h2>Check Auth:</h2>
          <div>
            {isAuthenticated ? (
              <div>
                <p className="text-green-500">Authenticated</p>
              </div>
            ) : (
              <div>
                <p className="text-red-500">Not Authenticated</p>
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleTestLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Login
            </button>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
