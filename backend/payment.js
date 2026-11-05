import express from "express";
import crypto from "node:crypto";
import QRCode from "qrcode";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { rateLimit } from "express-rate-limit";
import { PaymentOrder, PaymentAlert } from "./models.js";
import { suggestMatches, normalizeReference } from "./matching.js";
import { quoteBundle, PUBLIC_CATALOG } from "./catalog.js";
import nodemailer from "nodemailer";

const router = express.Router();

// ==========================================
// PLANS
// ==========================================

const PLANS = Object.freeze({
  starter: { name: "Starter", amount: 199 },
  plus: { name: "Plus", amount: 399 },
  premium: { name: "Premium", amount: 799 },
});

// ==========================================
// RATE LIMITERS
// ==========================================

const publicLimit = rateLimit({
  windowMs: 60_000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

const loginLimit = rateLimit({
  windowMs: 15 * 60_000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

const webhookLimit = rateLimit({
  windowMs: 60_000,
  limit: 120,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

// ==========================================
// HELPERS
// ==========================================

function tokenHash(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex");
}

function safeEqual(a, b) {
  const x = Buffer.from(String(a || ""));
  const y = Buffer.from(String(b || ""));

  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

function csvList(value) {
  return String(value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalizeSender(value) {
  return String(value || "")
    .trim()
    .toUpperCase();
}

function publicOrder(order) {
  return {
    orderId: order.orderId,
    planId: order.planId,
    planName: order.planName,
    items: order.items || [],
    subtotal: order.subtotal ?? null,
    discount: order.discount || 0,
    preCouponAmount: order.preCouponAmount ?? order.amount,
    couponCode: order.couponCode || "",
    couponDiscount: order.couponDiscount || 0,
    amount: order.amount,
    currency: order.currency,
    status: order.status,
    createdAt: order.createdAt,
    paymentReview:
      order.status === "pending"
        ? order.customerClaimedReference
          ? "reference_submitted_unverified"
          : "awaiting_payment_or_review"
        : order.status,
  };
}

// ==========================================
// AUTHENTICATION
// ==========================================

function authenticateWebhook(req, res, next) {
  if (
    !safeEqual(req.get("authorization"), `Bearer ${process.env.WEBHOOK_TOKEN}`)
  ) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized webhook",
    });
  }

  next();
}

function authenticateAdmin(req, res, next) {
  const auth = req.get("authorization") || "";

  if (!auth.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Admin authentication required",
    });
  }

  try {
    const admin = jwt.verify(auth.slice(7), process.env.ADMIN_JWT_SECRET, {
      algorithms: ["HS256"],
    });

    if (admin.role !== "admin") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    req.admin = admin;
    next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired admin token",
    });
  }
}

async function findCustomerOrder(req) {
  const accessToken = req.get("x-order-token");

  if (!accessToken || !/^[0-9a-f]{64}$/.test(accessToken)) {
    return null;
  }

  const order = await PaymentOrder.findOne({
    orderId: req.params.orderId,
  }).select("+accessTokenHash");

  if (!order || !safeEqual(tokenHash(accessToken), order.accessTokenHash)) {
    return null;
  }

  return order;
}

// ==========================================
// RAZORPAY AUTO-VERIFICATION
// ==========================================

const RAZORPAY_API = "https://api.razorpay.com/v1";
const lastRazorpaySync = new Map(); // orderId -> timestamp (throttle API calls)

function razorpayAuthHeader() {
  return `Basic ${Buffer.from(
    `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`,
  ).toString("base64")}`;
}

async function razorpayGet(path) {
  const response = await fetch(`${RAZORPAY_API}${path}`, {
    headers: { Authorization: razorpayAuthHeader() },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.error?.description || `Razorpay HTTP ${response.status}`);
  }
  return data;
}

function hmacHex(secret, payload) {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

// Where Razorpay sends the customer back after paying.
function resolveSiteUrl(req) {
  if (process.env.PUBLIC_SITE_URL) {
    return process.env.PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  const origin = String(req.get("origin") || "").replace(/\/+$/, "");
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) || /^https:\/\/(www\.)?bundleupott\.com$/.test(origin)) {
    return origin;
  }
  return "https://www.bundleupott.com";
}

async function sendRazorpaySuccessEmail(order) {
  const from = process.env.SMTP_FROM;
  if (!from) throw new Error("SMTP_FROM is not configured");
  if (!order.customerEmail) throw new Error("Customer email is missing");

  const amount = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(Number(order.amount));

  return getEmailTransporter().sendMail({
    from,
    to: order.customerEmail,
    subject: "Payment Successful — BundleUpOTT",
    text: [
      `Hi ${order.customerName},`,
      "",
      "We have received your payment. Thank you!",
      "",
      `Order ID: ${order.orderId}`,
      `Subscription: ${order.planName}`,
      `Amount: ${amount}`,
      `Payment ID: ${order.razorpayPaymentId || "-"}`,
      "Payment status: Successful",
      "",
      "Our team will activate your subscription shortly.",
      "",
      "Regards,",
      "BundleUpOTT Support",
    ].join("\n"),
  });
}

/**
 * Marks a pending order as paid using a Razorpay payment entity.
 * Safe to call many times (webhook + polling + redirect): only the first call changes anything.
 */
async function markOrderPaidFromRazorpay(orderId, payment, source) {
  if (!payment?.id || payment.status !== "captured") return null;

  const existing = await PaymentOrder.findOne({ orderId });
  if (!existing) return null;
  if (existing.status === "paid") return existing;

  const expectedPaise = Math.round(Number(existing.amount) * 100);
  if (Number(payment.amount) !== expectedPaise || String(payment.currency || "INR") !== "INR") {
    console.error("Razorpay amount mismatch", { orderId, expectedPaise, got: payment.amount, currency: payment.currency });
    await PaymentOrder.updateOne(
      { orderId },
      { $set: { razorpayPaymentId: payment.id, verificationNote: `Razorpay payment ${payment.id} amount mismatch (${payment.amount} paise, expected ${expectedPaise}). Check manually.` } },
    );
    return null;
  }

  if (existing.status !== "pending") {
    // e.g. admin already marked it failed, then the customer paid. Keep for admin review.
    await PaymentOrder.updateOne(
      { orderId },
      { $set: { razorpayPaymentId: payment.id, verificationNote: `Razorpay payment ${payment.id} captured AFTER order was marked ${existing.status}. Review / refund.` } },
    );
    return null;
  }

  const rrn = payment.acquirer_data?.rrn || payment.acquirer_data?.upi_transaction_id || "";
  const now = new Date();

  const order = await PaymentOrder.findOneAndUpdate(
    { orderId, status: "pending" },
    {
      $set: {
        status: "paid",
        paidAt: payment.created_at ? new Date(payment.created_at * 1000) : now,
        razorpayPaymentId: payment.id,
        razorpayPaymentMethod: payment.method || "",
        paymentSource: `razorpay_${source}`,
        bankReference: String(rrn || payment.id).toUpperCase(),
        verifiedReferenceKey: `RZP-${payment.id}`.toUpperCase(),
        verifiedBy: "razorpay-auto",
        verifiedAt: now,
        verificationNote: `Auto-verified by Razorpay (${source}). Method: ${payment.method || "-"}${payment.vpa ? `, VPA: ${payment.vpa}` : ""}${rrn ? `, RRN: ${rrn}` : ""}.`,
        paymentEmailStatus: "sending",
        paymentEmailType: "success",
        paymentEmailError: "",
      },
    },
    { new: true },
  );

  if (!order) return PaymentOrder.findOne({ orderId }); // another request won the race

  console.log(`Order ${orderId} marked PAID via Razorpay ${source} (${payment.id})`);

  // Send the confirmation email in the background, don't block the response.
  sendRazorpaySuccessEmail(order)
    .then((info) =>
      PaymentOrder.updateOne(
        { orderId },
        { $set: { paymentEmailStatus: "sent", paymentEmailSentAt: new Date(), successEmailSentAt: new Date(), paymentEmailMessageId: info?.messageId || "" } },
      ),
    )
    .catch((error) => {
      console.error("Razorpay success email failed:", error.message);
      return PaymentOrder.updateOne(
        { orderId },
        { $set: { paymentEmailStatus: "failed", paymentEmailError: String(error.message).slice(0, 500) } },
      );
    });

  return order;
}

/**
 * Asks Razorpay directly whether the order's payment link is paid.
 * Used by the customer status poll, so it works even without webhooks (e.g. on localhost).
 */
async function syncOrderWithRazorpay(order, { force = false } = {}) {
  if (!order || order.status !== "pending" || !order.razorpayPaymentLinkId) return order;

  const last = lastRazorpaySync.get(order.orderId) || 0;
  if (!force && Date.now() - last < 4000) return order;
  lastRazorpaySync.set(order.orderId, Date.now());

  const link = await razorpayGet(`/payment_links/${encodeURIComponent(order.razorpayPaymentLinkId)}`);
  if (link.reference_id && link.reference_id !== order.orderId) return order;

  const captured = (link.payments || []).find((p) => p.status === "captured");
  if (link.status !== "paid" && !captured) return order;
  if (!captured?.payment_id) return order;

  const payment = await razorpayGet(`/payments/${encodeURIComponent(captured.payment_id)}`);
  return (await markOrderPaidFromRazorpay(order.orderId, payment, "poll")) || order;
}

// ==========================================
// EMAIL HELPERS
// ==========================================

function getEmailTransporter() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;

  const port = Number(process.env.SMTP_PORT || 587);

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP configuration is incomplete");
  }

  if (![465, 587].includes(port)) {
    throw new Error("SMTP_PORT must be 465 or 587");
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

// Email for manually approved or rejected orders.
async function sendManualStatusEmail(order, status) {
  const from = process.env.SMTP_FROM;

  if (!from) {
    throw new Error("SMTP_FROM is not configured");
  }

  if (!order.customerEmail) {
    throw new Error("Customer email is missing");
  }

  const transporter = getEmailTransporter();

  const amount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(Number(order.amount));

  const paid = status === "paid";

  const subject = paid
    ? "Payment Successful — BundleUpOTT"
    : "Payment Update — BundleUpOTT";

  const text = paid
    ? [
        `Hi ${order.customerName},`,
        "",
        "Your payment has been manually confirmed by the BundleUpOTT team.",
        "",
        `Order ID: ${order.orderId}`,
        `Subscription: ${order.planName}`,
        `Amount: ${amount}`,
        "Payment status: Successful",
        "",
        "Thank you for choosing BundleUpOTT!",
        "",
        "Regards,",
        "BundleUpOTT Support",
      ].join("\n")
    : [
        `Hi ${order.customerName},`,
        "",
        "We could not confirm your BundleUpOTT payment, and your order has been marked as failed.",
        "",
        `Order ID: ${order.orderId}`,
        `Subscription: ${order.planName}`,
        `Amount: ${amount}`,
        "",
        "If the amount was deducted from your account, please contact our support team with your order ID. Please do not pay again until the transaction has been checked.",
        "",
        "Regards,",
        "BundleUpOTT Support",
      ].join("\n");

  return transporter.sendMail({
    from,
    to: order.customerEmail,
    subject,
    text,
  });
}

// Failure email used by the single and bulk failure-email routes.
async function sendFailureEmail(order, transporter) {
  const from = process.env.SMTP_FROM;

  if (!from) {
    throw new Error("SMTP_FROM is not configured");
  }

  if (!order.customerEmail) {
    throw new Error("Customer email is missing");
  }

  const amount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(Number(order.amount));

  return transporter.sendMail({
    from,
    to: order.customerEmail,
    subject: "Payment Could Not Be Confirmed — BundleUpOTT",
    text: [
      `Hi ${order.customerName},`,
      "",
      "We could not confirm your BundleUpOTT payment.",
      "",
      `Order ID: ${order.orderId}`,
      `Subscription: ${order.planName}`,
      `Amount: ${amount}`,
      "Payment status: Failed",
      "",
      "If money was deducted from your bank account, please contact our support team with your order ID.",
      "",
      "Please do not make another payment until the transaction has been checked.",
      "",
      "Regards,",
      "BundleUpOTT Support",
    ].join("\n"),
  });
}

// ==========================================
// BANK SMS PARSING
// ==========================================

function extractPaymentHints(text) {
  const body = String(text || "").replace(/\u00a0/g, " ");

  const amountMatch =
    body.match(
      /\bcredited\s+with\s+(?:INR|Rs\.?|₹)\s*([\d,]+(?:\.\d{1,2})?)/i,
    ) ||
    body.match(
      /(?:₹|INR|Rs\.?|Rupees)\s*([\d,]+(?:\.\d{1,2})?)\s*(?:has\s+been\s+)?(?:credited|received|deposited)\b/i,
    );

  const upiMatch = body.match(/\btowards\s+UPI\/([A-Z0-9-]{10,30})\//i);

  const referenceMatch = body.match(
    /\b(?:UTR|RRN|UPI\s*(?:REF(?:ERENCE)?|TXN(?:\s*ID)?|TRANSACTION(?:\s*ID)?)|TRANSACTION\s*(?:ID|REF(?:ERENCE)?))\s*(?:NO\.?\s*)?[:#=-]?\s*([A-Z0-9-]{10,30})\b/i,
  );

  const amount = amountMatch ? Number(amountMatch[1].replaceAll(",", "")) : NaN;

  const reference = upiMatch?.[1] || referenceMatch?.[1] || "";

  return {
    amountHint: Number.isFinite(amount) && amount > 0 ? amount : undefined,

    referenceHint: reference ? normalizeReference(reference) : "",
  };
}

function isCreditAlert(text) {
  if (
    /\b(otp|one[ -]?time password|verification code|passcode|cvv|debited|withdrawn|withdrawal)\b/i.test(
      text,
    )
  ) {
    return false;
  }

  return /\b(credited|received|deposited)\b/i.test(text);
}

// ==========================================
// PUBLIC CHECKOUT ROUTES
// ==========================================

router.get("/plans", (req, res) => {
  res.json({
    success: true,
    plans: Object.entries(PLANS).map(([id, p]) => ({
      id,
      ...p,
      currency: "INR",
    })),
  });
});

router.get("/catalog", (req, res) => {
  res.json({
    success: true,
    plans: PUBLIC_CATALOG,
    promotion: {
      netflixPrimeDiscount: 100,
    },
  });
});

// ==========================================
// SERVER-SIDE PRICING
// ==========================================

function buildPricingQuote(input = {}) {
  const { planId, planIds } = input;

  const bundleSelections = Array.isArray(input.selections)
    ? input.selections
    : planIds;

  const isBundle = Array.isArray(bundleSelections);

  const bundle = isBundle ? quoteBundle(bundleSelections) : null;

  if (
    (isBundle && !bundle) ||
    (!isBundle && (typeof planId !== "string" || !Object.hasOwn(PLANS, planId)))
  ) {
    return {
      ok: false,
      status: 400,
      message: "Invalid plan or bundle items",
    };
  }

  const plan = isBundle
    ? {
        name: bundle.name,
        amount: bundle.amount,
      }
    : PLANS[planId];

  const listSubtotal = isBundle
    ? bundle.items.reduce((sum, item) => sum + Number(item.price), 0)
    : Number(plan.amount);

  const bundleDiscount = isBundle ? Number(bundle.discount || 0) : 0;

  const preCouponPaise = Math.round(Number(plan.amount) * 100);

  const subtotalPaise = Math.round(listSubtotal * 100);

  const bundleDiscountPaise = Math.round(bundleDiscount * 100);

  if (
    !Number.isSafeInteger(preCouponPaise) ||
    preCouponPaise < 1 ||
    !Number.isSafeInteger(subtotalPaise) ||
    subtotalPaise < 1 ||
    !Number.isSafeInteger(bundleDiscountPaise) ||
    bundleDiscountPaise < 0
  ) {
    return {
      ok: false,
      status: 400,
      message: "Invalid server-side pricing",
    };
  }

  const couponCode = String(input.couponCode || "")
    .trim()
    .toUpperCase();

  // ---- Test coupon: makes the order cost exactly ₹1 (Razorpay's minimum) ----
  const testCoupon = String(process.env.TEST_COUPON_CODE || "TEST99")
    .trim()
    .toUpperCase();
  const isTestCoupon = Boolean(couponCode) && couponCode === testCoupon;

  if (couponCode && !isTestCoupon) {
    return {
      ok: false,
      status: 400,
      message: "Invalid coupon code",
    };
  }

  if (isTestCoupon) {
    const enabled = process.env.TEST_COUPON_ENABLED !== "false";
    const allowedEmails = String(process.env.TEST_COUPON_EMAILS || "")
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);
    const email = String(input.customerEmail || "").trim().toLowerCase();
    const isProduction = process.env.NODE_ENV === "production";

    // In production only the emails listed in TEST_COUPON_EMAILS may use it.
    if (!enabled || (isProduction && !allowedEmails.includes(email))) {
      return {
        ok: false,
        status: 403,
        message: "This coupon is not available for this account.",
      };
    }
  }

  const TEST_PRICE_PAISE = 100; // ₹1.00
  const couponDiscountPaise = isTestCoupon
    ? Math.max(0, preCouponPaise - TEST_PRICE_PAISE)
    : 0;

  const finalPaise = preCouponPaise - couponDiscountPaise;

  if (!Number.isSafeInteger(finalPaise) || finalPaise < 1) {
    return {
      ok: false,
      status: 400,
      message: "Calculated payment amount is invalid",
    };
  }

  return {
    ok: true,
    isBundle,
    bundle,
    plan,
    subtotal: subtotalPaise / 100,
    discount: bundleDiscountPaise / 100,
    preCouponAmount: preCouponPaise / 100,
    couponCode,
    couponDiscount: couponDiscountPaise / 100,
    amount: finalPaise / 100,
  };
}

// ==========================================
// COUPON VALIDATION
// ==========================================

router.post("/coupons/validate", publicLimit, async (req, res) => {
  try {
    const input = req.body || {};

    if (!String(input.couponCode || "").trim()) {
      return res.status(400).json({
        success: false,
        message: "Enter a coupon code",
      });
    }

    const pricing = buildPricingQuote(input);

    if (!pricing.ok) {
      return res.status(pricing.status).json({
        success: false,
        message: pricing.message,
      });
    }

    return res.json({
      success: true,
      quote: {
        subtotal: pricing.subtotal,
        discount: pricing.discount,
        preCouponAmount: pricing.preCouponAmount,
        couponCode: pricing.couponCode,
        couponDiscount: pricing.couponDiscount,
        amount: pricing.amount,
        currency: "INR",
      },
    });
  } catch (error) {
    console.error("Coupon validation error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to validate coupon",
    });
  }
});

// ==========================================
// CREATE PAYMENT ORDER
// ==========================================

router.post("/orders", publicLimit, async (req, res) => {
  try {
    const { customerName, customerEmail, customerMobile, planId } =
      req.body || {};

    const pricing = buildPricingQuote(req.body || {});

    if (!pricing.ok) {
      return res.status(pricing.status).json({
        success: false,
        message: pricing.message,
      });
    }

    const {
      isBundle,
      bundle,
      plan,
      subtotal,
      discount,
      preCouponAmount,
      couponCode,
      couponDiscount,
      amount,
    } = pricing;

    const name = String(customerName || "").trim();

    const email = String(customerEmail || "")
      .trim()
      .toLowerCase();

    const mobile = String(customerMobile || "")
      .replace(/[\s()-]/g, "")
      .trim();

    if (
      name.length < 2 ||
      name.length > 100 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 254 ||
      (mobile && !/^(?:\+91)?[6-9]\d{9}$/.test(mobile))
    ) {
      return res.status(400).json({
        message: "Valid name, email and mobile (if provided) required",
      });
    }

    // Convert to paise before creating the order.
    const razorpayAmountPaise = Math.round(Number(amount) * 100);

    if (
      !Number.isFinite(Number(amount)) ||
      Number(amount) <= 0 ||
      !Number.isSafeInteger(razorpayAmountPaise) ||
      razorpayAmountPaise < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment amount.",
      });
    }

    // Check credentials before saving a new order.
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("Razorpay credentials are missing.");

      return res.status(500).json({
        success: false,
        message: "Payment gateway is not configured.",
      });
    }

    const accessToken = crypto.randomBytes(32).toString("hex");

    const order = await PaymentOrder.create({
      orderId: crypto.randomUUID(),
      accessTokenHash: tokenHash(accessToken),
      customerName: name,
      customerEmail: email,
      customerMobile: mobile || undefined,
      planId: isBundle ? "custom_bundle" : planId,
      planName: plan.name,
      items: isBundle ? bundle.items : [],
      subtotal,
      discount,
      preCouponAmount,
      couponCode: couponCode || undefined,
      couponDiscount,
      amount,
      currency: "INR",
      status: "pending",
    });

    // ======================================
    // RAZORPAY AMOUNT DIAGNOSTICS
    // ======================================

    console.log("========== RAZORPAY AMOUNT DEBUG ==========");

    console.log("Order ID:", order.orderId);
    console.log("Amount in rupees:", order.amount);
    console.log("Amount in paise:", razorpayAmountPaise);
    console.log("Currency: INR");

    console.log("===========================================");

    // ======================================
    // CREATE RAZORPAY PAYMENT LINK
    // ======================================

    const razorpayResponse = await fetch(
      "https://api.razorpay.com/v1/payment_links",
      {
        method: "POST",

        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`,
          ).toString("base64")}`,

          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          amount: razorpayAmountPaise,
          currency: "INR",
          accept_partial: false,
          reference_id: order.orderId,

          description: `BundleUpOTT order ${order.orderId.slice(0, 8)}`,

          customer: {
            name: order.customerName,
            email: order.customerEmail,

            ...(order.customerMobile
              ? {
                  contact: order.customerMobile,
                }
              : {}),
          },

          notify: {
            sms: false,
            email: false,
          },

          reminder_enable: false,

          callback_url: `${resolveSiteUrl(req)}/order-result`,
          callback_method: "get",

          notes: {
            orderId: order.orderId,
            brand: "BundleUpOTT",
          },
        }),
      },
    );

    const paymentLink = await razorpayResponse.json().catch(() => ({}));

    if (!razorpayResponse.ok || !paymentLink.short_url) {
      console.error("========== RAZORPAY PAYMENT ERROR ==========");

      console.error("HTTP status:", razorpayResponse.status);

      console.error("Order ID:", order.orderId);

      console.error("Amount in rupees:", order.amount);

      console.error("Amount in paise:", razorpayAmountPaise);

      console.error("Razorpay error:", paymentLink?.error);

      console.error("============================================");

      return res.status(502).json({
        success: false,

        message:
          paymentLink?.error?.description ||
          "Unable to create Razorpay payment link.",

        errorCode: paymentLink?.error?.code || null,

        orderId: order.orderId,
      });
    }

    // Generate QR code for the payment page.
    const paymentUrl = paymentLink.short_url;

    const qrCode = await QRCode.toDataURL(paymentUrl, {
      width: 320,
      margin: 2,
    });

    console.log("Razorpay payment link created:", paymentLink.id);

    await PaymentOrder.updateOne(
      { _id: order._id },
      { $set: { razorpayPaymentLinkId: paymentLink.id, razorpayPaymentLinkUrl: paymentUrl } },
    );

    return res.status(201).json({
      success: true,
      order: publicOrder(order),
      accessToken,
      paymentUrl,
      upiUrl: paymentUrl,
      qrCode,
      razorpayPaymentLinkId: paymentLink.id,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create payment order",
    });
  }
});

