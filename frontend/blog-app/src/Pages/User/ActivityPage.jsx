// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   LuBookmark,
//   LuFilePlus,
//   LuHeart,
//   LuMessageCircle,
//   LuMessageSquare,
//   LuPencil,
//   LuSend,
// } from "react-icons/lu";

// import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import BackButton from "../../components/BackButton";

// const ACTIVITY_LABELS = {
//   like: "Liked",
//   comment: "Commented on",
//   reply: "Replied to",
//   save: "Saved",
//   create_post: "Created",
//   publish_post: "Published",
//   update_post: "Edited",
// };

// const ACTIVITY_ICONS = {
//   like: LuHeart,
//   comment: LuMessageCircle,
//   reply: LuMessageSquare,
//   save: LuBookmark,
//   create_post: LuFilePlus,
//   publish_post: LuSend,
//   update_post: LuPencil,
// };

// const FILTERS = [
//   {
//     label: "All",
//     value: "all",
//   },
//   {
//     label: "Engagement",
//     value: "engagement",
//   },
//   {
//     label: "Saved",
//     value: "saved",
//   },
//   {
//     label: "Writing",
//     value: "writing",
//   },
// ];

// const CHANGE_LABELS = {
//   title: "title",
//   content: "content",
//   coverImageUrl: "cover image",
//   tags: "tags",
// };

// const formatRelativeTime = (date) => {
//   const now = new Date();
//   const activityDate = new Date(date);

//   const diffInSeconds = Math.floor((now - activityDate) / 1000);

//   if (diffInSeconds < 10) {
//     return "just now";
//   }

//   if (diffInSeconds < 60) {
//     return `${diffInSeconds} sec${diffInSeconds === 1 ? "" : "s"} ago`;
//   }

//   const diffInMinutes = Math.floor(diffInSeconds / 60);

//   if (diffInMinutes < 60) {
//     return `${diffInMinutes} min${diffInMinutes === 1 ? "" : "s"} ago`;
//   }

//   const diffInHours = Math.floor(diffInMinutes / 60);

//   if (diffInHours < 24) {
//     return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
//   }

//   const diffInDays = Math.floor(diffInHours / 24);

//   if (diffInDays === 1) {
//     return "Yesterday";
//   }

//   if (diffInDays < 7) {
//     return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
//   }

//   return activityDate.toLocaleDateString();
// };

// const formatChanges = (changes = []) => {
//   return changes.map((change) => CHANGE_LABELS[change] || change).join(", ");
// };

// const ActivityPage = () => {
//   const navigate = useNavigate();

//   const [activities, setActivities] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);

//   const [activeFilter, setActiveFilter] = useState("all");

//   const [nextCursor, setNextCursor] = useState(null);
//   const [hasMore, setHasMore] = useState(false);

//   // ======================================================
//   // HANDLE ACTIVITY CLICK
//   // ======================================================

//   const handleActivityClick = (activity) => {
//     // --------------------------------------------------
//     // No related post
//     // --------------------------------------------------

//     if (!activity?.post?.slug) {
//       return;
//     }

//     const postPath = `/${activity.post.slug}`;

//     // --------------------------------------------------
//     // COMMENT / REPLY
//     // --------------------------------------------------

//     if (activity.type === "comment" || activity.type === "reply") {
//       // If the comment still exists, send its ID
//       // so the post page can locate/highlight it.

//       if (activity.comment?._id) {
//         navigate(`${postPath}?comment=${activity.comment._id}`);
//       } else {
//         // Fallback if the comment was deleted
//         navigate(postPath);
//       }

//       return;
//     }

//     // --------------------------------------------------
//     // LIKE / SAVE / CREATE / PUBLISH / UPDATE
//     // --------------------------------------------------

//     navigate(postPath);
//   };

//   // ======================================================
//   // HANDLE KEYBOARD ACTIVITY CLICK
//   // ======================================================

//   const handleActivityKeyDown = (event, activity) => {
//     if (event.key === "Enter" || event.key === " ") {
//       event.preventDefault();
//       handleActivityClick(activity);
//     }
//   };

//   // ======================================================
//   // FETCH ACTIVITIES
//   // ======================================================

//   const fetchActivities = async (filter = activeFilter) => {
//     try {
//       setLoading(true);

