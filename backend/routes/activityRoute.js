import express from "express";
import { getMyActivities } from "../controllers/activityController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMyActivities);

export default router;
