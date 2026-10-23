
import mongoose from "mongoose";

// Compatible with existing paymentorders and paymentalerts collections.
// Additional checkout fields are optional so previously saved orders still load.

const paymentOrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    accessTokenHash: { type: String, required: true, select: false },
    customerName: { type: String, required: true, trim: true, maxlength: 100 },
    customerEmail: { type: String, required: true, lowercase: true, trim: true, maxlength: 254 },
    customerMobile: { type: String, trim: true, maxlength: 20 },
    planId: { type: String, required: true },
    planName: { type: String, required: true },
    items: [{ id: String, name: String, price: Number, category: String }],
    subtotal: { type: Number, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    preCouponAmount: { type: Number, min: 0 },
    couponCode: { type: String, trim: true, uppercase: true, maxlength: 30 },
    couponDiscount: { type: Number, default: 0, min: 0 },
    amount: { type: Number, required: true, min: 0.01 },
    currency: { type: String, default: "INR", enum: ["INR"] },
    status: { type: String, enum: ["pending", "paid", "rejected"], default: "pending", index: true },
    customerClaimedReference: { type: String, trim: true, uppercase: true },
    customerClaimedAt: { type: Date },
    bankReference: { type: String, trim: true, uppercase: true },
    verifiedReferenceKey: { type: String, trim: true, uppercase: true },
    matchedAlertEventId: { type: String },
    verificationNote: { type: String, maxlength: 500 },
    verifiedBy: { type: String },
    verifiedAt: { type: Date },
  },
  { timestamps: true, collection: "paymentorders" }
);

// New sparse key avoids index conflicts with legacy unverified orders whose bankReference was empty.
// Never set this field until bank verification succeeds.
paymentOrderSchema.index({ verifiedReferenceKey: 1 }, { unique: true, sparse: true });
paymentOrderSchema.index({ status: 1, amount: 1, createdAt: -1 });

const paymentAlertSchema = new mongoose.Schema(
  {
    eventId: { type: String, required: true, unique: true, index: true },
    deviceCode: { type: String, trim: true, maxlength: 100 },
    messageType: { type: String, enum: ["sms", "notification", "test"], required: true },
    source: { type: String, required: true, maxlength: 200 },
    occurredAt: { type: Date, required: true },
    amountHint: { type: Number, min: 0 },
    referenceHint: { type: String, trim: true, uppercase: true },
    isTest: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["test", "awaiting_verification", "verified", "ignored"],
      default: "awaiting_verification",
      index: true,
    },
    matchedOrderId: { type: String },
    verifiedAt: { type: Date },
  },
  { timestamps: true, collection: "paymentalerts" }
);

paymentAlertSchema.index({ status: 1, occurredAt: -1 });
paymentAlertSchema.index({ amountHint: 1, occurredAt: -1 });

export const PaymentOrder =
  mongoose.models.PaymentOrder || mongoose.model("PaymentOrder", paymentOrderSchema);
export const PaymentAlert =
  mongoose.models.PaymentAlert || mongoose.model("PaymentAlert", paymentAlertSchema);
