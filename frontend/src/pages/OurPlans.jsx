import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../Style/OurPlans.css";
import PaymentStep from "../components/PaymentStep";
import { SUBSCRIPTION_CATALOGUE } from "../data/subscriptionCatalogue";
import {
  getInrProductDetails,
} from "../data/bundleottInrProductDetails";

import {
  EFFECTIVE_PRICE_OVERRIDES,
} from "../data/BundleUpOTT_effectivePrices.js";

gsap.registerPlugin(ScrollTrigger);

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const OFFER_MONTHS = ["1", "3", "6", "12"];

const PRICED_SUBSCRIPTION_CATALOGUE =
  SUBSCRIPTION_CATALOGUE.filter((plan) => {
    const pricing = EFFECTIVE_PRICE_OVERRIDES[String(plan.id)];

    if (
      pricing?.pricingType !== "subscription" ||
      pricing.currency !== "INR"
    ) {
      return false;
    }

    return OFFER_MONTHS.every((month) => {
      const price = pricing.effectivePrices?.[month];

      return (
        typeof price === "number" &&
        Number.isFinite(price) &&
        price > 0
      );
    });
  });

const BY_ID = new Map(
  PRICED_SUBSCRIPTION_CATALOGUE.map((plan) => [
    String(plan.id),
    plan,
  ]),
);

const CATEGORIES = [
  ...new Set(
    PRICED_SUBSCRIPTION_CATALOGUE.map((plan) => plan.category)
  ),
];

const TABS = [
  { id: "all", label: "All" },
  { id: "ott", label: "OTT" },
  { id: "ai", label: "AI" },
  { id: "creator", label: "Creators & Design" },
  { id: "other", label: "Other Services" },
];

const PAGE_SIZE = 24;
const USD_INR_REFERENCE = 94.9601;

const CLOUD_OFFER = {
  id: "bundleupott-cloud-250gb",
  name: "250 GB Google Drive Cloud Storage",
  storageGB: 250,
  price: 149,
  originalPrice: 499,
  billing: "Monthly",
};

// IDs must match the backend catalogue in backend/catalog.js.
const PAYMENT_PLAN_IDS = {
  netflix: "netflix",
  "amazon prime": "prime",
  prime: "prime",
  jiohotstar: "jiohotstar",
  sonyliv: "sonyliv",
  zee5: "zee5",
  "sun nxt": "sunnxt",
  sunnxt: "sunnxt",
  aha: "aha",
  hoichoi: "hoichoi",
  shemaroome: "shemaroome",
  "lionsgate play": "lionsgate",
  lionsgate: "lionsgate",
  "discovery+": "discovery",
  discovery: "discovery",
  fancode: "fancode",
  chaupal: "chaupal",
  "etv win": "etvwin",
  etvwin: "etvwin",
  "planet marathi": "planetmarathi",
  planetmarathi: "planetmarathi",
  manoramamax: "manoramamax",
  "eros now": "erosnow",
  erosnow: "erosnow",
  youtube: "youtube",
  chatgpt: "chatgpt",
  gemini: "gemini",
  claude: "claude",
  perplexity: "perplexity",
  copilot: "copilot",
  grok: "grok",
  midjourney: "midjourney",
  canva: "canva",
  notion: "notion",
  firefly: "firefly",
  elevenlabs: "elevenlabs",
  runway: "runway",
  spotify: "spotify_platinum",
};

function groupOf(plan) {
  if (plan.category === "OTT, films & TV") return "ott";
  if (plan.category.startsWith("AI ")) return "ai";

  if (
    [
      "YouTube & creator tools",
      "Photo, video & design software",
      "Stock assets, templates & licensing",
    ].includes(plan.category)
  ) {
    return "creator";
  }

  return "other";
}

const COUNTS = PRICED_SUBSCRIPTION_CATALOGUE.reduce(
  (acc, plan) => {
    acc.all++;
    acc[groupOf(plan)]++;
    return acc;
  },
  { all: 0, ott: 0, ai: 0, creator: 0, other: 0 },
);


function getOriginalMonthlyPrice(plan) {
  const pricing = EFFECTIVE_PRICE_OVERRIDES[String(plan.id)];

  const match = String(pricing?.monthlyReference ?? "").match(
    /₹\s*([\d,]+(?:\.\d{1,2})?)/
  );

  if (!match) return null;

  const amount = Number(match[1].replaceAll(",", ""));

  return Number.isFinite(amount) && amount > 0
    ? amount
    : null;
}

function getPriceInfo(plan) {
  const amount = getOriginalMonthlyPrice(plan);

  return {
    amount,
    display:
      amount === null
        ? "Price unavailable"
        : `${INR.format(amount)}/month`,
    estimated: false,
    note: "Original monthly reference price",
  };
}

