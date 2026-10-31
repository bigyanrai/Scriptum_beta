import express from "express";

import {
  getMyNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../controllers/notificationController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ============================================================
// GET MY NOTIFICATIONS
// ============================================================

router.get("/", protect, getMyNotifications);

// ============================================================
// GET UNREAD COUNT
// ============================================================

router.get("/unread-count", protect, getUnreadNotificationCount);
// ============================================================
// MARK ALL AS READ
// ============================================================

router.put("/read-all", protect, markAllNotificationsAsRead);

// ============================================================
// MARK ONE AS READ
// ============================================================

router.put("/:id/read", protect, markNotificationAsRead);

export default router;
