# Fresh Cut Veggies – order app

Customers order cut vegetables online, and the kitchen gets an alert with a **"What to cut"** list. That way you only cut what people ordered and nothing goes to waste.

- `index.html`: customer order page (pick veggies, choose the cut and amount, set a pickup time, get a pickup code and a live status)
- `kitchen.html`: staff board (total amount to cut per vegetable, buttons for New → Cutting → Ready → Picked up, **Text / WhatsApp customer** button when an order is ready, menu editor)
- Phone notification for every new order through the free **ntfy** app (no sound needed, works even when the site is closed)

**Everything here is free:** GitHub Pages for hosting and the Firebase Spark plan (no credit card) for live orders.

## 1. Try it now (demo mode)
`config.js` ships with `FIREBASE = null`, which turns on demo mode. Orders are saved only in your browser.
```
cd cutveg
python3 -m http.server 8000
```
Open http://localhost:8000 (order page) and http://localhost:8000/kitchen.html (any email/password works) in two tabs.
Opening the file directly (double-click) won't work, because browsers block modules from `file://`.

## 2. Go live for free (about 10 minutes)
1. Go to https://console.firebase.google.com → **Add project** (you can turn Analytics off). It starts on the free Spark plan.
2. **Build → Firestore Database → Create database** (production mode, choose a nearby region such as `us-east1`).
3. **Build → Authentication → Get started → Email/Password → Enable.** Then open **Users → Add user** and create a login for each staff member.
4. **Firestore → Rules:** paste in `firestore.rules`, put your staff emails in `isStaff()`, then **Publish**.
5. **Project settings → Your apps → Web (</>)**: register the app and copy the `firebaseConfig` object into `config.js` as `FIREBASE = {...}`.
6. In **Authentication → Settings → Authorized domains**, add `YOURNAME.github.io`.
7. Edit the shop name, hours and lead time in `config.js` under `SHOP`.
8. **Phone notifications (free):** install the **ntfy** app (Play Store / App Store). Tap **+**, type a long secret channel name such as `freshcut-orders-k82jd9q` and subscribe. Put the same name in `config.js` as `NTFY_TOPIC = "freshcut-orders-k82jd9q"`. Every new order then shows up in your phone's notification bar, and tapping it opens that order on the kitchen page.

## 3. Publish on GitHub Pages (free)
1. Create a repo (for example `cut-veggies`) and upload all the files.
2. **Settings → Pages → Deploy from branch → main / root.**
3. Customer link: `https://YOURNAME.github.io/cut-veggies/`
   Staff link: `https://YOURNAME.github.io/cut-veggies/kitchen.html`
4. Tip: print a QR code of the customer link and put it at the counter.

## Free-tier limits (more than enough for one store)
Firestore free: 50,000 reads, 20,000 writes and 1 GB per day. One order uses about 1 write, and the kitchen board reads each order once per change.

## Daily use
- A new order pops up as an ntfy notification on your phone. Tap it to open the order.
- Tap **Start cutting**. When the order is done, tap **Mark ready**, then **Text customer** or **WhatsApp customer**. Your phone opens a ready-made "your order is ready" message, and you hit send. The customer's order page also switches to "Ready for pickup" by itself.
- Use the **What to cut** table as your prep list. It only counts orders that are New or Cutting.
- When you run out of something, untick **Available** in **Edit menu**.
