import express from "express";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

import { getEngagementRate } from "../controllers/engagementController.js";

const router = express.Router();

router.get("/", protect, adminOnly, getEngagementRate);

export default router;
