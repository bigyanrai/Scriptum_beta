import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    // User who receives the notification
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // User who caused the notification
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "post_like",
        "post_comment",
        "comment_reply",
        "post_save",
        "post_milestone",
      ],
      required: true,
    },

    // Related post
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogPost",
      default: null,
    },

    // Related comment/reply
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    // Used for milestone notifications
    milestone: {
      type: Number,
      default: null,
    },

    // Whether the user has opened/read it
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Optimized for notification inbox
NotificationSchema.index({
  recipient: 1,
  createdAt: -1,
  _id: -1,
});

// Prevent the same milestone from being notified twice
NotificationSchema.index(
  {
    recipient: 1,
    post: 1,
    type: 1,
    milestone: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      type: "post_milestone",
      milestone: { $type: "number" },
    },
  },
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);

export default Notification;
