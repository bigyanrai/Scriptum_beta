// import mongoose from "mongoose";

// const BlogPostSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     slug: { type: String, required: true, unique: true },
//     content: { type: String, required: true }, //markdown
//     coverImageUrl: { type: String, default: null },
//     tags: [{ type: String }],
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     isDraft: { type: Boolean, default: false },
//     views: { type: Number, default: 0 },
//     likes: { type: Number, default: 0 },
//     generatedByAI: { type: Boolean, default: false },

//     cluster: {
//       type: Number,
//       index: true,
//       default: null,
//     },
//   },
//   { timestamps: true },
// );

// const BlogPost =
//   mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);
// export default BlogPost;

import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true }, // markdown
    coverImageUrl: { type: String, default: null },
    tags: [{ type: String }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isDraft: { type: Boolean, default: false },

    publishedAt: {
      type: Date,
      default: null,
    },

    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    generatedByAI: { type: Boolean, default: false },

    cluster: {
      type: Number,
      index: true,
      default: null,
    },
  },
  { timestamps: true },
);

const BlogPost =
  mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);

export default BlogPost;
