import Comment from "../models/Comment.js";
import BlogPost from "../models/BlogPost.js";
import predictSentiment from "../utils/predictSentiment.js";
import { clearTrendingCache } from "../utils/trendingCache.js";
import { recordPostComment } from "../services/postanalytics/postAnalyticsService.js";
import { createActivity } from "../services/activity/createActivity.js";
import { createNotification } from "../services/notification/createNotification.js";

// export const addComment = async (req, res) => {
//   try {
//     console.log("1. Request received");

//     const { postId } = req.params;
//     const { content, parentComment } = req.body;

//     console.log("2. Finding post");

//     const post = await BlogPost.findById(postId);

//     if (!post) {
//       return res.status(404).json({
//         message: "Post not found",
//       });
//     }

//     console.log("3. Calling Python");

//     const sentiment = await predictSentiment(content);

//     console.log("4. Python returned:", sentiment);

//     console.log("5. Saving comment");

//     const comment = await Comment.create({
//       post: postId,
//       author: req.user._id,
//       content,
//       sentiment,
//       parentComment: parentComment || null,
//     });

//     await recordPostComment(postId);

//     console.log("6. Comment saved");

//     await comment.populate("author", "name profileImageUrl");

//     console.log("7. Sending response");

//     clearTrendingCache();

//     res.status(201).json(comment);
//   } catch (error) {
//     console.error("ERROR:", error);

//     res.status(500).json({
//       message: "Failed to add comment",
//       error: error.message,
//     });
//   }
// };

export const addComment = async (req, res) => {
  try {
    console.log("1. Request received");

    const { postId } = req.params;
    const { content, parentComment } = req.body;

    console.log("2. Finding post");

    const post = await BlogPost.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    console.log("3. Calling Python");

    const sentiment = await predictSentiment(content);

    console.log("4. Python returned:", sentiment);

    console.log("5. Saving comment");

    const comment = await Comment.create({
      post: postId,
      author: req.user._id,
      content,
      sentiment,
      parentComment: parentComment || null,
    });

    await recordPostComment(postId);

    console.log("6. Comment saved");

    // ============================================================
    // ACTIVITY
    // ============================================================

    await createActivity({
      user: req.user._id,
      type: parentComment ? "reply" : "comment",
      post: postId,
      comment: comment._id,
    });

    // ============================================================
    // NOTIFICATION
    // ============================================================

    if (parentComment) {
      // ----------------------------------------------------------
      // REPLY TO A COMMENT
      // ----------------------------------------------------------

      const parent = await Comment.findById(parentComment).select("author");

      if (parent) {
        await createNotification({
          recipient: parent.author,
          actor: req.user._id,
          type: "comment_reply",
          post: postId,
          comment: comment._id,
        });
      }
    } else {
      // ----------------------------------------------------------
      // NEW COMMENT ON POST
      // ----------------------------------------------------------

      await createNotification({
        recipient: post.author,
        actor: req.user._id,
        type: "post_comment",
        post: postId,
        comment: comment._id,
      });
    }

    console.log("7. Activity recorded");

    await comment.populate("author", "name profileImageUrl");

    console.log("8. Sending response");

    clearTrendingCache();

    res.status(201).json(comment);
  } catch (error) {
    console.error("ERROR:", error);

    res.status(500).json({
      message: "Failed to add comment",
      error: error.message,
    });
  }
};
export const getAllComments = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sort = req.query.sort || "newest";

    const skip = (page - 1) * limit;

    // Total number of root comments
    const totalComments = await Comment.countDocuments({
      parentComment: null,
    });

    let rootComments;

    if (sort === "mostReplies" || sort === "leastReplies") {
      const replySort = sort === "mostReplies" ? -1 : 1;

      rootComments = await Comment.aggregate([
        {
          $match: {
            parentComment: null,
          },
        },

        {
          $lookup: {
            from: "comments",
            let: {
              rootCommentId: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$parentComment", "$$rootCommentId"],
                  },
                },
              },
            ],
            as: "replies",
          },
        },

        {
          $addFields: {
            replyCount: {
              $size: "$replies",
            },
          },
        },

        {
          $sort: {
            replyCount: replySort,
            createdAt: -1,
            _id: -1,
          },
        },

        {
          $skip: skip,
        },

        {
          $limit: limit,
        },

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

        {
          $lookup: {
            from: "blogposts",
            localField: "post",
            foreignField: "_id",
            as: "post",
          },
        },

        {
          $unwind: {
            path: "$post",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $project: {
            content: 1,
            parentComment: 1,
            isDeleted: 1,
            deletedBy: 1,
            createdAt: 1,
            updatedAt: 1,
            replyCount: 1,

            "author._id": 1,
            "author.name": 1,
            "author.profileImageUrl": 1,

            "post._id": 1,
            "post.title": 1,
            "post.coverImageUrl": 1,
          },
        },
      ]);
    } else {
      let sortOption;

      if (sort === "recentlyUpdated") {
        sortOption = {
          updatedAt: -1,
          _id: -1,
        };
      } else if (sort === "oldest") {
        sortOption = {
          createdAt: 1,
          _id: 1,
        };
      } else {
        // newest
        sortOption = {
          createdAt: -1,
          _id: -1,
        };
      }

      rootComments = await Comment.find({
        parentComment: null,
      })
        .populate("author", "name profileImageUrl")
        .populate("post", "title coverImageUrl")
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .lean();
    }

    // --------------------------------------------------
    // FETCH ALL REPLIES
    // --------------------------------------------------

    const replies = await Comment.find({
      parentComment: { $ne: null },
    })
      .populate("author", "name profileImageUrl")
      .populate("post", "title coverImageUrl")
      .sort({
        createdAt: 1,
        _id: 1,
      })
      .lean();

    // --------------------------------------------------
    // CREATE COMMENT LOOKUP MAP
    // --------------------------------------------------

    const commentMap = {};

    rootComments.forEach((comment) => {
      const obj = {
        ...comment,
        replies: [],
      };

      commentMap[comment._id.toString()] = obj;
    });

    replies.forEach((reply) => {
      const obj = {
        ...reply,
        replies: [],
      };

      commentMap[reply._id.toString()] = obj;
    });

    // --------------------------------------------------
    // BUILD COMMENT TREE
    // --------------------------------------------------

    replies.forEach((reply) => {
      const parentId = reply.parentComment?.toString();

      const parent = commentMap[parentId];

      if (parent) {
        parent.replies.push(commentMap[reply._id.toString()]);
      }
    });

    // --------------------------------------------------
    // RESPONSE
    // --------------------------------------------------

    res.json({
      comments: rootComments.map(
        (comment) => commentMap[comment._id.toString()],
      ),
      currentPage: page,
      totalPages: Math.ceil(totalComments / limit),
      totalComments,
    });
  } catch (error) {
    console.error("Error getting all comments:", error);

    res.status(500).json({
      message: "Failed to get all comments",
      error: error.message,
    });
  }
};
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("author", "name profileImageUrl")
      .populate("post", "title coverImageUrl")
      .sort({ createdAt: 1 });

    const commentMap = {};

    comments.forEach((comment) => {
      comment = comment.toObject();
      comment.replies = [];
      commentMap[comment._id] = comment;
    });

    const nestedComments = [];

    comments.forEach((comment) => {
      if (comment.parentComment) {
        const parent = commentMap[comment.parentComment];

        if (parent) {
          parent.replies.push(commentMap[comment._id]);
        }
      } else {
        nestedComments.push(commentMap[comment._id]);
      }
    });

    res.json(nestedComments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get comments",
      error: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    await Comment.deleteOne({ _id: commentId });

    await Comment.deleteMany({
      parentComment: commentId,
    });

    clearTrendingCache();

    res.json({
      message: "Comment and any replies deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete comment",
      error: error.message,
    });
  }
};

