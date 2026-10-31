import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserContext } from "./userContext";
import {
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../service/notificationService.js";
const NotificationContext = createContext(null);
export const NotificationProvider = ({ children }) => {
  const { user, loading: userLoading } = useContext(UserContext);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingUnreadCount, setLoadingUnreadCount] = useState(true);
  /* * This value is used to tell other notification components * that a notification state has changed. * * Example: * * NotificationsPage marks something as read * ↓ * Context updates unreadCount * ↓ * Context increments notificationUpdateKey * ↓ * NotificationBell sees the change * ↓ * NotificationBell refreshes its notifications */ const [
    notificationUpdateKey,
    setNotificationUpdateKey,
  ] = useState(0);
  const fetchUnreadCount = useCallback(async () => {
    if (!user) {
      setUnreadCount(0);
      setLoadingUnreadCount(false);
      return;
    }
    try {
      setLoadingUnreadCount(true);
      const data = await getUnreadNotificationCount();
      setUnreadCount(Number(data?.count) || 0);
    } catch (error) {
      console.error("Failed to fetch unread notification count:", error);
      setUnreadCount(0);
    } finally {
      setLoadingUnreadCount(false);
    }
  }, [user]);
  /* * Wait until authentication has finished checking. */ useEffect(() => {
    if (userLoading) {
      return;
    }
    fetchUnreadCount();
  }, [userLoading, fetchUnreadCount]);
  /* * Mark ONE notification as read. */ const markAsRead = useCallback(
    async (notificationId) => {
      if (!notificationId) {
        return false;
      }
      try {
        await markNotificationAsRead(notificationId);
        /* * Decrease unread count, but never below zero. */ setUnreadCount(
          (prev) => {
            const currentCount = Number(prev) || 0;
            return Math.max(currentCount - 1, 0);
          },
        );
        /* * Tell other notification components that something changed. */ setNotificationUpdateKey(
          (prev) => prev + 1,
        );
        return true;
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
        return false;
      }
    },
    [],
  );
  /* * Mark ALL notifications as read. */ const markAllAsRead =
    useCallback(async () => {
      try {
        await markAllNotificationsAsRead();
        /* * Global unread count immediately becomes zero. */ setUnreadCount(0);
        /* * Tell other notification components that all * notifications have changed. */ setNotificationUpdateKey(
          (prev) => prev + 1,
        );
        return true;
      } catch (error) {
        console.error("Failed to mark all notifications as read:", error);
        return false;
      }
    }, []);
  return (
    <NotificationContext.Provider
      value={{
        unreadCount,
        loadingUnreadCount,
        fetchUnreadCount,
        markAsRead,
        markAllAsRead,
        /* * Consumers can watch this value to know that * notification state has changed somewhere else. */ notificationUpdateKey,
      }}
    >
      {" "}
      {children}{" "}
    </NotificationContext.Provider>
  );
};
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider",
    );
  }
  return context;
};
