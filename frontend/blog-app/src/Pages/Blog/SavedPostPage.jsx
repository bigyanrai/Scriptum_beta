import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import toast from "react-hot-toast";
import { LuSearch, LuX, LuSlidersHorizontal } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
import SavedPostCard from "./components/SavedPostCard";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import SavedPostCardSkeleton from "../../components/Loader/SavedPostSkeleton";
import Pagination from "../../components/PaginationCollection";
import DefaultLoader from "../../components/Loader/DefaultLoader";
import BackButton from "../../components/BackButton";
import BlogSidebar from "../../components/layouts/BlogLayout/BlogSidebar";

const SavedPostsPage = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("saved");

  const { user, loading, setOpenAuthForm } = useContext(UserContext);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);

  const fetchBookmarks = async () => {
    try {
      if (posts.length === 0) {
        setIsLoading(true);
      } else {
        setPageLoading(true);
      }

      const response = await axiosInstance.get(API_PATHS.POSTS.GET_BOOKMARKS, {
        params: {
          page,
          limit: 4,
          search: searchQuery,
          sortBy,
        },
      });

      setPosts(response.data.posts);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setPageLoading(false);
    }
  };

  const handleRemoveBookmark = async (postId) => {
    try {
      await axiosInstance.delete(API_PATHS.POSTS.REMOVE_BOOKMARK(postId));

      fetchBookmarks();

      toast.success("Removed from saved posts");
    } catch (error) {
      toast.error("Failed to remove bookmark");
    }
  };

  const startPost =
    pagination && pagination.totalBookmarks > 0
      ? (page - 1) * pagination.limit + 1
      : 0;

  const endPost =
    pagination && pagination.totalBookmarks > 0
      ? Math.min(page * pagination.limit, pagination.totalBookmarks)
      : 0;

  useEffect(() => {
    if (loading) return;

    if (!user) {
      setOpenAuthForm(true);
      navigate("/");
      return;
    }

    fetchBookmarks();
  }, [loading, user, page, searchQuery, sortBy]);

  const handlePageChange = (newPage) => {
    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <BlogLayout>
      <div className="mx-auto w-full ">
        <BackButton />

        {/* ====================================================== */}
        {/* HEADER */}
        {/* ====================================================== */}

        <header className="mb-8  pb-7">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
              Your library
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Saved posts
            </h2>

            <p className="mt-2 text-gray-500">
              Articles you've saved to read, revisit, or keep for later.
            </p>
          </div>
          {!isLoading && pagination?.totalBookmarks > 0 && (
            <p className="shrink-0 text-xs text-gray-400">
              <span className="font-semibold text-gray-800">
                {pagination.totalBookmarks}
              </span>{" "}
              saved {pagination.totalBookmarks === 1 ? "article" : "articles"}
            </p>
          )}
        </header>

        {/* ====================================================== */}
        {/* LIBRARY TOOLBAR */}
        {/* ====================================================== */}

        <div className="mb-8">
          <div className="flex flex-col gap-2 sm:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <LuSearch
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search saved posts..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="
                  h-10
                  w-full
                  rounded-md
                  border
                  border-gray-200
                  bg-gray-50/50
                  pl-10
                  pr-10
                  text-sm
                  text-gray-900
                  outline-none
                  transition-all
                  placeholder:text-gray-400
                  hover:border-gray-300
                  hover:bg-white
                  focus:border-gray-400
                  focus:bg-white
                  focus:ring-2
                  focus:ring-gray-100
                "
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setPage(1);
                  }}
                  aria-label="Clear search"
                  className="
                    absolute
                    right-2.5
                    top-1/2
                    -translate-y-1/2
                    rounded-md
                    p-1.5
                    text-gray-400
                    transition
                    hover:bg-gray-100
                    hover:text-gray-700
                  "
                >
                  <LuX size={15} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="relative sm:w-52">
              <LuSlidersHorizontal
                size={15}
                className="
                  pointer-events-none
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="
                  h-10
                  w-full
                  appearance-none
                  rounded-md
                  border
                  border-gray-200
                  bg-gray-50/50
                  pl-10
                  pr-8
                  text-sm
                  text-gray-600
                  outline-none
                  transition-all
                  hover:border-gray-300
                  hover:bg-white
                  focus:border-gray-400
                  focus:bg-white
                  focus:ring-2
                  focus:ring-gray-100
                  cursor-pointer
                "
              >
                <option value="saved">Recently saved</option>
                <option value="updated">Recently updated</option>
                <option value="likes">Most liked</option>
                <option value="views">Most viewed</option>
                <option value="title">Title A–Z</option>
              </select>
            </div>
          </div>

          {/* Result information */}
          {!isLoading && posts.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-gray-400">
              <span>
                Showing{" "}
                <span className="font-medium text-gray-700">
                  {startPost}–{endPost}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-700">
                  {pagination?.totalBookmarks || 0}
                </span>
              </span>

              <span className="text-gray-200">•</span>

              <span>
                Page <span className="font-medium text-gray-700">{page}</span>{" "}
                of{" "}
                <span className="font-medium text-gray-700">
                  {pagination?.totalPages || 1}
                </span>
              </span>
            </div>
          )}
        </div>

        {/* ====================================================== */}
        {/* ARTICLES */}
        {/* ====================================================== */}

        <div className="space-y-5">
          {/* Loading */}
          {(isLoading || pageLoading) &&
            Array.from({ length: 4 }).map((_, index) => (
              <SavedPostCardSkeleton key={index} />
            ))}

          {/* Empty state */}
          {!isLoading && !searchQuery && posts.length === 0 && (
            <EmptySavedState onBrowse={() => navigate("/")} />
          )}

          {/* Search empty state */}
          {!isLoading && searchQuery && posts.length === 0 && (
            <SearchEmptyState
              query={searchQuery}
              onClear={() => {
                setSearchQuery("");
                setPage(1);
              }}
            />
          )}

          {/* Posts */}
          <AnimatePresence mode="popLayout">
            {!isLoading &&
              !pageLoading &&
              posts.map((post, index) => (
                <motion.div
                  key={post._id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.04,
                  }}
                >
                  <SavedPostCard
                    title={post.title}
                    coverImageUrl={post.coverImageUrl}
                    description={post.content}
                    tags={post.tags}
                    updatedOn={moment(post.updatedAt).format("Do MMM YYYY")}
                    savedAt={moment(post.savedAt).fromNow()}
                    authorName={post.author?.name || "Deleted User"}
                    authorProfileImg={post.author?.profileImageUrl}
                    views={post.views}
                    likes={post.likes}
                    comments={post.commentCount || 0}
                    onClick={() => navigate(`/${post.slug}`)}
                    onRemoveBookmark={() => handleRemoveBookmark(post._id)}
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        <Pagination
          page={page}
          totalPages={pagination?.totalPages || 1}
          onPageChange={handlePageChange}
          isLoading={pageLoading}
        />

        <BlogSidebar />
      </div>
    </BlogLayout>
  );
};

