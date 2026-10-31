import express from "express";

import {
  registerUser,
  loginUser,
  getUserProfile,
  forgotPassword,
  resetPassword,
  getUserByEmail,
  getAllUsers,
  getUserProfileById,
  deleteUserById,
  updateUserById,
  deleteAccount,
  getUserProfileByIdAdmin,
  bulkDeleteUsers,
  googleAuth,
  changePassword,
} from "../controllers/authController.js";

import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import cloudinary from "../config/cloudinaryConfig.js";

const router = express.Router();

// authroutes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);
router.get("/profile", protect, getUserProfile);
router.get("/profile/:id", protect, getUserProfileById);
router.get("/profile/admin/:id", protect, getUserProfileByIdAdmin);
router.get("/profilebyemail/:email", getUserByEmail);
router.get("/members", protect, getAllUsers);
router.delete("/members/bulk-delete", protect, bulkDeleteUsers);
router.delete("/members/:id", protect, deleteUserById);
router.delete("/delete-account", protect, deleteAccount);
router.put("/update/:id", updateUserById);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.put("/change-password", protect, changePassword);

router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "scriptum/posts",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      stream.end(req.file.buffer);
    });

    return res.status(200).json({
      message: "Uploaded successfully",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    return res.status(500).json({
      message: "Failed to upload image",
      error: error.message,
    });
  }
});
export default router;
