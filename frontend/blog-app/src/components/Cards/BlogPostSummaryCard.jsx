import {
  LuEye,
  LuHeart,
  LuMessageCircle,
  LuTrash2,
  LuCheck,
} from "react-icons/lu";

const BlogPostSummaryCard = ({
  title,
  imgUrl,
  updatedOn,
  tags,
  likes,
  authorName,
  views,
  commentCount,
  onClick,
  onDelete,
  isSelected = false,
  onSelect,

  selectable = true,
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative w-full min-w-0 cursor-pointer overflow-hidden border rounded-sm bg-white transition-all duration-200 ${
        isSelected
          ? "border-black bg-sky-50/40 shadow-sm"
          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/40"
      }`}
    >
      <div className="flex min-w-0 items-stretch gap-2 p-2 ">
        {/* ==================================================
            CHECKBOX
            ================================================== */}

        {selectable && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.();
            }}
            className="flex w-6 flex-shrink-0 cursor-pointer items-start justify-center self-stretch rounded-sm"
            aria-label={isSelected ? "Deselect post" : "Select post"}
          >
            <span
              className={`flex h-[17px] w-[17px] items-center justify-center rounded-[4px] border transition-all duration-150 ${
                isSelected
                  ? "border-sky-600 bg-sky-600 text-white"
                  : "border-gray-300 bg-white group-hover:border-sky-400"
              }`}
            >
              {isSelected && <LuCheck className="text-[10px]" />}
            </span>
          </button>
        )}

        {/* ==================================================
            COVER IMAGE
            ================================================== */}

        <div className="w-[72px] flex-shrink-0 self-stretch overflow-hidden rounded-sm bg-gray-100 ring-1 ring-gray-200/60 sm:w-[82px]">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[9px] font-medium text-gray-400">
              No image
            </div>
          )}
        </div>

        {/* ==================================================
            CONTENT
            ================================================== */}

        <div className="min-w-0 flex-1 pr-7">
          {/* TITLE */}

          <h3 className="line-clamp-2 break-words text-[12px] font-semibold leading-[17px] text-gray-800 transition-colors group-hover:text-gray-950 sm:text-sm sm:leading-[19px]">
            {title || "Untitled post"}
          </h3>

          {/* DATE */}

          <div className="mt-0.5 flex min-w-0 items-center gap-1 text-[10px] font-medium sm:text-[11px]">
            <span className="truncate text-gray-500">
              {authorName || "Deleted User"}
            </span>

            <span className="flex-shrink-0 text-gray-300">•</span>

            <span className="truncate text-gray-400">
              Updated {updatedOn || "-"}
            </span>
          </div>
          {/* ==================================================
              STATS
              ================================================== */}

          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 text-[10px] sm:gap-x-2.5 sm:text-[11px]">
            {/* VIEWS */}

            <span className="inline-flex min-w-0 items-center gap-1">
              <LuEye className="flex-shrink-0 text-[12px] text-sky-500" />

              <span className="font-semibold tabular-nums text-gray-500">
                {views ?? 0}
              </span>

              <span className="hidden text-gray-400 sm:inline">views</span>
            </span>

            <span className="h-3 w-px flex-shrink-0 bg-gray-200" />

            {/* LIKES */}

            <span className="inline-flex min-w-0 items-center gap-1">
              <LuHeart className="flex-shrink-0 text-[12px] text-rose-500" />

              <span className="font-semibold tabular-nums text-gray-500">
                {likes ?? 0}
              </span>

              <span className="hidden text-gray-400 sm:inline">likes</span>
            </span>

            <span className="h-3 w-px flex-shrink-0 bg-gray-200" />

            {/* COMMENTS */}

            <span className="inline-flex min-w-0 items-center gap-1">
              <LuMessageCircle className="flex-shrink-0 text-[12px] text-violet-500" />

              <span className="font-semibold tabular-nums text-gray-500">
                {commentCount ?? 0}
              </span>

              <span className="hidden text-gray-400 sm:inline">comments</span>
            </span>
          </div>

          {/* ==================================================
              TAGS
              ================================================== */}

          {tags?.length > 0 && (
            <div className="mt-1.5 flex min-w-0 max-w-full flex-wrap gap-1">
              {tags.slice(0, 2).map((tag, index) => (
                <span
                  key={`tag_${index}`}
                  className="max-w-[100px] truncate rounded-md bg-gray-100 px-1.5 py-0.5 text-[9px] font-medium text-gray-500 transition-colors group-hover:bg-gray-200/80 group-hover:text-gray-600 sm:max-w-[140px] sm:text-[10px]"
                >
                  #{tag}
                </span>
              ))}

              {tags.length > 2 && (
                <span className="flex-shrink-0 rounded-md bg-gray-100 px-1.5 py-0.5 text-[9px] font-medium text-gray-400 sm:text-[10px]">
                  +{tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>

        {/* ==================================================
            DELETE
            ================================================== */}

        <button
          type="button"
          aria-label="Delete post"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          className="absolute right-2 top-2 flex h-7 w-7 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg text-gray-300 transition-all duration-150 hover:bg-rose-50 hover:text-rose-500 sm:relative sm:right-auto sm:top-auto sm:mt-0.5 sm:h-8 sm:w-8 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <LuTrash2 className="text-[13px] sm:text-[14px]" />
        </button>
      </div>
    </div>
  );
};

export default BlogPostSummaryCard;
