// config.js
export const CONFIG = {
  logoUrl: "https://i.supaimg.com/0102605e-3d7b-40fe-b036-ff43cacb268e/02c8568f-70bc-4207-aeb1-887bbf212b73.png",

  firebase: {
    apiKey: "AIzaSyAsMgbELCV-swg-miupOaLJhHUlEx5LE5I",
    authDomain: "feasto-9fa1c.firebaseapp.com",
    databaseURL: "https://feasto-9fa1c-default-rtdb.firebaseio.com",
    projectId: "feasto-9fa1c",
    storageBucket: "feasto-9fa1c.firebasestorage.app",
    messagingSenderId: "203504577042",
    appId: "1:203504577042:web:aeb1eb5c8d52d043e346cb"
  },

  // Independent Panel URLs
  urls: {
    home: "index.html",
    customer: "customer.html",
    restaurant: "restaurant.html",
    delivery: "delivery.html",
    admin: "admin.html"
  },

  // Distance Tier & Payout Calculators
  calculateDeliveryFee(distanceKm) {
    const d = Math.max(0.1, Number(distanceKm) || 1);
    if (d <= 1) return 20;
    if (d <= 2) return 25;
    if (d <= 3) return 30;
    if (d <= 5) return 40;
    return Math.round(45 + (d - 5) * 9);
  },

  calculateRiderPayout(distanceKm) {
    const d = Math.max(0.1, Number(distanceKm) || 1);
    if (d <= 1) return 20;
    return Math.round(20 + (d - 1) * 8);
  },

  getDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2)**2;
    return Number((R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)))).toFixed(1));
  }
};

export const BRAND_LOGO_HTML = `
  <a href="index.html" class="flex items-center space-x-2">
    <img src="https://i.supaimg.com/0102605e-3d7b-40fe-b036-ff43cacb268e/02c8568f-70bc-4207-aeb1-887bbf212b73.png" alt="Feasto" class="h-9 w-auto object-contain max-w-[130px]" />
  </a>
`;
