// import mongoose from "mongoose";

// const CommentSchema = new mongoose.Schema(
//   {
//     post: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "BlogPost",
//       required: true,
//     },

//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     content: {
//       type: String,
//       required: true,
//     },

//     parentComment: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Comment",
//       default: null,
//     },

//     isDeleted: {
//       type: Boolean,
//       default: false,
//     },

//     deletedBy: {
//       type: String,
//       enum: ["user", "admin"],
//       default: null,
//     },

//     deletedAt: {
//       type: Date,
//       default: null,
//     },
//     sentiment: {
//       type: String,
//       enum: ["positive", "negative"],
//       default: "positive",
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// const Comment =
//   mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

// export default Comment;

import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogPost",
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    // Stores the original content when a comment is soft-deleted.
    // This allows admins to search for deleted comments.
    originalContent: {
      type: String,
      default: null,
    },

    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedBy: {
      type: String,
      enum: ["user", "admin"],
      default: null,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    sentiment: {
      type: String,
      enum: ["positive", "negative"],
      default: "positive",
    },
  },
  {
    timestamps: true,
  },
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

export default Comment;
