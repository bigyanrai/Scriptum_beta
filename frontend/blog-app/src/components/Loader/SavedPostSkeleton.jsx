const SavedPostCardSkeleton = () => {
  return (
    <div className="animate-pulse border border-gray-200 bg-white">
      <div className="flex flex-col md:flex-row">
        {/* ====================================================== */}
        {/* COVER IMAGE */}
        {/* ====================================================== */}

        <div className="h-52 w-full shrink-0 bg-gray-200 md:h-auto md:min-h-[250px] md:w-64 lg:w-72" />

        {/* ====================================================== */}
        {/* CONTENT */}
        {/* ====================================================== */}

        <div className="flex min-w-0 flex-1 flex-col px-5 py-5 md:px-6">
          {/* ================================================== */}
          {/* TOP META */}
          {/* ================================================== */}

          <div className="flex items-center justify-between gap-4">
            <div className="h-3 w-24 rounded bg-gray-100" />

            {/* Bookmark placeholder */}
            <div className="h-8 w-8 rounded-md bg-gray-100" />
          </div>

          {/* ================================================== */}
          {/* TITLE */}
          {/* ================================================== */}

          <div className="mt-3 space-y-2">
            <div className="h-6 w-4/5 rounded bg-gray-200" />
            <div className="h-6 w-3/5 rounded bg-gray-200" />
          </div>

          {/* ================================================== */}
          {/* DESCRIPTION */}
          {/* ================================================== */}

          <div className="mt-4 space-y-2">
            <div className="h-3.5 w-full rounded bg-gray-100" />
            <div className="h-3.5 w-11/12 rounded bg-gray-100" />
            <div className="h-3.5 w-3/4 rounded bg-gray-100" />
          </div>

          {/* ================================================== */}
          {/* TAGS */}
          {/* ================================================== */}

          <div className="mt-5 flex flex-wrap gap-1.5">
            <div className="h-6 w-14 rounded-md bg-gray-100" />
            <div className="h-6 w-20 rounded-md bg-gray-100" />
            <div className="h-6 w-16 rounded-md bg-gray-100" />
          </div>

          {/* ================================================== */}
          {/* FOOTER */}
          {/* ================================================== */}

          <div className="mt-5 flex flex-col gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Author */}

            <div className="flex min-w-0 items-center gap-2.5">
              <div className="h-9 w-9 shrink-0 rounded-full bg-gray-200" />

              <div className="min-w-0">
                <div className="h-3.5 w-24 rounded bg-gray-200" />

                <div className="mt-2 flex items-center gap-2">
                  <div className="h-2.5 w-14 rounded bg-gray-100" />
                  <div className="h-2.5 w-2 rounded-full bg-gray-100" />
                  <div className="h-2.5 w-20 rounded bg-gray-100" />
                </div>
              </div>
            </div>

            {/* Engagement */}

            <div className="flex items-center gap-4">
              <div className="h-3.5 w-9 rounded bg-gray-100" />
              <div className="h-3.5 w-9 rounded bg-gray-100" />
              <div className="h-3.5 w-9 rounded bg-gray-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedPostCardSkeleton;
