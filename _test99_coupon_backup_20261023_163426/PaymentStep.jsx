import React, { useEffect, useState } from 'react';
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
