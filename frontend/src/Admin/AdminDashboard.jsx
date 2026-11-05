import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, ArrowRight, CalendarDays, CheckCircle2, CreditCard, Eye, IndianRupee, LockKeyhole, LogOut, Menu, RefreshCw, ShieldCheck, X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import OrderDetailsDrawer from "./OrderDetailsDrawer";
import "../Admincss/AdminDashboard.css";
import "./AdminDashboardLive.css";
import "./OrderDetails.css";

const ROOT = "/api/payment";
const SESSION_KEY = "bundleupott_admin_token";
const PERIODS = [
  { key: "today", label: "Today", caption: "Orders placed today, by hour" },
  { key: "weekly", label: "Weekly", caption: "Last 7 days, by day" },
  { key: "monthly", label: "Monthly", caption: "Last 30 days, by day" },
];
// Paths match the routes that exist in backend/payment.js
const EMAIL_KINDS = {
  success: { status: "paid", sentField: "successEmailSentAt", single: "resend-status-email", bulk: null, noun: "payment-success", button: "Send success email" },
  failure: { status: "rejected", sentField: "failureEmailSentAt", single: "failure-email", bulk: "/admin/failure-emails/bulk", noun: "payment-failure", button: "Send failure email" },
};
const kindOf = (order) => (order.status === "paid" ? "success" : order.status === "rejected" ? "failure" : null);
// An email counts as sent if either the per-kind field or the shared paymentEmail* fields say so
const emailSentAt = (order) => {
  const kind = kindOf(order);
  if (!kind) return null;
  if (order[EMAIL_KINDS[kind].sentField]) return order[EMAIL_KINDS[kind].sentField];
  if (order.paymentEmailStatus === "sent" && order.paymentEmailType === kind) return order.paymentEmailSentAt || true;
  return null;
};
const money = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(Number(n || 0));
const dateLabel = (v) => v && !Number.isNaN(new Date(v).getTime()) ? new Date(v).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";
const initials = (name) => String(name || "C").trim().split(/\s+/).slice(0, 2).map((p) => p[0] || "").join("").toUpperCase();

