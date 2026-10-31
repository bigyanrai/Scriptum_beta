import SearchIndex from "../models/SearchIndex.js";
import BlogPost from "./../models/BlogPost.js";
import Comment from "./../models/Comment.js";
import trendingCache, { clearTrendingCache } from "../utils/trendingCache.js";
import PostView from "../models/PostView.js";
import mongoose from "mongoose";
import { rebuildIndex } from "../services/search/rebuildIndex.js";
import PostClap from "../models/PostClap.js";
import User from "../models/User.js";
import PostBookmark from "../models/PostBookmark.js";
import {
  recordPostLike,
  recordPostUnlike,
  recordPostView,
} from "../services/postanalytics/postAnalyticsService.js";
import { createActivity } from "../services/activity/createActivity.js";
import { createNotification } from "../services/notification/createNotification.js";
import { checkPostMilestone } from "../services/notification/notificationMilestone.js";

export const getMyPostById = async (req, res) => {
  try {
    const post = await BlogPost.findOne({
      _id: req.params.id,
      author: req.user._id,
    }).populate("author", "name profileImageUrl");

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(post);
  } catch (error) {
    console.error("Get my post error:", error);

    res.status(500).json({
      message: "Failed to get post",
      error: error.message,
    });
  }
};

//my posts

export const getMyPosts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      filter = "all",
      sort = "newest",
      search = "",
    } = req.query;

    const currentPage = Math.max(Number(page) || 1, 1);
    const postsPerPage = Math.max(Number(limit) || 10, 1);

    // ============================================================
    // FILTER
    // ============================================================

    const query = {
      author: req.user._id,
    };

    if (filter === "published") {
      query.isDraft = false;
    }

    if (filter === "draft") {
      query.isDraft = true;
    }

    // ============================================================
    // SEARCH
    // ============================================================

    if (search.trim()) {
      query.$or = [
        {
          title: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          tags: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    // ============================================================
    // SORT
    // ============================================================

    let sortOption = {};

    switch (sort) {
      case "oldest":
        sortOption = { createdAt: 1 };
        break;

      case "mostViewed":
        sortOption = { views: -1, createdAt: -1 };
        break;

      case "mostLiked":
        sortOption = { likes: -1, createdAt: -1 };
        break;

      case "titleAZ":
        sortOption = { title: 1 };
        break;

      case "titleZA":
        sortOption = { title: -1 };
        break;

      case "updated":
        sortOption = { updatedAt: -1 };
        break;

      case "newest":
      default:
        sortOption = { createdAt: -1 };
        break;
    }

    // ============================================================
    // TOTAL COUNT
    // ============================================================

    const totalPosts = await BlogPost.countDocuments(query);

    const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));

    // Prevent requesting a page that doesn't exist
    const safePage = Math.min(currentPage, totalPages);

    const skip = (safePage - 1) * postsPerPage;

    // ============================================================
    // FETCH POSTS
    // ============================================================

    const posts = await BlogPost.find(query)
      .populate("author", "name profileImageUrl")
      .sort(sortOption)
      .skip(skip)
      .limit(postsPerPage);

    // ============================================================
    // SHOWING RANGE
    // ============================================================

    const showingFrom = totalPosts === 0 ? 0 : skip + 1;

    const showingTo = Math.min(skip + posts.length, totalPosts);

    // ============================================================
    // RESPONSE
    // ============================================================

    res.json({
      posts,
      pagination: {
        page: safePage,
        limit: postsPerPage,
        totalPosts,
        totalPages,
        showingFrom,
        showingTo,
      },
    });
  } catch (error) {
    console.error("Get my posts error:", error);

    res.status(500).json({
      message: "Failed to get your posts",
      error: error.message,
    });
  }
};
//Create Post

