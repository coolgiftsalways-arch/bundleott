import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../Style/OurPlans.css";
import CustomerDetailsModal from "../pages/CustomerDetailsModal";

gsap.registerPlugin(ScrollTrigger);

/* ==================================================
   BUNDLEUPOTT SUBSCRIPTION CATALOG

   IMPORTANT:
   Prices are DEMO values.
   Replace with your actual authorized selling prices.
================================================== */

const OTT_PLANS = [
  {
    id: "netflix",
    name: "Netflix",
    price: 199,
    category: "ott",
    genre: "Movies & Series",
    domain: "netflix.com",
    featured: true,
  },
  {
    id: "prime",
    name: "Amazon Prime Video",
    price: 299,
    category: "ott",
    genre: "Movies & Originals",
    domain: "primevideo.com",
    featured: true,
  },
  {
    id: "jiohotstar",
    name: "JioHotstar",
    price: 149,
    category: "ott",
    genre: "Movies & Sports",
    domain: "jiohotstar.com",
    indian: true,
  },
  {
    id: "sonyliv",
    name: "SonyLIV",
    price: 299,
    category: "ott",
    genre: "Shows & Sports",
    domain: "sonyliv.com",
    indian: true,
  },
  {
    id: "zee5",
    name: "ZEE5",
    price: 149,
    category: "ott",
    genre: "Indian Entertainment",
    domain: "zee5.com",
    indian: true,
  },
  {
    id: "sunnxt",
    name: "Sun NXT",
    price: 99,
    category: "ott",
    genre: "South Indian",
    domain: "sunnxt.com",
    indian: true,
  },
  {
    id: "aha",
    name: "aha",
    price: 149,
    category: "ott",
    genre: "Telugu & Tamil",
    domain: "aha.video",
    indian: true,
  },
  {
    id: "hoichoi",
    name: "Hoichoi",
    price: 99,
    category: "ott",
    genre: "Bengali",
    domain: "hoichoi.tv",
    indian: true,
  },
  {
    id: "shemaroome",
    name: "ShemarooMe",
    price: 99,
    category: "ott",
    genre: "Indian Movies",
    domain: "shemaroome.com",
    indian: true,
  },
  {
    id: "lionsgate",
    name: "Lionsgate Play",
    price: 149,
    category: "ott",
    genre: "Hollywood",
    domain: "lionsgateplay.com",
  },
  {
    id: "discovery",
    name: "discovery+",
    price: 99,
    category: "ott",
    genre: "Documentaries",
    domain: "discoveryplus.in",
  },
  {
    id: "fancode",
    name: "FanCode",
    price: 149,
    category: "ott",
    genre: "Live Sports",
    domain: "fancode.com",
    indian: true,
  },
  {
    id: "chaupal",
    name: "Chaupal",
    price: 99,
    category: "ott",
    genre: "Punjabi & Regional",
    domain: "chaupal.tv",
    indian: true,
  },
  {
    id: "etvwin",
    name: "ETV Win",
    price: 99,
    category: "ott",
    genre: "Telugu",
    domain: "etvwin.com",
    indian: true,
  },
  {
    id: "planetmarathi",
    name: "Planet Marathi",
    price: 99,
    category: "ott",
    genre: "Marathi",
    domain: "planetmarathi.com",
    indian: true,
  },
  {
    id: "manoramamax",
    name: "ManoramaMAX",
    price: 99,
    category: "ott",
    genre: "Malayalam",
    domain: "manoramamax.com",
    indian: true,
  },
  {
    id: "erosnow",
    name: "Eros Now",
    price: 99,
    category: "ott",
    genre: "Indian Cinema",
    domain: "erosnow.com",
  },
  {
    id: "youtube",
    name: "YouTube Premium",
    price: 149,
    category: "ott",
    genre: "Videos & Music",
    domain: "youtube.com",
  },
];

/* ==================================================
   AI PLANS
================================================== */

