// import Notification from "../../models/Notification.js";

// /**
//  * Creates a notification for a user.
//  *
//  * The notification is ignored when:
//  * - recipient does not exist
//  * - actor does not exist
//  * - actor and recipient are the same user
//  */
// export const createNotification = async ({
//   recipient,
//   actor,
//   type,
//   post = null,
//   comment = null,
//   milestone = null,
// }) => {
//   try {
//     if (!recipient || !actor) {
//       return null;
//     }

//     // Never notify users about their own actions
//     if (recipient.toString() === actor.toString()) {
//       return null;
//     }

//     // ------------------------------------------------------------
//     // MILESTONE
//     // ------------------------------------------------------------

//     if (type === "post_milestone") {
//       try {
//         return await Notification.create({
//           recipient,
//           actor,
//           type,
//           post,
//           milestone,
//         });
//       } catch (error) {
//         // Duplicate milestone = already notified.
//         // Don't break the request because of it.
//         if (error.code === 11000) {
//           return null;
//         }

//         throw error;
//       }
//     }

//     // ------------------------------------------------------------
//     // NORMAL NOTIFICATION
//     // ------------------------------------------------------------

//     return await Notification.create({
//       recipient,
//       actor,
//       type,
//       post,
//       comment,
//     });
//   } catch (error) {
//     console.error("Create notification error:", error);

//     // Notification failure should never cause
//     // the original action to fail.
//     return null;
//   }
// };

import Notification from "../../models/Notification.js";

/**
 * Creates a notification for a user.
 *
 * Normal notifications are ignored when:
 * - recipient does not exist
 * - actor does not exist
 * - actor and recipient are the same user
 *
 * Milestone notifications are different:
 * - They belong to the post author.
 * - They can be triggered by a guest.
 * - Therefore, they do not need a meaningful actor.
 */
export const createNotification = async ({
  recipient,
  actor = null,
  type,
  post = null,
  comment = null,
  milestone = null,
}) => {
  try {
    // Recipient is required for every notification
    if (!recipient) {
      return null;
    }

    // ============================================================
    // MILESTONE NOTIFICATION
    // ============================================================

    if (type === "post_milestone") {
      try {
        /*
         * NotificationSchema currently requires actor.
         *
         * For a guest view there is no actor, so we use the
         * post author as the actor internally.
         *
         * The frontend does not display the actor for milestone
         * notifications, so this does not affect the UI.
         */
        return await Notification.create({
          recipient,
          actor: actor || recipient,
          type,
          post,
          milestone,
        });
      } catch (error) {
        /*
         * The unique index prevents the same milestone from
         * being created more than once.
         */
        if (error.code === 11000) {
          return null;
        }

        throw error;
      }
    }

    // ============================================================
    // NORMAL NOTIFICATIONS
    // ============================================================

    // Normal notifications require an actor
    if (!actor) {
      return null;
    }

    // Never notify users about their own actions
    if (recipient.toString() === actor.toString()) {
      return null;
    }

    return await Notification.create({
      recipient,
      actor,
      type,
      post,
      comment,
    });
  } catch (error) {
    console.error("Create notification error:", error);

    /*
     * Notification failure should never cause
     * the original action to fail.
     */
    return null;
  }
};
