import { LuEye, LuHeart, LuMessageCircle } from "react-icons/lu";
import CharAvatar from "./../../../components/CharAvatar";

const FeaturedBlogPost = ({
  title,
  coverImageUrl,
  description,
  tags = [],
  updatedOn,
  authorName,
  authProfileImg,
  views,
  likes,
  comments,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-sm border border-gray-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-sm"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Image */}

        <div className="overflow-hidden rounded-sm lg:col-span-6">
          <img
            src={coverImageUrl}
            alt={title}
            className="
              aspect-[16/9]
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
              lg:h-full
              lg:aspect-auto
            "
          />
        </div>

        {/* Content */}

        <div className="flex flex-col justify-between p-3 lg:col-span-6 ">
          <div>
            {/* Title */}

            <h2 className="line-clamp-3 text-xl font-bold leading-tight text-gray-900 md:text-2xl">
              {title}
            </h2>

            {/* Description */}

            <p className="mt-3 line-clamp-4 text-xs leading-7 text-gray-600 md:text-sm">
              {description}
            </p>

            {/* Tags */}

            <div className="mt-5 flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="rounded-sm bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author + Stats */}

          <div className="mt-8 border-t border-gray-100 pt-5">
            <div className="flex items-center justify-between gap-3">
              {/* Author */}

              <div className="flex min-w-0 items-center gap-3">
                {authProfileImg ? (
                  <img
                    src={authProfileImg}
                    alt={authorName || "Author"}
                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <CharAvatar
                    fullName={authorName || ""}
                    width="w-11"
                    height="h-11"
                    style="text-sm"
                  />
                )}

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {authorName || "Unknown Author"}
                  </p>

                  <p className="text-xs text-gray-500">{updatedOn}</p>
                </div>
              </div>

              {/* Stats */}

              <div className="flex shrink-0 items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <LuEye className="h-4 w-4" />
                  <span>{views}</span>
                </div>

                <div className="flex items-center gap-1">
                  <LuHeart className="h-4 w-4" />
                  <span>{likes}</span>
                </div>

                <div className="flex items-center gap-1">
                  <LuMessageCircle className="h-4 w-4" />
                  <span>{comments}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogPost;