// ==========================================
// CUSTOMER ORDER STATUS
// ==========================================

router.get("/orders/:orderId/status", publicLimit, async (req, res) => {
  try {
    let order = await findCustomerOrder(req);

    if (!order) {
      return res.status(404).json({
        message: "Order not found or unauthorized",
      });
    }

    // Ask Razorpay directly if the customer has paid (works even without webhooks).
    if (order.status === "pending") {
      try {
        order = await syncOrderWithRazorpay(order);
      } catch (error) {
        console.error("Razorpay sync failed:", error.message);
      }
    }

    return res.json({
      success: true,
      order: { ...publicOrder(order), paymentId: order.razorpayPaymentId || "" },
      paymentSuccessful: order.status === "paid",
    });
  } catch {
    return res.status(500).json({
      message: "Unable to check payment status",
    });
  }
});

// ==========================================
// CUSTOMER PAYMENT REFERENCE
// ==========================================

router.post("/orders/:orderId/claim", publicLimit, async (req, res) => {
  try {
    const order = await findCustomerOrder(req);

    if (!order) {
      return res.status(404).json({
        message: "Order not found or unauthorized",
      });
    }

    if (order.status !== "pending") {
      return res.status(409).json({
        message: "Order is not pending",
      });
    }

    const reference = normalizeReference(req.body?.upiReference);

    if (!/^[A-Z0-9-]{10,30}$/.test(reference)) {
      return res.status(400).json({
        message: "Enter a valid UPI reference (10–30 letters/digits)",
      });
    }

    if (
      order.customerClaimedReference &&
      order.customerClaimedReference !== reference
    ) {
      return res.status(409).json({
        message: "Reference already submitted. Contact support to correct it.",
      });
    }

    await PaymentOrder.updateOne(
      {
        _id: order._id,
        status: "pending",
      },
      {
        $set: {
          customerClaimedReference: reference,
          customerClaimedAt: new Date(),
        },
      },
    );

    return res.json({
      success: true,
      message: "Reference received for review; payment not yet verified",
    });
  } catch {
    return res.status(500).json({
      message: "Unable to save reference",
    });
  }
});

