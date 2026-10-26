import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

import "../Admincss/AdminLogin.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export default function AdminLogin() {
  const navigate = useNavigate();

  const existingToken = sessionStorage.getItem("bundleupott_admin_token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Do not display the login form if this tab already has a valid session.
  // The protected route will validate the token with the backend.
  if (existingToken) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Enter your admin email and password.");
      return;
    }

    if (password.length > 1024) {
      setError("The password is too long.");
      return;
    }

    setLoading(true);

    try {
      const controller = new AbortController();

      const timeoutId = window.setTimeout(() => {
        controller.abort();
      }, 15000);

      let response;

      try {
        response = await fetch(`${API_BASE_URL}/api/payment/admin/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: normalizedEmail,
            password,
          }),
          signal: controller.signal,
        });
      } finally {
        window.clearTimeout(timeoutId);
      }

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success || !result.token) {
        if (response.status === 429) {
          throw new Error(
            "Too many login attempts. Please wait before trying again.",
          );
        }

        throw new Error(
          result.message || "Unable to authenticate administrator.",
        );
      }

      // Keep the token only for the lifetime of this browser tab.
      sessionStorage.setItem("bundleupott_admin_token", result.token);

      // Validate the newly issued token before opening the dashboard.
      const verifyResponse = await fetch(
        `${API_BASE_URL}/api/payment/admin/summary`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${result.token}`,
          },
        },
      );

      if (!verifyResponse.ok) {
        sessionStorage.removeItem("bundleupott_admin_token");
        throw new Error("Login could not be verified. Please try again.");
      }

      navigate("/admin", { replace: true });
    } catch (err) {
      if (err.name === "AbortError") {
        setError("The server took too long to respond. Try again.");
      } else if (err instanceof TypeError && !err.message) {
        setError("Unable to connect to the authentication server.");
      } else {
        setError(
          err.message ||
            "Unable to connect to the server. Check your connection.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bu-login-page">
      <div className="bu-login-background bu-login-background-one" />
      <div className="bu-login-background bu-login-background-two" />

      <section className="bu-login-layout">
        <aside className="bu-login-intro">
          <a
            className="bu-login-brand"
            href="/"
            aria-label="bundleupott homepage"
          >
            <span className="bu-login-brand-icon">
              <svg
                width="36"
                height="36"
                viewBox="0 0 40 40"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 5L34 20L9 35V5Z"
                  stroke="url(#buLoginGradient)"
                  strokeWidth="5"
                  strokeLinejoin="round"
                />
                <path d="M14 13L25 20L14 27V13Z" fill="url(#buLoginGradient)" />
                <defs>
                  <linearGradient
                    id="buLoginGradient"
                    x1="0"
                    y1="0"
                    x2="40"
                    y2="40"
                  >
                    <stop offset="0%" stopColor="#5546FF" />
                    <stop offset="100%" stopColor="#DA4BF8" />
                  </linearGradient>
                </defs>
              </svg>
            </span>

            <span className="bu-login-brand-name">
              bundle<span>upott</span>
            </span>
          </a>

          <div className="bu-login-intro-content">
            <span className="bu-login-eyebrow">
              <Sparkles size={15} />
              ADMINISTRATION PORTAL
            </span>

            <h1>
              Your workspace.
              <br />
              <span>Your control.</span>
            </h1>

            <p>
              Manage your bundleupott workspace through a dedicated
              administrator account.
            </p>

            <div className="bu-login-feature">
              <span>
                <ShieldCheck size={21} />
              </span>
              <div>
                <strong>Protected access</strong>
                <p>Authentication verified by your backend.</p>
              </div>
            </div>

            <div className="bu-login-feature">
              <span>
                <LockKeyhole size={21} />
              </span>
              <div>
                <strong>Private administration</strong>
                <p>Admin access is separate from customer browsing.</p>
              </div>
            </div>
          </div>

          <p className="bu-login-footer">
            bundleupott · Administrator access only
          </p>
        </aside>

        <section className="bu-login-card">
          <div className="bu-login-card-icon">
            <LockKeyhole size={25} />
          </div>

          <p className="bu-login-card-label">WELCOME BACK</p>

          <h2>Admin sign in</h2>

          <p className="bu-login-card-description">
            Enter your administrator credentials to continue.
          </p>

          <form onSubmit={handleSubmit} className="bu-login-form">
            <div className="bu-login-field">
              <label htmlFor="admin-email">Admin email</label>

              <div className="bu-login-input-wrap">
                <Mail size={18} aria-hidden="true" />

                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  placeholder="Enter your admin email"
                  autoComplete="username"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  maxLength={254}
                  required
                  disabled={loading}
                  autoCapitalize="none"
                  spellCheck="false"
                />
              </div>
            </div>

            <div className="bu-login-field">
              <div className="bu-login-label-row">
                <label htmlFor="admin-password">Password</label>
                <span>Private credentials</span>
              </div>

              <div className="bu-login-input-wrap">
                <LockKeyhole size={18} aria-hidden="true" />

                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  maxLength={1024}
                  required
                  disabled={loading}
                />

                <button
                  type="button"
                  className="bu-login-eye"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bu-login-error" role="alert">
                <TriangleAlert size={18} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="bu-login-submit"
              disabled={loading}
            >
              <span>
                {loading ? "Verifying credentials..." : "Sign in securely"}
              </span>

              {!loading && <ArrowRight size={19} />}

              {loading && <span className="bu-login-spinner" />}
            </button>
          </form>

          <div className="bu-login-security-note">
            <ShieldCheck size={18} />
            <p>
              Your credentials are verified by the server. Never share your
              admin password or authentication secrets.
            </p>
          </div>

          <a className="bu-login-home-link" href="/">
            Back to bundleupott
          </a>
        </section>
      </section>
    </main>
  );
}