export const createPost = async (req, res) => {
  try {
    const { title, content, coverImageUrl, tags, isDraft, generatedByAI } =
      req.body;

    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const newPost = new BlogPost({
      title,
      slug,
      content,
      coverImageUrl,
      tags,
      author: req.user._id,
      isDraft,
      publishedAt: isDraft ? null : new Date(),
      generatedByAI,
    });

    await newPost.save();

    // ============================================================
    // ACTIVITY: POST CREATED
    // ============================================================

    await createActivity({
      user: req.user._id,
      type: "create_post",
      post: newPost._id,
    });

    // ============================================================
    // ACTIVITY: POST PUBLISHED DIRECTLY
    // ============================================================

    if (!isDraft) {
      await createActivity({
        user: req.user._id,
        type: "publish_post",
        post: newPost._id,
      });
    }

    await rebuildIndex();
    clearTrendingCache();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create post",
      error: error.message,
    });
  }
};
//Update Post

export const updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // ======================================================
    // AUTHORIZATION
    // ======================================================

    const isOwner = post.author.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isOwner) {
      const author = await User.findById(post.author).select("role");

      if (!isAdmin || author?.role === "admin") {
        return res.status(403).json({
          message: "Unauthorized to update this post",
        });
      }
    }

    // ======================================================
    // UPDATED DATA
    // ======================================================

    const updatedData = { ...req.body };

    // ======================================================
    // TRACK CHANGED FIELDS
    // ======================================================

    const changes = [];

    const trackableFields = ["title", "content", "coverImageUrl", "tags"];

    for (const field of trackableFields) {
      if (Object.prototype.hasOwnProperty.call(updatedData, field)) {
        const oldValue = post[field];
        const newValue = updatedData[field];

        const oldValueString = JSON.stringify(oldValue ?? null);

        const newValueString = JSON.stringify(newValue ?? null);

        if (oldValueString !== newValueString) {
          changes.push(field);
        }
      }
    }

    // ======================================================
    // SLUG
    // ======================================================

    if (updatedData.title) {
      updatedData.slug = updatedData.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    }

    // ======================================================
    // PUBLISH STATUS
    // ======================================================

    const isBeingPublished =
      post.isDraft === true && updatedData.isDraft === false;

    if (typeof updatedData.isDraft === "boolean") {
      if (post.isDraft === true && updatedData.isDraft === false) {
        updatedData.publishedAt = new Date();
      }

      if (post.isDraft === false && updatedData.isDraft === true) {
        updatedData.publishedAt = null;
      }

      if (post.isDraft === false && updatedData.isDraft === false) {
        delete updatedData.publishedAt;
      }

      if (post.isDraft === true && updatedData.isDraft === true) {
        updatedData.publishedAt = null;
      }
    }

    // ======================================================
    // UPDATE POST
    // ======================================================

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true },
    );

    // ======================================================
    // REBUILD SEARCH INDEX
    // ======================================================

    await rebuildIndex();
    clearTrendingCache();

    // ======================================================
    // UPDATE ACTIVITY
    // ======================================================

    if (changes.length > 0) {
      await createActivity({
        user: req.user._id,
        type: "update_post",
        post: updatedPost._id,
        changes,
      });
    }

    // ======================================================
    // PUBLISH ACTIVITY
    // ======================================================

    if (isBeingPublished) {
      await createActivity({
        user: req.user._id,
        type: "publish_post",
        post: updatedPost._id,
      });
    }

    // ======================================================
    // RESPONSE
    // ======================================================

    res.json(updatedPost);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update",
      error: error.message,
    });
  }
};