//       const response = await axiosInstance.get(
//         API_PATHS.ACTIVITY.GET_MY_ACTIVITIES,
//         {
//           params: {
//             limit: 2,
//             filter,
//           },
//         },
//       );

//       setActivities(response.data.activities || []);

//       setNextCursor(response.data.nextCursor || null);

//       setHasMore(response.data.hasMore || false);
//     } catch (error) {
//       console.error("Failed to fetch activities:", error);

//       setActivities([]);
//       setNextCursor(null);
//       setHasMore(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ======================================================
//   // LOAD MORE ACTIVITIES
//   // ======================================================

//   const loadMoreActivities = async () => {
//     if (!nextCursor || loadingMore) {
//       return;
//     }

//     try {
//       setLoadingMore(true);

//       const response = await axiosInstance.get(
//         API_PATHS.ACTIVITY.GET_MY_ACTIVITIES,
//         {
//           params: {
//             limit: 2,
//             filter: activeFilter,
//             before: nextCursor,
//           },
//         },
//       );

//       const newActivities = response.data.activities || [];

//       setActivities((prev) => [...prev, ...newActivities]);

//       setNextCursor(response.data.nextCursor || null);

//       setHasMore(response.data.hasMore || false);
//     } catch (error) {
//       console.error("Failed to load more activities:", error);
//     } finally {
//       setLoadingMore(false);
//     }
//   };

//   // ======================================================
//   // FILTER CHANGE
//   // ======================================================

//   const handleFilterChange = (filter) => {
//     if (filter === activeFilter) {
//       return;
//     }

//     setActiveFilter(filter);
//   };

//   // ======================================================
//   // FETCH WHEN FILTER CHANGES
//   // ======================================================

//   useEffect(() => {
//     fetchActivities(activeFilter);
//   }, [activeFilter]);

//   // ======================================================
//   // RENDER
//   // ======================================================

//   return (
//     <BlogLayout activeMenu="Activity">
//       <BackButton />

//       <div className="w-full min-h-screen mx-auto">
//         {/* ================================================== */}
//         {/* HEADER */}
//         {/* ================================================== */}

//         <section className="mb-6">
//           <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
//             Activity
//           </p>

//           <h1 className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
//             Your activity
//           </h1>

//           <p className="mt-2 text-sm sm:text-base text-gray-500">
//             Keep track of your recent interactions and writing activity.
//           </p>
//         </section>

//         {/* ================================================== */}
//         {/* FILTERS */}
//         {/* ================================================== */}

//         <div className="flex items-center gap-1 overflow-x-auto rounded-sm border border-slate-200 bg-slate-50 p-1 mb-2 w-fit">
//           {FILTERS.map((filter) => {
//             const isActive = activeFilter === filter.value;

//             return (
//               <button
//                 key={filter.value}
//                 type="button"
//                 onClick={() => handleFilterChange(filter.value)}
//                 disabled={loading}
//                 className={`shrink-0 rounded-sm px-3 py-2 text-xs font-semibold transition ${
//                   isActive
//                     ? "bg-white text-slate-900 shadow-sm"
//                     : "text-slate-500 hover:text-slate-800"
//                 } ${loading ? "cursor-not-allowed opacity-70" : ""}`}
//               >
//                 {filter.label}
//               </button>
//             );
//           })}
//         </div>

//         {/* ================================================== */}
//         {/* INITIAL LOADING */}
//         {/* ================================================== */}

//         {loading && (
//           <div className="space-y-3">
//             {[1, 2, 3, 4].map((item) => (
//               <div
//                 key={item}
//                 className="h-20 rounded-xl border border-gray-200 bg-gray-50 animate-pulse"
//               />
//             ))}
//           </div>
//         )}

//         {/* ================================================== */}
//         {/* EMPTY STATE */}
//         {/* ================================================== */}

//         {!loading && activities.length === 0 && (
//           <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center">
//             <p className="text-sm font-medium text-gray-700">No activity yet</p>

//             <p className="mt-1 text-sm text-gray-500">
//               Your likes, comments, saves, and writing activity will appear
//               here.
//             </p>
//           </div>
//         )}

//         {/* ================================================== */}
//         {/* ACTIVITIES */}
//         {/* ================================================== */}

//         {!loading && activities.length > 0 && (
//           <div className="space-y-4">
//             {/* ================================================== */}
//             {/* ACTIVITY LIST */}
//             {/* ================================================== */}