export const deleteOwnComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found.",
      });
    }

    if (comment.isDeleted) {
      return res.status(400).json({
        message: "Cannot edit a deleted comment.",
      });
    }

    // Check ownership
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to delete this comment.",
      });
    }

    // Check if the comment has replies
    const hasReplies = await Comment.exists({
      parentComment: commentId,
    });

    if (hasReplies) {
      // Soft delete
      comment.originalContent = comment.content;
      comment.content = "[deleted]";
      comment.isDeleted = true;
      comment.deletedBy = "user";
      comment.deletedAt = new Date();

      await comment.save();

      return res.json({
        message: "Comment deleted successfully.",
      });
    }

    // No replies -> Hard delete
    await Comment.deleteOne({
      _id: commentId,
    });

    clearTrendingCache();

    return res.json({
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete comment.",
      error: error.message,
    });
  }
};

export const editOwnComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        message: "Comment cannot be empty.",
      });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found.",
      });
    }

    // Only owner can edit
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to edit this comment.",
      });
    }

    // Clean the updated content
    const updatedContent = content.trim();

    // Recalculate sentiment for the edited comment
    const sentiment = await predictSentiment(updatedContent);

    // Update comment
    comment.content = updatedContent;
    comment.sentiment = sentiment;

    await comment.save();

    res.json({
      message: "Comment updated successfully.",
      comment,
    });
  } catch (error) {
    console.error("ERROR:", error);

    res.status(500).json({
      message: "Failed to update comment.",
      error: error.message,
    });
  }
};

