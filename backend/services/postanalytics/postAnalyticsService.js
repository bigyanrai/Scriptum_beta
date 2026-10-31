import PostAnalytics from "./../../models/PostAnalytics.js";
import {
  getStartOfDay,
  getStartOfWeek,
  addDays,
} from "./../../utils/analyticsDate.js";

/*
 * --------------------------------------------------
 * RECORD POST ANALYTICS
 * --------------------------------------------------
 */

export const recordPostAnalytics = async ({
  postId,
  views = 0,
  likes = 0,
  comments = 0,
}) => {
  if (!postId) {
    throw new Error("Post ID is required for analytics");
  }

  const date = getStartOfDay();

  return PostAnalytics.findOneAndUpdate(
    {
      post: postId,
      date,
    },
    {
      $inc: {
        views,
        likes,
        comments,
      },
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    },
  );
};

/*
 * --------------------------------------------------
 * RECORD VIEW
 * --------------------------------------------------
 */

export const recordPostView = async (postId) => {
  return recordPostAnalytics({
    postId,
    views: 1,
  });
};

/*
 * --------------------------------------------------
 * RECORD LIKE
 * --------------------------------------------------
 */

export const recordPostLike = async (postId) => {
  return recordPostAnalytics({
    postId,
    likes: 1,
  });
};

/*
 * --------------------------------------------------
 * RECORD COMMENT
 * --------------------------------------------------
 */

export const recordPostComment = async (postId) => {
  return recordPostAnalytics({
    postId,
    comments: 1,
  });
};

/*
 * --------------------------------------------------
 * REMOVE LIKE
 * --------------------------------------------------
 */

export const recordPostUnlike = async (postId) => {
  if (!postId) {
    throw new Error("Post ID is required for analytics");
  }

  const date = getStartOfDay();

  await PostAnalytics.updateOne(
    {
      post: postId,
      date,
      likes: {
        $gt: 0,
      },
    },
    {
      $inc: {
        likes: -1,
      },
    },
  );
};

/*
 * ==================================================
 * CONTENT PERFORMANCE
 * ==================================================
 */

/*
 * Calculate percentage change.
 *
 * Example:
 *
 * Previous: 100
 * Current: 120
 *
 * Result: 20
 *
 * Previous: 0
 * Current: 50
 *
 * Result: 100
 */

const calculatePercentageChange = (current, previous) => {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }

  return Number((((current - previous) / previous) * 100).toFixed(1));
};

/*
 * --------------------------------------------------
 * GET CONTENT PERFORMANCE
 * --------------------------------------------------
 *
 * Returns:
 *
 * This Week
 * Last Week
 *
 * Views
 * Likes
 * Comments
 *
 * Plus daily views for:
 *
 * Monday
 * Tuesday
 * Wednesday
 * Thursday
 * Friday
 * Saturday
 * Sunday
 */

export const getContentPerformance = async () => {
  const currentWeekStart = getStartOfWeek();

  const nextWeekStart = addDays(currentWeekStart, 7);

  const previousWeekStart = addDays(currentWeekStart, -7);

  /*
   * Fetch both weeks in one query.
   */
  const analytics = await PostAnalytics.aggregate([
    {
      $match: {
        date: {
          $gte: previousWeekStart,
          $lt: nextWeekStart,
        },
      },
    },

    /*
     * Group all posts for each day.
     */
    {
      $group: {
        _id: "$date",

        views: {
          $sum: "$views",
        },

        likes: {
          $sum: "$likes",
        },

        comments: {
          $sum: "$comments",
        },
      },
    },

    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  /*
   * --------------------------------------------------
   * INITIALIZE WEEK DATA
   * --------------------------------------------------
   */

  const thisWeek = {
    views: 0,
    likes: 0,
    comments: 0,
  };

  const lastWeek = {
    views: 0,
    likes: 0,
    comments: 0,
  };

  /*
   * --------------------------------------------------
   * DAILY VIEWS + LIKES
   * --------------------------------------------------
   */

  const dailyViews = [];
  const dailyLikes = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(currentWeekStart, i);

    const day = date.toLocaleDateString("en-US", {
      weekday: "short",
    });

    dailyViews.push({
      date,
      day,
      views: 0,
    });

    dailyLikes.push({
      date,
      day,
      likes: 0,
    });
  }

  /*
   * --------------------------------------------------
   * PROCESS ANALYTICS
   * --------------------------------------------------
   */

  analytics.forEach((item) => {
    const itemDate = new Date(item._id);

    /*
     * Determine which week this belongs to.
     */

    if (itemDate >= currentWeekStart && itemDate < nextWeekStart) {
      thisWeek.views += item.views || 0;
      thisWeek.likes += item.likes || 0;
      thisWeek.comments += item.comments || 0;

      /*
       * Find matching day for the chart.
       */

      const dayIndex = Math.floor(
        (itemDate.getTime() - currentWeekStart.getTime()) /
          (1000 * 60 * 60 * 24),
      );

      if (dayIndex >= 0 && dayIndex < 7) {
        /*
         * Daily views
         */
        dailyViews[dayIndex].views += item.views || 0;

        /*
         * Daily likes
         */
        dailyLikes[dayIndex].likes += item.likes || 0;
      }
    } else if (itemDate >= previousWeekStart && itemDate < currentWeekStart) {
      lastWeek.views += item.views || 0;
      lastWeek.likes += item.likes || 0;
      lastWeek.comments += item.comments || 0;
    }
  });

  /*
   * --------------------------------------------------
   * RETURN RESULT
   * --------------------------------------------------
   */

  return {
    thisWeek: {
      views: thisWeek.views,
      likes: thisWeek.likes,
      comments: thisWeek.comments,
    },

    lastWeek: {
      views: lastWeek.views,
      likes: lastWeek.likes,
      comments: lastWeek.comments,
    },

    changes: {
      views: calculatePercentageChange(thisWeek.views, lastWeek.views),

      likes: calculatePercentageChange(thisWeek.likes, lastWeek.likes),

      comments: calculatePercentageChange(thisWeek.comments, lastWeek.comments),
    },

    dailyViews,

    dailyLikes,
  };
};