//             <div className="space-y-3">
//               {activities.map((activity) => {
//                 const Icon = ACTIVITY_ICONS[activity.type];

//                 const hasPost = Boolean(activity.post?.slug);

//                 return (
//                   <div
//                     key={activity._id}
//                     onClick={() => handleActivityClick(activity)}
//                     onKeyDown={(event) =>
//                       handleActivityKeyDown(event, activity)
//                     }
//                     role={hasPost ? "button" : undefined}
//                     tabIndex={hasPost ? 0 : undefined}
//                     className={`flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 transition ${
//                       hasPost
//                         ? "cursor-pointer hover:border-gray-300 hover:bg-gray-50"
//                         : "cursor-default"
//                     }`}
//                   >
//                     {/* ================================================== */}
//                     {/* ICON */}
//                     {/* ================================================== */}

//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
//                       {Icon && <Icon size={18} />}
//                     </div>

//                     {/* ================================================== */}
//                     {/* CONTENT */}
//                     {/* ================================================== */}

//                     <div className="min-w-0 flex-1">
//                       {/* ================================================== */}
//                       {/* ACTIVITY TYPE */}
//                       {/* ================================================== */}

//                       <p className="text-sm text-gray-700">
//                         <span className="font-medium text-gray-900">
//                           {ACTIVITY_LABELS[activity.type] || "Activity"}
//                         </span>
//                       </p>

//                       {/* ================================================== */}
//                       {/* POST */}
//                       {/* ================================================== */}

//                       {activity.post && (
//                         <p className="mt-1 truncate text-sm font-medium text-gray-900">
//                           {activity.post.title}
//                         </p>
//                       )}

//                       {/* ================================================== */}
//                       {/* COMMENT */}
//                       {/* ================================================== */}

//                       {activity.comment && (
//                         <p className="mt-1 line-clamp-2 text-sm text-gray-500">
//                           "{activity.comment.content}"
//                         </p>
//                       )}

//                       {/* ================================================== */}
//                       {/* POST CHANGES */}
//                       {/* ================================================== */}

//                       {activity.type === "update_post" &&
//                         activity.changes?.length > 0 && (
//                           <p className="mt-1 text-sm text-gray-500">
//                             Changed {formatChanges(activity.changes)}
//                           </p>
//                         )}

//                       {/* ================================================== */}
//                       {/* TIME */}
//                       {/* ================================================== */}

//                       <p className="mt-1 text-xs text-gray-400">
//                         {formatRelativeTime(activity.createdAt)}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* ================================================== */}
//             {/* LOAD MORE */}
//             {/* ================================================== */}

//             {hasMore && (
//               <div className="flex justify-center pt-2">
//                 <button
//                   type="button"
//                   onClick={loadMoreActivities}
//                   disabled={loadingMore}
//                   className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {loadingMore ? "Loading..." : "Load more"}
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </BlogLayout>
//   );
// };

// export default ActivityPage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuBookmark,
  LuCalendarDays,
  LuFilePlus,
  LuHeart,
  LuMessageCircle,
  LuMessageSquare,
  LuPencil,
  LuSend,
} from "react-icons/lu";

import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import BackButton from "../../components/BackButton";
import BlogSidebar from "../../components/layouts/BlogLayout/BlogSidebar";

// ======================================================
// ACTIVITY LABELS
// ======================================================

const ACTIVITY_LABELS = {
  like: "Liked",
  comment: "Commented on",
  reply: "Replied to",
  save: "Saved",
  create_post: "Created",
  publish_post: "Published",
  update_post: "Edited",
};

// ======================================================
// ACTIVITY ICONS
// ======================================================

const ACTIVITY_ICONS = {
  like: LuHeart,
  comment: LuMessageCircle,
  reply: LuMessageSquare,
  save: LuBookmark,
  create_post: LuFilePlus,
  publish_post: LuSend,
  update_post: LuPencil,
};

// ======================================================
// ACTIVITY FILTERS
// ======================================================

const FILTERS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Engagement",
    value: "engagement",
  },
  {
    label: "Saved",
    value: "saved",
  },
  {
    label: "Writing",
    value: "writing",
  },
];

// ======================================================
// TIME PERIOD FILTERS
// ======================================================

