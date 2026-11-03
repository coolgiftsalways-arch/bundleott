import React, { useEffect, useRef, useState } from "react";
import "../Style/PaymentStep.css";

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
  const [qrExpired, setQrExpired] = useState(false);
  const [qrExpiresAt, setQrExpiresAt] = useState(null);
  const [timeLeft, setTimeLeft] = useState(180);

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

    setQrExpired(false);
    setQrExpiresAt(null);
    setTimeLeft(180);

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
        )}.`,
      );
    } catch (err) {
      setCouponQuote(null);
      setCouponError(true);
      setCouponMessage(err?.message || "Unable to apply coupon.");
    } finally {
      setCouponBusy(false);
    }
  }

  // Create payment order.
  async function createOrder() {
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
        couponCode: couponQuote?.couponCode || "",
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

      setQrExpired(false);
      setQrExpiresAt(Date.now() + 3 * 60 * 1000);
      setTimeLeft(180);

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

  // Three-minute QR countdown.
  useEffect(() => {
    if (!orderData?.qrCode || !qrExpiresAt || qrExpired) return;

    const updateCountdown = () => {
      const remainingSeconds = Math.max(
        0,
        Math.ceil((qrExpiresAt - Date.now()) / 1000),
      );

      setTimeLeft(remainingSeconds);

      if (remainingSeconds === 0) {
        setQrExpired(true);
      }
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 250);

    return () => clearInterval(timer);
  }, [id, orderData?.qrCode, qrExpiresAt, qrExpired]);

  // Check payment status.
  useEffect(() => {
    if (!id || !token || orderStatus !== "pending") {
      return;
    }

    let cancelled = false;

    const check = async () => {
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
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            `Status check: ${err?.message || "Unable to check order status."}`,
          );
        }
      }
    };

    check();

    const interval = setInterval(check, 8000);

    return () => {
      cancelled = true;
      clearInterval(interval);
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
            {orderStatus === "paid"
              ? "Bank verified — paid"
              : orderStatus === "rejected"
                ? "Rejected"
                : "Pending bank verification"}
          </p>

          {!amountMatches && (
            <p role="alert" className="bup-payment-error">
              The backend amount differs from the expected checkout amount. Do
              NOT pay this order. Check catalogue and coupon pricing.
            </p>
          )}

          {orderStatus === "paid" && (
            <p className="bup-payment-ok" role="status">
              Payment successful — independently verified by the admin.
            </p>
          )}

          {orderStatus === "pending" && amountMatches && (
            <>
              {orderData.qrCode && !qrExpired && (
                <div className="bup-payment-countdown">
                  <span>Complete your payment within</span>
                  <strong>
                    {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                    {String(timeLeft % 60).padStart(2, "0")}
                  </strong>
                </div>
              )}

              {orderData.qrCode && !qrExpired && (
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

              {qrExpired && orderStatus !== "paid" && (
                <div
                  className="bup-processing-card"
                  role="status"
                  aria-live="polite"
                >
                  <div className="bup-processing-icon" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 7 10 17l-5-5" />
                    </svg>
                  </div>

                  <span className="bup-processing-eyebrow">PAYMENT STATUS</span>

                  <h2>We're processing your payment</h2>

                  <p className="bup-processing-description">
                    Thank you! If you've completed the payment, our team will
                    verify the transaction before confirming it.
                  </p>

                  <div className="bup-processing-timeline">
                    <div className="bup-timeline-icon" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                    </div>

                    <div>
                      <strong>What happens next?</strong>
                      <p>
                        You'll receive an email within 2–3 hours after your
                        payment has been verified.
                      </p>
                    </div>
                  </div>

                  <div className="bup-processing-note">
                    <span aria-hidden="true">i</span>
                    <p>
                      If you haven't completed the payment, no payment is
                      confirmed. Your order remains pending until verification.
                    </p>
                  </div>

                  <p className="bup-processing-order">
                    Order reference: <code>{id}</code>
                  </p>
                </div>
              )}

              {!qrExpired && !referenceSent && (
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