//Delete Post

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await BlogPost.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    /*
     * ==================================================
     * AUTHORIZATION
     * ==================================================
     *
     * Owner can delete their own post.
     *
     * Admin can delete member posts.
     *
     * Admin cannot delete another admin's post.
     */
    const isOwner = post.author.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isOwner) {
      const author = await User.findById(post.author).select("role");

      if (!isAdmin || author?.role === "admin") {
        return res.status(403).json({
          message: "Unauthorized to delete this post",
        });
      }
    }

    // Delete the main post
    await BlogPost.findByIdAndDelete(postId);

    // Delete all related data
    await Promise.all([
      Comment.deleteMany({ post: postId }),
      PostView.deleteMany({ post: postId }),
      PostClap.deleteMany({ post: postId }),
      PostBookmark.deleteMany({ post: postId }),
    ]);

    // Rebuild search index and clear trending cache
    await rebuildIndex();
    clearTrendingCache();

    res.json({
      message: "Post and all related data deleted successfully",
    });
  } catch (error) {
    console.error("Delete post error:", error);

    res.status(500).json({
      message: "Failed to delete",
      error: error.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const status = req.query.status || "published";

    const page = req.query.page ? parseInt(req.query.page) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;

    const sortBy = req.query.sortBy || "updated";

    // Determine filter
    const filter = {};

    if (status === "published") {
      filter.isDraft = false;
    } else if (status === "draft") {
      filter.isDraft = true;
    }

    // Determine sorting
    let sort = {};

    switch (sortBy) {
      case "newest":
        sort = {
          createdAt: -1,
          _id: -1,
        };
        break;

      case "oldest":
        sort = {
          createdAt: 1,
          _id: 1,
        };
        break;

      case "updated":
        sort = {
          updatedAt: -1,
          _id: -1,
        };
        break;

      case "views":
        sort = {
          views: -1,
          _id: -1,
        };
        break;

      case "likes":
        sort = {
          likes: -1,
          _id: -1,
        };
        break;

      case "title_asc":
        sort = {
          title: 1,
          _id: 1,
        };
        break;

      case "title_desc":
        sort = {
          title: -1,
          _id: -1,
        };
        break;

      default:
        sort = {
          updatedAt: -1,
          _id: -1,
        };
        break;
    }

    // ---------- SIMPLE MODE ----------
    // No page query -> return all posts
    if (!page) {
      const posts = await BlogPost.find(filter)
        .populate("author", "name profileImageUrl")
        .sort(sort)
        .lean();

      const postsWithCommentCount = await Promise.all(
        posts.map(async (post) => {
          const commentCount = await Comment.countDocuments({
            post: post._id,
            isDeleted: false,
          });

          return {
            ...post,
            commentCount,
          };
        }),
      );

      return res.json(postsWithCommentCount);
    }

    // ---------- PAGINATION MODE ----------
    const skip = (page - 1) * limit;

    const posts = await BlogPost.find(filter)
      .populate("author", "name profileImageUrl")
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    console.log(
      posts.map((post) => ({
        title: post.title,
        updatedAt: post.updatedAt,
      })),
    );

    const postsWithCommentCount = await Promise.all(
      posts.map(async (post) => {
        const commentCount = await Comment.countDocuments({
          post: post._id,
          isDeleted: false,
        });

        return {
          ...post,
          commentCount,
        };
      }),
    );

    const [totalCount, allCount, publishedCount, draftCount] =
      await Promise.all([
        BlogPost.countDocuments(filter),
        BlogPost.countDocuments(),
        BlogPost.countDocuments({ isDraft: false }),
        BlogPost.countDocuments({ isDraft: true }),
      ]);

    res.json({
      posts: postsWithCommentCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      counts: {
        all: allCount,
        published: publishedCount,
        draft: draftCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get all posts",
      error: error.message,
    });
  }
};

//Get post by slug
export const getPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug }).populate(
      "author",
      "name profileImageUrl",
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get post", error: error.message });
  }
};

//get post by tag

