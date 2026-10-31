// import { searchPosts } from "../services/search/searchPost.js";

// // Search Posts
// export const searchPostsController = async (req, res) => {
//   try {
//     const query = req.query.q;

//     if (!query || !query.trim()) {
//       console.log(query);
//       return res.json([]);
//     }

//     const results = await searchPosts(query);

//     res.json(results);
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Search failed",
//     });
//   }
// };

import { searchPosts } from "../services/search/searchPost.js";

// Search Posts
export const searchPostsController = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query || !query.trim()) {
      // Existing popup behavior
      if (!req.query.page) {
        return res.json([]);
      }

      // Full search page behavior
      return res.json({
        posts: [],
        pagination: {
          currentPage: Number(req.query.page) || 1,
          totalPages: 0,
          totalResults: 0,
          limit: Number(req.query.limit) || 9,
        },
      });
    }

    const hasPagination =
      req.query.page !== undefined || req.query.limit !== undefined;

    // --------------------------------------------------
    // Popup search
    // --------------------------------------------------

    if (!hasPagination) {
      const results = await searchPosts(query);

      return res.json(results);
    }

    // --------------------------------------------------
    // Full search page
    // --------------------------------------------------

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 9;

    const sort = req.query.sort || "relevance";

    const results = await searchPosts(query, {
      page,
      limit,
      sort,
    });

    return res.json(results);
  } catch (error) {
    console.error("Search error:", error);

    return res.status(500).json({
      message: "Search failed",
    });
  }
};
