import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "../Style/CustomerDetailsModal.css";
import PaymentStep from "../components/PaymentStep";

const EMPTY_CUSTOMER = {
  fullName: "",
  email: "",
  phone: "",
};

function CrossIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export default function CustomerDetailsModal({
  plans,
  total,
  discount,
  formatPrice,
  onSave,
  onClose,
}) {
  const [customer, setCustomer] = useState(EMPTY_CUSTOMER);
  const [confirmed, setConfirmed] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const firstInputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.lenis?.stop?.();
    const timer = window.setTimeout(() => firstInputRef.current?.focus(), 40);

    const onEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onEscape);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onEscape);
      document.body.style.overflow = oldOverflow;
      window.lenis?.start?.();
    };
  }, [onClose]);

  const updateField = (field, value) => {
    setError("");
    setCustomer((previous) => ({ ...previous, [field]: value }));
  };

  const submitCustomerDetails = (event) => {
    event.preventDefault();
    setError("");

    const cleaned = {
      fullName: customer.fullName.trim().replace(/\s+/g, " "),
      email: customer.email.trim().toLowerCase(),
      phone: customer.phone.replace(/\D/g, ""),
    };

    if (cleaned.fullName.length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(cleaned.phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (!confirmed) {
      setError("Please confirm your contact details.");
      return;
    }

    try {
      // Parent stores a temporary checkout DRAFT in sessionStorage only.
      onSave(cleaned);
      setCustomer(cleaned);
      setSaved(true);
    } catch {
      setError(
        "Could not save your details in this browser. Please try again.",
      );
    }
  };

  return createPortal(
    <div
      className="bup-checkout-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="bup-checkout-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bup-checkout-title"
        ref={modalRef}
      >
        <button
          type="button"
          className="bup-checkout-close"
          onClick={onClose}
          aria-label="Close checkout details"
        >
          <CrossIcon />
        </button>

        <div className="bup-checkout-heading">
          <span className="bup-checkout-eyebrow">BUNDLEUPOTT · CHECKOUT</span>
          <h2 id="bup-checkout-title">
            {saved ? "Your details are ready." : "One step before payment."}
          </h2>
          <p>
            {saved
              ? "Your information is saved in this browser session. No payment has been made."
              : "No login or password needed. Just tell us where we can reach you about your bundle."}
          </p>
          <div className="bup-checkout-steps" aria-label="Checkout progress">
            <span className="bup-step-done">✓ Bundle</span>
            <span className={saved ? "bup-step-done" : "bup-step-active"}>
              2 · Your details
            </span>
            <span>3 · Payment</span>
          </div>
        </div>

        <div className="bup-checkout-columns">
          <div className="bup-checkout-main">
            {saved ? (
              <div className="bup-checkout-success" role="status">
                <span className="bup-success-mark">✓</span>
                <h3>Details saved</h3>
                <p>
                  <strong>{customer.fullName}</strong>
                </p>
                <p>{customer.email}</p>
                <p>+91 {customer.phone}</p>
                <PaymentStep customer={customer} plans={plans} total={total} />
                <button
                  type="button"
                  className="bup-checkout-edit"
                  onClick={() => setSaved(false)}
                >
                  Edit my details
                </button>
              </div>
            ) : (
              <form
                className="bup-checkout-form"
                onSubmit={submitCustomerDetails}
              >
                <h3>Your contact information</h3>
                <label htmlFor="bup-full-name">
                  Full name <span>*</span>
                </label>
                <input
                  ref={firstInputRef}
                  id="bup-full-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  value={customer.fullName}
                  onChange={(event) =>
                    updateField("fullName", event.target.value)
                  }
                  required
                  minLength={2}
                  maxLength={80}
                />

                <label htmlFor="bup-email">
                  Email address <span>*</span>
                </label>
                <input
                  id="bup-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={customer.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  required
                  maxLength={120}
                />

                <label htmlFor="bup-phone">
                  Mobile number <span>*</span>
                </label>
                <div className="bup-phone-wrapper">
                  <span>+91</span>
                  <input
                    id="bup-phone"
                    type="tel"
                    name="tel"
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    pattern="[6-9][0-9]{9}"
                    title="Enter a valid 10-digit Indian mobile number"
                    value={customer.phone}
                    onChange={(event) =>
                      updateField(
                        "phone",
                        event.target.value.replace(/\D/g, "").slice(0, 10),
                      )
                    }
                    required
                  />
                </div>

                <label className="bup-confirm-row">
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(event) => setConfirmed(event.target.checked)}
                    required
                  />
                  <span>
                    I confirm my details are correct and can be used to contact
                    me about this bundle.
                  </span>
                </label>

                {error && (
                  <p className="bup-checkout-error" role="alert">
                    {error}
                  </p>
                )}

                <button className="bup-checkout-button" type="submit">
                  Save Details & Continue <ArrowIcon />
                </button>
                <p className="bup-checkout-help">
                  No password, OTP or account creation required.
                </p>
              </form>
            )}
          </div>

          <aside
            className="bup-checkout-summary"
            aria-label="Selected bundle summary"
          >
            <span className="bup-summary-label">YOUR BUNDLE</span>
            <h3>Order preview</h3>
            <div className="bup-summary-items">
              {plans.map((plan) => (
                <div className="bup-summary-item" key={plan.id}>
                  <div>
                    <strong>{plan.name}</strong>
                    <small>
                      {plan.category === "ott" ? "OTT" : "AI"} · /month
                    </small>
                  </div>
                  <b>{formatPrice(plan.price)}</b>
                </div>
              ))}
            </div>
            {discount > 0 && (
              <div className="bup-summary-discount">
                <span>Bundle discount</span>
                <strong>−{formatPrice(discount)}</strong>
              </div>
            )}
            <div className="bup-summary-total">
              <span>Example monthly total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <p className="bup-summary-disclaimer">
              Prices are illustrative. Services are not available to buy through
              this demo. No payment is collected.
            </p>
          </aside>
        </div>
      </div>
    </div>,
    document.body,
  );
}
