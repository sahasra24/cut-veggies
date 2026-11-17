// ===== Fresh Cut Veggies – settings =====
// 1) Leave FIREBASE as null to run in DEMO mode (orders saved only in this browser).
// 2) To go live for free, create a Firebase project (Spark plan, no card needed),
//    add a Web App, and paste its config object below. See README.md.

export const FIREBASE = null;
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
export const NTFY_TOPIC = null; // e.g. "freshcut-orders-k82jd9q"

export const SHOP = {
  name: "Fresh Cut Veggies",
  countryCode: "1",       // for WhatsApp links (1 = USA)
  phone: "",              // optional, shown on the order page
  openTime: "09:00",      // earliest pickup time
  closeTime: "20:00",     // latest pickup time
  minLeadMinutes: 60,     // how much notice you need to cut fresh
  maxDaysAhead: 7         // how far ahead customers can order
};

// Used only until you save your own menu from the Kitchen page.
export const DEFAULT_MENU = [
  { name: "Onion",        unit: "lb",   cuts: ["Diced", "Sliced", "Chopped"], available: true },
  { name: "Tomato",       unit: "lb",   cuts: ["Diced", "Sliced"], available: true },
  { name: "Carrot",       unit: "lb",   cuts: ["Diced", "Julienne", "Sliced", "Grated"], available: true },
  { name: "Bell pepper",  unit: "lb",   cuts: ["Diced", "Strips"], available: true },
  { name: "Potato",       unit: "lb",   cuts: ["Diced", "Wedges", "Fries"], available: true },
  { name: "Cabbage",      unit: "lb",   cuts: ["Shredded", "Chopped"], available: true },
  { name: "Green beans",  unit: "lb",   cuts: ["Chopped (1 inch)", "Fine chopped"], available: true },
  { name: "Okra",         unit: "lb",   cuts: ["Round slices", "Long cut"], available: true },
  { name: "Cauliflower",  unit: "lb",   cuts: ["Florets"], available: true },
  { name: "Broccoli",     unit: "lb",   cuts: ["Florets"], available: true },
  { name: "Cucumber",     unit: "lb",   cuts: ["Sliced", "Diced"], available: true },
  { name: "Mixed veg (curry pack)", unit: "pack", cuts: ["Diced"], available: true }
];