function getOfferPriceInfo(plan, months) {
  const pricing = EFFECTIVE_PRICE_OVERRIDES[String(plan.id)];

  const key = String(months);

  const amount = pricing?.effectivePrices?.[key];

  const monthlyReference = getOriginalMonthlyPrice(plan);

  if (
    typeof amount !== "number" ||
    !Number.isFinite(amount) ||
    amount <= 0 ||
    monthlyReference === null
  ) {
    return {
      amount: null,
      originalAmount: null,
      approximate: false,
      savingsPercent: null,
    };
  }

  const originalAmount = monthlyReference * Number(key);

  return {
    amount,
    originalAmount,
    approximate: false,
    savingsPercent: Math.round(
      ((originalAmount - amount) / originalAmount) * 100
    ),
  };
}

function getOfferAmount(plan, months) {
  return getOfferPriceInfo(plan, months).amount;
}


function Icon({ name = "spark", size = 20 }) {
  const paths = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    close: (
      <>
        <path d="M6 6l12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    spark: (
      <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z" />
    ),
    layer: (
      <>
        <path d="m12 2 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </>
    ),
    device: (
      <>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8m-4-4v4" />
      </>
    ),
    bolt: <path d="m13 2-9 11h7l-1 9 10-12h-7l0-8Z" />,
    link: <path d="M7 17 17 7M8 7h9v9" />,
    cloud: (
      <path d="M20 17.5a4 4 0 0 0-1.2-7.8 7 7 0 0 0-13.4 1.8A3.9 3.9 0 0 0 6 19h13a4 4 0 0 0 1-1.5Z" />
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.spark}
    </svg>
  );
}

function domainOf(plan) {
  const raw =
    plan?.domain ||
    plan?.websiteDomain ||
    plan?.website ||
    "";

  if (typeof raw !== "string" || !raw.trim()) {
    return null;
  }

  try {
    const url = /^[a-z][a-z\d+.-]*:\/\//i.test(raw)
      ? raw
      : `https://${raw}`;

    return new URL(url).hostname.replace(/^www\./i, "");
  } catch {
    return null;
  }
}

function Logo({ plan, large = false }) {
  const [error, setError] = useState(false);
  const domain = domainOf(plan);

  return (
    <span
      className={`bu-logo bu-logo-${groupOf(plan)} ${large ? "bu-logo-large" : ""}`}
    >
      {domain && !error ? (
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
          alt=""
          onError={() => setError(true)}
          loading="lazy"
        />
      ) : (
        <b>{plan.brand.slice(0, 2).toUpperCase()}</b>
      )}
    </span>
  );
}
function benefitsFor(plan, detail) {
  if (detail) {
    return [
      ...(detail.whatYouGet || []).map((text, index) => ({
        title: index === 0
          ? "What this tier includes"
          : "More included benefits",
        text,
      })),

      ...(detail.limitations || []).map((text) => ({
        title: "Usage and limitations",
        text,
      })),

      ...(detail.deviceAccess || []).map((text) => ({
        title: "Devices and account access",
        text,
      })),

      ...(detail.importantNotes || []).map((text) => ({
        title: "Important plan notes",
        text,
      })),
    ];
  }

  // Keep the existing catalogue information as fallback.
  return [
    ...(String(plan.features || "")
      .split(/\s*;\s*/)
      .filter(Boolean)
      .map((text) => ({ title: "Included benefits", text }))),

    ...(plan.limits ? [{ title: "Usage and limitations", text: plan.limits }] : []),
    ...(plan.devices ? [{ title: "Device access", text: plan.devices }] : []),
    ...(plan.useCase ? [{ title: "Ideal for", text: plan.useCase }] : []),
    ...(plan.note ? [{ title: "Important notes", text: plan.note }] : []),
  ];
}

