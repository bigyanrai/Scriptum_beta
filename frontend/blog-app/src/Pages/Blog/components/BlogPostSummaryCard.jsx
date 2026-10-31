import { LuEye, LuHeart, LuMessageCircle, LuSparkles } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import CharAvatar from "./../../../components/CharAvatar";

const BlogPostSummaryCard = ({
  title,
  coverImageUrl,
  description,
  tags = [],
  updatedOn,
  authorName,
  authProfileImg,
  views = 0,
  comments = 0,
  likes = 0,
  score,
  sort,
  query,
  highlightText,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleTagClick = (event, tag) => {
    event.stopPropagation();
    navigate(`/tags/${tag}`);
  };

  return (
    <article
      onClick={onClick}
      className="
        group
        flex
        h-full
        cursor-pointer
        flex-col
        overflow-hidden
        rounded-md
        border
        border-gray-200
        bg-white
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-gray-300
        hover:shadow-md
      "
    >
      {/* ================================================== */}
      {/* COVER IMAGE */}
      {/* ================================================== */}

      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={coverImageUrl}
          alt={title}
          loading="lazy"
          className="
            h-40
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-[1.03]
            sm:h-44
            lg:h-40
            xl:h-44
          "
        />

        {/* Relevance Badge */}

        {sort === "relevance" && typeof score === "number" && score > 0 && (
          <div
            className="
                absolute
                right-2.5
                top-2.5
                flex
                items-center
                gap-1
                rounded-full
                bg-white/95
                px-2
                py-1
                text-[9px]
                font-semibold
                text-sky-700
                shadow-sm
                backdrop-blur
              "
          >
            <LuSparkles size={10} />
            <span>{(score * 100).toFixed(0)}% match</span>
          </div>
        )}
      </div>

      {/* ================================================== */}
      {/* CONTENT */}
      {/* ================================================== */}

      <div className="flex flex-1 flex-col  p-2">
        {/* ================================================== */}
        {/* TITLE */}
        {/* ================================================== */}

        <h2
          className="
            line-clamp-2
            text-[15px]
            font-semibold
            leading-snug
            text-gray-900
            transition-colors
            duration-200
            group-hover:text-sky-600
            sm:text-base
          "
        >
          {highlightText ? highlightText(title, query) : title}
        </h2>

        {/* ================================================== */}
        {/* DESCRIPTION */}
        {/* ================================================== */}

        <p
          className="
            mt-2
            line-clamp-2
            text-xs
            leading-5
            text-gray-500
            sm:text-[13px]
          "
        >
          {highlightText ? highlightText(description, query) : description}
        </p>

        {/* ================================================== */}
        {/* TAGS */}
        {/* ================================================== */}

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag, index) => (
              <button
                type="button"
                key={`${tag}-${index}`}
                onClick={(event) => handleTagClick(event, tag)}
                className="
                  max-w-full
                  cursor-pointer
                  truncate
                  rounded-sm
                  bg-sky-50
                  px-2
                  py-0.5
                  text-[10px]
                  font-medium
                  text-sky-700
                  transition-colors
                  duration-200
                  hover:bg-sky-100
                "
              >
                #{highlightText ? highlightText(tag, query) : tag}
              </button>
            ))}
          </div>
        )}

        {/* ================================================== */}
        {/* FLEX SPACER */}
        {/* ================================================== */}

        <div className="flex-1" />

        {/* ================================================== */}
        {/* AUTHOR + STATS */}
        {/* ================================================== */}

        <div className="mt-4 border-t border-gray-100 pt-3">
          <div
            className="
              flex
              items-center
              justify-between
              gap-2
            "
          >
            {/* ================================================= */}
            {/* AUTHOR */}
            {/* ================================================= */}

            <div className="flex min-w-0 items-center gap-2">
              {authProfileImg ? (
                <img
                  src={authProfileImg}
                  alt={authorName || "Author"}
                  loading="lazy"
                  className="
                    h-8
                    w-8
                    shrink-0
                    rounded-full
                    object-cover
                    bg-gray-100
                  "
                />
              ) : (
                <CharAvatar
                  fullName={authorName || ""}
                  width="w-8"
                  height="h-8"
                  style="text-xs"
                />
              )}

              <div className="min-w-0">
                <p
                  className="
                    max-w-[90px]
                    truncate
                    text-[11px]
                    font-semibold
                    text-gray-800
                    sm:max-w-[110px]
                  "
                >
                  {authorName || "Unknown Author"}
                </p>

                <p className="truncate text-[10px] text-gray-400">
                  {updatedOn}
                </p>
              </div>
            </div>

            {/* ================================================= */}
            {/* STATS */}
            {/* ================================================= */}

            <div
              className="
                flex
                shrink-0
                items-center
                gap-2.5
                text-[10px]
                text-gray-400
                sm:gap-3
              "
            >
              {/* Views */}

              <div className="flex items-center gap-1">
                <LuEye className="h-3.5 w-3.5" />
                <span>{views}</span>
              </div>

              {/* Likes */}

              <div className="flex items-center gap-1">
                <LuHeart className="h-3.5 w-3.5" />
                <span>{likes}</span>
              </div>

              {/* Comments */}

              <div className="flex items-center gap-1">
                <LuMessageCircle className="h-3.5 w-3.5" />
                <span>{comments}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostSummaryCard;
