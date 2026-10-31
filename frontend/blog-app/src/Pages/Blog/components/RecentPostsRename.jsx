import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import moment from "moment";

const RecentPosts = () => {
  const navigate = useNavigate();

  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================================================
  // FETCH LATEST POSTS
  // ============================================================

  const getLatestPosts = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        API_PATHS.POSTS.GET_LATEST_POSTS,
      );

      setPostList(response.data?.length > 0 ? response.data : []);
    } catch (error) {
      console.error("Error fetching latest posts:", error);
      setPostList([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // HANDLE POST CLICK
  // ============================================================

  const handleClick = (post) => {
    navigate(`/${post.slug}`);
  };

  // ============================================================
  // FETCH ON MOUNT
  // ============================================================

  useEffect(() => {
    getLatestPosts();
  }, []);

  return (
    <div>
      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <div className="mb-5">
        <h4 className="text-base font-semibold text-gray-900">Recent Posts</h4>

        <p className="mt-0.5 text-xs text-gray-400">
          Latest from the community
        </p>
      </div>

      {/* ====================================================== */}
      {/* LOADING */}
      {/* ====================================================== */}

      {loading ? (
        <RecentPostsSkeleton />
      ) : postList.length > 0 ? (
        /* ====================================================== */
        /* POSTS */
        /* ====================================================== */

        <div className="space-y-4">
          {postList.map((item) => (
            <PostCard
              key={item._id}
              title={item.title}
              coverImageUrl={item.coverImageUrl}
              publishedAt={item.createdAt}
              author={item.author}
              onClick={() => handleClick(item)}
            />
          ))}
        </div>
      ) : (
        /* ====================================================== */
        /* EMPTY STATE */
        /* ====================================================== */

        <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center">
          <p className="text-xs font-medium text-gray-500">No recent posts</p>
        </div>
      )}
    </div>
  );
};

export default RecentPosts;

// ============================================================
// POST CARD
// ============================================================

const PostCard = ({ title, coverImageUrl, publishedAt, author, onClick }) => {
  return (
    <article
      onClick={onClick}
      className="
        group
        cursor-pointer
        border-b
        border-gray-100
        pb-4
        last:border-b-0
        last:pb-0
      "
    >
      {/* ====================================================== */}
      {/* IMAGE + CONTENT */}
      {/* ====================================================== */}

      <div className="flex items-start gap-3">
        <img
          src={coverImageUrl}
          alt={title}
          className="
            h-14
            w-14
            shrink-0
            rounded-md
            object-cover
            bg-gray-100
            transition-transform
            duration-200
            group-hover:scale-[1.03]
          "
        />

        <div className="min-w-0 flex-1">
          {/* TITLE */}

          <h2
            className="
              line-clamp-3
              text-sm
              font-medium
              leading-5
              text-gray-800
              transition-colors
              duration-200
              group-hover:text-sky-600
            "
          >
            {title}
          </h2>

          {/* PUBLISHED DATE */}

          <p className="mt-1.5 text-[10px] text-gray-400">
            {publishedAt
              ? moment(publishedAt).format("Do MMM YYYY")
              : "Recently published"}
          </p>
        </div>
      </div>

      {/* ====================================================== */}
      {/* AUTHOR */}
      {/* ====================================================== */}

      <div className="mt-3 flex items-center gap-2">
        {author?.profileImageUrl ? (
          <img
            src={author.profileImageUrl}
            alt={author.name || "Author"}
            className="
              h-6
              w-6
              shrink-0
              rounded-full
              object-cover
              bg-gray-100
            "
          />
        ) : (
          <div
            className="
              flex
              h-6
              w-6
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-sky-50
              text-[10px]
              font-semibold
              uppercase
              text-sky-600
            "
          >
            {author?.name?.charAt(0) || "A"}
          </div>
        )}

        <span className="truncate text-[11px] font-medium text-gray-500">
          {author?.name || "Unknown Author"}
        </span>
      </div>
    </article>
  );
};

// ============================================================
// RECENT POSTS SKELETON
// ============================================================

const RecentPostsSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="
            border-b
            border-gray-100
            pb-4
            last:border-b-0
            last:pb-0
          "
        >
          {/* ================================================== */}
          {/* IMAGE + TITLE */}
          {/* ================================================== */}

          <div className="flex items-start gap-3">
            {/* IMAGE SKELETON */}

            <div
              className="
                h-14
                w-14
                shrink-0
                animate-pulse
                rounded-md
                bg-gray-200
              "
            />

            {/* CONTENT SKELETON */}

            <div className="min-w-0 flex-1">
              {/* TITLE LINES */}

              <div className="space-y-1.5">
                <div className="h-3.5 w-[92%] animate-pulse rounded bg-gray-200" />

                <div className="h-3.5 w-[78%] animate-pulse rounded bg-gray-200" />

                {/* Third line only on some cards to make the
                    skeleton feel more natural */}

                {item % 2 === 0 && (
                  <div className="h-3.5 w-[55%] animate-pulse rounded bg-gray-200" />
                )}
              </div>

              {/* DATE SKELETON */}

              <div className="mt-2.5 h-2.5 w-20 animate-pulse rounded bg-gray-100" />
            </div>
          </div>

          {/* ================================================== */}
          {/* AUTHOR SKELETON */}
          {/* ================================================== */}

          <div className="mt-3 flex items-center gap-2">
            {/* AVATAR */}

            <div
              className="
                h-6
                w-6
                shrink-0
                animate-pulse
                rounded-full
                bg-gray-200
              "
            />

            {/* AUTHOR NAME */}

            <div className="h-2.5 w-24 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
};