// ==========================================
// MACRODROID SMS RECEIVER
// ==========================================

router.post(
  "/macrodroid",
  webhookLimit,
  authenticateWebhook,
  express.text({
    type: "text/plain",
    limit: "8kb",
  }),
  async (req, res) => {
    try {
      const text = typeof req.body === "string" ? req.body.trim() : "";

      const source = String(req.get("x-source-package") || "").trim();

      const isTest =
        process.env.NODE_ENV !== "production" &&
        source === "macro-test" &&
        text === "CONNECTION_TEST";

      if (isTest) {
        const eventId = crypto.randomUUID();

        await PaymentAlert.create({
          eventId,
          deviceCode: "saraswat-phone",
          messageType: "test",
          source,
          occurredAt: new Date(),
          isTest: true,
          status: "test",
        });

        console.log("MacroDroid connection test saved:", eventId);

        return res.json({
          success: true,
          message: "MacroDroid connected",
          eventId,
        });
      }

      const allowedApps = csvList(process.env.BANK_NOTIFICATION_PACKAGES);

      const senderId = source.startsWith("sms:")
        ? normalizeSender(source.slice(4))
        : "";

      const approvedSenders = csvList(process.env.BANK_SMS_SENDERS).map(
        normalizeSender,
      );

      const approvedSms =
        Boolean(senderId) && approvedSenders.includes(senderId);

      const approvedApp = allowedApps.includes(source);

      if (
        (!approvedSms && !approvedApp) ||
        !text ||
        text.length > 8000 ||
        !isCreditAlert(text)
      ) {
        return res.json({
          success: true,
          status: "ignored",
        });
      }

      const hints = extractPaymentHints(text);

      if (!hints.amountHint) {
        return res.json({
          success: true,
          status: "ignored_no_amount",
        });
      }

      const eventId = hints.referenceHint
        ? tokenHash(`bank-alert:${source}:${hints.referenceHint}`)
        : crypto.randomUUID();

      const occurredAt = new Date();

      let savedAlert;

      try {
        savedAlert = await PaymentAlert.create({
          eventId,
          deviceCode: "saraswat-phone",
          messageType: approvedSms ? "sms" : "notification",
          source: source.slice(0, 200),
          occurredAt,
          ...hints,
          isTest: false,
          status: "awaiting_verification",
        });
      } catch (error) {
        if (error.code === 11000) {
          return res.json({
            success: true,
            status: "duplicate_ignored",
          });
        }

        throw error;
      }

      try {
        const windowStart = new Date(occurredAt.getTime() - 15 * 60 * 1000);

        const recentOrders = await PaymentOrder.find({
          status: "pending",
          createdAt: {
            $gte: windowStart,
            $lte: occurredAt,
          },
        })
          .select("orderId amount createdAt")
          .lean();

        const alertPaise = Math.round(Number(hints.amountHint) * 100);

        const candidates = recentOrders.filter(
          (order) => Math.round(Number(order.amount) * 100) === alertPaise,
        );

        const reference = normalizeReference(hints.referenceHint || "");

        if (
          process.env.AUTO_VERIFY_BANK_SMS === "true" &&
          approvedSms &&
          /^[A-Z0-9-]{10,30}$/.test(reference) &&
          candidates.length === 1
        ) {
          const candidate = candidates[0];

          const referenceAlreadyUsed = await PaymentOrder.exists({
            status: "paid",
            $or: [
              { bankReference: reference },
              {
                verifiedReferenceKey: reference,
              },
            ],
          });

          if (!referenceAlreadyUsed) {
            const updatedOrder = await PaymentOrder.findOneAndUpdate(
              {
                orderId: candidate.orderId,
                status: "pending",
                amount: candidate.amount,
              },
              {
                $set: {
                  status: "paid",
                  bankReference: reference,
                  verifiedReferenceKey: reference,
                  verificationNote:
                    "Automatically matched to an allowlisted bank SMS; not independently authenticated.",
                  verifiedBy: "auto:saraswat-sms",
                  verifiedAt: new Date(),
                  matchedAlertEventId: savedAlert.eventId,
                },
              },
              {
                new: true,
                runValidators: true,
              },
            );

            if (updatedOrder) {
              await PaymentAlert.updateOne(
                {
                  eventId: savedAlert.eventId,
                  status: "awaiting_verification",
                },
                {
                  $set: {
                    status: "verified",
                    matchedOrderId: updatedOrder.orderId,
                    verifiedAt: new Date(),
                  },
                },
              );

              console.log(
                "AUTO-APPROVED from bank SMS:",
                updatedOrder.orderId,
                reference,
              );

              return res.json({
                success: true,
                status: "verified",
                paymentSuccessful: true,
                eventId: savedAlert.eventId,
                orderId: updatedOrder.orderId,
              });
            }
          } else {
            console.warn(
              "Auto-verification skipped: bank reference already used",
              reference,
            );
          }
        }

        if (candidates.length === 1) {
          await PaymentAlert.updateOne(
            {
              eventId: savedAlert.eventId,
              status: "awaiting_verification",
            },
            {
              $set: {
                matchedOrderId: candidates[0].orderId,
              },
            },
          );

          console.log(
            "Alert linked for review:",
            savedAlert.eventId,
            candidates[0].orderId,
          );
        } else {
          console.log(
            "Manual reconciliation required:",
            savedAlert.eventId,
            "Exact-amount candidates:",
            candidates.length,
          );
        }
      } catch (matchError) {
        console.error("Alert matching error:", matchError.message);
      }

      console.log("Unverified bank credit hint stored:", eventId);

      return res.json({
        success: true,
        status: "awaiting_verification",
        eventId,
      });
    } catch (error) {
      console.error("MacroDroid error:", error.message);

      return res.status(503).json({
        success: false,
        message: "Unable to save alert",
      });
    }
  },
);

