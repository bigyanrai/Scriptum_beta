import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: false,
    },

    googleId: {
      type: String,
      default: null,
    },

    profileImageUrl: {
      type: String,
    },

    bio: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },

    resetPasswordToken: String,

    resetPasswordExpires: Date,
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
