import React, { useEffect, useLayoutEffect } from "react";

import { Routes, Route, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ========================================
// WEBSITE COMPONENTS
// ========================================

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import WhatsAppFloat from "./components/WhatsAppFloat";

// ========================================
// WEBSITE PAGES
// ========================================

import Home from "./pages/Home";
import OurPlans from "./pages/OurPlans";
import About from "./pages/About";

// ========================================
// ADMIN COMPONENTS
// ========================================

import AdminDashboard from "./Admin/AdminDashboard";
import AdminLogin from "./Admin/AdminLogin";
import AdminProtectedRoute from "./Admin/AdminProtectedRoute";


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

    resetScroll();

    frame1 = requestAnimationFrame(() => {
      resetScroll();

      frame2 = requestAnimationFrame(() => {
        window.lenis?.resize();
        ScrollTrigger.refresh();
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

  // Hide the public website navbar and footer on admin routes.
  const isAdminPage =
    location.pathname === "/admin" ||
    location.pathname.startsWith("/admin/");

  return (
    <>
      <ScrollToTop />

      {/* WEBSITE NAVBAR */}
      {!isAdminPage && <Navbar />}

      {/* APPLICATION ROUTES */}
      <Routes>
        {/* PUBLIC WEBSITE */}
        <Route path="/" element={<Home />} />

        <Route path="/our-plans" element={<OurPlans />} />

        <Route path="/about" element={<About />} />

        {/* ADMIN LOGIN */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* PROTECTED ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        {/* Keep all other admin URLs protected too */}
        <Route
          path="/admin/*"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        {/* UNKNOWN ROUTES */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>

            {/* FLOATING WHATSAPP BUTTON */}
      {!isAdminPage && <WhatsAppFloat />}

      {/* WEBSITE FOOTER */}
      {!isAdminPage && <Footer />}
    </>
  );
}
