import React, { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  IndianRupee,
  LayoutDashboard,
  Menu,
  Search,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  UsersRound,
  XCircle,
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import "../Admincss/AdminDashboard.css";

// FRONTEND DEMO DATA ONLY. Replace this with backend API data later.
const payments = [
  {
    id: "PAY-1009",
    name: "Aditi Sharma",
    email: "aditi@example.com",
    plan: "Netflix + Prime",
    amount: 398,
    method: "UPI",
    date: "22 Oct 2026, 10:42 AM",
    status: "Paid",
    reference: "DEMO-UPI-1009",
  },
  {
    id: "PAY-1008",
    name: "Rahul Mehta",
    email: "rahul@example.com",
    plan: "ChatGPT + SonyLIV",
    amount: 498,
    method: "UPI",
    date: "22 Oct 2026, 09:18 AM",
    status: "Pending",
    reference: "DEMO-UPI-1008",
  },
  {
    id: "PAY-1007",
    name: "Priya Nair",
    email: "priya@example.com",
    plan: "Netflix",
    amount: 199,
    method: "UPI",
    date: "21 Oct 2026, 08:30 PM",
    status: "Paid",
    reference: "DEMO-UPI-1007",
  },
  {
    id: "PAY-1006",
    name: "Arjun Patel",
    email: "arjun@example.com",
    plan: "Gemini + ZEE5",
    amount: 348,
    method: "UPI",
    date: "21 Oct 2026, 05:12 PM",
    status: "Failed",
    reference: "DEMO-UPI-1006",
  },
  {
    id: "PAY-1005",
    name: "Sneha Gupta",
    email: "sneha@example.com",
    plan: "Prime + Claude",
    amount: 498,
    method: "UPI",
    date: "21 Oct 2026, 02:17 PM",
    status: "Paid",
    reference: "DEMO-UPI-1005",
  },
  {
    id: "PAY-1004",
    name: "Vikram Singh",
    email: "vikram@example.com",
    plan: "JioHotstar",
    amount: 149,
    method: "UPI",
    date: "20 Oct 2026, 11:24 AM",
    status: "Paid",
    reference: "DEMO-UPI-1004",
  },
  {
    id: "PAY-1003",
    name: "Neha Kapoor",
    email: "neha@example.com",
    plan: "Midjourney",
    amount: 199,
    method: "UPI",
    date: "20 Oct 2026, 10:11 AM",
    status: "Pending",
    reference: "DEMO-UPI-1003",
  },
  {
    id: "PAY-1002",
    name: "Karan Shah",
    email: "karan@example.com",
    plan: "SonyLIV + ZEE5",
    amount: 448,
    method: "UPI",
    date: "19 Oct 2026, 07:39 PM",
    status: "Paid",
    reference: "DEMO-UPI-1002",
  },
];

const users = [
  {
    id: "USR-1001",
    name: "Aditi Sharma",
    email: "aditi@example.com",
    joined: "11 Oct 2026",
    lastLogin: "22 Oct, 10:36 AM",
    logins: 12,
    status: "Active",
  },
  {
    id: "USR-1002",
    name: "Rahul Mehta",
    email: "rahul@example.com",
    joined: "12 Oct 2026",
    lastLogin: "22 Oct, 09:10 AM",
    logins: 8,
    status: "Active",
  },
  {
    id: "USR-1003",
    name: "Priya Nair",
    email: "priya@example.com",
    joined: "15 Oct 2026",
    lastLogin: "21 Oct, 08:22 PM",
    logins: 5,
    status: "Active",
  },
  {
    id: "USR-1004",
    name: "Arjun Patel",
    email: "arjun@example.com",
    joined: "17 Oct 2026",
    lastLogin: "21 Oct, 05:02 PM",
    logins: 3,
    status: "Active",
  },
  {
    id: "USR-1005",
    name: "Sneha Gupta",
    email: "sneha@example.com",
    joined: "17 Oct 2026",
    lastLogin: "21 Oct, 02:09 PM",
    logins: 4,
    status: "Active",
  },
  {
    id: "USR-1006",
    name: "Vikram Singh",
    email: "vikram@example.com",
    joined: "18 Oct 2026",
    lastLogin: "20 Oct, 11:18 AM",
    logins: 2,
    status: "Inactive",
  },
  {
    id: "USR-1007",
    name: "Neha Kapoor",
    email: "neha@example.com",
    joined: "19 Oct 2026",
    lastLogin: "20 Oct, 10:03 AM",
    logins: 2,
    status: "Active",
  },
  {
    id: "USR-1008",
    name: "Karan Shah",
    email: "karan@example.com",
    joined: "19 Oct 2026",
    lastLogin: "19 Oct, 07:25 PM",
    logins: 1,
    status: "Active",
  },
];

const subscriptions = [
  {
    id: "SUB-401",
    name: "Aditi Sharma",
    plan: "Netflix + Prime",
    amount: 398,
    started: "22 Oct 2026",
    renewal: "22 Nov 2026",
    status: "Active",
  },
  {
    id: "SUB-402",
    name: "Priya Nair",
    plan: "Netflix",
    amount: 199,
    started: "21 Oct 2026",
    renewal: "21 Nov 2026",
    status: "Active",
  },
  {
    id: "SUB-403",
    name: "Sneha Gupta",
    plan: "Prime + Claude",
    amount: 498,
    started: "21 Oct 2026",
    renewal: "21 Nov 2026",
    status: "Active",
  },
  {
    id: "SUB-404",
    name: "Vikram Singh",
    plan: "JioHotstar",
    amount: 149,
    started: "20 Oct 2026",
    renewal: "20 Nov 2026",
    status: "Active",
  },
  {
    id: "SUB-405",
    name: "Rahul Mehta",
    plan: "ChatGPT + SonyLIV",
    amount: 498,
    started: "—",
    renewal: "—",
    status: "Pending",
  },
  {
    id: "SUB-406",
    name: "Karan Shah",
    plan: "SonyLIV + ZEE5",
    amount: 448,
    started: "19 Oct 2026",
    renewal: "19 Nov 2026",
    status: "Active",
  },
];

const loginEvents = [
  {
    name: "Aditi Sharma",
    email: "aditi@example.com",
    date: "22 Oct 2026",
    time: "10:36 AM",
    device: "Chrome / Windows",
    result: "Success",
  },
  {
    name: "Rahul Mehta",
    email: "rahul@example.com",
    date: "22 Oct 2026",
    time: "09:10 AM",
    device: "Chrome / Android",
    result: "Success",
  },
  {
    name: "Priya Nair",
    email: "priya@example.com",
    date: "21 Oct 2026",
    time: "08:22 PM",
    device: "Safari / iPhone",
    result: "Success",
  },
  {
    name: "Arjun Patel",
    email: "arjun@example.com",
    date: "21 Oct 2026",
    time: "05:02 PM",
    device: "Chrome / Android",
    result: "Failed",
  },
  {
    name: "Sneha Gupta",
    email: "sneha@example.com",
    date: "21 Oct 2026",
    time: "02:09 PM",
    device: "Edge / Windows",
    result: "Success",
  },
  {
    name: "Vikram Singh",
    email: "vikram@example.com",
    date: "20 Oct 2026",
    time: "11:18 AM",
    device: "Chrome / Android",
    result: "Success",
  },
  {
    name: "Neha Kapoor",
    email: "neha@example.com",
    date: "20 Oct 2026",
    time: "10:03 AM",
    device: "Chrome / Android",
    result: "Success",
  },
];

const chartData = [
  { day: "Fri", amount: 320 },
  { day: "Sat", amount: 520 },
  { day: "Sun", amount: 370 },
  { day: "Mon", amount: 740 },
  { day: "Tue", amount: 590 },
  { day: "Wed", amount: 860 },
  { day: "Thu", amount: 680 },
];

const titles = {
  overview: [
    "Dashboard Overview",
    "Here's what's happening in your bundleupott workspace.",
  ],
  payments: ["Payment Management", "Track paid, pending and failed payments."],
  users: [
    "Users & Customers",
    "View registered customers and their latest sign-ins.",
  ],
  subscriptions: ["Subscriptions", "See the bundles customers have selected."],
  logins: ["Login Activity", "Review sample sign-in events and devices."],
  settings: [
    "Settings",
    "Prepare your admin workspace for future integration.",
  ],
};

const money = (value) => `₹${Number(value).toLocaleString("en-IN")}`;
const initials = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

function Avatar({ name }) {
  return (
    <span className="bu-avatar" aria-hidden="true">
      {initials(name)}
    </span>
  );
}

function Person({ name, email }) {
  return (
    <div className="bu-person">
      <Avatar name={name} />
      <div className="bu-person-copy">
        <strong>{name}</strong>
        <small>{email}</small>
      </div>
    </div>
  );
}

function Status({ value }) {
  const style =
    value.toLowerCase() === "paid" ||
    value.toLowerCase() === "active" ||
    value.toLowerCase() === "success"
      ? "success"
      : value.toLowerCase() === "pending"
        ? "pending"
        : "failed";
  return (
    <span className={`bu-status bu-status-${style}`}>
      <i />
      {value}
    </span>
  );
}

function DataTable({ headings, children, empty }) {
  return (
    <div className="bu-table-scroll">
      <table className="bu-table">
        <thead>
          <tr>
            {headings.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      {empty && <div className="bu-empty">No matching records found.</div>}
    </div>
  );
}

function PaymentRows({ records }) {
  return records.map((item) => (
    <tr key={item.id}>
      <td>
        <Person name={item.name} email={item.email} />
      </td>
      <td>
        <span className="bu-plan-name">{item.plan}</span>
        <small className="bu-id">{item.id}</small>
      </td>
      <td className="bu-amount">{money(item.amount)}</td>
      <td>
        <span className="bu-muted">{item.method}</span>
      </td>
      <td>
        <Status value={item.status} />
      </td>
      <td className="bu-muted bu-nowrap">{item.date}</td>
    </tr>
  ));
}

function UserRows({ records }) {
  return records.map((item) => (
    <tr key={item.id}>
      <td>
        <Person name={item.name} email={item.email} />
      </td>
      <td className="bu-muted bu-nowrap">{item.joined}</td>
      <td className="bu-muted bu-nowrap">{item.lastLogin}</td>
      <td className="bu-amount">{item.logins}</td>
      <td>
        <Status value={item.status} />
      </td>
    </tr>
  ));
}

function DownloadCsvButton({ records }) {
  const download = () => {
    const rows = [
      [
        "Payment ID",
        "Customer",
        "Email",
        "Plan",
        "Amount INR",
        "Method",
        "Status",
        "Date",
        "Demo Reference",
      ],
      ...records.map((p) => [
        p.id,
        p.name,
        p.email,
        p.plan,
        p.amount,
        p.method,
        p.status,
        p.date,
        p.reference,
      ]),
    ];
    const escapeCell = (value) => {
      const string = String(value ?? "");
      const safe = /^[=+@\-\t\r]/.test(string) ? `'${string}` : string;
      return `"${safe.replace(/"/g, '""')}"`;
    };
    const csv = rows.map((row) => row.map(escapeCell).join(",")).join("\r\n");
    const url = URL.createObjectURL(
      new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "bundleupott-demo-payments.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };
  return (
    <button type="button" className="bu-outline-button" onClick={download}>
      <ArrowDownToLine size={16} /> Export CSV
    </button>
  );
}

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("All");

  const query = search.trim().toLowerCase();
  const match = (...values) =>
    !query ||
    values.some((value) => String(value).toLowerCase().includes(query));

  const visiblePayments = useMemo(
    () =>
      payments.filter(
        (p) =>
          (paymentStatus === "All" || p.status === paymentStatus) &&
          match(p.name, p.email, p.id, p.plan, p.status),
      ),
    [query, paymentStatus],
  );
  const visibleUsers = useMemo(
    () => users.filter((u) => match(u.name, u.email, u.id, u.status)),
    [query],
  );
  const visibleSubscriptions = useMemo(
    () => subscriptions.filter((s) => match(s.name, s.id, s.plan, s.status)),
    [query],
  );
  const visibleLogins = useMemo(
    () => loginEvents.filter((e) => match(e.name, e.email, e.device, e.result)),
    [query],
  );

  const confirmedPayments = payments.filter((item) => item.status === "Paid");
  const revenue = confirmedPayments.reduce(
    (total, item) => total + item.amount,
    0,
  );
  const pendingCount = payments.filter(
    (item) => item.status === "Pending",
  ).length;
  const activeSubs = subscriptions.filter(
    (item) => item.status === "Active",
  ).length;
  const [title, description] = titles[activePage];
  const maxChart = Math.max(...chartData.map((item) => item.amount));

  const navigate = (page) => {
    setActivePage(page);
    setSearch("");
    setPaymentStatus("All");
    window.lenis?.scrollTo?.(0, { immediate: true });
    window.scrollTo(0, 0);
  };

  return (
    <div className="bu-admin-app">
      <AdminSidebar
        activePage={activePage}
        onNavigate={navigate}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        counts={{ payments: payments.length, users: users.length }}
      />

      <div className="bu-admin-main">
        <header className="bu-topbar">
          <div className="bu-topbar-start">
            <button
              className="bu-mobile-toggle"
              aria-label="Open sidebar"
              type="button"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>
            <div className="bu-breadcrumb">
              <LayoutDashboard size={16} />
              <span>Workspace</span>
              <b>/</b>
              <strong>{activePage === "overview" ? "Overview" : title}</strong>
            </div>
          </div>
          <div className="bu-topbar-actions">
            <span className="bu-live-demo">
              <i /> DEMO MODE
            </span>
            <span className="bu-admin-account">
              <span className="bu-admin-avatar">AD</span>
              <span>
                Admin <small>Preview account</small>
              </span>
            </span>
          </div>
        </header>

        <main className="bu-admin-content">
          <div className="bu-page-heading">
            <div>
              <p className="bu-overline">BUNDLEUPOTT / ADMIN</p>
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
            <div className="bu-date-pill">
              <CalendarDays size={17} />
              <span>22 Oct 2026 · Sample data</span>
            </div>
          </div>

          <div className="bu-demo-banner">
            <ShieldAlert size={19} />
            <span>
              <strong>Frontend-only preview.</strong> All names, payments, login
              history and subscription records below are fictional examples. No
              backend is connected.
            </span>
          </div>

          {activePage === "overview" && (
            <>
              <section
                className="bu-stats-grid"
                aria-label="Summary statistics"
              >
                <div className="bu-stat-card">
                  <div className="bu-stat-icon bu-blue">
                    <IndianRupee size={23} />
                  </div>
                  <div className="bu-stat-caption">
                    Confirmed revenue <TrendingUp size={16} />
                  </div>
                  <strong>{money(revenue)}</strong>
                  <small>
                    From {confirmedPayments.length} sample paid orders
                  </small>
                </div>
                <div className="bu-stat-card">
                  <div className="bu-stat-icon bu-cyan">
                    <UsersRound size={23} />
                  </div>
                  <div className="bu-stat-caption">
                    Registered users <ArrowUpRight size={16} />
                  </div>
                  <strong>{users.length}</strong>
                  <small>Sample customer accounts</small>
                </div>
                <div className="bu-stat-card">
                  <div className="bu-stat-icon bu-mint">
                    <CheckCircle2 size={23} />
                  </div>
                  <div className="bu-stat-caption">
                    Active bundles <ArrowUpRight size={16} />
                  </div>
                  <strong>{activeSubs}</strong>
                  <small>Sample active subscriptions</small>
                </div>
                <div className="bu-stat-card">
                  <div className="bu-stat-icon bu-amber">
                    <Clock3 size={23} />
                  </div>
                  <div className="bu-stat-caption">
                    Pending payments <ArrowUpRight size={16} />
                  </div>
                  <strong>{pendingCount}</strong>
                  <small>Need verification later</small>
                </div>
              </section>

              <section className="bu-overview-grid">
                <div className="bu-panel bu-chart-panel">
                  <div className="bu-panel-heading">
                    <div>
                      <h2>Payment overview</h2>
                      <p>Illustrative activity for the past 7 days</p>
                    </div>
                    <span className="bu-panel-chip">
                      <Activity size={14} /> Demo chart
                    </span>
                  </div>
                  <div className="bu-chart-header">
                    <strong>
                      {money(chartData.reduce((s, d) => s + d.amount, 0))}
                    </strong>
                    <span>Sample 7-day total</span>
                  </div>
                  <div
                    className="bu-chart-grid"
                    aria-label="Sample revenue chart"
                  >
                    {chartData.map((item) => (
                      <div className="bu-chart-col" key={item.day}>
                        <div className="bu-chart-bar-track">
                          <div
                            className="bu-chart-bar"
                            style={{
                              height: `${Math.max(7, (item.amount / maxChart) * 100)}%`,
                            }}
                            title={`${item.day}: ${money(item.amount)}`}
                          />
                        </div>
                        <span>{item.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bu-panel bu-quick-panel">
                  <div className="bu-panel-heading">
                    <div>
                      <h2>Quick access</h2>
                      <p>Jump to a workspace section</p>
                    </div>
                    <Sparkles size={20} className="bu-sparkle" />
                  </div>
                  {[
                    {
                      page: "payments",
                      icon: CreditCard,
                      name: "Review payments",
                      detail: `${pendingCount} pending sample payments`,
                    },
                    {
                      page: "users",
                      icon: UsersRound,
                      name: "View customers",
                      detail: `${users.length} demo users`,
                    },
                    {
                      page: "logins",
                      icon: Activity,
                      name: "Login history",
                      detail: "Recent sign-in events",
                    },
                  ].map(({ page, icon: Icon, name, detail }) => (
                    <button
                      type="button"
                      key={page}
                      className="bu-quick-link"
                      onClick={() => navigate(page)}
                    >
                      <span className="bu-quick-icon">
                        <Icon size={19} />
                      </span>
                      <span>
                        <strong>{name}</strong>
                        <small>{detail}</small>
                      </span>
                      <ArrowRight size={18} />
                    </button>
                  ))}
                </div>
              </section>

              <section className="bu-panel bu-list-panel">
                <div className="bu-panel-heading">
                  <div>
                    <h2>Recent payments</h2>
                    <p>Who paid and which bundles they selected</p>
                  </div>
                  <button
                    type="button"
                    className="bu-text-action"
                    onClick={() => navigate("payments")}
                  >
                    View all <ArrowRight size={16} />
                  </button>
                </div>
                <DataTable
                  headings={[
                    "Customer",
                    "Bundle / Order",
                    "Amount",
                    "Method",
                    "Status",
                    "Date",
                  ]}
                >
                  <PaymentRows records={payments.slice(0, 5)} />
                </DataTable>
              </section>
              <section className="bu-panel bu-list-panel">
                <div className="bu-panel-heading">
                  <div>
                    <h2>Recent users</h2>
                    <p>See who registered and when they last logged in</p>
                  </div>
                  <button
                    type="button"
                    className="bu-text-action"
                    onClick={() => navigate("users")}
                  >
                    View all <ArrowRight size={16} />
                  </button>
                </div>
                <DataTable
                  headings={[
                    "Customer",
                    "Joined",
                    "Last login",
                    "Total logins",
                    "Status",
                  ]}
                >
                  <UserRows records={users.slice(0, 5)} />
                </DataTable>
              </section>
            </>
          )}

          {activePage === "payments" && (
            <section className="bu-panel bu-list-panel">
              <div className="bu-panel-heading">
                <div>
                  <h2>
                    All payments{" "}
                    <span className="bu-count">{visiblePayments.length}</span>
                  </h2>
                  <p>Paid means confirmed in this fictional demo only.</p>
                </div>
                <DownloadCsvButton records={visiblePayments} />
              </div>
              <div className="bu-table-toolbar">
                <label className="bu-search-field">
                  <Search size={17} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search customer, plan, order ID..."
                  />
                </label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  aria-label="Filter by payment status"
                >
                  <option>All</option>
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Failed</option>
                </select>
              </div>
              <DataTable
                headings={[
                  "Customer",
                  "Bundle / Order",
                  "Amount",
                  "Method",
                  "Status",
                  "Date",
                ]}
                empty={!visiblePayments.length}
              >
                <PaymentRows records={visiblePayments} />
              </DataTable>
            </section>
          )}

          {activePage === "users" && (
            <section className="bu-panel bu-list-panel">
              <div className="bu-panel-heading">
                <div>
                  <h2>
                    All users{" "}
                    <span className="bu-count">{visibleUsers.length}</span>
                  </h2>
                  <p>Registered customers and last login information.</p>
                </div>
              </div>
              <div className="bu-table-toolbar">
                <label className="bu-search-field">
                  <Search size={17} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search user name or email..."
                  />
                </label>
              </div>
              <DataTable
                headings={[
                  "Customer",
                  "Joined",
                  "Last login",
                  "Total logins",
                  "Status",
                ]}
                empty={!visibleUsers.length}
              >
                <UserRows records={visibleUsers} />
              </DataTable>
            </section>
          )}

          {activePage === "subscriptions" && (
            <section className="bu-panel bu-list-panel">
              <div className="bu-panel-heading">
                <div>
                  <h2>
                    Subscription bundles{" "}
                    <span className="bu-count">
                      {visibleSubscriptions.length}
                    </span>
                  </h2>
                  <p>Sample activation and renewal dates.</p>
                </div>
              </div>
              <div className="bu-table-toolbar">
                <label className="bu-search-field">
                  <Search size={17} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search customer or bundle..."
                  />
                </label>
              </div>
              <DataTable
                headings={[
                  "Customer",
                  "Bundle / ID",
                  "Monthly price",
                  "Activated",
                  "Next renewal",
                  "Status",
                ]}
                empty={!visibleSubscriptions.length}
              >
                {visibleSubscriptions.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.name}</strong>
                    </td>
                    <td>
                      <span className="bu-plan-name">{item.plan}</span>
                      <small className="bu-id">{item.id}</small>
                    </td>
                    <td className="bu-amount">{money(item.amount)}</td>
                    <td className="bu-muted bu-nowrap">{item.started}</td>
                    <td className="bu-muted bu-nowrap">{item.renewal}</td>
                    <td>
                      <Status value={item.status} />
                    </td>
                  </tr>
                ))}
              </DataTable>
            </section>
          )}

          {activePage === "logins" && (
            <section className="bu-panel bu-list-panel">
              <div className="bu-panel-heading">
                <div>
                  <h2>
                    Login history{" "}
                    <span className="bu-count">{visibleLogins.length}</span>
                  </h2>
                  <p>
                    Sample success/failure records. Real logs require
                    authentication APIs.
                  </p>
                </div>
              </div>
              <div className="bu-table-toolbar">
                <label className="bu-search-field">
                  <Search size={17} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search user or device..."
                  />
                </label>
              </div>
              <DataTable
                headings={["User", "Date", "Time", "Device", "Login result"]}
                empty={!visibleLogins.length}
              >
                {visibleLogins.map((item, index) => (
                  <tr key={`${item.email}-${index}`}>
                    <td>
                      <Person name={item.name} email={item.email} />
                    </td>
                    <td className="bu-muted bu-nowrap">{item.date}</td>
                    <td className="bu-muted bu-nowrap">{item.time}</td>
                    <td className="bu-muted">{item.device}</td>
                    <td>
                      <Status value={item.result} />
                    </td>
                  </tr>
                ))}
              </DataTable>
            </section>
          )}

          {activePage === "settings" && (
            <section className="bu-settings-grid">
              <div className="bu-panel bu-settings-card">
                <span className="bu-setting-icon">
                  <ShieldAlert size={27} />
                </span>
                <h2>Backend not connected</h2>
                <p>
                  This screen is a design preview. Real payment validation,
                  admin login protection and live user activity will be
                  connected in the backend phase.
                </p>
                <span className="bu-setting-tag">Preview only</span>
              </div>
              <div className="bu-panel bu-settings-card">
                <span className="bu-setting-icon">
                  <CheckCircle2 size={27} />
                </span>
                <h2>Ready for integration</h2>
                <p>
                  The sidebar, responsive tables, filters, CSV export and
                  dashboard views are ready to connect to real APIs later.
                </p>
                <span className="bu-setting-tag">Frontend ready</span>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
