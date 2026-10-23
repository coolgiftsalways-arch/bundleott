
// Pure candidate-matching logic. This ranks possible matches only.
// NEVER use its output to mark an order paid.

const MAX_LOOKBACK_MS = 24 * 60 * 60 * 1000;
const CLOCK_SKEW_MS = 5 * 60 * 1000;

export function normalizeReference(value) {
  return String(value || "").trim().toUpperCase().replace(/\s+/g, "");
}

export function suggestMatches(alert, orders, limit = 8) {
  if (!alert || alert.isTest || !Number.isFinite(alert.amountHint)) {
    return { assessment: "not_matchable", candidates: [] };
  }

  const alertAt = new Date(alert.occurredAt || alert.createdAt).getTime();
  if (!Number.isFinite(alertAt)) {
    return { assessment: "not_matchable", candidates: [] };
  }

  const candidates = [];

  for (const order of orders) {
    if (order.status !== "pending" || Number(order.amount) !== Number(alert.amountHint)) continue;

    const orderAt = new Date(order.createdAt).getTime();
    if (!Number.isFinite(orderAt)) continue;
    const elapsed = alertAt - orderAt;

    // Bank SMS can arrive late. Keep older matches for review but never auto-confirm.
    if (elapsed < -CLOCK_SKEW_MS || elapsed > MAX_LOOKBACK_MS) continue;

    const referenceMatches = Boolean(
      alert.referenceHint &&
      order.customerClaimedReference &&
      normalizeReference(alert.referenceHint) === normalizeReference(order.customerClaimedReference)
    );

    let score = 40; // exact amount (weak, especially for fixed plan prices)
    const reasons = ["Exact amount"];

    if (elapsed >= -CLOCK_SKEW_MS && elapsed <= 5 * 60 * 1000) {
      score += 20;
      reasons.push("Within 5 minutes");
    } else if (elapsed <= 30 * 60 * 1000) {
      score += 10;
      reasons.push("Within 30 minutes");
    } else if (elapsed <= 2 * 60 * 60 * 1000) {
      score += 5;
      reasons.push("Within 2 hours");
    }

    if (referenceMatches) {
      score += 40;
      reasons.push("Customer-entered reference matches alert reference (unverified)");
    }

    candidates.push({
      orderId: order.orderId,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerMobile: order.customerMobile || "",
      planId: order.planId,
      planName: order.planName,
      amount: order.amount,
      createdAt: order.createdAt,
      score,
      referenceMatches,
      reasons,
    });
  }

  candidates.sort((a, b) => b.score - a.score || new Date(b.createdAt) - new Date(a.createdAt));

  const assessment = candidates.length === 0
    ? "unmatched"
    : candidates.length === 1
      ? "single_candidate_unverified"
      : "ambiguous_multiple_candidates";

  return { assessment, candidates: candidates.slice(0, limit), totalCandidates: candidates.length };
}
