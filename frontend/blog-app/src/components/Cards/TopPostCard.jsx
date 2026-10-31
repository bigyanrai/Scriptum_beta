import { LuEye, LuHeart, LuMessageCircle, LuTrendingUp } from "react-icons/lu";

const TopPostCard = ({
  rank,
  title,
  authorName = "Unknown Author",
  coverImageUrl,
  views = 0,
  likes = 0,
  commentCount = 0,
  maxViews = 1,
}) => {
  const safeViews = Number(views) || 0;
  const safeLikes = Number(likes) || 0;
  const safeComments = Number(commentCount) || 0;
  const safeMaxViews = Math.max(Number(maxViews) || 0, 1);

  const viewPercentage = Math.min((safeViews / safeMaxViews) * 100, 100);

  return (
    <div
      className="
        group
        rounded-sm
        border border-transparent
        bg-white
        px-3
        py-3.5
        transition-all
        duration-200
        hover:border-gray-100
        hover:bg-white
      "
    >
      {/* ==================================================
          TOP CONTENT
      ================================================== */}

      <div className="flex min-w-0 items-center gap-3">
        {/* Rank */}
        <div
          className="
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            rounded-sm
            bg-gray-100
            text-[11px]
            font-bold
            text-gray-500
            transition-all
            duration-200
            group-hover:bg-sky-100
            group-hover:text-sky-600
          "
        >
          {rank}
        </div>

        {/* Thumbnail */}
        <div
          className="
            h-11
            w-11
            shrink-0
            overflow-hidden
            rounded-sm
            bg-gray-100
            ring-1
            ring-gray-200/70
          "
        >
          {coverImageUrl ? (
            <img
              src={coverImageUrl}
              alt={title}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-300
                group-hover:scale-105
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
                text-[9px]
                text-gray-400
              "
            >
              No image
            </div>
          )}
        </div>

        {/* Title + Author */}
        <div className="min-w-0 flex-1">
          <h3
            className="
              line-clamp-2
              text-xs
              font-semibold
              leading-4.5
              text-gray-800
              transition-colors
              group-hover:text-sky-700
            "
            title={title}
          >
            {title}
          </h3>

          <p
            className="
              mt-1
              truncate
              text-[10px]
              text-gray-400
            "
            title={authorName}
          >
            by {authorName}
          </p>
        </div>

        {/* Trending Indicator */}
        <div
          className="
            hidden
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-emerald-50
            text-emerald-500
            sm:flex
          "
          title="High performing post"
        >
          <LuTrendingUp size={13} />
        </div>
      </div>

      {/* ==================================================
          VIEW PERFORMANCE
      ================================================== */}

      <div className="mt-3 pl-10">
        <div className="mb-1.5 flex items-center justify-between">
          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-wider
              text-gray-400
            "
          >
            Views
          </span>

          <span className="text-[10px] font-semibold text-gray-600">
            {safeViews.toLocaleString()}
          </span>
        </div>

        <div
          className="
            h-1.5
            w-full
            overflow-hidden
            rounded-full
            bg-gray-100
          "
        >
          <div
            className="
    h-full
    rounded-full
  bg-gradient-to-r from-purple-700 via-violet-600 to-indigo-700
    transition-all
    duration-500
  "
            style={{
              width: `${viewPercentage}%`,
            }}
          />
        </div>
      </div>

      {/* ==================================================
          METRICS
      ================================================== */}

      <div
        className="
          mt-3
          flex
          items-center
          gap-4
          pl-10
          text-[10px]
          text-gray-400
        "
      >
        {/* Views */}
        <span className="flex items-center gap-1.5">
          <LuEye size={12} className="text-gray-400" />

          <span className="font-medium text-gray-500">
            {safeViews.toLocaleString()}
          </span>

          <span className="hidden sm:inline">views</span>
        </span>

        {/* Likes */}
        <span className="flex items-center gap-1.5">
          <LuHeart size={12} className="text-rose-400" />

          <span className="font-medium text-gray-500">
            {safeLikes.toLocaleString()}
          </span>

          <span className="hidden sm:inline">likes</span>
        </span>

        {/* Comments */}
        <span className="flex items-center gap-1.5">
          <LuMessageCircle size={12} className="text-sky-400" />

          <span className="font-medium text-gray-500">
            {safeComments.toLocaleString()}
          </span>

          <span className="hidden sm:inline">comments</span>
        </span>
      </div>
    </div>
  );
};

export default TopPostCard;
