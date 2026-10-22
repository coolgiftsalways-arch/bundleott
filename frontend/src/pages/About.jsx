import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../Style/About.css";

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   REAL INDIAN PHOTOGRAPHY — PEXELS
============================================ */

const PHOTOS = {
  hero: "https://images.pexels.com/photos/4307859/pexels-photo-4307859.jpeg?auto=compress&cs=tinysrgb&w=1400",

  entertainment:
    "https://images.pexels.com/photos/4307898/pexels-photo-4307898.jpeg?auto=compress&cs=tinysrgb&w=1400",

  banner:
    "https://images.pexels.com/photos/4308093/pexels-photo-4308093.jpeg?auto=compress&cs=tinysrgb&w=1400",
};

/* ============================================
   ICONS
============================================ */

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

function FeatureIcon({ type, size = 27 }) {
  const icons = {
    mission: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
        <path d="m15 9 6-6M17 3h4v4" />
      </>
    ),

    vision: (
      <>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),

    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
      </>
    ),

    tag: (
      <>
        <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" />
        <circle cx="8" cy="8" r="1" />
      </>
    ),

    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        <path d="m5 5 2 2m10 10 2 2M19 5l-2 2M7 17l-2 2" />
      </>
    ),

    shield: (
      <>
        <path d="M12 2 3 6v6c0 5 4 8 9 10 5-2 9-5 9-10V6Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),

    support: (
      <>
        <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
        <rect x="2" y="13" width="5" height="8" rx="2" />
        <rect x="17" y="13" width="5" height="8" rx="2" />
      </>
    ),

    future: (
      <>
        <path d="M4 20V10M9 20V4M14 20v-7M19 20V7" />
        <path d="M2 21h20" />
      </>
    ),

    sparkle: (
      <>
        <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z" />
      </>
    ),

    wallet: (
      <>
        <rect x="2" y="6" width="20" height="14" rx="3" />
        <path d="M2 10h20" />
        <circle cx="17" cy="15" r="1" />
      </>
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
      {icons[type] || icons.sparkle}
    </svg>
  );
}

/* ============================================
   ANIMATED SVG BACKGROUND
============================================ */

function AnimatedBackground() {
  return (
    <div className="sa-about-background" aria-hidden="true">
      <svg viewBox="0 0 1440 750" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="saAboutWave" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#aedfff" />
            <stop offset="50%" stopColor="#9adbdc" />
            <stop offset="100%" stopColor="#c2efd9" />
          </linearGradient>
        </defs>

        <circle
          cx="1150"
          cy="300"
          r="230"
          stroke="#b9ddff"
          strokeWidth="1"
          fill="none"
          opacity=".55"
          className="sa-about-orbit"
        />

        <circle
          cx="1150"
          cy="300"
          r="310"
          stroke="#b6ebe1"
          strokeWidth="1"
          fill="none"
          opacity=".38"
          className="sa-about-orbit-reverse"
        />

        <circle
          cx="1150"
          cy="300"
          r="390"
          stroke="#cde6ff"
          strokeWidth="1"
          fill="none"
          opacity=".25"
        />

        <path
          d="M-100 510 C230 180 480 790 850 420 S1350 180 1550 350"
          stroke="url(#saAboutWave)"
          strokeWidth="2"
          strokeDasharray="14 16"
          fill="none"
          opacity=".55"
          className="sa-about-wave"
        />

        <path
          d="M-100 560 C280 240 510 820 880 480 S1320 260 1550 420"
          stroke="#a9d6ff"
          strokeWidth="1.5"
          strokeDasharray="10 18"
          fill="none"
          opacity=".45"
          className="sa-about-wave-reverse"
        />

        <circle cx="180" cy="110" r="8" fill="#ffdabd" />

        <circle cx="1320" cy="150" r="11" fill="#a8ecda" />

        <circle cx="970" cy="540" r="6" fill="#9bc9ff" />
      </svg>

      <div className="sa-about-glow sa-about-glow-one" />
      <div className="sa-about-glow sa-about-glow-two" />

      <div className="sa-about-dots sa-about-dots-one" />
      <div className="sa-about-dots sa-about-dots-two" />
    </div>
  );
}

/* ============================================
   FEATURE DATA
============================================ */

const features = [
  {
    icon: "grid",
    title: "Multiple Platforms",
    description:
      "Discover OTT entertainment and AI tools together in one convenient place.",
  },

  {
    icon: "tag",
    title: "Cost Effective",
    description:
      "Explore flexible bundles designed to offer better value for your subscriptions.",
  },

  {
    icon: "settings",
    title: "Easy Management",
    description:
      "Choose and manage your favorite subscriptions with a simpler experience.",
  },

  {
    icon: "shield",
    title: "Secure & Reliable",
    description:
      "Payment confirmation and subscription activation are handled through verification.",
  },

  {
    icon: "support",
    title: "Helpful Support",
    description:
      "Clear information and assistance to help you manage your subscription choices.",
  },

  {
    icon: "future",
    title: "Future Ready",
    description:
      "Bringing entertainment and AI together as digital experiences continue to evolve.",
  },
];

