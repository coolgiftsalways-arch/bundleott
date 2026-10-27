import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../Style/Home.css";

gsap.registerPlugin(ScrollTrigger);

/* =====================================================
   LOCAL INDIAN PEOPLE IMAGES
   These image files are stored directly in frontend/public.
===================================================== */

const PHOTOS = {
  hero: "/indian-friends.png",
  entertainment: "/indian-family.png",
  productivity: "/indian-technology.png",
  couple: "/indian-couple.png",
};

/* =====================================================
   OTT SERVICES
===================================================== */

const ottPlatforms = [
  {
    id: "netflix",
    name: "Netflix",
    domain: "netflix.com",
    bg: "#121212",
    fallback: "N",
    color: "#e50914",
  },
  {
    id: "prime",
    name: "Amazon Prime Video",
    domain: "primevideo.com",
    bg: "#e8f5ff",
    fallback: "prime",
    color: "#168de6",
  },
  {
    id: "hotstar",
    name: "JioHotstar",
    domain: "jiohotstar.com",
    bg: "#eaf0ff",
    fallback: "✦",
    color: "#2255df",
  },
  {
    id: "sony",
    name: "SonyLIV",
    domain: "sonyliv.com",
    bg: "#f1eaff",
    fallback: "LIV",
    color: "#7038d6",
  },
  {
    id: "zee5",
    name: "ZEE5",
    domain: "zee5.com",
    bg: "#f4f5f8",
    fallback: "Z5",
    color: "#25314b",
  },
];

/* =====================================================
   AI SERVICES
===================================================== */

const aiPlatforms = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    domain: "chatgpt.com",
    bg: "#e4f8f2",
    fallback: "✳",
    color: "#087f6d",
  },
  {
    id: "gemini",
    name: "Gemini",
    domain: "gemini.google.com",
    bg: "#edf2ff",
    fallback: "✦",
    color: "#4285f4",
  },
  {
    id: "claude",
    name: "Claude",
    domain: "claude.ai",
    bg: "#fff0e9",
    fallback: "✺",
    color: "#d97757",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    domain: "perplexity.ai",
    bg: "#e8f7fa",
    fallback: "◈",
    color: "#16849a",
  },
  {
    id: "midjourney",
    name: "Midjourney",
    domain: "midjourney.com",
    bg: "#f1f3f7",
    fallback: "MJ",
    color: "#334155",
  },
];

/* =====================================================
   ICON COMPONENTS
===================================================== */

function ArrowIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ArrowUpRight({ size = 19 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function FeatureIcon({ type, size = 24 }) {
  const icons = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    wallet: (
      <>
        <rect x="2" y="6" width="20" height="14" rx="3" />
        <path d="M2 10h20" />
        <circle cx="17" cy="15" r="1" />
      </>
    ),
    shield: (
      <>
        <path d="M12 2 3 6v6c0 5 4 8 9 10 5-2 9-5 9-10V6z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
      </>
    ),
    sparkle: (
      <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z" />
    ),
    layers: (
      <>
        <path d="m12 2 9 5-9 5-9-5 9-5z" />
        <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
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
      {icons[type] || icons.sparkle}
    </svg>
  );
}

/* =====================================================
   BRAND LOGO
===================================================== */

function BrandLogo({ brand, floating = false }) {
  const [error, setError] = useState(false);

  return (
    <div
      className={`hm-brand-logo ${floating ? "hm-brand-logo-floating" : ""}`}
      style={{
        background: brand.bg,
        color: brand.color,
      }}
    >
      {!error ? (
        <img
          src={`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`}
          alt={`${brand.name} logo`}
          loading={floating ? "eager" : "lazy"}
          onError={() => setError(true)}
        />
      ) : (
        <span>{brand.fallback}</span>
      )}
    </div>
  );
}

/* =====================================================
   ANIMATED SVG BACKGROUND
===================================================== */

function AnimatedSVG() {
  return (
    <div className="hm-animated-bg" aria-hidden="true">
      <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient
            id="hmWaveGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#a8dcff" />
            <stop offset="50%" stopColor="#8cdccc" />
            <stop offset="100%" stopColor="#d0c6ff" />
          </linearGradient>
        </defs>

        <path
          className="hm-svg-wave"
          d="M-100 500 C200 100 480 850 840 420 S1250 150 1550 400"
          stroke="url(#hmWaveGradient)"
          strokeWidth="2"
          fill="none"
          opacity=".6"
        />

        <path
          className="hm-svg-wave hm-svg-wave-2"
          d="M-100 550 C280 180 500 850 870 480 S1300 220 1550 450"
          stroke="#a6cfff"
          strokeWidth="1.5"
          fill="none"
          opacity=".4"
        />

        <circle
          cx="1100"
          cy="320"
          r="220"
          stroke="#b5dfff"
          fill="none"
          opacity=".5"
        />

        <circle
          cx="1100"
          cy="320"
          r="300"
          stroke="#bbece4"
          fill="none"
          opacity=".35"
        />

        <circle
          cx="1100"
          cy="320"
          r="380"
          stroke="#d4c8ff"
          fill="none"
          opacity=".2"
        />

        <circle cx="150" cy="120" r="7" fill="#ffd9b8" />
        <circle cx="1300" cy="150" r="10" fill="#c0f0df" />
      </svg>

      <span className="hm-bg-circle hm-circle-one" />
      <span className="hm-bg-circle hm-circle-two" />
      <span className="hm-bg-dots hm-dots-one" />
      <span className="hm-bg-dots hm-dots-two" />
    </div>
  );
}

/* =====================================================
   PLATFORM CARD
===================================================== */

function PlatformCard({ brand }) {
  return (
    <Link to="/our-plans" className="hm-platform-card hm-reveal">
      <BrandLogo brand={brand} />
      <h3>{brand.name}</h3>
      <span className="hm-card-arrow">
        <ArrowUpRight size={15} />
      </span>
    </Link>
  );
}

/* =====================================================
   FEATURE CARD
===================================================== */

function FeatureCard({ icon, title, text }) {
  return (
    <div className="hm-feature-card hm-reveal">
      <div className="hm-feature-icon">
        <FeatureIcon type={icon} size={25} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
/* =====================================================
   HOME PAGE
===================================================== */

export default function Home() {
  const homeRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      /* HERO ANIMATION */

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .fromTo(
          ".hm-hero-badge",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7 },
        )
        .fromTo(
          ".hm-hero-title",
          { opacity: 0, y: 55 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.35",
        )
        .fromTo(
          ".hm-hero-description",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5",
        )
        .fromTo(
          ".hm-hero-buttons",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4",
        )
        .fromTo(
          ".hm-hero-image",
          { opacity: 0, x: 55, scale: 1.05 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.1,
          },
          "-=0.8",
        )
        .fromTo(
          ".hm-floating-logo",
          { opacity: 0, y: 25, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.1,
          },
          "-=0.5",
        );

      /* FLOATING LOGOS */

      gsap.utils.toArray(".hm-floating-logo").forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -10 : 10,
          duration: 2.5 + index * 0.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      /* SCROLL REVEAL */

      gsap.utils.toArray(".hm-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 92%",
              once: true,
            },
          },
        );
      });

      /* IMAGE REVEAL */

      gsap.utils.toArray(".hm-image-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, scale: 1.05 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    }, homeRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="streamai-home" ref={homeRef}>
      {/* HERO SECTION */}

      <section className="hm-hero">
        <AnimatedSVG />

        <div className="hm-container hm-hero-inner">
          <div className="hm-hero-content">
            <span className="hm-hero-badge">
              ✨ OTT + AI All in One Place
            </span>

            <h1 className="hm-hero-title">
              Your Favorite
              <br />
              OTT &amp; AI
              <br />
              Subscriptions
              <br />
              <span>Together.</span>
            </h1>

            <p className="hm-hero-description">
              Watch, Learn, Create and Explore — all in one platform with one
              simple payment. Discover a smarter way to enjoy entertainment
              and AI.
            </p>

            <div className="hm-hero-buttons">
              <Link to="/our-plans" className="hm-primary-btn">
                Explore Plans
                <ArrowIcon />
              </Link>

              <a href="#how-it-works" className="hm-secondary-btn">
                <span className="hm-play-circle">▶</span>
                How It Works
              </a>
            </div>

            {/* HERO BENEFITS */}

            <div className="hm-hero-benefits">
              <div className="hm-hero-benefit">
                <div className="hm-benefit-icon">
                  <FeatureIcon type="grid" />
                </div>
                <strong>Multiple</strong>
                <span>Subscriptions</span>
              </div>

              <div className="hm-hero-benefit">
                <div className="hm-benefit-icon">
                  <FeatureIcon type="wallet" />
                </div>
                <strong>One</strong>
                <span>Payment</span>
              </div>

              <div className="hm-hero-benefit">
                <div className="hm-benefit-icon">
                  <FeatureIcon type="shield" />
                </div>
                <strong>Smart</strong>
                <span>Savings</span>
              </div>

              <div className="hm-hero-benefit">
                <div className="hm-benefit-icon">
                  <FeatureIcon type="settings" />
                </div>
                <strong>Easy</strong>
                <span>Management</span>
              </div>
            </div>
          </div>

          {/* HERO IMAGE */}

          <div className="hm-hero-visual">
            <div className="hm-hero-image">
  <img
    src={PHOTOS.couple}
    alt="People working together on a laptop"
    fetchPriority="high"
    onLoad={() => console.log("Hero image loaded")}
    onError={(event) => {
      console.error("Hero image failed:", event.currentTarget.src);
    }}
  />
</div>

            {/* FLOATING OTT & AI LOGOS */}

            <div className="hm-floating-logo hm-float-netflix">
              <BrandLogo brand={ottPlatforms[0]} floating />
            </div>

            <div className="hm-floating-logo hm-float-prime">
              <BrandLogo brand={ottPlatforms[1]} floating />
            </div>

            <div className="hm-floating-logo hm-float-hotstar">
              <BrandLogo brand={ottPlatforms[2]} floating />
            </div>

            <div className="hm-floating-logo hm-float-zee">
              <BrandLogo brand={ottPlatforms[4]} floating />
            </div>

            <div className="hm-floating-logo hm-float-chatgpt">
              <BrandLogo brand={aiPlatforms[0]} floating />
            </div>

            <div className="hm-floating-logo hm-float-gemini">
              <BrandLogo brand={aiPlatforms[1]} floating />
            </div>

            <div className="hm-floating-logo hm-float-claude">
              <BrandLogo brand={aiPlatforms[2]} floating />
            </div>

            <span className="hm-floating-star hm-star-one">✦</span>
            <span className="hm-floating-star hm-star-two">✧</span>
          </div>
        </div>
      </section>

      {/* PLATFORM STRIP */}

      <section className="hm-platform-strip">
        <div className="hm-container">
          <div className="hm-strip-inner">
            <div className="hm-strip-item">
              <FeatureIcon type="layers" size={22} />
              <span>OTT + AI Together</span>
            </div>

            <div className="hm-strip-divider" />

            <div className="hm-strip-item">
              <FeatureIcon type="wallet" size={22} />
              <span>One Simple Checkout</span>
            </div>

            <div className="hm-strip-divider" />

            <div className="hm-strip-item">
              <FeatureIcon type="sparkle" size={22} />
              <span>Build Your Own Bundle</span>
            </div>
          </div>
        </div>
      </section>
            {/* OTT PLATFORMS */}

      <section className="hm-section hm-ott-section">
        <div className="hm-container">
          <div className="hm-section-heading hm-reveal">
            <div>
              <span className="hm-eyebrow">POPULAR PLATFORMS</span>
              <h2>Popular OTT Platforms</h2>
              <p>
                Watch your favorite movies, shows and live entertainment.
              </p>
            </div>

            <Link to="/our-plans" className="hm-view-all">
              View All
              <ArrowIcon size={17} />
            </Link>
          </div>

          <div className="hm-platform-grid">
            {ottPlatforms.map((brand) => (
              <PlatformCard key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      {/* AI TOOLS */}

      <section className="hm-section hm-ai-section">
        <div className="hm-container">
          <div className="hm-section-heading hm-reveal">
            <div>
              <span className="hm-eyebrow">POWERFUL AI TOOLS</span>
              <h2>Discover Powerful AI Tools</h2>
              <p>
                Work smarter, create faster and explore new possibilities.
              </p>
            </div>

            <Link to="/our-plans" className="hm-view-all">
              View All
              <ArrowIcon size={17} />
            </Link>
          </div>

          <div className="hm-platform-grid">
            {aiPlatforms.map((brand) => (
              <PlatformCard key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      {/* ENTERTAINMENT + PRODUCTIVITY BANNER */}

      <section className="hm-banner-section">
        <div className="hm-container">
          <div className="hm-entertainment-banner hm-reveal">
            <div className="hm-banner-content">
              <span className="hm-banner-label">
                ENTERTAINMENT MEETS PRODUCTIVITY
              </span>

              <h2>
                More Entertainment.
                <br />
                More Productivity.
                <br />
                <span>One Subscription.</span>
              </h2>

              <p>
                Why choose one when you can have both? Build your own OTT + AI
                bundle and enjoy more in one place.
              </p>

              <Link to="/our-plans" className="hm-primary-btn">
                Get Started Now
                <ArrowIcon />
              </Link>
            </div>

            <div className="hm-banner-image hm-image-reveal">
              <img
                src={PHOTOS.entertainment}
                alt="Friends enjoying time together"
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.style.visibility = "hidden";
                }}
              />
            </div>

            {/* SVG DECORATION */}

            <svg
              className="hm-banner-svg"
              viewBox="0 0 400 400"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="200"
                cy="200"
                r="160"
                stroke="#ffffff"
                strokeWidth="2"
                opacity=".5"
              />

              <circle
                cx="200"
                cy="200"
                r="125"
                stroke="#ffffff"
                strokeWidth="2"
                opacity=".3"
              />

              <circle
                cx="200"
                cy="200"
                r="90"
                stroke="#ffffff"
                strokeWidth="2"
                opacity=".3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE BUNDLEUPOTT */}

      <section className="hm-section hm-why-section">
        <div className="hm-container">
          <div className="hm-section-heading hm-reveal">
            <div>
              <span className="hm-eyebrow">WHY BUNDLEUPOTT</span>

              <h2>Why Choose bundleupott?</h2>

              <p>
                Entertainment, intelligence and convenience brought together.
              </p>
            </div>
          </div>

          <div className="hm-features-grid">
            <FeatureCard
              icon="grid"
              title="Multiple Platforms"
              text="Explore your favorite OTT and AI subscriptions in one place."
            />

            <FeatureCard
              icon="sparkle"
              title="Smart Bundles"
              text="Create a personalized subscription combination that fits your needs."
            />

            <FeatureCard
              icon="settings"
              title="Easy Management"
              text="Keep track of your chosen subscriptions with a simpler experience."
            />

            <FeatureCard
              icon="wallet"
              title="One Checkout"
              text="Complete one payment for your selected subscription bundle."
            />
          </div>
        </div>
      </section>
            {/* HOW IT WORKS */}

      <section className="hm-how-section" id="how-it-works">
        <div className="hm-container">
          <div className="hm-how-heading hm-reveal">
            <span className="hm-eyebrow">SIMPLE & FLEXIBLE</span>

            <h2>
              Your Bundle.
              <span> Your Way.</span>
            </h2>

            <p>
              Getting started with your favorite OTT and AI subscriptions is
              simple.
            </p>
          </div>

          <div className="hm-steps-grid">
            <div className="hm-step-card hm-reveal">
              <span className="hm-step-number">01</span>

              <div className="hm-step-icon">
                <FeatureIcon type="grid" size={27} />
              </div>

              <h3>Choose Your Favorites</h3>

              <p>Select your preferred OTT services and AI tools.</p>
            </div>

            <div className="hm-step-card hm-reveal">
              <span className="hm-step-number">02</span>

              <div className="hm-step-icon">
                <FeatureIcon type="layers" size={27} />
              </div>

              <h3>Create Your Bundle</h3>

              <p>Combine subscriptions and see your bundle price.</p>
            </div>

            <div className="hm-step-card hm-reveal">
              <span className="hm-step-number">03</span>

              <div className="hm-step-icon">
                <FeatureIcon type="wallet" size={27} />
              </div>

              <h3>Complete Payment</h3>

              <p>Pay for your chosen bundle through one checkout.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LIFESTYLE SECTION */}

      <section className="hm-lifestyle-section">
        <div className="hm-container">
          <div className="hm-lifestyle-grid">
            <div className="hm-lifestyle-image hm-image-reveal">
              <img
                src={PHOTOS.productivity}
                alt="People collaborating on a laptop"
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.style.visibility = "hidden";
                }}
              />
            </div>

            <div className="hm-lifestyle-content hm-reveal">
              <span className="hm-eyebrow">MADE FOR EVERYDAY LIFE</span>

              <h2>
                Stream More.
                <br />
                Learn More.
                <br />
                <span>Do More.</span>
              </h2>

              <p>
                From movie nights to creative projects, bundleupott brings your
                digital subscriptions together in one simple experience.
              </p>

              <Link to="/about" className="hm-text-button">
                Discover bundleupott
                <ArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="hm-final-section">
        <div className="hm-container">
          <div className="hm-final-banner hm-reveal">
            <div className="hm-final-copy">
              <span>STREAM. LEARN. CREATE.</span>

              <h2>
                Everything You Love.
                <br />
                <em>Better Together.</em>
              </h2>

              <p>
                Ready to bring your favorite OTT platforms and AI tools
                together?
              </p>

              <Link to="/our-plans" className="hm-primary-btn">
                Build Your Plan
                <ArrowIcon />
              </Link>
            </div>

            <div className="hm-final-image">
              <img
                src={PHOTOS.couple}
                alt="Couple enjoying time together"
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.style.visibility = "hidden";
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


