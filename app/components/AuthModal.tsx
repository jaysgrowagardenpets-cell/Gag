import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  mode,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(mode === "login");

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLoginMode) {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error);
        } else {
          onClose();
          setEmail("");
          setPassword("");
        }
      } else {
        const { error } = await signUp(email, password, displayName);
        if (error) {
          setError(error);
        } else {
          onClose();
          setEmail("");
          setPassword("");
          setDisplayName("");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError("");
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-strawberry-dark">
            {isLoginMode ? "🍓 Welcome Back!" : "🍓 Join Our Garden!"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginMode && (
            <div>
              <label
                htmlFor="displayName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Display Name
              </label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required={!isLoginMode}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-strawberry-primary focus:border-transparent"
                placeholder="Enter your display name"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-strawberry-primary focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-strawberry-primary focus:border-transparent"
              placeholder="Enter your password"
              minLength={6}
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-strawberry disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : isLoginMode ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLoginMode
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              onClick={toggleMode}
              className="ml-2 text-strawberry-primary hover:text-strawberry-dark font-medium"
            >
              {isLoginMode ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              // Handle forgot password
              const email = prompt("Enter your email to reset password:");
              if (email) {
                // You can implement password reset here
                alert("Password reset email sent!");
              }
            }}
            className="text-sm text-strawberry-primary hover:text-strawberry-dark"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};