/* ============================================
   FEATURE CARD
============================================ */

function FeatureCard({ feature }) {
  return (
    <article className="sa-about-feature-card sa-about-reveal">
      <div className="sa-about-feature-icon">
        <FeatureIcon type={feature.icon} size={29} />
      </div>

      <h3>{feature.title}</h3>

      <p>{feature.description}</p>

      <span className="sa-about-feature-decoration" />
    </article>
  );
}

/* ============================================
   ABOUT PAGE
============================================ */

export default function About() {
  const pageRef = useRef(null);

  /* ========================================
     GSAP ANIMATIONS
  ======================================== */

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // HERO ENTRANCE

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .fromTo(
          ".sa-about-badge",
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
        )

        .fromTo(
          ".sa-about-hero-title",
          {
            opacity: 0,
            y: 55,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          "-=0.4",
        )

        .fromTo(
          ".sa-about-hero-subtitle",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.5",
        )

        .fromTo(
          ".sa-about-hero-description",
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.5",
        )

        .fromTo(
          ".sa-about-hero-actions",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.4",
        )

        .fromTo(
          ".sa-about-hero-photo",
          {
            opacity: 0,
            x: 55,
            scale: 1.04,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.15,
          },
          "-=1",
        );

      // FLOATING ELEMENTS

      gsap.utils.toArray(".sa-about-floating").forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -10 : 10,
          duration: 2.8 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // SCROLL REVEALS

      gsap.utils.toArray(".sa-about-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 45,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "transform,opacity",

            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              once: true,
            },
          },
        );
      });

      // IMAGE REVEALS

      gsap.utils.toArray(".sa-about-image-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            scale: 1.05,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            clearProps: "transform,opacity",

            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="sa-about-page" ref={pageRef}>
      {/* =====================================
          HERO SECTION
      ===================================== */}

      <section className="sa-about-hero">
        <AnimatedBackground />

        <div className="sa-about-container sa-about-hero-grid">
          {/* HERO LEFT */}

          <div className="sa-about-hero-content">
            <span className="sa-about-badge">✦ OUR STORY</span>

            <h1 className="sa-about-hero-title">
              About
              <span> bundleupott.</span>
            </h1>

            <h2 className="sa-about-hero-subtitle">
              Entertainment and
              <br />
              Intelligence for a
              <br />
              <span>Better Tomorrow.</span>
            </h2>

            <p className="sa-about-hero-description">
              We're on a mission to make premium entertainment and AI
              subscriptions simpler, more flexible, and more accessible.
            </p>

            <p className="sa-about-hero-description sa-about-second-paragraph">
              bundleupott brings your favorite OTT platforms and powerful AI
              tools together — helping you discover, choose, and combine the
              digital experiences that matter to you.
            </p>

            <div className="sa-about-hero-actions">
              <Link to="/our-plans" className="sa-about-primary-btn">
                Explore Our Plans
                <ArrowIcon />
              </Link>

              <a href="#sa-about-mission" className="sa-about-text-link">
                Discover Our Mission
                <ArrowIcon size={16} />
              </a>
            </div>
          </div>

          {/* HERO RIGHT */}

          <div className="sa-about-hero-visual">
            <div className="sa-about-photo-shape" />

            <div className="sa-about-hero-photo">
              <img
                src={PHOTOS.hero}
                alt="Real Indian couple smiling while using a laptop together at home"
                fetchPriority="high"
              />
            </div>

            {/* FLOATING CARDS */}

            <div className="sa-about-floating sa-about-float-ott">
              <span className="sa-about-floating-icon">
                <FeatureIcon type="grid" size={23} />
              </span>

              <div>
                <strong>OTT Platforms</strong>
                <small>Entertainment together</small>
              </div>
            </div>

            <div className="sa-about-floating sa-about-float-ai">
              <span className="sa-about-floating-icon sa-about-ai-icon">
                <FeatureIcon type="sparkle" size={23} />
              </span>

              <div>
                <strong>AI Tools</strong>
                <small>Create more possibilities</small>
              </div>
            </div>

            <span className="sa-about-floating sa-about-star-one">✦</span>

            <span className="sa-about-floating sa-about-star-two">✧</span>
          </div>
        </div>
      </section>

      {/* =====================================
          MISSION + VISION
      ===================================== */}

      <section id="sa-about-mission" className="sa-about-mission-section">
        <div className="sa-about-container">
          <div className="sa-about-mission-grid">
            {/* MISSION */}

            <article className="sa-about-mission-card sa-about-reveal">
              <div className="sa-about-mission-icon">
                <FeatureIcon type="mission" size={31} />
              </div>

              <div className="sa-about-mission-copy">
                <span>WHAT DRIVES US</span>

                <h2>Our Mission</h2>

                <p>
                  To make digital entertainment and AI tools easier to discover,
                  combine, and manage — bringing more convenience and value to
                  everyday life.
                </p>
              </div>

              <div className="sa-about-mission-orbit" />
            </article>

            {/* VISION */}

            <article className="sa-about-vision-card sa-about-reveal">
              <div className="sa-about-vision-icon">
                <FeatureIcon type="vision" size={31} />
              </div>

              <div className="sa-about-mission-copy">
                <span>WHERE WE'RE GOING</span>

                <h2>Our Vision</h2>

                <p>
                  A future where entertainment, technology, and creativity work
                  together to create a more connected, productive, and enjoyable
                  digital life.
                </p>
              </div>

              <div className="sa-about-vision-orbit" />
            </article>
          </div>
        </div>
      </section>

      {/* =====================================
          WHY CHOOSE BUNDLEUPOTT
      ===================================== */}

      <section className="sa-about-why-section">
        <div className="sa-about-container">
          <div className="sa-about-section-heading sa-about-reveal">
            <span className="sa-about-eyebrow">WHY BUNDLEUPOTT</span>

            <h2>
              Why Choose
              <span> bundleupott?</span>
            </h2>

            <p>
              More than just subscriptions. We're bringing entertainment,
              productivity, and convenience together.
            </p>
          </div>

          <div className="sa-about-features-grid">
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================
          OUR APPROACH
      ===================================== */}

      <section className="sa-about-approach-section">
        <div className="sa-about-container">
          <div className="sa-about-approach-grid">
            {/* PHOTO */}

            <div className="sa-about-approach-image sa-about-image-reveal">
              <img
                src={PHOTOS.entertainment}
                alt="Real Indian couple enjoying television together at home"
                loading="lazy"
              />

              <div className="sa-about-image-label">
                <span>✦</span>
                Entertainment meets innovation
              </div>
            </div>

            {/* CONTENT */}

            <div className="sa-about-approach-content sa-about-reveal">
              <span className="sa-about-eyebrow">
                A SIMPLER DIGITAL EXPERIENCE
              </span>

              <h2>
                Everything You Love.
                <br />
                <span>All Together.</span>
              </h2>

              <p>
                Your entertainment preferences and productivity needs shouldn't
                have to live in separate worlds.
              </p>

              <p>
                With bundleupott, you can explore OTT subscriptions and AI tools
                in one place, create your preferred combination, and enjoy a
                simpler subscription journey.
              </p>

              <div className="sa-about-approach-points">
                <div>
                  <FeatureIcon type="grid" size={21} />
                  <span>Choose your favorite platforms</span>
                </div>

                <div>
                  <FeatureIcon type="sparkle" size={21} />
                  <span>Combine entertainment and AI</span>
                </div>

                <div>
                  <FeatureIcon type="wallet" size={21} />
                  <span>One convenient checkout</span>
                </div>
              </div>

              <Link to="/our-plans" className="sa-about-text-link">
                Explore Subscriptions
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          FINAL PROMOTIONAL BANNER
      ===================================== */}

      <section className="sa-about-final-section">
        <div className="sa-about-container">
          <div className="sa-about-final-banner sa-about-reveal">
            <div className="sa-about-final-content">
              <span className="sa-about-final-label">
                STREAM. LEARN. CREATE.
              </span>

              <h2>
                More Than Just
                <br />
                <span>Subscriptions.</span>
              </h2>

              <p>
                Your gateway to entertainment, creativity, and a smarter you.
              </p>

              <Link to="/our-plans" className="sa-about-primary-btn">
                Get Started Now
                <ArrowIcon />
              </Link>
            </div>

            <div className="sa-about-final-image">
              <img
                src={PHOTOS.banner}
                alt="Real Indian couple happily working together on a laptop"
                loading="lazy"
              />
            </div>

            {/* DECORATIVE SVG */}

            <svg
              className="sa-about-final-svg"
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
                opacity=".4"
              />

              <circle
                cx="200"
                cy="200"
                r="120"
                stroke="#ffffff"
                strokeWidth="2"
                opacity=".3"
              />

              <circle
                cx="200"
                cy="200"
                r="80"
                stroke="#ffffff"
                strokeWidth="2"
                opacity=".2"
              />
            </svg>
          </div>
        </div>
      </section>
    </main>
  );
}