export const getPostsByTag = async (req, res) => {
  try {
    const { tag } = req.params;

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 8, 1), 50);

    const sort = req.query.sort || "newest";

    const filter = {
      tags: tag,
      isDraft: false,
    };

    // Sorting
    let sortOption = {};

    switch (sort) {
      case "oldest":
        sortOption = { createdAt: 1 };
        break;

      case "views":
        sortOption = { views: -1, createdAt: -1 };
        break;

      case "likes":
        sortOption = { likes: -1, createdAt: -1 };
        break;

      case "comments":
        // Comments are calculated separately, so this will
        // be handled after fetching the posts.
        sortOption = { createdAt: -1 };
        break;

      case "newest":
      default:
        sortOption = { createdAt: -1 };
        break;
    }

    const totalPosts = await BlogPost.countDocuments(filter);

    const totalPages = Math.ceil(totalPosts / limit);

    // Prevent requesting a page beyond the available pages
    const currentPage = totalPages > 0 ? Math.min(page, totalPages) : 1;

    const skip = (currentPage - 1) * limit;

    let posts = await BlogPost.find(filter)
      .populate("author", "name profileImageUrl")
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean();

    // Add comment counts
    const postsWithCommentCount = await Promise.all(
      posts.map(async (post) => {
        const commentCount = await Comment.countDocuments({
          post: post._id,
          isDeleted: false,
        });

        return {
          ...post,
          commentCount,
        };
      }),
    );

    // Sort by comments after commentCount has been calculated
    if (sort === "comments") {
      postsWithCommentCount.sort((a, b) => b.commentCount - a.commentCount);
    }

    res.json({
      posts: postsWithCommentCount,
      pagination: {
        currentPage,
        totalPages,
        totalPosts,
        limit,
      },
      sort,
    });
  } catch (error) {
    console.error("Error fetching posts by tag:", error);

    res.status(500).json({
      message: "Failed to fetch posts by tag",
      error: error.message,
    });
  }
};

//seach post by title or content
export const searchPosts = async (req, res) => {
  try {
    const q = req.query.q;
    const posts = await BlogPost.find({
      isDraft: false,
      $or: [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
      ],
    }).populate("author", "name profileImageUrl");
    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get post", error: error.message });
  }
};

//Increment view

// export const incrementView = async (req, res) => {
//   try {
//     const postId = req.params.id;

//     // ==========================
//     // Guest User
//     // ==========================

//     if (!req.user) {
//       await BlogPost.findByIdAndUpdate(postId, {
//         $inc: {
//           views: 1,
//         },
//       });

//       // Record analytics
//       await recordPostView(postId);

//       return res.json({
//         counted: true,
//         message: "Guest view counted",
//       });
//     }

//     // ==========================
//     // Logged-in User
//     // ==========================

//     const userId = req.user._id;

//     // Has this user already viewed this post?
//     const existingView = await PostView.findOne({
//       post: postId,
//       user: userId,
//     });

//     if (existingView) {
//       return res.json({
//         counted: false,
//         message: "Already counted",
//       });
//     }

//     // Save the view
//     await PostView.create({
//       post: postId,
//       user: userId,
//     });

//     // Increment main post view count
//     // await BlogPost.findByIdAndUpdate(postId, {
//     //   $inc: {
//     //     views: 1,
//     //   },
//     // });

//     const updatedPost = await BlogPost.findByIdAndUpdate(
//       postId,
//       {
//         $inc: {
//           views: 1,
//         },
//       },
//       {
//         new: true,
//       },
//     );

//     if (updatedPost) {
//       await checkPostMilestone({
//         post: updatedPost,
//         actor: userId,
//       });
//     }

//     // Record analytics
//     await recordPostView(postId);

//     return res.json({
//       counted: true,
//       message: "View counted",
//     });
//   } catch (error) {
//     console.error("Increment view error:", error);

//     res.status(500).json({
//       message: "Failed to increment view",
//       error: error.message,
//     });
//   }
// };

