import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "node:path";
import { fileURLToPath } from "node:url";

import connectDB from "./db.js";
import paymentRoutes from "./payment.js";

dotenv.config();

const app = express();
// Current Cloudflare Quick Tunnel connects from localhost.
app.set("trust proxy", "loopback");
const PORT = Number(process.env.PORT || 5000);

// =====================================
// CHECK ENVIRONMENT CONFIGURATION
// =====================================

const requiredVariables = [
  "MONGO_URI",
  "WEBHOOK_TOKEN",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD_HASH",
  "ADMIN_JWT_SECRET",
  "UPI_ID",
  "UPI_NAME",
];

const missing = requiredVariables.filter(
  (name) =>
    !process.env[name] ||
    process.env[name].startsWith("YOUR_") ||
    process.env[name].startsWith("GENERATE_") ||
    process.env[name].startsWith("PASTE_")
);

if (missing.length > 0) {
  console.error(
    "❌ Missing environment configuration:",
    missing.join(", ")
  );

  process.exit(1);
}

if (
  process.env.WEBHOOK_TOKEN.length < 32 ||
  process.env.ADMIN_JWT_SECRET.length < 32 ||
  !/^\$2[aby]\$/.test(process.env.ADMIN_PASSWORD_HASH)
) {
  console.error("❌ Invalid security configuration");
  process.exit(1);
}

// =====================================
// MIDDLEWARE
// =====================================

app.disable("x-powered-by");

app.use(helmet());

const allowedOrigins = (
  process.env.FRONTEND_URL || "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json({ limit: "64kb" }));

// =====================================
// HEALTH CHECK
// =====================================

app.get("/health", (req, res) => {
  const connected = mongoose.connection.readyState === 1;

  res.status(connected ? 200 : 503).json({
    success: connected,
    server: "OTT + AI Backend",
    database: mongoose.connection.name,
    databaseConnected: connected,
  });
});

// =====================================
// PAYMENT REQUEST DEBUGGING
// =====================================

app.use("/api/payment", (req, res, next) => {
  console.log("================================");
  console.log("Payment API request received");
  console.log("HTTP Method:", req.method);
  console.log("Request URL:", req.originalUrl);
  console.log("Content Type:", req.get("content-type"));

  res.on("finish", () => {
    console.log("Response Status:", res.statusCode);
    console.log("================================");
  });

  next();
});

// PAYMENT ROUTES
app.use("/api/payment", paymentRoutes);


 // PAYMENT ROUTES
app.use("/api/payment", paymentRoutes);

// =====================================
// SERVE FRONTEND ON THE SAME DOMAIN
// =====================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDistPath = path.resolve(
  __dirname,
  "../frontend/dist"
);

app.use(express.static(frontendDistPath));

app.get(/.*/, (req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return next();
  }

  res.sendFile(
    path.join(frontendDistPath, "index.html"),
    (err) => {
      if (err) next(err);
    }
  );
});

// =====================================
// 404 HANDLER
// =====================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// =====================================
// 404 HANDLER
// =====================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// =====================================
// ERROR HANDLER
// =====================================

app.use((err, req, res, next) => {
  console.error("Server error:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: "Request could not be processed",
  });
});

// =====================================
// START SERVER
// =====================================

async function startServer() {
  await connectDB();

  await Promise.all([
    mongoose.model("PaymentOrder").init(),
    mongoose.model("PaymentAlert").init(),
  ]);

  app.listen(PORT, () => {
    console.log("================================");
    console.log("🚀 OTT + AI Backend Started");
    console.log(`📡 Port: ${PORT}`);
    console.log(`🗄️ Database: ${mongoose.connection.name}`);
    console.log(`🔗 http://localhost:${PORT}`);
    console.log("================================");
  });
}

startServer().catch((error) => {
  console.error("Startup failed:", error.message);
  process.exit(1);
});