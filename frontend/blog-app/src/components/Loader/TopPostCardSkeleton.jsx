const TopPostCardSkeleton = () => {
  return (
    <div
      className="
        rounded-sm
        border
        border-transparent
        bg-white
        px-3
        py-3.5
      "
    >
      {/* ==================================================
          TOP CONTENT
      ================================================== */}

      <div className="flex min-w-0 items-center gap-3">
        {/* Rank */}
        <div
          className="
            h-7
            w-7
            shrink-0
            animate-pulse
            rounded-sm
            bg-gray-200
          "
        />

        {/* Thumbnail */}
        <div
          className="
            h-11
            w-11
            shrink-0
            animate-pulse
            rounded-sm
            bg-gray-200
          "
        />

        {/* Title + Author */}
        <div className="min-w-0 flex-1">
          {/* Title line 1 */}
          <div
            className="
              h-3
              w-[85%]
              animate-pulse
              rounded
              bg-gray-200
            "
          />

          {/* Title line 2 */}
          <div
            className="
              mt-1.5
              h-3
              w-[65%]
              animate-pulse
              rounded
              bg-gray-200
            "
          />

          {/* Author */}
          <div
            className="
              mt-2
              h-2.5
              w-24
              animate-pulse
              rounded
              bg-gray-100
            "
          />
        </div>

        {/* Trending Indicator */}
        <div
          className="
            hidden
            h-7
            w-7
            shrink-0
            animate-pulse
            rounded-lg
            bg-gray-200
            sm:block
          "
        />
      </div>

      {/* ==================================================
          VIEW PERFORMANCE
      ================================================== */}

      <div className="mt-3 pl-10">
        <div className="mb-1.5 flex items-center justify-between">
          {/* Views label */}
          <div
            className="
              h-2
              w-8
              animate-pulse
              rounded
              bg-gray-100
            "
          />

          {/* Views number */}
          <div
            className="
              h-2.5
              w-8
              animate-pulse
              rounded
              bg-gray-200
            "
          />
        </div>

        {/* Progress bar */}
        <div
          className="
            h-1.5
            w-full
            animate-pulse
            overflow-hidden
            rounded-full
            bg-gray-200
          "
        />
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
        "
      >
        {/* Views */}
        <div className="flex items-center gap-1.5">
          <div
            className="
              h-3
              w-3
              animate-pulse
              rounded-full
              bg-gray-200
            "
          />

          <div
            className="
              h-2.5
              w-7
              animate-pulse
              rounded
              bg-gray-200
            "
          />

          <div
            className="
              hidden
              h-2.5
              w-7
              animate-pulse
              rounded
              bg-gray-100
              sm:block
            "
          />
        </div>

        {/* Likes */}
        <div className="flex items-center gap-1.5">
          <div
            className="
              h-3
              w-3
              animate-pulse
              rounded-full
              bg-gray-200
            "
          />

          <div
            className="
              h-2.5
              w-7
              animate-pulse
              rounded
              bg-gray-200
            "
          />

          <div
            className="
              hidden
              h-2.5
              w-7
              animate-pulse
              rounded
              bg-gray-100
              sm:block
            "
          />
        </div>

        {/* Comments */}
        <div className="flex items-center gap-1.5">
          <div
            className="
              h-3
              w-3
              animate-pulse
              rounded-full
              bg-gray-200
            "
          />

          <div
            className="
              h-2.5
              w-7
              animate-pulse
              rounded
              bg-gray-200
            "
          />

          <div
            className="
              hidden
              h-2.5
              w-14
              animate-pulse
              rounded
              bg-gray-100
              sm:block
            "
          />
        </div>
      </div>
    </div>
  );
};

export default TopPostCardSkeleton;
