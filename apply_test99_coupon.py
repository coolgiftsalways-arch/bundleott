from pathlib import Path
from datetime import datetime
import shutil
import sys

ROOT = Path(r"S:\ott-platform")
BACKEND = ROOT / "backend"
FRONTEND = ROOT / "frontend"

payment_path = BACKEND / "payment.js"
models_path = BACKEND / "models.js"
component_path = FRONTEND / "src" / "components" / "PaymentStep.jsx"
css_path = FRONTEND / "src" / "Style" / "PaymentStep.css"

def replace_once(source, old, new, label):
    count = source.count(old)
    if count != 1:
        raise RuntimeError(
            f"{label}: expected exactly one match, found {count}. "
            "No files have been changed."
        )
    return source.replace(old, new, 1)

try:
    payment = payment_path.read_text(encoding="utf-8-sig")
    models = models_path.read_text(encoding="utf-8-sig")
    old_component = component_path.read_text(encoding="utf-8-sig")
    css = css_path.read_text(encoding="utf-8-sig")

    if "function buildPricingQuote(" in payment:
        raise RuntimeError("The TEST99 pricing helper already exists. Aborting to avoid duplicate changes.")

    # ------------------------------------------------------------
    # 1. Add server-authoritative pricing and coupon validation.
    # ------------------------------------------------------------
    helper = r'''
function buildPricingQuote(input = {}) {
  const { planId, planIds } = input;
  const isBundle = Array.isArray(planIds);
  const bundle = isBundle ? quoteBundle(planIds) : null;

  if (
    (isBundle && !bundle) ||
    (!isBundle &&
      (typeof planId !== "string" || !Object.hasOwn(PLANS, planId)))
  ) {
    return {
      ok: false,
      status: 400,
      message: "Invalid plan or bundle items",
    };
  }

  const plan = isBundle
    ? { name: bundle.name, amount: bundle.amount }
    : PLANS[planId];

  // Subtotal is the catalogue price before the existing bundle discount.
  const listSubtotal = isBundle
    ? bundle.items.reduce((sum, item) => sum + Number(item.price), 0)
    : Number(plan.amount);

  // Preserve the existing bundle discount independently of TEST99.
  const bundleDiscount = isBundle ? Number(bundle.discount || 0) : 0;

  // The coupon applies to the server-calculated price after the bundle discount.
  // All calculations use integer paise to avoid floating-point money errors.
  const preCouponPaise = Math.round(Number(plan.amount) * 100);
  const subtotalPaise = Math.round(listSubtotal * 100);
  const bundleDiscountPaise = Math.round(bundleDiscount * 100);

  if (
    !Number.isSafeInteger(preCouponPaise) ||
    preCouponPaise < 1 ||
    !Number.isSafeInteger(subtotalPaise) ||
    subtotalPaise < 1 ||
    !Number.isSafeInteger(bundleDiscountPaise) ||
    bundleDiscountPaise < 0
  ) {
    return {
      ok: false,
      status: 400,
      message: "Invalid server-side pricing",
    };
  }

  const couponCode = String(input.couponCode || "")
    .trim()
    .toUpperCase();

  if (couponCode && couponCode !== "TEST99") {
    return {
      ok: false,
      status: 400,
      message: "Invalid coupon code",
    };
  }

  if (couponCode === "TEST99" && process.env.NODE_ENV === "production") {
    return {
      ok: false,
      status: 403,
      message: "TEST99 is disabled in production",
    };
  }

  const couponDiscountPaise =
    couponCode === "TEST99"
      ? Math.round((preCouponPaise * 99) / 100)
      : 0;

  const finalPaise = preCouponPaise - couponDiscountPaise;

  if (!Number.isSafeInteger(finalPaise) || finalPaise < 1) {
    return {
      ok: false,
      status: 400,
      message: "Calculated payment amount is invalid",
    };
  }

  return {
    ok: true,
    isBundle,
    bundle,
    plan,
    subtotal: subtotalPaise / 100,
    discount: bundleDiscountPaise / 100,
    preCouponAmount: preCouponPaise / 100,
    couponCode,
    couponDiscount: couponDiscountPaise / 100,
    amount: finalPaise / 100,
  };
}

router.post("/coupons/validate", publicLimit, async (req, res) => {
  try {
    const input = req.body || {};

    if (!String(input.couponCode || "").trim()) {
      return res.status(400).json({
        success: false,
        message: "Enter a coupon code",
      });
    }

    const pricing = buildPricingQuote(input);

    if (!pricing.ok) {
      return res.status(pricing.status).json({
        success: false,
        message: pricing.message,
      });
    }

    return res.json({
      success: true,
      quote: {
        subtotal: pricing.subtotal,
        discount: pricing.discount,
        preCouponAmount: pricing.preCouponAmount,
        couponCode: pricing.couponCode,
        couponDiscount: pricing.couponDiscount,
        amount: pricing.amount,
        currency: "INR",
      },
    });
  } catch (error) {
    console.error("Coupon validation error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to validate coupon",
    });
  }
});

'''
    order_marker = 'router.post("/orders", publicLimit, async (req, res) => {'
    if payment.count(order_marker) != 1:
        raise RuntimeError("Could not uniquely find the order route. No files have been changed.")
    payment = payment.replace(order_marker, helper + order_marker, 1)

    old_validation = '''    const { customerName, customerEmail, customerMobile, planId, planIds } = req.body || {};
    const isBundle = Array.isArray(planIds);
    const bundle = isBundle ? quoteBundle(planIds) : null;
    if ((isBundle && !bundle) || (!isBundle && (typeof planId !== "string" || !Object.hasOwn(PLANS, planId)))) {
      return res.status(400).json({ message: "Invalid plan or bundle items" });
    }
'''
    new_validation = '''    const { customerName, customerEmail, customerMobile, planId } = req.body || {};
    const pricing = buildPricingQuote(req.body || {});

    if (!pricing.ok) {
      return res.status(pricing.status).json({
        success: false,
        message: pricing.message,
      });
    }

    const {
      isBundle,
      bundle,
      plan,
      subtotal,
      discount,
      preCouponAmount,
      couponCode,
      couponDiscount,
      amount,
    } = pricing;
'''
    payment = replace_once(payment, old_validation, new_validation, "Order validation")

    payment = replace_once(
        payment,
        '    const plan = isBundle ? { name: bundle.name, amount: bundle.amount } : PLANS[planId];\n',
        '',
        "Old plan pricing line",
    )

    old_order_pricing = '''      items: isBundle ? bundle.items : [],
      discount: isBundle ? bundle.discount : 0,
      amount: plan.amount, // Server sets price, never trust frontend amount.
'''
    new_order_pricing = '''      items: isBundle ? bundle.items : [],
      subtotal,
      discount,
      preCouponAmount,
      couponCode: couponCode || undefined,
      couponDiscount,
      amount, // Server-calculated final amount; never trust frontend amount.
'''
    payment = replace_once(payment, old_order_pricing, new_order_pricing, "Order saved pricing")

    old_public_order = '''    items: order.items || [],
    discount: order.discount || 0,
    amount: order.amount,
'''
    new_public_order = '''    items: order.items || [],
    subtotal: order.subtotal ?? null,
    discount: order.discount || 0,
    preCouponAmount: order.preCouponAmount ?? order.amount,
    couponCode: order.couponCode || "",
    couponDiscount: order.couponDiscount || 0,
    amount: order.amount,
'''
    payment = replace_once(payment, old_public_order, new_public_order, "Public order response")

    # ------------------------------------------------------------
    # 2. Add fields to MongoDB's PaymentOrder schema.
    # ------------------------------------------------------------
    old_schema_pricing = '''    items: [{ id: String, name: String, price: Number, category: String }],
    discount: { type: Number, default: 0 },
    amount: { type: Number, required: true, min: 0.01 },
'''
    new_schema_pricing = '''    items: [{ id: String, name: String, price: Number, category: String }],
    subtotal: { type: Number, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    preCouponAmount: { type: Number, min: 0 },
    couponCode: { type: String, trim: true, uppercase: true, maxlength: 30 },
    couponDiscount: { type: Number, default: 0, min: 0 },
    amount: { type: Number, required: true, min: 0.01 },
'''
    models = replace_once(models, old_schema_pricing, new_schema_pricing, "MongoDB order schema")

    # ------------------------------------------------------------
    # 3. Replace checkout component with coupon-enabled version.
    # ------------------------------------------------------------
    component = r'''import React, { useEffect, useState } from 'react';
import '../Style/PaymentStep.css';

const CURRENCY = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

async function jsonFetch(url, options) {
  let response;

  try {
    response = await fetch(url, options);
  } catch {
    throw new Error('Cannot reach backend. Check Node.js port 5000 and the Vite proxy.');
  }

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(`Backend returned an invalid response (HTTP ${response.status}).`);
  }

  if (!response.ok || data.success === false) {
    throw new Error(data.message || `HTTP ${response.status}`);
  }

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

  const [couponInput, setCouponInput] = useState('');
  const [couponQuote, setCouponQuote] = useState(null);
  const [couponMessage, setCouponMessage] = useState('');
  const [couponError, setCouponError] = useState(false);
  const [couponBusy, setCouponBusy] = useState(false);

  const planIds = plans.map((p) => p.id);
  const planKey = planIds.join('|');

  useEffect(() => {
    let active = true;

    jsonFetch('/health')
      .then((data) => {
        if (active) {
          setConnection(data.databaseConnected ? 'connected' : 'offline');
        }
      })
      .catch(() => {
        if (active) setConnection('offline');
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setCouponInput('');
    setCouponQuote(null);
    setCouponMessage('');
    setCouponError(false);
  }, [planKey]);

  async function applyCoupon(event) {
    event.preventDefault();
    setCouponMessage('');
    setCouponError(false);
    setError('');

    if (!couponInput.trim()) {
      setCouponError(true);
      setCouponMessage('Enter a coupon code.');
      return;
    }

    setCouponBusy(true);

    try {
      const data = await jsonFetch('/api/payment/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planIds,
          couponCode: couponInput.trim(),
        }),
      });

      if (!data.quote) {
        throw new Error('Backend did not return coupon pricing.');
      }

      setCouponQuote(data.quote);
      setCouponInput(data.quote.couponCode);
      setCouponMessage(
        `${data.quote.couponCode} applied. You save ${CURRENCY.format(Number(data.quote.couponDiscount))}.`
      );
    } catch (err) {
      setCouponQuote(null);
      setCouponError(true);
      setCouponMessage(err.message);
    } finally {
      setCouponBusy(false);
    }
  }

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
          planIds,
          couponCode: couponQuote?.couponCode || '',
        }),
      });

      if (!data.order?.orderId || !data.accessToken) {
        throw new Error('Order response is missing its ID/token.');
      }

      setOrderData(data);
      setOrderStatus(data.order.status || 'pending');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const id = orderData?.order?.orderId;
  const token = orderData?.accessToken;

  useEffect(() => {
    if (!id || !token || orderStatus !== 'pending') return;

    let cancelled = false;

    const check = async () => {
      try {
        const data = await jsonFetch(
          `/api/payment/orders/${encodeURIComponent(id)}/status`,
          {
            headers: { 'x-order-token': token },
            cache: 'no-store',
          }
        );

        if (!cancelled) {
          setOrderStatus(data.order?.status || 'pending');
          setError('');
        }
      } catch (err) {
        if (!cancelled) setError(`Status check: ${err.message}`);
      }
    };

    check();
    const interval = setInterval(check, 8000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [id, token, orderStatus]);

  async function submitReference(event) {
    event.preventDefault();
    setBusy(true);
    setError('');

    try {
      await jsonFetch(
        `/api/payment/orders/${encodeURIComponent(id)}/claim`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-order-token': token,
          },
          body: JSON.stringify({ upiReference: utr.trim() }),
        }
      );

      setReferenceSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const expectedAmount = couponQuote
    ? Number(couponQuote.amount)
    : Number(total);

  const amountMatches = orderData
    ? Math.round(Number(orderData.order.amount) * 100) ===
      Math.round(expectedAmount * 100)
    : true;

  return (
    <section className="bup-payment-flow" aria-live="polite">
      <p className="bup-payment-connection">
        Backend &amp; database:{' '}
        <strong>
          {connection === 'connected'
            ? 'Connected'
            : connection === 'checking'
              ? 'Checking…'
              : 'Unavailable'}
        </strong>
      </p>

      {!orderData && (
        <>
          <form className="bup-coupon-form" onSubmit={applyCoupon}>
            <label htmlFor="bup-coupon-code">Coupon code</label>
            <input
              id="bup-coupon-code"
              value={couponInput}
              onChange={(event) => {
                setCouponInput(event.target.value);
                setCouponQuote(null);
                setCouponMessage('');
                setCouponError(false);
              }}
              maxLength={30}
              autoComplete="off"
              placeholder="Enter TEST99"
              disabled={couponBusy || busy}
            />
            <button
              type="submit"
              disabled={couponBusy || busy || connection !== 'connected'}
            >
              {couponBusy ? 'Checking…' : 'Apply coupon'}
            </button>
          </form>

          {couponMessage && (
            <p
              role={couponError ? 'alert' : 'status'}
              className={couponError ? 'bup-payment-error' : 'bup-payment-ok'}
            >
              {couponMessage}
            </p>
          )}

          {couponQuote && (
            <div className="bup-coupon-summary" aria-live="polite">
              <p>
                <strong>Item subtotal:</strong>{' '}
                {CURRENCY.format(Number(couponQuote.subtotal))}
              </p>

              {Number(couponQuote.discount) > 0 && (
                <p>
                  <strong>Existing bundle discount:</strong> −
                  {CURRENCY.format(Number(couponQuote.discount))}
                </p>
              )}

              <p>
                <strong>Price before coupon:</strong>{' '}
                {CURRENCY.format(Number(couponQuote.preCouponAmount))}
              </p>
              <p>
                <strong>{couponQuote.couponCode} discount:</strong> −
                {CURRENCY.format(Number(couponQuote.couponDiscount))}
              </p>
              <p>
                <strong>Final amount:</strong>{' '}
                {CURRENCY.format(Number(couponQuote.amount))}
              </p>
              <p>
                TEST99 is for testing only and is rejected when the backend
                runs with NODE_ENV=production.
              </p>
            </div>
          )}

          <p>
            Creating an order saves it in MongoDB as pending. Payment is
            optional while you test; do not send money until catalogue pricing
            and service fulfilment are approved.
          </p>

          <button
            type="button"
            className="bup-checkout-button"
            disabled={busy || connection !== 'connected'}
            onClick={createOrder}
          >
            {busy ? 'Creating order…' : 'Create payment order'}
          </button>
        </>
      )}

      {orderData && (
        <>
          <p>
            <strong>Order:</strong> <code>{id}</code>
          </p>

          {orderData.order.couponCode && (
            <>
              <p>
                <strong>Item subtotal:</strong>{' '}
                {CURRENCY.format(Number(orderData.order.subtotal ?? 0))}
              </p>

              {Number(orderData.order.discount) > 0 && (
                <p>
                  <strong>Bundle discount:</strong> −
                  {CURRENCY.format(Number(orderData.order.discount))}
                </p>
              )}

              <p>
                <strong>Price before coupon:</strong>{' '}
                {CURRENCY.format(Number(orderData.order.preCouponAmount))}
              </p>
              <p>
                <strong>
                  Coupon ({orderData.order.couponCode}) discount:
                </strong>{' '}
                −{CURRENCY.format(Number(orderData.order.couponDiscount))}
              </p>
            </>
          )}

          <p>
            <strong>Server amount:</strong>{' '}
            {CURRENCY.format(Number(orderData.order.amount))}
          </p>
          <p>
            <strong>Payment status:</strong>{' '}
            {orderStatus === 'paid'
              ? 'Bank verified — paid'
              : orderStatus === 'rejected'
                ? 'Rejected'
                : 'Pending bank verification'}
          </p>

          {!amountMatches && (
            <p role="alert" className="bup-payment-error">
              The backend amount differs from the expected checkout amount.
              Do NOT pay this order. Check the catalogue and coupon pricing.
            </p>
          )}

          {orderStatus === 'paid' && (
            <p className="bup-payment-ok" role="status">
              Payment successful — independently verified by the admin.
            </p>
          )}

          {orderStatus === 'pending' && amountMatches && (
            <>
              <p>
                <strong>Connection testing:</strong> The order has been
                created. Payment is optional; do not pay until catalogue
                pricing and service fulfilment are approved.
              </p>

              {orderData.qrCode && (
                <img
                  className="bup-payment-qr"
                  src={orderData.qrCode}
                  alt="UPI payment QR code for the displayed amount"
                />
              )}

              {orderData.upiUrl && (
                <a className="bup-payment-upi" href={orderData.upiUrl}>
                  Open UPI app
                </a>
              )}

              <p className="bup-payment-caution">
                An SMS or entered UTR does not confirm payment. Only
                bank-verified admin approval changes the status.
              </p>

              {!referenceSent ? (
                <form onSubmit={submitReference}>
                  <label htmlFor="bup-utr">
                    UPI reference (only after you genuinely paid)
                  </label>
                  <input
                    id="bup-utr"
                    value={utr}
                    onChange={(event) => setUtr(event.target.value)}
                    required
                    minLength={10}
                    maxLength={30}
                    pattern="[A-Za-z0-9-]{10,30}"
                    placeholder="UPI transaction reference"
                  />
                  <button type="submit" disabled={busy}>
                    Submit reference for review
                  </button>
                </form>
              ) : (
                <p className="bup-payment-ok">
                  Reference submitted for review, not yet verified.
                </p>
              )}
            </>
          )}
        </>
      )}

      {error && (
        <p role="alert" className="bup-payment-error">
          {error}
        </p>
      )}
    </section>
  );
}
'''

    # ------------------------------------------------------------
    # 4. Add coupon styling without removing existing CSS.
    # ------------------------------------------------------------
    coupon_css = r'''

/* TEST99 coupon checkout */
.bup-coupon-form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
  margin: 1rem 0;
}

.bup-coupon-form label {
  flex-basis: 100%;
  font-weight: 600;
}

.bup-coupon-form input {
  flex: 1 1 12rem;
  min-width: 0;
  padding: 0.7rem 0.8rem;
  border: 1px solid rgba(127, 127, 127, 0.55);
  border-radius: 8px;
  font: inherit;
}

.bup-coupon-form button {
  padding: 0.7rem 1rem;
  border: 1px solid rgba(127, 127, 127, 0.55);
  border-radius: 8px;
  font: inherit;
  cursor: pointer;
}

.bup-coupon-form button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.bup-coupon-summary {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid rgba(127, 127, 127, 0.4);
  border-radius: 10px;
}

.bup-coupon-summary p {
  margin: 0.4rem 0;
}
'''

    if "bup-coupon-form" not in css:
        css += coupon_css

    # Back up all files before writing any changes.
    backup_dir = ROOT / f"_test99_coupon_backup_{datetime.now():%Y%m%d_%H%M%S}"
    backup_dir.mkdir(parents=True, exist_ok=False)

    for path in (payment_path, models_path, component_path, css_path):
        shutil.copy2(path, backup_dir / path.name)

    payment_path.write_text(payment, encoding="utf-8")
    models_path.write_text(models, encoding="utf-8")
    component_path.write_text(component, encoding="utf-8")
    css_path.write_text(css, encoding="utf-8")

    print("TEST99 patch applied successfully.")
    print(f"Backup folder: {backup_dir}")
    print("Updated: backend/payment.js")
    print("Updated: backend/models.js")
    print("Updated: frontend/src/components/PaymentStep.jsx")
    print("Updated: frontend/src/Style/PaymentStep.css")

except Exception as exc:
    print(f"PATCH ABORTED: {exc}")
    print("If the patch was aborted, check the error before trying again.")
    sys.exit(1)
