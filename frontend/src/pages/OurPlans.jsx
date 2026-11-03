import React, { useEffect, useMemo, useRef, useState } from "react";

import { createPortal } from "react-dom";

import { useSearchParams } from "react-router-dom";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../Style/OurPlans.css";

import PaymentStep from "../components/PaymentStep";

import { SUBSCRIPTION_CATALOGUE } from "../data/subscriptionCatalogue";

import { getInrProductDetails } from "../data/bundleottInrProductDetails";

import { EFFECTIVE_PRICE_OVERRIDES } from "../data/BundleUpOTT_effectivePrices.js";

// Load the real subscription logos from: src/assets/LOGO
// Vite resolves these assets at build time, so individual imports are not needed.
const LOGO_ASSETS = import.meta.glob(
  "../assets/LOGO/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
    import: "default",
  },
);

gsap.registerPlugin(ScrollTrigger);

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",

  currency: "INR",

  maximumFractionDigits: 0,
});

const OFFER_MONTHS = ["1", "3", "6", "12"];

const PAGE_SIZE = 24;

const CLOUD_OFFER = {
  id: "bundleupott-cloud-250gb",

  name: "250 GB Google Drive Cloud Storage",

  storageGB: 250,

  price: 149,

  originalPrice: 499,

  billing: "Monthly",
};

const PRICED_SUBSCRIPTION_CATALOGUE = SUBSCRIPTION_CATALOGUE.filter((plan) => {
  const pricing = EFFECTIVE_PRICE_OVERRIDES[String(plan.id)];

  return (
    pricing?.pricingType === "subscription" &&
    pricing.currency === "INR" &&
    OFFER_MONTHS.every((month) => {
      const price = pricing.effectivePrices?.[month];

      return typeof price === "number" && Number.isFinite(price) && price > 0;
    })
  );
});

const BY_ID = new Map(
  PRICED_SUBSCRIPTION_CATALOGUE.map((plan) => [String(plan.id), plan]),
);

function groupOf(plan) {
  if (plan.category === "OTT, films & TV") return "ott";

  if (String(plan.category || "").startsWith("AI ")) return "ai";

  if (
    [
      "YouTube & creator tools",

      "Photo, video & design software",

      "Stock assets, templates & licensing",
    ].includes(plan.category)
  ) {
    return "other";
  }

  return "other";
}

const CATEGORIES = [
  ...new Set(PRICED_SUBSCRIPTION_CATALOGUE.map((plan) => plan.category)),
];

const TABS = [
  { id: "ott", label: "OTT" },

  { id: "ai", label: "AI" },

  { id: "other", label: "Other Plans" },
];

const COUNTS = PRICED_SUBSCRIPTION_CATALOGUE.reduce(
  (acc, plan) => {
    acc.all += 1;

    acc[groupOf(plan)] += 1;

    return acc;
  },

  { all: 0, ott: 0, ai: 0, creator: 0, other: 0 },
);

function getOriginalMonthlyPrice(plan) {
  const pricing = EFFECTIVE_PRICE_OVERRIDES[String(plan.id)];
  const raw = String(pricing?.monthlyReference ?? "");

  const match = raw.match(/([\d,]+(?:\.\d{1,2})?)/);

  if (!match) return null;

  const amount = Number(match[1].replaceAll(",", ""));

  return Number.isFinite(amount) && amount > 0 ? amount : null;
}

function getPriceInfo(plan) {
  const amount = getOriginalMonthlyPrice(plan);

  return {
    amount,

    display:
      amount === null ? "Price unavailable" : `${INR.format(amount)}/month`,

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
      ((originalAmount - amount) / originalAmount) * 100,
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

    "arrow-up": (
      <>
        <path d="M12 19V5" />

        <path d="m5 12 7-7 7 7" />
      </>
    ),

    "arrow-down": (
      <>
        <path d="M12 5v14" />

        <path d="m19 12-7 7-7-7" />
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
  const raw = plan?.domain || plan?.websiteDomain || plan?.website || "";

  if (typeof raw !== "string" || !raw.trim()) return null;

  try {
    const url = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

    return new URL(url).hostname.replace(/^www\./i, "");
  } catch {
    return null;
  }
}

// Brand aliases are matched against the catalogue brand/name, while file
// candidates are matched against the actual filenames in src/assets/LOGO.
// This supports filenames such as AdobeAcrobat..., AppleCreatorStudio,
// CrunchyrollPremium, TataPlayBinge and ManoramaMAX without manual imports.
const LOGO_MATCHES = [
  {
    keys: ["adobe acrobat", "acrobat", "adobe"],
    files: ["adobeacrobat", "acrobat"],
  },
  { keys: ["amazon prime", "prime video", "amazon"], files: ["amazonprime"] },
  {
    keys: ["apple creator studio", "creator studio"],
    files: ["applecreator", "applecreators"],
  },
  { keys: ["apple music"], files: ["applemusic"] },
  { keys: ["audible"], files: ["audible"] },
  { keys: ["canva"], files: ["canva"] },
  { keys: ["chatgpt", "chat gpt", "openai"], files: ["chatgpt"] },
  { keys: ["claude", "anthropic"], files: ["claude"] },
  { keys: ["crunchyroll"], files: ["crunchyroll"] },
  {
    keys: ["google one", "google drive", "google storage"],
    files: ["googleone"],
  },
  { keys: ["icloud", "apple icloud", "cloud+"], files: ["cloud+"] },
  { keys: ["filmora"], files: ["filmora"] },
  { keys: ["hoichoi", "hoi choi"], files: ["hoichoi"] },
  { keys: ["inshot"], files: ["inshotpro", "inshot"] },
  { keys: ["invideo ai", "invideo"], files: ["invideoai", "invideo"] },
  // JioHotstar and JioStar are separate services with separate logo files.
  { keys: ["jiohotstar", "jio hotstar"], files: ["jiohotstar"] },
  // The existing Jio.png asset is used for the JioStar brand mark.
  { keys: ["jiostar", "jio cinema", "jiocinema", "jio"], files: ["jio"] },
  { keys: ["zee5", "zee 5"], files: ["zee5"] },
  { keys: ["manorama max", "manorama"], files: ["manoramamax", "manorama"] },
  {
    keys: ["microsoft 365", "office 365", "microsoft"],
    files: ["microsoft365"],
  },
  { keys: ["netflix"], files: ["netflix"] },
  { keys: ["perplexity"], files: ["perplexity"] },
  { keys: ["picsart"], files: ["picsart"] },
  { keys: ["playstation", "ps plus", "psn"], files: ["playstationplus"] },
  { keys: ["sonyliv", "sony liv"], files: ["sonyliv"] },
  { keys: ["spotify"], files: ["spotifypremium", "spotify"] },
  {
    keys: ["tata play binge", "tataplay binge", "tataplaybinge"],
    files: ["tataplaybinge", "tataplay"],
  },
  { keys: ["times prime", "timesprime"], files: ["timesprime"] },
  { keys: ["vidiq", "vid iq"], files: ["vidiq"] },
  { keys: ["youtube premium", "youtube"], files: ["youtubepremium"] },
];

function normalizeLogoFilename(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9+]/g, "");
}

