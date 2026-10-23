import React from "react";
import {
  LayoutDashboard,
  CreditCard,
  UsersRound,
  Boxes,
  LogIn,
  Settings2,
  X,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const menuItems = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "payments", label: "Payments", icon: CreditCard },
  { key: "users", label: "Users", icon: UsersRound },
  { key: "subscriptions", label: "Subscriptions", icon: Boxes },
  { key: "logins", label: "Login Activity", icon: LogIn },
  { key: "settings", label: "Settings", icon: Settings2 },
];

export default function AdminSidebar({
  activePage,
  onNavigate,
  isOpen,
  onClose,
  counts,
}) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="bu-sidebar-overlay"
          aria-label="Close sidebar"
          onClick={onClose}
        />
      )}

      <aside className={`bu-sidebar ${isOpen ? "bu-sidebar-open" : ""}`}>
        <div className="bu-sidebar-brand">
          <span className="bu-brand-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none">
              <path
                d="M9 5 34 20 9 35V5Z"
                stroke="currentColor"
                strokeWidth="4.5"
                strokeLinejoin="round"
              />
              <path d="m15 13 11 7-11 7V13Z" fill="currentColor" />
            </svg>
          </span>
          <span className="bu-brand-words">
            <strong>
              bundle<span>upott</span>
            </strong>
            <small>ADMIN CONSOLE</small>
          </span>
          <button
            type="button"
            className="bu-sidebar-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="bu-sidebar-label">WORKSPACE</div>

        <nav className="bu-sidebar-nav" aria-label="Admin navigation">
          {menuItems.map(({ key, label, icon: Icon }) => (
            <button
              type="button"
              key={key}
              onClick={() => {
                onNavigate(key);
                onClose();
              }}
              aria-current={activePage === key ? "page" : undefined}
              className={`bu-nav-item ${activePage === key ? "bu-nav-active" : ""}`}
            >
              <Icon size={19} strokeWidth={1.9} />
              <span>{label}</span>
              {key === "payments" && <em>{counts.payments}</em>}
              {key === "users" && <em>{counts.users}</em>}
            </button>
          ))}
        </nav>

        <div className="bu-sidebar-bottom">
          <div className="bu-sidebar-security">
            <ShieldCheck size={21} />
            <div>
              <strong>Live payment review</strong>
              <p>Protected admin controls for live payment review.</p>
            </div>
          </div>
          <a className="bu-back-site" href="/">
            View website <ArrowUpRight size={17} />
          </a>
        </div>
      </aside>
    </>
  );
}

