import BlogPost from "../models/BlogPost.js";
import Comment from "../models/Comment.js";
import PostAnalytics from "../models/PostAnalytics.js";

import {
  getStartOfDay,
  getStartOfWeek,
  addDays,
} from "../utils/analyticsDate.js";

/*
 * ==================================================
 * HELPERS
 * ==================================================
 */

/*
 * Calculate percentage change.
 *
 * Example:
 *
 * current = 4823
 * previous = 3912
 *
 * result = 23.28
 */
const calculatePercentageChange = (current, previous) => {
  if (!previous) {
    if (current > 0) {
      return 100;
    }

    return 0;
  }

  return Number((((current - previous) / previous) * 100).toFixed(2));
};

/*
 * ==================================================
 * GET WEEKLY SUMMARY
 * ==================================================
 */

const getWeeklySummary = async (startDate, endDate) => {
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

  return {
    views: result[0]?.views || 0,
    likes: result[0]?.likes || 0,
    comments: result[0]?.comments || 0,
  };
};

/*
 * ==================================================
 * GET DAILY VIEWS
 * ==================================================
 *
 * Returns exactly seven days.
 *
 * Monday -> Sunday
 */

const getDailyViews = async (startDate) => {
  const endDate = addDays(startDate, 7);

  const results = await PostAnalytics.aggregate([
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
        _id: "$date",

        views: {
          $sum: {
            $ifNull: ["$views", 0],
          },
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
   * Create a lookup map.
   *
   * This is important because some days may have
   * no activity.
   */

  const resultMap = new Map();

  results.forEach((item) => {
    const key = new Date(item._id).toDateString();

    resultMap.set(key, item.views || 0);
  });

  /*
   * Always return all seven days.
   */

  const days = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(startDate, i);

    const key = date.toDateString();

    days.push({
      day: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),

      date: date.toISOString().split("T")[0],

      value: resultMap.get(key) || 0,
    });
  }

  return days;
};

/*
 * ==================================================
 * GET NEEDS ATTENTION
 * ==================================================
 */

// const getNeedsAttention = async (drafts) => {
//   /*
//    * ==================================================
//    * UNANSWERED COMMENTS
//    * ==================================================
//    *
//    * A comment needs attention when:
//    *
//    * - It is a top-level comment
//    * - It is not deleted
//    * - It has no active reply
//    */

//   const unansweredComments = await Comment.aggregate([
//     {
//       $match: {
//         parentComment: null,
//         isDeleted: false,
//       },
//     },

//     {
//       $lookup: {
//         from: "comments",
//         let: {
//           commentId: "$_id",
//         },

//         pipeline: [
//           {
//             $match: {
//               $expr: {
//                 $and: [
//                   {
//                     $eq: ["$parentComment", "$$commentId"],
//                   },

//                   {
//                     $eq: ["$isDeleted", false],
//                   },
//                 ],
//               },
//             },
//           },

//           {
//             $limit: 1,
//           },
//         ],

//         as: "replies",
//       },
//     },

//     {
//       $match: {
//         "replies.0": {
//           $exists: false,
//         },
//       },
//     },

//     {
//       $count: "count",
//     },
//   ]);

//   const unansweredCommentCount = unansweredComments[0]?.count || 0;

//   /*
//    * ==================================================
//    * BUILD RESPONSE
//    * ==================================================
//    */

//   const needsAttention = [];

//   if (unansweredCommentCount > 0) {
//     needsAttention.push({
//       type: "unanswered_comments",

//       priority: "high",

//       title:
//         unansweredCommentCount === 1
//           ? "1 comment needs a reply"
//           : `${unansweredCommentCount} comments need a reply`,

//       description: "Some readers are waiting for a response.",

//       count: unansweredCommentCount,
//     });
//   }

//   if (drafts > 0) {
//     needsAttention.push({
//       type: "drafts",

//       priority: "medium",

//       title:
//         drafts === 1 ? "1 draft is waiting" : `${drafts} drafts are waiting`,

//       description: "Review your unpublished content.",

//       count: drafts,
//     });
//   }

//   /*
//    * Highest priority items should appear first.
//    */

//   const priorityOrder = {
//     high: 1,
//     medium: 2,
//     low: 3,
//   };

//   needsAttention.sort(
//     (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
//   );

//   /*
//    * Keep the dashboard focused.
//    */

//   return needsAttention.slice(0, 3);
// };

const getNeedsAttention = async () => {
  /*
   * ==================================================
   * NEEDS ATTENTION
   * ==================================================
   *
   * Detects:
   *
   * 1. Unanswered comments       -> HIGH
   * 2. Negative sentiment        -> HIGH
   * 3. Stale drafts (> 7 days)  -> MEDIUM
   * 4. Zero-view posts (3+ days) -> MEDIUM
   * 5. Low engagement (< 1%)     -> MEDIUM
   *
   * The dashboard returns every detected issue.
   * The frontend handles scrolling when there are many.
   */

  const today = getStartOfDay();

  /*
   * ==================================================
   * DATE THRESHOLDS
   * ==================================================
   */

  // Draft must be older than 7 days.
  const staleDraftDate = addDays(today, -7);

  // Published post must be at least 3 days old.
  const zeroViewPostDate = addDays(today, -3);

  /*
   * ==================================================
   * FETCH ALL DETECTIONS IN PARALLEL
   * ==================================================
   */

  const [
    unansweredComments,
    negativeComments,
    staleDrafts,
    zeroViewPosts,
    lowEngagementPosts,
  ] = await Promise.all([
    /*
     * ==================================================
     * 1. UNANSWERED COMMENTS
     * ==================================================
     *
     * A comment needs attention when:
     *
     * - It is a top-level comment
     * - It is not deleted
     * - It has no active reply
     */

    Comment.aggregate([
      {
        $match: {
          parentComment: null,
          isDeleted: false,
        },
      },

      {
        $lookup: {
          from: "comments",

          let: {
            commentId: "$_id",
          },

          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$parentComment", "$$commentId"],
                    },

                    {
                      $eq: ["$isDeleted", false],
                    },
                  ],
                },
              },
            },

            {
              $limit: 1,
            },
          ],

          as: "replies",
        },
      },

      {
        $match: {
          "replies.0": {
            $exists: false,
          },
        },
      },

      {
        $count: "count",
      },
    ]),

    /*
     * ==================================================
     * 2. NEGATIVE SENTIMENT
     * ==================================================
     *
     * Count active comments classified as negative.
     */

    Comment.countDocuments({
      isDeleted: false,
      sentiment: "negative",
    }),

    /*
     * ==================================================
     * 3. STALE DRAFTS
     * ==================================================
     *
     * Drafts created more than 7 days ago.
     *
     * createdAt comes from timestamps: true
     */

    BlogPost.countDocuments({
      isDraft: true,

      createdAt: {
        $lt: staleDraftDate,
      },
    }),

    /*
     * ==================================================
     * 4. PUBLISHED POSTS WITH NO VIEWS
     * ==================================================
     *
     * Conditions:
     *
     * - Published
     * - Published at least 3 days ago
     * - Has zero views
     */

    BlogPost.countDocuments({
      isDraft: false,

      publishedAt: {
        $ne: null,
        $lte: zeroViewPostDate,
      },

      views: 0,
    }),

    /*
     * ==================================================
     * 5. LOW ENGAGEMENT
     * ==================================================
     *
     * Conditions:
     *
     * - Published
     * - At least 20 views
     * - Engagement rate below 1%
     *
     * Engagement rate:
     *
     * ((likes + comments) / views) * 100
     *
     * Instead of calculating the percentage in MongoDB,
     * we can mathematically compare:
     *
     * (likes + comments) / views < 0.01
     *
     * Which is equivalent to:
     *
     * (likes + comments) * 100 < views
     *
     * Since comment count is stored separately, we use
     * a lookup to count comments belonging to each post.
     */

    BlogPost.aggregate([
      {
        $match: {
          isDraft: false,

          views: {
            $gte: 20,
          },
        },
      },

      {
        $lookup: {
          from: "comments",

          let: {
            postId: "$_id",
          },

          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$post", "$$postId"],
                    },

                    {
                      $eq: ["$isDeleted", false],
                    },
                  ],
                },
              },
            },

            {
              $count: "count",
            },
          ],

          as: "commentStats",
        },
      },

      {
        $addFields: {
          commentCount: {
            $ifNull: [
              {
                $arrayElemAt: ["$commentStats.count", 0],
              },

              0,
            ],
          },
        },
      },

      /*
       * Engagement below 1%.
       *
       * (likes + comments) / views < 0.01
       *
       * Therefore:
       *
       * (likes + comments) * 100 < views
       */

      {
        $match: {
          $expr: {
            $lt: [
              {
                $multiply: [
                  {
                    $add: [
                      {
                        $ifNull: ["$likes", 0],
                      },

                      "$commentCount",
                    ],
                  },
                  100,
                ],
              },

              "$views",
            ],
          },
        },
      },

      {
        $count: "count",
      },
    ]),
  ]);

  /*
   * ==================================================
   * EXTRACT COUNTS
   * ==================================================
   */

  const unansweredCommentCount = unansweredComments[0]?.count || 0;

  const negativeCommentCount = negativeComments || 0;

  const staleDraftCount = staleDrafts || 0;

  const zeroViewPostCount = zeroViewPosts || 0;

  const lowEngagementPostCount = lowEngagementPosts[0]?.count || 0;

  /*
   * ==================================================
   * BUILD RESPONSE
   * ==================================================
   */

  const needsAttention = [];

  /*
   * ==================================================
   * HIGH PRIORITY
   * ==================================================
   */

  if (unansweredCommentCount > 0) {
    needsAttention.push({
      type: "unanswered_comments",

      priority: "high",

      title:
        unansweredCommentCount === 1
          ? "1 comment needs a reply"
          : `${unansweredCommentCount} comments need a reply`,

      description: "Some readers are waiting for a response.",

      count: unansweredCommentCount,
    });
  }

  if (negativeCommentCount > 0) {
    needsAttention.push({
      type: "negative_sentiment",

      priority: "high",

      title:
        negativeCommentCount === 1
          ? "1 negative comment detected"
          : `${negativeCommentCount} negative comments detected`,

      description: "Some readers may have had a negative experience.",

      count: negativeCommentCount,
    });
  }

  /*
   * ==================================================
   * MEDIUM PRIORITY
   * ==================================================
   */

  if (staleDraftCount > 0) {
    needsAttention.push({
      type: "stale_drafts",

      priority: "medium",

      title:
        staleDraftCount === 1
          ? "1 draft is getting stale"
          : `${staleDraftCount} drafts are getting stale`,

      description:
        "These drafts have been sitting unpublished for more than 7 days.",

      count: staleDraftCount,
    });
  }

  if (zeroViewPostCount > 0) {
    needsAttention.push({
      type: "zero_view_posts",

      priority: "medium",

      title:
        zeroViewPostCount === 1
          ? "1 published post has no views"
          : `${zeroViewPostCount} published posts have no views`,

      description:
        "These posts have been published for at least 3 days but haven't received any views.",

      count: zeroViewPostCount,
    });
  }

  if (lowEngagementPostCount > 0) {
    needsAttention.push({
      type: "low_engagement",

      priority: "medium",

      title:
        lowEngagementPostCount === 1
          ? "1 post has low engagement"
          : `${lowEngagementPostCount} posts have low engagement`,

      description:
        "These posts have at least 20 views but less than 1% engagement.",

      count: lowEngagementPostCount,
    });
  }

  /*
   * ==================================================
   * PRIORITY SORTING
   * ==================================================
   */

  const priorityOrder = {
    high: 1,
    medium: 2,
    low: 3,
  };

  needsAttention.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
  );

  /*
   * ==================================================
   * RETURN ALL DETECTIONS
   * ==================================================
   *
   * Do NOT slice this array.
   *
   * The frontend will provide a scrollbar when there
   * are many items.
   */

  return needsAttention;
};
/*
 * ==================================================
 * GET PUBLISHING INSIGHT
 * ==================================================
 */