const AI_PLANS = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    price: 199,
    category: "ai",
    genre: "AI Assistant",
    domain: "chatgpt.com",
    featured: true,
  },
  {
    id: "gemini",
    name: "Google Gemini",
    price: 199,
    category: "ai",
    genre: "AI Assistant",
    domain: "gemini.google.com",
    featured: true,
  },
  {
    id: "claude",
    name: "Claude",
    price: 199,
    category: "ai",
    genre: "Writing & Coding",
    domain: "claude.ai",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    price: 199,
    category: "ai",
    genre: "AI Search",
    domain: "perplexity.ai",
  },
  {
    id: "copilot",
    name: "Microsoft Copilot",
    price: 199,
    category: "ai",
    genre: "Productivity",
    domain: "copilot.microsoft.com",
  },
  {
    id: "grok",
    name: "Grok",
    price: 199,
    category: "ai",
    genre: "AI Assistant",
    domain: "grok.com",
  },
  {
    id: "midjourney",
    name: "Midjourney",
    price: 199,
    category: "ai",
    genre: "AI Images",
    domain: "midjourney.com",
  },
  {
    id: "canva",
    name: "Canva AI",
    price: 199,
    category: "ai",
    genre: "AI Design",
    domain: "canva.com",
  },
  {
    id: "notion",
    name: "Notion AI",
    price: 199,
    category: "ai",
    genre: "AI Workspace",
    domain: "notion.so",
  },
  {
    id: "firefly",
    name: "Adobe Firefly",
    price: 199,
    category: "ai",
    genre: "AI Creativity",
    domain: "adobe.com",
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    price: 199,
    category: "ai",
    genre: "AI Voice",
    domain: "elevenlabs.io",
  },
  {
    id: "runway",
    name: "Runway",
    price: 199,
    category: "ai",
    genre: "AI Video",
    domain: "runwayml.com",
  },
];

const ALL_PLANS = [...OTT_PLANS, ...AI_PLANS];

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/* ==================================================
   ICONS
================================================== */

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

/* ==================================================
   PLATFORM LOGO
================================================== */

function PlatformLogo({ plan }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`sp-logo sp-logo-${plan.category}`}>
      {!failed ? (
        <img
          src={`https://www.google.com/s2/favicons?domain=${plan.domain}&sz=128`}
          alt={`${plan.name} icon`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span>{plan.name.charAt(0)}</span>
      )}
    </div>
  );
}

/* ==================================================
   SUBSCRIPTION CARD
================================================== */

