// ===== Fresh Cut Veggies – settings =====
// 1) Leave FIREBASE as null to run in DEMO mode (orders saved only in this browser).
// 2) To go live for free, create a Firebase project (Spark plan, no card needed),
//    add a Web App, and paste its config object below. See README.md.

export const FIREBASE = null;

// Optional switch-off time. After this moment the site stops using Firebase and
// goes back to demo mode. null = never switch off.
export const FIREBASE_UNTIL = null; // e.g. "2026-11-18T23:59:00-05:00"
/* Example:
export const FIREBASE = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  appId: "1:123:web:abc"
};
*/

// Free phone notifications for new orders via the ntfy app (https://ntfy.sh).
// Install "ntfy" on your phone, tap + and subscribe to the SAME name you put here.
// Pick a long, hard-to-guess name (anyone who knows it can see the alerts). null = off.
export const NTFY_TOPIC = "cutveg-orders-c8sclyangshy"; // e.g. "freshcut-orders-k82jd9q"

// Free WhatsApp alert to staff for every new order, via CallMeBot (https://www.callmebot.com).
// Each staff phone does a one-time setup to get its own apikey. Add one entry per phone.
// phone = full number with country code, e.g. "+15551234567". [] = off.
export const WHATSAPP_STAFF = [
  // { phone: "+15551234567", apikey: "123456" }
];

export const SHOP = {
  name: "Fresh Cut Veggies",
  currency: "USD",       // prices shown in this currency
  countryCode: "1",       // for WhatsApp links (1 = USA)
  phone: "",              // optional, shown on the order page
  openTime: "09:00",      // earliest pickup time
  closeTime: "20:00",     // latest pickup time
  minLeadMinutes: 60,     // how much notice you need to cut fresh
  maxDaysAhead: 7         // how far ahead customers can order
};

// Used only until you save your own menu from the Kitchen page.
// price = price per unit (per lb, per pack...). Staff can change prices in Kitchen > Edit menu.
export const DEFAULT_MENU = [
  { name: "Onion",        unit: "lb", price: 2.49,   cuts: ["Diced", "Sliced", "Chopped"], available: true },
  { name: "Tomato",       unit: "lb", price: 2.99,   cuts: ["Diced", "Sliced"], available: true },
  { name: "Carrot",       unit: "lb", price: 2.29,   cuts: ["Diced", "Julienne", "Sliced", "Grated"], available: true },
  { name: "Bell pepper",  unit: "lb", price: 3.99,   cuts: ["Diced", "Strips"], available: true },
  { name: "Potato",       unit: "lb", price: 1.99,   cuts: ["Diced", "Wedges", "Fries"], available: true },
  { name: "Cabbage",      unit: "lb", price: 2.19,   cuts: ["Shredded", "Chopped"], available: true },
  { name: "Green beans",  unit: "lb", price: 3.49,   cuts: ["Chopped (1 inch)", "Fine chopped"], available: true },
  { name: "Okra",         unit: "lb", price: 4.49,   cuts: ["Round slices", "Long cut"], available: true },
  { name: "Cauliflower",  unit: "lb", price: 3.79,   cuts: ["Florets"], available: true },
  { name: "Broccoli",     unit: "lb", price: 3.99,   cuts: ["Florets"], available: true },
  { name: "Cucumber",     unit: "lb", price: 2.49,   cuts: ["Sliced", "Diced"], available: true },
  { name: "Mixed veg (curry pack)", unit: "pack", price: 5.99, cuts: ["Diced"], available: true }
];