function findLogoAsset(fileKeys) {
  const candidates = (Array.isArray(fileKeys) ? fileKeys : [fileKeys])
    .map(normalizeLogoFilename)
    .filter(Boolean);

  if (!candidates.length) return null;

  const assets = Object.entries(LOGO_ASSETS).map(([path, asset]) => {
    const filename = path
      .split("/")
      .pop()
      .replace(/\.[^.]+$/, "");
    return {
      normalized: normalizeLogoFilename(filename),
      asset,
    };
  });

  // Prefer an exact filename match, then a filename beginning with the key.
  for (const candidate of candidates) {
    const exact = assets.find((item) => item.normalized === candidate);
    if (exact) return exact.asset;

    const startsWith = assets.find((item) =>
      item.normalized.startsWith(candidate),
    );
    if (startsWith) return startsWith.asset;
  }

  // Last fallback: allow a candidate to be contained in a longer filename.
  for (const candidate of candidates) {
    const partial = assets.find((item) => item.normalized.includes(candidate));
    if (partial) return partial.asset;
  }

  return null;
}

function getCustomLogo(plan) {
  const searchText = [
    plan?.brand,
    plan?.name,
    plan?.website,
    plan?.websiteDomain,
    plan?.domain,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const match = LOGO_MATCHES.find((entry) =>
    entry.keys.some((keyword) => searchText.includes(keyword)),
  );

  if (match) {
    const logo = findLogoAsset(match.files);
    if (logo) return logo;
  }

  // Automatically try the provider's own name if it has a matching PNG.
  return findLogoAsset([plan?.brand, plan?.name]);
}

function Logo({ plan, large = false }) {
  const [error, setError] = useState(false);

  const domain = domainOf(plan);
  const customLogo = getCustomLogo(plan);

  return (
    <span
      className={`bu-logo bu-logo-${groupOf(plan)} ${large ? "bu-logo-large" : ""}`}
    >
      {customLogo ? (
        <img src={customLogo} alt={`${plan.brand} logo`} loading="lazy" />
      ) : domain && !error ? (
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
          alt=""
          onError={() => setError(true)}
          loading="lazy"
        />
      ) : (
        <b>
          {String(plan.brand || "?")
            .slice(0, 2)
            .toUpperCase()}
        </b>
      )}
    </span>
  );
}

function benefitsFor(plan, detail) {
  if (detail) {
    return [
      ...(detail.whatYouGet || []).map((text, index) => ({
        title:
          index === 0 ? "What this tier includes" : "More included benefits",

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

  return [
    ...String(plan.features || "")
      .split(/\s*;\s*/)

      .filter(Boolean)

      .map((text) => ({ title: "Included benefits", text })),

    ...(plan.limits
      ? [{ title: "Usage and limitations", text: plan.limits }]
      : []),

    ...(plan.devices ? [{ title: "Device access", text: plan.devices }] : []),

    ...(plan.useCase ? [{ title: "Ideal for", text: plan.useCase }] : []),

    ...(plan.note ? [{ title: "Important notes", text: plan.note }] : []),
  ];
}

function SubscriptionCard({ plan, selected, onOpen }) {
  const summary = String(plan.useCase || plan.features || "")
    .split(/\s*;\s*/)[0]
    .trim();

  const tierName = String(plan.tier || "Standard").trim();

  return (
    <button
      type="button"
      className={`bu-tier-option bu-tier-bubble ${selected ? "is-selected" : ""}`}
      data-plan-id={String(plan.id)}
      onClick={() => onOpen(plan)}
      aria-label={`View ${plan.brand} ${tierName} benefits and pricing`}
      aria-pressed={selected}
    >
      <span className="bu-tier-bubble-glow" aria-hidden="true" />

      <span className="bu-tier-bubble-mark" aria-hidden="true">
        <Logo plan={plan} />
      </span>

      <span className="bu-tier-option-copy">
        <strong>{tierName}</strong>

        {summary && <small>{summary}</small>}
      </span>

      {selected && <span className="bu-tier-option-selected">In bundle</span>}
    </button>
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

        <span className="bu-cloud-days">OUR BEST PRICE</span>
      </div>

      <div className="bu-cloud-offer-heading">
        <span className="bu-cloud-art">
          <Icon name="cloud" size={43} />
        </span>

        <div>
          <h4>250 GB Google Drive Cloud Storage</h4>

          <p>Optional add-on to your custom bundle</p>
        </div>
      </div>

      <div className="bu-cloud-price-block">
        <span className="bu-cloud-price-caption">Our best price</span>

        <div className="bu-cloud-price-row">
          <strong>
            {INR.format(CLOUD_OFFER.price)}

            <small>/month</small>
          </strong>

          <span className="bu-cloud-regular-price">
            <small>Regular price</small>

            <del>{INR.format(CLOUD_OFFER.originalPrice)}/month</del>
          </span>
        </div>
      </div>

      <p className="bu-cloud-save">
        Save {INR.format(CLOUD_OFFER.originalPrice - CLOUD_OFFER.price)} on the
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
        <button type="button" className="bu-cloud-cancel" onClick={onDismiss}>
          No thanks
        </button>

        <button type="button" className="bu-cloud-add" onClick={onAdd}>
          + Add for ₹149
        </button>
      </div>

      <small>
        Confirm provider, dates and terms before offering this storage service
        for sale.
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

function DetailsModal({
  plan,

  selected,

  selectedDuration,

  onClose,

  onToggle,

  onSelectOffer,

  onViewNextPlan,
}) {
  const [tab, setTab] = useState("benefits");

  const [mobileView, setMobileView] = useState("ott");

  const [duration, setDuration] = useState(String(selectedDuration || "1"));

  const closeRef = useRef(null);

  const modalScrollRef = useRef(null);

  const exploreSectionRef = useRef(null);

  useModalLock(onClose);

  useEffect(() => closeRef.current?.focus(), []);

  useEffect(() => {
    setDuration(String(selectedDuration || "1"));

    setMobileView("ott");
  }, [plan.id, selectedDuration]);

  const navigateMobileSection = (section) => {
    setMobileView(section);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const scroller = modalScrollRef.current;

        if (!scroller) return;

        if (section === "explore") {
          const target = exploreSectionRef.current;

          if (!target) return;

          const scrollerTop = scroller.getBoundingClientRect().top;

          const targetTop = target.getBoundingClientRect().top;

          const nextTop = scroller.scrollTop + targetTop - scrollerTop;

          scroller.scrollTo({
            top: Math.max(0, nextTop),

            behavior: "smooth",
          });
        } else {
          scroller.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    });
  };

  const detail = getInrProductDetails(plan.id);

  const benefits = benefitsFor(plan, detail);

  const durations = [
    { months: "1", label: "1 Month" },

    { months: "3", label: "3 Months" },

    { months: "6", label: "6 Months" },

    { months: "12", label: "12 Months" },
  ];

  const chosenOffer = getOfferPriceInfo(plan, duration);

  const tabs = [
    ["benefits", "What you will get"],

    ["about", "About this plan"],
  ];

  const scrollPlanDetails = (direction) => {
    const scroller = modalScrollRef.current;

    if (!scroller) return;

    const step = Math.max(220, Math.round(scroller.clientHeight * 0.65));

    const maxScroll = Math.max(
      0,
      scroller.scrollHeight - scroller.clientHeight,
    );

    const nextScroll =
      direction === "up"
        ? Math.max(0, scroller.scrollTop - step)
        : Math.min(maxScroll, scroller.scrollTop + step);

    scroller.scrollTo({
      top: nextScroll,

      behavior: "smooth",
    });
  };

  return createPortal(
    <div
      ref={modalScrollRef}
      className="bu-details-backdrop bu-tier-details-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={`bu-details-modal bu-tier-details-modal bu-mobile-view-${mobileView}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bu-details-title"
      >
        <button
          type="button"
          ref={closeRef}
          className="bu-details-close"
          aria-label="Close plan details and return to plan list"
          onClick={onClose}
        >
          <Icon name="close" />
        </button>

        <aside className="bu-details-product bu-tier-details-product">
          <span className="bu-mini-pill">
            {groupOf(plan).toUpperCase()} PLAN
          </span>

          <Logo plan={plan} large />

          <h2 id="bu-details-title">{plan.brand}</h2>

          <span className="bu-detail-tier">{plan.tier}</span>

          <div
            className="bu-mobile-detail-switch"
            role="tablist"
            aria-label="Plan sections"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mobileView === "ott"}
              className={mobileView === "ott" ? "is-active" : ""}
              onClick={() => navigateMobileSection("ott")}
            >
              <Icon name="arrow-up" size={16} /> OTT PLAN
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={mobileView === "explore"}
              className={mobileView === "explore" ? "is-active" : ""}
              onClick={() => navigateMobileSection("explore")}
            >
              <Icon name="arrow-down" size={16} /> EXPLORE YOUR PLAN
            </button>
          </div>

          <strong className="bu-details-price">
            {getPriceInfo(plan).display}
          </strong>

          <p className="bu-details-price-note">
            {getPriceInfo(plan).note}
            <br />
            {plan.billing} · {plan.priceBasis}
          </p>

          <p className="bu-details-intro">{plan.useCase || plan.features}</p>

          <div className="bu-modal-duration">
            <div className="bu-modal-duration-heading">
              <strong>Choose duration</strong>

              <span>Best available offer</span>
            </div>

            <div className="bu-modal-duration-grid">
              {durations.map(({ months, label }) => {
                const offer = getOfferPriceInfo(plan, months);

                const active = duration === months;

                return (
                  <button
                    key={months}
                    type="button"
                    className={`bu-modal-duration-option ${active ? "is-active" : ""}`}
                    disabled={offer.amount === null}
                    aria-pressed={active}
                    onClick={() => setDuration(months)}
                  >
                    <span>{label}</span>

                    {offer.amount === null ? (
                      <strong>Unavailable</strong>
                    ) : (
                      <>
                        <del>{INR.format(offer.originalAmount)}</del>

                        <strong>{INR.format(offer.amount)}</strong>

                        <small>Save {offer.savingsPercent}%</small>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {chosenOffer.amount !== null && (
            <div className="bu-modal-selected-price">
              <span>Your selected price</span>

              <strong>{INR.format(chosenOffer.amount)}</strong>

              <small>
                for {duration} {duration === "1" ? "month" : "months"}
              </small>
            </div>
          )}

          <button
            type="button"
            className={`bu-primary-btn bu-tier-details-cta ${selected ? "is-selected" : ""}`}
            disabled={chosenOffer.amount === null}
            onClick={() => onSelectOffer(plan.id, duration)}
          >
            <Icon name={selected ? "check" : "layer"} />

            {selected ? "Update bundle" : "Add to bundle"}
          </button>

          {selected && (
            <button
              type="button"
              className="bu-tier-remove-link"
              onClick={() => onToggle(plan.id)}
            >
              Remove this plan from bundle
            </button>
          )}
        </aside>

        <section
          ref={exploreSectionRef}
          className="bu-details-content bu-tier-details-content"
          id="bu-explore-plan-section"
        >
          <button
            type="button"
            className="bu-explore-back-button"
            onClick={() => navigateMobileSection("ott")}
            aria-label="Go back to OTT plan"
          >
            <Icon name="arrow-left" size={17} />

            <span>Back to OTT Plan</span>
          </button>

          <div className="bu-tier-details-heading">
            <span className="bu-eyebrow">EXPLORE YOUR PLAN</span>

            <h2>{plan.tier}</h2>

            <p>
              {plan.useCase ||
                `Discover what is included with ${plan.brand} ${plan.tier}.`}
            </p>
          </div>

          <div className="bu-detail-tabs-row">
            <div
              className="bu-detail-tabs"
              role="tablist"
              aria-label="Plan information"
            >
              {tabs.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={tab === id}
                  className={tab === id ? "bu-detail-tab-active" : ""}
                  onClick={() => setTab(id)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div
              className="bu-plan-scroll-arrows"
              aria-label="Scroll plan details"
            >
              <button
                type="button"
                className="bu-plan-scroll-arrow"
                onClick={() => scrollPlanDetails("up")}
                aria-label="Scroll up"
                title="Scroll up"
              >
                <Icon name="arrow-up" size={17} />
              </button>

              <button
                type="button"
                className="bu-plan-scroll-arrow"
                onClick={() => scrollPlanDetails("down")}
                aria-label="Scroll down"
                title="Scroll down"
              >
                <Icon name="arrow-down" size={17} />
              </button>
            </div>
          </div>

          <div className="bu-tier-detail-panel" role="tabpanel">
            {tab === "benefits" && (
              <>
                <h3>What you get with {plan.tier}</h3>

                <p className="bu-tier-detail-caption">
                  Benefits and plan information listed for this specific tier in
                  the catalogue.
                </p>

                {benefits.length ? (
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
                ) : (
                  <div className="bu-tier-no-benefits">
                    Detailed benefits have not been added to this catalogue
                    entry yet.
                  </div>
                )}

                {plan.features && (
                  <p className="bu-details-description">{plan.features}</p>
                )}

                {plan.limits && (
                  <p className="bu-tier-limits">
                    <strong>Usage limits:</strong> {plan.limits}
                  </p>
                )}

                {plan.devices && (
                  <p className="bu-tier-limits">
                    <strong>Device access:</strong> {plan.devices}
                  </p>
                )}

                {plan.note && (
                  <p className="bu-tier-limits">
                    <strong>Note:</strong> {plan.note}
                  </p>
                )}
              </>
            )}

            {tab === "about" && (
              <div className="bu-about-details">
                <h3>
                  About {plan.brand} {plan.tier}
                </h3>

                <p>
                  {detail?.about ||
                    plan.description ||
                    plan.useCase ||
                    plan.features ||
                    "Plan description is not available in the catalogue."}
                </p>

                <dl>
                  <div>
                    <dt>Provider</dt>
                    <dd>{plan.brand}</dd>
                  </div>

                  <div>
                    <dt>Plan</dt>
                    <dd>{plan.tier}</dd>
                  </div>

                  <div>
                    <dt>Category</dt>
                    <dd>{plan.category}</dd>
                  </div>

                  <div>
                    <dt>Billing</dt>
                    <dd>{plan.billing}</dd>
                  </div>

                  <div>
                    <dt>Reference price</dt>
                    <dd>{getPriceInfo(plan).display}</dd>
                  </div>

                  <div>
                    <dt>Price basis</dt>
                    <dd>{plan.priceBasis || "Catalogue reference"}</dd>
                  </div>
                </dl>

                {detail?.source && (
                  <a href={detail.source} target="_blank" rel="noreferrer">
                    View provider information <Icon name="arrow" size={13} />
                  </a>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>,

    document.body,
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

  const submit = (event) => {
    event.preventDefault();

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
        "Checkout could not start. Please review your selected plans and try again.",
      );

      return;
    }

    setDone(false);
  };

  return createPortal(
    <div
      className="bu-details-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
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

            <button className="bu-primary-btn" onClick={onClose} type="button">
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
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(event) =>
                    setForm({ ...form, fullName: event.target.value })
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
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                  placeholder="you\\@example.com"
                />
              </label>

              <label>
                Mobile number (+91)
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={form.phone}
                  onChange={(event) =>
                    setForm({
                      ...form,

                      phone: event.target.value.replace(/\D/g, "").slice(0, 10),
                    })
                  }
                  placeholder="10-digit number"
                />
              </label>

              <label className="bu-checkbox">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) =>
                    setForm({ ...form, consent: event.target.checked })
                  }
                />
                I agree to be contacted about my selected subscriptions and
                accept BundleUpOtt’s Terms and Conditions.
              </label>

              {(checkoutError || error) && (
                <p className="bu-form-error" role="alert">
                  {checkoutError || error}
                </p>
              )}

              <button type="submit" className="bu-primary-btn bu-submit">
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

    document.body,
  );
}

export default function OurPlans() {
  const rootRef = useRef(null);

  const servicePanelRef = useRef(null);

  // Controls the category-page transition between OTT, AI and Other.
  const bubbleStageRef = useRef(null);
  const groupChangeLockRef = useRef(false);
  const previousGroupRef = useRef("ott");

  const [searchParams] = useSearchParams();

  const [group, setGroup] = useState("ott");

  const [category, setCategory] = useState("all");

  const [query, setQuery] = useState("");

  const [limit, setLimit] = useState(PAGE_SIZE);

  const [activePlan, setActivePlan] = useState(null);

  const viewNextPlan = () => {
    if (!activePlan) return;

    const currentId = String(activePlan.id);

    const cards = Array.from(document.querySelectorAll("[data-plan-id]"));

    const currentIndex = cards.findIndex(
      (card) => card.getAttribute("data-plan-id") === currentId,
    );

    const nextCard = currentIndex >= 0 ? cards[currentIndex + 1] : null;

    setActivePlan(null);

    if (nextCard) {
      window.setTimeout(() => {
        nextCard.scrollIntoView({
          behavior: "smooth",

          block: "center",

          inline: "nearest",
        });
      }, 120);
    } else {
      window.setTimeout(() => {
        document.getElementById("bu-catalogue")?.scrollIntoView({
          behavior: "smooth",

          block: "start",
        });
      }, 120);
    }
  };

  const [activeBrand, setActiveBrand] = useState(null);

  // Animate the service panel out before unmounting it.
  const closeActiveBrand = () => {
    const panel = servicePanelRef.current;

    if (!panel) {
      setActiveBrand(null);
      return;
    }

    gsap.killTweensOf(panel);

    gsap.to(panel, {
      autoAlpha: 0,
      y: 22,
      scale: 0.975,
      filter: "blur(7px)",
      duration: 0.24,
      ease: "power2.in",
      onComplete: () => setActiveBrand(null),
    });
  };

  const toggleService = (serviceKey) => {
    if (activeBrand === serviceKey) {
      closeActiveBrand();
    } else {
      setActiveBrand(serviceKey);
    }
  };

  // Animate the current category away, switch the data, then animate the
  // newly selected category into view. This keeps the tab switch intentional
  // instead of instantly replacing all the service bubbles.
  const changeSubscriptionGroup = (nextGroup) => {
    if (nextGroup === group || groupChangeLockRef.current) return;

    groupChangeLockRef.current = true;

    const stage = bubbleStageRef.current;
    const currentBubbles = stage
      ? gsap.utils.toArray(".bu-service-bubble", stage)
      : [];
    const currentFooter = stage?.querySelector(".bu-bubble-stage-footer");
    const openPanel = document.querySelector(".bu-service-panel");

    gsap.killTweensOf(
      [...currentBubbles, currentFooter, openPanel].filter(Boolean),
    );

    const transition = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        setActiveBrand(null);
        setCategory("all");
        setQuery("");
        setGroup(nextGroup);
        groupChangeLockRef.current = false;
      },
    });

    if (currentBubbles.length) {
      transition.to(
        currentBubbles,
        {
          autoAlpha: 0,
          y: -24,
          scale: 0.82,
          rotate: (index) => (index % 2 ? 8 : -8),
          duration: 0.24,
          stagger: { each: 0.012, from: "random" },
        },
        0,
      );
    }

    if (currentFooter) {
      transition.to(currentFooter, { autoAlpha: 0, y: 10, duration: 0.18 }, 0);
    }

    if (openPanel) {
      transition.to(
        openPanel,
        {
          autoAlpha: 0,
          y: 18,
          scale: 0.97,
          filter: "blur(5px)",
          duration: 0.2,
        },
        0,
      );
    }

    if (!currentBubbles.length && !currentFooter && !openPanel) {
      setActiveBrand(null);
      setCategory("all");
      setQuery("");
      setGroup(nextGroup);
      groupChangeLockRef.current = false;
    }
  };

  // When React renders the new group, reveal its service bubbles with a
  // staggered GSAP entrance. The first page load has its own hero entrance.
  useEffect(() => {
    if (previousGroupRef.current === group) return undefined;
    previousGroupRef.current = group;

    const stage = bubbleStageRef.current;
    if (
      !stage ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const bubbles = gsap.utils.toArray(".bu-service-bubble", stage);
    const footer = stage.querySelector(".bu-bubble-stage-footer");
    const orbs = stage.querySelectorAll(".bu-stage-orb");

    gsap.set([...bubbles, footer].filter(Boolean), {
      autoAlpha: 0,
      y: 26,
      scale: 0.88,
    });
    gsap.set(orbs, { autoAlpha: 0, scale: 0.75 });

    const entrance = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        gsap.set([...bubbles, footer].filter(Boolean), {
          clearProps: "transform,opacity,visibility",
        });
        gsap.set(orbs, { clearProps: "transform,opacity,visibility" });
      },
    });

    if (orbs.length) {
      entrance.to(
        orbs,
        { autoAlpha: 1, scale: 1, duration: 0.55, stagger: 0.08 },
        0,
      );
    }
    if (bubbles.length) {
      entrance.to(
        bubbles,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 0.58,
          stagger: { each: 0.035, from: "random" },
          ease: "back.out(1.45)",
        },
        0.08,
      );
    }
    if (footer) {
      entrance.to(footer, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.28);
    }

    return () => entrance.kill();
  }, [group]);

  // Escape closes the currently open service panel.
  useEffect(() => {
    if (!activeBrand) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") closeActiveBrand();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [activeBrand]);

  // GSAP entrance for the panel and its tier bubbles.
  useEffect(() => {
    const panel = servicePanelRef.current;
    if (!activeBrand || !panel) return undefined;

    const tierBubbles = panel.querySelectorAll(".bu-tier-bubble");

    gsap.killTweensOf([panel, ...tierBubbles]);

    const intro = gsap.timeline();
    intro.fromTo(
      panel,
      {
        autoAlpha: 0,
        y: 28,
        scale: 0.96,
        filter: "blur(8px)",
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.48,
        ease: "power3.out",
      },
    );

    if (tierBubbles.length) {
      intro.fromTo(
        tierBubbles,
        { autoAlpha: 0, y: 22, scale: 0.92 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.42,
          stagger: 0.065,
          ease: "back.out(1.45)",
          clearProps: "transform",
        },
        "-=0.2",
      );
    }

    return () => {
      intro.kill();
      gsap.killTweensOf([panel, ...tierBubbles]);
    };
  }, [activeBrand]);

  const [isMobileViewport, setIsMobileViewport] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 760px)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");

    const updateViewport = () => setIsMobileViewport(media.matches);

    updateViewport();

    if (media.addEventListener) {
      media.addEventListener("change", updateViewport);

      return () => media.removeEventListener("change", updateViewport);
    }

    media.addListener(updateViewport);

    return () => media.removeListener(updateViewport);
  }, []);

  // Lock the page behind the mobile plan sheet without allowing iOS Safari

  // to continue scrolling the document. The portal sheet remains independently scrollable.

  useEffect(() => {
    if (!activeBrand || !isMobileViewport) return undefined;

    const scrollY = window.scrollY || window.pageYOffset || 0;

    const body = document.body;

    const html = document.documentElement;

    const previousBodyStyles = {
      position: body.style.position,

      top: body.style.top,

      left: body.style.left,

      right: body.style.right,

      width: body.style.width,

      overflow: body.style.overflow,

      touchAction: body.style.touchAction,
    };

    const previousHtmlStyles = {
      overflow: html.style.overflow,

      overscrollBehavior: html.style.overscrollBehavior,
    };

    body.style.position = "fixed";

    body.style.top = `-${scrollY}px`;

    body.style.left = "0";

    body.style.right = "0";

    body.style.width = "100%";

    body.style.overflow = "hidden";

    body.style.touchAction = "none";

    html.style.overflow = "hidden";

    html.style.overscrollBehavior = "none";

    return () => {
      Object.assign(body.style, previousBodyStyles);

      Object.assign(html.style, previousHtmlStyles);

      window.scrollTo(0, scrollY);
    };
  }, [activeBrand, isMobileViewport]);

  const [formOpen, setFormOpen] = useState(false);

  const [cloudAdded, setCloudAdded] = useState(false);

  const [cloudDismissed, setCloudDismissed] = useState(false);

  const [checkoutCustomer, setCheckoutCustomer] = useState(null);

  const [checkoutPlans, setCheckoutPlans] = useState([]);

  const [checkoutError, setCheckoutError] = useState("");

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

          .filter((id) => BY_ID.has(id)),
      ),
    ];
  });

  useEffect(() => {
    window.history.scrollRestoration = "manual";

    window.scrollTo({
      top: 0,

      left: 0,

      behavior: "instant",
    });
  }, []);

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
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Awwwards-style motion layer: SVG atmosphere, scroll reveals and soft card entrances.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const hero = rootRef.current?.querySelector(".bu-hero");
      if (!hero) return;

      const svg = hero.querySelector(".bu-hero-svg");
      const orbits = hero.querySelectorAll(".bu-svg-orbit");
      const glows = hero.querySelectorAll(".bu-svg-glow");
      const dots = hero.querySelectorAll(".bu-svg-dot");

      gsap.set(svg, { autoAlpha: 0 });
      gsap.set(orbits, { strokeDasharray: 1400, strokeDashoffset: 1400 });
      gsap.set(dots, { transformOrigin: "50% 50%", scale: 0 });

      const intro = gsap.timeline({ delay: 0.08 });
      intro
        .to(svg, { autoAlpha: 1, duration: 0.8, ease: "power2.out" })
        .to(
          orbits,
          {
            strokeDashoffset: 0,
            duration: 2.2,
            stagger: 0.25,
            ease: "power2.inOut",
          },
          "-=0.35",
        )
        .to(
          dots,
          {
            scale: 1,
            duration: 0.55,
            stagger: 0.12,
            ease: "back.out(2)",
          },
          "-=1.25",
        );

      gsap.to(orbits, {
        rotation: 8,
        transformOrigin: "50% 50%",
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1.2,
      });

      gsap.to(glows, {
        scale: 1.16,
        opacity: 0.72,
        transformOrigin: "50% 50%",
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1.4,
      });

      gsap.to(dots, {
        y: (index) => (index % 2 ? -18 : 16),
        x: (index) => (index % 2 ? 12 : -10),
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.35,
      });

      gsap.utils
        .toArray(".bu-section-heading, .bu-bubble-toolbar, .bu-summary")
        .forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 34 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            },
          );
        });

      gsap.utils.toArray(".bu-plan-bubble").forEach((card, index) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 42, scale: 0.94 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.72,
            delay: (index % 6) * 0.055,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 94%",
              once: true,
            },
          },
        );
      });

      // Floating service logos enter with a soft stagger when the catalogue appears.
      const serviceBubbles = gsap.utils.toArray(".bu-service-bubble");

      if (serviceBubbles.length) {
        gsap.fromTo(
          serviceBubbles,
          {
            autoAlpha: 0,
            y: 38,
            scale: 0.72,
            rotate: (index) => (index % 2 === 0 ? -9 : 9),
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.82,
            stagger: 0.045,
            ease: "back.out(1.55)",
            scrollTrigger: {
              trigger: ".bu-bubble-stage",
              start: "top 86%",
              once: true,
            },
          },
        );
      }
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

    [selectedIds],
  );

  const priceInfo = selected.map((plan) => {
    const months = selectedDurations[String(plan.id)] || "1";

    const offer = getOfferPriceInfo(plan, months);

    return {
      plan,

      months,

      amount: offer.amount,

      originalAmount: offer.originalAmount,

      savingsPercent: offer.savingsPercent,
    };
  });

  const knownBaseAmount = priceInfo.reduce(
    (total, item) => total + (item.amount ?? 0),

    0,
  );

  const regularBaseAmount = priceInfo.reduce(
    (total, item) => total + (item.originalAmount ?? 0),

    0,
  );

  const unknownCount = priceInfo.filter(
    (item) => item.amount === null || item.originalAmount === null,
  ).length;

  // Show a final total only when every selected plan has a known price.

  const amount =
    selected.length && unknownCount === 0
      ? knownBaseAmount + (cloudAdded ? CLOUD_OFFER.price : 0)
      : null;

  const regularAmount =
    selected.length && unknownCount === 0
      ? regularBaseAmount + (cloudAdded ? CLOUD_OFFER.originalPrice : 0)
      : null;

  const ottSelected = selected.filter((plan) => groupOf(plan) === "ott").length;

  const aiSelected = selected.filter((plan) => groupOf(plan) === "ai").length;

  const results = useMemo(
    () =>
      PRICED_SUBSCRIPTION_CATALOGUE.filter((plan) => {
        if (groupOf(plan) !== group) return false;

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
            String(value || "")
              .toLowerCase()
              .includes(term),
          )
        );
      }),

    [group, category, query],
  );

  const services = useMemo(() => {
    const grouped = new Map();

    results.forEach((plan) => {
      const originalBrand = String(plan.brand || "").trim();
      const normalizedBrand = originalBrand.toLowerCase().replace(/\\s+/g, "");

      if (!originalBrand) return;

      // Display the existing Jio catalogue group as JioStar.
      // JioHotstar remains its own separate service.
      const displayBrand = ["jio", "jiocinema", "jiocinema premium"].includes(
        normalizedBrand,
      )
        ? "JioStar"
        : originalBrand;

      const key = displayBrand.toLowerCase();

      if (!grouped.has(key)) {
        grouped.set(key, {
          key,
          brand: displayBrand,
          representative: plan,
          plans: [],
        });
      }

      grouped.get(key).plans.push(plan);
    });

    return Array.from(grouped.values()).sort((a, b) =>
      a.brand.localeCompare(b.brand),
    );
  }, [results]);

  const activeService =
    services.find((service) => service.key === activeBrand) || null;

  function togglePlan(id) {
    const key = String(id);

    if (selectedIds.includes(key)) {
      setSelectedDurations((previous) => {
        const next = { ...previous };

        delete next[key];

        return next;
      });
    }

    setSelectedIds((previous) => {
      if (previous.includes(key)) {
        return previous.filter((item) => item !== key);
      }

      const incoming = BY_ID.get(key);

      if (!incoming) return previous;

      return [
        ...previous.filter((item) => {
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

    setSelectedIds((previous) => [
      ...previous.filter((item) => {
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

    setSelectedDurations((previous) => {
      const next = { ...previous };

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

  function removeAll() {
    setSelectedIds([]);

    setCloudAdded(false);

    setCloudDismissed(false);

    setSelectedDurations({});
  }

  function saveCustomer(customer) {
    setCheckoutError("");

    if (!selected.length) {
      setCheckoutError(
        "Please select at least one subscription before checkout.",
      );

      return false;
    }

    if (cloudAdded) {
      setCloudAdded(false);

      setCheckoutError("");
    }

    const unpricedPlans = selected.filter((plan) => {
      const months = selectedDurations[String(plan.id)] || "1";

      return getOfferPriceInfo(plan, months).amount === null;
    });

    if (unpricedPlans.length > 0) {
      const names = unpricedPlans

        .map((plan) => `${plan.brand} — ${plan.tier}`)

        .join(", ");

      setCheckoutError(
        `These services need a fixed price before checkout: ${names}`,
      );

      return false;
    }

    const mappedPlans = selected.map((plan) => ({
      id: `sub_${String(plan.id)}`,

      name: `${plan.brand} ${plan.tier}`,

      months: Number(selectedDurations[String(plan.id)] || "1"),
    }));

    const uniquePlans = [
      ...new Map(mappedPlans.map((plan) => [plan.id, plan])).values(),
    ];

    sessionStorage.setItem(
      "bundleupott_checkout_draft",

      JSON.stringify({
        customer,

        planIds: uniquePlans.map((plan) => plan.id),

        paymentStatus: "checkout_started",

        createdAt: new Date().toISOString(),
      }),
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

  // Checkout view

  if (checkoutCustomer) {
    return (
      <main ref={rootRef} className="bu-plans-page">
        <section className="bu-catalogue">
          <div className="bu-shell">
            <div className="bu-section-heading">
              <span className="bu-eyebrow">SECURE CHECKOUT</span>

              <h1>Complete your checkout</h1>

              <p>
                Customer: {checkoutCustomer.fullName} · {checkoutCustomer.email}
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

  const servicePanelContent = activeService ? (
    <section
      ref={servicePanelRef}
      key={activeService.key}
      className="bu-service-panel"
      aria-label={`${activeService.brand} plans`}
      aria-live="polite"
    >
      <div className="bu-service-panel-head">
        <div className="bu-service-panel-brand">
          <Logo plan={activeService.representative} large />

          <div>
            <h3>{activeService.brand}</h3>

            <span>
              {activeService.plans.length}{" "}
              {activeService.plans.length === 1 ? "Plan" : "Plans"} Available
            </span>
          </div>
        </div>

        <button
          type="button"
          className="bu-service-panel-close"
          onClick={closeActiveBrand}
          aria-label={`Close ${activeService.brand} plans`}
        >
          <Icon name="close" size={19} />
        </button>
      </div>

      <div className="bu-service-plan-grid">
        {activeService.plans.map((plan) => (
          <SubscriptionCard
            key={plan.id}
            plan={plan}
            selected={selectedIds.includes(String(plan.id))}
            onOpen={setActivePlan}
          />
        ))}
      </div>
    </section>
  ) : null;

  return (
    <main ref={rootRef} className="bu-plans-page">
      {/* HERO */}

      <section className="bu-hero">
        <div className="bu-hero-svg-bg" aria-hidden="true">
          <svg
            className="bu-hero-svg"
            viewBox="0 0 1440 620"
            preserveAspectRatio="xMidYMid slice"
            role="presentation"
          >
            <defs>
              <radialGradient id="buGlowA">
                <stop offset="0%" stopColor="#72d9b0" stopOpacity=".34" />
                <stop offset="100%" stopColor="#72d9b0" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="buLineGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#45c995" stopOpacity="0" />
                <stop offset="50%" stopColor="#45c995" stopOpacity=".55" />
                <stop offset="100%" stopColor="#45c995" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle
              className="bu-svg-glow bu-svg-glow-one"
              cx="1120"
              cy="130"
              r="310"
              fill="url(#buGlowA)"
            />
            <circle
              className="bu-svg-glow bu-svg-glow-two"
              cx="260"
              cy="520"
              r="250"
              fill="url(#buGlowA)"
            />
            <path
              className="bu-svg-orbit bu-svg-orbit-one"
              d="M720 70 C930 -10 1240 40 1370 230 C1480 390 1260 560 1030 500 C820 445 820 260 1010 210 C1160 170 1270 280 1190 370"
            />
            <path
              className="bu-svg-orbit bu-svg-orbit-two"
              d="M620 120 C820 10 1080 60 1190 210 C1300 360 1120 470 950 430 C780 390 760 260 900 210"
            />
            <path
              className="bu-svg-wave"
              d="M0 500 C220 420 340 590 570 500 S940 400 1120 480 S1320 570 1440 470"
            />
            <circle className="bu-svg-dot dot-one" cx="900" cy="110" r="5" />
            <circle className="bu-svg-dot dot-two" cx="1260" cy="420" r="7" />
            <circle className="bu-svg-dot dot-three" cx="760" cy="390" r="4" />
            <circle className="bu-svg-dot dot-four" cx="1370" cy="170" r="4" />
          </svg>
        </div>
        <div className="bu-shell bu-hero-grid">
          <div className="bu-hero-copy">
            <span className="bu-pill">
              <Icon name="spark" size={16} />
              YOUR CHOICE. YOUR BUNDLE.
            </span>

            <h1>
              Explore <span>subscriptions</span>
            </h1>

            <p>
              Browse your favourite OTT, AI and other subscriptions in one
              place.
            </p>
          </div>
        </div>
      </section>

      {/* SUBSCRIPTION CATALOGUE */}

      <section className="bu-catalogue" id="bu-catalogue">
        <div className="bu-shell">
          <div className="bu-section-heading">
            <span className="bu-eyebrow">COMPLETE SUBSCRIPTION CATALOGUE</span>

            <h2>
              Choose a service. <span>Explore its plans.</span>
            </h2>

            <p>
              Select a floating logo to reveal its available plans. Select the
              same logo again or close the panel to return to the bubbles.
            </p>
          </div>

          <div className="bu-layout bu-bubble-layout">
            <div className="bu-list bu-bubble-list">
              {/* Category tabs stay with the bubble catalogue on the left. */}

              <div className="bu-bubble-toolbar">
                <div
                  className="bu-bubble-tabs"
                  role="tablist"
                  aria-label="Subscription categories"
                >
                  {TABS.map(({ id, label }) => (
                    <button
                      type="button"
                      key={id}
                      role="tab"
                      aria-selected={group === id}
                      className={`bu-bubble-tab bu-tab-${id} ${group === id ? "is-active" : ""}`}
                      onClick={() => changeSubscriptionGroup(id)}
                    >
                      <span className="bu-bubble-tab-symbol">
                        {id === "ott" ? "▷" : id === "ai" ? "✧" : "▱"}
                      </span>

                      <strong>{label}</strong>

                      <b>
                        {id === "ott"
                          ? COUNTS.ott
                          : id === "ai"
                            ? COUNTS.ai
                            : COUNTS.other}
                      </b>
                    </button>
                  ))}
                </div>
              </div>

              <div
                ref={bubbleStageRef}
                className={`bu-bubble-stage ${activeService ? "is-showing-plans" : ""}`}
                data-active-service={activeService?.key || ""}
              >
                <span className="bu-stage-orb bu-stage-orb-one" />

                <span className="bu-stage-orb bu-stage-orb-two" />

                <span className="bu-stage-orb bu-stage-orb-three" />

                <div
                  className="bu-floating-bubbles"
                  aria-label={`${group} subscription services`}
                >
                  {services.map((service, index) => (
                    <button
                      type="button"
                      key={service.key}
                      className={`bu-service-bubble bu-service-bubble-${index % 8} bu-service-${String(
                        service.brand || service.key,
                      )
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(
                          /^-|-$/g,
                          "",
                        )} ${activeBrand === service.key ? "is-open" : ""}`}
                      style={{
                        "--bubble-index": index,
                        "--bubble-delay": `${(index % 9) * -0.55}s`,
                      }}
                      onClick={() => toggleService(service.key)}
                      aria-expanded={activeBrand === service.key}
                      aria-label={`View ${service.brand} plans`}
                      title={`View ${service.brand} plans`}
                    >
                      <span className="bu-service-bubble-logo">
                        <Logo plan={service.representative} />
                      </span>

                      <span className="bu-service-name">{service.brand}</span>
                    </button>
                  ))}
                </div>

                {activeService &&
                  (isMobileViewport
                    ? createPortal(
                        <>
                          <button
                            type="button"
                            className="bu-mobile-service-backdrop"
                            aria-label="Close subscription plans"
                            onClick={closeActiveBrand}
                          />

                          {servicePanelContent}
                        </>,

                        document.body,
                      )
                    : servicePanelContent)}

                {!services.length && (
                  <div className="bu-bubble-empty">
                    <strong>No subscriptions found</strong>

                    <span>Try another category.</span>
                  </div>
                )}

                <div className="bu-bubble-stage-footer">
                  <span>
                    <b>{services.length}</b> services · <b>{results.length}</b>{" "}
                    plans available
                  </span>

                  <span>
                    {activeService
                      ? `Viewing ${activeService.brand}`
                      : "Click a logo to view plans"}
                  </span>
                </div>
              </div>

              <p className="bu-disclaimer">
                Catalogue reference only. Features, plan terms, India
                availability and prices must be verified with providers.
              </p>
            </div>

            {/* BUNDLE SUMMARY */}

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
                  selected.map((plan) => {
                    const months = selectedDurations[String(plan.id)] || "1";

                    const selectedOffer = getOfferPriceInfo(plan, months);

                    const selectedPrice = selectedOffer.amount;

                    return (
                      <div key={plan.id} className="bu-selected-row">
                        <Logo plan={plan} />

                        <div>
                          <strong>{plan.brand}</strong>

                          <small className="bu-selected-plan-meta">
                            {plan.tier} · {months} month(s)
                          </small>

                          <span className="bu-selected-price-line">
                            {selectedPrice === null ? (
                              <strong className="bu-selected-best-price">
                                Price to confirm
                              </strong>
                            ) : (
                              <>
                                {selectedOffer.originalAmount !== null && (
                                  <del>
                                    {INR.format(selectedOffer.originalAmount)}
                                  </del>
                                )}

                                <strong className="bu-selected-best-price">
                                  Our best price {INR.format(selectedPrice)}
                                </strong>
                              </>
                            )}
                          </span>
                        </div>

                        <button
                          type="button"
                          aria-label={`Remove ${plan.brand}`}
                          onClick={() => togglePlan(plan.id)}
                        >
                          <Icon name="close" size={17} />
                        </button>
                      </div>
                    );
                  })
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

                    <small className="bu-selected-plan-meta">
                      250 GB · Monthly
                    </small>

                    <span className="bu-selected-price-line">
                      <del>{INR.format(CLOUD_OFFER.originalPrice)}</del>

                      <strong className="bu-selected-best-price">
                        Our best price {INR.format(CLOUD_OFFER.price)}/month
                      </strong>
                    </span>
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
                  <Icon name="cloud" size={17} />
                  View 250 GB cloud offer (₹149)
                </button>
              )}

              <div className="bu-total">
                <div className="bu-total-label-row">
                  <span>OUR BEST BUNDLE PRICE</span>

                  {amount !== null &&
                    regularAmount !== null &&
                    regularAmount > amount && (
                      <small className="bu-total-savings">
                        You Save {INR.format(regularAmount - amount)}
                      </small>
                    )}
                </div>

                <div className="bu-total-price-row">
                  {amount !== null &&
                    regularAmount !== null &&
                    regularAmount > amount && (
                      <del>{INR.format(Math.round(regularAmount))}</del>
                    )}

                  <strong>
                    {amount === null
                      ? selected.length
                        ? "Price to confirm"
                        : "—"
                      : INR.format(Math.round(amount))}
                  </strong>
                </div>

                <small className="bu-total-note">
                  Total for the durations selected above, including any added
                  offer.
                </small>
              </div>

              <button
                type="button"
                className="bu-primary-btn bu-continue"
                disabled={!selected.length}
                onClick={() => setFormOpen(true)}
              >
                Continue to Details <Icon name="arrow" />
              </button>

              <button
                type="button"
                className="bu-clear"
                disabled={!selected.length}
                onClick={removeAll}
              >
                Clear bundle
              </button>

              <p className="bu-summary-foot">No login required</p>
            </aside>
          </div>
        </div>
      </section>

      {/* OUTRO */}

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

          <button
            type="button"
            className="bu-primary-btn"
            onClick={scrollToPlans}
          >
            Browse all subscriptions <Icon name="arrow" />
          </button>
        </div>
      </section>

      {/* SUBSCRIPTION DETAILS MODAL */}

      {activePlan && (
        <DetailsModal
          key={activePlan.id}
          plan={activePlan}
          selected={selectedIds.includes(String(activePlan.id))}
          selectedDuration={selectedDurations[String(activePlan.id)] || "1"}
          onToggle={togglePlan}
          onSelectOffer={(id, months) => {
            selectOffer(id, months);

            setActivePlan(null);
          }}
          onViewNextPlan={viewNextPlan}
          onClose={() => setActivePlan(null)}
        />
      )}

      {/* CUSTOMER DETAILS MODAL */}

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
