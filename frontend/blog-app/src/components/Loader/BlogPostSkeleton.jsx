const BlogPostSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="
            min-w-0
            animate-pulse
            overflow-hidden
            rounded-sm
            border
            border-gray-100
            bg-white
            p-3
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            {/* ==================================================
                COVER IMAGE
            ================================================== */}

            <div
              className="
                h-20
                w-20
                shrink-0
                rounded-lg
                bg-gray-200
                sm:h-24
                sm:w-24
              "
            />

            {/* ==================================================
                CONTENT
            ================================================== */}

            <div className="min-w-0 flex-1">
              {/* Title */}

              <div className="space-y-1.5">
                <div className="h-4 w-[75%] max-w-md rounded bg-gray-200" />

                <div className="h-4 w-[45%] max-w-sm rounded bg-gray-200" />
              </div>

              {/* Tags */}

              <div className="mt-2.5 flex gap-1.5 overflow-hidden">
                <div className="h-5 w-12 shrink-0 rounded-full bg-gray-100" />
                <div className="h-5 w-16 shrink-0 rounded-full bg-gray-100" />
                <div className="h-5 w-14 shrink-0 rounded-full bg-gray-100" />
              </div>

              {/* Meta / Stats */}

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="h-3 w-20 rounded bg-gray-100" />
                <div className="h-3 w-12 rounded bg-gray-100" />
                <div className="h-3 w-14 rounded bg-gray-100" />
                <div className="h-3 w-16 rounded bg-gray-100" />
              </div>
            </div>

            {/* ==================================================
                ACTION AREA
            ================================================== */}

            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <div className="h-8 w-8 rounded-lg bg-gray-100" />
              <div className="h-8 w-8 rounded-lg bg-gray-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPostSkeleton;