// ==========================================
// LEGACY NOTIFICATION ENDPOINT
// ==========================================

router.post(
  "/notification",
  webhookLimit,
  authenticateWebhook,
  async (req, res) => {
    try {
      const e = req.body || {};

      if (
        e.schema_version !== 1 ||
        !["test", "sms", "notification"].includes(e.message_type) ||
        typeof e.event_id !== "string" ||
        !/^.{1,128}$/.test(e.event_id) ||
        typeof e.source !== "string" ||
        typeof e.text !== "string" ||
        e.text.length > 20_000 ||
        !Number.isFinite(Date.parse(e.occurred_at))
      ) {
        return res.status(400).json({
          message: "Invalid notification event",
        });
      }

      const isTest =
        e.message_type === "test" && process.env.NODE_ENV !== "production";

      const approvedSms =
        e.message_type === "sms" &&
        e.source === "android" &&
        csvList(process.env.BANK_SMS_SENDERS)
          .map(normalizeSender)
          .includes(normalizeSender(e.sender));

      const approvedApp =
        e.message_type === "notification" &&
        csvList(process.env.BANK_NOTIFICATION_PACKAGES).includes(e.source);

      if (
        !isTest &&
        ((!approvedSms && !approvedApp) || !isCreditAlert(e.text))
      ) {
        return res.json({
          status: "ignored",
          event_id: e.event_id,
        });
      }

      const hints = extractPaymentHints(e.text);

      if (!isTest && !hints.amountHint) {
        return res.json({
          status: "ignored_no_amount",
          event_id: e.event_id,
        });
      }

      try {
        await PaymentAlert.create({
          eventId: e.event_id,
          deviceCode: String(e.device_code || "").slice(0, 100),
          messageType: e.message_type,
          source: String(e.source).slice(0, 200),
          occurredAt: new Date(e.occurred_at),
          ...hints,
          isTest,
          status: isTest ? "test" : "awaiting_verification",
        });
      } catch (error) {
        if (error.code !== 11000) {
          throw error;
        }
      }

      return res.json({
        status: "accepted",
        event_id: e.event_id,
      });
    } catch (error) {
      console.error("Notification error:", error.message);

      return res.status(503).json({
        message: "Unable to record notification",
      });
    }
  },
);