export const deleteCommentOnly = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // Check whether this comment has replies
    const hasReplies = await Comment.exists({
      parentComment: commentId,
    });

    if (hasReplies) {
      // Preserve the original content so that admins
      // can still search for the deleted comment.
      comment.originalContent = comment.content;

      // Replace visible content
      comment.content = "[Comment removed by moderator]";

      comment.isDeleted = true;
      comment.deletedBy = "admin";
      comment.deletedAt = new Date();

      await comment.save();

      return res.json({
        message: "Comment removed. Replies were preserved.",
      });
    }

    // No replies -> delete permanently
    await Comment.deleteOne({
      _id: commentId,
    });

    clearTrendingCache();

    res.json({
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete comment.",
      error: error.message,
    });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;

    // Find the searched comment
    const comment = await Comment.findById(commentId)
      .populate("author", "name profileImageUrl")
      .populate("post", "title coverImageUrl");

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // Find the root comment of this discussion
    let rootComment = comment;

    while (rootComment.parentComment) {
      const parent = await Comment.findById(rootComment.parentComment)
        .populate("author", "name profileImageUrl")
        .populate("post", "title coverImageUrl");

      if (!parent) {
        break;
      }

      rootComment = parent;
    }

    // Get ALL comments belonging to this post
    const allComments = await Comment.find({
      post: rootComment.post._id,
    })
      .populate("author", "name profileImageUrl")
      .populate("post", "title coverImageUrl")
      .sort({ createdAt: 1 });

    // Create a lookup map
    const commentMap = {};

    allComments.forEach((comment) => {
      const obj = comment.toObject();

      obj.replies = [];

      commentMap[comment._id.toString()] = obj;
    });

    // Build the complete nested tree
    allComments.forEach((comment) => {
      if (comment.parentComment) {
        const parentId = comment.parentComment.toString();

        const parent = commentMap[parentId];

        if (parent) {
          parent.replies.push(commentMap[comment._id.toString()]);
        }
      }
    });

    // Get the complete root comment
    const result = commentMap[rootComment._id.toString()];

    if (!result) {
      return res.status(404).json({
        message: "Root comment not found",
      });
    }

    res.json({
      comment: result,
      matchedCommentId: comment._id,
    });
  } catch (error) {
    console.error("Error getting comment by ID:", error);

    res.status(500).json({
      message: "Failed to get comment",
      error: error.message,
    });
  }
};

export const deleteCommentThread = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // Find every comment underneath this comment
    const idsToDelete = [comment._id];

    let currentParentIds = [comment._id];

    while (currentParentIds.length > 0) {
      const children = await Comment.find({
        parentComment: { $in: currentParentIds },
      }).select("_id");

      if (children.length === 0) {
        break;
      }

      const childIds = children.map((child) => child._id);

      idsToDelete.push(...childIds);

      currentParentIds = childIds;
    }

    // Delete the selected comment + ALL descendants
    await Comment.deleteMany({
      _id: { $in: idsToDelete },
    });

    clearTrendingCache();

    res.json({
      message: "Comment thread deleted successfully",
      deletedCount: idsToDelete.length,
    });
  } catch (error) {
    console.error("Error deleting comment thread:", error);

    res.status(500).json({
      message: "Failed to delete comment thread",
      error: error.message,
    });
  }
};

export const deleteCommentsBulk = async (req, res) => {
  try {
    console.log(req.body);
    const { commentIds } = req.body;

    if (!Array.isArray(commentIds) || commentIds.length === 0) {
      return res.status(400).json({
        message: "No comments selected for deletion.",
      });
    }

    // Find all selected comments
    const selectedComments = await Comment.find({
      _id: { $in: commentIds },
    }).select("_id");

    if (selectedComments.length === 0) {
      return res.status(404).json({
        message: "No valid comments found.",
      });
    }

    // These are the comments whose entire subtrees must be deleted
    let idsToDelete = selectedComments.map((comment) => comment._id);

    // Start by looking for children of the selected comments
    let parentIds = [...idsToDelete];

    // Recursively find every descendant
    while (parentIds.length > 0) {
      const children = await Comment.find({
        parentComment: { $in: parentIds },
      }).select("_id");

      if (children.length === 0) {
        break;
      }

      const childIds = children.map((child) => child._id);

      idsToDelete.push(...childIds);

      parentIds = childIds;
    }

    // Remove duplicates
    const uniqueIds = [...new Set(idsToDelete.map((id) => id.toString()))];

    // Delete the selected comments and all descendants
    const result = await Comment.deleteMany({
      _id: { $in: uniqueIds },
    });

    clearTrendingCache();

    res.json({
      message: "Selected comment threads deleted successfully.",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting comments in bulk:", error);

    res.status(500).json({
      message: "Failed to delete comments",
      error: error.message,
    });
  }
};
