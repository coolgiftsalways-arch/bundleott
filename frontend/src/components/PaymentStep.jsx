import React, { useEffect, useRef, useState } from "react";
import "../Style/PaymentStep.css";
import { OrderResultCard } from "../pages/OrderResult";

const CURRENCY = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

async function jsonFetch(url, options = {}) {
  let response;

  try {
    response = await fetch(url, options);
  } catch {
    throw new Error(
      "Cannot reach backend. Check Node.js port 5000 and the Vite proxy.",
    );
  }

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      `Backend returned an invalid response (HTTP ${response.status}).`,
    );
  }

  if (!response.ok || data.success === false) {
    throw new Error(data.message || `HTTP ${response.status}`);
  }

  return data;
}

export default function PaymentStep({ customer, plans, total }) {
  const [orderData, setOrderData] = useState(null);
  const [orderStatus, setOrderStatus] = useState("pending");
  const [paymentId, setPaymentId] = useState("");

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [utr, setUtr] = useState("");
  const [referenceSent, setReferenceSent] = useState(false);

  const [connection, setConnection] = useState("checking");

  const [couponInput, setCouponInput] = useState("");
  const [couponQuote, setCouponQuote] = useState(null);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponError, setCouponError] = useState(false);
  const [couponBusy, setCouponBusy] = useState(false);

  const autoCreateAttempted = useRef(false);

  const safePlans = Array.isArray(plans) ? plans : [];

  const selections = safePlans
    .filter((plan) => plan?.id)
    .map((plan) => ({
      id: plan.id,
      months: String(plan.months || "1"),
    }));

  const planIds = selections.map((item) => item.id);

  const planKey = selections
    .map((item) => `${item.id}:${item.months}`)
    .join("|");

  // Scroll to payment QR after order creation.
  useEffect(() => {
    if (!orderData?.qrCode) return;

    const timer = setTimeout(() => {
      document.querySelector(".bup-payment-qr")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [orderData?.qrCode]);

  // Backend connection.
  useEffect(() => {
    let active = true;

    jsonFetch("/health")
      .then((data) => {
        if (!active) return;

        setConnection(data.databaseConnected ? "connected" : "offline");
      })
      .catch(() => {
        if (active) setConnection("offline");
      });

    return () => {
      active = false;
    };
  }, []);

  // Reset checkout when selected plans or durations change.
  useEffect(() => {
    setCouponInput("");
    setCouponQuote(null);
    setCouponMessage("");
    setCouponError(false);
    setError("");

    setOrderData(null);
    setOrderStatus("pending");
    setPaymentId("");

    setReferenceSent(false);
    setUtr("");

    autoCreateAttempted.current = false;
  }, [planKey]);

  // Apply coupon.
  async function applyCoupon(event) {
    event.preventDefault();

    setCouponMessage("");
    setCouponError(false);
    setError("");

    if (!couponInput.trim()) {
      setCouponError(true);
      setCouponMessage("Enter a coupon code.");
      return;
    }

    if (!planIds.length) {
      setCouponError(true);
      setCouponMessage("Please select at least one service.");
      return;
    }

    setCouponBusy(true);

    try {
      const data = await jsonFetch("/api/payment/coupons/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planIds,
          selections,
          couponCode: couponInput.trim(),
          customerEmail: customer?.email || "",
        }),
      });

      if (!data.quote) {
        throw new Error("Backend did not return coupon pricing.");
      }

      setCouponQuote(data.quote);
      setCouponInput(data.quote.couponCode);

      setCouponMessage(
        `${data.quote.couponCode} applied. You save ${CURRENCY.format(
          Number(data.quote.couponDiscount),
        )}. New total: ${CURRENCY.format(Number(data.quote.amount))}.`,
      );

      // The old order/QR has the old price — create a fresh order with the coupon.
      setOrderData(null);
      await createOrder(data.quote.couponCode);
    } catch (err) {
      setCouponQuote(null);
      setCouponError(true);
      setCouponMessage(err?.message || "Unable to apply coupon.");
    } finally {
      setCouponBusy(false);
    }
  }

  // Remove coupon and go back to the normal price.
  async function removeCoupon() {
    setCouponQuote(null);
    setCouponInput("");
    setCouponMessage("");
    setCouponError(false);
    setOrderData(null);
    await createOrder("");
  }

  // Create payment order. Pass a coupon code to override the current one ("" = no coupon).
  async function createOrder(couponOverride) {
    if (!customer?.fullName) {
      setError("Customer name is required.");
      return;
    }

    if (!customer?.email) {
      setError("Customer email is required.");
      return;
    }

    if (!planIds.length) {
      setError("Please select at least one service.");
      return;
    }

    setBusy(true);
    setError("");

    try {
      const requestBody = {
        customerName: customer.fullName,
        customerEmail: customer.email,
        customerMobile: customer.phone,
        planIds,
        selections,
        couponCode:
          couponOverride !== undefined
            ? couponOverride
            : couponQuote?.couponCode || "",
      };

      console.log("========== BUNDLEUP PAYMENT REQUEST ==========");
      console.log("Selected plans:", selections);
      console.log("Plan IDs:", planIds);
      console.log("Customer email:", customer.email);
      console.log("==============================================");

      const data = await jsonFetch("/api/payment/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!data.order?.orderId || !data.accessToken) {
        throw new Error("Order response is missing its ID/token.");
      }

      setOrderData(data);
      setOrderStatus(data.order.status || "pending");
      setPaymentId("");

      setReferenceSent(false);
      setUtr("");
    } catch (err) {
      setError(err?.message || "Unable to create payment order.");
    } finally {
      setBusy(false);
    }
  }

  // Automatically create order once the backend is connected.
  useEffect(() => {
    if (
      connection !== "connected" ||
      !customer?.fullName ||
      !customer?.email ||
      !safePlans.length ||
      orderData ||
      busy ||
      autoCreateAttempted.current
    ) {
      return;
    }

    autoCreateAttempted.current = true;
    createOrder();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection, planKey, customer?.email, customer?.fullName]);

  const id = orderData?.order?.orderId;
  const token = orderData?.accessToken;

  // Check payment status automatically (backend asks Razorpay directly).
  useEffect(() => {
    if (!id || !token || orderStatus !== "pending") {
      return;
    }

    let cancelled = false;
    let inFlight = false;
    const startedAt = Date.now();
    const MAX_POLL_MS = 30 * 60 * 1000; // stop polling after 30 minutes

    const check = async () => {
      if (inFlight || cancelled) return;
      if (Date.now() - startedAt > MAX_POLL_MS) {
        clearInterval(interval);
        return;
      }
      inFlight = true;
      try {
        const data = await jsonFetch(
          `/api/payment/orders/${encodeURIComponent(id)}/status`,
          {
            headers: {
              "x-order-token": token,
            },
            cache: "no-store",
          },
        );

        if (!cancelled) {
          setOrderStatus(data.order?.status || "pending");
          if (data.order?.paymentId) setPaymentId(data.order.paymentId);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            `Status check: ${err?.message || "Unable to check order status."}`,
          );
        }
      } finally {
        inFlight = false;
      }
    };

    // Check immediately when the customer comes back from the Razorpay tab.
    const onVisible = () => {
      if (document.visibilityState === "visible") check();
    };

    check();

    const interval = setInterval(check, 5000);
    window.addEventListener("focus", check);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      clearInterval(interval);
      window.removeEventListener("focus", check);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [id, token, orderStatus]);

  // Submit UPI reference.
  async function submitReference(event) {
    event.preventDefault();

    if (!id || !token) {
      setError("Order information is missing.");
      return;
    }

    if (!utr.trim()) {
      setError("Enter your UPI reference.");
      return;
    }

    setBusy(true);
    setError("");

    try {
      await jsonFetch(`/api/payment/orders/${encodeURIComponent(id)}/claim`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-order-token": token,
        },
        body: JSON.stringify({
          upiReference: utr.trim(),
        }),
      });

      setReferenceSent(true);
    } catch (err) {
      setError(err?.message || "Unable to submit payment reference.");
    } finally {
      setBusy(false);
    }
  }

  // Amount validation.
  const hasExpectedAmount =
    total !== null && total !== undefined && Number.isFinite(Number(total));

  const expectedAmount = couponQuote
    ? Number(couponQuote.amount)
    : Number(total);

  const amountMatches = orderData
    ? !hasExpectedAmount ||
      Math.round(Number(orderData.order.amount) * 100) ===
        Math.round(expectedAmount * 100)
    : true;

  // Show the order result as soon as Razorpay confirms the payment.
  if (orderData && (orderStatus === "paid" || orderStatus === "rejected")) {
    return (
      <section className="bup-payment-flow" aria-live="polite">
        <OrderResultCard
          status={orderStatus === "paid" ? "paid" : "failed"}
          order={{
            ...orderData.order,
            customerName: customer?.fullName,
            paymentId,
          }}
        />
      </section>
    );
  }

  return (
    <section className="bup-payment-flow" aria-live="polite">
      {!orderData && (
        <div className="bup-payment-preparing" role="status">
          {connection === "connected"
            ? "Preparing your payment QR code..."
            : "Connecting to payment server..."}
        </div>
      )}

      {orderData && (
        <>
          <p>
            <strong>Order:</strong> <code>{id}</code>
          </p>

          {orderData.order.couponCode && (
            <>
              <p>
                <strong>Item subtotal:</strong>{" "}
                {CURRENCY.format(Number(orderData.order.subtotal ?? 0))}
              </p>

              {Number(orderData.order.discount) > 0 && (
                <p>
                  <strong>Bundle discount:</strong> −
                  {CURRENCY.format(Number(orderData.order.discount))}
                </p>
              )}

              <p>
                <strong>Price before coupon:</strong>{" "}
                {CURRENCY.format(Number(orderData.order.preCouponAmount))}
              </p>

              <p>
                <strong>Coupon ({orderData.order.couponCode}) discount:</strong>{" "}
                −{CURRENCY.format(Number(orderData.order.couponDiscount))}
              </p>
            </>
          )}

          <p>
            <strong>Server amount:</strong>{" "}
            {CURRENCY.format(Number(orderData.order.amount))}
          </p>

          <p>
            <strong>Payment status:</strong>{" "}
            Waiting for payment — this page updates automatically
          </p>

          {!amountMatches && (
            <p role="alert" className="bup-payment-error">
              The backend amount differs from the expected checkout amount. Do
              NOT pay this order. Check catalogue and coupon pricing.
            </p>
          )}

          {orderStatus === "pending" && (
            <div className="bup-coupon-box">
              {couponQuote ? (
                <div className="bup-coupon-applied">
                  <span>
                    🎟️ <strong>{couponQuote.couponCode}</strong> applied
                  </span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    disabled={busy || couponBusy}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form className="bup-coupon-form" onSubmit={applyCoupon}>
                  <label htmlFor="bup-coupon">Have a coupon code?</label>
                  <input
                    id="bup-coupon"
                    value={couponInput}
                    onChange={(event) =>
                      setCouponInput(event.target.value.toUpperCase())
                    }
                    placeholder="Enter coupon code"
                    autoComplete="off"
                    maxLength={30}
                  />
                  <button type="submit" disabled={couponBusy || busy}>
                    {couponBusy || busy ? "Applying…" : "Apply"}
                  </button>
                </form>
              )}

              {couponMessage && (
                <p
                  className={
                    couponError ? "bup-coupon-msg bup-coupon-msg-error" : "bup-coupon-msg"
                  }
                  role={couponError ? "alert" : "status"}
                >
                  {couponMessage}
                </p>
              )}
            </div>
          )}

          {orderStatus === "pending" && amountMatches && (
            <>
              {orderData.qrCode && (
                <div className="bup-static-qr-section">
                  <h3 className="bup-static-qr-title">BundleUpOTT</h3>

                  <p>
                    Scan to pay{" "}
                    <strong>
                      {CURRENCY.format(Number(orderData.order.amount))}
                    </strong>
                  </p>

                  <div className="bup-payment-qr-wrapper">
                    <img
                      id="bundleott-payment-qr"
                      className="bup-payment-qr"
                      src={orderData.qrCode}
                      alt="BundleUpOTT payment QR code"
                    />

                    <a
                      className="bup-download-qr"
                      href={orderData.qrCode}
                      download={`BundleUpOTT-QR-${id}.png`}
                    >
                      <span>↓</span>
                      Download QR Code
                    </a>
                  </div>

                  <p className="bup-static-qr-notice">
                    Scan this QR to open your Razorpay payment page. The amount
                    is fixed for this order. Verify it before paying.
                  </p>

                  {(orderData.paymentUrl || orderData.upiUrl) && (
                    <a
                      className="bup-payment-upi"
                      href={orderData.paymentUrl || orderData.upiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Pay fixed amount with Razorpay
                    </a>
                  )}
                </div>
              )}

              {!referenceSent && (
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
              )}

              {referenceSent && (
                <p className="bup-payment-ok">
                  Reference submitted for review, not yet verified.
                </p>
              )}
            </>
          )}
        </>
      )}

      {error && (
        <div role="alert" className="bup-payment-error">
          <strong>Payment error</strong>
          <p>{error}</p>

          {error.toLowerCase().includes("not configured for payment") && (
            <p>
              One or more selected services are not enabled for payment in the
              backend. Remove unsupported services or configure them in the
              payment catalogue.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
