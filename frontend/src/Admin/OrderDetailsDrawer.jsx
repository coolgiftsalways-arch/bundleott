import React, { useEffect, useState } from "react";
import { Check, ChevronDown, Copy, Mail, MessageCircle, Phone, ShieldCheck, X, XCircle } from "lucide-react";

const money = (n, currency = "INR") =>
  n === undefined || n === null || n === ""
    ? "—"
    : new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 2 }).format(Number(n));

const when = (v) =>
  v && !Number.isNaN(new Date(v).getTime())
    ? new Date(v).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "—";

const ago = (v) => {
  const t = new Date(v).getTime();
  if (!v || Number.isNaN(t)) return "";
  const s = Math.round((Date.now() - t) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  return `${Math.floor(s / 86400)} d ago`;
};

const statusLabel = (s) => (s === "rejected" ? "Failed" : s ? s.charAt(0).toUpperCase() + s.slice(1) : "Unknown");
const tone = (s) => (s === "paid" ? "success" : s === "pending" ? "pending" : "failed");

function CopyButton({ value, label = "Copy" }) {
  const [done, setDone] = useState(false);
  if (!value) return null;
  const copy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(String(value));
      setDone(true);
      setTimeout(() => setDone(false), 1200);
    } catch { /* clipboard blocked */ }
  };
  return (
    <button type="button" className="bu-od-copy" onClick={copy} title={label} aria-label={label}>
      {done ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
}

function Row({ label, value, copy, mono }) {
  const empty = value === undefined || value === null || value === "" || value === "—";
  return (
    <div className="bu-od-row">
      <dt>{label}</dt>
      <dd className={`${mono ? "bu-od-mono" : ""} ${empty ? "bu-od-empty" : ""}`}>
        <span>{empty ? "—" : value}</span>
        {copy && !empty && <CopyButton value={typeof copy === "string" ? copy : value} label={`Copy ${label}`} />}
      </dd>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="bu-od-section">
      <h4>{title}</h4>
      <dl>{children}</dl>
    </section>
  );
}

export default function OrderDetailsDrawer({ order, onClose, onVerify, onMarkFailed, onSendEmail, emailBusy, statusBusy }) {
  const [showRaw, setShowRaw] = useState(false);

  useEffect(() => {
    if (!order) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [order, onClose]);

  useEffect(() => setShowRaw(false), [order?.orderId]);

  if (!order) return null;

  const o = order;
  const cur = o.currency || "INR";
  const items = Array.isArray(o.items) ? o.items : [];
  const digits = String(o.customerMobile || "").replace(/\D/g, "");
  const waNumber = digits.length === 10 ? `91${digits}` : digits;
  const emailKind = o.status === "paid" ? "success" : o.status === "rejected" ? "failure" : null;
  const emailSent =
    (emailKind === "success" && o.successEmailSentAt) ||
    (emailKind === "failure" && o.failureEmailSentAt) ||
    (o.paymentEmailStatus === "sent" && o.paymentEmailType === emailKind ? o.paymentEmailSentAt || true : null);

  const timeline = [
    { label: "Order created", at: o.createdAt },
    { label: `Customer submitted reference${o.customerClaimedReference ? ` (${o.customerClaimedReference})` : ""}`, at: o.customerClaimedAt },
    { label: o.status === "paid" ? `Marked paid by ${o.verifiedBy || "admin"}` : o.status === "rejected" ? `Marked failed by ${o.verifiedBy || "admin"}` : null, at: o.verifiedAt },
    { label: `Status email sent (${o.paymentEmailType || "status"})`, at: o.paymentEmailSentAt },
    { label: "Success email sent", at: o.successEmailSentAt },
    { label: "Failure email sent", at: o.failureEmailSentAt },
    { label: "Last updated", at: o.updatedAt },
  ]
    .filter((t) => t.label && t.at && !Number.isNaN(new Date(t.at).getTime()))
    .sort((a, b) => new Date(a.at) - new Date(b.at));

  const { __v, accessTokenHash, ...raw } = o; // never show hashes

  const summaryText = [
    `Order: ${o.orderId}`,
    `Status: ${statusLabel(o.status)}`,
    `Customer: ${o.customerName || ""} <${o.customerEmail || ""}> ${o.customerMobile || ""}`,
    `Plan: ${o.planName || o.planId || ""}`,
    `Amount: ${money(o.amount, cur)}${o.couponCode ? ` (coupon ${o.couponCode})` : ""}`,
    o.customerClaimedReference ? `Customer UTR: ${o.customerClaimedReference}` : "",
    o.bankReference ? `Bank ref: ${o.bankReference}` : "",
    `Created: ${when(o.createdAt)}`,
  ].filter(Boolean).join("\n");

  return (
    <div className="bu-od-overlay" onClick={onClose} role="presentation">
      <aside className="bu-od-drawer" role="dialog" aria-modal="true" aria-label={`Order ${o.orderId}`} onClick={(e) => e.stopPropagation()}>
        <header className="bu-od-head">
          <div className="bu-od-head-main">
            <span className={`bu-status bu-status-${tone(o.status)}`}><i />{statusLabel(o.status)}</span>
            <h3>{o.customerName || "Customer"}</h3>
            <p className="bu-od-mono">{o.orderId} <CopyButton value={o.orderId} label="Copy order ID" /></p>
          </div>
          <button type="button" className="bu-icon-button" onClick={onClose} aria-label="Close details"><X size={18} /></button>
        </header>

        <div className="bu-od-amount">
          <div>
            <span>Amount payable</span>
            <strong>{money(o.amount, cur)}</strong>
            <small>{o.planName || o.planId} · created {ago(o.createdAt)}</small>
          </div>
          {o.couponCode && <span className="bu-od-chip">Coupon {o.couponCode}</span>}
        </div>

        <div className="bu-od-body">
          <Section title="Customer">
            <Row label="Name" value={o.customerName} copy />
            <Row label="Email" value={o.customerEmail} copy />
            <Row label="Mobile" value={o.customerMobile} copy />
            <div className="bu-od-contact">
              {o.customerEmail && <a href={`mailto:${o.customerEmail}?subject=${encodeURIComponent(`Your order ${o.orderId}`)}`}><Mail size={14} /> Email</a>}
              {digits && <a href={`tel:${o.customerMobile}`}><Phone size={14} /> Call</a>}
              {digits && <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noreferrer"><MessageCircle size={14} /> WhatsApp</a>}
            </div>
          </Section>

          <Section title="Plan & pricing">
            <Row label="Plan" value={o.planName} />
            <Row label="Plan ID" value={o.planId} mono copy />
            {items.length > 0 && (
              <div className="bu-od-items">
                {items.map((it, i) => (
                  <div key={it.id || i} className="bu-od-item">
                    <div><b>{it.name || it.id || `Item ${i + 1}`}</b>{it.category && <small>{it.category}</small>}</div>
                    <span>{money(it.price, cur)}</span>
                  </div>
                ))}
              </div>
            )}
            <Row label="Subtotal" value={o.subtotal !== undefined ? money(o.subtotal, cur) : ""} />
            <Row label="Discount" value={o.discount ? `− ${money(o.discount, cur)}` : ""} />
            <Row label="Before coupon" value={o.preCouponAmount !== undefined ? money(o.preCouponAmount, cur) : ""} />
            <Row label="Coupon code" value={o.couponCode} mono copy />
            <Row label="Coupon discount" value={o.couponDiscount ? `− ${money(o.couponDiscount, cur)}` : ""} />
            <Row label="Final amount" value={money(o.amount, cur)} />
          </Section>

          <Section title="Payment & verification">
            <Row label="Status" value={statusLabel(o.status)} />
            <Row label="Customer UTR / ref" value={o.customerClaimedReference} mono copy />
            <Row label="Claimed at" value={o.customerClaimedAt ? when(o.customerClaimedAt) : ""} />
            <Row label="Bank reference" value={o.bankReference} mono copy />
            <Row label="Matched alert" value={o.matchedAlertEventId} mono copy />
            <Row label="Verified / updated by" value={o.verifiedBy} />
            <Row label="Verified at" value={o.verifiedAt ? when(o.verifiedAt) : ""} />
            <Row label="Note" value={o.verificationNote} />
          </Section>

          <Section title="Customer emails">
            <Row label="Email status" value={o.paymentEmailStatus} />
            <Row label="Email type" value={o.paymentEmailType} />
            <Row label="Sent at" value={o.paymentEmailSentAt ? when(o.paymentEmailSentAt) : ""} />
            <Row label="Success email" value={o.successEmailSentAt ? when(o.successEmailSentAt) : ""} />
            <Row label="Failure email" value={o.failureEmailSentAt ? when(o.failureEmailSentAt) : ""} />
            <Row label="Message ID" value={o.paymentEmailMessageId} mono copy />
            {o.paymentEmailError && <p className="bu-od-error">{o.paymentEmailError}</p>}
          </Section>

          <section className="bu-od-section">
            <h4>Timeline</h4>
            <ol className="bu-od-timeline">
              {timeline.map((t, i) => (
                <li key={i}><b>{t.label}</b><small>{when(t.at)} · {ago(t.at)}</small></li>
              ))}
            </ol>
          </section>

          <section className="bu-od-section">
            <button type="button" className="bu-od-raw-toggle" onClick={() => setShowRaw((v) => !v)} aria-expanded={showRaw}>
              <ChevronDown size={15} style={{ transform: showRaw ? "rotate(180deg)" : "none" }} /> All stored fields (raw)
            </button>
            {showRaw && <pre className="bu-od-raw">{JSON.stringify(raw, null, 2)}</pre>}
          </section>
        </div>

        <footer className="bu-od-foot">
          {o.status === "pending" && (
            <>
              <button type="button" className="bu-admin-primary-button" onClick={() => onVerify(o)}><ShieldCheck size={15} /> Verify payment</button>
              <button type="button" className="bu-admin-secondary-button bu-od-danger" disabled={statusBusy} onClick={() => onMarkFailed(o)}><XCircle size={15} /> {statusBusy ? "Updating…" : "Mark failed"}</button>
            </>
          )}
          {emailKind && !emailSent && (
            <button type="button" className="bu-admin-primary-button" disabled={emailBusy} onClick={() => onSendEmail(o)}>
              <Mail size={15} /> {emailBusy ? "Sending…" : `Send ${emailKind} email`}
            </button>
          )}
          {emailKind && emailSent && <span className="bu-muted">Email already sent</span>}
          <button type="button" className="bu-admin-secondary-button" onClick={() => navigator.clipboard?.writeText(summaryText)}><Copy size={15} /> Copy summary</button>
        </footer>
      </aside>
    </div>
  );
}