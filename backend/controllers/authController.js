import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import Comment from "../models/Comment.js";
import BlogPost from "../models/BlogPost.js";
import mongoose from "mongoose";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//generate jwt token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

/////////////////////////////////////////////
// public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl, bio, adminAccessToken } =
      req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //determine user role:admin if correct token is provided,otherwise member
    let role = "member";
    if (
      adminAccessToken &&
      adminAccessToken == process.env.ADMIN_ACCESS_TOKEN
    ) {
      role = "admin";
    }
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl: profileImageUrl || undefined,
      bio,
      role,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      bio: user.bio,
      role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "Invalid email or password" });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({ message: "Invalid email or password" });
    }

    //return user data with jwt
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProfileById = async (req, res) => {
  try {
    const user = await User.findById(req.body.id).select("-password");
    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfileByIdAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);

    res.status(500).json({ message: error.message });
  }
};

// const getAllUsers = async (req, res) => {
//   try {
//     const page = req.query.page ? Number(req.query.page) : 1;
//     const limit = req.query.limit ? Number(req.query.limit) : 5;

//     const skip = (page - 1) * limit;

//     const users = await User.find()
//       .select("-password")
//       .sort({
//         createdAt: -1,
//         _id: -1,
//       })
//       .skip(skip)
//       .limit(limit);

//     const totalUsers = await User.countDocuments();

//     res.json({
//       users,
//       page,
//       totalPages: Math.ceil(totalUsers / limit),
//       totalUsers,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

const getAllUsers = async (req, res) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 5;

    const sortBy = req.query.sortBy || "newest";
    const role = req.query.role || "all";

    const skip = (page - 1) * limit;

    // -----------------------------
    // ROLE FILTER
    // -----------------------------

    const filter = {};

    if (role === "admin" || role === "member") {
      filter.role = role;
    }

    // -----------------------------
    // SORTING
    // -----------------------------

    let sort = {};

    switch (sortBy) {
      case "newest":
        sort = {
          createdAt: -1,
          _id: -1,
        };
        break;

      case "oldest":
        sort = {
          createdAt: 1,
          _id: 1,
        };
        break;

      case "updated":
        sort = {
          updatedAt: -1,
          _id: -1,
        };
        break;

      case "name_asc":
        sort = {
          name: 1,
          _id: 1,
        };
        break;

      case "name_desc":
        sort = {
          name: -1,
          _id: -1,
        };
        break;

      case "email_asc":
        sort = {
          email: 1,
          _id: 1,
        };
        break;

      case "email_desc":
        sort = {
          email: -1,
          _id: -1,
        };
        break;

      default:
        sort = {
          createdAt: -1,
          _id: -1,
        };
        break;
    }

    // -----------------------------
    // GET USERS
    // -----------------------------

    const users = await User.find(filter)
      .select("-password")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    // -----------------------------
    // TOTAL COUNTS
    // -----------------------------

    const totalUsers = await User.countDocuments();

    const totalMembers = await User.countDocuments({
      role: "member",
    });

    const totalAdmins = await User.countDocuments({
      role: "admin",
    });

    // Total users based on current filter
    const totalFilteredUsers = await User.countDocuments(filter);

    res.json({
      users,

      // Pagination
      page,
      totalPages: Math.ceil(totalFilteredUsers / limit),

      // Current filtered result count
      totalFilteredUsers,

      // Overall statistics
      totalUsers,
      totalMembers,
      totalAdmins,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // User to be deleted
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Prevent deleting yourself
    // if (req.user.id === id) {
    //   return res.status(403).json({
    //     message: "You cannot delete your own account.",
    //   });
    // }

    // Prevent deleting another admin
    if (user.role === "admin") {
      return res.status(403).json({
        message: "Admins cannot be deleted.",
      });
    }

    // Keep comments/replies but remove the user reference
    await Comment.updateMany(
      { author: id },
      {
        $set: {
          author: null,
          authorName: user.name,
        },
      },
    );

    // Keep blog posts but remove the user reference
    await BlogPost.updateMany(
      { author: id },
      {
        $set: {
          author: null,
          authorName: user.name,
        },
      },
    );

    // Delete the user
    await User.findByIdAndDelete(id);

    return res.status(200).json({
      message: "User deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id; // populated by auth middleware
    const { password } = req.body;

    if (!password?.trim()) {
      return res.status(400).json({
        message: "Password is required.",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Incorrect password.",
      });
    }

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      message: "Account deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Account Error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};
const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select(
      "-password",
    );
    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, profileImageUrl, bio } = req.body;

    // Check if user exists
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check if email is already taken by another user
    const emailExists = await User.findOne({
      email,
      _id: { $ne: id },
    });

    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Update fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.bio = bio ?? user.bio;

    if (profileImageUrl !== undefined) {
      user.profileImageUrl = profileImageUrl;
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        profileImageUrl: updatedUser.profileImageUrl,
        bio: updatedUser.bio,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    const role = user.role;

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;

    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    let resetLink;
    if (role == "admin") {
      resetLink = `http://localhost:5173/reset-password/${token}`;
    } else {
      resetLink = `http://localhost:5173/reset-password-member/${token}`;
    }

    await sendEmail(
      user.email,
      "Reset Your Password",
      `
  <div style="margin:0;padding:40px 0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
            
            <tr>
              <td style="background:#111827;padding:24px;text-align:center;">
                <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:bold;">
                  Scriptum
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding:40px 35px;">
                <h2 style="margin:0 0 20px;color:#111827;">
                  Reset Your Password
                </h2>

                <p style="font-size:16px;color:#4b5563;line-height:1.7;margin-bottom:18px;">
                  Hello,
                </p>

                <p style="font-size:16px;color:#4b5563;line-height:1.7;margin-bottom:30px;">
                  We received a request to reset the password for your
                  <strong>Scriptum</strong> account.
                  Click the button below to create a new password.
                </p>

                <div style="text-align:center;margin:35px 0;">
                  <a
                    href="${resetLink}"
                    style="
                      display:inline-block;
                      background:#111827;
                      color:#ffffff;
                      text-decoration:none;
                      padding:14px 34px;
                      border-radius:8px;
                      font-size:16px;
                      font-weight:bold;
                    "
                  >
                    Reset Password
                  </a>
                </div>

                <p style="font-size:15px;color:#6b7280;line-height:1.7;">
                  This password reset link will expire in
                  <strong>10 minutes</strong>.
                </p>

                <p style="font-size:15px;color:#6b7280;line-height:1.7;">
                  If you didn't request a password reset, you can safely ignore
                  this email. Your password will remain unchanged.
                </p>
              </td>
            </tr>

            <tr>
              <td style="border-top:1px solid #e5e7eb;padding:24px;text-align:center;">
                <p style="margin:0;font-size:13px;color:#9ca3af;">
                  © ${new Date().getFullYear()} Scriptum. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
  `,
    );

    res.status(200).json({
      message: "Reset email sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired link",
      });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required.",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters long.",
      });
    }

    // Get logged-in user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Google-only accounts don't have a password
    if (!user.password) {
      return res.status(400).json({
        success: false,
        message:
          "This account does not have a password. Please use your account provider to manage your login.",
      });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    // Prevent using the same password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from your current password.",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    user.password = hashedPassword;

    // Clear any existing reset-password token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Change password error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while changing your password.",
    });
  }
};