export const incrementView = async (req, res) => {
  try {
    const postId = req.params.id;

    // ============================================================
    // GUEST USER
    // ============================================================

    if (!req.user) {
      const updatedPost = await BlogPost.findByIdAndUpdate(
        postId,
        {
          $inc: {
            views: 1,
          },
        },
        {
          new: true,
        },
      );

      if (!updatedPost) {
        return res.status(404).json({
          message: "Post not found",
        });
      }

      // Check whether the new view count reached a milestone
      await checkPostMilestone({
        post: updatedPost,
        actor: null,
      });

      // Record analytics
      await recordPostView(postId);

      return res.json({
        counted: true,
        message: "Guest view counted",
      });
    }

    // ============================================================
    // LOGGED-IN USER
    // ============================================================

    const userId = req.user._id;

    // Check whether this user has already viewed this post
    const existingView = await PostView.findOne({
      post: postId,
      user: userId,
    });

    if (existingView) {
      return res.json({
        counted: false,
        message: "Already counted",
      });
    }

    // ============================================================
    // SAVE USER VIEW
    // ============================================================

    await PostView.create({
      post: postId,
      user: userId,
    });

    // ============================================================
    // INCREMENT POST VIEWS
    // ============================================================

    const updatedPost = await BlogPost.findByIdAndUpdate(
      postId,
      {
        $inc: {
          views: 1,
        },
      },
      {
        new: true,
      },
    );

    if (!updatedPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // ============================================================
    // CHECK MILESTONE
    // ============================================================

    await checkPostMilestone({
      post: updatedPost,
      actor: userId,
    });

    // ============================================================
    // RECORD ANALYTICS
    // ============================================================

    await recordPostView(postId);

    return res.json({
      counted: true,
      message: "View counted",
    });
  } catch (error) {
    console.error("Increment view error:", error);

    return res.status(500).json({
      message: "Failed to increment view",
      error: error.message,
    });
  }
};
//likepost

export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    let clap = await PostClap.findOne({
      post: postId,
      user: userId,
    });

    // User has already clapped once
    if (clap) {
      return res.json({
        counted: false,
        message: "You have already clapped this post",
        totalClaps: await BlogPost.findById(postId).then((post) => post.likes),
        userClaps: clap.count,
      });
    }

    // First clap from this user
    clap = await PostClap.create({
      post: postId,
      user: userId,
      count: 1,
    });

    const updatedPost = await BlogPost.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } },
      { new: true },
    );

    await recordPostLike(postId);

    // ============================================================
    // ACTIVITY
    // ============================================================

    await createActivity({
      user: userId,
      type: "like",
      post: postId,
    });

    const post = await BlogPost.findById(postId).select("author");

    if (post) {
      await createNotification({
        recipient: post.author,
        actor: userId,
        type: "post_like",
        post: postId,
      });
    }

    clearTrendingCache();

    return res.json({
      counted: true,
      totalClaps: updatedPost.likes,
      userClaps: clap.count,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to clap",
      error: error.message,
    });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    // ============================================================
    // FIND USER LIKE
    // ============================================================

    const clap = await PostClap.findOne({
      post: postId,
      user: userId,
    });

    // ============================================================
    // USER HAS NOT LIKED THE POST
    // ============================================================

    if (!clap) {
      const post = await BlogPost.findById(postId);

      return res.json({
        counted: false,
        message: "You have not liked this post",
        totalLikes: post?.likes || 0,
      });
    }

    // ============================================================
    // REMOVE USER LIKE
    // ============================================================

    await PostClap.deleteOne({
      _id: clap._id,
    });

    // ============================================================
    // DECREASE TOTAL LIKES
    // ============================================================

    const updatedPost = await BlogPost.findOneAndUpdate(
      {
        _id: postId,
        likes: { $gt: 0 },
      },
      {
        $inc: {
          likes: -1,
        },
      },
      {
        new: true,
      },
    );

    if (!updatedPost) {
      return res.status(404).json({
        message: "Post not found or like count is already zero",
      });
    }

    // ============================================================
    // UPDATE ANALYTICS
    // ============================================================

    await recordPostUnlike(postId);

    // ============================================================
    // CLEAR TRENDING CACHE
    // ============================================================

    clearTrendingCache();

    // ============================================================
    // RESPONSE
    // ============================================================

    return res.json({
      counted: true,
      totalLikes: updatedPost.likes,
    });
  } catch (error) {
    console.error("Unlike error:", error);

    res.status(500).json({
      message: "Failed to unlike",
      error: error.message,
    });
  }
};

