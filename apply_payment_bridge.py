#!/usr/bin/env python3
"""Safe integration patch for bundleupott S:\\ott-platform. Run from repository root.
Creates one backup per modified file. Does not touch .env, payment webhook security, or Git.
"""
from pathlib import Path
from datetime import datetime
import sys

ROOT = Path.cwd()
CHECKS = [ROOT / 'frontend/src/pages/OurPlans.jsx', ROOT / 'backend/payment.js', ROOT / 'backend/server.js']
if not all(p.is_file() for p in CHECKS):
    raise SystemExit('ERROR: Run this from S:\\ott-platform, and ensure your existing frontend and backend files exist.')
backup_root = ROOT / '_payment_bridge_backup' / datetime.now().strftime('%Y%m%d_%H%M%S')

staged_edits = {}

def edit(rel: str, fn):
    # Stage all changes; do not touch disk if any expected source block is missing.
    path = ROOT / rel
    before = path.read_text(encoding='utf-8')
    after = fn(before)
    staged_edits[rel] = (before, after)

def exact(text: str, old: str, new: str, label: str):
    n = text.count(old)
    if n != 1:
        raise RuntimeError(f'{label}: expected exactly one matching block, found {n}; not patching this file.')
    return text.replace(old, new, 1)

CATALOG = r'''// Server-authoritative demo catalogue aligned with frontend/src/pages/OurPlans.jsx.
// IMPORTANT: replace with authorized, accurate products/prices before accepting real money.
const ITEMS = [
  ['netflix','Netflix',199,'ott'],
  ['prime','Amazon Prime Video',299,'ott'],
  ['jiohotstar','JioHotstar',149,'ott'],
  ['sonyliv','SonyLIV',299,'ott'],
  ['zee5','ZEE5',149,'ott'],
  ['sunnxt','Sun NXT',99,'ott'],
  ['aha','aha',149,'ott'],
  ['hoichoi','Hoichoi',99,'ott'],
  ['shemaroome','ShemarooMe',99,'ott'],
  ['lionsgate','Lionsgate Play',149,'ott'],
  ['discovery','discovery+',99,'ott'],
  ['fancode','FanCode',149,'ott'],
  ['chaupal','Chaupal',99,'ott'],
  ['etvwin','ETV Win',99,'ott'],
  ['planetmarathi','Planet Marathi',99,'ott'],
  ['manoramamax','ManoramaMAX',99,'ott'],
  ['erosnow','Eros Now',99,'ott'],
  ['youtube','YouTube Premium',149,'ott'],
  ['chatgpt','ChatGPT',199,'ai'],
  ['gemini','Google Gemini',199,'ai'],
  ['claude','Claude',199,'ai'],
  ['perplexity','Perplexity',199,'ai'],
  ['copilot','Microsoft Copilot',199,'ai'],
  ['grok','Grok',199,'ai'],
  ['midjourney','Midjourney',199,'ai'],
  ['canva','Canva AI',199,'ai'],
  ['notion','Notion AI',199,'ai'],
  ['firefly','Adobe Firefly',199,'ai'],
  ['elevenlabs','ElevenLabs',199,'ai'],
  ['runway','Runway',199,'ai'],
];

export const PUBLIC_CATALOG = Object.freeze(ITEMS.map(([id, name, price, category]) =>
  Object.freeze({ id, name, price, category, currency: 'INR' })
));
const map = new Map(PUBLIC_CATALOG.map(p => [p.id, p]));

// A cart is valid only with unique known item IDs. Browser prices are NEVER trusted.
export function quoteBundle(planIds) {
  if (!Array.isArray(planIds) || planIds.length < 1 || planIds.length > 30 ||
      planIds.some(id => typeof id !== 'string') ||
      new Set(planIds).size !== planIds.length || planIds.some(id => !map.has(id))) return null;
  const items = planIds.map(id => map.get(id));
  const subtotal = items.reduce((n,p) => n + p.price, 0);
  const discount = planIds.includes('netflix') && planIds.includes('prime') ? 100 : 0;
  const amount = subtotal - discount;
  if (!Number.isSafeInteger(amount) || amount <= 0) return null;
  return { items, discount, amount, name: items.map(p => p.name).join(' + ') };
}
'''

