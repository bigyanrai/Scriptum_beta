import express from "express";
const router = express.Router();
import { searchPostsController } from "../controllers/searchController.js";

router.get("/", searchPostsController);
export default router;
