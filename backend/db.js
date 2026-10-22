import mongoose from "mongoose";
import dns from "node:dns";

// ========================================
// FIX MONGODB DNS CONNECTION
// ========================================

// Use Google and Cloudflare DNS servers
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// ========================================
// CONNECT MONGODB ATLAS
// ========================================

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from .env");
    }

    console.log("Connecting to MongoDB Atlas...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log("");
    console.log("=================================");
    console.log("MongoDB Atlas Connected!");
    console.log("Database:", mongoose.connection.name);
    console.log("Connection Status: SUCCESS");
    console.log("=================================");

    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    throw error;
  }
};

// ========================================
// CONNECTION EVENTS
// ========================================

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB Disconnected");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB Error:", error.message);
});

export default connectDB;