const TIME_PERIODS = [
  {
    label: "All time",
    value: "all",
  },
  {
    label: "Today",
    value: "today",
  },
  {
    label: "7 days",
    value: "7d",
  },
  {
    label: "30 days",
    value: "30d",
  },
  {
    label: "90 days",
    value: "90d",
  },
  {
    label: "Custom",
    value: "custom",
  },
];

// ======================================================
// CHANGE LABELS
// ======================================================

const CHANGE_LABELS = {
  title: "title",
  content: "content",
  coverImageUrl: "cover image",
  tags: "tags",
};

// ======================================================
// RELATIVE TIME
// ======================================================

const formatRelativeTime = (date) => {
  const now = new Date();
  const activityDate = new Date(date);

  const diffInSeconds = Math.floor((now - activityDate) / 1000);

  if (diffInSeconds < 10) {
    return "just now";
  }

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec${diffInSeconds === 1 ? "" : "s"} ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min${diffInMinutes === 1 ? "" : "s"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays === 1) {
    return "Yesterday";
  }

  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  }

  return activityDate.toLocaleDateString();
};

// ======================================================
// FORMAT POST CHANGES
// ======================================================

const formatChanges = (changes = []) => {
  return changes.map((change) => CHANGE_LABELS[change] || change).join(", ");
};

// ======================================================
// ACTIVITY PAGE
// ======================================================

