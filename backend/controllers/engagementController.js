import PostAnalytics from "../models/PostAnalytics.js";

import { getStartOfWeek, addDays } from "../utils/analyticsDate.js";

/*
 * ==================================================
 * CALCULATE ENGAGEMENT RATE
 * ==================================================
 *
 * Engagement Rate =
 * ((Likes + Comments) / Views) * 100
 */

const calculateEngagementRate = (views, likes, comments) => {
  if (views <= 0) {
    return 0;
  }

  return Number((((likes + comments) / views) * 100).toFixed(2));
};

/*
 * ==================================================
 * CALCULATE PERCENTAGE CHANGE
 * ==================================================
 *
 * Example:
 *
 * Previous rate = 50%
 * Current rate = 75%
 *
 * Change =
 * ((75 - 50) / 50) * 100
 *
 * = 50%
 */

const calculatePercentageChange = (current, previous) => {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }

  return Number((((current - previous) / previous) * 100).toFixed(2));
};

/*
 * ==================================================
 * GET WEEKLY ENGAGEMENT DATA
 * ==================================================
 */

const getWeeklyEngagement = async (startDate, endDate) => {
  const result = await PostAnalytics.aggregate([
    {
      $match: {
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },

    {
      $group: {
        _id: null,

        views: {
          $sum: {
            $ifNull: ["$views", 0],
          },
        },

        likes: {
          $sum: {
            $ifNull: ["$likes", 0],
          },
        },

        comments: {
          $sum: {
            $ifNull: ["$comments", 0],
          },
        },
      },
    },
  ]);

  const views = result[0]?.views || 0;
  const likes = result[0]?.likes || 0;
  const comments = result[0]?.comments || 0;

  const rate = calculateEngagementRate(views, likes, comments);

  return {
    views,
    likes,
    comments,
    rate,
  };
};

/*
 * ==================================================
 * GET ENGAGEMENT RATE
 * ==================================================
 *
 * Current week vs previous week.
 *
 * Current week:
 * Monday -> next Monday
 *
 * Previous week:
 * Previous Monday -> current Monday
 */

export const getEngagementRate = async (req, res) => {
  try {
    /*
     * --------------------------------------------------
     * WEEK RANGES
     * --------------------------------------------------
     */

    const currentWeekStart = getStartOfWeek();

    const currentWeekEnd = addDays(currentWeekStart, 7);

    const previousWeekStart = addDays(currentWeekStart, -7);

    const previousWeekEnd = currentWeekStart;

    /*
     * --------------------------------------------------
     * FETCH BOTH WEEKS
     * --------------------------------------------------
     */

    const [currentWeek, previousWeek] = await Promise.all([
      getWeeklyEngagement(currentWeekStart, currentWeekEnd),

      getWeeklyEngagement(previousWeekStart, previousWeekEnd),
    ]);

    /*
     * --------------------------------------------------
     * RATE CHANGE
     * --------------------------------------------------
     */

    const change = calculatePercentageChange(
      currentWeek.rate,
      previousWeek.rate,
    );

    /*
     * --------------------------------------------------
     * CHANGE TYPE
     * --------------------------------------------------
     */

    let changeType = "neutral";

    if (change > 0) {
      changeType = "increase";
    } else if (change < 0) {
      changeType = "decrease";
    }

    /*
     * --------------------------------------------------
     * RATE DIFFERENCE
     * --------------------------------------------------
     *
     * This is the percentage-point difference.
     *
     * Example:
     *
     * Current: 145.45%
     * Previous: 54.84%
     *
     * Difference:
     * 90.61 percentage points
     */

    const difference = Number(
      (currentWeek.rate - previousWeek.rate).toFixed(2),
    );

    /*
     * --------------------------------------------------
     * RESPONSE
     * --------------------------------------------------
     */

    res.json({
      current: currentWeek,

      previous: previousWeek,

      comparison: {
        change,

        changeType,

        difference,
      },
    });
  } catch (error) {
    console.error("Engagement rate error:", error);

    res.status(500).json({
      message: "Failed to fetch engagement rate",

      error: error.message,
    });
  }
};
