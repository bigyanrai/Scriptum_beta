import express from "express";
import { getContentPerformanceData } from "../controllers/analyticsController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

/*
 * GET CONTENT PERFORMANCE
 *
 * GET /api/analytics/content-performance
 */

router.get(
  "/content-performance",
  protect,
  adminOnly,
  getContentPerformanceData,
);

export default router;