export const checkLikeStatus = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const clap = await PostClap.findOne({
      post: postId,
      user: userId,
    });

    return res.json({
      liked: !!clap,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to check like status",
      error: error.message,
    });
  }
};
// Get latest posts
export const getLatestPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find({ isDraft: false })
      .populate("author", "name profileImageUrl")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch latest posts",
      error: error.message,
    });
  }
};

export const getTrendingPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    // Cache duration: 5 minutes
    const CACHE_DURATION = 5 * 60 * 1000;

    // Return cached data if it hasn't expired
    if (
      trendingCache.data &&
      trendingCache.expiresAt &&
      trendingCache.expiresAt > Date.now()
    ) {
      console.log("Serving trending posts from cache...");
      return res.json(trendingCache.data.slice(0, limit));
    }

    // Weights
    const VIEW_WEIGHT = Number(process.env.VIEW_WEIGHT) || 10;
    const LIKE_WEIGHT = Number(process.env.LIKE_WEIGHT) || 4;
    const COMMENT_WEIGHT = Number(process.env.COMMENT_WEIGHT) || 12;

    // Minimum requirements
    const MIN_VIEWS = Number(process.env.MIN_VIEWS) || 20;
    const MIN_ENGAGEMENT = Number(process.env.MIN_ENGAGEMENT) || 40;

    // Time decay
    const DECAY_RATE = parseFloat(process.env.DECAY_RATE) || 0.08;

    const posts = await BlogPost.aggregate([
      {
        $match: {
          isDraft: false,
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$post", "$$postId"] },
                    { $eq: ["$isDeleted", false] },
                  ],
                },
              },
            },
          ],
          as: "comments",
        },
      },
      {
        $addFields: {
          commentCount: {
            $size: "$comments",
          },
        },
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
        $project: {
          comments: 0,
          "author.password": 0,
          "author.refreshToken": 0,
        },
      },
    ]);

    // Rank ALL eligible posts
    const trendingPosts = posts
      .map((post) => {
        // Logarithmic scaling for views
        const viewScore = Math.log10(post.views + 1);

        // Engagement score
        const engagement =
          viewScore * VIEW_WEIGHT +
          post.likes * LIKE_WEIGHT +
          post.commentCount * COMMENT_WEIGHT;

        // Age in days
        const ageInDays = Math.max(
          1,
          (Date.now() - new Date(post.createdAt)) / (1000 * 60 * 60 * 24),
        );

        // Exponential time decay
        const decayFactor = Math.exp(-DECAY_RATE * ageInDays);

        // Final score
        const trendingScore = engagement * decayFactor;

        return {
          ...post,
          commentCount: post.commentCount,
          viewScore,
          engagement,
          ageInDays,
          decayFactor,
          trendingScore,
        };
      })
      .filter(
        (post) => post.views >= MIN_VIEWS && post.engagement >= MIN_ENGAGEMENT,
      )
      .sort((a, b) => b.trendingScore - a.trendingScore);

    // Cache the FULL ranked list
    trendingCache.data = trendingPosts;
    trendingCache.expiresAt = Date.now() + CACHE_DURATION;

    console.log("Trending posts cached.");

    // Return only the requested amount
    res.json(trendingPosts.slice(0, limit));
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch trending posts",
      error: error.message,
    });
  }
};

