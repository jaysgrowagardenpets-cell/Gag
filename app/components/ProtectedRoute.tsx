import React from "react";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback = (
    <div className="min-h-screen bg-strawberry-light flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🍓</div>
        <h2 className="text-2xl font-bold text-strawberry-dark mb-4">
          Access Denied
        </h2>
        <p className="text-gray-600 mb-6">
          You need to be logged in to access this page.
        </p>
        <button
          onClick={() => (window.location.href = "/#login")}
          className="btn-strawberry"
        >
          Sign In
        </button>
      </div>
    </div>
  ),
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-strawberry-light flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">🍓</div>
          <p className="text-strawberry-primary text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
