import Notification from "../models/Notification.js";

// ============================================================
// GET MY NOTIFICATIONS
// Cursor pagination
// ============================================================

export const getMyNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 50);

    const { before } = req.query;

    const query = {
      recipient: userId,
    };

    // Cursor pagination
    if (before) {
      const cursorNotification = await Notification.findOne({
        _id: before,
        recipient: userId,
      }).select("createdAt");

      if (cursorNotification) {
        query.$or = [
          {
            createdAt: {
              $lt: cursorNotification.createdAt,
            },
          },
          {
            createdAt: cursorNotification.createdAt,
            _id: {
              $lt: cursorNotification._id,
            },
          },
        ];
      }
    }

    const notifications = await Notification.find(query)
      .populate("actor", "name profileImageUrl")
      .populate("post", "title slug")
      .populate("comment", "content")
      .sort({
        createdAt: -1,
        _id: -1,
      })
      .limit(limit + 1);

    const hasMore = notifications.length > limit;

    if (hasMore) {
      notifications.pop();
    }

    const nextCursor =
      hasMore && notifications.length > 0
        ? notifications[notifications.length - 1]._id
        : null;

    res.json({
      notifications,
      nextCursor,
      hasMore,
    });
  } catch (error) {
    console.error("Get my notifications error:", error);

    res.status(500).json({
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
};

// ============================================================
// GET UNREAD NOTIFICATION COUNT
// ============================================================

export const getUnreadNotificationCount = async (req, res) => {
  try {
    const userId = req.user._id;

    const count = await Notification.countDocuments({
      recipient: userId,
      isRead: false,
    });

    res.json({
      count,
    });
  } catch (error) {
    console.error("Get unread notification count error:", error);

    res.status(500).json({
      message: "Failed to get unread notification count",
      error: error.message,
    });
  }
};

// ============================================================
// MARK ONE NOTIFICATION AS READ
// ============================================================

export const markNotificationAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user._id;

    const notification = await Notification.findOneAndUpdate(
      {
        _id: notificationId,
        recipient: userId,
      },
      {
        $set: {
          isRead: true,
        },
      },
      {
        new: true,
      },
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error("Mark notification as read error:", error);

    res.status(500).json({
      message: "Failed to mark notification as read",
      error: error.message,
    });
  }
};

// ============================================================
// MARK ALL NOTIFICATIONS AS READ
// ============================================================

export const markAllNotificationsAsRead = async (req, res) => {
  try {
    const userId = req.user._id;

    const result = await Notification.updateMany(
      {
        recipient: userId,
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      },
    );

    res.json({
      message: "All notifications marked as read",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Mark all notifications as read error:", error);

    res.status(500).json({
      message: "Failed to mark all notifications as read",
      error: error.message,
    });
  }
};
