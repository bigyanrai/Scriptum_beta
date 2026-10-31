import { LuEye, LuHeart, LuMessageCircle, LuTrendingUp } from "react-icons/lu";
import CharAvatar from "../../../components/CharAvatar";

const TrendingPostCard = ({
  rank,
  title,
  coverImageUrl,
  description,
  tags = [],
  updatedOn,
  authorName,
  authProfileImg,
  views = 0,
  likes = 0,
  comments = 0,
  onClick,
}) => {
  return (
    <article
      onClick={onClick}
      className="
        group
        relative
        flex
        cursor-pointer
        gap-3
        overflow-hidden
        rounded-md
        border
        border-gray-200
        bg-white
        p-2
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-sky-200
        hover:shadow-md
        sm:gap-4
       
      "
    >
      {/* ====================================================== */}
      {/* RANK */}
      {/* ====================================================== */}

      <div
        className="
          absolute
          left-0
          top-0
          z-10
          flex
          h-7
          min-w-7
          items-center
          justify-center
          rounded-br-md
          bg-gray-900
          px-1.5
          text-[10px]
          font-bold
          text-white
        "
      >
        #{rank}
      </div>

      {/* ====================================================== */}
      {/* COVER IMAGE */}
      {/* ====================================================== */}

      <div
        className="
          relative
          h-24
          w-28
          shrink-0
          overflow-hidden
          rounded-sm
          bg-gray-100
          sm:h-28
          sm:w-36
        "
      >
        <img
          src={coverImageUrl}
          alt={title}
          loading="lazy"
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* Trending Indicator */}

        <div
          className="
            absolute
            bottom-1.5
            right-1.5
            flex
            items-center
            justify-center
            rounded-full
            bg-white/95
            p-1.5
            text-sky-600
            shadow-sm
            backdrop-blur
          "
        >
          <LuTrendingUp className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* ====================================================== */}
      {/* CONTENT */}
      {/* ====================================================== */}

      <div className="flex min-w-0 flex-1 flex-col py-0.5">
        {/* ================================================== */}
        {/* TITLE */}
        {/* ================================================== */}

        <h3
          className="
            line-clamp-2
            text-sm
            font-semibold
            leading-snug
            text-gray-900
            transition-colors
            duration-200
            group-hover:text-sky-600
            sm:text-[15px]
          "
        >
          {title}
        </h3>

        {/* ================================================== */}
        {/* DESCRIPTION */}
        {/* ================================================== */}

        {description && (
          <p
            className="
              mt-1
              line-clamp-2
              text-[11px]
              leading-4
              text-gray-500
              sm:text-xs
              sm:leading-5
            "
          >
            {description}
          </p>
        )}

        {/* ================================================== */}
        {/* TAGS */}
        {/* ================================================== */}

        {tags.length > 0 && (
          <div className="mt-2 flex min-w-0 flex-wrap gap-1.5">
            {tags.slice(0, 2).map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="
                  max-w-[110px]
                  truncate
                  rounded-sm
                  bg-sky-50
                  px-1.5
                  py-0.5
                  text-[9px]
                  font-medium
                  text-sky-700
                "
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* ================================================== */}
        {/* BOTTOM */}
        {/* ================================================== */}

        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between gap-2">
            {/* Author */}

            <div className="flex min-w-0 items-center gap-1.5">
              {authProfileImg ? (
                <img
                  src={authProfileImg}
                  alt={authorName || "Author"}
                  loading="lazy"
                  className="
                    h-5
                    w-5
                    shrink-0
                    rounded-full
                    object-cover
                    bg-gray-100
                  "
                />
              ) : (
                <CharAvatar
                  fullName={authorName || ""}
                  width="w-5"
                  height="h-5"
                  style="text-[8px]"
                />
              )}

              <span
                className="
                  max-w-[80px]
                  truncate
                  text-[9px]
                  font-medium
                  text-gray-500
                "
              >
                {authorName || "Unknown Author"}
              </span>
            </div>

            {/* Date */}

            {updatedOn && (
              <span className="shrink-0 text-[9px] text-gray-400">
                {updatedOn}
              </span>
            )}
          </div>

          {/* ================================================= */}
          {/* STATS */}
          {/* ================================================= */}

          <div
            className="
              mt-2
              flex
              items-center
              gap-3
              border-t
              border-gray-100
              pt-2
              text-[9px]
              text-gray-400
            "
          >
            <div className="flex items-center gap-1">
              <LuEye className="h-3 w-3" />
              <span>{views}</span>
            </div>

            <div className="flex items-center gap-1">
              <LuHeart className="h-3 w-3" />
              <span>{likes}</span>
            </div>

            <div className="flex items-center gap-1">
              <LuMessageCircle className="h-3 w-3" />
              <span>{comments}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TrendingPostCard;
