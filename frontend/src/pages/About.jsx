import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../Style/About.css";

gsap.registerPlugin(ScrollTrigger);

// Three genuine Pexels stock photographs (not AI-generated or mockup crops).
// Distinct from the photographs used on the Home page.
// Images load directly from Pexels CDN; no local image files are needed.

const PHOTOS = {
  hero: "/about-1.jpg",
  family: "/about-2.jpg",
  creator: "/about-1.jpg",
};


function Icon({ name, size = 24 }) {
  const artwork = {
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
        <path d="m15 9 6-6m-4 0h4v4" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.8" />
        <rect x="14" y="3" width="7" height="7" rx="1.8" />
        <rect x="3" y="14" width="7" height="7" rx="1.8" />
        <rect x="14" y="14" width="7" height="7" rx="1.8" />
      </>
    ),
    tag: (
      <>
        <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" />
        <circle cx="8" cy="8" r="1" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
    shield: (
      <>
        <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6Z" />
        <path d="m8.5 12 2.5 2.5 4.5-5" />
      </>
    ),
    headphones: (
      <>
        <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
        <rect x="2" y="13" width="5" height="8" rx="2" />
        <rect x="17" y="13" width="5" height="8" rx="2" />
      </>
    ),
    chart: (
      <>
        <path d="M4 20V11m5 9V4m5 16v-7m5 7V7M2 21h20" />
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
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
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
      {artwork[name] || artwork.sparkle}
    </svg>
  );
}

const FEATURES = [
  {
    icon: "grid",
    title: "Multiple Platforms",
    text: "Discover OTT entertainment and AI tools together in one convenient place.",
  },
  {
    icon: "tag",
    title: "Cost Effective",
    text: "Explore flexible bundles designed to offer better value for your subscriptions.",
  },
  {
    icon: "sun",
    title: "Easy Management",
    text: "Choose and manage your favorite subscriptions with a simpler experience.",
  },
  {
    icon: "shield",
    title: "Secure & Reliable",
    text: "Payments and subscription activation require independent verification.",
  },
  {
    icon: "headphones",
    title: "Helpful Support",
    text: "Clear information and assistance to help you manage your subscription choices.",
  },
  {
    icon: "chart",
    title: "Future Ready",
    text: "Bringing entertainment and AI together as digital experiences evolve.",
  },
];

function BackgroundArt() {
  return (
    <div className="ba-background" aria-hidden="true">
      <svg viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="ba-curve-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a7d2ff" />
            <stop offset="100%" stopColor="#8fe6dd" />
          </linearGradient>
        </defs>
        <circle
          cx="1155"
          cy="275"
          r="210"
          stroke="#a5dfff"
          fill="none"
          opacity=".28"
        />
        <circle
          cx="1155"
          cy="275"
          r="300"
          stroke="#84dedb"
          fill="none"
          opacity=".22"
        />
        <circle
          cx="1155"
          cy="275"
          r="388"
          stroke="#a5dfff"
          fill="none"
          opacity=".12"
        />
        <path
          d="M-60 430 C240 260 500 510 760 380 S1240 180 1510 360"
          fill="none"
          stroke="url(#ba-curve-gradient)"
          strokeWidth="1.6"
          strokeDasharray="9 12"
          opacity=".44"
          className="ba-animated-curve"
        />
        <circle cx="250" cy="60" r="7" fill="#ffdbc8" opacity=".6" />
        <circle cx="1290" cy="94" r="11" fill="#99ecda" opacity=".8" />
      </svg>
      <span className="ba-back-dots ba-dots-a" />
      <span className="ba-back-dots ba-dots-b" />
    </div>
  );
}

function FeatureCard({ feature }) {
  return (
    <article className="ba-feature-card ba-reveal">
      <span className="ba-feature-icon">
        <Icon name={feature.icon} size={23} />
      </span>
      <h3>{feature.title}</h3>
      <p>{feature.text}</p>
    </article>
  );
}

export default function About() {
  const aboutRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        ".ba-intro",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        ".ba-hero-visual",
        { autoAlpha: 0, x: 35, scale: 0.97 },
        { autoAlpha: 1, x: 0, scale: 1, duration: 1.05, ease: "power3.out" },
      );
      gsap.utils.toArray(".ba-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.82,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 94%", once: true },
          },
        );
      });
    }, aboutRef);

    return () => context.revert();
  }, []);

  return (
    <main className="sa-about-page ba-page" ref={aboutRef}>
      {/* HERO — matches the approved image mockup */}
      <section className="ba-hero">
        <BackgroundArt />
        <div className="ba-container ba-hero-grid">
          <div className="ba-hero-copy">
            <span className="ba-badge ba-intro">✦ OUR STORY</span>
            <h1 className="ba-title ba-intro">
              About <span>bundleupott.</span>
            </h1>
            <h2 className="ba-hero-subtitle ba-intro">
              Entertainment and
              <br />
              Intelligence for a<br />
              <span>Better Tomorrow.</span>
            </h2>
            <p className="ba-hero-text ba-intro">
              We’re on a mission to make premium entertainment and AI
              subscriptions simpler, more flexible, and more accessible.
            </p>
            <p className="ba-hero-text ba-intro">
              bundleupott brings your favorite OTT platforms and powerful AI
              tools together — helping you discover, choose, and combine the
              digital experiences that matter to you.
            </p>
            <div className="ba-hero-actions ba-intro">
              <Link className="ba-button" to="/our-plans">
                Explore Our Plans <Icon name="arrow" size={17} />
              </Link>
              <a className="ba-text-link" href="#ba-mission">
                Discover Our Mission <Icon name="arrow" size={16} />
              </a>
            </div>
          </div>
          <div className="ba-hero-visual">
            <img
              className="ba-hero-picture"
              src={PHOTOS.hero}
              alt="Three coworkers smiling and collaborating around a laptop"
              fetchPriority="high"
            />
            <div
              className="ba-floating-label ba-floating-label-ott"
              aria-hidden="true"
            >
              <span className="ba-floating-symbol">▦</span>
              <span>
                <strong>OTT Platforms</strong>
                <small>Entertainment together</small>
              </span>
            </div>
            <div
              className="ba-floating-label ba-floating-label-ai"
              aria-hidden="true"
            >
              <span className="ba-floating-symbol ba-floating-symbol-ai">
                ✧
              </span>
              <span>
                <strong>AI Tools</strong>
                <small>Create more possibilities</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section id="ba-mission" className="ba-mission-section">
        <div className="ba-container ba-mission-grid">
          <article className="ba-mission-card ba-reveal">
            <span className="ba-value-icon ba-mission-icon">
              <Icon name="target" size={29} />
            </span>
            <div>
              <span className="ba-tiny-label">WHAT DRIVES US</span>
              <h2>Our Mission</h2>
              <p>
                To make digital entertainment and AI tools easier to discover,
                combine, and manage — bringing more convenience and value to
                everyday life.
              </p>
            </div>
          </article>
          <article className="ba-vision-card ba-reveal">
            <span className="ba-value-icon ba-vision-icon">
              <Icon name="eye" size={29} />
            </span>
            <div>
              <span className="ba-tiny-label">WHERE WE’RE GOING</span>
              <h2>Our Vision</h2>
              <p>
                A future where entertainment, technology, and creativity work
                together to create a more connected, productive, and enjoyable
                digital life.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* WHY CHOOSE — SIX CARDS */}
      <section className="ba-why-section">
        <div className="ba-container">
          <div className="ba-section-heading ba-reveal">
            <span className="ba-eyebrow">WHY BUNDLEUPOTT</span>
            <h2>
              Why Choose <span>bundleupott?</span>
            </h2>
            <p>
              More than just subscriptions. We’re bringing entertainment,
              productivity, and convenience together.
            </p>
          </div>
          <div className="ba-feature-grid">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE / COPY SPLIT */}
      <section className="ba-experience-section">
        <div className="ba-container ba-experience-grid">
          <div className="ba-family-image ba-reveal">
            <img
              src={PHOTOS.family}
              alt="Mother and two children enjoying television together at home"
              loading="lazy"
            />
          </div>
          <div className="ba-experience-copy ba-reveal">
            <span className="ba-eyebrow">A SIMPLER DIGITAL EXPERIENCE</span>
            <h2>
              Everything You Love.
              <br />
              <span>All Together.</span>
            </h2>
            <p>
              Your entertainment preferences and productivity needs shouldn’t
              have to live in separate worlds.
            </p>
            <p>
              With bundleupott, you can explore OTT subscriptions and AI tools
              in one place, create your preferred combination, and enjoy a
              simpler subscription journey.
            </p>
            <div className="ba-points">
              <div>
                <Icon name="grid" size={19} />
                Choose your favorite platforms
              </div>
              <div>
                <Icon name="sparkle" size={19} />
                Combine entertainment and AI
              </div>
              <div>
                <Icon name="wallet" size={19} />
                One convenient checkout
              </div>
            </div>
            <Link to="/our-plans" className="ba-text-link">
              Explore Subscriptions <Icon name="arrow" size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* CATALOG SNAPSHOT — accurate DEMO catalog counts, not invented customer metrics */}
      <section
        className="ba-stats-section"
        aria-label="Our demo subscription catalog"
      >
        <div className="ba-container ba-stat-box ba-reveal">
          <div>
            <strong>18</strong>
            <span>OTT Listings</span>
          </div>
          <div>
            <strong>12</strong>
            <span>AI Tool Listings</span>
          </div>
          <div>
            <strong>1</strong>
            <span>Custom Bundle</span>
          </div>
          <div>
            <strong>0</strong>
            <span>Login Required</span>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="ba-final-section">
        <div className="ba-container">
          <div className="ba-final-card ba-reveal">
            <div className="ba-final-copy">
              <span className="ba-eyebrow">STREAM. LEARN. CREATE.</span>
              <h2>
                More Than Just
                <br />
                <span>Subscriptions.</span>
              </h2>
              <p>
                Your gateway to entertainment, creativity, and a smarter you.
              </p>
              <Link to="/our-plans" className="ba-button">
                Get Started Now <Icon name="arrow" size={17} />
              </Link>
            </div>
            <div className="ba-final-visual">
              <img
                src={PHOTOS.creator}
                alt="Smiling man working on a laptop while wearing headphones"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
