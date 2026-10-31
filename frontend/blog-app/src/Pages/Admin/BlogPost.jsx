import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";

import {
  LuGalleryVerticalEnd,
  LuPlus,
  LuTrash2,
  LuCheck,
} from "react-icons/lu";

import { useEffect, useState } from "react";
import Tabs from "../../components/Tabs";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import BlogPostSummaryCard from "../../components/Cards/BlogPostSummaryCard";
import BlogPostSkeleton from "../../components/Loader/BlogPostSkeleton";
import DeleteAlertContent from "../../components/DeleteAlertContent";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination";

const BlogPost = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchedPostId = searchParams.get("post");
  const statusParam = searchParams.get("status");

  // --------------------------------------------------
  // FILTER / POSTS
  // --------------------------------------------------

  const [tabs, setTabs] = useState([]);

  const [filterStatus, setFilterStatus] = useState(
    statusParam === "draft"
      ? "Draft"
      : statusParam === "published"
        ? "Published"
        : "All",
  );

  const [blogPostList, setBlogPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [blogPostDeleteLoading, setBlogPostDeleteLoading] = useState(false);

  // --------------------------------------------------
  // SORTING
  // --------------------------------------------------

  const [sortBy, setSortBy] = useState("updated");

  // --------------------------------------------------
  // SEARCH
  // --------------------------------------------------

  const [searchResult, setSearchResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  // --------------------------------------------------
  // DELETE MODAL
  // --------------------------------------------------

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
    type: "single",
  });

  // --------------------------------------------------
  // BULK SELECTION
  // --------------------------------------------------

  const [selectedPostIds, setSelectedPostIds] = useState([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  // --------------------------------------------------
  // GET SEARCHED POST
  // --------------------------------------------------

  const getSearchedPost = async (postId) => {
    try {
      setSearchLoading(true);

      const response = await axiosInstance.get(
        API_PATHS.POSTS.GET_BY_ID_ADMIN(postId),
      );

      setSearchResult(response.data);
    } catch (error) {
      console.error("Error fetching searched post:", error);

      toast.error(error?.response?.data?.message || "Post could not be found.");

      setSearchParams({});
      setSearchResult(null);
    } finally {
      setSearchLoading(false);
    }
  };

  // --------------------------------------------------
  // GET ALL POSTS
  // --------------------------------------------------

  const getAllPosts = async (pageNumber = 1) => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.get(API_PATHS.POSTS.GET_ALL, {
        params: {
          status: filterStatus.toLowerCase(),
          page: pageNumber,
          limit: 10,
          sortBy,
        },
      });

      const { posts, totalPages, counts } = response.data;

      setBlogPostList(posts);
      setTotalPages(totalPages);

      const statusSummary = counts || {};

      const statusArray = [
        {
          label: "All",
          count: statusSummary.all || 0,
        },
        {
          label: "Published",
          count: statusSummary.published || 0,
        },
        {
          label: "Draft",
          count: statusSummary.draft || 0,
        },
      ];

      setTabs(statusArray);

      setSelectedPostIds((previous) =>
        previous.filter((id) => posts.some((post) => post._id === id)),
      );
    } catch (error) {
      console.error("Error fetching data:", error);

      toast.error(
        error?.response?.data?.message || "Failed to load blog posts.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // --------------------------------------------------
  // SELECT / DESELECT INDIVIDUAL POST
  // --------------------------------------------------

  const handleSelectPost = (postId) => {
    setSelectedPostIds((previous) => {
      if (previous.includes(postId)) {
        return previous.filter((id) => id !== postId);
      }

      return [...previous, postId];
    });
  };

  // --------------------------------------------------
  // SELECT ALL POSTS ON CURRENT PAGE
  // --------------------------------------------------

  const handleSelectAll = () => {
    const currentPageIds = blogPostList.map((post) => post._id);

    setSelectedPostIds((previous) => {
      const allSelected = currentPageIds.every((id) => previous.includes(id));

      if (allSelected) {
        return previous.filter((id) => !currentPageIds.includes(id));
      }

      return [
        ...previous,
        ...currentPageIds.filter((id) => !previous.includes(id)),
      ];
    });
  };

  // --------------------------------------------------
  // CHECK IF ALL CURRENT PAGE POSTS ARE SELECTED
  // --------------------------------------------------

  const allCurrentPageSelected =
    blogPostList.length > 0 &&
    blogPostList.every((post) => selectedPostIds.includes(post._id));

  // --------------------------------------------------
  // INDIVIDUAL DELETE
  // --------------------------------------------------

  const deletePost = async (postId) => {
    try {
      setBlogPostDeleteLoading(true);
      await axiosInstance.delete(API_PATHS.POSTS.DELETE(postId));

      toast.success("Blog Post Deleted Successfully");

      setOpenDeleteAlert({
        open: false,
        data: null,
        type: "single",
      });

      setSelectedPostIds((previous) => previous.filter((id) => id !== postId));

      if (searchedPostId === postId) {
        setSearchResult(null);
        setSearchParams({});
      }

      getAllPosts(page);
    } catch (error) {
      console.error("Error deleting blog post:", error);

      toast.error(
        error?.response?.data?.message || "Failed to delete blog post",
      );
    } finally {
      setBlogPostDeleteLoading(false);
    }
  };

  // --------------------------------------------------
  // BULK DELETE
  // --------------------------------------------------

  const deleteSelectedPosts = async () => {
    setBlogPostDeleteLoading(true);
    if (selectedPostIds.length === 0) {
      toast.error("Please select at least one blog post.");
      return;
    }

    try {
      setIsBulkDeleting(true);

      await axiosInstance.delete(API_PATHS.POSTS.DELETE_BULK, {
        data: {
          postIds: selectedPostIds,
        },
      });

      toast.success(
        `${selectedPostIds.length} blog post${
          selectedPostIds.length > 1 ? "s" : ""
        } deleted successfully`,
      );

      setSelectedPostIds([]);

      setOpenDeleteAlert({
        open: false,
        data: null,
        type: "single",
      });

      getAllPosts(page);
    } catch (error) {
      console.error("Error bulk deleting blog posts:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete selected blog posts",
      );
    } finally {
      setIsBulkDeleting(false);
      setBlogPostDeleteLoading(false);
    }
  };

  // --------------------------------------------------
  // SYNC STATUS FROM QUERY PARAMETER
  // --------------------------------------------------

  useEffect(() => {
    if (statusParam === "draft") {
      setFilterStatus("Draft");
    } else if (statusParam === "published") {
      setFilterStatus("Published");
    } else {
      setFilterStatus("All");
    }
  }, [statusParam]);

  // --------------------------------------------------
  // LOAD ALL POSTS
  // --------------------------------------------------

  useEffect(() => {
    setPage(1);
    setSelectedPostIds([]);

    getAllPosts(1);
  }, [filterStatus, sortBy]);

  // --------------------------------------------------
  // LOAD SEARCHED POST
  // --------------------------------------------------

  useEffect(() => {
    if (searchedPostId) {
      getSearchedPost(searchedPostId);
    } else {
      setSearchResult(null);
    }
  }, [searchedPostId]);

  // --------------------------------------------------
  // PAGE CHANGE
  // --------------------------------------------------

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSelectedPostIds([]);

    getAllPosts(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <DashboardLayout>
      <div>
        {/* ==================================================
            HEADER
        ================================================== */}

        <div>
          <div className="rounded-sm bg-white border border-gray-200/90 p-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h2 className=" text-xl font-semibold tracking-tight text-gray-800 sm:text-2xl">
                Blog Posts
              </h2>

              <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                Create, manage, edit and organize your articles and drafts.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/create")}
              className="
                group
                inline-flex
                w-fit
                cursor-pointer
                items-center
                gap-1.5
                self-start
                text-sm
                font-medium
                text-black
                transition-colors
                duration-200
                hover:text-gray-700
                sm:self-auto
              "
            >
              <span
                className="
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-md
                  bg-gray-50
                  transition-colors
                  duration-200
                  group-hover:bg-sky-100
                "
              >
                <LuPlus className="text-[14px]" />
              </span>

              <span>Create Post</span>
            </button>
          </div>
        </div>

        {/* ==================================================
            SEARCH RESULT
        ================================================== */}

        {searchLoading ? (
          <div className="mt-4">
            <div className="mb-3 h-[72px] animate-pulse rounded-xl border border-gray-200 bg-gray-50" />
            <BlogPostSkeleton count={1} />
          </div>
        ) : searchResult ? (
          <div className="mt-4">
            <div
              className="
                mb-3
                flex
                flex-col
                gap-2
                rounded-xl
                border
                border-sky-100
                bg-sky-50/70
                px-4
                py-3
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-sky-600">
                  Search Result
                </p>

                <p className="mt-0.5 text-xs text-gray-600">
                  Showing the blog post found from the global search.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSearchResult(null);
                  setSearchParams({});
                }}
                className="
                  self-start
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-gray-600
                  transition
                  hover:bg-gray-50
                  sm:self-auto
                "
              >
                Clear Search
              </button>
            </div>

            <div
              className="
                rounded-xl
                border
                border-sky-200
                bg-white
                p-2.5
                shadow-sm
                ring-1
                ring-sky-100
                sm:p-3
              "
            >
              {console.log(searchResult.post.author)}
              <BlogPostSummaryCard
                title={searchResult.post.title}
                imgUrl={searchResult.post.coverImageUrl}
                updatedOn={
                  searchResult.post.updatedAt
                    ? moment(searchResult.post.updatedAt).format("Do MMM YYYY")
                    : "-"
                }
                authorName={
                  searchResult.post.author?.name ||
                  searchResult.post.authorName ||
                  "Deleted User"
                }
                tags={searchResult.post.tags}
                likes={searchResult.post.likes}
                views={searchResult.post.views}
                commentCount={searchResult.post.commentCount}
                selectable={false}
                onClick={() =>
                  navigate(`/admin/edit/${searchResult.post.slug}`)
                }
                onDelete={() =>
                  setOpenDeleteAlert({
                    open: true,
                    data: searchResult.post._id,
                    type: "single",
                  })
                }
              />
            </div>
          </div>
        ) : (
          <>
            {/* ==================================================
                FILTER / SORT
            ================================================== */}

            <div
              className="
                mt-2
                rounded-sm
                border
                border-gray-200/70
                bg-white
                p-2
                
                sm:p-2
              "
            >
              <div
                className="
                  mb-3
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 sm:text-base">
                    Filter Posts
                  </h3>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Switch between published posts and drafts.
                  </p>
                </div>

                <div
                  className="
                    flex
                    w-full
                    items-center
                    rounded-sm
                    border
                    border-gray-200/70
                    bg-white
                   
                    transition-all
                    focus-within:border-gray-300
                    focus-within:ring-2
                    focus-within:ring-gray-50
                    sm:w-auto
                  "
                >
                  <div
                    className="
                      flex
                      shrink-0
                      items-center
                      border-r
                      border-gray-100
                      px-2.5
                    "
                  >
                    <span
                      className="
                        text-[9px]
                        font-medium
                        uppercase
                        tracking-wide
                        text-gray-400
                      "
                    >
                      Sort
                    </span>
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="
                      min-w-0
                      flex-1
                      cursor-pointer
                      appearance-none
                      bg-transparent
                      px-3
                      py-2
                      pr-7
                      text-xs
                      font-medium
                      text-gray-700
                      outline-none
                      sm:w-[165px]
                      sm:flex-none
                    "
                  >
                    <option value="updated">Recently Updated</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="views">Most Viewed</option>
                    <option value="likes">Most Liked</option>
                    <option value="title_asc">Title A–Z</option>
                    <option value="title_desc">Title Z–A</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Tabs
                  loading={isLoading}
                  tabs={tabs}
                  activeTab={filterStatus}
                  setActiveTab={setFilterStatus}
                />
              </div>
            </div>

            {/* ==================================================
                BLOG LIST
            ================================================== */}

            <div
              className="
                mt-2
                rounded-sm
                border
                border-gray-200/90
                bg-white
                p-2
              
                sm:p-2
              "
            >
              {/* List Header */}

              <div
                className="
                  mb-4
                  flex
                  flex-col
                  gap-3
                  border-b
                  border-gray-100
                  pb-3
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 sm:text-base">
                    Blog Posts
                  </h3>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Recently created and updated articles.
                  </p>
                </div>

                {/* Select All */}

                {!isLoading && blogPostList.length > 0 && (
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="
                      flex
                      cursor-pointer
                      items-center
                      gap-1.5
                      self-start
                      rounded-sm
                      border
                      border-gray-200
                      bg-white
                      px-3
                      py-2
                      text-xs
                      font-medium
                      text-gray-600
                      transition
                      hover:border-gray-200
                      hover:bg-gray-50
                      hover:text-gray-700
                    "
                  >
                    <span
                      className={`
                        flex
                        h-4
                        w-4
                        items-center
                        justify-center
                        rounded
                        border
                        ${
                          allCurrentPageSelected
                            ? "border-sky-600 bg-sky-600 text-white"
                            : "border-gray-300 bg-white"
                        }
                      `}
                    >
                      {allCurrentPageSelected && (
                        <LuCheck className="text-[7px]" />
                      )}
                    </span>

                    {allCurrentPageSelected ? "Deselect All" : "Select All"}
                  </button>
                )}
              </div>

              {/* ==================================================
                  LOADING / SKELETON
              ================================================== */}

              {isLoading ? (
                <BlogPostSkeleton count={10} />
              ) : blogPostList.length === 0 ? (
                /* ==================================================
                    EMPTY STATE
                ================================================== */

                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-sm
                      bg-sky-50
                    "
                  >
                    <LuGalleryVerticalEnd className="text-2xl text-sky-600" />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-gray-700">
                    No Blog Posts Found
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Start by creating your first blog post.
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate("/admin/create")}
                    className="
                      mt-4
                      flex
                      cursor-pointer
                      items-center
                      gap-1.5
                      rounded-lg
                      bg-sky-600
                      px-4
                      py-2
                      text-xs
                      font-medium
                      text-white
                      transition
                      hover:bg-sky-700
                    "
                  >
                    <LuPlus className="text-sm" />
                    Create First Post
                  </button>
                </div>
              ) : (
                <>
                  {/* ==================================================
                      BULK ACTION BAR
                  ================================================== */}

                  {selectedPostIds.length > 0 && (
                    <div
                      className="
                        mb-3
                        flex
                        flex-col
                        gap-2
                        rounded-sm
                        border
                        border-rose-100
                        bg-rose-50/70
                        px-3
                        py-2.5
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                      "
                    >
                      <div>
                        <p className="text-xs font-semibold text-rose-700">
                          {selectedPostIds.length} post
                          {selectedPostIds.length > 1 ? "s" : ""} selected
                        </p>

                        <p className="mt-0.5 text-[10px] text-rose-500">
                          Selected posts will be permanently deleted.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setOpenDeleteAlert({
                            open: true,
                            data: selectedPostIds,
                            type: "bulk",
                          })
                        }
                        disabled={isBulkDeleting}
                        className="
                          flex
                          w-full
                          cursor-pointer
                          items-center
                          justify-center
                          gap-1.5
                          rounded-lg
                          bg-rose-600
                          px-3
                          py-2
                          text-xs
                          font-medium
                          text-white
                          transition
                          hover:bg-rose-700
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                          sm:w-auto
                        "
                      >
                        <LuTrash2 className="text-sm" />

                        {isBulkDeleting
                          ? "Deleting..."
                          : `Delete Selected (${selectedPostIds.length})`}
                      </button>
                    </div>
                  )}

                  {/* ==================================================
                      POSTS
                  ================================================== */}

                  <div className="space-y-1">
                    {blogPostList.map((post) => (
                      <BlogPostSummaryCard
                        key={post._id}
                        title={post.title}
                        imgUrl={post.coverImageUrl}
                        updatedOn={
                          post.updatedAt
                            ? moment(post.updatedAt).format("Do MMM YYYY")
                            : "-"
                        }
                        authorName={
                          post.author?.name || post.authorName || "Deleted User"
                        }
                        tags={post.tags}
                        likes={post.likes}
                        views={post.views}
                        isSelected={selectedPostIds.includes(post._id)}
                        commentCount={post.commentCount}
                        onSelect={() => handleSelectPost(post._id)}
                        onClick={() => navigate(`/admin/edit/${post.slug}`)}
                        onDelete={() =>
                          setOpenDeleteAlert({
                            open: true,
                            data: post._id,
                            type: "single",
                          })
                        }
                      />
                    ))}
                  </div>

                  {/* ==================================================
                      PAGINATION
                  ================================================== */}

                  <div className="p-2">
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* ==================================================
          DELETE MODAL
      ================================================== */}

      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() =>
          setOpenDeleteAlert({
            open: false,
            data: null,
            type: "single",
          })
        }
        title={
          openDeleteAlert.type === "bulk"
            ? "Delete Selected Blog Posts"
            : "Delete Blog Post"
        }
      >
        <div className="">
          <DeleteAlertContent
            type="post"
            loading={blogPostDeleteLoading}
            onDelete={() => {
              if (openDeleteAlert.type === "bulk") {
                deleteSelectedPosts();
              } else {
                deletePost(openDeleteAlert.data);
              }
            }}
            danger={true}
            content={
              openDeleteAlert.type === "bulk"
                ? `Are you sure you want to permanently delete ${
                    openDeleteAlert.data?.length
                  } selected blog post${
                    openDeleteAlert.data?.length > 1 ? "s" : ""
                  }? This action cannot be undone.`
                : "Are you sure you want to permanently delete this blog post? This action cannot be undone."
            }
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default BlogPost;