/* ============================================================ */
/* EMPTY SAVED STATE */
/* ============================================================ */

const EmptySavedState = ({ onBrowse }) => {
  return (
    <div className="border-t border-gray-100 py-20 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-400">
        <span className="text-xl">♡</span>
      </div>

      <h2 className="mt-5 text-xl font-semibold tracking-tight text-gray-900">
        Your reading list is empty
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
        Save articles that catch your attention and they'll appear here for
        whenever you're ready to read them.
      </p>

      <button
        type="button"
        onClick={onBrowse}
        className="
          mt-6
          rounded-md
          bg-gray-900
          px-4
          py-2
          text-sm
          font-medium
          text-white
          transition
          hover:bg-gray-800
          cursor-pointer
        "
      >
        Explore articles
      </button>
    </div>
  );
};

/* ============================================================ */
/* SEARCH EMPTY STATE */
/* ============================================================ */

const SearchEmptyState = ({ query, onClear }) => {
  return (
    <div className="border-t border-gray-100 py-20 text-center">
      <LuSearch size={24} className="mx-auto text-gray-300" />

      <h2 className="mt-5 text-xl font-semibold tracking-tight text-gray-900">
        No saved posts found
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
        Nothing in your reading list matches{" "}
        <span className="font-medium text-gray-700">"{query}"</span>.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="
          mt-5
          text-sm
          font-medium
          text-gray-600
          underline
          underline-offset-4
          transition
          hover:text-gray-900
          cursor-pointer
        "
      >
        Clear search
      </button>
    </div>
  );
};

export default SavedPostsPage;
