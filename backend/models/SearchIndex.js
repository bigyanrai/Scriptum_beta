// models/SearchIndex.js

import mongoose from "mongoose";

const SearchIndexSchema = new mongoose.Schema(
  {
    vocabulary: [String],

    idf: {
      type: mongoose.Schema.Types.Mixed,
    },

    documents: [
      {
        postId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "BlogPost",
        },

        title: String,

        slug: String,

        coverImageUrl: String, // <-- add this

        tags: [String], // <-- add this
        excerpt: String,
        vector: [Number],
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("SearchIndex", SearchIndexSchema);