// ==========================================
// ADMIN LOGIN
// ==========================================

router.post("/admin/login", loginLimit, async (req, res) => {
  try {
    const email = String(req.body?.email || "")
      .trim()
      .toLowerCase();

    const password = String(req.body?.password || "");

    const configuredEmail = String(process.env.ADMIN_EMAIL || "")
      .trim()
      .toLowerCase();

    const passwordHash = String(process.env.ADMIN_PASSWORD_HASH || "");

    const emailMatches = safeEqual(email, configuredEmail);

    let passwordMatches = false;

    const validBcryptHash = /^\$2[aby]\$\d{2}\$/.test(passwordHash);

    if (validBcryptHash && password.length <= 1024) {
      passwordMatches = await bcrypt.compare(password, passwordHash);
    }

    console.log("[ADMIN LOGIN DEBUG]", {
      emailMatches,
      validBcryptHash,
      hashLength: passwordHash.length,
      passwordMatches,
    });

    if (!emailMatches || !passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    if (!process.env.ADMIN_JWT_SECRET) {
      throw new Error("ADMIN_JWT_SECRET is not configured");
    }

    const token = jwt.sign(
      {
        role: "admin",
        email: configuredEmail,
      },
      process.env.ADMIN_JWT_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "2h",
      },
    );

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      expiresIn: 7200,
    });
  } catch (error) {
    console.error("Admin login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to log in",
    });
  }
});

