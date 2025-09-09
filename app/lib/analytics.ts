import { analytics } from "./firebase";
import { logEvent } from "firebase/analytics";

// Analytics utility functions
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (analytics) {
    logEvent(analytics, eventName, parameters);
  }
};

// Predefined events for the Elder Strawberry Garden
export const trackUserSignUp = (method: string = "email") => {
  trackEvent("sign_up", { method });
};

export const trackUserSignIn = (method: string = "email") => {
  trackEvent("login", { method });
};

export const trackPetView = (petName: string, petRarity: string) => {
  trackEvent("view_item", {
    item_name: petName,
    item_category: "pet",
    item_variant: petRarity,
  });
};

export const trackAddToCart = (
  petName: string,
  petPrice: number,
  petRarity: string
) => {
  trackEvent("add_to_cart", {
    currency: "USD",
    value: petPrice,
    items: [
      {
        item_name: petName,
        item_category: "pet",
        item_variant: petRarity,
        price: petPrice,
        quantity: 1,
      },
    ],
  });
};

export const trackPurchase = (
  petName: string,
  petPrice: number,
  petRarity: string
) => {
  trackEvent("purchase", {
    transaction_id: Date.now().toString(),
    currency: "USD",
    value: petPrice,
    items: [
      {
        item_name: petName,
        item_category: "pet",
        item_variant: petRarity,
        price: petPrice,
        quantity: 1,
      },
    ],
  });
};

export const trackPageView = (pageName: string) => {
  trackEvent("page_view", {
    page_title: pageName,
    page_location: typeof window !== "undefined" ? window.location.href : "",
  });
};
