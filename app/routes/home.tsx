import type { Route } from "./+types/home";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { AuthModal } from "../components/AuthModal";
import { UserMenu } from "../components/UserMenu";
import { trackPetView, trackAddToCart, trackPageView } from "../lib/analytics";
import PayPalButton from "../components/PayPalButton";
import CashAppButton from "../components/CashAppButton";
import { getPets, type Pet } from "../lib/firestore";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Elder Strawberry Garden - Premium Roblox Pets" },
    {
      name: "description",
      content:
        "Buy the rarest and most beautiful pets for Roblox Grow a Garden! Fast delivery, secure payments, and the best prices guaranteed.",
    },
  ];
}

// Pet data for the showcase
const fallbackPets: Pet[] = [
  {
    id: "1",
    name: "Elder Strawberry Dragon",
    price: 25.99,
    rarity: "Legendary",
    category: "Dragon",
    imageUrl: "https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=🐉",
    description: "A majestic dragon with strawberry scales and elder wisdom",
    inStock: true,
  },
  {
    id: "2",
    name: "Golden Berry Phoenix",
    price: 19.99,
    rarity: "Epic",
    category: "Bird",
    imageUrl: "https://via.placeholder.com/200x200/FFD93D/FFFFFF?text=🦅",
    description: "A radiant phoenix that glows like golden berries",
    inStock: true,
  },
  {
    id: "3",
    name: "Strawberry Unicorn",
    price: 15.99,
    rarity: "Rare",
    category: "Mythical",
    imageUrl: "https://via.placeholder.com/200x200/FF9FF3/FFFFFF?text=🦄",
    description: "A magical unicorn with strawberry mane and tail",
    inStock: true,
  },
  {
    id: "4",
    name: "Elder Berry Wolf",
    price: 12.99,
    rarity: "Rare",
    category: "Canine",
    imageUrl: "https://via.placeholder.com/200x200/6C5CE7/FFFFFF?text=🐺",
    description: "A wise wolf with elder berry markings",
    inStock: false,
  },
  {
    id: "5",
    name: "Strawberry Butterfly",
    price: 8.99,
    rarity: "Common",
    category: "Insect",
    imageUrl: "https://via.placeholder.com/200x200/FF7675/FFFFFF?text=🦋",
    description: "A delicate butterfly with strawberry patterns",
    inStock: true,
  },
  {
    id: "6",
    name: "Elder Garden Cat",
    price: 18.99,
    rarity: "Epic",
    category: "Feline",
    imageUrl: "https://via.placeholder.com/200x200/74B9FF/FFFFFF?text=🐱",
    description: "A mystical cat that tends to the elder garden",
    inStock: true,
  },
];

