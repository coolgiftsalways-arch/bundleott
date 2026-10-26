import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export default function AdminProtectedRoute({ children }) {
  const location = useLocation();

  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const token = sessionStorage.getItem("bundleupott_admin_token");

    if (!token) {
      setStatus("unauthenticated");
      return;
    }

    const controller = new AbortController();

    async function validateSession() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/payment/admin/summary`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          sessionStorage.removeItem("bundleupott_admin_token");
          setStatus("unauthenticated");
          return;
        }

        setStatus("authenticated");
      } catch (error) {
        if (error.name !== "AbortError") {
          // Fail closed: don't render protected content when the
          // backend cannot validate the administrator's session.
          setStatus("unavailable");
        }
      }
    }

    validateSession();

    return () => controller.abort();
  }, []);

  if (status === "checking") {
    return (
      <div className="bu-admin-auth-loading" role="status">
        <span className="bu-admin-auth-spinner" />
        <p>Verifying administrator access...</p>
      </div>
    );
  }

  if (status === "unavailable") {
    return (
      <div className="bu-admin-auth-loading" role="alert">
        <h2>Authentication server unavailable</h2>
        <p>
          The dashboard is locked because your session could not be verified.
          Check that your backend is running, then refresh this page.
        </p>
      </div>
    );
  }

  if (status !== "authenticated") {
    return (
      <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
    );
  }

  return children;
}
