import { adminGlobalSearch } from "../services/search/adminGlobalSearch.js";
import { adminGlobalSearchAll } from "../services/search/adminGlobalSearchAll.js";

export const adminGlobalSearchController = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query || !query.trim()) {
      return res.json({
        posts: [],
        members: [],
        comments: [],
      });
    }

    const results = await adminGlobalSearch(query);

    res.json(results);
  } catch (error) {
    console.error("Admin global search error:", error);

    res.status(500).json({
      message: "Admin search failed",
    });
  }
};

export const adminGlobalSearchAllController = async (req, res) => {
  try {
    const query = req.query.q;
    const type = req.query.type || "posts";

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if (!query || !query.trim()) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const results = await adminGlobalSearchAll(query, type, page, limit);

    res.json(results);
  } catch (error) {
    console.error("Admin global search all error:", error);

    res.status(500).json({
      message: "Admin search failed",
    });
  }
};
