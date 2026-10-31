import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuBell, LuCheck, LuLoaderCircle } from "react-icons/lu";

import { getMyNotifications } from "../../service/notificationService.js";

import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout.jsx";

import { useNotifications } from "../../context/notificationContext.jsx";

function NotificationsPage() {
  const navigate = useNavigate();

  /*
   * Global notification state.
   *
   * This is the SAME state used by NotificationBell.
   */
  const { unreadCount, markAsRead, markAllAsRead, notificationUpdateKey } =
    useNotifications();

  const [notifications, setNotifications] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [markingAllRead, setMarkingAllRead] = useState(false);

  /*
   * Initial notification fetch.
   */
  useEffect(() => {
    fetchNotifications();
  }, []);

  /*
   * If another notification component changes notification
   * state while this page is mounted, synchronize the local
   * notification list.
   *
   * This is especially useful if the notification bell is
   * available while this page is mounted.
   */
  useEffect(() => {
    if (notificationUpdateKey === 0) {
      return;
    }

    /*
     * We don't need to refetch the entire list here.

     * The local list is updated optimistically by the
     * handlers below.

     * However, if the change happened somewhere else,
     * refetch to make sure the page reflects the server.
     */
    fetchNotifications();
  }, [notificationUpdateKey]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const data = await getMyNotifications({
        limit: 20,
      });

      setNotifications(data.notifications || []);
      setNextCursor(data.nextCursor || null);
      setHasMore(Boolean(data.hasMore));
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (!nextCursor || loadingMore) {
      return;
    }

    try {
      setLoadingMore(true);

      const data = await getMyNotifications({
        limit: 20,
        before: nextCursor,
      });

      setNotifications((prev) => [...prev, ...(data.notifications || [])]);

      setNextCursor(data.nextCursor || null);
      setHasMore(Boolean(data.hasMore));
    } catch (error) {
      console.error("Failed to load more notifications:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  /*
   * Mark ONE notification as read.
   *
   * IMPORTANT:
   * We use the context method instead of calling the service
   * directly.
   */
  const handleMarkAsRead = async (notificationId) => {
    const notification = notifications.find(
      (item) => item._id === notificationId,
    );

    /*
     * Already read.
     * Don't decrement the global count again.
     */
    if (!notification || notification.isRead) {
      return;
    }

    const success = await markAsRead(notificationId);

    if (!success) {
      return;
    }

    /*
     * Update this page immediately.
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
       * Update this page immediately.
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
   * Clicking a notification:
   *
   * 1. Mark it as read if necessary.
   * 2. Navigate to the post.
   */
  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await handleMarkAsRead(notification._id);
    }

    const slug = notification.post?.slug;

    if (!slug) {
      return;
    }

    if (
      (notification.type === "post_comment" ||
        notification.type === "comment_reply") &&
      notification.comment?._id
    ) {
      navigate(`/${slug}?comment=${notification.comment._id}`);
      return;
    }

    navigate(`/${slug}`);
  };

  const getNotificationText = (notification) => {
    const actorName = notification.actor?.name || "Someone";

    switch (notification.type) {
      case "post_like":
        return (
          <>
            <span className="font-medium text-gray-950">{actorName}</span> liked
            your post
          </>
        );

      case "post_comment":
        return (
          <>
            <span className="font-medium text-gray-950">{actorName}</span>{" "}
            commented on your post
          </>
        );

      case "comment_reply":
        return (
          <>
            <span className="font-medium text-gray-950">{actorName}</span>{" "}
            replied to your comment
          </>
        );

      case "post_save":
        return (
          <>
            <span className="font-medium text-gray-950">{actorName}</span> saved
            your post
          </>
        );

      case "post_milestone":
        return (
          <>
            Your post reached{" "}
            <span className="font-medium text-gray-950">
              {notification.milestone?.toLocaleString()} views
            </span>
          </>
        );

      default:
        return "You have a new notification";
    }
  };

  const getNotificationIcon = (notification) => {
    switch (notification.type) {
      case "post_like":
        return "♥";

      case "post_comment":
        return "C";

      case "comment_reply":
        return "↩";

      case "post_save":
        return "S";

      case "post_milestone":
        return "★";

      default:
        return "•";
    }
  };

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

  return (
    <BlogLayout>
      <div className="min-h-screen">
        <div className="mx-auto w-full max-w-3xl">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200">
                  <LuBell className="text-lg text-gray-700" />
                </div>

                <div>
                  <h1 className="text-xl font-semibold tracking-tight text-gray-950 sm:text-2xl">
                    Notifications
                  </h1>

                  {!loading && unreadCount > 0 && (
                    <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                      {unreadCount} unread
                    </p>
                  )}
                </div>
              </div>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                disabled={markingAllRead}
                onClick={handleMarkAllAsRead}
                className="
                  inline-flex
                  shrink-0
                  items-center
                  gap-1.5
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  px-3
                  py-2
                  text-xs
                  font-medium
                  text-gray-600
                  shadow-sm
                  transition-colors
                  hover:border-gray-300
                  hover:bg-gray-50
                  hover:text-gray-950
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  sm:px-3.5
                  sm:text-sm
                "
              >
                {markingAllRead ? (
                  <LuLoaderCircle className="animate-spin text-sm" />
                ) : (
                  <LuCheck className="text-sm" />
                )}

                <span>
                  {markingAllRead ? "Marking..." : "Mark all as read"}
                </span>
              </button>
            )}
          </div>

          {/* Notification card */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {loading ? (
              <div className="divide-y divide-gray-100">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex gap-3 px-4 py-4 sm:px-5">
                    <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-gray-200" />

                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="h-3.5 w-3/4 animate-pulse rounded bg-gray-200" />
                      <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
                      <div className="h-2.5 w-16 animate-pulse rounded bg-gray-100" />
                    </div>
                  </div>
                ))}
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                  <LuBell className="text-2xl text-gray-400" />
                </div>

                <h2 className="text-sm font-semibold text-gray-700">
                  No notifications yet
                </h2>

                <p className="mt-1 max-w-xs text-xs leading-5 text-gray-400 sm:text-sm">
                  When someone interacts with your posts or comments, you'll see
                  their activity here.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <button
                    key={notification._id}
                    type="button"
                    onClick={() => handleNotificationClick(notification)}
                    className={`
                      group
                      flex
                      w-full
                      gap-3
                      px-4
                      py-4
                      text-left
                      transition-colors
                      hover:bg-gray-50
                      sm:px-5
                      ${notification.isRead ? "bg-white" : "bg-gray-50/70"}
                    `}
                  >
                    {/* Avatar */}
                    <div className="relative h-10 w-10 shrink-0">
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                        {notification.actor?.profileImageUrl ? (
                          <img
                            src={notification.actor.profileImageUrl}
                            alt={notification.actor.name || "User"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-gray-500">
                            {notification.actor?.name
                              ?.charAt(0)
                              ?.toUpperCase() || "?"}
                          </div>
                        )}
                      </div>

                      <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-gray-900 text-[9px] font-semibold text-white">
                        {getNotificationIcon(notification)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-5 text-gray-600">
                        {getNotificationText(notification)}
                      </p>

                      {notification.post?.title && (
                        <p className="mt-1 truncate text-sm font-medium text-gray-900">
                          {notification.post.title}
                        </p>
                      )}

                      {notification.type === "post_comment" &&
                        notification.comment?.content && (
                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-400">
                            "{notification.comment.content}"
                          </p>
                        )}

                      {notification.type === "comment_reply" &&
                        notification.comment?.content && (
                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-400">
                            "{notification.comment.content}"
                          </p>
                        )}

                      <p className="mt-1.5 text-[11px] text-gray-400">
                        {formatNotificationTime(notification.createdAt)}
                      </p>
                    </div>

                    {/* Unread indicator */}
                    {!notification.isRead && (
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-gray-900" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Load more */}
          {!loading && hasMore && (
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                disabled={loadingMore}
                onClick={handleLoadMore}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-gray-600
                  shadow-sm
                  transition-colors
                  hover:border-gray-300
                  hover:bg-gray-50
                  hover:text-gray-950
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {loadingMore && <LuLoaderCircle className="animate-spin" />}

                {loadingMore ? "Loading..." : "Load more"}
              </button>
            </div>
          )}

          {/* End message */}
          {!loading && notifications.length > 0 && !hasMore && (
            <p className="mt-6 text-center text-xs text-gray-400">
              You're all caught up.
            </p>
          )}
        </div>
      </div>
    </BlogLayout>
  );
}

export default NotificationsPage;
