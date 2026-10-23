import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, ArrowRight, CalendarDays, CheckCircle2, Clock3, CreditCard, IndianRupee, LockKeyhole, LogOut, Menu, RefreshCw, ShieldCheck, X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import "../Admincss/AdminDashboard.css";
import "./AdminDashboardLive.css";

const ROOT = "/api/payment";
const SESSION_KEY = "bundleupott_admin_token";
const money = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(Number(n || 0));
const dateLabel = (v) => v && !Number.isNaN(new Date(v).getTime()) ? new Date(v).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

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

  const logout = useCallback((message = "") => {
    window.sessionStorage.removeItem(SESSION_KEY);
    setToken("");
    setOrders([]);
    setSummary(null);
    setAlerts([]);
    setVerifyOrder(null);
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

  const query = search.trim().toLowerCase();
  const visibleOrders = useMemo(() => orders.filter((o) => {
    const statusMatches = statusFilter === "All" || String(o.status).toLowerCase() === statusFilter.toLowerCase();
    const queryMatches = !query || [o.orderId, o.customerName, o.customerEmail, o.customerMobile, o.planName, o.status, o.bankReference, o.customerClaimedReference]
      .some((v) => String(v || "").toLowerCase().includes(query));
    return statusMatches && queryMatches;
  }), [orders, query, statusFilter]);

  const alertsForOrder = alerts.filter((a) => a.status === "awaiting_verification" && a.isTest !== true && verifyOrder && Number(a.amountHint) === Number(verifyOrder.amount));

  const openVerify = (order) => {
    setVerifyOrder(order);
    setVerifiedAmount(String(order.amount ?? ""));
    setBankReference("");
    setVerificationNote("");
    setAlertEventId("");
    setConfirmedFromBank(false);
    setError("");
    setSuccess("");
  };

  const closeVerify = () => {
    setVerifyOrder(null);
    setVerifiedAmount("");
    setBankReference("");
    setVerificationNote("");
    setAlertEventId("");
    setConfirmedFromBank(false);
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

  const navigate = (page) => {
    setActivePage(page);
    setSearch("");
    setStatusFilter("All");
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

  const renderOrders = (records, actions = false) => <div className="bu-table-scroll">
    <table className="bu-table">
      <thead><tr><th>Customer</th><th>Plan / Order ID</th><th>Amount</th><th>Status</th><th>Created</th>{actions && <th>Action</th>}</tr></thead>
      <tbody>
        {records.map((o) => <tr key={o.orderId}>
          <td><div className="bu-person"><span className="bu-avatar">{String(o.customerName || "C").split(/\s+/).slice(0, 2).map((p) => p[0] || "").join("").toUpperCase()}</span><div className="bu-person-copy"><strong>{o.customerName || "Customer"}</strong><small>{o.customerEmail || "No email"}</small></div></div></td>
          <td><span className="bu-plan-name">{o.planName || o.planId || "Plan"}</span><small className="bu-id">{o.orderId}</small></td>
          <td className="bu-amount">{money(o.amount)}</td>
          <td><Status value={o.status} /></td>
          <td className="bu-muted bu-nowrap">{dateLabel(o.createdAt)}</td>
          {actions && <td>{o.status === "pending" ? <button type="button" className="bu-admin-secondary-button" onClick={() => openVerify(o)}>Verify payment</button> : <span className="bu-muted">—</span>}</td>}
        </tr>)}
        {records.length === 0 && <tr><td colSpan={actions ? 6 : 5}><div className="bu-empty">No live orders match this view.</div></td></tr>}
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
          <div><p className="bu-overline">BUNDLEUPOTT / ADMIN</p><h1>{title}</h1><p>{activePage === "overview" ? "Live orders and bank-verified payment totals." : activePage === "payments" ? "Review pending orders and approve only verified bank credits." : "This section does not have a live backend data endpoint connected yet."}</p></div>
          <div className="bu-date-pill"><CalendarDays size={17} /><span>{new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span></div>
        </div>

        {error && <div className="bu-admin-message bu-admin-message-error" role="alert"><AlertCircle size={18} /><span>{error}</span></div>}
        {success && <div className="bu-admin-message bu-admin-message-success" role="status"><CheckCircle2 size={18} /><span>{success}</span></div>}

        {activePage === "overview" && <>
          <section className="bu-stats-grid">
            <div className="bu-stat-card"><div className="bu-stat-icon bu-blue"><IndianRupee size={23} /></div><div className="bu-stat-caption">Verified revenue</div><strong>{money(summary?.verifiedRevenue)}</strong><small>{summary?.paidOrders ?? 0} bank-verified paid orders</small></div>
            <div className="bu-stat-card"><div className="bu-stat-icon bu-cyan"><CreditCard size={23} /></div><div className="bu-stat-caption">Total orders</div><strong>{summary?.totalOrders ?? orders.length}</strong><small>Live MongoDB records</small></div>
            <div className="bu-stat-card"><div className="bu-stat-icon bu-mint"><CheckCircle2 size={23} /></div><div className="bu-stat-caption">Paid orders</div><strong>{summary?.paidOrders ?? 0}</strong><small>Approved after bank review</small></div>
            <div className="bu-stat-card"><div className="bu-stat-icon bu-amber"><Clock3 size={23} /></div><div className="bu-stat-caption">Pending payments</div><strong>{summary?.pendingOrders ?? 0}</strong><small>{summary?.pendingAlerts ?? 0} alerts awaiting review</small></div>
          </section>
          <section className="bu-panel bu-list-panel"><div className="bu-panel-heading"><div><h2>Recent live orders</h2><p>Latest orders from your backend.</p></div><button type="button" className="bu-text-action" onClick={() => navigate("payments")}>Manage payments <ArrowRight size={16} /></button></div>{loading && !orders.length ? <div className="bu-empty">Loading live orders…</div> : renderOrders(orders.slice(0, 8))}</section>
        </>}

        {activePage === "payments" && <section className="bu-panel bu-list-panel">
          <div className="bu-panel-heading"><div><h2>Live orders <span className="bu-count">{visibleOrders.length}</span></h2><p>Customer claims and SMS alerts are not proof of bank credit.</p></div></div>
          <div className="bu-table-toolbar"><label className="bu-search-field"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search customer, email, plan, order ID…" /></label><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter by status"><option>All</option><option>Pending</option><option>Paid</option><option>Rejected</option></select></div>
          {verifyOrder && <section className="bu-verify-box">
            <div className="bu-verify-heading"><div><h3>Verify payment</h3><p>{verifyOrder.orderId} · Expected amount {money(verifyOrder.amount)}</p></div><button type="button" className="bu-icon-button" onClick={closeVerify} aria-label="Close verification"><X size={18} /></button></div>
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
  </div>;
}
