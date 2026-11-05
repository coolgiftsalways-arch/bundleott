import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../Style/OrderResult.css";

const CURRENCY = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

const formatDate = (value) =>
  value && !Number.isNaN(new Date(value).getTime())
    ? new Date(value).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
    : "";

/**
 * The result card. Used inside checkout (PaymentStep) and on the /order-result page.
 * status: "paid" | "pending" | "failed" | "checking"
 */
export function OrderResultCard({ status, order, message }) {
  const paid = status === "paid";
  const failed = status === "failed";
  const checking = status === "checking";

  const title = paid
    ? "Payment successful!"
    : failed
      ? "Payment not completed"
      : checking
        ? "Checking your payment…"
        : "Payment is being confirmed";

  const description = paid
    ? `Thank you${order?.customerName ? `, ${order.customerName.split(" ")[0]}` : ""}! We've received your payment. A confirmation email is on its way, and your subscription will be activated shortly.`
    : failed
      ? message || "Your payment was not completed. No money has been taken for this order. If money was deducted, it will be refunded automatically by your bank, or contact our support with your order ID."
      : checking
        ? "Please wait a moment while we confirm your payment with Razorpay."
        : message || "We haven't received confirmation from the bank yet. This page updates automatically. Please don't pay again.";

  return (
    <div className={`bup-result bup-result-${paid ? "paid" : failed ? "failed" : "pending"}`} role="status" aria-live="polite">
      <div className="bup-result-icon" aria-hidden="true">
        {paid ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        ) : failed ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        ) : (
          <span className="bup-result-spinner" />
        )}
      </div>

      <span className="bup-result-eyebrow">{paid ? "ORDER CONFIRMED" : failed ? "PAYMENT FAILED" : "PAYMENT STATUS"}</span>
      <h2>{title}</h2>
      <p className="bup-result-description">{description}</p>

      {order && (
        <dl className="bup-result-details">
          {order.planName && (<><dt>Subscription</dt><dd>{order.planName}</dd></>)}
          {order.amount !== undefined && (<><dt>Amount</dt><dd>{CURRENCY.format(Number(order.amount))}</dd></>)}
          {order.paymentId && (<><dt>Payment ID</dt><dd><code>{order.paymentId}</code></dd></>)}
          {order.orderId && (<><dt>Order ID</dt><dd><code>{order.orderId}</code></dd></>)}
          {order.createdAt && (<><dt>Order date</dt><dd>{formatDate(order.createdAt)}</dd></>)}
        </dl>
      )}

      {(paid || failed) && (
        <Link className="bup-result-button" to="/our-plans">
          {paid ? "Back to plans" : "Try again"}
        </Link>
      )}
    </div>
  );
}

/**
 * Page at /order-result. Razorpay redirects here after payment with
 * razorpay_payment_id, razorpay_payment_link_id, ..._reference_id, ..._status, razorpay_signature.
 */
export default function OrderResult() {
  const [params] = useSearchParams();
  const [state, setState] = useState({ status: "checking", order: null, message: "" });

  useEffect(() => {
    const linkStatus = params.get("razorpay_payment_link_status");

    if (!params.get("razorpay_signature")) {
      setState({ status: "failed", order: null, message: "We couldn't find payment details in this link. If you paid, check your email or contact support with your order ID." });
      return undefined;
    }

    let cancelled = false;
    let attempts = 0;
    let timer;

    const verify = async () => {
      attempts += 1;
      try {
        const response = await fetch(`/api/payment/razorpay/callback-verify?${params.toString()}`, { cache: "no-store" });
        const data = await response.json().catch(() => ({}));
        if (cancelled) return;

        if (!response.ok || data.success === false) {
          setState({ status: "failed", order: null, message: data.message || "We couldn't verify this payment." });
          return;
        }

        const orderStatus = data.order?.status;
        if (orderStatus === "paid") {
          setState({ status: "paid", order: data.order, message: "" });
        } else if (orderStatus === "rejected" || (linkStatus && linkStatus !== "paid")) {
          setState({ status: "failed", order: data.order, message: "" });
        } else {
          setState({ status: "pending", order: data.order, message: "" });
          if (attempts < 20) timer = setTimeout(verify, 4000); // keep checking ~80s
        }
      } catch {
        if (cancelled) return;
        setState((s) => ({ ...s, status: "pending", message: "Connection problem. Retrying…" }));
        if (attempts < 20) timer = setTimeout(verify, 4000);
      }
    };

    verify();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [params]);

  return (
    <main className="bup-result-page">
      <OrderResultCard status={state.status} order={state.order} message={state.message} />
    </main>
  );
}