import { useNavigate } from "react-router-dom";
import {
  LuArrowUpRight,
  LuEye,
  LuHeart,
  LuMessageCircle,
} from "react-icons/lu";
import CharAvatar from "../../../components/CharAvatar";

const CollectionBlogCard = ({
  title,
  coverImageUrl,
  description,
  tags,
  updatedOn,
  authorName,
  authProfileImg,
  views,
  likes,
  comments,
  index,
  onClick,
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
        hover:bg-gray-50/40
        md:flex-row
      "
    >
      {/* ====================================================== */}
      {/* ARTICLE NUMBER */}
      {/* ====================================================== */}

      {index !== undefined && (
        <div
          className="
            absolute
            left-4
            top-4
            z-10
            flex
            h-7
            min-w-7
            items-center
            justify-center
            rounded-md
            border
            border-white/80
            bg-black/60
            px-1.5
            text-[10px]
            font-semibold
            tabular-nums
            text-white
            backdrop-blur-sm
            md:left-5
            md:top-5
          "
        >
          {String(index).padStart(2, "0")}
        </div>
      )}

      {/* ====================================================== */}
      {/* COVER */}
      {/* ====================================================== */}

      <div
        className="
          relative
          shrink-0
          overflow-hidden
          md:w-64
          lg:w-72
        "
      >
        <div className="aspect-[16/10] h-full md:aspect-auto md:h-full">
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
              group-hover:scale-[1.035]
            "
          />
        </div>

        {/* Image overlay */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/20
            via-transparent
            to-transparent
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />
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
          md:px-6
          md:py-5
        "
      >
        {/* ================================================== */}
        {/* TOP META */}
        {/* ================================================== */}

        <div className="flex items-center justify-between gap-4">
          <span
            className="
              text-[11px]
              font-medium
              uppercase
              tracking-[0.12em]
              text-gray-400
            "
          >
            {updatedOn}
          </span>

          <LuArrowUpRight
            size={17}
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

        {/* ================================================== */}
        {/* TITLE */}
        {/* ================================================== */}

        <h2
          className="
            mt-2
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

        {/* ================================================== */}
        {/* DESCRIPTION */}
        {/* ================================================== */}

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

        {/* ================================================== */}
        {/* TAGS */}
        {/* ================================================== */}

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
                  bg-white
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
        {/* BOTTOM */}
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
            {authProfileImg ? (
              <img
                src={authProfileImg}
                alt={authorName}
                className="
        h-8
        w-8
        shrink-0
        rounded-full
        object-cover
      "
              />
            ) : (
              <CharAvatar
                fullName={authorName || "Deleted User"}
                width="w-8"
                height="h-8"
                textSize="text-[10px]"
              />
            )}

            <div className="min-w-0">
              <p
                className="
        truncate
        text-xs
        font-semibold
        text-gray-700
      "
              >
                {authorName}
              </p>

              <p className="text-[10px] text-gray-400">Article</p>
            </div>
          </div>

          {/* Engagement */}

          <div
            className="
              flex
              items-center
              gap-4
              text-[11px]
              text-gray-400
            "
          >
            <EngagementItem icon={<LuEye size={13} />} value={safeViews} />

            <EngagementItem icon={<LuHeart size={13} />} value={safeLikes} />

            <EngagementItem
              icon={<LuMessageCircle size={13} />}
              value={safeComments}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

// ============================================================
// ENGAGEMENT ITEM
// ============================================================

const EngagementItem = ({ icon, value }) => {
  return (
    <div className="flex items-center gap-1.5">
      {icon}

      <span className="tabular-nums">{value.toLocaleString()}</span>
    </div>
  );
};

export default CollectionBlogCard;
