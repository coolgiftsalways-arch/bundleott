import React, { useLayoutEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

import About from "./pages/About";
import OurPlans from "./pages/OurPlans";

import AdminDashboard from "./Admin/AdminDashboard";
import AdminLogin from "./Admin/AdminLogin";
import AdminProtectedRoute from "./Admin/AdminProtectedRoute";
import OrderResult from "./pages/OrderResult";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    window.lenis?.scrollTo?.(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />

      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Our Plans is the public landing page */}
        <Route path="/" element={<Navigate to="/our-plans" replace />} />

        {/* Public pages */}
        <Route path="/our-plans" element={<OurPlans />} />
        <Route path="/about" element={<About />} />

        {/* Admin pages */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/*"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
                <Route path="/order-result" element={<OrderResult />} />

        {/* Unknown URLs return to Our Plans */}
        <Route path="*" element={<Navigate to="/our-plans" replace />} />
      </Routes>

      {!isAdminRoute && (
        <>
          <WhatsAppFloat />
          <Footer />
        </>
      )}
    </>
  );
}