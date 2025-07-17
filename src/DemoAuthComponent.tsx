import React from "react";
import { useAuth } from "./hooks/useAuth";

const DemoAuthComponent: React.FC = () => {
  const { user, isAuthenticated, login, logout, loading, setLoading } =
    useAuth();

  const handleLogin = async () => {
    setLoading(true);
    // Simulate async login (e.g., API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    login({ id: "1", email: "user@example.com", name: "Demo User" });
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow mt-8">
      <h1 className="text-xl font-bold mb-2">Auth Demo</h1>
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
          <span className="text-blue-500 font-semibold">Loading...</span>
        </div>
      ) : isAuthenticated ? (
        <>
          <p className="mb-2">Welcome, {user?.email}!</p>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={logout}
          >
            Logout
          </button>
        </>
      ) : (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleLogin}
        >
          Login as Demo User
        </button>
      )}
    </div>
  );
};

export default DemoAuthComponent;
