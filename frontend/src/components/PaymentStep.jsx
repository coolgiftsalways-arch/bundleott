import React, { useEffect, useRef, useState } from 'react';

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
  const autoCreateAttempted = useRef(false);

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
  if (
    connection !== 'connected' ||
    !customer?.fullName ||
    !customer?.email ||
    !plans?.length ||
    orderData ||
    busy ||
    autoCreateAttempted.current
  ) {
    return;
  }

  autoCreateAttempted.current = true;
  createOrder();
}, [connection, planKey, customer?.email]);

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

  const hasExpectedAmount =
  total !== null &&
  total !== undefined &&
  Number.isFinite(Number(total));

const expectedAmount = couponQuote
  ? Number(couponQuote.amount)
  : Number(total);

const amountMatches = orderData
  ? !hasExpectedAmount ||
    Math.round(Number(orderData.order.amount) * 100) ===
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