// ==========================================
// ADMIN ORDERS
// ==========================================

router.get("/admin/orders", authenticateAdmin, async (req, res) => {
  try {
    const orders = await PaymentOrder.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return res.json({
      success: true,
      orders,
    });
  } catch {
    return res.status(500).json({
      message: "Unable to load orders",
    });
  }
});

// ==========================================
// ADMIN ALERTS
// ==========================================

router.get("/admin/alerts", authenticateAdmin, async (req, res) => {
  try {
    const alerts = await PaymentAlert.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return res.json({
      success: true,
      alerts,
    });
  } catch {
    return res.status(500).json({
      message: "Unable to load alerts",
    });
  }
});

// ==========================================
// ADMIN RECONCILIATION
// ==========================================

router.get("/admin/reconciliation", authenticateAdmin, async (req, res) => {
  try {
    const alerts = await PaymentAlert.find({
      status: "awaiting_verification",
      isTest: false,
    })
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    const orders = await PaymentOrder.find({
      status: "pending",
    })
      .sort({ createdAt: -1 })
      .limit(500)
      .lean();

    const items = alerts.map((alert) => ({
      alert: {
        eventId: alert.eventId,
        source: alert.source,
        messageType: alert.messageType,
        amountHint: alert.amountHint,
        referenceHint: alert.referenceHint || "",
        occurredAt: alert.occurredAt,
        status: alert.status,
      },

      ...suggestMatches(alert, orders),
    }));

    return res.json({
      success: true,
      items,
      note: "Suggestions only. Verify in the bank before approval.",
    });
  } catch (error) {
    console.error("Reconciliation error:", error.message);

    return res.status(500).json({
      message: "Unable to calculate suggested matches",
    });
  }
});

// ==========================================
// ADMIN SUMMARY
// ==========================================

router.get("/admin/summary", authenticateAdmin, async (req, res) => {
  try {
    const [totalOrders, pendingOrders, paidOrders, pendingAlerts, revenue] =
      await Promise.all([
        PaymentOrder.countDocuments(),
        PaymentOrder.countDocuments({
          status: "pending",
        }),
        PaymentOrder.countDocuments({
          status: "paid",
        }),
        PaymentAlert.countDocuments({
          status: "awaiting_verification",
        }),
        PaymentOrder.aggregate([
          {
            $match: {
              status: "paid",
            },
          },
          {
            $group: {
              _id: null,
              total: {
                $sum: "$amount",
              },
            },
          },
        ]),
      ]);

    return res.json({
      success: true,
      summary: {
        totalOrders,
        pendingOrders,
        paidOrders,
        pendingAlerts,
        verifiedRevenue: revenue[0]?.total || 0,
        currency: "INR",
      },
    });
  } catch {
    return res.status(500).json({
      message: "Unable to load summary",
    });
  }
});

// ==========================================
// ADMIN BANK VERIFICATION
// ==========================================