PAYMENT_STEP = r'''import React, { useEffect, useState } from 'react';
import '../Style/PaymentStep.css';

const CURRENCY = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });

async function jsonFetch(url, options) {
  let response;
  try { response = await fetch(url, options); }
  catch { throw new Error('Cannot reach backend. Check Node.js port 5000 and the Vite proxy.'); }
  let data;
  try { data = await response.json(); }
  catch { throw new Error(`Backend returned an invalid response (HTTP ${response.status}).`); }
  if (!response.ok || data.success === false) throw new Error(data.message || `HTTP ${response.status}`);
  return data;
}

export default function PaymentStep({ customer, plans, total }) {
  const [orderData, setOrderData] = useState(null);
  const [orderStatus, setOrderStatus] = useState('pending');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [utr, setUtr] = useState('');
  const [referenceSent, setReferenceSent] = useState(false);
  const [connection, setConnection] = useState('checking');

  useEffect(() => {
    let active = true;
    jsonFetch('/health').then(data => {
      if (active) setConnection(data.databaseConnected ? 'connected' : 'offline');
    }).catch(() => { if (active) setConnection('offline'); });
    return () => { active = false; };
  }, []);

  async function createOrder() {
    setBusy(true);
    setError('');
    try {
      const data = await jsonFetch('/api/payment/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customer.fullName,
          customerEmail: customer.email,
          customerMobile: customer.phone,
          planIds: plans.map(p => p.id),
        }),
      });
      if (!data.order?.orderId || !data.accessToken) throw new Error('Order response is missing its ID/token.');
      setOrderData(data);
      setOrderStatus(data.order.status || 'pending');
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  const id = orderData?.order?.orderId;
  const token = orderData?.accessToken;
  useEffect(() => {
    if (!id || !token || orderStatus !== 'pending') return;
    let cancelled = false;
    const check = async () => {
      try {
        const data = await jsonFetch(`/api/payment/orders/${encodeURIComponent(id)}/status`, {
          headers: { 'x-order-token': token },
          cache: 'no-store',
        });
        if (!cancelled) {
          setOrderStatus(data.order?.status || 'pending');
          setError('');
        }
      } catch (err) { if (!cancelled) setError(`Status check: ${err.message}`); }
    };
    check();
    const interval = setInterval(check, 8000);
    return () => { cancelled = true; clearInterval(interval); };
  }, [id, token, orderStatus]);

  async function submitReference(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await jsonFetch(`/api/payment/orders/${encodeURIComponent(id)}/claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-order-token': token },
        body: JSON.stringify({ upiReference: utr.trim() }),
      });
      setReferenceSent(true);
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  const amountMatches = orderData ? Number(orderData.order.amount) === Number(total) : true;
  return (
    <section className="bup-payment-flow" aria-live="polite">
      <p className="bup-payment-connection">
        Backend & database: <strong>{connection === 'connected' ? 'Connected' : connection === 'checking' ? 'Checking…' : 'Unavailable'}</strong>
      </p>
      {!orderData && (
        <>
          <p>No money is needed to test the connection. Creating an order will save it in MongoDB as pending.</p>
          <button type="button" className="bup-checkout-button" disabled={busy || connection !== 'connected'} onClick={createOrder}>
            {busy ? 'Creating order…' : 'Create payment order'}
          </button>
        </>
      )}
      {orderData && (
        <>
          <p><strong>Order:</strong> <code>{id}</code></p>
          <p><strong>Server amount:</strong> {CURRENCY.format(Number(orderData.order.amount))}</p>
          <p><strong>Payment status:</strong> {orderStatus === 'paid' ? 'Bank verified — paid' : orderStatus === 'rejected' ? 'Rejected' : 'Pending bank verification'}</p>
          {!amountMatches && <p role="alert" className="bup-payment-error">The backend amount differs from the website preview. Do NOT pay this order. Correct the price catalogue first.</p>}
          {orderStatus === 'paid' && <p className="bup-payment-ok" role="status">Payment successful — independently verified by the admin.</p>}
          {orderStatus === 'pending' && amountMatches && (
            <>
              <p><strong>Connection testing:</strong> The order has been created. Payment is optional; do not send money until catalogue pricing and service fulfilment are approved.</p>
              {orderData.qrCode && <img className="bup-payment-qr" src={orderData.qrCode} alt="UPI payment QR code for the displayed amount" />}
              {orderData.upiUrl && <a className="bup-payment-upi" href={orderData.upiUrl}>Open UPI app</a>}
              <p className="bup-payment-caution">An SMS or entered UTR does not confirm payment. Only bank-verified admin approval changes the status.</p>
              {!referenceSent ? (
                <form onSubmit={submitReference}>
                  <label htmlFor="bup-utr">UPI reference (only after you genuinely paid)</label>
                  <input id="bup-utr" value={utr} onChange={e=>setUtr(e.target.value)} required minLength={10} maxLength={30} pattern="[A-Za-z0-9-]{10,30}" placeholder="UPI transaction reference" />
                  <button type="submit" disabled={busy}>Submit reference for review</button>
                </form>
              ) : <p className="bup-payment-ok">Reference submitted for review, not yet verified.</p>}
            </>
          )}
        </>
      )}
      {error && <p role="alert" className="bup-payment-error">{error}</p>}
    </section>
  );
}
'''

