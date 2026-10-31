import BlogPost from "../../models/BlogPost.js";
import User from "../../models/User.js";
import Comment from "../../models/Comment.js";

export const adminGlobalSearchAll = async (
  query,
  type = "posts",
  page = 1,
  limit = 10,
) => {
  const searchTerm = query.trim();

  const regex = new RegExp(searchTerm, "i");

  const skip = (page - 1) * limit;

  let results = [];
  let total = 0;

  // POSTS
  if (type === "posts") {
    const filter = {
      $or: [{ title: regex }, { tags: regex }],
    };

    [results, total] = await Promise.all([
      BlogPost.find(filter)
        .populate("author", "name email profileImageUrl")

        .select(
          "_id title slug coverImageUrl author tags isDraft createdAt updatedAt likes views",
        )
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      BlogPost.countDocuments(filter),
    ]);
  }

  // MEMBERS
  else if (type === "members") {
    const filter = {
      role: "member",
      $or: [{ name: regex }, { email: regex }],
    };

    [results, total] = await Promise.all([
      User.find(filter)
        .select("_id name email profileImageUrl role createdAt updatedAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      User.countDocuments(filter),
    ]);
  }

  // COMMENTS
  // COMMENTS
  else if (type === "comments") {
    const filter = {
      $or: [{ content: regex }, { originalContent: regex }],
    };

    // Get matching comments
    const matchingComments = await Comment.find(filter)
      .select(
        "_id content originalContent author post parentComment isDeleted deletedBy createdAt updatedAt",
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    total = await Comment.countDocuments(filter);

    /*
     * Get all comments so we can build the complete
     * nested reply tree.
     */
    const allComments = await Comment.find({})
      .populate("author", "name email profileImageUrl")
      .populate("post", "title slug coverImageUrl")
      .select(
        "_id content originalContent author post parentComment isDeleted deletedBy createdAt updatedAt",
      )
      .sort({ createdAt: 1 })
      .lean();

    /*
     * Create a lookup map.
     */
    const commentMap = {};

    allComments.forEach((comment) => {
      comment.replies = [];

      commentMap[comment._id.toString()] = comment;
    });

    /*
     * Build the complete nested reply tree.
     */
    allComments.forEach((comment) => {
      if (!comment.parentComment) return;

      const parent = commentMap[comment.parentComment.toString()];

      if (parent) {
        parent.replies.push(commentMap[comment._id.toString()]);
      }
    });

    /*
     * Keep track of root comments we have already added.
     *
     * This prevents:
     *
     * Root
     * └── Reply
     *
     * from producing the same Root twice when both
     * Root and Reply match the search.
     */
    const addedRoots = new Set();

    results = [];

    matchingComments.forEach((matchedComment) => {
      const matchedCommentId = matchedComment._id.toString();

      let currentComment = commentMap[matchedCommentId];

      if (!currentComment) return;

      /*
       * Find the root comment.
       */
      while (currentComment.parentComment) {
        const parent = commentMap[currentComment.parentComment.toString()];

        if (!parent) break;

        currentComment = parent;
      }

      const rootComment = currentComment;

      const rootId = rootComment._id.toString();

      /*
       * If this thread has already been added,
       * don't add the same root again.
       */
      if (addedRoots.has(rootId)) {
        return;
      }

      addedRoots.add(rootId);

      /*
       * Return the complete root thread.
       *
       * The frontend can use matchedCommentId
       * to identify/highlight the actual comment
       * that matched the search.
       */
      results.push({
        ...rootComment,

        matchedCommentId: matchedComment._id,

        matchedComment: commentMap[matchedCommentId] || null,
      });
    });
  }
  // INVALID TYPE
  else {
    throw new Error("Invalid search type");
  }

  return {
    results,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalResults: total,
      limit,
    },
  };
};
