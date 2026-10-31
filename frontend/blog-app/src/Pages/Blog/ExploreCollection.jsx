import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { LuArrowUpRight, LuLayers3, LuFileText } from "react-icons/lu";

import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

import CollectionBlogCard from "../Blog/components/CollectionBlogCard";
import Pagination from "../../components/PaginationCollection";
import CollectionBlogCardSkeleton from "../../components/Loader/CollectionBlogCardSkeleton";
import BlogSidebar from "../../components/layouts/BlogLayout/BlogSidebar";
import BackButton from "../../components/BackButton";

const ExploreCollection = () => {
  const navigate = useNavigate();
  const { clusterId } = useParams();

  const [cluster, setCluster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  // ============================================================
  // FETCH COLLECTION
  // ============================================================

  useEffect(() => {
    getCluster();
  }, [clusterId, page]);

  // Reset pagination when switching collections
  useEffect(() => {
    setPage(1);
    setCluster(null);
    setPagination(null);
  }, [clusterId]);

  const getCluster = async () => {
    try {
      if (!cluster) {
        setLoading(true);
      } else {
        setPageLoading(true);
      }

      const response = await axiosInstance.get(
        API_PATHS.EXPLORE.EXPLORE_COLLECTION(clusterId),
        {
          params: {
            page,
            limit: 5,
          },
        },
      );

      setCluster(response.data?.cluster || null);
      setPagination(response.data?.pagination || null);
    } catch (error) {
      console.error("Error fetching explore collection:", error);

      setCluster(null);
      setPagination(null);
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  };

  // ============================================================
  // HANDLERS
  // ============================================================

  const handlePageChange = (newPage) => {
    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBlogClick = (blog) => {
    if (!blog?.slug) return;

    navigate(`/${blog.slug}`);
  };

  const handleKeywordClick = (keyword) => {
    navigate(`/tags/${keyword}`);
  };

  // ============================================================
  // SAFE PAGINATION VALUES
  // ============================================================

  const totalBlogs = Number(pagination?.totalBlogs) || 0;
  const totalPages = Number(pagination?.totalPages) || 1;
  const limit = Number(pagination?.limit) || 5;

  const startArticle = totalBlogs > 0 ? (page - 1) * limit + 1 : 0;

  const endArticle = totalBlogs > 0 ? Math.min(page * limit, totalBlogs) : 0;

  // ============================================================
  // INITIAL LOADING
  // ============================================================

  if (loading) {
    return (
      <BlogLayout activeMenu="Explore">
        <div className="w-full mx-auto">
          <BackButton label="Back to Explore" />

          <CollectionHeaderSkeleton />

          <div className="mt-8 space-y-6">
            {[...Array(5)].map((_, index) => (
              <CollectionBlogCardSkeleton key={index} />
            ))}
          </div>
        </div>

        <BlogSidebar />
      </BlogLayout>
    );
  }

  // ============================================================
  // NOT FOUND
  // ============================================================

  if (!cluster) {
    return (
      <BlogLayout activeMenu="Explore">
        <div className="w-full mx-auto">
          <BackButton label="Back to Explore" />

          <div className="py-24 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
              <LuLayers3 size={24} className="text-gray-400" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              Collection not found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              This collection may have been removed or is no longer available.
            </p>

            <button
              type="button"
              onClick={() => navigate("/explore")}
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-gray-200
                bg-white
                px-4
                py-2.5
                text-sm
                font-medium
                text-gray-700
                transition
                hover:border-gray-300
                hover:bg-gray-50
                cursor-pointer
              "
            >
              Back to Explore
              <LuArrowUpRight size={15} />
            </button>
          </div>
        </div>

        <BlogSidebar />
      </BlogLayout>
    );
  }

  const keywords = Array.isArray(cluster.keywords) ? cluster.keywords : [];

  const blogs = Array.isArray(cluster.blogs) ? cluster.blogs : [];

  return (
    <BlogLayout activeMenu="Explore">
      <div className="w-full mx-auto">
        {/* ====================================================== */}
        {/* BACK */}
        {/* ====================================================== */}

        <BackButton label="Back to Explore" />

        {/* ====================================================== */}
        {/* COLLECTION HEADER */}
        {/* ====================================================== */}

        <section className="border-b border-gray-100 pb-8">
          {/* Eyebrow */}

          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Collection
          </p>

          {/* Title */}

          <h1
            className="
              max-w-4xl
              text-3xl
              sm:text-4xl
              lg:text-[42px]
              font-bold
              tracking-tight
              leading-tight
              text-gray-900
              capitalize
            "
          >
            {cluster.title}
          </h1>

          {/* Description */}

          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              sm:text-base
              leading-6
              text-gray-500
            "
          >
            Explore articles connected by common ideas, themes, and
            perspectives.
          </p>

          {/* Keywords */}

          {keywords.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <button
                  key={keyword}
                  type="button"
                  onClick={() => handleKeywordClick(keyword)}
                  className="
                    rounded-md
                    border
                    border-gray-200
                    bg-gray-50
                    px-2.5
                    py-1
                    text-[11px]
                    font-medium
                    text-gray-500
                    transition
                    hover:border-gray-300
                    hover:bg-gray-100
                    hover:text-gray-800
                    cursor-pointer
                  "
                >
                  #{keyword}
                </button>
              ))}
            </div>
          )}

          {/* Collection metadata */}

          <div
            className="
              mt-6
              flex
              flex-wrap
              items-center
              gap-x-4
              gap-y-2
              text-xs
              text-gray-400
            "
          >
            <div className="flex items-center gap-1.5">
              <LuFileText size={13} />

              <span>
                <strong className="font-semibold text-gray-700">
                  {totalBlogs.toLocaleString()}
                </strong>{" "}
                {totalBlogs === 1 ? "article" : "articles"}
              </span>
            </div>

            <span className="text-gray-300">•</span>

            <span>
              Page{" "}
              <strong className="font-semibold text-gray-700">{page}</strong> of{" "}
              <strong className="font-semibold text-gray-700">
                {totalPages}
              </strong>
            </span>
          </div>
        </section>

        {/* ====================================================== */}
        {/* ARTICLE RANGE */}
        {/* ====================================================== */}

        {totalBlogs > 0 && (
          <div className="flex items-center justify-between mt-7 mb-5">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Articles in this collection
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Showing {startArticle}–{endArticle} of{" "}
                {totalBlogs.toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* ====================================================== */}
        {/* ARTICLES */}
        {/* ====================================================== */}

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            className="space-y-5"
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.22,
            }}
          >
            {pageLoading ? (
              [...Array(5)].map((_, index) => (
                <CollectionBlogCardSkeleton key={index} />
              ))
            ) : blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <div key={blog._id} className="relative">
                  {/* Article number */}

                  <span
                    className="
                      absolute
                      -left-7
                      top-5
                      hidden
                      xl:block
                      text-[11px]
                      font-semibold
                      tabular-nums
                      text-gray-300
                    "
                  >
                    {String((page - 1) * limit + index + 1).padStart(2, "0")}
                  </span>

                  <CollectionBlogCard
                    title={blog.title}
                    coverImageUrl={blog.coverImageUrl}
                    description={blog.content}
                    tags={blog.tags}
                    updatedOn={
                      blog.updatedAt
                        ? moment(blog.updatedAt).format("Do MMM YYYY")
                        : "-"
                    }
                    authorName={
                      blog.author?.name || blog.authorName || "Deleted User"
                    }
                    authProfileImg={blog.author?.profileImageUrl}
                    likes={Number(blog.likes) || 0}
                    views={Number(blog.views) || 0}
                    comments={Number(blog.commentCount) || 0}
                    onClick={() => handleBlogClick(blog)}
                  />
                </div>
              ))
            ) : (
              <div className="py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
                  <LuFileText size={24} className="text-gray-400" />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-gray-900">
                  No articles in this collection
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  There aren't any articles to display right now.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ====================================================== */}
        {/* PAGINATION */}
        {/* ====================================================== */}

        {totalBlogs > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={pageLoading}
          />
        )}
      </div>

      {/* ======================================================== */}
      {/* SIDEBAR */}
      {/* ======================================================== */}

      <BlogSidebar />
    </BlogLayout>
  );
};

// ============================================================
// HEADER SKELETON
// ============================================================

const CollectionHeaderSkeleton = () => {
  return (
    <section className="border-b border-gray-100 pb-8">
      <div className="h-3 w-24 rounded bg-gray-200 animate-pulse" />

      <div className="mt-4 h-10 sm:h-12 w-2/3 max-w-xl rounded-lg bg-gray-200 animate-pulse" />

      <div className="mt-4 h-4 w-full max-w-2xl rounded bg-gray-100 animate-pulse" />

      <div className="mt-5 flex gap-2">
        <div className="h-6 w-16 rounded-md bg-gray-100 animate-pulse" />
        <div className="h-6 w-20 rounded-md bg-gray-100 animate-pulse" />
        <div className="h-6 w-14 rounded-md bg-gray-100 animate-pulse" />
      </div>

      <div className="mt-6 h-3 w-48 rounded bg-gray-100 animate-pulse" />
    </section>
  );
};

export default ExploreCollection;