PAYMENT_CSS = r'''.bup-payment-flow { margin-top:18px; padding:18px; border:1px solid #dce5ec; border-radius:16px; background:#f7fafc; color:#1e3343; line-height:1.5; }
.bup-payment-flow p { margin:9px 0; }
.bup-payment-connection { font-size:.9rem; }
.bup-payment-connection strong { color:#166a52; }
.bup-payment-flow code { overflow-wrap:anywhere; font-size:.8rem; }
.bup-payment-qr { display:block; width:min(240px,100%); margin:16px auto; border-radius:10px; background:white; }
.bup-payment-upi { display:inline-block; padding:10px 16px; margin:5px 0; color:white; background:#166c57; border-radius:9px; font-weight:700; text-decoration:none; }
.bup-payment-flow form { display:grid; gap:9px; margin-top:16px; }
.bup-payment-flow form label { font-weight:600; }
.bup-payment-flow form input { width:100%; padding:12px; border:1px solid #b9cbd5; border-radius:8px; font:inherit; }
.bup-payment-flow form button { padding:12px; border:0; border-radius:8px; background:#274979; color:white; cursor:pointer; font:inherit; }
.bup-payment-flow form button:disabled { opacity:.6; cursor:not-allowed; }
.bup-payment-flow .bup-payment-error { color:#9b2525; font-weight:600; }
.bup-payment-flow .bup-payment-ok { color:#166a52; font-weight:700; }
.bup-payment-flow .bup-payment-caution { font-size:.84rem; }
'''

# Stop early if inputs do not match the inspected repository structure, rather than half-apply.
source_payment = (ROOT/'backend/payment.js').read_text(encoding='utf-8')
source_modal = (ROOT/'frontend/src/pages/CustomerDetailsModal.jsx').read_text(encoding='utf-8')
assert 'const PLANS = Object.freeze({' in source_payment, 'Unknown backend/payment.js revision'
assert 'const { customerName, customerEmail, customerMobile, planId } = req.body || {};' in source_payment, 'Unknown backend order route'
assert '<div className="bup-payment-notice">' in source_modal, 'Unknown frontend modal revision'
assert 'Payment is not connected yet.' in source_modal, 'Modal already integrated or unexpected revision'
app_path = ROOT / 'frontend/src/App.jsx'
if not app_path.exists() or 'OurPlans' not in app_path.read_text(encoding='utf-8'):
    raise SystemExit('ERROR: frontend/src/App.jsx is not the original website router. Restore App.jsx and main.jsx from origin/main after backing them up, then rerun this integration.')

# Newly added files are intentionally not overwritten.
for rel in ['backend/catalog.js','frontend/src/components/PaymentStep.jsx','frontend/src/Style/PaymentStep.css']:
    if (ROOT/rel).exists(): raise SystemExit(f'{rel} already exists; no changes made. Review/rename it first.')

