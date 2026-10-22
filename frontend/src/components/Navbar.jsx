import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import gsap from "gsap";
import "../Style/Navbar.css";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Our Plans", path: "/our-plans" },
  { name: "About", path: "/about" },
];

export default function Navbar() {
  const navbarRef = useRef(null);
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sa-navbar-inner",
        { y: -35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          clearProps: "all",
        },
      );
      gsap.fromTo(
        ".sa-nav-animate",
        { opacity: 0, y: -12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          delay: 0.2,
          ease: "power3.out",
          clearProps: "all",
        },
      );
    }, navbarRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header ref={navbarRef} className="sa-navbar">
      <div className="sa-navbar-inner">
        <NavLink
          to="/"
          className="sa-brand sa-nav-animate"
          aria-label="bundleupott Home"
        >
          <div className="sa-brand-icon">
            <svg
              width="34"
              height="34"
              viewBox="0 0 40 40"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="bundleupott-navbar-gradient"
                  x1="0"
                  y1="0"
                  x2="40"
                  y2="40"
                >
                  <stop offset="0%" stopColor="#5546FF" />
                  <stop offset="55%" stopColor="#9A36F5" />
                  <stop offset="100%" stopColor="#DA4BF8" />
                </linearGradient>
              </defs>
              <path
                d="M9 5L34 20L9 35V5Z"
                stroke="url(#bundleupott-navbar-gradient)"
                strokeWidth="5"
                strokeLinejoin="round"
              />
              <path
                d="M14 13L25 20L14 27V13Z"
                fill="url(#bundleupott-navbar-gradient)"
              />
            </svg>
          </div>
          <span className="sa-brand-text">
            bundle<span>upott</span>
          </span>
        </NavLink>

        <nav className="sa-nav-links" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `sa-nav-link sa-nav-animate ${isActive ? "sa-nav-active" : ""}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* No login; customers give contact details only before checkout. */}
        <div className="sa-nav-actions">
          <NavLink to="/our-plans" className="sa-getstarted-btn sa-nav-animate">
            Get Started
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </NavLink>
        </div>

        <button
          type="button"
          className={`sa-menu-toggle ${menuOpen ? "sa-menu-open" : ""}`}
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="bundleupott-mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="bundleupott-mobile-menu"
        className={`sa-mobile-menu ${menuOpen ? "sa-mobile-visible" : ""}`}
      >
        <nav className="sa-mobile-links" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `sa-mobile-link ${isActive ? "sa-mobile-active" : ""}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="sa-mobile-actions">
          <NavLink
            to="/our-plans"
            className="sa-mobile-start"
            onClick={() => setMenuOpen(false)}
          >
            Get Started →
          </NavLink>
        </div>
      </div>
    </header>
  );
}