export default function Home() {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      trackPageView("Home");
    }
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      const petsData = await getPets();
      setPets(petsData);
    } catch (error) {
      console.error("Error loading pets:", error);
      // Fallback to hardcoded pets if Firestore fails
      setPets(fallbackPets);
    } finally {
      setLoading(false);
    }
  };

  const openAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAddToCart = (pet: any) => {
    if (!user) {
      openAuthModal("login");
      return;
    }

    // Track the add to cart event (only in browser)
    if (typeof window !== "undefined") {
      trackAddToCart(pet.name, pet.price, pet.rarity);
    }

    // Here you would typically add the pet to the cart
    alert(`Added ${pet.name} to cart! 🛒`);
  };

  return (
    <div className="min-h-screen bg-strawberry-light">
      {/* Navigation */}
      <nav className="bg-strawberry-gradient shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🍓</span>
              <div className="text-white">
                <h1 className="text-xl font-bold">Elder Strawberry Garden</h1>
                <p className="text-sm opacity-90">Premium Roblox Pets</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="nav-link">
                Home
              </a>
              <a href="#pets" className="nav-link">
                Pets
              </a>
              <a href="#about" className="nav-link">
                About
              </a>
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-strawberry-accent transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {user ? (
                <UserMenu />
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openAuthModal("login")}
                    className="text-white hover:text-strawberry-accent transition-colors font-medium"
                  >
                    Sign In
                  </button>
                  <span className="text-white">|</span>
                  <button
                    onClick={() => openAuthModal("signup")}
                    className="btn-strawberry-secondary text-sm"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              <button className="text-white hover:text-strawberry-accent transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-pattern py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="strawberry-decoration inline-block">
            <h1 className="text-5xl md:text-7xl font-bold text-strawberry-dark mb-6">
              Elder Strawberry Garden
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-strawberry-primary mb-8 max-w-3xl mx-auto">
            Discover the most magical and rare pets for Roblox Grow a Garden!
            From elder dragons to strawberry unicorns, build your dream
            collection today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-strawberry text-lg px-8 py-4">
              🛒 Start Shopping Now!
            </button>
            <button className="btn-strawberry-secondary text-lg px-8 py-4">
              📖 Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-strawberry-dark mb-12">
            Why Choose Elder Strawberry Garden?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-strawberry-primary mb-2">
                Instant Delivery
              </h3>
              <p className="text-gray-600">
                Get your pets delivered instantly after purchase. No waiting, no
                delays!
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-strawberry-primary mb-2">
                Secure Payments
              </h3>
              <p className="text-gray-600">
                Your transactions are protected with bank-level security and
                encryption.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold text-strawberry-primary mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Only the rarest and most beautiful pets from the elder garden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pets Showcase */}
      <section id="pets" className="py-16 bg-strawberry-cream">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-strawberry-dark mb-4">
            🍓 Premium Pet Collection
          </h2>
          <p className="text-center text-strawberry-primary text-lg mb-12">
            Discover our exclusive collection of elder strawberry garden pets
          </p>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-strawberry-primary"></div>
              <span className="ml-3 text-lg text-gray-600">
                Loading pets...
              </span>
            </div>
          ) : pets.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🐾</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                No pets available
              </h3>
              <p className="text-gray-500">Check back soon for new arrivals!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pets.map((pet) => (
                <div key={pet.id} className="pet-card p-6">
                  <div className="text-center">
                    <div className="mb-4">
                      {pet.imageUrl ? (
                        <img
                          src={pet.imageUrl}
                          alt={pet.name}
                          className="w-24 h-24 mx-auto object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-6xl">🐾</div>
                      )}
                    </div>
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${
                        pet.rarity === "Legendary"
                          ? "bg-purple-100 text-purple-800"
                          : pet.rarity === "Epic"
                            ? "bg-blue-100 text-blue-800"
                            : pet.rarity === "Rare"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {pet.rarity}
                    </div>
                    <h3 className="text-xl font-bold text-strawberry-dark mb-2">
                      {pet.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {pet.description}
                    </p>

                    <div className="mb-4">
                      <span className="text-2xl font-bold text-strawberry-primary">
                        ${pet.price}
                      </span>
                    </div>

                    {/* Checkout Buttons */}
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <PayPalButton
                        amount={pet.price}
                        itemName={pet.name}
                        onSuccess={() =>
                          alert("Payment successful via PayPal! 🥳")
                        }
                        onError={() =>
                          alert(
                            "PayPal failed. Please try again or use Cash App."
                          )
                        }
                      />
                      <CashAppButton
                        amount={pet.price}
                        itemName={pet.name}
                        className="px-3 py-2 rounded-md bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition"
                      />
                    </div>

                    <button
                      onClick={() => {
                        if (pet.inStock) {
                          if (typeof window !== "undefined") {
                            trackPetView(pet.name, pet.rarity);
                          }
                          handleAddToCart(pet);
                        }
                      }}
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                        pet.inStock
                          ? "btn-strawberry hover:shadow-lg"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!pet.inStock}
                    >
                      {pet.inStock ? "🛒 Add to Cart" : "❌ Sold Out"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-strawberry-dark mb-8">
            About Elder Strawberry Garden
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-6">
              Welcome to the most enchanting pet marketplace for Roblox Grow a
              Garden! We specialize in bringing you the rarest and most magical
              pets from the legendary Elder Strawberry Garden.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our collection features exclusive pets that you won't find
              anywhere else, each carefully selected for their beauty, rarity,
              and magical properties. From elder dragons to strawberry unicorns,
              every pet has its own unique story.
            </p>
            <p className="text-lg text-gray-600">
              Join thousands of satisfied customers who have built their dream
              pet collections with us. Fast delivery, secure payments, and
              exceptional customer service guaranteed!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-strawberry-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🍓</span>
                <h3 className="text-xl font-bold">Elder Strawberry Garden</h3>
              </div>
              <p className="text-gray-300">
                Your trusted source for premium Roblox Grow a Garden pets.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a
                    href="#home"
                    className="hover:text-strawberry-accent transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#pets"
                    className="hover:text-strawberry-accent transition-colors"
                  >
                    Pets
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-strawberry-accent transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-strawberry-accent transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a
                    href="#"
                    className="hover:text-strawberry-accent transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-strawberry-accent transition-colors"
                  >
                    Delivery Info
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-strawberry-accent transition-colors"
                  >
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-strawberry-accent transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-300 hover:text-strawberry-accent transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-strawberry-accent transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-strawberry-accent transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>
              &copy; 2025 Elder Strawberry Garden. All rights reserved. Not
              affiliated with Roblox Corporation.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
      />
    </div>
  );
}