function SubscriptionCard({
  plan,
  selected,
  selectedDuration,
  onOpen,
  onToggle,
  onSelectOffer,
}) {
  const price = getPriceInfo(plan);

  const durations = [
    { months: "1", label: "1 Month" },
    { months: "3", label: "3 Months" },
    { months: "6", label: "6 Months" },
    { months: "12", label: "12 Months" },
  ];

  return (
    <article
      className={`bu-plan-card ${
        selected ? "bu-card-selected" : ""
      }`}
    >
      <div className="bu-card-content">
        {/* Separate button for viewing the subscription details */}
        <button
          type="button"
          className="bu-card-main"
          onClick={() => onOpen(plan)}
          aria-label={`View ${plan.brand} ${plan.tier} details`}
        >
          <div className="bu-card-top">
            <Logo plan={plan} />
            <span className="bu-card-group">
              {groupOf(plan).toUpperCase()}
            </span>
          </div>

          <h3>{plan.brand}</h3>
          <span className="bu-tier-name">{plan.tier}</span>

          <strong className="bu-card-price">
            {price.display}
          </strong>

          <small className="bu-card-billing">
            {price.note} · {plan.billing}
          </small>
        </button>

        {/* These are real, independent buttons */}
        <div className="bu-card-offers">
          <p className="bu-card-offers-title">
            Choose a duration
          </p>

          <div className="bu-card-offers-grid">
            {durations.map(({ months, label }) => {
              const offerPrice = getOfferPriceInfo(plan, months);
const amount = offerPrice.amount;

              const isChosen =
                selected &&
                String(selectedDuration || "1") === months;

              return (
                <button
                  key={months}
                  type="button"
                  className={`bu-card-offer ${
                    isChosen ? "is-selected" : ""
                  }`}
                  disabled={amount === null}
                  aria-pressed={isChosen}
                  title={
                    amount === null
                      ? "This price needs confirmation"
                      : `Add ${plan.brand} for ${label}`
                  }
                  onClick={() => onSelectOffer(plan.id, months)}
                >
                  <span>{label}</span>

                  <div className="bu-offer-pricing">
  {amount === null ? (
    <strong>Unavailable</strong>
  ) : (
    <>
      <del>
        {INR.format(offerPrice.originalAmount)}
      </del>

      <strong className="bu-offer-sale-price">
        {INR.format(offerPrice.amount)}
      </strong>

      <small className="bu-offer-saving">
        Save {offerPrice.savingsPercent}%
      </small>
    </>
  )}
</div>

                  <small>
                    {amount === null
                      ? "Unavailable"
                      : isChosen
                        ? "✓ Selected"
                        : "Tap to add"}
                  </small>
                </button>
              );
            })}
          </div>
        </div>

        <p className="bu-card-summary">{plan.features}</p>

        <button
          type="button"
          className="bu-see-benefits bu-see-benefits-button"
          onClick={() => onOpen(plan)}
        >
          <Icon name="eye" size={15} />
          See benefits
          <Icon name="arrow" size={14} />
        </button>
      </div>

      <button
        type="button"
        className={`bu-add-btn ${
          selected ? "bu-add-selected" : ""
        }`}
        onClick={() => onToggle(plan.id)}
      >
        <Icon name={selected ? "check" : "layer"} size={16} />

        {selected ? "Added · Remove" : "+ Add 1 month"}
      </button>
    </article>
  );
}
function CloudStorageOffer({ onAdd, onDismiss }) {
  return (
    <section
      className="bu-cloud-offer"
      aria-label="Optional 250 GB cloud storage offer"
    >
      <div className="bu-cloud-offer-tags">
        <span className="bu-cloud-limited">LIMITED-TIME OFFER</span>
        <span className="bu-cloud-days">Special ₹149 rate</span>
      </div>

      <div className="bu-cloud-offer-heading">
        <span className="bu-cloud-art">
          <Icon name="cloud" size={43} />
        </span>
        <div>
          <h4>250 GB Cloud Storage</h4>
          <p>Optional add-on to your custom bundle</p>
        </div>
      </div>

      <div className="bu-cloud-price-row">
        <strong>
          {INR.format(CLOUD_OFFER.price)}
          <small>/month</small>
        </strong>
        <del>{INR.format(CLOUD_OFFER.originalPrice)}/month</del>
      </div>

      <p className="bu-cloud-save">
        Save{" "}
        {INR.format(CLOUD_OFFER.originalPrice - CLOUD_OFFER.price)} on the
        stated regular price
      </p>

      <ul className="bu-cloud-benefits">
        <li>
          <Icon name="check" size={16} />
          250 GB storage allowance
        </li>
        <li>
          <Icon name="check" size={16} />
          Space for photos, documents and videos
        </li>
        <li>
          <Icon name="check" size={16} />
          Access and backup features depend on provider
        </li>
      </ul>

      <div className="bu-cloud-actions">
        <button
          type="button"
          className="bu-cloud-cancel"
          onClick={onDismiss}
        >
          Cancel
        </button>
        <button
          type="button"
          className="bu-cloud-add"
          onClick={onAdd}
        >
          + Add for ₹149
        </button>
      </div>

      <small>
        Offer planned for limited days. Confirm provider, dates and terms before
        selling.
      </small>
    </section>
  );
}

