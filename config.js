// config.js - Central Configuration for Feasto
export const CONFIG = {
  // Hosted Feasto Logo Link
  logoUrl: "https://i.supaimg.com/0102605e-3d7b-40fe-b036-ff43cacb268e/02c8568f-70bc-4207-aeb1-887bbf212b73.png",

  // Your Firebase Configuration (Real credentials inserted)
  firebase: {
    apiKey: "AIzaSyAsMgbELCV-swg-miupOaLJhHUlEx5LE5I",
    authDomain: "feasto-9fa1c.firebaseapp.com",
    databaseURL: "https://feasto-9fa1c-default-rtdb.firebaseio.com",
    projectId: "feasto-9fa1c",
    storageBucket: "feasto-9fa1c.firebasestorage.app",
    messagingSenderId: "203504577042",
    appId: "1:203504577042:web:aeb1eb5c8d52d043e346cb"
  },

  // Your Gateway / Custom API Key
  apiKey: "zapba01cec93a38464289af82199a29c7c9",
  razorpayKeyId: "rzp_test_YOUR_KEY_ID",

  app: {
    name: "Feasto",
    tagline: "Good Food. Delivered Fast.",
    platformFee: 5,
    taxRate: 0.05
  },

  // Distance Tier System:
  // 0-1 km: ₹20 | 1-2 km: ₹25 | 2-3 km: ₹30 | 3-5 km: ₹40 | 5+ km: ₹45 + ₹9/km
  calculateDeliveryFee(distanceKm) {
    const d = Math.max(0.1, Number(distanceKm) || 1);
    if (d <= 1) return 20;
    if (d <= 2) return 25;
    if (d <= 3) return 30;
    if (d <= 5) return 40;
    return Math.round(45 + (d - 5) * 9);
  },

  // Partner Payout Formula: ₹20 base (up to 1 km) + ₹8/km for every additional km
  calculateRiderPayout(distanceKm) {
    const d = Math.max(0.1, Number(distanceKm) || 1);
    if (d <= 1) return 20;
    return Math.round(20 + (d - 1) * 8);
  },

  // Haversine formula for exact distance between GPS coordinates in KM
  getDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Number((R * c).toFixed(1));
  }
};

// Reusable Brand Logo Component linking back to index.html
export const BRAND_LOGO_HTML = `
  <a href="index.html" class="flex items-center space-x-2 active:scale-95 transition-transform" title="Feasto Home">
    <img 
      src="https://i.supaimg.com/0102605e-3d7b-40fe-b036-ff43cacb268e/02c8568f-70bc-4207-aeb1-887bbf212b73.png" 
      alt="Feasto" 
      class="h-9 w-auto object-contain max-w-[130px]"
    />
  </a>
`;

// Register PWA Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(console.error);
  });
    }
