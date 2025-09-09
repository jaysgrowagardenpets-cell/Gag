import type { Route } from "./+types/dashboard";
import { useAuth } from "../contexts/AuthContext";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { trackPageView } from "../lib/analytics";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - Elder Strawberry Garden" },
    {
      name: "description",
      content:
        "Your personal dashboard for managing your pet collection and orders.",
    },
  ];
}

export default function Dashboard() {
  const { user } = useAuth();

  useEffect(() => {
    if (typeof window !== "undefined") {
      trackPageView("Dashboard");
    }
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-strawberry-light">
        {/* Navigation */}
        <nav className="bg-strawberry-gradient shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <span className="text-3xl">🍓</span>
                <div className="text-white">
                  <h1 className="text-xl font-bold">Elder Strawberry Garden</h1>
                  <p className="text-sm opacity-90">Dashboard</p>
                </div>
              </div>
              <a
                href="/"
                className="text-white hover:text-strawberry-accent transition-colors font-medium"
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-strawberry-dark mb-2">
              Welcome back, {user?.displayName || "Gardener"}! 🍓
            </h1>
            <p className="text-lg text-gray-600">
              Manage your pet collection and track your orders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* My Pets Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-3 border-strawberry-accent">
              <div className="text-center">
                <div className="text-4xl mb-4">🐾</div>
                <h3 className="text-xl font-bold text-strawberry-dark mb-2">
                  My Pets
                </h3>
                <p className="text-gray-600 mb-4">
                  View and manage your pet collection
                </p>
                <button className="btn-strawberry-secondary w-full">
                  View Collection
                </button>
              </div>
            </div>

            {/* Orders Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-3 border-strawberry-accent">
              <div className="text-center">
                <div className="text-4xl mb-4">📦</div>
                <h3 className="text-xl font-bold text-strawberry-dark mb-2">
                  My Orders
                </h3>
                <p className="text-gray-600 mb-4">
                  Track your recent purchases
                </p>
                <button className="btn-strawberry-secondary w-full">
                  View Orders
                </button>
              </div>
            </div>

            {/* Favorites Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-3 border-strawberry-accent">
              <div className="text-center">
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-xl font-bold text-strawberry-dark mb-2">
                  Favorites
                </h3>
                <p className="text-gray-600 mb-4">
                  Your saved pets and wishlist
                </p>
                <button className="btn-strawberry-secondary w-full">
                  View Favorites
                </button>
              </div>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-3 border-strawberry-accent">
              <div className="text-center">
                <div className="text-4xl mb-4">👤</div>
                <h3 className="text-xl font-bold text-strawberry-dark mb-2">
                  Profile
                </h3>
                <p className="text-gray-600 mb-4">
                  Manage your account settings
                </p>
                <button className="btn-strawberry-secondary w-full">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Statistics Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-3 border-strawberry-accent">
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-strawberry-dark mb-2">
                  Statistics
                </h3>
                <p className="text-gray-600 mb-4">Your garden statistics</p>
                <div className="text-2xl font-bold text-strawberry-primary">
                  0
                </div>
                <p className="text-sm text-gray-500">Pets Collected</p>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-3 border-strawberry-accent">
              <div className="text-center">
                <div className="text-4xl mb-4">🆘</div>
                <h3 className="text-xl font-bold text-strawberry-dark mb-2">
                  Support
                </h3>
                <p className="text-gray-600 mb-4">Get help and contact us</p>
                <button className="btn-strawberry-secondary w-full">
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-strawberry-dark mb-6">
              Recent Activity
            </h2>
            <div className="bg-white rounded-2xl shadow-lg p-6 border-3 border-strawberry-accent">
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No recent activity
                </h3>
                <p className="text-gray-500 mb-4">
                  Start shopping to see your activity here!
                </p>
                <a href="/#pets" className="btn-strawberry">
                  Browse Pets
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
