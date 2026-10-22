import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./db.js";

// ========================================
// ENVIRONMENT CONFIGURATION
// ========================================

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT || 5000);

// ========================================
// MIDDLEWARE
// ========================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
    ],
  }),
);

app.use(express.json());

// ========================================
// MAIN BACKEND ROUTE
// ========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    website: "bundleupott",
    message: "bundleupott backend is running",
  });
});

// ========================================
// BACKEND HEALTH CHECK
// ========================================

app.get("/api/health", (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;

  res.status(isConnected ? 200 : 503).json({
    success: isConnected,

    backend: "Running",

    mongodb: isConnected ? "Connected" : "Disconnected",

    database: isConnected ? mongoose.connection.name : null,

    port: PORT,

    timestamp: new Date().toISOString(),
  });
});

// ========================================
// BACKEND INFORMATION
// ========================================

app.get("/api/status", (req, res) => {
  res.json({
    success: true,

    platform: "bundleupott",

    services: {
      backend: "Running",

      mongodb:
        mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",

      customerForm: "Not connected yet",

      payments: "Not connected yet",

      adminDashboard: "Frontend only",
    },
  });
});

// ========================================
// 404 HANDLER
// ========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// ========================================
// START BACKEND
// ========================================

async function startServer() {
  try {
    console.log("Starting bundleupott backend...");

    // Connect MongoDB first
    await connectDB();

    // Start Express after successful connection
    app.listen(PORT, () => {
      console.log("");
      console.log("=================================");
      console.log("bundleupott Backend Started");
      console.log("=================================");
      console.log(`Backend: http://localhost:${PORT}`);
      console.log(`Health: http://localhost:${PORT}/api/health`);
      console.log(`Status: http://localhost:${PORT}/api/status`);
      console.log("=================================");
    });
  } catch (error) {
    console.error("Backend Startup Failed:", error.message);
    process.exit(1);
  }
}

startServer();