function useModalLock(onClose) {
  useEffect(() => {
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.lenis?.stop?.();

    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = oldOverflow;
      window.lenis?.start?.();
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);
}

function DetailsModal({ plan, selected, onClose, onToggle }) {
  const [tab, setTab] = useState("benefits");
  const closeRef = useRef(null);

  useModalLock(onClose);
  useEffect(() => closeRef.current?.focus(), []);

 const detail = getInrProductDetails(plan.id);
const benefits = benefitsFor(plan, detail);

  const tabs = [
    ["benefits", "What you will get"],
    ["about", "About"],
    
  ];

  return createPortal(
    <div
      className="bu-details-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bu-details-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bu-details-title"
      >
        <button
          type="button"
          ref={closeRef}
          className="bu-details-close"
          aria-label="Close subscription details"
          onClick={onClose}
        >
          <Icon name="close" />
        </button>

        <aside className="bu-details-product">
          <span className="bu-mini-pill">
            {groupOf(plan).toUpperCase()} SUBSCRIPTION
          </span>

          <Logo plan={plan} large />

          <h2 id="bu-details-title">{plan.brand}</h2>
          <span className="bu-detail-tier">{plan.tier}</span>

          <strong className="bu-details-price">
            {getPriceInfo(plan).display}
          </strong>

          <p className="bu-details-price-note">
            {getPriceInfo(plan).note}
            <br />
            {plan.billing} · {plan.priceBasis}
          </p>

          <p className="bu-details-intro">
            {plan.useCase || plan.features}
          </p>

          <button
            type="button"
            className={`bu-primary-btn ${selected ? "is-selected" : ""}`}
            onClick={() => onToggle(plan)}
          >
            {selected ? "Remove from bundle" : "Add to bundle"}
          </button>
        </aside>

        <div className="bu-details-content">
          <div className="bu-details-tabs" role="tablist">
            {tabs.map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                className={tab === id ? "active" : ""}
                onClick={() => setTab(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="bu-details-tab-panel">
            {tab === "benefits" && (
              <div>
                <h3>Included benefits</h3>
                <ul className="bu-detail-benefits">
  {benefits.map((benefit, index) => (
    <li key={`${benefit.title}-${index}`}>
      <Icon name="check" size={17} />

      <div>
        <strong>{benefit.title}</strong>
        <p>{benefit.text}</p>
      </div>
    </li>
  ))}
</ul>

                {plan.features && (
                  <p className="bu-details-description">
                    {plan.features}
                  </p>
                )}
              </div>
            )}

            {tab === "about" && (
  <div>
    <h3>About {plan.brand}</h3>

    <p>
      {detail?.about ||
        plan.description ||
        plan.useCase ||
        plan.features}
    </p>

    {detail && (
      <>
        <h4>Plan information</h4>

        <p><strong>Plan:</strong> {detail.title}</p>
        <p><strong>Billing:</strong> {detail.billing}</p>
        <p><strong>Reference price:</strong> {detail.advertisedRealPrice}</p>
        <p><strong>Monthly reference:</strong> {detail.monthlyReference}</p>

        {detail.source && (
          <p>
            <strong>Source:</strong>{" "}
            <a href={detail.source} target="_blank" rel="noreferrer">
              View provider information
            </a>
          </p>
        )}

        {Object.keys(detail.offers || {}).length > 0 && (
          <>
            <h4>Bundle price options</h4>

            <div className="bu-detail-price-options">
              {Object.entries(detail.offers).map(([months, price]) => (
                <div key={months}>
                  <strong>{months} month(s)</strong>
                  <span>{price}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    )}
  </div>
)}         </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function CustomerForm({
  selected,
  amount,
  hasUnknownPrices,
  cloudAdded,
  onClose,
  onSave,
  checkoutError,
}) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    consent: false,
  });

  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useModalLock(onClose);

  const submit = (e) => {
    e.preventDefault();
    setError("");

    if (form.fullName.trim().length < 2) {
      setError("Enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!form.consent) {
      setError("Please agree to be contacted about your bundle.");
      return;
    }

    const saved = onSave({
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone,
    });

    if (saved !== true) {
      setError(
        "Checkout could not start. Please review your selected plans and try again."
      );
      return;
    }

    setDone(false);
  };

  return createPortal(
    <div
      className="bu-details-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bu-customer-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bu-customer-title"
      >
        <button
          type="button"
          className="bu-details-close"
          aria-label="Close form"
          onClick={onClose}
        >
          <Icon name="close" />
        </button>

        {done ? (
          <div className="bu-form-done">
            <Icon name="check" size={42} />
            <h2 id="bu-customer-title">Details saved</h2>
            <p>
              Saved in this browser session only. No payment or real order has
              been created.
            </p>
            <button
              className="bu-primary-btn"
              onClick={onClose}
              type="button"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <span className="bu-eyebrow">NO LOGIN REQUIRED</span>

            <h2 id="bu-customer-title">Your details, then checkout</h2>

            <p className="bu-form-intro">
              {selected.length} selected subscription(s)
              {cloudAdded ? " + 250 GB Cloud Storage" : ""} ·{" "}
              {amount === null
                ? "Price needs confirmation"
                : `${INR.format(Math.round(amount))} estimated monthly equivalent`}
              {hasUnknownPrices ? " · excludes unconfirmed items" : ""}
            </p>

            <form onSubmit={submit} noValidate>
              <label>
                Full name
                <input
                  autoFocus
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm({ ...form, fullName: e.target.value })
                  }
                  placeholder="Enter full name"
                />
              </label>

              <label>
                Email address
                <input
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  placeholder="you@example.com"
                />
              </label>

              <label>
                Mobile number (+91)
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                    })
                  }
                  placeholder="10-digit number"
                />
              </label>

              <label className="bu-checkbox">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) =>
                    setForm({ ...form, consent: e.target.checked })
                  }
                />
                I agree to be contacted about my selected subscriptions and accept BundleUpOtt’s Terms and Conditions.
              </label>
              

              {(checkoutError || error) && (
  <p className="bu-form-error" role="alert">
    {checkoutError || error}
  </p>
)}

              <button
                type="submit"
                className="bu-primary-btn bu-submit"
              >
                Save Details & Continue <Icon name="arrow" />
              </button>
            </form>

            <small>
              Your details will be used to create a checkout order. The server
              confirms the payable amount.
            </small>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
export default function OurPlans() {
  const rootRef = useRef(null);
  const [searchParams] = useSearchParams();

    useEffect(() => {
    window.history.scrollRestoration = "manual";

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);
  
  const [group, setGroup] = useState("all");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [activePlan, setActivePlan] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [cloudAdded, setCloudAdded] = useState(false);
  const [checkoutCustomer, setCheckoutCustomer] = useState(null);
  const [checkoutPlans, setCheckoutPlans] = useState([]);
  const [checkoutError, setCheckoutError] = useState("");
  const [cloudDismissed, setCloudDismissed] = useState(false);
  const [selectedDurations, setSelectedDurations] = useState({});


  const [selectedIds, setSelectedIds] = useState(() => {
    const oldIds = {
      netflix: "39",
      prime: "44",
      chatgpt: "1",
      gemini: "4",
      jiohotstar: "48",
    };

    return [
      ...new Set(
        (searchParams.get("items") || "")
          .split(",")
          .map((id) => (BY_ID.has(id) ? id : oldIds[id]))
          .filter((id) => BY_ID.has(id))
      ),
    ];
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bu-hero-copy > *",
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.65,
          ease: "power3.out",
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    setLimit(PAGE_SIZE);
  }, [group, category, query]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      window.lenis?.resize?.();
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(id);
  }, [limit, selectedIds.length, group]);

  const selected = useMemo(
    () => selectedIds.map((id) => BY_ID.get(id)).filter(Boolean),
    [selectedIds]
  );

  const priceInfo = selected.map((plan) => ({
  plan,
  months: selectedDurations[String(plan.id)] || "1",
  amount: getOfferAmount(
    plan,
    selectedDurations[String(plan.id)] || "1"
  ),
}));

const knownBaseAmount = priceInfo.reduce(
  (total, item) => total + (item.amount ?? 0),
  0
);

const unknownCount = priceInfo.filter(
  (item) => item.amount === null
).length;

const amount =
  selected.length && (knownBaseAmount > 0 || cloudAdded)
    ? knownBaseAmount + (cloudAdded ? CLOUD_OFFER.price : 0)
    : null;

const isEstimated = true;

  const removeAll = () => {
    setSelectedIds([]);
    setCloudAdded(false);
    setCloudDismissed(false);
  };

  const ottSelected = selected.filter(
    (plan) => groupOf(plan) === "ott"
  ).length;

  const aiSelected = selected.filter(
    (plan) => groupOf(plan) === "ai"
  ).length;

  const results = useMemo(
    () =>
      PRICED_SUBSCRIPTION_CATALOGUE.filter((plan) => {
        if (group !== "all" && groupOf(plan) !== group) return false;
        if (category !== "all" && plan.category !== category) return false;

        const term = query.trim().toLowerCase();

        return (
          !term ||
          [
            plan.brand,
            plan.tier,
            plan.category,
            plan.useCase,
            plan.features,
          ].some((value) =>
            String(value || "").toLowerCase().includes(term)
          )
        );
      }),
    [group, category, query]
  );

  function togglePlan(id) {
    const key = String(id);

    setSelectedIds((prev) => {
      if (prev.includes(key)) {
        return prev.filter((item) => item !== key);
      }

      const incoming = BY_ID.get(key);
      if (!incoming) return prev;

      return [
        ...prev.filter((item) => {
          const other = BY_ID.get(item);

          return (
            !other ||
            other.brand !== incoming.brand ||
            other.category !== incoming.category
          );
        }),
        key,
      ];
    });
  }

  function selectOffer(id, months) {
  const key = String(id);
  const incoming = BY_ID.get(key);

  if (!incoming) return;

  // Add the subscription, or replace its previously selected tier.
  setSelectedIds((prev) => [
    ...prev.filter((item) => {
      const other = BY_ID.get(item);

      return (
        item !== key &&
        (!other ||
          other.brand !== incoming.brand ||
          other.category !== incoming.category)
      );
    }),
    key,
  ]);

  // Save the chosen duration for this subscription.
  setSelectedDurations((prev) => {
    const next = { ...prev };

    Object.keys(next).forEach((item) => {
      const other = BY_ID.get(item);

      if (
        item === key ||
        (other &&
          other.brand === incoming.brand &&
          other.category === incoming.category)
      ) {
        delete next[item];
      }
    });

    next[key] = String(months);
    return next;
  });

  setCloudAdded(false);
}

  function saveCustomer(customer) {
    setCheckoutError("");

    if (!selected.length) {
      setCheckoutError(
        "Please select at least one subscription before checkout."
      );
      return false;
    }

    if (cloudAdded) {
  setCloudAdded(false);
  setCheckoutError("");
}

    // Automatically map each frontend catalogue entry to the backend.
const unpricedPlans = selected.filter((plan) => {
  const months = selectedDurations[String(plan.id)] || "1";
  return getOfferPriceInfo(plan, months).amount === null;
});

if (unpricedPlans.length > 0) {
  const names = unpricedPlans
    .map((plan) => `${plan.brand} — ${plan.tier}`)
    .join(", ");

  setCheckoutError(
    `These services need a fixed price before checkout: ${names}`
  );

  return false;
}

const mappedPlans = selected.map((plan) => ({
  id: `sub_${String(plan.id)}`,
  name: `${plan.brand} ${plan.tier}`,
  months: Number(selectedDurations[String(plan.id)] || "1"),
}));

const uniquePlans = [
  ...new Map(
    mappedPlans.map((plan) => [plan.id, plan])
  ).values(),
];

    sessionStorage.setItem(
      "bundleupott_checkout_draft",
      JSON.stringify({
        customer,
        planIds: uniquePlans.map((plan) => plan.id),
        paymentStatus: "checkout_started",
        createdAt: new Date().toISOString(),
      })
    );

    setCheckoutPlans(uniquePlans);
    setCheckoutCustomer(customer);
    setFormOpen(false);

    return true;
  }

  useEffect(() => {
    if (!selectedIds.length) {
      setCloudAdded(false);
      setCloudDismissed(false);
    }
  }, [selectedIds.length]);

  function scrollToPlans() {
    const element = document.getElementById("bu-catalogue");

    if (window.lenis?.scrollTo) {
      window.lenis.scrollTo(element, {
        offset: -85,
        duration: 0.8,
      });
    } else {
      element?.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Checkout view: customer details are passed to PaymentStep.
  if (checkoutCustomer) {
    return (
      <main ref={rootRef} className="bu-plans-page">
        <section className="bu-catalogue">
          <div className="bu-shell">
            <div className="bu-section-heading">
              <span className="bu-eyebrow">SECURE CHECKOUT</span>
              <h1>Complete your checkout</h1>

              <p>
                Customer: {checkoutCustomer.fullName} ·{" "}
                {checkoutCustomer.email}
              </p>

              <p>
                The amount returned by the server is authoritative. Catalogue
                prices shown on the previous page are reference estimates only.
              </p>

              {checkoutError && (
                <p className="bu-form-error" role="alert">
                  {checkoutError}
                </p>
              )}
            </div>

            <button
              type="button"
              className="bu-primary-btn"
              onClick={() => {
                setCheckoutCustomer(null);
                setCheckoutPlans([]);
                setCheckoutError("");
              }}
            >
              Back to plans
            </button>

            <PaymentStep
              customer={checkoutCustomer}
              plans={checkoutPlans}
              total={null}
            />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main ref={rootRef} className="bu-plans-page">
      <section className="bu-hero">
        <div className="bu-shell bu-hero-grid">
          <div className="bu-hero-copy">
            <span className="bu-pill">
              <Icon name="spark" size={16} /> YOUR CHOICE. YOUR BUNDLE.
            </span>

            <h1>
              All your subscriptions. <span>Your own bundle.</span>
            </h1>

            <p>
              Explore OTT, AI, creative tools, music, games and more. Open any
              plan to see exactly what the listed tier includes, then build a
              bundle your way.
            </p>

            <button className="bu-primary-btn" onClick={scrollToPlans}>
              Explore subscriptions <Icon name="arrow" />
            </button>

            <small>
              Catalogue reference · Prices and availability require provider
              confirmation.
            </small>
          </div>

          <div className="bu-hero-art" aria-hidden="true">
            <div className="bu-hero-ring ring-one" />
            <div className="bu-hero-ring ring-two" />

            <div className="bu-hero-center">
              <Icon name="layer" size={52} />
              <strong>bundleupott</strong>
              <span>CUSTOM BUNDLES</span>
            </div>

            <span className="bu-floating bu-floating-one">OTT + AI</span>
            <span className="bu-floating bu-floating-two">✦ Your way</span>
          </div>
        </div>

        <div className="bu-shell bu-metrics">
          <span>
            <strong>{COUNTS.all}</strong> plan / tier entries
          </span>
          <span>
            <strong>{CATEGORIES.length}</strong> categories
          </span>
          <span>
            <strong>{COUNTS.ott}</strong> OTT tiers
          </span>
          <span>
            <strong>{COUNTS.ai}</strong> AI tiers
          </span>
        </div>
      </section>

      <section className="bu-catalogue" id="bu-catalogue">
        <div className="bu-shell">
          <div className="bu-section-heading">
            <span className="bu-eyebrow">
              COMPLETE SUBSCRIPTION CATALOGUE
            </span>

            <h2>
              Find your favourites. <span>Build your bundle.</span>
            </h2>

            <p>
              Click any subscription card to view its benefits, features, usage
              limits, device information and more. Switch tiers any time.
            </p>

            <div className="bu-refund-note">
              <Icon name="check" size={18} />
              <span>
                <strong>Refund assurance:</strong> If a verified payment cannot
                be fulfilled because a provider cannot activate the selected
                subscription, the affected amount will be refunded under the
                published refund policy. Payments are not enabled in this demo.
              </span>
            </div>
          </div>

          <div className="bu-toolbar">
            <div
              className="bu-tabs"
              role="group"
              aria-label="Subscription categories"
            >
              {TABS.map(({ id, label }) => (
                <button
                  type="button"
                  key={id}
                  className={group === id ? "is-active" : ""}
                  aria-pressed={group === id}
                  onClick={() => {
                    setGroup(id);
                    setCategory("all");
                  }}
                >
                  <span>{label}</span>
                  <b>{COUNTS[id]}</b>
                </button>
              ))}
            </div>

            <div className="bu-filter-controls">
              <label className="bu-search">
                <Icon name="search" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search ChatGPT, Netflix, Canva..."
                />
              </label>

              <label className="bu-category-picker">
                Category
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="all">All categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="bu-layout">
            <div className="bu-list">
              <div className="bu-result-line">
                <strong>{results.length} matching plans</strong>
                <span>Tap any card to see full benefits</span>
              </div>

              <div className="bu-card-grid">
                {results.slice(0, limit).map((plan) => (
                  <SubscriptionCard
  key={plan.id}
  plan={plan}
  selected={selectedIds.includes(String(plan.id))}
  selectedDuration={
    selectedDurations[String(plan.id)] || "1"
  }
  onOpen={setActivePlan}
  onToggle={togglePlan}
  onSelectOffer={selectOffer}
/>
                ))}
              </div>

              {!results.length && (
                <div className="bu-empty">
                  <h3>No matching subscriptions</h3>
                  <p>Try another term or select All categories.</p>

                  <button
                    onClick={() => {
                      setGroup("all");
                      setCategory("all");
                      setQuery("");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}

              {results.length > limit && (
                <button
                  className="bu-more"
                  onClick={() => setLimit((n) => n + PAGE_SIZE)}
                >
                  Show more plans · {results.length - limit} remaining{" "}
                  <Icon name="arrow" size={16} />
                </button>
              )}

              <p className="bu-disclaimer">
                These are research references, not confirmed bundleupott
                reseller inventory. Features, plan terms, India availability and
                prices must be verified with providers.
              </p>
            </div>

            <aside className="bu-summary">
              <span className="bu-eyebrow">YOUR BUNDLE</span>
              <h3>Your Custom Bundle</h3>

              <p>
                Choose any services. Switch a provider's tier without adding a
                duplicate.
              </p>

              <div className="bu-summary-numbers">
                <span>
                  <b>{ottSelected}</b>OTT
                </span>
                <span>
                  <b>{aiSelected}</b>AI
                </span>
                <span>
                  <b>{selected.length + (cloudAdded ? 1 : 0)}</b>Total
                </span>
              </div>

              <div className="bu-selected-list">
                {selected.length ? (
                  selected.map((plan) => (
                    <div key={plan.id} className="bu-selected-row">
                      <Logo plan={plan} />

                      <div>
                        <strong>{plan.brand}</strong>
                        <small>
  {plan.tier} ·{" "}
  {selectedDurations[String(plan.id)] || "1"} month(s) ·{" "}
  {getOfferAmount(
    plan,
    selectedDurations[String(plan.id)] || "1"
  ) === null
    ? "Price to confirm"
    : INR.format(
        getOfferAmount(
          plan,
          selectedDurations[String(plan.id)] || "1"
        )
      )}
</small>
                      </div>

                      <button
                        type="button"
                        aria-label={`Remove ${plan.brand}`}
                        onClick={() => togglePlan(plan.id)}
                      >
                        <Icon name="close" size={17} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="bu-no-selection">
                    <Icon name="layer" size={29} />
                    <strong>No plans added yet</strong>
                    <span>Select any subscription to start building.</span>
                  </div>
                )}
              </div>

              {selected.length > 0 && cloudAdded && (
                <div className="bu-cloud-selected">
                  <span className="bu-cloud-selected-icon">
                    <Icon name="cloud" size={25} />
                  </span>

                  <div>
                    <strong>250 GB Cloud Storage</strong>
                    <small>Offer add-on · ₹149/month</small>
                  </div>

                  <button
                    type="button"
                    aria-label="Remove cloud storage"
                    onClick={() => setCloudAdded(false)}
                  >
                    <Icon name="close" size={17} />
                  </button>
                </div>
              )}

              {selected.length > 0 && !cloudAdded && !cloudDismissed && (
                <CloudStorageOffer
                  onAdd={() => setCloudAdded(true)}
                  onDismiss={() => setCloudDismissed(true)}
                />
              )}

              {selected.length > 0 && cloudDismissed && !cloudAdded && (
                <button
                  type="button"
                  className="bu-cloud-reopen"
                  onClick={() => setCloudDismissed(false)}
                >
                  <Icon name="cloud" size={17} /> View 250 GB cloud offer (₹149)
                </button>
              )}

              <div className="bu-total">
                <span>Reference monthly equivalent (₹)</span>

                <strong>
                  {amount === null
                    ? selected.length
                      ? "Quote required"
                      : "—"
                    : `${isEstimated ? "≈" : ""}${INR.format(Math.round(amount))}`}
                </strong>

                {/* <small>
                  {unknownCount > 0
                    ? `${unknownCount} plan(s) need a price quote and are excluded from this estimate.`
                    : isEstimated
                      ? "Approximate INR / monthly equivalent only. USD conversions, annual billing and provider taxes may change actual prices."
                      : "Reference INR monthly prices. Final eligible pricing must be verified."}
                </small> */}
              </div>

              <button
                className="bu-primary-btn bu-continue"
                disabled={!selected.length}
                onClick={() => setFormOpen(true)}
              >
                Continue to Details <Icon name="arrow" />
              </button>

              <button
                className="bu-clear"
                disabled={!selected.length}
                onClick={removeAll}
              >
                Clear bundle
              </button>

              <p className="bu-summary-foot">
                No login required · No payment taken yet
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="bu-outro">
        <div className="bu-shell bu-outro-inner">
          <div>
            <span className="bu-eyebrow">YOUR BUNDLE, YOUR WAY</span>
            <h2>
              Every subscription is <span>your choice.</span>
            </h2>
            <p>
              Explore the details, compare tiers and create your combination.
            </p>
          </div>

          <button className="bu-primary-btn" onClick={scrollToPlans}>
            Browse all subscriptions <Icon name="arrow" />
          </button>
        </div>
      </section>

      {activePlan && (
        <DetailsModal
          key={activePlan.id}
          plan={activePlan}
          selected={selectedIds.includes(String(activePlan.id))}
          onToggle={togglePlan}
          onClose={() => setActivePlan(null)}
        />
      )}

      {formOpen && (
        <CustomerForm
          selected={selected}
          amount={amount}
          hasUnknownPrices={unknownCount > 0}
          cloudAdded={cloudAdded}
          onSave={saveCustomer}
          checkoutError={checkoutError}
          onClose={() => setFormOpen(false)}
        />
      )}
    </main>
  );
}
