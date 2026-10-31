import {
  LuBookmarkCheck,
  LuEye,
  LuHeart,
  LuMessageCircle,
  LuArrowUpRight,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { calculateReadingTime } from "../../../utils/helper";

const SavedPostCard = ({
  title,
  coverImageUrl,
  description,
  tags,
  savedAt,
  updatedOn,
  authorName,
  authorProfileImg,
  views,
  likes,
  comments = 0,
  onClick,
  onRemoveBookmark,
}) => {
  const navigate = useNavigate();

  const safeViews = Number(views) || 0;
  const safeLikes = Number(likes) || 0;
  const safeComments = Number(comments) || 0;

  return (
    <article
      onClick={onClick}
      className="
        group
        relative
        flex
        cursor-pointer
        flex-col
        overflow-hidden
        border
        border-gray-200
        bg-white
        transition-all
        duration-300
        hover:border-gray-300
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)]
        md:flex-row
      "
    >
      {/* ====================================================== */}
      {/* COVER */}
      {/* ====================================================== */}

      <div
        className="
          relative
          shrink-0
          overflow-hidden
          bg-gray-100
          md:w-60
          lg:w-64
        "
      >
        <div className="aspect-[16/10] md:aspect-auto md:h-full">
          <img
            src={coverImageUrl}
            alt={title}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.025]
            "
          />
        </div>

        {/* Subtle image overlay */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/15
            via-transparent
            to-transparent
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />

        {/* Saved indicator */}
        <div
          className="
            absolute
            left-3
            top-3
            flex
            items-center
            gap-1.5
            rounded-md
            border
            border-white/20
            bg-black/55
            px-2
            py-1
            text-[10px]
            font-medium
            text-white
            backdrop-blur-md
          "
        >
          <LuBookmarkCheck size={11} />
          Saved
        </div>
      </div>

      {/* ====================================================== */}
      {/* CONTENT */}
      {/* ====================================================== */}

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          px-5
          py-5
          sm:px-6
          md:py-5
        "
      >
        {/* Top line */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
              Saved {savedAt}
            </span>

            <span className="h-1 w-1 shrink-0 rounded-full bg-gray-300" />

            <span className="truncate text-[10px] text-gray-400">
              Updated {updatedOn}
            </span>
          </div>

          <LuArrowUpRight
            size={16}
            className="
              shrink-0
              text-gray-300
              transition-all
              duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
              group-hover:text-gray-700
            "
          />
        </div>

        {/* Title */}
        <h2
          className="
            mt-2.5
            line-clamp-2
            text-xl
            font-bold
            leading-tight
            tracking-tight
            text-gray-900
            transition-colors
            duration-200
            group-hover:text-gray-700
            sm:text-[22px]
          "
        >
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p
            className="
              mt-3
              line-clamp-2
              max-w-3xl
              text-sm
              leading-6
              text-gray-500
            "
          >
            {description}
          </p>
        )}

        {/* Tags */}
        {Array.isArray(tags) && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.slice(0, 4).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/tags/${tag}`);
                }}
                className="
                  rounded-md
                  border
                  border-gray-200
                  bg-gray-50
                  px-2
                  py-1
                  text-[10px]
                  font-medium
                  text-gray-500
                  transition
                  hover:border-gray-300
                  hover:bg-gray-100
                  hover:text-gray-800
                  cursor-pointer
                "
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* ================================================== */}
        {/* FOOTER */}
        {/* ================================================== */}

        <div
          className="
            mt-5
            flex
            flex-col
            gap-4
            border-t
            border-gray-100
            pt-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* Author */}
          <div className="flex min-w-0 items-center gap-2.5">
            {authorProfileImg ? (
              <img
                src={authorProfileImg}
                alt={authorName}
                className="
                  h-8
                  w-8
                  shrink-0
                  rounded-full
                  object-cover
                  ring-1
                  ring-gray-100
                "
              />
            ) : (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-500">
                {authorName?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-gray-700">
                {authorName}
              </p>

              <p className="mt-0.5 text-[10px] text-gray-400">
                {calculateReadingTime(description)}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div
            className="
              flex
              items-center
              gap-4
              text-[11px]
              text-gray-400
            "
          >
            <Stat icon={<LuEye size={13} />} value={safeViews} />
            <Stat icon={<LuHeart size={13} />} value={safeLikes} />
            <Stat icon={<LuMessageCircle size={13} />} value={safeComments} />

            {/* Remove bookmark */}
            <button
              type="button"
              title="Remove from saved posts"
              aria-label="Remove from saved posts"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveBookmark();
              }}
              className="
                ml-1
                rounded-md
                p-1.5
                text-gray-400
                transition
                hover:bg-gray-100
                hover:text-gray-800
                cursor-pointer
              "
            >
              <LuBookmarkCheck size={15} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

const Stat = ({ icon, value }) => {
  return (
    <span className="flex items-center gap-1.5">
      {icon}
      <span className="tabular-nums">{value.toLocaleString()}</span>
    </span>
  );
};

export default SavedPostCard;
