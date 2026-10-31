import mongoose from "mongoose";

const PostClapSchema = new mongoose.Schema(
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
    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

PostClapSchema.index({ post: 1, user: 1 }, { unique: true });

export default mongoose.model("PostClap", PostClapSchema);
