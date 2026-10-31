import mongoose from "mongoose";

const PostBookmarkSchema = new mongoose.Schema(
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
  {
    timestamps: true,
  },
);

// Prevent a user from bookmarking the same post more than once
PostBookmarkSchema.index({ post: 1, user: 1 }, { unique: true });

const PostBookmark =
  mongoose.models.PostBookmark ||
  mongoose.model("PostBookmark", PostBookmarkSchema);

export default PostBookmark;
