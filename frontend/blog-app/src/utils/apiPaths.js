// export const BASE_URL = "http://localhost:8000";

//for production
export const BASE_URL = import.meta.env.VITE_API_URL;
export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GOOGLE_AUTH: "/api/auth/google",
    GET_PROFILE: "/api/auth/profile",
    GET_PROFILE_BY_ID: (id) => `/api/auth/profile/${id}`,
    GET_PROFILE_BY_ID_ADMIN: (id) => `/api/auth/profile/admin/${id}`,
    GET_ALL_USERS: "/api/auth/members",
    GET_PROFILE_BY_EMAIL: (email) => `/api/auth/profilebyemail/${email}`,
    UPDATE_USER_BY_ID: (id) => `/api/auth/update/${id}`,
    DELETE_ACCOUNT: "/api/auth/delete-account",
    DELETE_USER_BY_ID: (id) => `/api/auth/members/${id}`,
    DELETE_USERS_BULK: "/api/auth/members/bulk-delete",
    FORGOT_PASSWORD: "/api/auth/forgot-password",
    CHANGE_PASSWORD: "/api/auth/change-password",
    RESET_PASSWORD: (token) => `/api/auth/reset-password/${token}`,
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image",
  },
  DASHBOARD: {
    GET_DASHBOARD_DATA: "/api/dashboard-summary",
  },
  AI: {
    GENERATE_BLOG_POST: "/api/ai/generate",
    GENERATE_BLOG_POST_IDEAS: "/api/ai/generate-ideas",
    GENERATE_COMMENT_REPLY: "/api/ai/generate-reply",
    GENERATE_POST_SUMMARY: "/api/ai/generate-summary",
  },
  ANALYTICS: {
    GET_CONTENT_PERFORMANCE: "/api/analytics/content-performance",
    GET_ENGAGEMENT_RATE: "/api/engagement-rate",
  },
  POSTS: {
    GET_MY_POSTS: "/api/posts/mine",
    GET_MY_POST_BY_ID: (id) => `/api/posts/mine/${id}`,
    CREATE: "/api/posts",
    GET_ALL: "/api/posts",
    GET_TRENDING_POSTS: "/api/posts/trending",
    GET_LATEST_POSTS: "/api/posts/latest",
    GET_BY_SLUG: (slug) => `/api/posts/slug/${slug}`,
    GET_BY_ID_ADMIN: (id) => `/api/posts/admin/${id}`,
    UPDATE: (id) => `/api/posts/${id}`,
    DELETE: (id) => `/api/posts/${id}`,
    DELETE_BULK: "/api/posts/bulk-delete",
    DELETE_MULTIPLE: "/api/posts/multiple-delete",
    GET_BY_TAG: (tag) => `/api/posts/tags/${tag}`,
    SEARCH: "/api/posts/search",
    INCREMENT_VIEW: (id) => `/api/posts/${id}/view`,
    LIKE: (id) => `/api/posts/${id}/like`,
    UNLIKE: (id) => `/api/posts/${id}/unlike`,
    CHECK_LIKE: (id) => `/api/posts/${id}/like`,
    BOOKMARK: (id) => `/api/posts/${id}/bookmark`,
    REMOVE_BOOKMARK: (id) => `/api/posts/${id}/bookmark`,
    GET_BOOKMARKS: "/api/posts/bookmarks",
    CHECK_BOOKMARK: (id) => `/api/posts/${id}/bookmark`,
  },
  COMMENT: {
    ADD: (postId) => `/api/comments/${postId}`,
    GET_ALL: "/api/comments",
    GET_ALL_BY_POST: (postId) => `/api/comments/${postId}`,

    DELETE_MY_COMMENT: (commentId) => `/api/comments/myComment/${commentId}`,
    EDIT_MY_COMMENT: (commentId) => `/api/comments/my-comment/${commentId}`,
    DELETE_PARENT_ONLY: (commentId) => `/api/comments/parentOnly/${commentId}`,
    GET_BY_ID_ADMIN: (commentId) => `/api/comments/admin/search/${commentId}`,
    DELETE_THREAD: (commentId) => `/api/comments/thread/${commentId}`,
    DELETE_BULK: "/api/comments/bulk-delete",
  },
  SEARCH: {
    SEARCH_POSTS: "/api/search",
  },
  ADMIN_SEARCH: {
    GLOBAL_SEARCH: "/api/admin/search",
    GLOBAL_SEARCH_ALL: "/api/admin/search/all",
  },
  EXPLORE: {
    EXPLORE_PAGE: "/api/explore",
    EXPLORE_COLLECTION: (clusterId) => `/api/explore/${clusterId}`,
  },
  ACTIVITY: {
    GET_MY_ACTIVITIES: "/api/activity",
  },
  NOTIFICATIONS: {
    GET_MY_NOTIFICATIONS: "/api/notifications",
    GET_UNREAD_COUNT: "/api/notifications/unread-count",
    MARK_AS_READ: (id) => `/api/notifications/${id}/read`,
    MARK_ALL_AS_READ: "/api/notifications/read-all",
  },
};
