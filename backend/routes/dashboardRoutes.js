import express from "express";
const router = express.Router();
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import { getDashboardSummary } from "../controllers/dashboardController.js";

router.get("/", protect, adminOnly, getDashboardSummary);

export default router;
