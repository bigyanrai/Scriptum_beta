import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import blogPostRoutes from "./routes/blogPostRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import searchRoutes from "./routes/searchroute.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import exploreRoutes from "./routes/exploreRoutes.js";
import adminSearchRoutes from "./routes/adminSearchRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import engagementRoutes from "./routes/engagementRoutes.js";
import activityRoutes from "./routes/activityRoute.js";
import notificationRoutes from "./routes/notificationRoute.js";

const app = express();

// recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware to handle cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// connect database
connectDB();

// middleware
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", blogPostRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/dashboard-summary", dashboardRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/explore", exploreRoutes);
app.use("/api/admin/search", adminSearchRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/engagement-rate", engagementRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/notifications", notificationRoutes);

// server upload folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// start server
// start server locally
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING IN PORT ${PORT}`);
  });
}

export default app;
