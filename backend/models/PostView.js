import mongoose from "mongoose";

const PostViewSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogPost",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

// One record per user per post
PostViewSchema.index({ post: 1, user: 1 }, { unique: true });

export default mongoose.model("PostView", PostViewSchema);
