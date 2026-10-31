import express from "express";
const router = express.Router();

import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostBySlug,
  getPostsByTag,
  searchPosts,
  incrementView,
  likePost,
  getLatestPosts,
  getTrendingPosts,
  bookmarkPost,
  removeBookmark,
  getBookmarkedPosts,
  checkBookmarkStatus,
  getPostByIdAdmin,
  bulkDeletePosts,
  unlikePost,
  checkLikeStatus,
  getMyPosts,
  getMyPostById,
  deleteMultiplePosts,
} from "../controllers/blogPostController.js";
import {
  protect,
  adminOnly,
  optionalAuth,
} from "../middlewares/authMiddleware.js";

//admin only middleware

router.post("/", protect, createPost);
router.get("/", getAllPosts);
router.get("/slug/:slug", getPostBySlug);
router.get("/admin/:id", protect, adminOnly, getPostByIdAdmin);
router.get("/mine", protect, getMyPosts);
router.get("/mine/:id", protect, getMyPostById);
router.put("/:id", protect, updatePost);
router.delete("/bulk-delete", protect, adminOnly, bulkDeletePosts);
router.delete("/multiple-delete", protect, deleteMultiplePosts);
router.delete("/:id", protect, deletePost);
router.get("/tags/:tag", getPostsByTag);
router.get("/search", searchPosts);
router.post("/:id/view", optionalAuth, incrementView);
router.post("/:id/like", protect, likePost);
router.get("/:id/like", protect, checkLikeStatus);
router.delete("/:id/unlike", protect, unlikePost);

router.get("/latest", getLatestPosts);
router.get("/trending", getTrendingPosts);

router.post("/:id/bookmark", protect, bookmarkPost);
router.delete("/:id/bookmark", protect, removeBookmark);
router.get("/bookmarks", protect, getBookmarkedPosts);
router.get("/:id/bookmark", protect, checkBookmarkStatus);

export default router;
