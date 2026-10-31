import express from "express";
import {
  getExploreCluster,
  getExplorePosts,
} from "../controllers/exploreController.js";
const router = express.Router();

router.get("/", getExplorePosts);
router.get("/:clusterId", getExploreCluster);

export default router;
