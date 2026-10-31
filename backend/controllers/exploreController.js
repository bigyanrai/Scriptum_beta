// import BlogPost from "../models/BlogPost.js";
// import { generateClusterNames } from "../services/cluster/clusterNames.js";

// export const getExplorePosts = async (req, res) => {
//   try {
//     // Fetch all published blogs that have been clustered
//     const posts = await BlogPost.find({
//       isDraft: false,
//       cluster: { $ne: null },
//     })
//       .populate("author", "name profileImageUrl")
//       .sort({ createdAt: -1 })
//       .lean();

//     // No posts available
//     if (posts.length === 0) {
//       return res.status(200).json([]);
//     }

//     // Generate titles/keywords for each cluster
//     const clusterNames = generateClusterNames(posts);

//     // Group blogs by cluster
//     const groupedBlogs = {};

//     posts.forEach((post) => {
//       const cluster = post.cluster;

//       if (!groupedBlogs[cluster]) {
//         groupedBlogs[cluster] = {
//           cluster,
//           title: clusterNames[cluster]?.title || `Cluster ${cluster}`,
//           keywords: clusterNames[cluster]?.keywords || [],
//           blogs: [],
//         };
//       }

//       groupedBlogs[cluster].blogs.push(post);
//     });

//     // Optional: sort blogs inside each cluster
//     Object.values(groupedBlogs).forEach((group) => {
//       group.blogs.sort((a, b) => b.views + b.likes - (a.views + a.likes));
//     });

//     // Optional: sort clusters by number of blogs
//     const response = Object.values(groupedBlogs).sort(
//       (a, b) => b.blogs.length - a.blogs.length,
//     );

//     return res.status(200).json(response);
//   } catch (error) {
//     console.error("Explore Error:", error);

//     return res.status(500).json({
//       message: "Failed to fetch explore posts",
//       error: error.message,
//     });
//   }
// };

// export const getExploreCluster = async (req, res) => {
//   try {
//     const { clusterId } = req.params;

//     const page = Math.max(Number(req.query.page) || 1, 1);
//     const limit = Math.max(Number(req.query.limit) || 10, 1);
//     const skip = (page - 1) * limit;

//     const filter = {
//       isDraft: false,
//       cluster: Number(clusterId),
//     };

//     const totalBlogs = await BlogPost.countDocuments(filter);

//     if (!totalBlogs) {
//       return res.status(404).json({
//         message: "Cluster not found",
//       });
//     }

//     const posts = await BlogPost.find(filter)
//       .populate("author", "name profileImageUrl")
//       .sort({
//         views: -1,
//         likes: -1,
//         createdAt: -1,
//       })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     const clusterNames = generateClusterNames(posts);

//     const totalPages = Math.ceil(totalBlogs / limit);

//     return res.status(200).json({
//       cluster: {
//         cluster: Number(clusterId),
//         title: clusterNames[clusterId]?.title || `Cluster ${clusterId}`,
//         keywords: clusterNames[clusterId]?.keywords || [],
//         blogs: posts,
//       },

//       pagination: {
//         page,
//         limit,
//         totalBlogs,
//         totalPages,
//         hasPrevPage: page > 1,
//         hasNextPage: page < totalPages,
//       },
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Failed to fetch cluster",
//       error: error.message,
//     });
//   }
// };

import BlogPost from "../models/BlogPost.js";
import Comment from "../models/Comment.js";
import { generateClusterNames } from "../services/cluster/clusterNames.js";

export const getExplorePosts = async (req, res) => {
  try {
    // Fetch all published blogs that have been clustered
    const posts = await BlogPost.find({
      isDraft: false,
      cluster: { $ne: null },
    })
      .populate("author", "name profileImageUrl")
      .sort({ createdAt: -1 })
      .lean();

    // No posts available
    if (posts.length === 0) {
      return res.status(200).json([]);
    }

    // Add comment count to every post
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

    // Generate titles/keywords for each cluster
    const clusterNames = generateClusterNames(postsWithCommentCount);

    // Group blogs by cluster
    const groupedBlogs = {};

    postsWithCommentCount.forEach((post) => {
      const cluster = post.cluster;

      if (!groupedBlogs[cluster]) {
        groupedBlogs[cluster] = {
          cluster,
          title: clusterNames[cluster]?.title || `Cluster ${cluster}`,
          keywords: clusterNames[cluster]?.keywords || [],
          blogs: [],
        };
      }

      groupedBlogs[cluster].blogs.push(post);
    });

    // Sort blogs inside each cluster
    Object.values(groupedBlogs).forEach((group) => {
      group.blogs.sort((a, b) => b.views + b.likes - (a.views + a.likes));
    });

    // Sort clusters by number of blogs
    const response = Object.values(groupedBlogs).sort(
      (a, b) => b.blogs.length - a.blogs.length,
    );

    return res.status(200).json(response);
  } catch (error) {
    console.error("Explore Error:", error);

    return res.status(500).json({
      message: "Failed to fetch explore posts",
      error: error.message,
    });
  }
};

export const getExploreCluster = async (req, res) => {
  try {
    const { clusterId } = req.params;

    const page = Math.max(Number(req.query.page) || 1, 1);

    const limit = Math.max(Number(req.query.limit) || 10, 1);

    const skip = (page - 1) * limit;

    const filter = {
      isDraft: false,
      cluster: Number(clusterId),
    };

    const totalBlogs = await BlogPost.countDocuments(filter);

    if (!totalBlogs) {
      return res.status(404).json({
        message: "Cluster not found",
      });
    }

    const posts = await BlogPost.find(filter)
      .populate("author", "name profileImageUrl")
      .sort({
        views: -1,
        likes: -1,
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean();

    // Add comment count to every post
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

    const clusterNames = generateClusterNames(postsWithCommentCount);

    const totalPages = Math.ceil(totalBlogs / limit);

    return res.status(200).json({
      cluster: {
        cluster: Number(clusterId),

        title: clusterNames[clusterId]?.title || `Cluster ${clusterId}`,

        keywords: clusterNames[clusterId]?.keywords || [],

        blogs: postsWithCommentCount,
      },

      pagination: {
        page,
        limit,
        totalBlogs,
        totalPages,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch cluster",
      error: error.message,
    });
  }
};
