// import Activity from "../models/Activity.js";

// export const getMyActivities = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 50);

//     const { before, filter = "all" } = req.query;

//     // --------------------------------------------------
//     // BUILD FILTER
//     // --------------------------------------------------

//     const query = {
//       user: userId,
//     };

//     if (filter === "engagement") {
//       query.type = {
//         $in: ["like", "comment", "reply"],
//       };
//     }

//     if (filter === "saved") {
//       query.type = "save";
//     }

//     if (filter === "writing") {
//       query.type = {
//         $in: ["create_post", "update_post", "publish_post"],
//       };
//     }

//     // --------------------------------------------------
//     // CURSOR PAGINATION
//     // --------------------------------------------------

//     if (before) {
//       try {
//         const decoded = JSON.parse(
//           Buffer.from(before, "base64").toString("utf8"),
//         );

//         const beforeDate = new Date(decoded.createdAt);
//         const beforeId = decoded.id;

//         if (!Number.isNaN(beforeDate.getTime()) && beforeId) {
//           query.$or = [
//             {
//               createdAt: {
//                 $lt: beforeDate,
//               },
//             },
//             {
//               createdAt: beforeDate,
//               _id: {
//                 $lt: beforeId,
//               },
//             },
//           ];
//         }
//       } catch (error) {
//         return res.status(400).json({
//           message: "Invalid activity cursor",
//         });
//       }
//     }

//     // --------------------------------------------------
//     // FETCH ACTIVITIES
//     // --------------------------------------------------

//     const activities = await Activity.find(query)
//       .populate("post", "_id slug title")
//       .populate("comment", "_id content isDeleted parentComment")
//       .sort({
//         createdAt: -1,
//         _id: -1,
//       })
//       .limit(limit + 1)
//       .lean();

//     // --------------------------------------------------
//     // CHECK IF MORE ACTIVITIES EXIST
//     // --------------------------------------------------

//     const hasMore = activities.length > limit;

//     if (hasMore) {
//       activities.pop();
//     }

//     // --------------------------------------------------
//     // CREATE NEXT CURSOR
//     // --------------------------------------------------

//     let nextCursor = null;

//     if (hasMore && activities.length > 0) {
//       const lastActivity = activities[activities.length - 1];

//       nextCursor = Buffer.from(
//         JSON.stringify({
//           createdAt: lastActivity.createdAt,
//           id: lastActivity._id,
//         }),
//       ).toString("base64");
//     }

//     // --------------------------------------------------
//     // RESPONSE
//     // --------------------------------------------------

//     return res.json({
//       activities,
//       nextCursor,
//       hasMore,
//     });
//   } catch (error) {
//     console.error("Get activities error:", error);

//     return res.status(500).json({
//       message: "Failed to fetch activities",
//       error: error.message,
//     });
//   }
// };

import Activity from "../models/Activity.js";