const ActivityPage = () => {
  const navigate = useNavigate();

  // ======================================================
  // ACTIVITIES
  // ======================================================

  const [activities, setActivities] = useState([]);

  // ======================================================
  // LOADING
  // ======================================================

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // ======================================================
  // ACTIVITY FILTER
  // ======================================================

  const [activeFilter, setActiveFilter] = useState("all");

  // ======================================================
  // TIME FILTER
  // ======================================================

  const [timePeriod, setTimePeriod] = useState("all");

  // ======================================================
  // CUSTOM DATE RANGE
  // ======================================================

  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");

  // ======================================================
  // CURSOR PAGINATION
  // ======================================================

  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  // ======================================================
  // CUSTOM DATE ERROR
  // ======================================================

  const [dateError, setDateError] = useState("");

  // ======================================================
  // HANDLE ACTIVITY CLICK
  // ======================================================

  const handleActivityClick = (activity) => {
    // --------------------------------------------------
    // No related post
    // --------------------------------------------------

    if (!activity?.post?.slug) {
      return;
    }

    const postPath = `/${activity.post.slug}`;

    // --------------------------------------------------
    // COMMENT / REPLY
    // --------------------------------------------------

    if (activity.type === "comment" || activity.type === "reply") {
      if (activity.comment?._id) {
        navigate(`${postPath}?comment=${activity.comment._id}`);
      } else {
        navigate(postPath);
      }

      return;
    }

    // --------------------------------------------------
    // LIKE / SAVE / CREATE / PUBLISH / UPDATE
    // --------------------------------------------------

    navigate(postPath);
  };

  // ======================================================
  // HANDLE KEYBOARD ACTIVITY CLICK
  // ======================================================

  const handleActivityKeyDown = (event, activity) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      handleActivityClick(activity);
    }
  };

  // ======================================================
  // FETCH ACTIVITIES
  // ======================================================

  const fetchActivities = async ({
    filter = activeFilter,
    period = timePeriod,
    startDate = customStartDate,
    endDate = customEndDate,
  } = {}) => {
    try {
      setLoading(true);

      const params = {
        limit: 10,
        filter,
        timePeriod: period,
      };

      // --------------------------------------------------
      // CUSTOM DATE RANGE
      // --------------------------------------------------

      if (period === "custom") {
        if (!startDate || !endDate) {
          setActivities([]);
          setNextCursor(null);
          setHasMore(false);
          return;
        }

        params.startDate = startDate;
        params.endDate = endDate;
      }

      const response = await axiosInstance.get(
        API_PATHS.ACTIVITY.GET_MY_ACTIVITIES,
        {
          params,
        },
      );

      setActivities(response.data.activities || []);

      setNextCursor(response.data.nextCursor || null);

      setHasMore(response.data.hasMore || false);
    } catch (error) {
      console.error("Failed to fetch activities:", error);

      setActivities([]);
      setNextCursor(null);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // LOAD MORE ACTIVITIES
  // ======================================================

  const loadMoreActivities = async () => {
    if (!nextCursor || loadingMore) {
      return;
    }

    try {
      setLoadingMore(true);

      const params = {
        limit: 10,
        filter: activeFilter,
        timePeriod,
        before: nextCursor,
      };

      // --------------------------------------------------
      // CUSTOM DATE RANGE
      // --------------------------------------------------

      if (timePeriod === "custom") {
        params.startDate = customStartDate;
        params.endDate = customEndDate;
      }

      const response = await axiosInstance.get(
        API_PATHS.ACTIVITY.GET_MY_ACTIVITIES,
        {
          params,
        },
      );

      const newActivities = response.data.activities || [];

      setActivities((prev) => [...prev, ...newActivities]);

      setNextCursor(response.data.nextCursor || null);

      setHasMore(response.data.hasMore || false);
    } catch (error) {
      console.error("Failed to load more activities:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  // ======================================================
  // FILTER CHANGE
  // ======================================================

  const handleFilterChange = (filter) => {
    if (filter === activeFilter) {
      return;
    }

    setActiveFilter(filter);

    // Reset cursor because the dataset changed
    setActivities([]);
    setNextCursor(null);
    setHasMore(false);
  };

  // ======================================================
  // TIME PERIOD CHANGE
  // ======================================================

  const handleTimePeriodChange = (period) => {
    if (period === timePeriod) {
      return;
    }

    setTimePeriod(period);

    // Reset cursor because the dataset changed
    setActivities([]);
    setNextCursor(null);
    setHasMore(false);

    // Clear old date error
    setDateError("");

    // --------------------------------------------------
    // Fetch immediately for preset periods
    // --------------------------------------------------

    if (period !== "custom") {
      fetchActivities({
        filter: activeFilter,
        period,
      });
    }
  };

  // ======================================================
  // CUSTOM DATE APPLY
  // ======================================================

  const handleApplyCustomDate = () => {
    setDateError("");

    if (!customStartDate || !customEndDate) {
      setDateError("Please select both a start and end date.");

      return;
    }

    if (customStartDate > customEndDate) {
      setDateError("Start date cannot be after the end date.");

      return;
    }

    // Reset cursor
    setActivities([]);
    setNextCursor(null);
    setHasMore(false);

    fetchActivities({
      filter: activeFilter,
      period: "custom",
      startDate: customStartDate,
      endDate: customEndDate,
    });
  };

  // ======================================================
  // FETCH WHEN ACTIVITY FILTER CHANGES
  // ======================================================

  useEffect(() => {
    fetchActivities({
      filter: activeFilter,
      period: timePeriod,
      startDate: customStartDate,
      endDate: customEndDate,
    });
  }, [activeFilter]);

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <BlogLayout activeMenu="Activity">
      <BackButton />

      <div className="w-full min-h-screen mx-auto">
        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <section className="mb-6">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Activity
          </p>

          <h1 className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Your activity
          </h1>

          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Keep track of your recent interactions and writing activity.
          </p>
        </section>

        {/* ================================================== */}
        {/* ACTIVITY FILTERS */}
        {/* ================================================== */}

        <div className="mb-3 flex items-center gap-1 overflow-x-auto rounded-sm border border-slate-200 bg-slate-50 p-1 w-fit max-w-full">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => handleFilterChange(filter.value)}
                disabled={loading}
                className={`shrink-0 rounded-sm px-3 py-2 text-xs font-semibold transition ${
                  isActive
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                } ${loading ? "cursor-not-allowed opacity-70" : ""}`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* ================================================== */}
        {/* TIME PERIOD */}
        {/* ================================================== */}

        <div className="mb-4">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <LuCalendarDays size={14} />

            <span>Time period</span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto rounded-sm border border-slate-200 bg-slate-50 p-1 w-fit max-w-full">
            {TIME_PERIODS.map((period) => {
              const isActive = timePeriod === period.value;

              return (
                <button
                  key={period.value}
                  type="button"
                  onClick={() => handleTimePeriodChange(period.value)}
                  disabled={loading}
                  className={`shrink-0 rounded-sm px-3 py-2 text-xs font-semibold transition ${
                    isActive
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  } ${loading ? "cursor-not-allowed opacity-70" : ""}`}
                >
                  {period.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================== */}
        {/* CUSTOM DATE RANGE */}
        {/* ================================================== */}

        {timePeriod === "custom" && (
          <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
              {/* FROM */}

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  From
                </label>

                <input
                  type="date"
                  value={customStartDate}
                  max={customEndDate || undefined}
                  onChange={(event) => {
                    setCustomStartDate(event.target.value);
                    setDateError("");
                  }}
                  className="w-full rounded-sm border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400"
                />
              </div>

              {/* TO */}

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  To
                </label>

                <input
                  type="date"
                  value={customEndDate}
                  min={customStartDate || undefined}
                  onChange={(event) => {
                    setCustomEndDate(event.target.value);
                    setDateError("");
                  }}
                  className="w-full rounded-sm border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400"
                />
              </div>

              {/* APPLY */}

              <button
                type="button"
                onClick={handleApplyCustomDate}
                disabled={loading || !customStartDate || !customEndDate}
                className="rounded-sm bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Apply
              </button>
            </div>

            {/* DATE ERROR */}

            {dateError && (
              <p className="mt-2 text-xs text-red-500">{dateError}</p>
            )}

            {/* SELECTED RANGE */}

            {customStartDate && customEndDate && !dateError && (
              <p className="mt-2 text-xs text-slate-400">
                Showing activity from{" "}
                {new Date(`${customStartDate}T00:00:00`).toLocaleDateString()}{" "}
                to {new Date(`${customEndDate}T00:00:00`).toLocaleDateString()}.
              </p>
            )}
          </div>
        )}

        {/* ================================================== */}
        {/* INITIAL LOADING */}
        {/* ================================================== */}

        {loading && (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-20 rounded-xl border border-gray-200 bg-gray-50 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* ================================================== */}
        {/* EMPTY STATE */}
        {/* ================================================== */}

        {!loading && activities.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center">
            <p className="text-sm font-medium text-gray-700">
              No activity found
            </p>

            <p className="mt-1 text-sm text-gray-500">
              There is no activity matching the selected filters and time
              period.
            </p>
          </div>
        )}

        {/* ================================================== */}
        {/* ACTIVITIES */}
        {/* ================================================== */}

        {!loading && activities.length > 0 && (
          <div className="space-y-4">
            {/* ================================================== */}
            {/* ACTIVITY LIST */}
            {/* ================================================== */}

            <div className="space-y-3">
              {activities.map((activity) => {
                const Icon = ACTIVITY_ICONS[activity.type];

                const hasPost = Boolean(activity.post?.slug);

                return (
                  <div
                    key={activity._id}
                    onClick={() => handleActivityClick(activity)}
                    onKeyDown={(event) =>
                      handleActivityKeyDown(event, activity)
                    }
                    role={hasPost ? "button" : undefined}
                    tabIndex={hasPost ? 0 : undefined}
                    className={`flex items-start gap-2 rounded-sm border border-gray-200 bg-white p-2 transition ${
                      hasPost
                        ? "cursor-pointer hover:border-gray-300 hover:bg-gray-50"
                        : "cursor-default"
                    }`}
                  >
                    {/* ================================================== */}
                    {/* ICON */}
                    {/* ================================================== */}

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                      {Icon && <Icon size={16} />}
                    </div>

                    {/* ================================================== */}
                    {/* CONTENT */}
                    {/* ================================================== */}

                    <div className="min-w-0 flex-1">
                      {/* ACTIVITY TYPE */}

                      <p className="text-sm text-gray-700">
                        <span className="font-medium text-gray-900">
                          {ACTIVITY_LABELS[activity.type] || "Activity"}
                        </span>
                      </p>

                      {/* POST */}

                      {activity.post && (
                        <p className="mt-1 truncate text-sm font-medium text-gray-900">
                          {activity.post.title}
                        </p>
                      )}

                      {/* COMMENT */}

                      {activity.comment && (
                        <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                          "{activity.comment.content}"
                        </p>
                      )}

                      {/* POST CHANGES */}

                      {activity.type === "update_post" &&
                        activity.changes?.length > 0 && (
                          <p className="mt-1 text-sm text-gray-500">
                            Changed {formatChanges(activity.changes)}
                          </p>
                        )}

                      {/* TIME */}

                      <p className="mt-1 text-xs text-gray-400">
                        {formatRelativeTime(activity.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ================================================== */}
            {/* LOAD MORE */}
            {/* ================================================== */}

            {hasMore && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={loadMoreActivities}
                  disabled={loadingMore}
                  className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadingMore ? "Loading..." : "Load more"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <BlogSidebar />
    </BlogLayout>
  );
};

export default ActivityPage;
