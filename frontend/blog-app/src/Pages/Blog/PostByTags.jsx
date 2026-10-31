import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuHash } from "react-icons/lu";
import moment from "moment";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
import BlogSidebar from "../../components/layouts/BlogLayout/BlogSidebar";
import BlogPostSummaryCard from "./components/BlogPostSummaryCard";
import BackButton from "../../components/BackButton";
import Pagination from "../../components/PaginationCollection";

const POSTS_PER_PAGE = 1;

const PostByTags = () => {
  const { tagName } = useParams();
  const navigate = useNavigate();

  const [blogPostList, setBlogPostList] = useState([]);

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
    limit: POSTS_PER_PAGE,
  });

  const [sort, setSort] = useState("newest");

  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  // Reset page whenever the tag changes
  useEffect(() => {
    setPage(1);
    setSort("newest");
  }, [tagName]);

  // Fetch posts whenever tag, page, or sorting changes
  useEffect(() => {
    const getPostsByTag = async () => {
      try {
        if (page === 1) {
          setLoading(true);
        } else {
          setPageLoading(true);
        }

        const response = await axiosInstance.get(
          API_PATHS.POSTS.GET_BY_TAG(tagName),
          {
            params: {
              page,
              limit: POSTS_PER_PAGE,
              sort,
            },
          },
        );

        const posts = response.data?.posts || [];

        setBlogPostList(posts);

        setPagination(
          response.data?.pagination || {
            currentPage: page,
            totalPages: 1,
            totalPosts: 0,
            limit: POSTS_PER_PAGE,
          },
        );
      } catch (error) {
        console.error("Error fetching posts by tag:", error);

        setBlogPostList([]);

        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalPosts: 0,
          limit: POSTS_PER_PAGE,
        });
      } finally {
        setLoading(false);
        setPageLoading(false);
      }
    };

    if (tagName) {
      getPostsByTag();
    }
  }, [tagName, page, sort]);

  const handlePageChange = (newPage) => {
    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClick = (post) => {
    navigate(`/${post.slug}`);
  };

  const totalPosts = Number(pagination?.totalPosts) || 0;
  const totalPages = Number(pagination?.totalPages) || 1;
  const limit = Number(pagination?.limit) || POSTS_PER_PAGE;

  const startArticle = totalPosts > 0 ? (page - 1) * limit + 1 : 0;

  const endArticle = totalPosts > 0 ? Math.min(page * limit, totalPosts) : 0;

  // Initial loading
  if (loading) {
    return (
      <BlogLayout>
        <div className="mx-auto w-full">
          <BackButton />

          <section className="mb-7">
            <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />

            <div className="mt-3 h-10 w-64 animate-pulse rounded-lg bg-gray-200" />

            <div className="mt-3 h-4 w-full max-w-2xl animate-pulse rounded bg-gray-100" />

            <div className="mt-4 h-3 w-32 animate-pulse rounded bg-gray-100" />
          </section>

          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="h-4 w-36 animate-pulse rounded bg-gray-100" />

              <div className="mt-2 h-3 w-44 animate-pulse rounded bg-gray-100" />
            </div>

            <div className="h-9 w-32 animate-pulse rounded-lg bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-4">
            {Array.from({ length: POSTS_PER_PAGE }).map((_, index) => (
              <div
                key={index}
                className="h-72 animate-pulse rounded-2xl bg-gray-100"
              />
            ))}
          </div>
        </div>

        <BlogSidebar />
      </BlogLayout>
    );
  }

  return (
    <BlogLayout>
      <div className="mx-auto w-full">
        <BackButton />

        {/* Header */}
        <section className="border-b border-gray-100 pb-7">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-gray-500">
            Topic
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            #{tagName}
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Discover articles connected by this topic, ideas, and perspectives.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
            <span>
              <span className="font-semibold text-gray-900">
                {totalPosts.toLocaleString()}
              </span>{" "}
              {totalPosts === 1 ? "article" : "articles"}
            </span>

            {totalPosts > 0 && (
              <>
                <span className="h-1 w-1 rounded-full bg-gray-300" />

                <span>
                  Page{" "}
                  <span className="font-semibold text-gray-900">{page}</span> of{" "}
                  <span className="font-semibold text-gray-900">
                    {totalPages}
                  </span>
                </span>
              </>
            )}
          </div>
        </section>

        {/* Toolbar */}
        {totalPosts > 0 && (
          <div className="mb-6 mt-7 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Articles in this topic
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Showing {startArticle}–{endArticle} of{" "}
                {totalPosts.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="tag-sort"
                className="hidden text-xs font-medium text-gray-500 sm:block"
              >
                Sort by
              </label>

              <select
                id="tag-sort"
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                disabled={pageLoading}
                className="
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  px-3
                  py-2
                  text-sm
                  text-gray-700
                  outline-none
                  transition
                  focus:border-gray-400
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <option value="newest">Newest</option>

                <option value="oldest">Oldest</option>

                <option value="views">Most viewed</option>

                <option value="likes">Most liked</option>

                <option value="comments">Most commented</option>
              </select>
            </div>
          </div>
        )}

        {/* Posts */}
        {totalPosts > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-7 md:grid-cols-4">
              {pageLoading
                ? Array.from({ length: limit }).map((_, index) => (
                    <div
                      key={index}
                      className="h-72 animate-pulse rounded-2xl bg-gray-100"
                    />
                  ))
                : blogPostList.map((item) => (
                    <BlogPostSummaryCard
                      key={item._id}
                      title={item.title}
                      coverImageUrl={item.coverImageUrl}
                      description={item.content}
                      tags={item.tags}
                      updatedOn={
                        item.updatedAt
                          ? moment(item.updatedAt).format("Do MMM YYYY")
                          : "-"
                      }
                      authorName={
                        item.author?.name || item.authorName || "Deleted User"
                      }
                      authProfileImg={item.author?.profileImageUrl}
                      views={item.views}
                      likes={item.likes}
                      comments={item.commentCount}
                      onClick={() => handleClick(item)}
                      isDeletedAuthor={!item.author}
                    />
                  ))}
            </div>

            {/* Pagination */}
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={pageLoading}
            />
          </>
        ) : (
          /* Empty state */
          <div
            className="
              mt-7
              flex
              min-h-[320px]
              flex-col
              items-center
              justify-center
              rounded-2xl
              border
              border-dashed
              border-gray-200
              bg-gray-50/50
              px-6
              text-center
            "
          >
            <div
              className="
                mb-5
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-white
                shadow-sm
                ring-1
                ring-gray-100
              "
            >
              <LuHash className="text-2xl text-gray-300" />
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              No articles found
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              There are currently no published articles associated with #
              {tagName}. Try exploring another topic.
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="
                mt-5
                rounded-lg
                bg-gray-900
                px-4
                py-2.5
                text-sm
                font-medium
                text-white
                transition
                hover:bg-gray-700
              "
            >
              Explore articles
            </button>
          </div>
        )}
      </div>

      <BlogSidebar />
    </BlogLayout>
  );
};

export default PostByTags;