export const getMyActivities = async (req, res) => {
  try {
    const userId = req.user._id;

    // ============================================================
    // PAGINATION
    // ============================================================

    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 50);

    const {
      before,
      filter = "all",
      timePeriod = "all",
      startDate,
      endDate,
    } = req.query;

    // ============================================================
    // BUILD BASE QUERY
    // ============================================================

    const query = {
      user: userId,
    };

    // ============================================================
    // ACTIVITY TYPE FILTER
    // ============================================================

    if (filter === "engagement") {
      query.type = {
        $in: ["like", "comment", "reply"],
      };
    }

    if (filter === "saved") {
      query.type = "save";
    }

    if (filter === "writing") {
      query.type = {
        $in: ["create_post", "update_post", "publish_post"],
      };
    }

    // ============================================================
    // TIME PERIOD FILTER
    // ============================================================

    const now = new Date();

    let dateFilter = {};

    // ------------------------------------------------------------
    // TODAY
    // ------------------------------------------------------------

    if (timePeriod === "today") {
      const startOfToday = new Date(now);

      startOfToday.setHours(0, 0, 0, 0);

      dateFilter.$gte = startOfToday;
    }

    // ------------------------------------------------------------
    // LAST 7 DAYS
    // ------------------------------------------------------------

    if (timePeriod === "7d") {
      const sevenDaysAgo = new Date(now);

      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      dateFilter.$gte = sevenDaysAgo;
    }

    // ------------------------------------------------------------
    // LAST 30 DAYS
    // ------------------------------------------------------------

    if (timePeriod === "30d") {
      const thirtyDaysAgo = new Date(now);

      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      dateFilter.$gte = thirtyDaysAgo;
    }

    // ------------------------------------------------------------
    // LAST 90 DAYS
    // ------------------------------------------------------------

    if (timePeriod === "90d") {
      const ninetyDaysAgo = new Date(now);

      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

      dateFilter.$gte = ninetyDaysAgo;
    }

    // ------------------------------------------------------------
    // CUSTOM DATE RANGE
    // ------------------------------------------------------------

    if (timePeriod === "custom") {
      if (!startDate || !endDate) {
        return res.status(400).json({
          message:
            "Start date and end date are required for a custom date range.",
        });
      }

      // ----------------------------------------------------------
      // Create start/end dates
      // ----------------------------------------------------------

      const customStartDate = new Date(`${startDate}T00:00:00`);

      const customEndDate = new Date(`${endDate}T23:59:59.999`);

      // ----------------------------------------------------------
      // Validate dates
      // ----------------------------------------------------------

      if (
        Number.isNaN(customStartDate.getTime()) ||
        Number.isNaN(customEndDate.getTime())
      ) {
        return res.status(400).json({
          message: "Invalid custom date range.",
        });
      }

      // ----------------------------------------------------------
      // Validate order
      // ----------------------------------------------------------

      if (customStartDate > customEndDate) {
        return res.status(400).json({
          message: "Start date cannot be after end date.",
        });
      }

      dateFilter.$gte = customStartDate;
      dateFilter.$lte = customEndDate;
    }

    // ============================================================
    // CURSOR PAGINATION
    // ============================================================

    if (before) {
      try {
        const decoded = JSON.parse(
          Buffer.from(before, "base64").toString("utf8"),
        );

        const beforeDate = new Date(decoded.createdAt);

        const beforeId = decoded.id;

        // --------------------------------------------------------
        // Validate cursor
        // --------------------------------------------------------

        if (Number.isNaN(beforeDate.getTime()) || !beforeId) {
          return res.status(400).json({
            message: "Invalid activity cursor",
          });
        }

        // --------------------------------------------------------
        // Stable cursor pagination
        //
        // createdAt DESC
        // _id DESC
        //
        // Get:
        //
        // createdAt < cursor date
        //
        // OR
        //
        // createdAt === cursor date
        // AND _id < cursor id
        // --------------------------------------------------------

        const cursorCondition = {
          $or: [
            {
              createdAt: {
                $lt: beforeDate,
              },
            },
            {
              createdAt: beforeDate,
              _id: {
                $lt: beforeId,
              },
            },
          ],
        };

        // --------------------------------------------------------
        // If a date filter already exists, combine it with
        // the cursor using $and.
        // --------------------------------------------------------

        if (Object.keys(dateFilter).length > 0) {
          query.$and = [
            {
              createdAt: dateFilter,
            },
            cursorCondition,
          ];
        } else {
          query.$or = cursorCondition.$or;
        }
      } catch (error) {
        return res.status(400).json({
          message: "Invalid activity cursor",
        });
      }
    } else if (Object.keys(dateFilter).length > 0) {
      // ==========================================================
      // DATE FILTER WITHOUT CURSOR
      // ==========================================================

      query.createdAt = dateFilter;
    }

    // ============================================================
    // FETCH ACTIVITIES
    // ============================================================

    const activities = await Activity.find(query)
      .populate("post", "_id slug title")
      .populate("comment", "_id content isDeleted parentComment")
      .sort({
        createdAt: -1,
        _id: -1,
      })
      .limit(limit + 1)
      .lean();

    // ============================================================
    // CHECK IF MORE ACTIVITIES EXIST
    // ============================================================

    const hasMore = activities.length > limit;

    // ============================================================
    // REMOVE EXTRA RECORD
    // ============================================================

    if (hasMore) {
      activities.pop();
    }

    // ============================================================
    // CREATE NEXT CURSOR
    // ============================================================

    let nextCursor = null;

    if (hasMore && activities.length > 0) {
      const lastActivity = activities[activities.length - 1];

      nextCursor = Buffer.from(
        JSON.stringify({
          createdAt: lastActivity.createdAt,
          id: lastActivity._id,
        }),
      ).toString("base64");
    }

    // ============================================================
    // RESPONSE
    // ============================================================

    return res.json({
      activities,
      nextCursor,
      hasMore,
    });
  } catch (error) {
    console.error("Get activities error:", error);

    return res.status(500).json({
      message: "Failed to fetch activities",
      error: error.message,
    });
  }
};
