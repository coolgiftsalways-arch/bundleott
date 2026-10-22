import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../Style/Footer.css";

gsap.registerPlugin(ScrollTrigger);

/* ==========================================
   ARROW ICON
========================================== */

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

/* ==========================================
   ARROW UP RIGHT
========================================== */

function ArrowUpRight({ size = 17 }) {
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
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/* ==========================================
   BUNDLEUPOTT LOGO
========================================== */

function BundleupottLogo() {
  return (
    <Link to="/" className="sf-logo" aria-label="bundleupott Home">
      <span className="sf-logo-icon">
        <svg width="37" height="37" viewBox="0 0 40 40" fill="none">
          <defs>
            <linearGradient id="sfLogoGradient" x1="0" y1="0" x2="40" y2="40">
              <stop offset="0%" stopColor="#408FFF" />

              <stop offset="55%" stopColor="#33ACDA" />

              <stop offset="100%" stopColor="#27C5B1" />
            </linearGradient>
          </defs>

          <path
            d="M9 5L34 20L9 35V5Z"
            stroke="url(#sfLogoGradient)"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          <path d="M14 13L25 20L14 27V13Z" fill="url(#sfLogoGradient)" />
        </svg>
      </span>

      <span className="sf-logo-text">
        bundle<span>upott</span>
      </span>
    </Link>
  );
}

/* ==========================================
   DECORATIVE SVG BACKGROUND
========================================== */

function FooterBackground() {
  return (
    <div className="sf-background" aria-hidden="true">
      <svg viewBox="0 0 1400 550" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient
            id="sfWaveGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#a7d9ff" />

            <stop offset="50%" stopColor="#9ce9df" />

            <stop offset="100%" stopColor="#c4dfff" />
          </linearGradient>
        </defs>

        {/* CIRCLES */}

        <circle
          cx="1150"
          cy="250"
          r="190"
          stroke="#a9dfff"
          strokeWidth="1"
          fill="none"
          opacity=".45"
          className="sf-svg-circle"
        />

        <circle
          cx="1150"
          cy="250"
          r="260"
          stroke="#99e4da"
          strokeWidth="1"
          fill="none"
          opacity=".35"
          className="sf-svg-circle-reverse"
        />

        <circle
          cx="1150"
          cy="250"
          r="340"
          stroke="#c5dfff"
          strokeWidth="1"
          fill="none"
          opacity=".25"
        />

        {/* WAVE */}

        <path
          d="M-100 400 C250 100 500 650 850 350 S1250 150 1550 350"
          fill="none"
          stroke="url(#sfWaveGradient)"
          strokeWidth="2"
          strokeDasharray="14 16"
          opacity=".55"
          className="sf-svg-wave"
        />

        <path
          d="M-100 450 C300 180 550 680 880 400 S1300 200 1550 420"
          fill="none"
          stroke="#9acfff"
          strokeWidth="1.5"
          strokeDasharray="12 18"
          opacity=".35"
          className="sf-svg-wave-reverse"
        />

        {/* DOTS */}

        <circle cx="180" cy="100" r="7" fill="#b3dcff" />

        <circle cx="1250" cy="100" r="9" fill="#a8eee0" />

        <circle cx="750" cy="450" r="6" fill="#ffd9c4" />
      </svg>

      <span className="sf-bg-glow sf-glow-one" />
      <span className="sf-bg-glow sf-glow-two" />

      <span className="sf-bg-dots sf-dots-one" />
      <span className="sf-bg-dots sf-dots-two" />
    </div>
  );
}

/* ==========================================
   FOOTER LINKS
========================================== */

const footerNavigation = [
  {
    title: "Navigation",
    links: [
      {
        name: "Home",
        path: "/",
      },
      {
        name: "Our Plans",
        path: "/our-plans",
      },
      {
        name: "About Us",
        path: "/about",
      },
    ],
  },

  {
    title: "Explore",
    links: [
      {
        name: "OTT Subscriptions",
        path: "/our-plans",
      },
      {
        name: "AI Subscriptions",
        path: "/our-plans",
      },
      {
        name: "Combo Plans",
        path: "/our-plans",
      },
      {
        name: "Build Your Bundle",
        path: "/our-plans",
      },
    ],
  },
];

/* ==========================================
   FOOTER COMPONENT
========================================== */

export default function Footer() {
  const footerRef = useRef(null);

  const currentYear = new Date().getFullYear();

  /* ========================================
     GSAP ANIMATIONS
  ======================================== */

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      /* CTA ANIMATION */

      gsap.fromTo(
        ".sf-cta-content",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",

          scrollTrigger: {
            trigger: ".sf-cta-section",
            start: "top 88%",
            once: true,
          },
        },
      );

      /* CTA VISUAL */

      gsap.fromTo(
        ".sf-cta-visual",
        {
          opacity: 0,
          scale: 0.85,
          rotate: -12,
        },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.1,
          ease: "power3.out",

          scrollTrigger: {
            trigger: ".sf-cta-section",
            start: "top 88%",
            once: true,
          },
        },
      );

      /* FOOTER COLUMNS */

      gsap.fromTo(
        ".sf-footer-column",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",

          scrollTrigger: {
            trigger: ".sf-footer-main",
            start: "top 90%",
            once: true,
          },
        },
      );

      /* FLOATING DECORATION */

      gsap.to(".sf-orbit-float", {
        y: -12,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  /* ========================================
     BACK TO TOP
  ======================================== */

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="streamai-footer" ref={footerRef}>
      {/* =====================================
          PREMIUM CTA SECTION
      ===================================== */}

      <div className="sf-cta-wrapper">
        <div className="sf-container">
          <section className="sf-cta-section">
            <FooterBackground />

            {/* LEFT CONTENT */}

            <div className="sf-cta-content">
              <span className="sf-cta-badge">
                ✦ ALL YOUR FAVORITES, ONE PLACE
              </span>

              <h2>
                Ready for
                <br />
                <span>Something More?</span>
              </h2>

              <p>
                Your favorite entertainment and powerful AI tools, brought
                together in one simple experience.
              </p>

              <div className="sf-cta-actions">
                <Link to="/our-plans" className="sf-primary-btn">
                  Explore Our Plans
                  <ArrowIcon />
                </Link>

                <Link to="/about" className="sf-secondary-btn">
                  Learn About Us
                  <ArrowUpRight />
                </Link>
              </div>
            </div>

            {/* RIGHT VISUAL */}

            <div className="sf-cta-visual" aria-hidden="true">
              <div className="sf-orbit sf-orbit-one" />
              <div className="sf-orbit sf-orbit-two" />
              <div className="sf-orbit sf-orbit-three" />

              <div className="sf-center-circle">
                <svg width="85" height="85" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M9 5L34 20L9 35V5Z"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />

                  <path d="M14 13L25 20L14 27V13Z" fill="#ffffff" />
                </svg>
              </div>

              <span className="sf-orbit-float sf-float-one">✦</span>

              <span className="sf-orbit-float sf-float-two">✳</span>

              <span className="sf-orbit-float sf-float-three">✧</span>
            </div>
          </section>
        </div>
      </div>

      {/* =====================================
          MAIN FOOTER
      ===================================== */}

      <div className="sf-footer-main">
        <div className="sf-container">
          <div className="sf-footer-grid">
            {/* BRAND COLUMN */}

            <div className="sf-footer-column sf-brand-column">
              <BundleupottLogo />

              <p className="sf-brand-description">
                bundleupott brings entertainment and intelligence together.
                Explore your favorite OTT platforms, discover powerful AI tools,
                and create a bundle that works for you.
              </p>

              <div className="sf-brand-tagline">
                <span className="sf-tagline-dot" />
                Watch. Learn. Create. Do More.
              </div>
            </div>

            {/* NAVIGATION COLUMNS */}

            {footerNavigation.map((column) => (
              <div className="sf-footer-column" key={column.title}>
                <h3>{column.title}</h3>

                <nav
                  className="sf-footer-links"
                  aria-label={`${column.title} footer links`}
                >
                  {column.links.map((link) => (
                    <Link to={link.path} key={link.name}>
                      {link.name}

                      <ArrowUpRight size={14} />
                    </Link>
                  ))}
                </nav>
              </div>
            ))}

            {/* SUBSCRIPTION COLUMN */}

            <div className="sf-footer-column sf-discover-column">
              <h3>Why bundleupott?</h3>

              <div className="sf-discover-list">
                <div>
                  <span>✦</span>
                  Multiple Subscriptions
                </div>

                <div>
                  <span>✦</span>
                  OTT + AI Together
                </div>

                <div>
                  <span>✦</span>
                  Flexible Bundles
                </div>

                <div>
                  <span>✦</span>
                  One Simple Checkout
                </div>
              </div>

              <Link to="/our-plans" className="sf-discover-button">
                Build Your Bundle
                <ArrowIcon size={16} />
              </Link>
            </div>
          </div>

          {/* =====================================
              FOOTER DIVIDER
          ===================================== */}

          <div className="sf-footer-divider" />

          {/* =====================================
              BOTTOM FOOTER
          ===================================== */}

          <div className="sf-footer-bottom">
            <div className="sf-copyright">
              © {currentYear} bundleupott. All rights reserved.
            </div>

            <div className="sf-footer-bottom-center">
              <span className="sf-status-dot" />
              Entertainment Meets Intelligence
            </div>

            <button type="button" className="sf-back-top" onClick={scrollToTop}>
              Back to Top
              <span>↑</span>
            </button>
          </div>

          <div className="sf-footer-disclaimer">
            Subscription availability, pricing and activation depend on
            applicable provider terms and confirmation.
          </div>
        </div>
      </div>
    </footer>
  );
}
