const FeaturedBlogPostSkeleton = () => {
  return (
    <div
      className="
        overflow-hidden
        rounded-sm
        border
        border-gray-200
        bg-white
        shadow-xs
      "
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* ====================================================== */}
        {/* IMAGE SKELETON */}
        {/* ====================================================== */}

        <div className="overflow-hidden rounded-sm lg:col-span-6">
          <div
            className="
              aspect-[16/9]
              w-full
              animate-pulse
              bg-gray-200
              lg:h-full
              lg:aspect-auto
              lg:min-h-[320px]
            "
          />
        </div>

        {/* ====================================================== */}
        {/* CONTENT SKELETON */}
        {/* ====================================================== */}

        <div
          className="
            flex
            flex-col
            justify-between
            p-5
            lg:col-span-6
            md:p-6
          "
        >
          <div>
            {/* ================================================== */}
            {/* TITLE */}
            {/* ================================================== */}

            <div className="space-y-2">
              <div className="h-6 w-[90%] animate-pulse rounded bg-gray-200 md:h-7" />

              <div className="h-6 w-[75%] animate-pulse rounded bg-gray-200 md:h-7" />

              <div className="h-6 w-[55%] animate-pulse rounded bg-gray-200 md:h-7" />
            </div>

            {/* ================================================== */}
            {/* DESCRIPTION */}
            {/* ================================================== */}

            <div className="mt-4 space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-gray-100" />

              <div className="h-3 w-[96%] animate-pulse rounded bg-gray-100" />

              <div className="h-3 w-[90%] animate-pulse rounded bg-gray-100" />

              <div className="h-3 w-[72%] animate-pulse rounded bg-gray-100" />
            </div>

            {/* ================================================== */}
            {/* TAGS */}
            {/* ================================================== */}

            <div className="mt-5 flex flex-wrap gap-2">
              <div className="h-6 w-16 animate-pulse rounded-sm bg-gray-100" />

              <div className="h-6 w-20 animate-pulse rounded-sm bg-gray-100" />

              <div className="h-6 w-14 animate-pulse rounded-sm bg-gray-100" />
            </div>
          </div>

          {/* ==================================================== */}
          {/* AUTHOR + STATS */}
          {/* ==================================================== */}

          <div className="mt-8 border-t border-gray-100 pt-5">
            <div className="flex items-center justify-between gap-3">
              {/* ================================================= */}
              {/* AUTHOR */}
              {/* ================================================= */}

              <div className="flex min-w-0 items-center gap-3">
                {/* Avatar */}

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

                {/* Author details */}

                <div className="min-w-0 space-y-2">
                  <div className="h-3.5 w-28 animate-pulse rounded bg-gray-200" />

                  <div className="h-2.5 w-20 animate-pulse rounded bg-gray-100" />
                </div>
              </div>

              {/* ================================================= */}
              {/* STATS */}
              {/* ================================================= */}

              <div className="flex shrink-0 items-center gap-4">
                {/* Views */}

                <div className="flex items-center gap-1">
                  <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200" />
                  <div className="h-2.5 w-6 animate-pulse rounded bg-gray-100" />
                </div>

                {/* Likes */}

                <div className="flex items-center gap-1">
                  <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200" />
                  <div className="h-2.5 w-6 animate-pulse rounded bg-gray-100" />
                </div>

                {/* Comments */}

                <div className="flex items-center gap-1">
                  <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200" />
                  <div className="h-2.5 w-6 animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogPostSkeleton;