router.post(
  "/admin/orders/:orderId/verify",
  authenticateAdmin,
  async (req, res) => {
    try {
      const {
        confirmedFromBank,
        verifiedAmount,
        bankReference,
        verificationNote,
        alertEventId,
      } = req.body || {};

      const reference = normalizeReference(bankReference);

      const note = String(verificationNote || "").trim();

      if (
        confirmedFromBank !== true ||
        !/^[A-Z0-9-]{10,30}$/.test(reference) ||
        note.length < 5 ||
        note.length > 500
      ) {
        return res.status(400).json({
          message: "Bank confirmation, reference and note are required",
        });
      }

      const order = await PaymentOrder.findOne({
        orderId: req.params.orderId,
      });

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      if (order.status !== "pending") {
        return res.status(409).json({
          message: "Order is not pending",
        });
      }

      if (
        !Number.isFinite(Number(verifiedAmount)) ||
        Number(verifiedAmount) !== Number(order.amount)
      ) {
        return res.status(400).json({
          message: "Verified amount must equal the order amount",
        });
      }

      let alert;

      if (alertEventId) {
        alert = await PaymentAlert.findOne({
          eventId: String(alertEventId),
          status: "awaiting_verification",
          isTest: false,
        });

        if (!alert) {
          return res.status(404).json({
            message: "Unverified alert not found",
          });
        }

        if (Number(alert.amountHint) !== Number(order.amount)) {
          return res.status(409).json({
            message: "Alert amount differs from order",
          });
        }

        if (
          alert.referenceHint &&
          normalizeReference(alert.referenceHint) !== reference
        ) {
          return res.status(409).json({
            message: "Bank reference does not match the selected alert",
          });
        }

        if (alert.matchedOrderId && alert.matchedOrderId !== order.orderId) {
          return res.status(409).json({
            message: "Alert is assigned to a different order",
          });
        }
      }

      const used = await PaymentOrder.exists({
        bankReference: reference,
        status: "paid",
      });

      if (used) {
        return res.status(409).json({
          message: "Bank reference already used",
        });
      }

      const updated = await PaymentOrder.findOneAndUpdate(
        {
          orderId: order.orderId,
          status: "pending",
        },
        {
          $set: {
            status: "paid",
            bankReference: reference,
            verifiedReferenceKey: reference,
            verificationNote: note,
            verifiedBy: req.admin.email,
            verifiedAt: new Date(),

            ...(alert
              ? {
                  matchedAlertEventId: alert.eventId,
                }
              : {}),
          },
        },
        {
          new: true,
          runValidators: true,
        },
      );

      if (!updated) {
        return res.status(409).json({
          message: "Order already processed",
        });
      }

      if (alert) {
        await PaymentAlert.updateOne(
          {
            eventId: alert.eventId,
            status: "awaiting_verification",
          },
          {
            $set: {
              status: "verified",
              matchedOrderId: order.orderId,
              verifiedAt: new Date(),
            },
          },
        );
      }

      console.log("Bank-verified order:", updated.orderId);

      return res.json({
        success: true,
        message: "Bank-verified payment approved",
        order: publicOrder(updated),
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({
          message: "Bank reference already used",
        });
      }

      console.error("Verify order error:", error.message);

      return res.status(500).json({
        message: "Unable to approve payment",
      });
    }
  },
);

// ==========================================
// SINGLE FAILURE EMAIL
// ==========================================

router.post(
  "/admin/orders/:orderId/failure-email",
  authenticateAdmin,
  async (req, res) => {
    try {
      const order = await PaymentOrder.findOne({
        orderId: req.params.orderId,
      });

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      if (order.status !== "rejected") {
        return res.status(409).json({
          message: "Only rejected orders can receive failure emails",
        });
      }

      if (order.failureEmailSentAt) {
        return res.status(409).json({
          message: "A failure email has already been recorded for this order",
          sentAt: order.failureEmailSentAt,
        });
      }

      if (!order.customerEmail) {
        return res.status(400).json({
          message: "Customer email is missing",
        });
      }

      const transporter = getEmailTransporter();

      const result = await sendFailureEmail(order, transporter);

      const updated = await PaymentOrder.findOneAndUpdate(
        {
          _id: order._id,
          status: "rejected",
          failureEmailSentAt: {
            $exists: false,
          },
        },
        {
          $set: {
            failureEmailSentAt: new Date(),
            failureEmailMessageId: result.messageId || "",
            failureEmailSentBy: req.admin.email,
          },
        },
        { new: true },
      );

      if (!updated) {
        return res.status(409).json({
          message:
            "Email sent, but tracking needs review. Check SMTP logs before retrying.",
        });
      }

      return res.json({
        success: true,
        message: `Email submitted to ${order.customerEmail}`,
        sentAt: updated.failureEmailSentAt,
      });
    } catch (error) {
      console.error("Failure email error:", error.message);

      return res.status(500).json({
        message: "Could not send the email. Check SMTP configuration and logs.",
      });
    }
  },
);

// ==========================================
// BULK FAILURE EMAILS
// ==========================================

router.post(
  "/admin/failure-emails/bulk",
  authenticateAdmin,
  async (req, res) => {
    try {
      const ids = req.body?.orderIds;

      if (
        !Array.isArray(ids) ||
        ids.length < 1 ||
        ids.length > 50 ||
        ids.some((id) => typeof id !== "string" || !id.trim())
      ) {
        return res.status(400).json({
          message: "Provide between 1 and 50 order IDs",
        });
      }

      const uniqueIds = [...new Set(ids)];

      const orders = await PaymentOrder.find({
        orderId: { $in: uniqueIds },
        status: "rejected",
        failureEmailSentAt: {
          $exists: false,
        },
      });

      const byId = new Map(orders.map((order) => [order.orderId, order]));

      const results = [];
      let transporter;

      for (const orderId of uniqueIds) {
        const order = byId.get(orderId);

        if (!order) {
          results.push({
            orderId,
            success: false,
            message: "Not eligible, already emailed, or not found",
          });

          continue;
        }

        if (!order.customerEmail) {
          results.push({
            orderId,
            success: false,
            message: "Customer email is missing",
          });

          continue;
        }

        try {
          transporter ||= getEmailTransporter();

          const sent = await sendFailureEmail(order, transporter);

          const updated = await PaymentOrder.findOneAndUpdate(
            {
              _id: order._id,
              status: "rejected",
              failureEmailSentAt: {
                $exists: false,
              },
            },
            {
              $set: {
                failureEmailSentAt: new Date(),
                failureEmailMessageId: sent.messageId || "",
                failureEmailSentBy: req.admin.email,
              },
            },
            { new: true },
          );

          results.push({
            orderId,
            success: Boolean(updated),
            message: updated
              ? "Email submitted"
              : "Email submitted; tracking needs review",
          });
        } catch (error) {
          console.error("Bulk failure email error:", orderId, error.message);

          results.push({
            orderId,
            success: false,
            message: "SMTP sending failed; check server logs before retrying",
          });
        }
      }

      return res.json({
        success: true,
        results,
        sent: results.filter((r) => r.success).length,
        failed: results.filter((r) => !r.success).length,
      });
    } catch (error) {
      console.error("Bulk email error:", error.message);

      return res.status(500).json({
        message: "Unable to process bulk emails",
      });
    }
  },
);

// ==========================================
// MANUAL ORDER STATUS
// ==========================================

router.post(
  "/admin/orders/:orderId/manual-status",
  authenticateAdmin,
  async (req, res) => {
    let order;
    let emailType;

    try {
      const requestedStatus = String(req.body?.status || "")
        .trim()
        .toLowerCase();

      if (!["paid", "rejected"].includes(requestedStatus)) {
        return res.status(400).json({
          success: false,
          message: "Choose Paid or Failed.",
        });
      }

      if (requestedStatus === "paid" && req.body?.confirmedPayment !== true) {
        return res.status(400).json({
          success: false,
          message:
            "Confirm that you checked the actual payment before marking it paid.",
        });
      }

      emailType = requestedStatus === "paid" ? "success" : "failure";

      const note =
        String(req.body?.note || "")
          .trim()
          .slice(0, 500) ||
        (requestedStatus === "paid"
          ? "Manually marked paid after admin confirmation."
          : "Manually marked failed by admin.");

      order = await PaymentOrder.findOneAndUpdate(
        {
          orderId: req.params.orderId,
          status: "pending",
        },
        {
          $set: {
            status: requestedStatus,
            verifiedBy: req.admin.email,
            verifiedAt: new Date(),
            verificationNote: note,
            paymentEmailStatus: "sending",
            paymentEmailType: emailType,
            paymentEmailError: "",
          },
        },
        {
          new: true,
          runValidators: true,
        },
      );

      if (!order) {
        const existing = await PaymentOrder.findOne({
          orderId: req.params.orderId,
        }).select("orderId status");

        if (!existing) {
          return res.status(404).json({
            success: false,
            message: "Order not found.",
          });
        }

        return res.status(409).json({
          success: false,
          message: `Order is already ${existing.status}. Refresh the dashboard.`,
        });
      }

      try {
        const result = await sendManualStatusEmail(order, requestedStatus);

        await PaymentOrder.updateOne(
          {
            _id: order._id,
            status: requestedStatus,
          },
          {
            $set: {
              paymentEmailStatus: "sent",
              paymentEmailType: emailType,
              paymentEmailSentAt: new Date(),
              paymentEmailMessageId: result.messageId || "",
              paymentEmailError: "",
            },
          },
        );

        return res.json({
          success: true,
          status: requestedStatus,
          emailStatus: "sent",
          message: `Order marked ${requestedStatus === "paid" ? "Paid" : "Failed"}. Email sent to ${order.customerEmail}.`,
        });
      } catch (emailError) {
        console.error(
          "Manual payment status email failed:",
          emailError.message,
        );

        await PaymentOrder.updateOne(
          {
            _id: order._id,
            status: requestedStatus,
          },
          {
            $set: {
              paymentEmailStatus: "failed",
              paymentEmailType: emailType,
              paymentEmailError: String(
                emailError.message || "Email delivery failed",
              ).slice(0, 500),
            },
          },
        );

        return res.json({
          success: true,
          status: requestedStatus,
          emailStatus: "failed",
          message: `Order marked ${requestedStatus === "paid" ? "Paid" : "Failed"}, but the email could not be sent. Check SMTP settings and retry the email.`,
        });
      }
    } catch (error) {
      console.error("Manual status update error:", error.message);

      return res.status(500).json({
        success: false,
        message: "Unable to update the payment status.",
      });
    }
  },
);

// ==========================================
// RESEND STATUS EMAIL
// ==========================================

router.post(
  "/admin/orders/:orderId/resend-status-email",
  authenticateAdmin,
  async (req, res) => {
    try {
      const order = await PaymentOrder.findOne({
        orderId: req.params.orderId,
      });

      if (!order) {
        return res.status(404).json({
          message: "Order not found.",
        });
      }

      if (!["paid", "rejected"].includes(order.status)) {
        return res.status(409).json({
          message:
            "The order needs a final status before an email can be sent.",
        });
      }

      const emailType = order.status === "paid" ? "success" : "failure";

      if (
        order.paymentEmailStatus === "sent" &&
        order.paymentEmailType === emailType
      ) {
        return res.status(409).json({
          message: "The matching status email has already been sent.",
        });
      }

      const result = await sendManualStatusEmail(order, order.status);

      await PaymentOrder.updateOne(
        {
          _id: order._id,
          status: order.status,
        },
        {
          $set: {
            paymentEmailStatus: "sent",
            paymentEmailType: emailType,
            paymentEmailSentAt: new Date(),
            paymentEmailMessageId: result.messageId || "",
            paymentEmailError: "",
          },
        },
      );

      return res.json({
        success: true,
        message: `Email sent to ${order.customerEmail}.`,
      });
    } catch (error) {
      console.error("Status email retry failed:", error.message);

      return res.status(500).json({
        message:
          "Email could not be sent. Check SMTP settings and the backend log.",
      });
    }
  },
);

// ==========================================
// REJECT ORDER
// ==========================================

router.post(
  "/admin/orders/:orderId/reject",
  authenticateAdmin,
  async (req, res) => {
    try {
      const reason = String(req.body?.reason || "")
        .trim()
        .slice(0, 500);

      if (reason.length < 5) {
        return res.status(400).json({
          message: "Reason required",
        });
      }

      const order = await PaymentOrder.findOneAndUpdate(
        {
          orderId: req.params.orderId,
          status: "pending",
        },
        {
          $set: {
            status: "rejected",
            verificationNote: reason,
            verifiedBy: req.admin.email,
            verifiedAt: new Date(),
          },
        },
        { new: true },
      );

      if (!order) {
        return res.status(409).json({
          message: "Pending order not found",
        });
      }

      return res.json({
        success: true,
        order: publicOrder(order),
      });
    } catch {
      return res.status(500).json({
        message: "Unable to reject payment",
      });
    }
  },
);

// ==========================================
// RAZORPAY WEBHOOK  (Razorpay -> server, instant)
// ==========================================

router.post("/razorpay/webhook", webhookLimit, async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.get("x-razorpay-signature");

  if (!secret) {
    console.error("RAZORPAY_WEBHOOK_SECRET is not set; webhook ignored.");
    return res.status(503).json({ message: "Webhook not configured" });
  }

  if (!req.rawBody || !signature || !safeEqual(hmacHex(secret, req.rawBody), signature)) {
    return res.status(400).json({ message: "Invalid signature" });
  }

  try {
    const event = req.body?.event;
    const payment = req.body?.payload?.payment?.entity;
    const link = req.body?.payload?.payment_link?.entity;

    if (event === "payment_link.paid" && link?.reference_id && payment) {
      await markOrderPaidFromRazorpay(link.reference_id, payment, "webhook");
    }

    // Always 200 so Razorpay doesn't keep retrying events we don't use.
    return res.json({ received: true });
  } catch (error) {
    console.error("Razorpay webhook error:", error);
    return res.status(500).json({ message: "Webhook processing failed" });
  }
});

