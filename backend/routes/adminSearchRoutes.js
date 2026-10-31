import express from "express";

import {
  adminGlobalSearchController,
  adminGlobalSearchAllController,
} from "../controllers/adminSearchController.js";

import { adminOnly, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, adminGlobalSearchController);

router.get("/all", protect, adminOnly, adminGlobalSearchAllController);

export default router;
