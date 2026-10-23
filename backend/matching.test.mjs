
import test from "node:test";
import assert from "node:assert/strict";
import { suggestMatches } from "./matching.js";

const at = new Date("2026-10-23T10:10:00Z");

const order = (
  orderId,
  amount,
  claimed = "",
  created = "2026-10-23T10:05:00Z"
) => ({
  orderId,
  amount,
  customerName: orderId,
  customerEmail: "test@example.com",
  planId: "starter",
  planName: "Starter",
  status: "pending",
  customerClaimedReference: claimed,
  createdAt: new Date(created),
});

const alert = (amount, ref = "") => ({
  amountHint: amount,
  occurredAt: at,
  referenceHint: ref,
  isTest: false,
});

test("exact amount yields a candidate, never paid", () => {
  const r = suggestMatches(alert(199), [order("a", 199)]);
  assert.equal(r.assessment, "single_candidate_unverified");
  assert.equal(r.candidates[0].orderId, "a");
});

test("same amount for two orders remains ambiguous", () => {
  const r = suggestMatches(alert(199), [
    order("a", 199),
    order("b", 199),
  ]);

  assert.equal(r.assessment, "ambiguous_multiple_candidates");
  assert.equal(r.totalCandidates, 2);
});

test("customer-claimed reference is only a ranked hint", () => {
  const r = suggestMatches(alert(199, "123456789012"), [
    order("a", 199),
    order("b", 199, "123456789012"),
  ]);

  assert.equal(r.assessment, "ambiguous_multiple_candidates");
  assert.equal(r.candidates[0].orderId, "b");
  assert.equal(r.candidates[0].referenceMatches, true);
});

test("wrong amount, paid order or test event has no candidate", () => {
  assert.equal(
    suggestMatches(alert(399), [order("a", 199)]).assessment,
    "unmatched"
  );

  assert.equal(
    suggestMatches(
      { ...alert(199), isTest: true },
      [order("a", 199)]
    ).assessment,
    "not_matchable"
  );

  assert.equal(
    suggestMatches(
      alert(199),
      [{ ...order("a", 199), status: "paid" }]
    ).assessment,
    "unmatched"
  );
});
