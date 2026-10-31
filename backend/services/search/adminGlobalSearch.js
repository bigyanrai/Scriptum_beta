import BlogPost from "../../models/BlogPost.js";
import User from "../../models/User.js";
import Comment from "../../models/Comment.js";

export const adminGlobalSearch = async (query) => {
  const searchTerm = query.trim();

  const regex = new RegExp(searchTerm, "i");

  const [posts, members, comments] = await Promise.all([
    // Posts
    BlogPost.find({
      $or: [{ title: regex }, { tags: regex }],
    })
      .populate("author", "name email profileImageUrl")
      .select(
        "_id title slug coverImageUrl author tags isDraft createdAt updatedAt likes views",
      )
      .limit(5)
      .lean(),

    // Members + Admins
    User.find({
      $or: [{ name: regex }, { email: regex }],
    })
      .select("_id name email profileImageUrl role")
      .limit(5)
      .lean(),

    // Comments
    Comment.find({
      $or: [
        // Normal comments
        { content: regex },

        // Soft-deleted comments
        { originalContent: regex },
      ],
    })
      .populate("author", "name email profileImageUrl")
      .populate("post", "title slug")
      .select(
        "_id content originalContent author post isDeleted deletedBy createdAt updatedAt",
      )
      .limit(5)
      .lean(),
  ]);

  return {
    posts,
    members,
    comments,
  };
};
