import axiosInstance from "./../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const getMyNotifications = async (params = {}) => {
  const response = await axiosInstance.get(
    API_PATHS.NOTIFICATIONS.GET_MY_NOTIFICATIONS,
    {
      params,
    },
  );

  return response.data;
};

export const getUnreadNotificationCount = async () => {
  const response = await axiosInstance.get(
    API_PATHS.NOTIFICATIONS.GET_UNREAD_COUNT,
  );

  return response.data;
};

export const markNotificationAsRead = async (notificationId) => {
  const response = await axiosInstance.put(
    API_PATHS.NOTIFICATIONS.MARK_AS_READ(notificationId),
  );

  return response.data;
};

export const markAllNotificationsAsRead = async () => {
  const response = await axiosInstance.put(
    API_PATHS.NOTIFICATIONS.MARK_ALL_AS_READ,
  );

  return response.data;
};
