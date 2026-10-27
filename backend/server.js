
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

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = Number(process.env.PORT || 5000);

const frontendDistPath = path.resolve(__dirname, "../frontend/dist");
const frontendIndexPath = path.join(frontendDistPath, "index.html");

app.set("trust proxy", "loopback");
app.disable("x-powered-by");

// Environment configuration
const requiredVariables = [
  "MONGO_URI",
  "WEBHOOK_TOKEN",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD_HASH",
  "ADMIN_JWT_SECRET",
  "UPI_ID",
  "UPI_NAME",
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

// Security and middleware
app.use(helmet());

const allowedOrigins = [
  "https://bundleupott.com",
  "https://www.bundleupott.com",
  "http://localhost:5173",
  ...(process.env.FRONTEND_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("Blocked CORS origin:", origin);
      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  })
);

// Existing payment routes — preserved
app.use("/api/payment", (req, res, next) => {
  console.log("Payment API request:", req.method, req.originalUrl);

  res.on("finish", () => {
    console.log("Payment API response status:", res.statusCode);
  });

  next();
});

app.use("/api/payment", paymentRoutes);

// Serve Vite's built frontend
console.log("Frontend dist path:", frontendDistPath);
console.log("Frontend dist exists:", fs.existsSync(frontendDistPath));
console.log("Frontend index exists:", fs.existsSync(frontendIndexPath));
app.use("/assets", (req, res, next) => {
  console.log("Asset request:", req.originalUrl);
  next();
});
app.use(
  express.static(frontendDistPath, {
    index: false,
    fallthrough: true,
  })
);

// React frontend routes, including /our-plans
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
    if (err) next(err);
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// Error handler
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

// Start server
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
