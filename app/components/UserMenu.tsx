import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useAdmin } from "../contexts/AdminContext";

export const UserMenu: React.FC = () => {
  const { user, logOut } = useAuth();
  const { isAdmin } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-strawberry-accent transition-colors"
      >
        <div className="w-8 h-8 bg-strawberry-accent rounded-full flex items-center justify-center">
          <span className="text-strawberry-dark font-semibold text-sm">
            {user.displayName?.charAt(0).toUpperCase() ||
              user.email?.charAt(0).toUpperCase() ||
              "U"}
          </span>
        </div>
        <span className="hidden md:block font-medium">
          {user.displayName || user.email}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {user.displayName || "User"}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>

          <a
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors block"
          >
            👤 Dashboard
          </a>

          {isAdmin && (
            <a
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-2 text-sm text-strawberry-primary hover:bg-strawberry-light transition-colors block font-medium"
            >
              ⚙️ Admin Panel
            </a>
          )}

          <button
            onClick={() => {
              // Handle orders navigation
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            🛒 My Orders
          </button>

          <button
            onClick={() => {
              // Handle favorites navigation
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            ❤️ Favorites
          </button>

          <div className="border-t border-gray-100 mt-2 pt-2">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              🚪 Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
