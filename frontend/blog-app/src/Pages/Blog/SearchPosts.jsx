import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  LuLoaderCircle,
  LuSearch,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import moment from "moment";

import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
import BlogPostSummaryCard from "./components/BlogPostSummaryCard";
import BackButton from "../../components/BackButton";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const RESULTS_PER_PAGE = 9;

const SearchPosts = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";
  const page = Math.max(Number(searchParams.get("page")) || 1, 1);
  const sort = searchParams.get("sort") || "relevance";

  const [searchResults, setSearchResults] = useState([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
    limit: RESULTS_PER_PAGE,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // Search
  // --------------------------------------------------

  useEffect(() => {
    let cancelled = false;

    const search = async () => {
      const trimmedQuery = query.trim();

      if (!trimmedQuery) {
        setSearchResults([]);
        setPagination({
          currentPage: 1,
          totalPages: 0,
          totalResults: 0,
          limit: RESULTS_PER_PAGE,
        });
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await axiosInstance.get(
          API_PATHS.SEARCH.SEARCH_POSTS,
          {
            params: {
              q: trimmedQuery,
              page,
              limit: RESULTS_PER_PAGE,
              sort,
            },
          },
        );

        if (cancelled) return;

        const data = response.data;

        setSearchResults(data?.posts || []);

        setPagination(
          data?.pagination || {
            currentPage: page,
            totalPages: 0,
            totalResults: 0,
            limit: RESULTS_PER_PAGE,
          },
        );
      } catch (error) {
        if (cancelled) return;

        console.error("Search error:", error);

        setSearchResults([]);

        setPagination({
          currentPage: 1,
          totalPages: 0,
          totalResults: 0,
          limit: RESULTS_PER_PAGE,
        });

        setError("Something went wrong while searching.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    search();

    return () => {
      cancelled = true;
    };
  }, [query, page, sort]);

  // --------------------------------------------------
  // Open blog
  // --------------------------------------------------

  const handleClick = (post) => {
    if (!post?.slug) return;

    navigate(`/${post.slug}`);
  };

  // --------------------------------------------------
  // Sort
  // --------------------------------------------------

  const handleSortChange = (newSort) => {
    setSearchParams({
      query,
      page: "1",
      sort: newSort,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages || newPage === page) {
      return;
    }

    setSearchParams({
      query,
      page: String(newPage),
      sort,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // --------------------------------------------------
  // Pagination buttons
  // --------------------------------------------------

  const getPaginationItems = () => {
    const totalPages = pagination.totalPages;

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const items = [];

    items.push(1);

    if (page > 4) {
      items.push("left-ellipsis");
    }

    const startPage = Math.max(2, page - 1);
    const endPage = Math.min(totalPages - 1, page + 1);

    for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
      items.push(pageNumber);
    }

    if (page < totalPages - 3) {
      items.push("right-ellipsis");
    }

    items.push(totalPages);

    return items;
  };

  // --------------------------------------------------
  // Highlight search term
  // --------------------------------------------------

  const highlightText = (text, searchQuery) => {
    if (!text) return "";

    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) return text;

    const escapedQuery = trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(`(${escapedQuery})`, "gi");

    const parts = String(text).split(regex);

    return parts.map((part, index) => {
      const isMatch = part.toLowerCase() === trimmedQuery.toLowerCase();

      if (isMatch) {
        return (
          <mark
            key={index}
            className="rounded bg-yellow-100 px-0.5 text-yellow-800"
          >
            {part}
          </mark>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  // --------------------------------------------------
  // Header text
  // --------------------------------------------------

  const resultCountText =
    pagination.totalResults === 1
      ? "1 result found"
      : `${pagination.totalResults} results found`;

  return (
    <BlogLayout>
      <div className="pb-10">
        <BackButton />

        {/* --------------------------------------------------
            HEADER
        -------------------------------------------------- */}

        <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <LuSearch className="text-lg text-sky-500" />

              <h3 className="text-lg font-semibold text-gray-800">
                Search results
              </h3>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Showing results matching{" "}
              <span className="font-medium text-sky-500">"{query}"</span>
            </p>

            {!loading && !error && (
              <p className="mt-1 text-xs text-gray-400">{resultCountText}</p>
            )}
          </div>

          {/* --------------------------------------------------
              SORT
          -------------------------------------------------- */}

          <div className="flex items-center gap-2">
            <label
              htmlFor="sort"
              className="whitespace-nowrap text-sm text-gray-500"
            >
              Sort by:
            </label>

            <select
              id="sort"
              value={sort}
              onChange={(event) => handleSortChange(event.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="mostViewed">Most Viewed</option>
              <option value="mostLiked">Most Liked</option>
            </select>
          </div>
        </div>

        {/* --------------------------------------------------
            ERROR
        -------------------------------------------------- */}

        {!loading && error && (
          <div className="mt-10 rounded-xl border border-red-200 bg-red-50 py-12 text-center">
            <p className="text-sm font-medium text-red-700">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        )}

        {/* --------------------------------------------------
            LOADING
        -------------------------------------------------- */}

        {loading && (
          <div className="flex min-h-[360px] items-center justify-center">
            <div className="flex flex-col items-center text-gray-500">
              <LuLoaderCircle className="animate-spin text-3xl text-sky-500" />

              <p className="mt-3 text-sm">Searching for matching articles...</p>

              <p className="mt-1 text-xs text-gray-400">
                Finding the most relevant results
              </p>
            </div>
          </div>
        )}

        {/* --------------------------------------------------
            EMPTY QUERY
        -------------------------------------------------- */}

        {!loading && !error && !query.trim() && (
          <div className="mt-10 rounded-xl border border-dashed border-gray-300 py-16 text-center">
            <LuSearch className="mx-auto mb-4 text-4xl text-gray-300" />

            <p className="text-lg font-medium text-gray-700">
              Search for an article
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Enter a keyword, tag, or phrase to find articles.
            </p>
          </div>
        )}

        {/* --------------------------------------------------
            NO RESULTS
        -------------------------------------------------- */}

        {!loading && !error && query.trim() && searchResults.length === 0 && (
          <div className="mt-10 rounded-xl border border-dashed border-gray-300 py-16 text-center">
            <LuSearch className="mx-auto mb-4 text-4xl text-gray-300" />

            <p className="text-lg font-medium text-gray-700">
              No results found
            </p>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              We couldn't find any articles matching{" "}
              <span className="font-medium text-gray-700">"{query}"</span>.
            </p>

            <p className="mt-2 text-xs text-gray-400">
              Try a shorter keyword, another spelling, or a different search
              phrase.
            </p>
          </div>
        )}

        {/* --------------------------------------------------
            RESULTS
        -------------------------------------------------- */}

        {!loading && !error && searchResults.length > 0 && (
          <>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((item) => (
                <BlogPostSummaryCard
                  key={item._id}
                  title={item.title}
                  coverImageUrl={item.coverImageUrl}
                  description={item.content}
                  tags={item.tags || []}
                  updatedOn={
                    item.updatedAt
                      ? moment(item.updatedAt).format("Do MMM YYYY")
                      : "-"
                  }
                  authorName={item.author?.name || "Deleted User"}
                  authProfileImg={item.author?.profileImageUrl}
                  comments={item.commentCount || 0}
                  views={item.views || 0}
                  likes={item.likes || 0}
                  score={item.score}
                  sort={sort}
                  query={query}
                  highlightText={highlightText}
                  onClick={() => handleClick(item)}
                />
              ))}
            </div>

            {/* --------------------------------------------------
                  PAGINATION
              -------------------------------------------------- */}

            {pagination.totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center gap-4">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {/* Previous */}

                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                    className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition hover:border-sky-200 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <LuChevronLeft size={16} />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  {/* Page Numbers */}

                  {getPaginationItems().map((item, index) => {
                    if (item === "left-ellipsis" || item === "right-ellipsis") {
                      return (
                        <span
                          key={`${item}-${index}`}
                          className="px-1 text-sm text-gray-400"
                        >
                          ...
                        </span>
                      );
                    }

                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => handlePageChange(item)}
                        className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition ${
                          item === page
                            ? "bg-sky-500 text-white shadow-sm"
                            : "border border-gray-200 bg-white text-gray-700 hover:border-sky-200 hover:bg-sky-50"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}

                  {/* Next */}

                  <button
                    type="button"
                    disabled={page === pagination.totalPages}
                    onClick={() => handlePageChange(page + 1)}
                    className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition hover:border-sky-200 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <LuChevronRight size={16} />
                  </button>
                </div>

                <p className="text-xs text-gray-400">
                  Page {page} of {pagination.totalPages}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </BlogLayout>
  );
};

export default SearchPosts;
