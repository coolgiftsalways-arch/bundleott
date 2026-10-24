import React, { useEffect, useLayoutEffect } from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import { ScrollTrigger } from "gsap/ScrollTrigger";

// ========================================
// WEBSITE COMPONENTS
// ========================================

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ========================================
// WEBSITE PAGES
// ========================================

import Home from "./pages/Home";
import OurPlans from "./pages/OurPlans";
import About from "./pages/About";

// ========================================
// ADMIN DASHBOARD
// ========================================

import AdminDashboard from "./Admin/AdminDashboard";

// ========================================
// SCROLL TO TOP ON PAGE CHANGE
// ========================================

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const previous = window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useLayoutEffect(() => {
    let frame1;
    let frame2;

    const resetScroll = () => {
      // Reset Lenis smooth scrolling
      if (window.lenis?.scrollTo) {
        window.lenis.scrollTo(0, {
          immediate: true,
          force: true,
        });
      }

      // Reset browser scroll position
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });

      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Reset immediately
    resetScroll();

    // Reset again after rendering
    frame1 = requestAnimationFrame(() => {
      resetScroll();

      frame2 = requestAnimationFrame(() => {
        // Refresh Lenis
        window.lenis?.resize();

        // Refresh GSAP
        ScrollTrigger.refresh();

        // Ensure new page starts at top
        resetScroll();
      });
    });

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [pathname]);

  return null;
}

// ========================================
// MAIN APPLICATION
// ========================================

export default function App() {
  const location = useLocation();

  // ======================================
  // DETECT ADMIN ROUTES
  // ======================================

  const isAdminPage =
    location.pathname === "/admin" || location.pathname.startsWith("/admin/");

  return (
    <>
      {/* =====================================
          AUTOMATIC SCROLL RESET
      ===================================== */}

      <ScrollToTop />

      {/* =====================================
          WEBSITE NAVBAR
          HIDDEN ON ADMIN PAGES
      ===================================== */}

      {!isAdminPage && <Navbar />}

      {/* =====================================
          WEBSITE ROUTES
      ===================================== */}

      <Routes>
        {/* HOME */}

        <Route path="/" element={<Home />} />

        {/* =====================================
            OUR PLANS

            Customer selects OTT + AI plans.

            Continue to Checkout opens the
            CustomerDetailsModal inside OurPlans.

            No login or signup required.
        ===================================== */}

        <Route path="/our-plans" element={<OurPlans />} />

        {/* ABOUT US */}

        <Route path="/about" element={<About />} />

        {/* =====================================
            ADMIN DASHBOARD
        ===================================== */}

        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>

      {/* =====================================
          WEBSITE FOOTER
          HIDDEN ON ADMIN PAGES
      ===================================== */}

      {!isAdminPage && <Footer />}
    </>
  );
}
