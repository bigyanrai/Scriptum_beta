const BlogPostSummaryCardSkeleton = () => {
  return (
    <article
      className="
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-md
        border
        border-gray-200
        bg-white
      "
    >
      {/* ================================================== */}
      {/* COVER IMAGE */}
      {/* ================================================== */}

      <div className="relative overflow-hidden bg-gray-100">
        <div
          className="
            h-40
            w-full
            animate-pulse
            bg-gray-200
            sm:h-44
            lg:h-40
            xl:h-44
          "
        />

        {/* Relevance Badge */}

        <div
          className="
            absolute
            right-2.5
            top-2.5
            h-5
            w-20
            animate-pulse
            rounded-full
            bg-gray-100
          "
        />
      </div>

      {/* ================================================== */}
      {/* CONTENT */}
      {/* ================================================== */}

      <div className="flex flex-1 flex-col p-2">
        {/* ================================================== */}
        {/* TITLE */}
        {/* ================================================== */}

        <div className="space-y-1.5">
          <div
            className="
              h-4
              w-[92%]
              animate-pulse
              rounded
              bg-gray-200
            "
          />

          <div
            className="
              h-4
              w-[68%]
              animate-pulse
              rounded
              bg-gray-200
            "
          />
        </div>

        {/* ================================================== */}
        {/* DESCRIPTION */}
        {/* ================================================== */}

        <div className="mt-2 space-y-1.5">
          <div
            className="
              h-3
              w-full
              animate-pulse
              rounded
              bg-gray-100
            "
          />

          <div
            className="
              h-3
              w-[82%]
              animate-pulse
              rounded
              bg-gray-100
            "
          />
        </div>

        {/* ================================================== */}
        {/* TAGS */}
        {/* ================================================== */}

        <div className="mt-3 flex flex-wrap gap-1.5">
          <div
            className="
              h-5
              w-12
              animate-pulse
              rounded-sm
              bg-gray-100
            "
          />

          <div
            className="
              h-5
              w-16
              animate-pulse
              rounded-sm
              bg-gray-100
            "
          />

          <div
            className="
              h-5
              w-14
              animate-pulse
              rounded-sm
              bg-gray-100
            "
          />
        </div>

        {/* ================================================== */}
        {/* FLEX SPACER */}
        {/* ================================================== */}

        <div className="flex-1" />

        {/* ================================================== */}
        {/* AUTHOR + STATS */}
        {/* ================================================== */}

        <div className="mt-4 border-t border-gray-100 pt-3">
          <div className="flex items-center justify-between gap-2">
            {/* ================================================= */}
            {/* AUTHOR */}
            {/* ================================================= */}

            <div className="flex min-w-0 items-center gap-2">
              {/* Avatar */}

              <div
                className="
                  h-8
                  w-8
                  shrink-0
                  animate-pulse
                  rounded-full
                  bg-gray-200
                "
              />

              {/* Author Info */}

              <div className="min-w-0 space-y-1.5">
                <div
                  className="
                    h-2.5
                    w-20
                    animate-pulse
                    rounded
                    bg-gray-200
                  "
                />

                <div
                  className="
                    h-2
                    w-14
                    animate-pulse
                    rounded
                    bg-gray-100
                  "
                />
              </div>
            </div>

            {/* ================================================= */}
            {/* STATS */}
            {/* ================================================= */}

            <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
              {/* Views */}

              <div className="flex items-center gap-1">
                <div
                  className="
                    h-3.5
                    w-3.5
                    animate-pulse
                    rounded-full
                    bg-gray-200
                  "
                />

                <div
                  className="
                    h-2
                    w-4
                    animate-pulse
                    rounded
                    bg-gray-100
                  "
                />
              </div>

              {/* Likes */}

              <div className="flex items-center gap-1">
                <div
                  className="
                    h-3.5
                    w-3.5
                    animate-pulse
                    rounded-full
                    bg-gray-200
                  "
                />

                <div
                  className="
                    h-2
                    w-4
                    animate-pulse
                    rounded
                    bg-gray-100
                  "
                />
              </div>

              {/* Comments */}

              <div className="flex items-center gap-1">
                <div
                  className="
                    h-3.5
                    w-3.5
                    animate-pulse
                    rounded-full
                    bg-gray-200
                  "
                />

                <div
                  className="
                    h-2
                    w-4
                    animate-pulse
                    rounded
                    bg-gray-100
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostSummaryCardSkeleton;