/*
 * ==================================================
 * GET PUBLISHING INSIGHT
 * ==================================================
 */

const getPublishingInsight = async (drafts) => {
  const today = getStartOfDay();

  /*
   * ==================================================
   * CURRENT WEEK
   * ==================================================
   *
   * Monday -> next Monday
   */

  const currentWeekStart = getStartOfWeek(today);
  const currentWeekEnd = addDays(currentWeekStart, 7);

  /*
   * ==================================================
   * CURRENT MONTH
   * ==================================================
   */

  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const currentMonthEnd = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    1,
  );

  /*
   * ==================================================
   * LAST 30 DAYS
   * ==================================================
   */

  const last30DaysStart = addDays(today, -29);
  const tomorrow = addDays(today, 1);

  /*
   * ==================================================
   * FETCH PUBLISHING DATA
   * ==================================================
   */

  const [
    publishedThisWeek,
    publishedThisMonth,
    publishedLast30Days,
    lastPublishedPost,
    dailyPublishingActivity,
  ] = await Promise.all([
    /*
     * Published this week
     */

    BlogPost.countDocuments({
      isDraft: false,

      publishedAt: {
        $gte: currentWeekStart,
        $lt: currentWeekEnd,
      },
    }),

    /*
     * Published this month
     */

    BlogPost.countDocuments({
      isDraft: false,

      publishedAt: {
        $gte: currentMonthStart,
        $lt: currentMonthEnd,
      },
    }),

    /*
     * Published during the last 30 days
     */

    BlogPost.countDocuments({
      isDraft: false,

      publishedAt: {
        $gte: last30DaysStart,
        $lt: tomorrow,
      },
    }),

    /*
     * Most recently published post
     */

    BlogPost.findOne({
      isDraft: false,

      publishedAt: {
        $ne: null,
      },
    })
      .sort({
        publishedAt: -1,
      })
      .select("title publishedAt"),

    /*
     * Publishing activity for the current week
     */

    BlogPost.aggregate([
      {
        $match: {
          isDraft: false,

          publishedAt: {
            $gte: currentWeekStart,
            $lt: currentWeekEnd,
          },
        },
      },

      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",

              date: "$publishedAt",

              /*
               * IMPORTANT:
               *
               * Use Nepal time when determining
               * which calendar day a post was published.
               */

              timezone: "Asia/Kathmandu",
            },
          },

          count: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          _id: 1,
        },
      },
    ]),
  ]);

  /*
   * ==================================================
   * BUILD DAILY ACTIVITY MAP
   * ==================================================
   */

  const activityMap = new Map();

  dailyPublishingActivity.forEach((item) => {
    activityMap.set(item._id, item.count);
  });

  /*
   * ==================================================
   * FORMAT LOCAL DATE
   * ==================================================
   *
   * Do NOT use toISOString() here because it converts
   * the date to UTC.
   */

  const formatDateKey = (date) => {
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  /*
   * ==================================================
   * BUILD SEVEN DAYS
   * ==================================================
   */

  const weeklyActivity = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(currentWeekStart, i);

    const dateKey = formatDateKey(date);

    weeklyActivity.push({
      day: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),

      date: dateKey,

      count: activityMap.get(dateKey) || 0,
    });
  }

  /*
   * ==================================================
   * AVERAGE POSTS PER WEEK
   * ==================================================
   */

  const averagePostsPerWeek = Number(
    (publishedLast30Days / (30 / 7)).toFixed(1),
  );

  /*
   * ==================================================
   * RESPONSE
   * ==================================================
   */

  return {
    publishedThisWeek,

    publishedThisMonth,

    drafts,

    publishedLast30Days,

    averagePostsPerWeek,

    lastPublished: lastPublishedPost
      ? {
          title: lastPublishedPost.title,

          publishedAt: lastPublishedPost.publishedAt,
        }
      : null,

    weeklyActivity,
  };
};
/*
 * ==================================================
 * DASHBOARD SUMMARY
 * ==================================================
 */