function PlanCard({ plan, selected, onToggle }) {
  return (
    <article className={`sp-plan-card ${selected ? "sp-card-selected" : ""}`}>
      {plan.featured && <span className="sp-popular-badge">POPULAR</span>}

      {plan.indian && <span className="sp-indian-badge">🇮🇳</span>}

      <div className="sp-card-top">
        <PlatformLogo plan={plan} />

        <h3>{plan.name}</h3>

        <p>{plan.genre}</p>
      </div>

      <div className="sp-card-bottom">
        <div className="sp-card-price">
          <strong>{INR.format(plan.price)}</strong>
          <span>/month</span>
        </div>

        <button
          type="button"
          className={`sp-add-btn ${selected ? "sp-added" : ""}`}
          onClick={() => onToggle(plan.id)}
          aria-pressed={selected}
        >
          {selected ? (
            <>
              <CheckIcon />
              Added
            </>
          ) : (
            <>
              Add to Bundle
              <span>+</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}

/* ==================================================
   MAIN OUR PLANS PAGE
================================================== */

export default function OurPlans() {
  const pageRef = useRef(null);

  const [searchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const [selectedIds, setSelectedIds] = useState(() => {
    const ids = searchParams.get("items");

    if (!ids) return [];

    const validIds = new Set(ALL_PLANS.map((plan) => plan.id));

    return [...new Set(ids.split(",").filter((id) => validIds.has(id)))];
  });

  /* ==================================================
     GSAP
  ================================================== */

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sp-hero-content > *",
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        },
      );

      gsap.utils.toArray(".sp-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 92%",
              once: true,
            },
          },
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  /* ==================================================
     SELECT / REMOVE PLANS
  ================================================== */

  const togglePlan = (id) => {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  };

  const clearBundle = () => {
    setSelectedIds([]);
  };

  /* ==================================================
     FILTER
  ================================================== */

  const filteredPlans = useMemo(() => {
    let plans = ALL_PLANS;

    if (activeTab === "ott") {
      plans = OTT_PLANS;
    }

    if (activeTab === "ai") {
      plans = AI_PLANS;
    }

    if (activeTab === "indian") {
      plans = OTT_PLANS.filter((plan) => plan.indian);
    }

    const searchText = search.trim().toLowerCase();

    if (searchText) {
      plans = plans.filter((plan) =>
        `${plan.name} ${plan.genre}`.toLowerCase().includes(searchText),
      );
    }

    return plans;
  }, [activeTab, search]);

  /* ==================================================
     BUNDLE CALCULATION
  ================================================== */

  const selectedPlans = ALL_PLANS.filter((plan) =>
    selectedIds.includes(plan.id),
  );

  const originalTotal = selectedPlans.reduce(
    (total, plan) => total + plan.price,
    0,
  );

  // Example promotion:
  // Netflix + Prime Video = ₹398/month

  const hasNetflix = selectedIds.includes("netflix");
  const hasPrime = selectedIds.includes("prime");

  const discount = hasNetflix && hasPrime ? 100 : 0;

  const finalTotal = Math.max(0, originalTotal - discount);

  const selectedOTT = selectedPlans.filter(
    (plan) => plan.category === "ott",
  ).length;

  const selectedAI = selectedPlans.filter(
    (plan) => plan.category === "ai",
  ).length;

  /* ==================================================
     CUSTOMER DETAILS BEFORE PAYMENT (FRONTEND ONLY)
     No login required, no payment processed here.
  ================================================== */
  const saveCustomerDetails = (customer) => {
    const draft = {
      customer,
      planIds: selectedPlans.map((plan) => plan.id),
      items: selectedPlans.map((plan) => ({
        id: plan.id,
        name: plan.name,
        category: plan.category,
        previewPrice: plan.price,
      })),
      previewAmount: finalTotal,
      previewDiscount: discount,
      currency: "INR",
      paymentStatus: "not_started",
      createdAt: new Date().toISOString(),
    };

    // This is only temporary browser storage, NOT a real order in the database.
    sessionStorage.setItem("bundleupott_checkout_draft", JSON.stringify(draft));
  };

  return (
    <main className="streamai-plans" ref={pageRef}>
      {/* ==================================================
          HERO
      ================================================== */}

      <section className="sp-hero">
        <div className="sp-hero-glow sp-glow-one" />
        <div className="sp-hero-glow sp-glow-two" />

        <svg
          className="sp-background-svg"
          viewBox="0 0 1400 500"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <circle cx="1180" cy="200" r="230" fill="none" stroke="#b6dfff" />

          <circle cx="1180" cy="200" r="310" fill="none" stroke="#c0eae2" />

          <path
            d="M0 420 C350 100 650 600 1400 150"
            stroke="#a6cfff"
            strokeWidth="2"
            strokeDasharray="12 16"
            fill="none"
          />
        </svg>
      </section>

      {/* ==================================================
          FEATURED OFFER
      ================================================== */}

      {/* ==================================================
          PLAN CATALOG
      ================================================== */}

      <section className="sp-catalog-section" id="plans-catalog">
        <div className="sp-container">
          <div className="sp-section-heading sp-reveal">
            <span className="sp-section-label">EXPLORE OUR PLANS</span>

            <h2>
              Choose What <span>You Love.</span>
            </h2>

            <p>Select any combination of OTT and AI services.</p>
          </div>

          <div className="sp-toolbar">
            <div className="sp-tabs">
              {[
                ["all", "All Plans"],
                ["ott", "OTT Plans"],
                ["ai", "AI Plans"],
                ["indian", "Indian OTT"],
              ].map(([id, label]) => (
                <button
                  type="button"
                  key={id}
                  className={activeTab === id ? "sp-tab-active" : ""}
                  onClick={() => setActiveTab(id)}
                >
                  {label}
                </button>
              ))}
            </div>

            <label className="sp-search">
              <SearchIcon />

              <input
                type="search"
                placeholder="Search subscriptions..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </div>

          {/* MAIN CONTENT */}

          <div className="sp-content-layout">
            {/* LEFT: PLANS */}

            <div className="sp-catalog-main">
              <div className="sp-results-header">
                <div>
                  <h3>
                    {activeTab === "all"
                      ? "All Subscriptions"
                      : activeTab === "ott"
                        ? "OTT Subscriptions"
                        : activeTab === "ai"
                          ? "AI Subscriptions"
                          : "Indian OTT Platforms"}
                  </h3>

                  <p>
                    {filteredPlans.length} services available in this demo
                    catalog
                  </p>
                </div>

                <span className="sp-results-count">
                  {filteredPlans.length} RESULTS
                </span>
              </div>

              <div className="sp-plans-grid">
                {filteredPlans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    selected={selectedIds.includes(plan.id)}
                    onToggle={togglePlan}
                  />
                ))}
              </div>

              {filteredPlans.length === 0 && (
                <div className="sp-empty-results">
                  <h3>No subscriptions found</h3>

                  <p>Try searching for a different platform.</p>

                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setActiveTab("all");
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              <p className="sp-price-disclaimer">
                All listed prices are illustrative. Displaying a service does
                not mean its subscription is currently available for purchase
                through bundleupott.
              </p>
            </div>

            {/* RIGHT: BUNDLE SUMMARY */}

            <aside className="sp-summary">
              <div className="sp-summary-header">
                <span className="sp-summary-tag">YOUR BUNDLE</span>

                <h3>
                  Build Your
                  <span> Perfect Plan</span>
                </h3>

                <p>Your selected subscriptions appear here.</p>
              </div>

              {/* COUNTERS */}

              <div className="sp-summary-stats">
                <div>
                  <strong>{selectedOTT}</strong>
                  <span>OTT</span>
                </div>

                <div>
                  <strong>{selectedAI}</strong>
                  <span>AI</span>
                </div>

                <div>
                  <strong>{selectedPlans.length}</strong>
                  <span>Total</span>
                </div>
              </div>

              {/* SELECTED PLANS */}

              <div className="sp-selected-plans">
                {selectedPlans.length === 0 ? (
                  <div className="sp-empty-bundle">
                    <span>✦</span>

                    <h4>Your bundle is empty</h4>

                    <p>
                      Select subscriptions to create your personalized bundle.
                    </p>
                  </div>
                ) : (
                  selectedPlans.map((plan) => (
                    <div className="sp-selected-item" key={plan.id}>
                      <PlatformLogo plan={plan} />

                      <div>
                        <strong>{plan.name}</strong>
                        <span>{INR.format(plan.price)}/month</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => togglePlan(plan.id)}
                        aria-label={`Remove ${plan.name}`}
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* PRICE BREAKDOWN */}

              <div className="sp-price-breakdown">
                <div>
                  <span>Regular Total</span>
                  <strong>{INR.format(originalTotal)}</strong>
                </div>

                {discount > 0 && (
                  <div className="sp-discount-row">
                    <span>Combo Discount</span>
                    <strong>−{INR.format(discount)}</strong>
                  </div>
                )}
              </div>

              <div className="sp-final-total">
                <span>Total Per Month</span>

                <div>
                  <strong>{INR.format(finalTotal)}</strong>

                  <small>/month</small>
                </div>
              </div>

              {discount > 0 && (
                <div className="sp-saving-banner">
                  🎉 You save {INR.format(discount)}
                  every month!
                </div>
              )}

              <button
                type="button"
                className="sp-checkout-btn"
                disabled={selectedPlans.length === 0}
                onClick={() => setCheckoutOpen(true)}
              >
                Continue to Checkout
                <ArrowIcon />
              </button>

              {selectedPlans.length > 0 && (
                <button
                  type="button"
                  className="sp-clear-btn"
                  onClick={clearBundle}
                >
                  Clear Bundle
                </button>
              )}

              <p className="sp-summary-note">
                Payment and activation require separate backend verification.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* ==================================================
          INDIA-BUILT AI INFORMATION
      ================================================== */}

      <section className="sp-india-ai-section">
        <div className="sp-container">
          <div className="sp-india-ai-card sp-reveal">
            <span>🇮🇳 INDIA-BUILT AI</span>

            <h2>
              Exploring India's
              <br />
              AI Innovation.
            </h2>

            <p>
              We're also following Indian AI developments, including Sarvam AI's
              Indus assistant. Availability and commercial subscription access
              depend on each provider.
            </p>

            <span className="sp-india-ai-status">
              Informational Only — Not Included in Checkout
            </span>
          </div>
        </div>
      </section>

      {/* Customer information is collected BEFORE any future payment step. */}
      {checkoutOpen && (
        <CustomerDetailsModal
          plans={selectedPlans}
          total={finalTotal}
          discount={discount}
          formatPrice={(value) => INR.format(value)}
          onSave={saveCustomerDetails}
          onClose={() => setCheckoutOpen(false)}
        />
      )}
    </main>
  );
}