# Modify files first, writing backup prior to each replacement.
def patch_payment(content):
    content = exact(content, 'import { suggestMatches, normalizeReference } from "./matching.js";', 'import { suggestMatches, normalizeReference } from "./matching.js";\nimport { quoteBundle, PUBLIC_CATALOG } from "./catalog.js";', 'payment import')
    content = exact(content, '    planName: order.planName,\n    amount: order.amount,', '    planName: order.planName,\n    items: order.items || [],\n    discount: order.discount || 0,\n    amount: order.amount,', 'publicOrder')
    content = exact(content, 'router.post("/orders", publicLimit, async (req, res) => {', 'router.get("/catalog", (req, res) => res.json({ success: true, plans: PUBLIC_CATALOG, promotion: { netflixPrimeDiscount: 100 } }));\n\nrouter.post("/orders", publicLimit, async (req, res) => {', 'catalog route')
    old = '''    const { customerName, customerEmail, customerMobile, planId } = req.body || {};
    if (typeof planId !== "string" || !Object.hasOwn(PLANS, planId)) {
      return res.status(400).json({ message: "Invalid plan" });
    }'''
    new = '''    const { customerName, customerEmail, customerMobile, planId, planIds } = req.body || {};
    const isBundle = Array.isArray(planIds);
    const bundle = isBundle ? quoteBundle(planIds) : null;
    if ((isBundle && !bundle) || (!isBundle && (typeof planId !== "string" || !Object.hasOwn(PLANS, planId)))) {
      return res.status(400).json({ message: "Invalid plan or bundle items" });
    }'''
    content=exact(content,old,new,'order validation')
    content=exact(content, '    const plan = PLANS[planId];', '    const plan = isBundle ? { name: bundle.name, amount: bundle.amount } : PLANS[planId];','order price')
    content=exact(content, '      planId,\n      planName: plan.name,\n      amount: plan.amount,', '      planId: isBundle ? "custom_bundle" : planId,\n      planName: plan.name,\n      items: isBundle ? bundle.items : [],\n      discount: isBundle ? bundle.discount : 0,\n      amount: plan.amount,', 'order items')
    return content
edit('backend/payment.js',patch_payment)

def patch_models(c):
    return exact(c, '    planName: { type: String, required: true },\n    amount:', '    planName: { type: String, required: true },\n    items: [{ id: String, name: String, price: Number, category: String }],\n    discount: { type: Number, default: 0 },\n    amount:', 'order schema')
edit('backend/models.js',patch_models)

def patch_vite(c):
    if '"/api"' in c and '"/health"' in c:
        return c
    return exact(c, '  plugins: [react(), tailwindcss()],', '''  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": { target: "http://localhost:5000", changeOrigin: true },
      "/health": { target: "http://localhost:5000", changeOrigin: true },
    },
  },''','vite proxy')
edit('frontend/vite.config.js',patch_vite)

def patch_modal(c):
    c=exact(c,'import "../Style/CustomerDetailsModal.css";', 'import "../Style/CustomerDetailsModal.css";\nimport PaymentStep from "../components/PaymentStep";', 'modal import')
    start='                <div className="bup-payment-notice">'
    finish='                <button\n                  type="button"\n                  className="bup-checkout-edit"'
    a=c.index(start); b=c.index(finish,a)
    c=c[:a]+'                <PaymentStep customer={customer} plans={plans} total={total} />\n'+c[b:]
    c=c.replace('Payment is not connected yet.', 'Payment is connected for testing.')
    c=c.replace('Prices are illustrative. Services are not available to buy through\n               this demo. No payment is collected.', 'Prices shown are illustrative until verified. Creating an order\n               does not confirm payment or activate subscriptions.')
    return c
edit('frontend/src/pages/CustomerDetailsModal.jsx',patch_modal)

def patch_server(c):
    if 'app.set("trust proxy", "loopback")' in c: return c
    return exact(c,'const app = express();','const app = express();\n// Current Cloudflare Quick Tunnel connects from localhost.\napp.set("trust proxy", "loopback");','server proxy')
edit('backend/server.js',patch_server)

# All transformations and checks have now succeeded: write together.
for rel, (before, after) in staged_edits.items():
    if before == after:
        print('UNCHANGED', rel)
        continue
    backup = backup_root / rel
    backup.parent.mkdir(parents=True, exist_ok=True)
    backup.write_text(before, encoding='utf-8')
    (ROOT/rel).write_text(after, encoding='utf-8')
    print('UPDATED', rel)
for rel,content in [('backend/catalog.js',CATALOG),('frontend/src/components/PaymentStep.jsx',PAYMENT_STEP),('frontend/src/Style/PaymentStep.css',PAYMENT_CSS)]:
    p=ROOT/rel
    p.parent.mkdir(parents=True,exist_ok=True)
    p.write_text(content, encoding='utf-8')
    print('CREATED',rel)
print('\nSUCCESS: Integration files updated. Backups:',backup_root)
print('NEXT: cd backend ; npm install qrcode bcryptjs jsonwebtoken express-rate-limit helmet ; npm run dev')
print('AND: cd frontend ; npm install ; npm run dev')
print('TEST: Open /our-plans > select Netflix + Prime > Save details > Create payment order (no money needed).')