export const bookmarkPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    // Check if already bookmarked
    const existingBookmark = await PostBookmark.findOne({
      post: postId,
      user: userId,
    });

    if (existingBookmark) {
      return res.json({
        bookmarked: true,
        message: "Post already bookmarked",
      });
    }

    await PostBookmark.create({
      post: postId,
      user: userId,
    });

    // ============================================================
    // ACTIVITY
    // ============================================================

    await createActivity({
      user: userId,
      type: "save",
      post: postId,
    });

    const post = await BlogPost.findById(postId).select("author");

    if (post) {
      await createNotification({
        recipient: post.author,
        actor: userId,
        type: "post_save",
        post: postId,
      });
    }

    return res.json({
      bookmarked: true,
      message: "Post bookmarked successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to bookmark post",
      error: error.message,
    });
  }
};

export const removeBookmark = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    await PostBookmark.findOneAndDelete({
      post: postId,
      user: userId,
    });

    return res.json({
      bookmarked: false,
      message: "Bookmark removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to remove bookmark",
      error: error.message,
    });
  }
};

export const getBookmarkedPosts = async (req, res) => {
  try {
    const userId = req.user._id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const sortBy = req.query.sortBy || "saved";

    const matchStage = {
      user: new mongoose.Types.ObjectId(userId),
    };

    // Sorting logic
    let sortStage = {};

    switch (sortBy) {
      case "updated":
        sortStage = {
          "post.updatedAt": -1,
        };
        break;

      case "likes":
        sortStage = {
          "post.likes": -1,
        };
        break;

      case "views":
        sortStage = {
          "post.views": -1,
        };
        break;

      case "title":
        sortStage = {
          "post.title": 1,
        };
        break;

      case "saved":
      default:
        sortStage = {
          createdAt: -1,
        };
        break;
    }

    const searchStage = search
      ? {
          $match: {
            $or: [
              {
                "post.title": {
                  $regex: search,
                  $options: "i",
                },
              },
              {
                "post.content": {
                  $regex: search,
                  $options: "i",
                },
              },
              {
                "post.tags": {
                  $regex: search,
                  $options: "i",
                },
              },
            ],
          },
        }
      : null;

    const pipeline = [
      // Find bookmarks belonging to current user
      {
        $match: matchStage,
      },

      // Get blog post
      {
        $lookup: {
          from: "blogposts",
          localField: "post",
          foreignField: "_id",
          as: "post",
        },
      },

      {
        $unwind: "$post",
      },

      // Search
      ...(searchStage ? [searchStage] : []),

      // Get author
      {
        $lookup: {
          from: "users",
          localField: "post.author",
          foreignField: "_id",
          as: "post.author",
        },
      },

      {
        $unwind: {
          path: "$post.author",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Get comments for each post
      {
        $lookup: {
          from: "comments",
          let: { postId: "$post._id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$post", "$$postId"] },
                    { $eq: ["$isDeleted", false] },
                  ],
                },
              },
            },
          ],
          as: "post.comments",
        },
      },

      // Convert comments array into count
      {
        $set: {
          "post.commentCount": {
            $size: "$post.comments",
          },
        },
      },

      // Remove the actual comments array
      {
        $unset: "post.comments",
      },

      // Sort
      {
        $sort: sortStage,
      },

      // Pagination
      {
        $skip: skip,
      },

      {
        $limit: limit,
      },

      // Return bookmark + post
      {
        $project: {
          _id: 0,
          createdAt: 1,
          post: 1,
        },
      },
    ];

    const bookmarks = await PostBookmark.aggregate(pipeline);

    // Count total matching bookmarks
    const countPipeline = [
      {
        $match: matchStage,
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
        $unwind: "$post",
      },

      ...(searchStage ? [searchStage] : []),

      {
        $count: "total",
      },
    ];

    const totalBookmarks = await PostBookmark.aggregate(countPipeline);

    // Format posts
    const posts = bookmarks.map((bookmark) => ({
      ...bookmark.post,
      savedAt: bookmark.createdAt,
    }));

    res.json({
      posts,

      pagination: {
        page,
        limit,
        totalPages: Math.ceil((totalBookmarks[0]?.total || 0) / limit),
        totalBookmarks: totalBookmarks[0]?.total || 0,
      },
    });
  } catch (error) {
    console.error("Get bookmarked posts error:", error);

    res.status(500).json({
      message: "Failed to fetch bookmarked posts",
      error: error.message,
    });
  }
};