// Bulk delete members
const bulkDeleteUsers = async (req, res) => {
  try {
    const { userIds } = req.body;

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({
        message: "No members selected for deletion",
      });
    }

    // Validate IDs
    const invalidIds = userIds.filter(
      (id) => !mongoose.Types.ObjectId.isValid(id),
    );

    if (invalidIds.length > 0) {
      return res.status(400).json({
        message: "One or more invalid user IDs",
      });
    }

    // Make absolutely sure only members can be deleted
    const users = await User.find({
      _id: { $in: userIds },
    }).select("_id role");

    const adminSelected = users.some((user) => user.role === "admin");

    if (adminSelected) {
      return res.status(403).json({
        message: "Admin accounts cannot be deleted through bulk deletion",
      });
    }

    // Only delete users whose role is member
    const result = await User.deleteMany({
      _id: { $in: userIds },
      role: "member",
    });

    res.json({
      message: `${result.deletedCount} member(s) deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Bulk delete members error:", error);

    res.status(500).json({
      message: "Failed to delete members",
      error: error.message,
    });
  }
};

const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required",
      });
    }

    // Verify the credential with Google
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({
        message: "Invalid Google credential",
      });
    }

    const { sub: googleId, email, name, picture, email_verified } = payload;

    if (!email || !email_verified) {
      return res.status(401).json({
        message: "Unable to verify your Google email address",
      });
    }

    // Check whether the user already exists
    let user = await User.findOne({ email });

    // ==================================================
    // EXISTING USER
    // ==================================================
    if (user) {
      // Admin accounts cannot use Google authentication
      if (user.role === "admin") {
        return res.status(403).json({
          message:
            "Google authentication is not available for administrator accounts. Please use the admin login.",
        });
      }

      /*
       * Existing member:
       *
       * Link Google authentication to the existing account.
       *
       * IMPORTANT:
       * The existing password is NOT changed or deleted.
       */

      user.googleId = googleId;

      // Only use Google's profile picture if the user
      // doesn't already have one.
      if (!user.profileImageUrl && picture) {
        user.profileImageUrl = picture;
      }

      await user.save();

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        bio: user.bio,
        role: user.role,
        token: generateToken(user._id),
      });
    }

    // ==================================================
    // NEW GOOGLE USER
    // ==================================================
    user = await User.create({
      name: name || "Google User",
      email,
      googleId,
      profileImageUrl: picture || undefined,
      bio: "",
      role: "member",
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      bio: user.bio,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Google authentication error:", error);

    return res.status(500).json({
      message: "Google authentication failed. Please try again.",
    });
  }
};

export {
  bulkDeleteUsers,
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
  googleAuth,
  changePassword,
};
