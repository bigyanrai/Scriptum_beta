import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import {
  addComment,
  getCommentsByPost,
  getAllComments,
  deleteComment,
  deleteOwnComment,
  editOwnComment,
  deleteCommentOnly,
  getCommentById,
  deleteCommentThread,
  deleteCommentsBulk,
} from "../controllers/commentController.js";
const router = express.Router();

router.post("/:postId", protect, addComment);
router.get("/admin/search/:commentId", protect, adminOnly, getCommentById);
router.get("/:postId", getCommentsByPost);
router.get("/", getAllComments);
router.delete("/bulk-delete", protect, adminOnly, deleteCommentsBulk);
router.delete("/:commentId", protect, deleteComment);
router.delete("/thread/:commentId", protect, adminOnly, deleteCommentThread);
router.delete("/myComment/:commentId", protect, deleteOwnComment);
router.put("/my-comment/:commentId", protect, editOwnComment);
router.delete("/parentOnly/:commentId", protect, adminOnly, deleteCommentOnly);

export default router;