export const checkBookmarkStatus = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const bookmark = await PostBookmark.findOne({
      post: postId,
      user: userId,
    });

    return res.json({
      bookmarked: !!bookmark,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to check bookmark status",
      error: error.message,
    });
  }
};

// Get post by ID for admin search
export const getPostByIdAdmin = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate(
      "author",
      "name profileImageUrl",
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json({
      post,
      matchedPostId: post._id,
    });
  } catch (error) {
    console.error("Error fetching searched post:", error);

    res.status(500).json({
      message: "Failed to get post",
      error: error.message,
    });
  }
};

// Bulk Delete Posts

// Bulk Delete Posts
export const bulkDeletePosts = async (req, res) => {
  try {
    const { postIds } = req.body;

    if (!Array.isArray(postIds) || postIds.length === 0) {
      return res.status(400).json({
        message: "No posts selected for deletion",
      });
    }

    // Validate all IDs first
    const invalidIds = postIds.filter(
      (id) => !mongoose.Types.ObjectId.isValid(id),
    );

    if (invalidIds.length > 0) {
      return res.status(400).json({
        message: "One or more invalid post IDs",
      });
    }

    let deletedCount = 0;

    for (const postId of postIds) {
      const post = await BlogPost.findById(postId);

      // Post may already have been deleted
      if (!post) {
        continue;
      }

      /*
       * ==================================================
       * AUTHORIZATION
       * ==================================================
       *
       * Owner can delete their own post.
       *
       * Admin can delete member posts.
       *
       * Admin cannot delete another admin's post.
       *
       * If the post creator has already been deleted,
       * author lookup returns null, so an admin can still
       * delete the post.
       */
      const isOwner = post.author.toString() === req.user._id.toString();

      const isAdmin = req.user.role === "admin";

      if (!isOwner) {
        const author = await User.findById(post.author).select("role");

        if (!isAdmin || author?.role === "admin") {
          return res.status(403).json({
            message: "Unauthorized to delete one or more selected posts",
          });
        }
      }

      // Delete the main post
      await BlogPost.findByIdAndDelete(postId);

      // Delete all related data for this post
      await Promise.all([
        Comment.deleteMany({ post: postId }),
        PostView.deleteMany({ post: postId }),
        PostClap.deleteMany({ post: postId }),
        PostBookmark.deleteMany({ post: postId }),
      ]);

      deletedCount++;
    }

    // Rebuild search index and clear trending cache once
    if (deletedCount > 0) {
      await rebuildIndex();
      clearTrendingCache();
    }

    res.json({
      message: `${deletedCount} post(s) and all related data deleted successfully`,
      deletedCount,
    });
  } catch (error) {
    console.error("Bulk delete posts error:", error);

    res.status(500).json({
      message: "Failed to delete posts",
      error: error.message,
    });
  }
};

export const deleteMultiplePosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const { postIds } = req.body;

    if (!Array.isArray(postIds) || postIds.length === 0) {
      return res.status(400).json({
        message: "No posts selected.",
      });
    }

    const result = await BlogPost.deleteMany({
      _id: { $in: postIds },
      author: userId,
    });

    return res.status(200).json({
      message: `${result.deletedCount} post${
        result.deletedCount === 1 ? "" : "s"
      } deleted successfully.`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Delete multiple posts error:", error);

    return res.status(500).json({
      message: "Failed to delete selected posts.",
      error: error.message,
    });
  }
};
