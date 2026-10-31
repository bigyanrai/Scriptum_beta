import { useEffect, useRef, useState } from "react";
import { LuBell } from "react-icons/lu";
import { Link } from "react-router-dom";

import { getMyNotifications } from "../../service/notificationService.js";

import { useNotifications } from "../../context/notificationContext.jsx";

function NotificationBell() {
  const { unreadCount, markAsRead, markAllAsRead, notificationUpdateKey } =
    useNotifications();

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [markingAllRead, setMarkingAllRead] = useState(false);

  const notificationRef = useRef(null);

  /*
   * Fetch notifications.
   */
  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const data = await getMyNotifications({
        limit: 10,
      });

      setNotifications(data.notifications || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  /*
   * Fetch whenever dropdown opens.
   */
  useEffect(() => {
    if (!open) {
      return;
    }

    fetchNotifications();
  }, [open]);

  /*
   * IMPORTANT:
   *
   * If something changes notification state elsewhere,
   * refresh the dropdown if it is currently open.
   *
   * Example:
   *
   * NotificationsPage
   *      ↓
   * markAllAsRead()
   *      ↓
   * notificationUpdateKey changes
   *      ↓
   * NotificationBell sees the change
   *      ↓
   * fetchNotifications()
   */
  useEffect(() => {
    if (!open || notificationUpdateKey === 0) {
      return;
    }

    fetchNotifications();
  }, [notificationUpdateKey, open]);

  /*
   * Close dropdown when clicking outside.
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        event.preventDefault();
        event.stopPropagation();

        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [open]);

  /*
   * Mark ONE notification as read.
   */
  const handleMarkAsRead = async (notificationId) => {
    const notification = notifications.find(
      (item) => item._id === notificationId,
    );

    /*
     * Prevent double decrement.
     */
    if (!notification || notification.isRead) {
      return;
    }

    const success = await markAsRead(notificationId);

    if (!success) {
      return;
    }

    /*
     * Update dropdown immediately.
     */
    setNotifications((prev) =>
      prev.map((notification) =>
        notification._id === notificationId
          ? {
              ...notification,
              isRead: true,
            }
          : notification,
      ),
    );
  };

  /*
   * Mark ALL notifications as read.
   */
  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0 || markingAllRead) {
      return;
    }

    try {
      setMarkingAllRead(true);

      const success = await markAllAsRead();

      if (!success) {
        return;
      }

      /*
       * Update dropdown immediately.
       */
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );
    } finally {
      setMarkingAllRead(false);
    }
  };

  /*
   * Notification text.
   */
  const getNotificationText = (notification) => {
    const actorName = notification.actor?.name || "Someone";

    switch (notification.type) {
      case "post_like":
        return (
          <>
            <span className="font-medium text-gray-900">{actorName}</span> liked
            your post
          </>
        );

      case "post_comment":
        return (
          <>
            <span className="font-medium text-gray-900">{actorName}</span>{" "}
            commented on your post
          </>
        );

      case "comment_reply":
        return (
          <>
            <span className="font-medium text-gray-900">{actorName}</span>{" "}
            replied to your comment
          </>
        );

      case "post_save":
        return (
          <>
            <span className="font-medium text-gray-900">{actorName}</span> saved
            your post
          </>
        );

      case "post_milestone":
        return (
          <>
            Your post reached{" "}
            <span className="font-medium text-gray-900">
              {notification.milestone?.toLocaleString()} views
            </span>
          </>
        );

      default:
        return "You have a new notification";
    }
  };

  /*
   * Notification link.
   */
  const getNotificationLink = (notification) => {
    const slug = notification.post?.slug;

    if (!slug) {
      return "/";
    }

    if (
      (notification.type === "comment_reply" ||
        notification.type === "post_comment") &&
      notification.comment?._id
    ) {
      return `/${slug}?comment=${notification.comment._id}`;
    }

    return `/${slug}`;
  };

  return (
    <div ref={notificationRef} className="relative">
      {/* Bell */}
      <button
        type="button"
        aria-label="Notifications"
        aria-expanded={open}
        className="
          group
          relative
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          border
          border-gray-200
          bg-white
          text-gray-600
          shadow-sm
          transition-all
          duration-200
          hover:border-gray-300
          hover:bg-gray-50
          hover:text-gray-950
          active:scale-95
          sm:h-10
          sm:w-10
        "
        onClick={() => setOpen((prev) => !prev)}
      >
        <LuBell
          className="
            text-[17px]
            transition-transform
            duration-200
            group-hover:scale-105
            sm:text-[18px]
          "
        />

        {unreadCount > 0 && (
          <span
            className="
              absolute
              -right-0.5
              -top-0.5
              flex
              min-h-[17px]
              min-w-[17px]
              items-center
              justify-center
              rounded-full
              bg-red-500
              px-1
              text-[10px]
              font-semibold
              leading-none
              text-white
              ring-2
              ring-white
            "
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            fixed
            right-0
            top-[64px]
            z-[100]
            w-[360px]
            max-w-[calc(100vw-16px)]
            overflow-hidden
            border
            border-gray-200
            bg-white
            shadow-[0_12px_40px_rgba(0,0,0,0.12)]
            sm:top-[68px]
            sm:w-[380px]
            sm:max-w-[calc(100vw-24px)]
          "
        >
          {/* Header */}
          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-gray-100
              px-4
              py-3.5
            "
          >
            <div>
              <h3 className="text-[15px] font-semibold text-gray-950">
                Notifications
              </h3>

              {unreadCount > 0 && (
                <p className="mt-0.5 text-xs text-gray-500">
                  {unreadCount} unread
                </p>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                disabled={markingAllRead}
                onClick={handleMarkAllAsRead}
                className="
                  text-xs
                  font-medium
                  text-gray-500
                  transition-colors
                  hover:text-gray-950
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {markingAllRead ? "Marking..." : "Mark all as read"}
              </button>
            )}
          </div>

          {/* Notifications */}
          <div className="max-h-[420px] overflow-y-auto">
            {loading ? (
              <div className="space-y-1 p-2">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="
                      flex
                      gap-3
                      rounded-xl
                      px-3
                      py-3
                    "
                  >
                    <div
                      className="
                        h-9
                        w-9
                        shrink-0
                        animate-pulse
                        rounded-full
                        bg-gray-200
                      "
                    />

                    <div className="flex-1 space-y-2">
                      <div
                        className="
                          h-3
                          w-4/5
                          animate-pulse
                          rounded
                          bg-gray-200
                        "
                      />

                      <div
                        className="
                          h-2.5
                          w-2/5
                          animate-pulse
                          rounded
                          bg-gray-100
                        "
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : notifications.length === 0 ? (
              <div
                className="
                  flex
                  min-h-[180px]
                  flex-col
                  items-center
                  justify-center
                  px-6
                  text-center
                "
              >
                <div
                  className="
                    mb-3
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-100
                  "
                >
                  <LuBell className="text-xl text-gray-400" />
                </div>

                <p className="text-sm font-medium text-gray-700">
                  No notifications
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  You're all caught up.
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <Link
                  key={notification._id}
                  to={getNotificationLink(notification)}
                  onClick={async () => {
                    if (!notification.isRead) {
                      await handleMarkAsRead(notification._id);
                    }

                    setOpen(false);
                  }}
                  className={`
                    block
                    border-b
                    border-gray-50
                    px-4
                    py-3
                    transition-colors
                    hover:bg-gray-50
                    ${notification.isRead ? "bg-white" : "bg-gray-50/80"}
                  `}
                >
                  <div className="flex gap-3">
                    {/* Actor avatar */}
                    <div
                      className="
                        h-9
                        w-9
                        shrink-0
                        overflow-hidden
                        rounded-full
                        bg-gray-100
                      "
                    >
                      {notification.actor?.profileImageUrl ? (
                        <img
                          src={notification.actor.profileImageUrl}
                          alt={notification.actor.name || "User"}
                          className="
                            h-full
                            w-full
                            object-cover
                          "
                        />
                      ) : (
                        <div
                          className="
                            flex
                            h-full
                            w-full
                            items-center
                            justify-center
                            text-xs
                            font-semibold
                            text-gray-500
                          "
                        >
                          {notification.actor?.name?.charAt(0)?.toUpperCase() ||
                            "?"}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <p
                        className="
                          text-[13px]
                          leading-5
                          text-gray-600
                        "
                      >
                        {getNotificationText(notification)}
                      </p>

                      {notification.post?.title && (
                        <p
                          className="
                            mt-0.5
                            truncate
                            text-xs
                            font-medium
                            text-gray-900
                          "
                        >
                          {notification.post.title}
                        </p>
                      )}

                      <p
                        className="
                          mt-1
                          text-[11px]
                          text-gray-400
                        "
                      >
                        {formatNotificationTime(notification.createdAt)}
                      </p>
                    </div>

                    {/* Unread indicator */}
                    {!notification.isRead && (
                      <span
                        className="
                          mt-2
                          h-2
                          w-2
                          shrink-0
                          rounded-full
                          bg-gray-900
                        "
                      />
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div
              className="
                border-t
                border-gray-100
                px-4
                py-2.5
                text-center
              "
            >
              <Link
                to="/notifications"
                onClick={() => setOpen(false)}
                className="
                  text-xs
                  font-medium
                  text-gray-500
                  transition-colors
                  hover:text-gray-950
                "
              >
                View all notifications
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/*
 * Relative time
 */
const formatNotificationTime = (date) => {
  if (!date) {
    return "";
  }

  const now = Date.now();
  const created = new Date(date).getTime();

  const seconds = Math.floor((now - created) / 1000);

  if (seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days}d ago`;
  }

  return new Date(date).toLocaleDateString();
};

export default NotificationBell;
