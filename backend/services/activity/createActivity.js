import Activity from "../../models/Activity.js";

export const createActivity = async ({
  user,
  type,
  post = null,
  comment = null,
  changes = [],
}) => {
  try {
    return await Activity.create({
      user,
      type,
      post,
      comment,
      changes,
    });
  } catch (error) {
    // Activity logging should never break the main user action.
    console.error("Activity creation error:", error);

    return null;
  }
};
