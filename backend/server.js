import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

import connectDB from "./db.js";
import paymentRoutes from "./payment.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, ".env"),
});

const app = express();

const PORT = Number(process.env.PORT || 5000);

const frontendDistPath = path.resolve(__dirname, "../frontend/dist");

const frontendIndexPath = path.join(frontendDistPath, "index.html");

app.set("trust proxy", "loopback");
app.disable("x-powered-by");

// ======================================
// ENVIRONMENT VALIDATION
// ======================================

const requiredVariables = [
  "MONGO_URI",
  "WEBHOOK_TOKEN",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD_HASH",
  "ADMIN_JWT_SECRET",
  "UPI_ID",
  "UPI_NAME",
  "RAZORPAY_KEY_ID",
  "RAZORPAY_KEY_SECRET",
];

const missing = requiredVariables.filter((name) => {
  const value = process.env[name];

  return (
    !value ||
    value.startsWith("YOUR_") ||
    value.startsWith("GENERATE_") ||
    value.startsWith("PASTE_")
  );
});

if (missing.length > 0) {
  console.error("Missing environment configuration:", missing.join(", "));

  process.exit(1);
}

if (
  process.env.WEBHOOK_TOKEN.length < 32 ||
  process.env.ADMIN_JWT_SECRET.length < 32 ||
  !/^\$2[aby]\$/.test(process.env.ADMIN_PASSWORD_HASH)
) {
  console.error("Invalid security configuration");
  process.exit(1);
}

// ======================================
// SECURITY
// ======================================

app.use(helmet());

// ======================================
// CORS CONFIGURATION
// ======================================

const defaultOrigins = [
  "http://localhost:5000",
  "http://127.0.0.1:5000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://bundleupott.com",
  "https://www.bundleupott.com",
];

const environmentOrigins = String(process.env.CLIENT_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = [...new Set([...defaultOrigins, ...environmentOrigins])];

console.log("Allowed frontend origins:", allowedOrigins);

app.use(
  cors({
    origin(origin, callback) {
      // Requests without an Origin header, such as server-to-server requests.
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.trim().replace(/\/+$/, "");

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      console.error("Blocked CORS origin:", origin);

      return callback(new Error("Origin not allowed by CORS"));
    },

    credentials: true,

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization", "x-order-token"],

    optionsSuccessStatus: 204,
  }),
);

// ======================================
// BODY PARSER
// ======================================

app.use(
  express.json({
    limit: "64kb",
  }),
);

// ======================================
// HEALTH CHECK
// ======================================

app.get("/health", (req, res) => {
  const connected = mongoose.connection.readyState === 1;

  res.status(connected ? 200 : 503).json({
    success: connected,
    server: "OTT + AI Backend",
    database: mongoose.connection.name || null,
    databaseConnected: connected,
  });
});

// ======================================
// PAYMENT ROUTES
// ======================================

app.use("/api/payment", (req, res, next) => {
  console.log("Payment API request:", req.method, req.originalUrl);

  res.on("finish", () => {
    console.log("Payment API response status:", res.statusCode);
  });

  next();
});

app.use("/api/payment", paymentRoutes);

// ======================================
// FRONTEND BUILD DIAGNOSTICS
// ======================================

console.log("Runtime directory:", __dirname);

console.log("Frontend dist path:", frontendDistPath);

console.log("Frontend dist exists:", fs.existsSync(frontendDistPath));

console.log("Frontend index exists:", fs.existsSync(frontendIndexPath));

if (fs.existsSync(frontendDistPath)) {
  console.log("Frontend dist contents:", fs.readdirSync(frontendDistPath));
}

// ======================================
// FRONTEND ASSETS
// ======================================

app.use("/assets", (req, res, next) => {
  console.log("Asset request:", req.originalUrl);

  next();
});

// ======================================
// SERVE REACT BUILD
// ======================================

app.use(
  express.static(frontendDistPath, {
    index: false,
    fallthrough: true,
  }),
);

// ======================================
// REACT ROUTES
// ======================================

app.get(/.*/, (req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return next();
  }

  if (req.path.startsWith("/assets/") || path.extname(req.path)) {
    return res.status(404).json({
      success: false,
      message: "Static file not found",
    });
  }

  if (!fs.existsSync(frontendIndexPath)) {
    return res.status(503).json({
      success: false,
      message: "Frontend build is unavailable",
    });
  }

  res.sendFile(frontendIndexPath, (err) => {
    if (err) {
      next(err);
    }
  });
});

// ======================================
// 404 HANDLER
// ======================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// ======================================
// ERROR HANDLER
// ======================================

app.use((err, req, res, next) => {
  console.error("Server error:", err.message);

  if (res.headersSent) {
    return next(err);
  }

  const status =
    err.status === 413
      ? 413
      : err.message === "Origin not allowed by CORS"
        ? 403
        : err.status === 400
          ? 400
          : 500;

  res.status(status).json({
    success: false,

    message:
      status === 403
        ? "Request origin not allowed"
        : status === 413
          ? "Request payload too large"
          : status === 400
            ? "Invalid request"
            : "Request could not be processed",
  });
});

// ======================================
// START SERVER
// ======================================

async function startServer() {
  await connectDB();

  await Promise.all([
    mongoose.model("PaymentOrder").init(),
    mongoose.model("PaymentAlert").init(),
  ]);

  app.listen(PORT, "0.0.0.0", () => {
    console.log("================================");
    console.log("OTT + AI Backend Started");
    console.log(`Port: ${PORT}`);
    console.log(`Database: ${mongoose.connection.name}`);
    console.log("================================");
  });
}

startServer().catch((error) => {
  console.error("Startup failed:", error.message);

  process.exit(1);
});
