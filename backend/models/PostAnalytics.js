import mongoose from "mongoose";

const postAnalyticsSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogPost",
      required: true,
      index: true,
    },

    // Stored as the beginning of the calendar day.
    // One document exists per post per day.
    date: {
      type: Date,
      required: true,
      index: true,
    },

    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    likes: {
      type: Number,
      default: 0,
      min: 0,
    },

    comments: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

/*
 * One analytics document per post per day.
 *
 * Example:
 *
 * post: 123
 * date: 2026-08-22
 *
 * views: 150
 * likes: 12
 * comments: 4
 */
postAnalyticsSchema.index(
  {
    post: 1,
    date: 1,
  },
  {
    unique: true,
  },
);

export default mongoose.model("PostAnalytics", postAnalyticsSchema);
