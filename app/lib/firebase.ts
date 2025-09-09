import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyBuB-rAJZk5PBV7JBxITv_L08i6ISmdk-I",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "growagarden-24b76.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "growagarden-24b76",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "growagarden-24b76.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "507703388914",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:507703388914:web:f34c904134a027b7d5fe6b",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-ZEHZYGQS3C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Analytics (only in browser environment)
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;

export default app;