export const getDashboardSummary = async (req, res) => {
  try {
    /*
     * ==================================================
     * BASIC CONTENT STATS
     * ==================================================
     */

    const [
      totalPosts,
      drafts,
      published,
      totalComments,
      aiGenerated,
      positiveComments,
      negativeComments,
    ] = await Promise.all([
      BlogPost.countDocuments(),

      BlogPost.countDocuments({
        isDraft: true,
      }),

      BlogPost.countDocuments({
        isDraft: false,
      }),

      Comment.countDocuments(),

      BlogPost.countDocuments({
        generatedByAI: true,
      }),

      Comment.countDocuments({
        sentiment: "positive",
      }),

      Comment.countDocuments({
        sentiment: "negative",
      }),
    ]);

    /*
     * ==================================================
     * TOTAL VIEWS + LIKES
     * ==================================================
     */

    const totalsAgg = await BlogPost.aggregate([
      {
        $group: {
          _id: null,

          totalViews: {
            $sum: {
              $ifNull: ["$views", 0],
            },
          },

          totalLikes: {
            $sum: {
              $ifNull: ["$likes", 0],
            },
          },
        },
      },
    ]);

    const totalViews = totalsAgg[0]?.totalViews || 0;

    const totalLikes = totalsAgg[0]?.totalLikes || 0;

    /*
     * ==================================================
     * ENGAGEMENT RATE
     * ==================================================
     */

    const engagementRate =
      totalViews > 0
        ? Number((((totalLikes + totalComments) / totalViews) * 100).toFixed(2))
        : 0;

    const [needsAttention, publishingInsight] = await Promise.all([
      getNeedsAttention(),
      getPublishingInsight(drafts),
    ]);

    /*
     * ==================================================
     * TOP POSTS
     * ==================================================
     */

    // const topPosts = await BlogPost.aggregate([
    //   {
    //     $match: {
    //       isDraft: false,
    //     },
    //   },

    //   {
    //     $lookup: {
    //       from: "comments",
    //       localField: "_id",
    //       foreignField: "post",
    //       as: "comments",
    //     },
    //   },

    //   {
    //     $addFields: {
    //       commentCount: {
    //         $size: "$comments",
    //       },

    //       engagementScore: {
    //         $add: [
    //           {
    //             $ifNull: ["$likes", 0],
    //           },

    //           {
    //             $size: "$comments",
    //           },
    //         ],
    //       },
    //     },
    //   },

    //   {
    //     $project: {
    //       title: 1,
    //       coverImageUrl: 1,

    //       views: {
    //         $ifNull: ["$views", 0],
    //       },

    //       likes: {
    //         $ifNull: ["$likes", 0],
    //       },

    //       commentCount: 1,

    //       engagementScore: 1,
    //     },
    //   },

    //   {
    //     $sort: {
    //       views: -1,
    //       likes: -1,
    //       commentCount: -1,
    //     },
    //   },

    //   /*
    //    * Return more posts because the frontend now
    //    * supports scrolling.
    //    */
    //   {
    //     $limit: 10,
    //   },
    // ]);

    const topPosts = await BlogPost.aggregate([
      {
        $match: {
          isDraft: false,
        },
      },

      // Get author information
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },

      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Get comments
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "post",
          as: "comments",
        },
      },

      {
        $addFields: {
          commentCount: {
            $size: "$comments",
          },

          engagementScore: {
            $add: [
              {
                $ifNull: ["$likes", 0],
              },
              {
                $size: "$comments",
              },
            ],
          },
        },
      },

      {
        $project: {
          title: 1,
          coverImageUrl: 1,

          // Author name
          authorName: {
            $ifNull: ["$author.name", "Unknown Author"],
          },

          views: {
            $ifNull: ["$views", 0],
          },

          likes: {
            $ifNull: ["$likes", 0],
          },

          commentCount: 1,

          engagementScore: 1,
        },
      },

      {
        $sort: {
          views: -1,
          likes: -1,
          commentCount: -1,
        },
      },

      {
        $limit: 10,
      },
    ]);
    /*
     * ==================================================
     * TAG USAGE
     * ==================================================
     */

    const tagUsage = await BlogPost.aggregate([
      {
        $match: {
          isDraft: false,

          tags: {
            $exists: true,
            $ne: [],
          },
        },
      },

      {
        $unwind: "$tags",
      },

      {
        $group: {
          _id: "$tags",

          count: {
            $sum: 1,
          },
        },
      },

      {
        $project: {
          _id: 0,

          tag: "$_id",

          count: 1,
        },
      },

      {
        $sort: {
          count: -1,
        },
      },
    ]);

    /*
     * ==================================================
     * CONTENT PERFORMANCE
     * ==================================================
     */

    const today = getStartOfDay();

    /*
     * Current week:
     *
     * Monday -> next Monday
     */

    const currentWeekStart = getStartOfWeek(today);

    const currentWeekEnd = addDays(currentWeekStart, 7);

    /*
     * Previous week:
     *
     * Previous Monday -> current Monday
     */

    const previousWeekStart = addDays(currentWeekStart, -7);

    const previousWeekEnd = currentWeekStart;

    /*
     * Fetch both weeks in parallel.
     */

    const [
      currentWeekSummary,
      previousWeekSummary,
      currentWeekViews,
      previousWeekViews,
    ] = await Promise.all([
      getWeeklySummary(currentWeekStart, currentWeekEnd),

      getWeeklySummary(previousWeekStart, previousWeekEnd),

      getDailyViews(currentWeekStart),

      getDailyViews(previousWeekStart),
    ]);

    /*
     * Build content performance response.
     */

    const contentPerformance = {
      summary: {
        views: {
          current: currentWeekSummary.views,

          previous: previousWeekSummary.views,

          change: calculatePercentageChange(
            currentWeekSummary.views,
            previousWeekSummary.views,
          ),
        },

        likes: {
          current: currentWeekSummary.likes,

          previous: previousWeekSummary.likes,

          change: calculatePercentageChange(
            currentWeekSummary.likes,
            previousWeekSummary.likes,
          ),
        },

        comments: {
          current: currentWeekSummary.comments,

          previous: previousWeekSummary.comments,

          change: calculatePercentageChange(
            currentWeekSummary.comments,
            previousWeekSummary.comments,
          ),
        },
      },

      views: {
        currentWeek: currentWeekViews,

        previousWeek: previousWeekViews,
      },
    };

    /*
     * ==================================================
     * RESPONSE
     * ==================================================
     */

    res.json({
      stats: {
        totalPosts,

        published,

        drafts,

        totalViews,

        totalLikes,

        totalComments,

        aiGenerated,

        engagementRate,
      },

      sentiment: {
        positive: positiveComments,

        negative: negativeComments,

        total: positiveComments + negativeComments,
      },

      topPosts,

      tagUsage,

      contentPerformance,

      needsAttention,

      publishingInsight,
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);

    res.status(500).json({
      message: "Failed to fetch dashboard summary",

      error: error.message,
    });
  }
};
