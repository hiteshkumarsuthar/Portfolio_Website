const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

const apiRoutes = require("./routes/api");
const seedDatabase = require("./utils/seedData");

dotenv.config();

const app = express();

// Middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Uploads statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
const MONGODB_URL = process.env.MONGODB_URL;
let isDbConnected = false;

if (MONGODB_URL) {
  mongoose
    .connect(MONGODB_URL)
    .then(async () => {
      isDbConnected = true;
      console.log("MongoDB Database Connected Successfully!");
      // Auto seed default portfolio and admin if empty
      await seedDatabase();
    })
    .catch((err) => {
      console.error("MongoDB Connection Error:", err.message);
    });
} else {
  console.warn("MONGODB_URL is not defined in .env file");
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    dbConnected: mongoose.connection.readyState === 1,
    timestamp: new Date().toISOString(),
  });
});

// Mount Central API Routes
app.use("/api", apiRoutes);

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hitesh Kumar Portfolio & Admin CMS Backend API",
    status: "Active",
    dbConnected: isDbConnected,
    endpoints: {
      publicPortfolio: "/api/portfolio",
      auth: "/api/auth/login",
      dashboardStats: "/api/dashboard/stats",
      profile: "/api/profile",
      skills: "/api/skills",
      journey: "/api/journey",
      projects: "/api/projects",
      contact: "/api/contact",
      messages: "/api/messages",
      upload: "/api/upload",
    },
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 1111;
app.listen(PORT, () => {
  console.log(`Backend Server Running on http://localhost:${PORT}`);
});