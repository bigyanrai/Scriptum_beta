import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  LuSearch,
  LuFileText,
  LuUsers,
  LuMessageSquare,
  LuLoaderCircle,
  LuCalendarDays,
  LuShieldCheck,
  LuMail,
  LuTrash2,
  LuCheck,
} from "react-icons/lu";
import moment from "moment";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Pagination from "../../components/Pagination";
import BlogPostSummaryCard from "../../components/Cards/BlogPostSummaryCard";
import MemberInfoCard from "../../components/Cards/MemberInfoCard";
import CommentInfoCard from "../../components/Cards/CommentInfoCard";
import DeleteAlertContent from "../../components/DeleteAlertContent";
import Modal from "../../components/Modal";
import EditMemberModal from "../../components/EditMemberModal";

const AdminSearchResults = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || "posts";

  const [results, setResults] = useState([]);

  const [page, setPage] = useState(
    Math.max(Number(searchParams.get("page")) || 1, 1),
  );

  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  const [deletingMember, setDeletingMember] = useState(false);
  const [deletingMembers, setDeletingMembers] = useState(false);

  const [deletingPost, setDeletingPost] = useState(false);
  const [deletingPosts, setDeletingPosts] = useState(false);

  const [deletingComment, setDeletingComment] = useState(false);
  const [deletingComments, setDeletingComments] = useState(false);

  // ==================================================
  // SELECTED POSTS
  // ==================================================

  const [selectedPostIds, setSelectedPostIds] = useState([]);

  // ==================================================
  // SELECTED MEMBERS
  // ==================================================

  const [selectedMemberIds, setSelectedMemberIds] = useState([]);

  // ==================================================
  // SELECTED COMMENTS
  // ==================================================

  const [selectedCommentIds, setSelectedCommentIds] = useState([]);

  // ==================================================
  // MODAL STATES
  // ==================================================

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    type: "comment",
    data: null,
  });

  const [openDeleteAlertPost, setOpenDeleteAlertPost] = useState({
    open: false,
    type: "post",
    data: null,
  });

  const [openBulkDeleteAlert, setOpenBulkDeleteAlert] = useState(false);

  const [openBulkDeleteMemberAlert, setOpenBulkDeleteMemberAlert] =
    useState(false);

  const [openBulkDeleteCommentAlert, setOpenBulkDeleteCommentAlert] =
    useState(false);

  const [openViewModal, setOpenViewModal] = useState({
    open: false,
    data: null,
  });

  const [openEditModal, setOpenEditModal] = useState({
    open: false,
    data: null,
  });

  const limit = 4;

  // ==================================================
  // SEARCH TYPES
  // ==================================================

  const searchTypes = [
    {
      key: "posts",
      label: "Posts",
      icon: LuFileText,
    },
    {
      key: "members",
      label: "Members",
      icon: LuUsers,
    },
    {
      key: "comments",
      label: "Comments",
      icon: LuMessageSquare,
    },
  ];

  const activeType =
    searchTypes.find((item) => item.key === type) || searchTypes[0];

  const ActiveIcon = activeType.icon;

  // ==================================================
  // GET SEARCH RESULTS
  // ==================================================

  const getSearchResults = async () => {
    if (!query.trim()) {
      setResults([]);
      setTotalResults(0);
      setTotalPages(1);

      setSelectedPostIds([]);
      setSelectedMemberIds([]);
      setSelectedCommentIds([]);

      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.get(
        API_PATHS.ADMIN_SEARCH.GLOBAL_SEARCH_ALL,
        {
          params: {
            q: query.trim(),
            type,
            page,
            limit,
          },
        },
      );

      const newResults = response.data?.results || [];

      setResults(newResults);

      setTotalPages(response.data?.pagination?.totalPages || 1);

      setTotalResults(response.data?.pagination?.totalResults || 0);

      // ==================================================
      // POSTS
      // ==================================================

      if (type === "posts") {
        const currentIds = new Set(newResults.map((post) => String(post._id)));

        setSelectedPostIds((prev) =>
          prev.filter((id) => currentIds.has(String(id))),
        );

        setSelectedMemberIds([]);
        setSelectedCommentIds([]);
      }

      // ==================================================
      // MEMBERS
      // ==================================================
      else if (type === "members") {
        const currentMemberIds = new Set(
          newResults
            .filter((member) => member.role === "member")
            .map((member) => String(member._id)),
        );

        setSelectedMemberIds((prev) =>
          prev.filter((id) => currentMemberIds.has(String(id))),
        );

        setSelectedPostIds([]);
        setSelectedCommentIds([]);
      }

      // ==================================================
      // COMMENTS
      // ==================================================
      else {
        const currentCommentIds = new Set(
          newResults.map((comment) => String(comment._id)),
        );

        setSelectedCommentIds((prev) =>
          prev.filter((id) => currentCommentIds.has(String(id))),
        );

        setSelectedPostIds([]);
        setSelectedMemberIds([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);

      setResults([]);
      setTotalResults(0);
      setTotalPages(1);

      setSelectedPostIds([]);
      setSelectedMemberIds([]);
      setSelectedCommentIds([]);

      toast.error(
        error?.response?.data?.message || "Failed to load search results.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSearchResults();
  }, [query, type, page]);

  // ==================================================
  // SELECT INDIVIDUAL POST
  // ==================================================

  const handleSelectPost = (postId) => {
    setSelectedPostIds((prev) => {
      const exists = prev.some((id) => String(id) === String(postId));

      if (exists) {
        return prev.filter((id) => String(id) !== String(postId));
      }

      return [...prev, postId];
    });
  };

  // ==================================================
  // SELECT ALL POSTS ON CURRENT PAGE
  // ==================================================

  const handleSelectAllPosts = () => {
    const currentPagePostIds = results.map((post) => post._id);

    if (currentPagePostIds.length === 0) {
      return;
    }

    const allCurrentPageSelected = currentPagePostIds.every((id) =>
      selectedPostIds.some((selectedId) => String(selectedId) === String(id)),
    );

    if (allCurrentPageSelected) {
      setSelectedPostIds((prev) =>
        prev.filter(
          (id) =>
            !currentPagePostIds.some(
              (currentId) => String(currentId) === String(id),
            ),
        ),
      );
    } else {
      setSelectedPostIds((prev) => {
        const ids = new Map();

        prev.forEach((id) => {
          ids.set(String(id), id);
        });

        currentPagePostIds.forEach((id) => {
          ids.set(String(id), id);
        });

        return Array.from(ids.values());
      });
    }
  };

  // ==================================================
  // POST SELECT ALL STATE
  // ==================================================

  const currentPagePostIds =
    type === "posts" ? results.map((post) => post._id) : [];

  const allCurrentPagePostsSelected =
    currentPagePostIds.length > 0 &&
    currentPagePostIds.every((id) =>
      selectedPostIds.some((selectedId) => String(selectedId) === String(id)),
    );

  const someCurrentPagePostsSelected = currentPagePostIds.some((id) =>
    selectedPostIds.some((selectedId) => String(selectedId) === String(id)),
  );

  // ==================================================
  // MEMBER SELECTION
  // ==================================================

  const selectableMembers =
    type === "members"
      ? results.filter((member) => member.role === "member")
      : [];

  const currentPageMemberIds = selectableMembers.map((member) => member._id);

  // ==================================================
  // SELECT INDIVIDUAL MEMBER
  // ==================================================

  const handleSelectMember = (memberId, checked) => {
    setSelectedMemberIds((prev) => {
      const exists = prev.some((id) => String(id) === String(memberId));

      if (checked) {
        if (exists) {
          return prev;
        }

        return [...prev, memberId];
      }

      return prev.filter((id) => String(id) !== String(memberId));
    });
  };

  // ==================================================
  // SELECT ALL MEMBERS ON CURRENT PAGE
  // ==================================================

  const handleSelectAllMembers = () => {
    if (currentPageMemberIds.length === 0) {
      return;
    }

    const allCurrentPageSelected = currentPageMemberIds.every((id) =>
      selectedMemberIds.some((selectedId) => String(selectedId) === String(id)),
    );

    if (allCurrentPageSelected) {
      setSelectedMemberIds((prev) =>
        prev.filter(
          (id) =>
            !currentPageMemberIds.some(
              (currentId) => String(currentId) === String(id),
            ),
        ),
      );
    } else {
      setSelectedMemberIds((prev) => {
        const ids = new Map();

        prev.forEach((id) => {
          ids.set(String(id), id);
        });

        currentPageMemberIds.forEach((id) => {
          ids.set(String(id), id);
        });

        return Array.from(ids.values());
      });
    }
  };

  // ==================================================
  // MEMBER SELECT ALL STATE
  // ==================================================

  const allCurrentPageMembersSelected =
    currentPageMemberIds.length > 0 &&
    currentPageMemberIds.every((id) =>
      selectedMemberIds.some((selectedId) => String(selectedId) === String(id)),
    );

  const someCurrentPageMembersSelected = currentPageMemberIds.some((id) =>
    selectedMemberIds.some((selectedId) => String(selectedId) === String(id)),
  );

  // ==================================================
  // COMMENT SELECTION
  // ==================================================

  const currentPageCommentIds =
    type === "comments" ? results.map((comment) => comment._id) : [];

  // ==================================================
  // SELECT INDIVIDUAL COMMENT
  // ==================================================

  const handleSelectComment = (commentId) => {
    setSelectedCommentIds((prev) => {
      const exists = prev.some((id) => String(id) === String(commentId));

      if (exists) {
        return prev.filter((id) => String(id) !== String(commentId));
      }

      return [...prev, commentId];
    });
  };

  // ==================================================
  // SELECT ALL COMMENTS ON CURRENT PAGE
  // ==================================================

  const handleSelectAllComments = () => {
    if (currentPageCommentIds.length === 0) {
      return;
    }

    const allCurrentPageSelected = currentPageCommentIds.every((id) =>
      selectedCommentIds.some(
        (selectedId) => String(selectedId) === String(id),
      ),
    );

    if (allCurrentPageSelected) {
      setSelectedCommentIds((prev) =>
        prev.filter(
          (id) =>
            !currentPageCommentIds.some(
              (currentId) => String(currentId) === String(id),
            ),
        ),
      );
    } else {
      setSelectedCommentIds((prev) => {
        const ids = new Map();

        prev.forEach((id) => {
          ids.set(String(id), id);
        });

        currentPageCommentIds.forEach((id) => {
          ids.set(String(id), id);
        });

        return Array.from(ids.values());
      });
    }
  };

  // ==================================================
  // COMMENT SELECT ALL STATE
  // ==================================================

  const allCurrentPageCommentsSelected =
    currentPageCommentIds.length > 0 &&
    currentPageCommentIds.every((id) =>
      selectedCommentIds.some(
        (selectedId) => String(selectedId) === String(id),
      ),
    );

  const someCurrentPageCommentsSelected = currentPageCommentIds.some((id) =>
    selectedCommentIds.some((selectedId) => String(selectedId) === String(id)),
  );

  // ==================================================
  // CHANGE SEARCH TYPE
  // ==================================================

  const handleTypeChange = (newType) => {
    setPage(1);

    setSelectedPostIds([]);
    setSelectedMemberIds([]);
    setSelectedCommentIds([]);

    setSearchParams({
      q: query,
      type: newType,
      page: "1",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==================================================
  // PAGE CHANGE
  // ==================================================

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) {
      return;
    }

    setPage(newPage);

    setSelectedPostIds([]);
    setSelectedMemberIds([]);
    setSelectedCommentIds([]);

    setSearchParams({
      q: query,
      type,
      page: String(newPage),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==================================================
  // RESET DELETE MODAL
  // ==================================================

  const resetDeleteModal = () => {
    setOpenDeleteAlert({
      open: false,
      type: "comment",
      data: null,
    });
  };

  // ==================================================
  // RESET POST DELETE MODAL
  // ==================================================

  const resetPostDeleteModal = () => {
    setOpenDeleteAlertPost({
      open: false,
      type: "post",
      data: null,
    });
  };

  // ==================================================
  // DELETE SINGLE MEMBER
  // ==================================================

  // const deleteMember = async (memberId) => {
  //   try {
  //     await axiosInstance.delete(API_PATHS.AUTH.DELETE_USER_BY_ID(memberId));

  //     toast.success("Member deleted successfully.");

  //     resetDeleteModal();

  //     setResults((prev) =>
  //       prev.filter((member) => String(member._id) !== String(memberId)),
  //     );

  //     setSelectedMemberIds((prev) =>
  //       prev.filter((id) => String(id) !== String(memberId)),
  //     );

  //     setTotalResults((prev) => Math.max(0, prev - 1));
  //   } catch (error) {
  //     console.error("Error deleting member:", error);

  //     toast.error(error?.response?.data?.message || "Failed to delete member.");
  //   }
  // };

  const deleteMember = async (memberId) => {
    try {
      setDeletingMember(true);

      await axiosInstance.delete(API_PATHS.AUTH.DELETE_USER_BY_ID(memberId));

      toast.success("Member deleted successfully.");

      resetDeleteModal();

      setResults((prev) =>
        prev.filter((member) => String(member._id) !== String(memberId)),
      );

      setSelectedMemberIds((prev) =>
        prev.filter((id) => String(id) !== String(memberId)),
      );

      setTotalResults((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error deleting member:", error);

      toast.error(error?.response?.data?.message || "Failed to delete member.");
    } finally {
      setDeletingMember(false);
    }
  };

  // ==================================================
  // BULK DELETE MEMBERS
  // ==================================================

  // const deleteSelectedMembers = async () => {
  //   if (selectedMemberIds.length === 0) {
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     const memberIdsToDelete = [...selectedMemberIds];

  //     const response = await axiosInstance.delete(
  //       API_PATHS.AUTH.DELETE_USERS_BULK,
  //       {
  //         data: {
  //           userIds: memberIdsToDelete,
  //         },
  //       },
  //     );

  //     const deletedCount =
  //       response?.data?.deletedCount ||
  //       response?.data?.count ||
  //       memberIdsToDelete.length;

  //     toast.success(
  //       response?.data?.message ||
  //         `${deletedCount} ${
  //           deletedCount === 1 ? "member" : "members"
  //         } deleted successfully.`,
  //     );

  //     setResults((prev) =>
  //       prev.filter(
  //         (member) =>
  //           !memberIdsToDelete.some((id) => String(id) === String(member._id)),
  //       ),
  //     );

  //     setTotalResults((prev) => Math.max(0, prev - deletedCount));

  //     setSelectedMemberIds([]);

  //     setOpenBulkDeleteMemberAlert(false);
  //   } catch (error) {
  //     console.error("Error deleting selected members:", error);

  //     toast.error(
  //       error?.response?.data?.message || "Failed to delete selected members.",
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const deleteSelectedMembers = async () => {
    if (selectedMemberIds.length === 0) {
      return;
    }

    try {
      setDeletingMembers(true);

      const memberIdsToDelete = [...selectedMemberIds];

      const response = await axiosInstance.delete(
        API_PATHS.AUTH.DELETE_USERS_BULK,
        {
          data: {
            userIds: memberIdsToDelete,
          },
        },
      );

      const deletedCount =
        response?.data?.deletedCount ||
        response?.data?.count ||
        memberIdsToDelete.length;

      toast.success(
        response?.data?.message ||
          `${deletedCount} ${
            deletedCount === 1 ? "member" : "members"
          } deleted successfully.`,
      );

      setResults((prev) =>
        prev.filter(
          (member) =>
            !memberIdsToDelete.some((id) => String(id) === String(member._id)),
        ),
      );

      setTotalResults((prev) => Math.max(0, prev - deletedCount));

      setSelectedMemberIds([]);

      setOpenBulkDeleteMemberAlert(false);
    } catch (error) {
      console.error("Error deleting selected members:", error);

      toast.error(
        error?.response?.data?.message || "Failed to delete selected members.",
      );
    } finally {
      setDeletingMembers(false);
    }
  };

  // ==================================================
  // DELETE SINGLE POST
  // ==================================================

  // const deletePost = async (postId) => {
  //   try {
  //     await axiosInstance.delete(API_PATHS.POSTS.DELETE(postId));

  //     toast.success("Blog post deleted successfully.");

  //     resetPostDeleteModal();

  //     setSelectedPostIds((prev) =>
  //       prev.filter((id) => String(id) !== String(postId)),
  //     );

  //     setResults((prev) =>
  //       prev.filter((post) => String(post._id) !== String(postId)),
  //     );

  //     setTotalResults((prev) => Math.max(0, prev - 1));
  //   } catch (error) {
  //     console.error("Error deleting blog post:", error);

  //     toast.error(
  //       error?.response?.data?.message || "Failed to delete blog post.",
  //     );
  //   }
  // };

  const deletePost = async (postId) => {
    try {
      setDeletingPost(true);

      await axiosInstance.delete(API_PATHS.POSTS.DELETE(postId));

      toast.success("Blog post deleted successfully.");

      resetPostDeleteModal();

      setSelectedPostIds((prev) =>
        prev.filter((id) => String(id) !== String(postId)),
      );

      setResults((prev) =>
        prev.filter((post) => String(post._id) !== String(postId)),
      );

      setTotalResults((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error deleting blog post:", error);

      toast.error(
        error?.response?.data?.message || "Failed to delete blog post.",
      );
    } finally {
      setDeletingPost(false);
    }
  };

  // ==================================================
  // BULK DELETE POSTS
  // ==================================================

  // const deleteSelectedPosts = async () => {
  //   if (selectedPostIds.length === 0) {
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     const postIdsToDelete = [...selectedPostIds];

  //     await axiosInstance.delete(API_PATHS.POSTS.DELETE_BULK, {
  //       data: {
  //         postIds: postIdsToDelete,
  //       },
  //     });

  //     const deletedCount = postIdsToDelete.length;

  //     toast.success(
  //       `${deletedCount} ${
  //         deletedCount === 1 ? "post" : "posts"
  //       } deleted successfully.`,
  //     );

  //     setResults((prev) =>
  //       prev.filter(
  //         (post) =>
  //           !postIdsToDelete.some((id) => String(id) === String(post._id)),
  //       ),
  //     );

  //     setTotalResults((prev) => Math.max(0, prev - deletedCount));

  //     setSelectedPostIds([]);

  //     setOpenBulkDeleteAlert(false);
  //   } catch (error) {
  //     console.error("Error deleting selected posts:", error);

  //     toast.error(
  //       error?.response?.data?.message || "Failed to delete selected posts.",
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const deleteSelectedPosts = async () => {
    if (selectedPostIds.length === 0) {
      return;
    }

    try {
      setDeletingPosts(true);

      const postIdsToDelete = [...selectedPostIds];

      await axiosInstance.delete(API_PATHS.POSTS.DELETE_BULK, {
        data: {
          postIds: postIdsToDelete,
        },
      });

      const deletedCount = postIdsToDelete.length;

      toast.success(
        `${deletedCount} ${
          deletedCount === 1 ? "post" : "posts"
        } deleted successfully.`,
      );

      setResults((prev) =>
        prev.filter(
          (post) =>
            !postIdsToDelete.some((id) => String(id) === String(post._id)),
        ),
      );

      setTotalResults((prev) => Math.max(0, prev - deletedCount));

      setSelectedPostIds([]);

      setOpenBulkDeleteAlert(false);
    } catch (error) {
      console.error("Error deleting selected posts:", error);

      toast.error(
        error?.response?.data?.message || "Failed to delete selected posts.",
      );
    } finally {
      setDeletingPosts(false);
    }
  };

  // ==================================================
  // DELETE COMMENT ONLY
  // ==================================================

  // const deleteCommentOnly = async (commentId) => {
  //   try {
  //     await axiosInstance.delete(
  //       API_PATHS.COMMENT.DELETE_PARENT_ONLY(commentId),
  //     );

  //     toast.success("Comment removed.");

  //     resetDeleteModal();

  //     setSelectedCommentIds((prev) =>
  //       prev.filter((id) => String(id) !== String(commentId)),
  //     );

  //     setResults((prev) =>
  //       prev.map((comment) =>
  //         String(comment._id) === String(commentId)
  //           ? {
  //               ...comment,
  //               isDeleted: true,
  //             }
  //           : comment,
  //       ),
  //     );

  //     await getSearchResults();
  //   } catch (error) {
  //     console.error(error);

  //     toast.error(
  //       error?.response?.data?.message || "Failed to remove comment.",
  //     );
  //   }
  // };

  const deleteCommentOnly = async (commentId) => {
    try {
      setDeletingComment(true);

      await axiosInstance.delete(
        API_PATHS.COMMENT.DELETE_PARENT_ONLY(commentId),
      );

      toast.success("Comment removed.");

      resetDeleteModal();

      setSelectedCommentIds((prev) =>
        prev.filter((id) => String(id) !== String(commentId)),
      );

      setResults((prev) =>
        prev.map((comment) =>
          String(comment._id) === String(commentId)
            ? {
                ...comment,
                isDeleted: true,
              }
            : comment,
        ),
      );

      await getSearchResults();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Failed to remove comment.",
      );
    } finally {
      setDeletingComment(false);
    }
  };

  // ==================================================
  // DELETE COMPLETE THREAD
  // ==================================================

  const deleteThread = async (commentId) => {
    try {
      await axiosInstance.delete(API_PATHS.COMMENT.DELETE_THREAD(commentId));

      toast.success("Discussion thread deleted.");

      resetDeleteModal();

      setSelectedCommentIds((prev) =>
        prev.filter((id) => String(id) !== String(commentId)),
      );

      setResults((prev) =>
        prev.filter((comment) => String(comment._id) !== String(commentId)),
      );

      setTotalResults((prev) => Math.max(0, prev - 1));

      await getSearchResults();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Failed to delete discussion thread.",
      );
    }
  };

  // ==================================================
  // BULK DELETE COMMENTS
  // ==================================================

  // const deleteSelectedComments = async () => {
  //   if (selectedCommentIds.length === 0) {
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     const commentIdsToDelete = [...selectedCommentIds];

  //     await axiosInstance.delete(API_PATHS.COMMENT.DELETE_BULK, {
  //       data: {
  //         commentIds: commentIdsToDelete,
  //       },
  //     });

  //     const deletedCount = commentIdsToDelete.length;

  //     toast.success(
  //       `${deletedCount} ${
  //         deletedCount === 1 ? "discussion thread" : "discussion threads"
  //       } deleted successfully.`,
  //     );

  //     setResults((prev) =>
  //       prev.filter(
  //         (comment) =>
  //           !commentIdsToDelete.some(
  //             (id) => String(id) === String(comment._id),
  //           ),
  //       ),
  //     );

  //     setTotalResults((prev) => Math.max(0, prev - deletedCount));

  //     setSelectedCommentIds([]);

  //     setOpenBulkDeleteCommentAlert(false);
  //   } catch (error) {
  //     console.error("Error deleting selected comments:", error);

  //     toast.error(
  //       error?.response?.data?.message || "Failed to delete selected comments.",
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const deleteSelectedComments = async () => {
    if (selectedCommentIds.length === 0) {
      return;
    }

    try {
      setDeletingComments(true);

      const commentIdsToDelete = [...selectedCommentIds];

      await axiosInstance.delete(API_PATHS.COMMENT.DELETE_BULK, {
        data: {
          commentIds: commentIdsToDelete,
        },
      });

      const deletedCount = commentIdsToDelete.length;

      toast.success(
        `${deletedCount} ${
          deletedCount === 1 ? "discussion thread" : "discussion threads"
        } deleted successfully.`,
      );

      setResults((prev) =>
        prev.filter(
          (comment) =>
            !commentIdsToDelete.some(
              (id) => String(id) === String(comment._id),
            ),
        ),
      );

      setTotalResults((prev) => Math.max(0, prev - deletedCount));

      setSelectedCommentIds([]);

      setOpenBulkDeleteCommentAlert(false);
    } catch (error) {
      console.error("Error deleting selected comments:", error);

      toast.error(
        error?.response?.data?.message || "Failed to delete selected comments.",
      );
    } finally {
      setDeletingComments(false);
    }
  };

  const resultLabel = totalResults === 1 ? "result" : "results";

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <DashboardLayout>
      <div className="w-full min-w-0 ">
        <div className="mx-auto w-full max-w-7xl min-w-0">
          {/* ==================================================
              PAGE HEADER
          ================================================== */}

          <section className="w-full min-w-0">
            <div>
              <div className="flex flex-col gap-3 rounded-sm border border-gray-200/90 bg-white p-2 sm:flex-row sm:items-end sm:justify-between">
                {/* Left: Title & Description */}
                <div className="min-w-0">
                  <h1 className="truncate text-xl font-semibold tracking-tight text-gray-800 sm:text-2xl">
                    Global Search Results
                  </h1>

                  <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                    Showing results for{" "}
                    <span className="font-semibold text-gray-700">
                      "{query || "—"}"
                    </span>
                  </p>
                </div>

                {/* Right: Search Info */}
                <div className="flex w-fit items-center gap-3 self-start rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 sm:self-auto">
                  {/* Search Type */}
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-sky-600 shadow-sm">
                      <ActiveIcon size={15} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                        Searching
                      </p>

                      <p className="truncate text-xs font-semibold capitalize text-gray-700">
                        {type}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-7 w-px shrink-0 bg-gray-200" />

                  {/* Results Count */}
                  <div className="shrink-0">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                      Found
                    </p>

                    <p className="text-xs font-semibold text-gray-700">
                      {totalResults}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ==================================================
                SEARCH TABS
            ================================================== */}

            <div className="mt-4 w-full min-w-0 ">
              <div className="flex w-full min-w-0 gap-0.5 overflow-x-auto scrollbar-none">
                {searchTypes.map((item) => {
                  const Icon = item.icon;
                  const isActive = type === item.key;

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleTypeChange(item.key)}
                      className={`
            relative
            flex
            shrink-0
            cursor-pointer
            items-center
            gap-1.5
            px-2.5
            py-1.5
            text-xs
            font-medium
            transition-colors
            duration-150
            sm:px-3
            ${isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-800"}
          `}
                    >
                      <Icon size={14} className="shrink-0" />

                      <span>{item.label}</span>

                      {isActive && (
                        <span
                          className="
                ml-1
                min-w-[20px]
                rounded-full
                bg-gray-900
                px-1.5
                py-0.5
                text-center
                text-[10px]
                font-semibold
                leading-none
                text-white
              "
                        >
                          {totalResults}
                        </span>
                      )}

                      {/* Active indicator */}
                      {isActive && (
                        <div
                          className="
                absolute
                bottom-0
                left-1/2
                h-px
                w-[70%]
                -translate-x-1/2
                bg-gray-900
              "
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ==================================================
              RESULTS SECTION
          ================================================== */}

          <section className="mt-5 w-full min-w-0 overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
            {/* ==================================================
                RESULT HEADER
            ================================================== */}

            <div className="border-b border-gray-100 px-3 py-3.5 sm:px-5 sm:py-4">
              <div className="flex min-w-0 items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <ActiveIcon size={17} className="shrink-0 text-sky-500" />

                  <h2 className="truncate text-sm font-semibold text-gray-800 sm:text-base">
                    {type === "posts"
                      ? "Blog Posts"
                      : type === "members"
                        ? "Members"
                        : "Comments"}
                  </h2>
                </div>

                {!loading && (
                  <p className="shrink-0 text-xs text-gray-400 sm:text-sm">
                    {totalResults} {resultLabel}
                  </p>
                )}
              </div>
            </div>

            {/* ==================================================
                POST SELECTION TOOLBAR
            ================================================== */}

            {type === "posts" && !loading && results.length > 0 && (
              <div className="border-b border-gray-100 bg-gray-50/50 px-3 py-2.5 sm:px-5">
                <div className="flex min-w-0 items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleSelectAllPosts}
                    className="flex min-w-0 items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-800"
                  >
                    <span
                      className={`
                          flex
                          h-4
                          w-4
                          shrink-0
                          items-center
                          justify-center
                          rounded
                          border
                          transition
                          ${
                            allCurrentPagePostsSelected
                              ? "border-sky-600 bg-sky-600 text-white"
                              : someCurrentPagePostsSelected
                                ? "border-sky-500 bg-sky-50 text-sky-600"
                                : "border-gray-300 bg-white"
                          }
                        `}
                    >
                      {allCurrentPagePostsSelected ? (
                        <LuCheck size={11} strokeWidth={3} />
                      ) : someCurrentPagePostsSelected ? (
                        <span className="h-1.5 w-1.5 rounded-sm bg-sky-500" />
                      ) : null}
                    </span>

                    <span className="whitespace-nowrap">
                      {allCurrentPagePostsSelected
                        ? "Unselect All"
                        : "Select All"}
                    </span>
                  </button>

                  {selectedPostIds.length > 0 && (
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="hidden text-xs font-medium text-gray-500 sm:inline">
                        {selectedPostIds.length} selected
                      </span>

                      <button
                        type="button"
                        onClick={() => setOpenBulkDeleteAlert(true)}
                        className="
                            flex
                            shrink-0
                            items-center
                            gap-1.5
                            rounded-lg
                            bg-red-50
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-red-600
                            transition
                            hover:bg-red-100
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            sm:px-3.5
                          "
                        disabled={loading}
                      >
                        <LuTrash2 size={14} />

                        <span>
                          Delete
                          <span className="hidden sm:inline"> Selected</span>
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                {selectedPostIds.length > 0 && (
                  <p className="mt-1 text-[11px] font-medium text-gray-400 sm:hidden">
                    {selectedPostIds.length}{" "}
                    {selectedPostIds.length === 1 ? "post" : "posts"} selected
                  </p>
                )}
              </div>
            )}

            {/* ==================================================
                MEMBER SELECTION TOOLBAR
            ================================================== */}

            {type === "members" && !loading && selectableMembers.length > 0 && (
              <div className="border-b border-gray-100 bg-gray-50/50 px-3 py-2.5 sm:px-5">
                <div className="flex min-w-0 items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleSelectAllMembers}
                    className="flex min-w-0 items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-800"
                  >
                    <span
                      className={`
                          flex
                          h-4
                          w-4
                          shrink-0
                          items-center
                          justify-center
                          rounded
                          border
                          transition
                          ${
                            allCurrentPageMembersSelected
                              ? "border-sky-600 bg-sky-600 text-white"
                              : someCurrentPageMembersSelected
                                ? "border-sky-500 bg-sky-50 text-sky-600"
                                : "border-gray-300 bg-white"
                          }
                        `}
                    >
                      {allCurrentPageMembersSelected ? (
                        <LuCheck size={11} strokeWidth={3} />
                      ) : someCurrentPageMembersSelected ? (
                        <span className="h-1.5 w-1.5 rounded-sm bg-sky-500" />
                      ) : null}
                    </span>

                    <span className="whitespace-nowrap">
                      {allCurrentPageMembersSelected
                        ? "Unselect All"
                        : "Select All"}
                    </span>
                  </button>

                  {selectedMemberIds.length > 0 && (
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="hidden text-xs font-medium text-gray-500 sm:inline">
                        {selectedMemberIds.length} selected
                      </span>

                      <button
                        type="button"
                        onClick={() => setOpenBulkDeleteMemberAlert(true)}
                        className="
                            flex
                            shrink-0
                            items-center
                            gap-1.5
                            rounded-lg
                            bg-red-50
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-red-600
                            transition
                            hover:bg-red-100
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            sm:px-3.5
                          "
                        disabled={loading}
                      >
                        <LuTrash2 size={14} />

                        <span>
                          Delete
                          <span className="hidden sm:inline"> Selected</span>
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                {selectedMemberIds.length > 0 && (
                  <p className="mt-1 text-[11px] font-medium text-gray-400 sm:hidden">
                    {selectedMemberIds.length}{" "}
                    {selectedMemberIds.length === 1 ? "member" : "members"}{" "}
                    selected
                  </p>
                )}
              </div>
            )}

            {/* ==================================================
                COMMENT SELECTION TOOLBAR
            ================================================== */}

            {type === "comments" && !loading && results.length > 0 && (
              <div className="border-b border-gray-100 bg-gray-50/50 px-3 py-2.5 sm:px-5">
                <div className="flex min-w-0 items-center justify-between gap-3">
                  {/* Select All Comments */}

                  <button
                    type="button"
                    onClick={handleSelectAllComments}
                    className="flex min-w-0 items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-800"
                  >
                    <span
                      className={`
                          flex
                          h-4
                          w-4
                          shrink-0
                          items-center
                          justify-center
                          rounded
                          border
                          transition
                          ${
                            allCurrentPageCommentsSelected
                              ? "border-sky-600 bg-sky-600 text-white"
                              : someCurrentPageCommentsSelected
                                ? "border-sky-500 bg-sky-50 text-sky-600"
                                : "border-gray-300 bg-white"
                          }
                        `}
                    >
                      {allCurrentPageCommentsSelected ? (
                        <LuCheck size={11} strokeWidth={3} />
                      ) : someCurrentPageCommentsSelected ? (
                        <span className="h-1.5 w-1.5 rounded-sm bg-sky-500" />
                      ) : null}
                    </span>

                    <span className="whitespace-nowrap">
                      {allCurrentPageCommentsSelected
                        ? "Unselect All"
                        : "Select All"}
                    </span>
                  </button>

                  {/* Selected count / delete */}

                  {selectedCommentIds.length > 0 && (
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="hidden text-xs font-medium text-gray-500 sm:inline">
                        {selectedCommentIds.length} selected
                      </span>

                      <button
                        type="button"
                        onClick={() => setOpenBulkDeleteCommentAlert(true)}
                        className="
                            flex
                            shrink-0
                            items-center
                            gap-1.5
                            rounded-lg
                            bg-red-50
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-red-600
                            transition
                            hover:bg-red-100
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            sm:px-3.5
                          "
                        disabled={loading}
                      >
                        <LuTrash2 size={14} />

                        <span>
                          Delete
                          <span className="hidden sm:inline"> Selected</span>
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile selected count */}

                {selectedCommentIds.length > 0 && (
                  <p className="mt-1 text-[11px] font-medium text-gray-400 sm:hidden">
                    {selectedCommentIds.length}{" "}
                    {selectedCommentIds.length === 1 ? "comment" : "comments"}{" "}
                    selected
                  </p>
                )}
              </div>
            )}

            {/* ==================================================
                LOADING
            ================================================== */}

            {loading && (
              <div className="flex min-h-[280px] flex-col items-center justify-center px-5 py-16">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-50">
                  <LuLoaderCircle
                    size={21}
                    className="animate-spin text-sky-500"
                  />
                </div>

                <p className="mt-4 text-sm font-medium text-gray-600">
                  Searching...
                </p>

                <p className="mt-1 text-center text-xs text-gray-400">
                  Finding matching {type}.
                </p>
              </div>
            )}

            {/* ==================================================
                EMPTY STATE
            ================================================== */}

            {!loading && results.length === 0 && (
              <div className="flex min-h-[280px] flex-col items-center justify-center px-5 py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-300">
                  <LuSearch size={24} />
                </div>

                <h3 className="mt-5 text-base font-semibold text-gray-700">
                  No {type} found
                </h3>

                <p className="mt-2 max-w-sm break-words text-sm leading-6 text-gray-400">
                  We couldn't find any {type} matching{" "}
                  <span className="font-medium text-gray-600">"{query}"</span>.
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Try a different keyword or search phrase.
                </p>
              </div>
            )}

            {/* ==================================================
                RESULTS
            ================================================== */}

            {!loading && results.length > 0 && (
              <div className="w-full min-w-0">
                {/* ==================================================
                      POSTS
                  ================================================== */}

                {type === "posts" && (
                  <div className="w-full min-w-0 divide-y divide-gray-100">
                    {results.map((post) => (
                      <div
                        key={post._id}
                        className="
                            w-full
                            min-w-0
                            p-1
                            transition
                            hover:bg-gray-50/70
                          "
                      >
                        <div className="w-full min-w-0">
                          <BlogPostSummaryCard
                            title={post.title}
                            imgUrl={post.coverImageUrl}
                            updatedOn={
                              post.updatedAt
                                ? moment(post.updatedAt).format("Do MMM YYYY")
                                : "-"
                            }
                            authorName={post.author.name}
                            tags={post.tags || []}
                            likes={post.likes || 0}
                            views={post.views || 0}
                            selectable={true}
                            isSelected={selectedPostIds.some(
                              (id) => String(id) === String(post._id),
                            )}
                            onSelect={() => handleSelectPost(post._id)}
                            onClick={() => navigate(`/admin/edit/${post.slug}`)}
                            onDelete={() =>
                              setOpenDeleteAlertPost({
                                open: true,
                                type: "post",
                                data: post._id,
                              })
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ==================================================
                      MEMBERS
                  ================================================== */}

                {type === "members" && (
                  <div className="w-full min-w-0 divide-y divide-gray-100">
                    {results.map((member) => (
                      <div
                        key={member._id}
                        className="
                            w-full
                            min-w-0
                            p-1
                            transition
                            hover:bg-gray-50/70
                          "
                      >
                        <div className="w-full min-w-0">
                          <MemberInfoCard
                            member={member}
                            selected={selectedMemberIds.some(
                              (id) => String(id) === String(member._id),
                            )}
                            onSelect={handleSelectMember}
                            onView={() =>
                              setOpenViewModal({
                                open: true,
                                data: member,
                              })
                            }
                            onEdit={() =>
                              setOpenEditModal({
                                open: true,
                                data: member,
                              })
                            }
                            onDelete={() =>
                              setOpenDeleteAlert({
                                open: true,
                                type: "member",
                                data: member._id,
                              })
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ==================================================
                      COMMENTS
                  ================================================== */}

                {type === "comments" && (
                  <div className="w-full min-w-0 divide-y divide-gray-100">
                    {results.map((comment) => {
                      const isSelected = selectedCommentIds.some(
                        (id) => String(id) === String(comment._id),
                      );

                      return (
                        <div
                          key={comment._id}
                          className="
            flex
            w-full
            min-w-0
            items-start
            gap-2
            p-1
            transition
            hover:bg-gray-50/70
            sm:gap-2.5
          "
                        >
                          {/* ==================================================
              COMMENT CHECKBOX
          ================================================== */}

                          <div className="flex w-6 shrink-0 justify-center pt-3">
                            <button
                              type="button"
                              onClick={() => handleSelectComment(comment._id)}
                              aria-label={
                                isSelected
                                  ? "Unselect comment"
                                  : "Select comment"
                              }
                              className={`
                flex
                h-4
                w-4
                shrink-0
                items-center
                justify-center
                border
                rounded
                
                transition-all
                duration-150
                ${
                  isSelected
                    ? "border-sky-600 bg-sky-600 text-white"
                    : "border-gray-300 bg-white hover:border-sky-400"
                }
              `}
                            >
                              {isSelected && (
                                <LuCheck size={11} strokeWidth={3} />
                              )}
                            </button>
                          </div>

                          {/* ==================================================
              COMMENT CARD
          ================================================== */}

                          <div className="min-w-0 flex-1 overflow-hidden">
                            <CommentInfoCard
                              commentId={comment._id}
                              authorName={
                                comment.author?.name || "Deleted User"
                              }
                              authorPhoto={comment.author?.profileImageUrl}
                              isDeleted={comment.isDeleted}
                              deletedBy={comment.deletedBy}
                              content={comment.content}
                              updatedOn={
                                comment.updatedAt
                                  ? moment(comment.updatedAt).format(
                                      "Do MMM YYYY",
                                    )
                                  : "-"
                              }
                              post={comment.post}
                              replies={comment.replies || []}
                              getAllComments={getSearchResults}
                              onDeleteComment={(commentId) =>
                                setOpenDeleteAlert({
                                  open: true,
                                  type: "comment",
                                  data: commentId,
                                })
                              }
                              onDeleteThread={(commentId) =>
                                setOpenDeleteAlert({
                                  open: true,
                                  type: "thread",
                                  data: commentId,
                                })
                              }
                              authorId={comment.author?._id}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* ==================================================
                      PAGINATION
                  ================================================== */}

                {totalPages > 1 && (
                  <div className="w-full min-w-0 overflow-x-auto border-t border-gray-100 px-3 py-4 sm:px-5 sm:py-5">
                    <div className="flex min-w-max justify-center">
                      <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* ==========================================================
          DELETE MEMBER / COMMENT / THREAD
      ========================================================== */}

      <Modal
        isOpen={openDeleteAlert.open}
        onClose={resetDeleteModal}
        title={
          openDeleteAlert.type === "member"
            ? "Delete Member"
            : openDeleteAlert.type === "comment"
              ? "Remove Comment"
              : "Delete Discussion Thread"
        }
      >
        <div className="w-full px-1 sm:px-0">
          <DeleteAlertContent
            content={
              openDeleteAlert.type === "member"
                ? "Are you sure you want to delete this member?"
                : openDeleteAlert.type === "comment"
                  ? "Only this comment will be removed. Replies will remain visible beneath a moderator notice."
                  : "This will permanently delete this comment and every reply beneath it. This action cannot be undone."
            }
            type={openDeleteAlert.type}
            danger={openDeleteAlert.type === "thread"}
            loading={
              openDeleteAlert.type === "member"
                ? deletingMember
                : deletingComment
            }
            onDelete={() => {
              if (openDeleteAlert.type === "member") {
                deleteMember(openDeleteAlert.data);
              } else if (openDeleteAlert.type === "comment") {
                deleteCommentOnly(openDeleteAlert.data);
              } else {
                deleteThread(openDeleteAlert.data);
              }
            }}
          />
        </div>
      </Modal>

      {/* ==========================================================
          DELETE SINGLE POST
      ========================================================== */}

      <Modal
        isOpen={openDeleteAlertPost.open}
        onClose={resetPostDeleteModal}
        title="Delete Blog Post"
      >
        <div className="w-full px-1 sm:px-0">
          <DeleteAlertContent
            type="post"
            loading={deletingPost}
            onDelete={() => deletePost(openDeleteAlertPost.data)}
            content="Are you sure you want to permanently delete this blog post? This action cannot be undone."
          />
        </div>
      </Modal>

      {/* ==========================================================
          DELETE SELECTED POSTS
      ========================================================== */}

      <Modal
        isOpen={openBulkDeleteAlert}
        onClose={() => setOpenBulkDeleteAlert(false)}
        title="Delete Selected Posts"
      >
        <div className="w-full px-1 sm:px-0">
          <DeleteAlertContent
            type="post"
            danger
            loading={deletingPosts}
            onDelete={deleteSelectedPosts}
            content={`Are you sure you want to permanently delete ${
              selectedPostIds.length
            } ${
              selectedPostIds.length === 1
                ? "selected blog post"
                : "selected blog posts"
            }? This action cannot be undone.`}
          />
        </div>
      </Modal>

      {/* ==========================================================
          DELETE SELECTED MEMBERS
      ========================================================== */}

      <Modal
        isOpen={openBulkDeleteMemberAlert}
        onClose={() => setOpenBulkDeleteMemberAlert(false)}
        title="Delete Selected Members"
      >
        <div className="w-full  px-1 sm:px-0">
          <DeleteAlertContent
            type="member"
            danger
            loading={deletingMembers}
            onDelete={deleteSelectedMembers}
            content={`Are you sure you want to permanently delete ${
              selectedMemberIds.length
            } ${
              selectedMemberIds.length === 1
                ? "selected member"
                : "selected members"
            }? This action cannot be undone.`}
          />
        </div>
      </Modal>

      {/* ==========================================================
          DELETE SELECTED COMMENTS
      ========================================================== */}

      <Modal
        isOpen={openBulkDeleteCommentAlert}
        onClose={() => setOpenBulkDeleteCommentAlert(false)}
        title="Delete Selected Comments"
      >
        <div className="w-full px-1 sm:px-0">
          <DeleteAlertContent
            type="comment"
            danger
            loading={deletingComments}
            onDelete={deleteSelectedComments}
            content={`Are you sure you want to permanently delete ${
              selectedCommentIds.length
            } ${
              selectedCommentIds.length === 1
                ? "selected discussion thread"
                : "selected discussion threads"
            }? This will remove the selected comments and their replies. This action cannot be undone.`}
          />
        </div>
      </Modal>

      {/* ==========================================================
          VIEW MEMBER
      ========================================================== */}

      <Modal
        isOpen={openViewModal.open}
        onClose={() =>
          setOpenViewModal({
            open: false,
            data: null,
          })
        }
        title="Member Details"
      >
        {openViewModal.data && (
          <div className="w-full max-w-lg px-1 sm:px-3">
            <div className="flex flex-col items-center border-b border-gray-100 pb-6 text-center">
              <div className="relative">
                <img
                  src={openViewModal.data.profileImageUrl}
                  alt={openViewModal.data.name}
                  className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-md sm:h-24 sm:w-24"
                />

                <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green-500">
                  <LuShieldCheck size={12} className="text-white" />
                </div>
              </div>

              <h3 className="mt-4 max-w-full break-words text-lg font-semibold text-gray-800">
                {openViewModal.data.name}
              </h3>

              <p className="mt-1 max-w-full break-all text-sm text-gray-400">
                {openViewModal.data.email}
              </p>

              <span
                className={`
                  mt-3
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  capitalize
                  ${
                    openViewModal.data.role === "admin"
                      ? "bg-red-50 text-red-600"
                      : "bg-green-50 text-green-600"
                  }
                `}
              >
                {openViewModal.data.role}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="min-w-0 rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 sm:p-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <LuMail size={15} />

                  <p className="text-xs font-medium">Email</p>
                </div>

                <p className="mt-2 break-all text-sm font-medium text-gray-700">
                  {openViewModal.data.email}
                </p>
              </div>

              <div className="min-w-0 rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 sm:p-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <LuCalendarDays size={15} />

                  <p className="text-xs font-medium">Joined</p>
                </div>

                <p className="mt-2 text-sm font-medium text-gray-700">
                  {openViewModal.data.createdAt
                    ? moment(openViewModal.data.createdAt).format("Do MMM YYYY")
                    : "-"}
                </p>
              </div>

              <div className="min-w-0 rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 sm:p-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <LuCalendarDays size={15} />

                  <p className="text-xs font-medium">Last Updated</p>
                </div>

                <p className="mt-2 text-sm font-medium text-gray-700">
                  {openViewModal.data.updatedAt
                    ? moment(openViewModal.data.updatedAt).format("Do MMM YYYY")
                    : "-"}
                </p>
              </div>

              <div className="min-w-0 rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 sm:col-span-2 sm:p-4">
                <p className="text-xs font-medium text-gray-400">User ID</p>

                <p className="mt-2 break-all font-mono text-[11px] leading-5 text-gray-600 sm:text-xs">
                  {openViewModal.data._id}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* ==========================================================
          EDIT MEMBER
      ========================================================== */}

      <Modal
        isOpen={openEditModal.open}
        onClose={() =>
          setOpenEditModal({
            open: false,
            data: null,
          })
        }
        title="Edit Member"
      >
        {openEditModal.data && (
          <div className="w-full max-w-lg">
            <EditMemberModal
              member={openEditModal.data}
              onClose={() =>
                setOpenEditModal({
                  open: false,
                  data: null,
                })
              }
              onSuccess={getSearchResults}
            />
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default AdminSearchResults;
