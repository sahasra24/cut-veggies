// Data layer: Firebase (live, free Spark plan) or DEMO (localStorage, this browser only).
import { FIREBASE, DEFAULT_MENU, NTFY_TOPIC } from "./config.js";

const V = "10.12.2";
let mode = "demo";
let fb = null; // { db, auth, f: firestore fns, a: auth fns }

export async function init() {
  if (!FIREBASE) return (mode = "demo");
  const app = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`);
  const f = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`);
  const a = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`);
  const fapp = app.initializeApp(FIREBASE);
  fb = { db: f.getFirestore(fapp), auth: a.getAuth(fapp), f, a };
  return (mode = "live");
}
export const getMode = () => mode;

// ---------- helpers ----------
export function todayStr(d = new Date()) {
  const z = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
}
function makeCode() {
  const c = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 4 }, () => c[Math.floor(Math.random() * c.length)]).join("");
}
function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

// ---------- demo storage ----------
const LS = { orders: "cv_orders", menu: "cv_menu", staff: "cv_staff" };
const listeners = new Set();
function lsGet(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } }
function lsSet(k, v) { localStorage.setItem(k, JSON.stringify(v)); listeners.forEach(fn => fn()); }
window.addEventListener("storage", () => listeners.forEach(fn => fn()));
function onLocal(fn) { listeners.add(fn); fn(); return () => listeners.delete(fn); }

// ---------- menu ----------
export async function getMenu() {
  if (mode === "demo") return lsGet(LS.menu, DEFAULT_MENU);
  const s = await fb.f.getDoc(fb.f.doc(fb.db, "settings", "menu"));
  return s.exists() ? s.data().items : DEFAULT_MENU;
}
export async function saveMenu(items) {
  if (mode === "demo") return lsSet(LS.menu, items);
  await fb.f.setDoc(fb.f.doc(fb.db, "settings", "menu"), { items });
}

// ---------- orders ----------
export async function placeOrder(o) {
  const order = { ...o, code: makeCode(), status: "new", createdAt: Date.now() };
  if (mode === "demo") {
    const id = makeId();
    const all = lsGet(LS.orders, {});
    all[id] = order;
    lsSet(LS.orders, all);
    return { id, code: order.code };
  }
  const ref = fb.f.doc(fb.f.collection(fb.db, "orders")); // random, unguessable id
  await fb.f.setDoc(ref, order);
  return { id: ref.id, code: order.code };
}

// Free push to the owner's phone through the ntfy app. Never blocks the order.
export async function notifyOwner(order, id) {
  if (!NTFY_TOPIC) return;
  const items = order.items.map(i => `${i.veg} ${i.cut.toLowerCase()} ${i.qty} ${i.unit}`).join(", ");
  const kitchen = new URL("kitchen.html#" + id, location.href).href;
  try {
    await fetch("https://ntfy.sh/", { // JSON publish goes to the root URL
      method: "POST",
      body: JSON.stringify({
        topic: NTFY_TOPIC,
        title: `New order – ${order.name} (code ${order.code})`,
        message: `${items}\nPickup ${order.pickupDate} ${order.pickupTime}${order.notes ? "\nNote: " + order.notes : ""}`,
        tags: ["carrot"],
        click: kitchen
      })
    });
  } catch {}
}

export function watchOrder(id, cb) {
  if (mode === "demo") return onLocal(() => cb(lsGet(LS.orders, {})[id] || null));
  return fb.f.onSnapshot(fb.f.doc(fb.db, "orders", id),
    s => cb(s.exists() ? s.data() : null), () => cb(null));
}

// Staff: all orders for a pickup date. cb(list, newlyAddedList)
export function watchOrders(date, cb, onErr) {
  if (mode === "demo") {
    let seen = null;
    return onLocal(() => {
      const all = lsGet(LS.orders, {});
      const list = Object.entries(all).map(([id, o]) => ({ id, ...o })).filter(o => o.pickupDate === date);
      const added = seen ? list.filter(o => !seen.has(o.id)) : [];
      seen = new Set(list.map(o => o.id));
      cb(list, added);
    });
  }
  let first = true;
  const q = fb.f.query(fb.f.collection(fb.db, "orders"), fb.f.where("pickupDate", "==", date));
  return fb.f.onSnapshot(q, snap => {
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    const added = first ? [] : snap.docChanges().filter(c => c.type === "added").map(c => ({ id: c.doc.id, ...c.doc.data() }));
    first = false;
    cb(list, added);
  }, e => onErr && onErr(e));
}

export async function setStatus(id, status) {
  if (mode === "demo") {
    const all = lsGet(LS.orders, {});
    if (all[id]) { all[id].status = status; lsSet(LS.orders, all); }
    return;
  }
  await fb.f.updateDoc(fb.f.doc(fb.db, "orders", id), { status });
}

// Customer cancel (only while still "new")
export async function cancelOrder(id) {
  if (mode === "demo") return setStatus(id, "cancelled");
  await fb.f.updateDoc(fb.f.doc(fb.db, "orders", id), { status: "cancelled" });
}

// ---------- staff auth ----------
export function onStaff(cb) {
  if (mode === "demo") return onLocal(() => cb(lsGet(LS.staff, false) ? { email: "demo" } : null));
  return fb.a.onAuthStateChanged(fb.auth, u => cb(u));
}
export async function staffSignIn(email, pw) {
  if (mode === "demo") return lsSet(LS.staff, true);
  await fb.a.signInWithEmailAndPassword(fb.auth, email, pw);
}
export async function staffSignOut() {
  if (mode === "demo") return lsSet(LS.staff, false);
  await fb.a.signOut(fb.auth);
}
