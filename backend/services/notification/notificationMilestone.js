// import Notification from "../../models/Notification.js";
// import { createNotification } from "./createNotification.js";

// export const MILESTONES = [100, 500, 1000, 5000, 10000, 50000, 100000];

// export const checkPostMilestone = async ({ post, actor }) => {
//   try {
//     if (!post || !post.author) {
//       return;
//     }

//     const currentViews = post.views || 0;

//     if (currentViews < MILESTONES[0]) {
//       return;
//     }

//     // Find all milestones reached
//     const reachedMilestones = MILESTONES.filter(
//       (milestone) => currentViews >= milestone,
//     );

//     // Find which milestones have already been notified
//     const existingNotifications = await Notification.find({
//       recipient: post.author,
//       post: post._id,
//       type: "post_milestone",
//       milestone: { $in: reachedMilestones },
//     }).select("milestone");

//     const notifiedMilestones = new Set(
//       existingNotifications.map((notification) => notification.milestone),
//     );

//     // Create notifications for every milestone
//     // that has been reached but not notified yet.
//     for (const milestone of reachedMilestones) {
//       if (notifiedMilestones.has(milestone)) {
//         continue;
//       }

//       await createNotification({
//         recipient: post.author,
//         actor,
//         type: "post_milestone",
//         post: post._id,
//         milestone,
//       });
//     }
//   } catch (error) {
//     console.error("Check post milestone error:", error);
//   }
// };

import Notification from "../../models/Notification.js";
import { createNotification } from "./createNotification.js";

export const MILESTONES = [100, 500, 1000, 5000, 10000, 50000, 100000];
// export const MILESTONES = [1, 5, 10, 50, 100, 500, 1000];

export const checkPostMilestone = async ({ post, actor = null }) => {
  console.log("🔥 CHECK POST MILESTONE CALLED");
  try {
    if (!post || !post.author) {
      return;
    }

    const currentViews = post.views || 0;

    // No milestone reached yet
    if (currentViews < MILESTONES[0]) {
      return;
    }

    // Find all milestones reached by the current view count
    const reachedMilestones = MILESTONES.filter(
      (milestone) => currentViews >= milestone,
    );

    // Find milestones that have already generated notifications
    const existingNotifications = await Notification.find({
      recipient: post.author,
      post: post._id,
      type: "post_milestone",
      milestone: {
        $in: reachedMilestones,
      },
    }).select("milestone");

    const notifiedMilestones = new Set(
      existingNotifications.map((notification) => notification.milestone),
    );

    // Create notification for every reached milestone
    // that has not already been notified.
    for (const milestone of reachedMilestones) {
      if (notifiedMilestones.has(milestone)) {
        continue;
      }

      await createNotification({
        recipient: post.author,
        actor,
        type: "post_milestone",
        post: post._id,
        milestone,
      });
    }
  } catch (error) {
    console.error("Check post milestone error:", error);
  }
};