// ==========================================
// RAZORPAY REDIRECT VERIFY  (customer lands on /order-result)
// ==========================================

router.get("/razorpay/callback-verify", publicLimit, async (req, res) => {
  try {
    const {
      razorpay_payment_id: paymentId = "",
      razorpay_payment_link_id: linkId = "",
      razorpay_payment_link_reference_id: referenceId = "",
      razorpay_payment_link_status: linkStatus = "",
      razorpay_signature: signature = "",
    } = req.query;

    const expected = hmacHex(
      process.env.RAZORPAY_KEY_SECRET,
      `${linkId}|${referenceId}|${linkStatus}|${paymentId}`,
    );

    if (!signature || !safeEqual(expected, signature)) {
      return res.status(400).json({ success: false, message: "Payment details could not be verified." });
    }

    let order = await PaymentOrder.findOne({ orderId: String(referenceId) });

    if (!order || (order.razorpayPaymentLinkId && order.razorpayPaymentLinkId !== linkId)) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    if (order.status === "pending" && linkStatus === "paid" && paymentId) {
      const payment = await razorpayGet(`/payments/${encodeURIComponent(String(paymentId))}`);
      order = (await markOrderPaidFromRazorpay(order.orderId, payment, "redirect")) || order;
    }

    return res.json({
      success: true,
      order: { ...publicOrder(order), customerName: order.customerName, paymentId: order.razorpayPaymentId || paymentId || "" },
      paymentSuccessful: order.status === "paid",
    });
  } catch (error) {
    console.error("Razorpay callback verify error:", error);
    return res.status(500).json({ success: false, message: "Unable to verify payment right now." });
  }
});

export default router;