async function readJson(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || `Request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }
  return data;
}

function Status({ value }) {
  const status = String(value || "unknown").toLowerCase();
  const tone = status === "paid" ? "success" : status === "pending" ? "pending" : "failed";
  return <span className={`bu-status bu-status-${tone}`}><i />{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
}

export default function AdminDashboard() {
  const [token, setToken] = useState(() => window.sessionStorage.getItem(SESSION_KEY) || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginBusy, setLoginBusy] = useState(false);
  const [activePage, setActivePage] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [verifyOrder, setVerifyOrder] = useState(null);
  const [verifiedAmount, setVerifiedAmount] = useState("");
  const [bankReference, setBankReference] = useState("");
  const [verificationNote, setVerificationNote] = useState("");
  const [alertEventId, setAlertEventId] = useState("");
  const [confirmedFromBank, setConfirmedFromBank] = useState(false);
  const [verifyBusy, setVerifyBusy] = useState(false);
  const [selectedEmailOrders, setSelectedEmailOrders] = useState([]);
  const [emailBusy, setEmailBusy] = useState(false);
  const [statusBusyOrder, setStatusBusyOrder] = useState("");
  const [period, setPeriod] = useState("today");
  const [detailId, setDetailId] = useState(null);

  const logout = useCallback((message = "") => {
    window.sessionStorage.removeItem(SESSION_KEY);
    setToken("");
    setOrders([]);
    setSummary(null);
    setAlerts([]);
    setSelectedEmailOrders([]);
    setVerifyOrder(null);
    setDetailId(null);
    setSuccess("");
    setError(message);
  }, []);

  const api = useCallback(async (path, options = {}) => {
    const headers = { ...(options.headers || {}) };
    if (options.body) headers["Content-Type"] = "application/json";
    if (token) headers.Authorization = `Bearer ${token}`;
    return readJson(await fetch(`${ROOT}${path}`, { ...options, headers, cache: "no-store" }));
  }, [token]);

  const loadData = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true);
    try {
      const [o, s, a] = await Promise.all([
        api("/admin/orders"),
        api("/admin/summary"),
        api("/admin/alerts"),
      ]);
      setOrders(Array.isArray(o.orders) ? o.orders : []);
      setSummary(s.summary || null);
      setAlerts(Array.isArray(a.alerts) ? a.alerts : []);
      setError("");
    } catch (e) {
      if (e.status === 401 || e.status === 403) logout("Admin session expired or unauthorized. Please sign in again.");
      else setError(e.message || "Could not load live payment data.");
    } finally {
      if (!quiet) setLoading(false);
    }
  }, [api, logout]);

  useEffect(() => {
    if (!token) return undefined;
    loadData();
    const timer = window.setInterval(() => loadData(true), 15000);
    return () => window.clearInterval(timer);
  }, [token, loadData]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoginBusy(true);
    try {
      const result = await readJson(await fetch(`${ROOT}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      }));
      if (!result.token) throw new Error("The server did not return an admin token.");
      window.sessionStorage.setItem(SESSION_KEY, result.token);
      setToken(result.token);
      setPassword("");
      setSuccess("Signed in. Loading live orders…");
    } catch (e) {
      setError(e.message || "Admin sign-in failed.");
    } finally {
      setLoginBusy(false);
    }
  };

  // The drawer always shows the freshest copy of the order (auto-refresh every 15s)
  const detailOrder = detailId ? orders.find((o) => o.orderId === detailId) || null : null;
  const closeDetails = useCallback(() => setDetailId(null), []);

  const query = search.trim().toLowerCase();
  const visibleOrders = useMemo(() => orders.filter((o) => {
    const statusMatches = statusFilter === "All" || String(o.status).toLowerCase() === statusFilter.toLowerCase();
    const queryMatches = !query || [o.orderId, o.customerName, o.customerEmail, o.customerMobile, o.planName, o.planId, o.status, o.bankReference, o.customerClaimedReference, o.couponCode, o.verifiedBy, String(o.amount ?? "")]
      .some((v) => String(v || "").toLowerCase().includes(query));
    return statusMatches && queryMatches;
  }), [orders, query, statusFilter]);

  const statusCounts = useMemo(() => orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {}), [orders]);

  const periodStats = useMemo(() => {
    const now = new Date();
    const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const hourly = period === "today";
    const size = hourly ? 24 : period === "weekly" ? 7 : 30;
    const start = new Date(dayStart);
    if (!hourly) start.setDate(start.getDate() - (size - 1));

    const buckets = Array(size).fill(0);
    let total = 0, paid = 0, pending = 0, failed = 0, revenue = 0;

    orders.forEach((o) => {
      const created = new Date(o.createdAt);
      if (Number.isNaN(created.getTime()) || created < start || created > now) return;
      const index = hourly ? created.getHours() : Math.floor((created - start) / 86400000);
      if (index < 0 || index >= size) return;

      buckets[index] += 1;
      total += 1;
      const status = String(o.status).toLowerCase();
      if (status === "paid") { paid += 1; revenue += Number(o.amount || 0); }
      else if (status === "pending") pending += 1;
      else failed += 1;
    });

    const labels = buckets.map((_, i) => {
      if (hourly) return `${String(i).padStart(2, "0")}:00`;
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
    });

    return { buckets, labels, total, paid, pending, failed, revenue, max: Math.max(...buckets, 1) };
  }, [orders, period]);

  const revenueStats = useMemo(() => {
    let paid = 0, pending = 0, paidCount = 0, pendingCount = 0;

    orders.forEach((o) => {
      const status = String(o.status).toLowerCase();
      const amount = Number(o.amount || 0);
      if (status === "paid") { paid += amount; paidCount += 1; }
      else if (status === "pending") { pending += amount; pendingCount += 1; }
    });

    return {
      paid: Number(summary?.verifiedRevenue ?? paid),
      pending: Number(summary?.pendingRevenue ?? pending),
      paidCount: summary?.paidOrders ?? paidCount,
      pendingCount: summary?.pendingOrders ?? pendingCount,
    };
  }, [orders, summary]);

  const totalRevenue = revenueStats.paid + revenueStats.pending;

  // ---- Email selection helpers (success + failure) ----
  const emailEligible = (o) => Boolean(kindOf(o)) && !emailSentAt(o);
  const eligibleVisible = visibleOrders.filter(emailEligible);
  const allVisibleSelected = eligibleVisible.length > 0 && eligibleVisible.every((o) => selectedEmailOrders.includes(o.orderId));
  const selectedFor = (kind) => orders.filter((o) => selectedEmailOrders.includes(o.orderId) && kindOf(o) === kind && !emailSentAt(o));
  const selectedSuccess = selectedFor("success");
  const selectedFailure = selectedFor("failure");

  const toggleSelectAllVisible = (checked) => {
    const ids = eligibleVisible.map((o) => o.orderId);
    setSelectedEmailOrders((current) => checked ? [...new Set([...current, ...ids])] : current.filter((id) => !ids.includes(id)));
  };

  const alertsForOrder = alerts.filter((a) => a.status === "awaiting_verification" && a.isTest !== true && verifyOrder && Number(a.amountHint) === Number(verifyOrder.amount));

  const openVerify = (order) => {
    setDetailId(null);
    if (activePage !== "payments") setActivePage("payments");
    setVerifyOrder(order);
    setVerifiedAmount(String(order.amount ?? ""));
    setBankReference("");
    setVerificationNote("");
    setAlertEventId("");
    setConfirmedFromBank(false);
    setError("");
    setSuccess("");
    window.setTimeout(() => document.querySelector(".bu-verify-box")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const closeVerify = () => {
    setVerifyOrder(null);
    setVerifiedAmount("");
    setBankReference("");
    setVerificationNote("");
    setAlertEventId("");
    setConfirmedFromBank(false);
  };

  const sendOrderEmail = async (order) => {
    const kind = kindOf(order);
    if (!kind || emailBusy) return;
    const cfg = EMAIL_KINDS[kind];

    if (emailSentAt(order)) {
      setError(`A ${cfg.noun} email is already recorded for this order.`);
      return;
    }

    if (!window.confirm(`Send a ${cfg.noun} email to ${order.customerEmail}?`)) return;

    setEmailBusy(true);
    setError("");
    setSuccess("");

    try {
      const result = await api(`/admin/orders/${encodeURIComponent(order.orderId)}/${cfg.single}`, { method: "POST" });
      await loadData(true);
      setSuccess(result.message || "Email submitted successfully.");
    } catch (e) {
      if (e.status === 401 || e.status === 403) logout("Admin session expired or unauthorized. Please sign in again.");
      else setError(e.message || "Could not send email.");
    } finally {
      setEmailBusy(false);
    }
  };

  const sendBulkEmails = async (kind) => {
    const cfg = EMAIL_KINDS[kind];
    const eligible = selectedFor(kind);

    if (!eligible.length) {
      setError(`Select at least one ${kind === "success" ? "paid" : "failed"} order that has not already been emailed.`);
      return;
    }

    if (!window.confirm(`Send ${cfg.noun} emails to ${eligible.length} customers?`)) return;

    setEmailBusy(true);
    setError("");
    setSuccess("");

    try {
      let sent = 0, failed = 0;
      if (cfg.bulk) {
        const result = await api(cfg.bulk, {
          method: "POST",
          body: JSON.stringify({ orderIds: eligible.map((order) => order.orderId) }),
        });
        sent = result.sent ?? 0;
        failed = result.failed ?? 0;
      } else {
        // No bulk route for success emails on the backend — send one by one
        for (const order of eligible) {
          try {
            await api(`/admin/orders/${encodeURIComponent(order.orderId)}/${cfg.single}`, { method: "POST" });
            sent += 1;
          } catch {
            failed += 1;
          }
        }
      }
      const sentIds = eligible.map((order) => order.orderId);
      setSelectedEmailOrders((current) => current.filter((id) => !sentIds.includes(id)));
      await loadData(true);
      setSuccess(`Email results: ${sent} submitted, ${failed} unsuccessful.`);
    } catch (e) {
      if (e.status === 401 || e.status === 403) logout("Admin session expired or unauthorized. Please sign in again.");
      else setError(e.message || "Could not process bulk emails.");
    } finally {
      setEmailBusy(false);
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (!verifyOrder || verifyOrder.status !== "pending") return setError("This order is no longer pending. Refresh the list.");
    const amount = Number(verifiedAmount);
    const reference = bankReference.trim().toUpperCase();
    const note = verificationNote.trim();
    if (!confirmedFromBank) return setError("Confirm that you independently verified the bank credit.");
    if (!Number.isFinite(amount) || amount !== Number(verifyOrder.amount)) return setError("Verified amount must exactly match the order amount.");
    if (!/^[A-Z0-9-]{10,30}$/.test(reference)) return setError("Bank reference must be 10–30 letters, numbers or hyphens.");
    if (note.length < 5 || note.length > 500) return setError("Verification note must be 5–500 characters.");

    setVerifyBusy(true);
    try {
      const result = await api(`/admin/orders/${encodeURIComponent(verifyOrder.orderId)}/verify`, {
        method: "POST",
        body: JSON.stringify({
          confirmedFromBank: true,
          verifiedAmount: amount,
          bankReference: reference,
          verificationNote: note,
          ...(alertEventId ? { alertEventId } : {}),
        }),
      });
      closeVerify();
      await loadData(true);
      setSuccess(result.message || "Bank-verified payment approved.");
    } catch (e) {
      if (e.status === 401 || e.status === 403) logout("Admin session expired or unauthorized. Please sign in again.");
      else setError(e.message || "Could not verify payment.");
    } finally {
      setVerifyBusy(false);
    }
  };

  // "Paid" reuses the bank-verification flow. "Failed" uses POST /admin/orders/:id/manual-status.
  const handleManualStatusChange = async (order, nextStatus) => {
    if (nextStatus === "pending" || statusBusyOrder) return;

    if (nextStatus === "paid") {
      openVerify(order);
      return;
    }

    if (nextStatus === "rejected") {
      const reason = window.prompt(`Mark order ${order.orderId} as FAILED.\nA failure email will be sent to ${order.customerEmail} automatically.\n\nReason (saved as admin note):`, "Payment not received in bank account.");
      if (reason === null) return;

      setStatusBusyOrder(order.orderId);
      setError("");
      setSuccess("");
      try {
        const result = await api(`/admin/orders/${encodeURIComponent(order.orderId)}/manual-status`, {
          method: "POST",
          body: JSON.stringify({ status: "rejected", note: reason.trim() }),
        });
        await loadData(true);
        setSuccess(result.message || "Order marked as failed.");
      } catch (e) {
        if (e.status === 401 || e.status === 403) logout("Admin session expired or unauthorized. Please sign in again.");
        else setError(e.message || "Could not update order status.");
      } finally {
        setStatusBusyOrder("");
      }
    }
  };

  const navigate = (page) => {
    setActivePage(page);
    setSearch("");
    setStatusFilter("All");
    setSelectedEmailOrders([]);
    setError("");
    setSuccess("");
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  if (!token) {
    return <main className="bu-admin-auth-wrap">
      <section className="bu-admin-auth-card">
        <div className="bu-admin-auth-brand">
          <span className="bu-admin-auth-icon"><LockKeyhole size={25} /></span>
          <div><strong>bundle<span>upott</span></strong><small>SECURE ADMIN CONSOLE</small></div>
        </div>
        <h1>Admin sign in</h1>
        <p className="bu-admin-auth-description">Sign in to manage real payment orders. No demo payment records are used.</p>
        {error && <div className="bu-admin-message bu-admin-message-error" role="alert"><AlertCircle size={18} /><span>{error}</span></div>}
        <form className="bu-admin-auth-form" onSubmit={handleLogin}>
          <label>Admin email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required /></label>
          <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required /></label>
          <button className="bu-admin-primary-button bu-admin-full-button" type="submit" disabled={loginBusy}>{loginBusy ? "Signing in…" : "Sign in securely"}</button>
        </form>
        <div className="bu-admin-auth-footnote"><ShieldCheck size={17} /><span>Authentication is checked by your backend. Never share your admin password or token.</span></div>
      </section>
    </main>;
  }

  const title = activePage === "overview" ? "Dashboard Overview" : activePage === "payments" ? "Payment Management" : activePage === "settings" ? "Admin Settings" : activePage === "users" ? "Users & Customers" : activePage === "subscriptions" ? "Subscriptions" : "Login Activity";

  const stop = (e) => e.stopPropagation();

  const renderOrders = (records, actions = false) => <div className="bu-table-scroll">
        <table className={`bu-table bu-orders-table${actions ? " bu-orders-table-actions" : ""}`}>
      <colgroup>
        {actions && <col className="bu-c-select" />}
        <col className="bu-c-customer" />
        <col className="bu-c-plan" />
        <col className="bu-c-amount" />
        <col className="bu-c-utr" />
        <col className="bu-c-status" />
        <col className="bu-c-created" />
        <col className="bu-c-actions" />
      </colgroup>
      <thead>
        <tr>
          {actions && <th className="bu-col-select">
            <label className="bu-select-all">
              <input
                type="checkbox"
                aria-label="Select all emailable orders in this view"
                checked={allVisibleSelected}
                disabled={eligibleVisible.length === 0}
                onChange={(event) => toggleSelectAllVisible(event.target.checked)}
              />
            </label>
          </th>}
          <th>Customer</th>
          <th>Plan / Order ID</th>
          <th>Amount</th>
          <th>Customer UTR</th>
          <th>Status</th>
          <th>Created</th>
          <th>{actions ? "Actions" : "Details"}</th>
        </tr>
      </thead>
      <tbody>
        {records.map((o) => {
          const kind = kindOf(o);
          const cfg = kind ? EMAIL_KINDS[kind] : null;
          const sentAt = emailSentAt(o);

                    return <tr key={o.orderId} className={`bu-order-row bu-order-${o.status || "unknown"}${detailId === o.orderId ? " bu-order-row-active" : ""}`} onClick={() => setDetailId(o.orderId)}>
            {actions && <td className="bu-col-select" onClick={stop}>
              {cfg && !sentAt && (
                <input
                  type="checkbox"
                  aria-label={`Select ${o.customerEmail || o.orderId} for ${cfg.noun} email`}
                  checked={selectedEmailOrders.includes(o.orderId)}
                  onChange={(event) => {
                    setSelectedEmailOrders((current) =>
                      event.target.checked
                        ? [...new Set([...current, o.orderId])]
                        : current.filter((id) => id !== o.orderId)
                    );
                  }}
                />
              )}
            </td>}
            <td>
              <div className="bu-person">
                <span className="bu-avatar">{initials(o.customerName)}</span>
                <div className="bu-person-copy">
                  <strong>{o.customerName || "Customer"}</strong>
                  <small>{o.customerEmail || "No email"}</small>
                  {o.customerMobile && <small className="bu-mobile">{o.customerMobile}</small>}
                </div>
              </div>
            </td>
            <td>
              <span className="bu-plan-name">{o.planName || o.planId || "Plan"}</span>
              {Array.isArray(o.items) && o.items.length > 1 && <small className="bu-items-count">{o.items.length} items</small>}
              <small className="bu-id">{o.orderId}</small>
            </td>
            <td className="bu-amount bu-nowrap">
              {money(o.amount)}
              {o.couponCode && <small className="bu-coupon-chip">{o.couponCode}</small>}
            </td>
            <td className="bu-nowrap">
              {o.customerClaimedReference
                ? <span className="bu-utr">{o.customerClaimedReference}</span>
                : <span className="bu-muted">Not submitted</span>}
            </td>
            <td onClick={stop}>
              {actions && o.status === "pending" ? (
                <select
                  className="bu-manual-status-select"
                  value="pending"
                  aria-label={`Change payment status for ${o.customerName || o.orderId}`}
                  disabled={statusBusyOrder === o.orderId}
                  onChange={(event) => handleManualStatusChange(o, event.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid / Success</option>
                  <option value="rejected">Failed</option>
                </select>
              ) : (
                <Status value={o.status === "rejected" ? "failed" : o.status} />
              )}
            </td>
            <td className="bu-muted bu-nowrap">{dateLabel(o.createdAt)}</td>
            <td onClick={stop}>
              <div className="bu-row-actions">
                <button type="button" className="bu-admin-secondary-button bu-details-button" onClick={() => setDetailId(o.orderId)}><Eye size={14} /> Details</button>
                {actions && (o.status === "pending" ? (
                  <button type="button" className="bu-admin-secondary-button" onClick={() => openVerify(o)}>Verify</button>
                ) : cfg ? (
                  sentAt ? (
                    <span className="bu-muted">Email sent{sentAt !== true ? ` · ${dateLabel(sentAt)}` : ""}</span>
                  ) : (
                    <button type="button" className="bu-admin-secondary-button" disabled={emailBusy} onClick={() => sendOrderEmail(o)}>
                      {emailBusy ? "Sending…" : cfg.button}
                    </button>
                  )
                ) : null)}
              </div>
            </td>
          </tr>;
        })}
        {records.length === 0 && <tr><td colSpan={actions ? 8 : 7}><div className="bu-empty">No live orders match this view.</div></td></tr>}
      </tbody>
    </table>
  </div>;

  return <div className="bu-admin-app">
    <AdminSidebar activePage={activePage} onNavigate={navigate} isOpen={mobileOpen} onClose={() => setMobileOpen(false)} counts={{ payments: orders.length, users: 0 }} />
    <div className="bu-admin-main">
      <header className="bu-topbar">
        <div className="bu-topbar-start">
          <button className="bu-mobile-toggle" aria-label="Open sidebar" type="button" onClick={() => setMobileOpen(true)}><Menu size={22} /></button>
          <div className="bu-breadcrumb"><CreditCard size={16} /><span>Workspace</span><b>/</b><strong>{activePage === "overview" ? "Overview" : title}</strong></div>
        </div>
        <div className="bu-topbar-actions">
          <span className="bu-admin-live-label"><i /> LIVE DATA</span>
          <button type="button" className="bu-admin-header-button" onClick={() => loadData()} disabled={loading}><RefreshCw size={15} /> Refresh</button>
          <button type="button" className="bu-admin-header-button" onClick={() => logout()}><LogOut size={15} /> Sign out</button>
        </div>
      </header>

      <main className="bu-admin-content">
        <div className="bu-page-heading">
          <div><p className="bu-overline">BUNDLEUPOTT / ADMIN</p><h1>{title}</h1><p>{activePage === "overview" ? "Live orders and bank-verified payment totals." : activePage === "payments" ? "Review pending orders and approve only verified bank credits. Click any row for full details." : "This section does not have a live backend data endpoint connected yet."}</p></div>
          <div className="bu-date-pill"><CalendarDays size={17} /><span>{new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span></div>
        </div>

        {error && <div className="bu-admin-message bu-admin-message-error" role="alert"><AlertCircle size={18} /><span>{error}</span></div>}
        {success && <div className="bu-admin-message bu-admin-message-success" role="status"><CheckCircle2 size={18} /><span>{success}</span></div>}

        {activePage === "overview" && <>
          <section className="bu-overview-top">
            <div className="bu-stat-card bu-revenue-card">
              <div className="bu-stat-icon bu-blue"><IndianRupee size={23} /></div>
              <div className="bu-stat-caption">Total revenue (all payments)</div>
              <strong>{money(totalRevenue)}</strong>
              <small>{revenueStats.paidCount + revenueStats.pendingCount} payments · paid + pending</small>

              <div className="bu-revenue-split">
                <div>
                  <i className="bu-dot bu-dot-paid" />
                  <span>Verified</span>
                  <b>{money(revenueStats.paid)}</b>
                </div>
                <div>
                  <i className="bu-dot bu-dot-pending" />
                  <span>Pending</span>
                  <b>{money(revenueStats.pending)}</b>
                </div>
              </div>
            </div>

            <div className="bu-stat-card">
              <div className="bu-stat-icon bu-cyan"><CreditCard size={23} /></div>
              <div className="bu-stat-caption">Total orders</div>
              <strong>{summary?.totalOrders ?? orders.length}</strong>
              <small>Live MongoDB records</small>
            </div>

            <div className="bu-panel bu-period-panel">
              <div className="bu-period-head">
                <div>
                  <h2>Order activity</h2>
                  <p>{PERIODS.find((p) => p.key === period)?.caption}</p>
                </div>
                <div className="bu-period-tabs" role="tablist" aria-label="Time period">
                  {PERIODS.map((p) => (
                    <button
                      key={p.key}
                      type="button"
                      role="tab"
                      aria-selected={period === p.key}
                      className={period === p.key ? "bu-period-tab bu-period-tab-active" : "bu-period-tab"}
                      onClick={() => setPeriod(p.key)}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bu-period-metrics">
                <div><span>Orders</span><strong>{periodStats.total}</strong></div>
                <div><span>Paid</span><strong className="bu-period-paid">{periodStats.paid}</strong></div>
                <div><span>Pending</span><strong className="bu-period-pending">{periodStats.pending}</strong></div>
                <div><span>Revenue</span><strong>{money(periodStats.revenue)}</strong></div>
              </div>

              <div className="bu-period-chart" aria-hidden="true">
                {periodStats.buckets.map((count, i) => (
                  <span
                    key={i}
                    className={count ? "bu-period-bar" : "bu-period-bar bu-period-bar-empty"}
                    style={{ height: `${count ? Math.max((count / periodStats.max) * 100, 12) : 4}%` }}
                    title={`${periodStats.labels[i]}: ${count} order${count === 1 ? "" : "s"}`}
                  />
                ))}
              </div>
              <div className="bu-period-axis">
                <span>{periodStats.labels[0]}</span>
                <span>{periodStats.labels[periodStats.labels.length - 1]}</span>
              </div>
            </div>
          </section>

          <section className="bu-panel bu-list-panel">
            <div className="bu-panel-heading">
              <div><h2>Recent live orders</h2><p>Latest orders from your backend. Click a row for full details.</p></div>
              <button type="button" className="bu-text-action" onClick={() => navigate("payments")}>Manage payments <ArrowRight size={16} /></button>
            </div>
            {loading && !orders.length ? <div className="bu-empty">Loading live orders…</div> : renderOrders(orders.slice(0, 8))}
          </section>
        </>}

        {activePage === "payments" && <section className="bu-panel bu-list-panel">
          <div className="bu-panel-heading"><div><h2>Live orders <span className="bu-count">{visibleOrders.length}</span></h2><p>Customer claims and SMS alerts are not proof of bank credit.</p></div></div>

          <div className="bu-status-tabs" role="tablist" aria-label="Filter by status">
            {[
              ["All", "All", orders.length],
              ["Pending", "Pending", statusCounts.pending || 0],
              ["Paid", "Paid", statusCounts.paid || 0],
              ["Rejected", "Failed", statusCounts.rejected || 0],
            ].map(([value, label, count]) => (
              <button key={value} type="button" role="tab" aria-selected={statusFilter === value} className={statusFilter === value ? "bu-status-tab bu-status-tab-active" : "bu-status-tab"} onClick={() => setStatusFilter(value)}>
                {label} <span>{count}</span>
              </button>
            ))}
          </div>

          <div className="bu-table-toolbar">
            <label className="bu-search-field"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email, mobile, UTR, coupon, order ID…" /></label>
            <div className="bu-email-actions">
              <button
                type="button"
                className="bu-admin-primary-button bu-email-success"
                disabled={emailBusy || selectedSuccess.length === 0}
                onClick={() => sendBulkEmails("success")}
              >
                {emailBusy ? "Sending…" : `Email success (${selectedSuccess.length})`}
              </button>
              <button
                type="button"
                className="bu-admin-primary-button bu-email-failure"
                disabled={emailBusy || selectedFailure.length === 0}
                onClick={() => sendBulkEmails("failure")}
              >
                {emailBusy ? "Sending…" : `Email failure (${selectedFailure.length})`}
              </button>
            </div>
          </div>
          {verifyOrder && <section className="bu-verify-box">
            <div className="bu-verify-heading"><div><h3>Verify payment</h3><p>{verifyOrder.customerName} · {verifyOrder.orderId} · Expected amount {money(verifyOrder.amount)}{verifyOrder.customerClaimedReference ? ` · Customer UTR ${verifyOrder.customerClaimedReference}` : ""}</p></div><button type="button" className="bu-icon-button" onClick={closeVerify} aria-label="Close verification"><X size={18} /></button></div>
            <div className="bu-verify-warning"><ShieldCheck size={18} /><span>Only continue after independently confirming the exact bank credit and transaction reference in the receiving bank account.</span></div>
            <form className="bu-verify-form" onSubmit={handleVerify}>
              <div className="bu-verify-form-grid">
                <label>Verified amount (INR)<input type="number" min="0.01" step="0.01" value={verifiedAmount} onChange={(e) => setVerifiedAmount(e.target.value)} required /></label>
                <label>Bank transaction reference<input value={bankReference} onChange={(e) => setBankReference(e.target.value.toUpperCase())} minLength={10} maxLength={30} autoComplete="off" placeholder="Reference from bank statement" required /></label>
                <label className="bu-verify-wide">Matching payment alert (optional)<select value={alertEventId} onChange={(e) => setAlertEventId(e.target.value)}><option value="">No alert selected</option>{alertsForOrder.map((a) => <option key={a.eventId} value={a.eventId}>{a.eventId} · {money(a.amountHint)}{a.referenceHint ? ` · ${a.referenceHint}` : ""}</option>)}</select><small>Select only if the alert belongs to this same transaction.</small></label>
                <label className="bu-verify-wide">Verification note<textarea rows={3} minLength={5} maxLength={500} value={verificationNote} onChange={(e) => setVerificationNote(e.target.value)} placeholder="How the bank credit was independently confirmed" required /></label>
              </div>
              <label className="bu-verify-checkbox"><input type="checkbox" checked={confirmedFromBank} onChange={(e) => setConfirmedFromBank(e.target.checked)} /><span>I independently confirmed the exact amount was credited to the receiving bank account.</span></label>
              <div className="bu-verify-actions"><button className="bu-admin-primary-button" type="submit" disabled={verifyBusy}>{verifyBusy ? "Verifying…" : "Confirm and mark paid"}</button><button className="bu-admin-secondary-button" type="button" onClick={closeVerify} disabled={verifyBusy}>Cancel</button></div>
            </form>
          </section>}
          {loading && !orders.length ? <div className="bu-empty">Loading live orders…</div> : renderOrders(visibleOrders, true)}
        </section>}

        {activePage === "settings" && <section className="bu-panel bu-settings-card"><span className="bu-setting-icon"><ShieldCheck size={27} /></span><h2>Authenticated admin session</h2><p>Live order APIs are connected. The dashboard refreshes data every 15 seconds while open.</p><button type="button" className="bu-admin-secondary-button" onClick={() => loadData()}><RefreshCw size={16} /> Test connection</button></section>}

        {["users", "subscriptions", "logins"].includes(activePage) && <section className="bu-panel bu-admin-no-data"><ShieldCheck size={25} /><h2>No demo records shown</h2><p>This section needs its own live backend API. Payment orders and payment verification are connected in this dashboard.</p><button type="button" className="bu-admin-secondary-button" onClick={() => navigate("payments")}>Open payment management <ArrowRight size={16} /></button></section>}

        <p className="bu-admin-refresh-note"><CheckCircle2 size={14} /> Live orders and summary refresh automatically every 15 seconds.</p>
      </main>
    </div>

    <OrderDetailsDrawer
      order={detailOrder}
      onClose={closeDetails}
      onVerify={openVerify}
      onMarkFailed={(o) => handleManualStatusChange(o, "rejected")}
      onSendEmail={sendOrderEmail}
      emailBusy={emailBusy}
      statusBusy={Boolean(detailOrder && statusBusyOrder === detailOrder.orderId)}
    />
  </div>;
}