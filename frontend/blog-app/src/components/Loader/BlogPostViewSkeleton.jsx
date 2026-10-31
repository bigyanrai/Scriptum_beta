import React from "react";

const Shimmer = ({ className = "" }) => {
  return (
    <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />
  );
};

const BlogPostViewSkeleton = () => {
  return (
    <div className="px-1 mb-10">
      <div className="w-full">
        {/* ================================================= */}
        {/* BACK BUTTON */}
        {/* ================================================= */}

        <div className="mb-5">
          <Shimmer className="h-9 w-24 rounded-lg" />
        </div>

        {/* ================================================= */}
        {/* TITLE */}
        {/* ================================================= */}

        <div className="mb-4 max-w-4xl">
          <Shimmer className="h-9 sm:h-10 md:h-12 w-[92%] rounded-md" />

          <Shimmer className="h-9 sm:h-10 md:h-12 w-[68%] rounded-md mt-2" />
        </div>

        {/* ================================================= */}
        {/* META / TAGS / SUMMARY */}
        {/* ================================================= */}

        <div className="flex items-center gap-2 flex-wrap mt-4 mb-7">
          <Shimmer className="h-4 w-28 rounded-sm" />

          <Shimmer className="h-5 w-5 rounded-full" />

          <Shimmer className="h-6 w-16 rounded-sm" />
          <Shimmer className="h-6 w-20 rounded-sm" />
          <Shimmer className="h-6 w-24 rounded-sm" />

          <Shimmer className="h-5 w-5 rounded-full" />

          <Shimmer className="h-7 w-36 rounded-sm" />
        </div>

        {/* ================================================= */}
        {/* MAIN CONTENT WIDTH */}
        {/* ================================================= */}

        <div className="w-full md:w-[75%] mx-auto">
          {/* ================================================= */}
          {/* COVER IMAGE */}
          {/* ================================================= */}

          <div className="relative w-full h-72 sm:h-80 md:h-96 mb-8 overflow-hidden rounded-md">
            <Shimmer className="w-full h-full rounded-md" />

            {/* Fake image viewer button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Shimmer className="h-12 w-12 rounded-full opacity-60" />
            </div>
          </div>

          {/* ================================================= */}
          {/* ARTICLE CONTENT */}
          {/* ================================================= */}

          <div className="space-y-4">
            <Shimmer className="h-5 w-full rounded-sm" />
            <Shimmer className="h-5 w-[96%] rounded-sm" />
            <Shimmer className="h-5 w-[88%] rounded-sm" />

            <div className="h-3" />

            <Shimmer className="h-7 w-[55%] rounded-sm" />

            <Shimmer className="h-5 w-full rounded-sm" />
            <Shimmer className="h-5 w-[94%] rounded-sm" />
            <Shimmer className="h-5 w-[82%] rounded-sm" />

            <div className="h-3" />

            <Shimmer className="h-5 w-[98%] rounded-sm" />
            <Shimmer className="h-5 w-[90%] rounded-sm" />
            <Shimmer className="h-5 w-[72%] rounded-sm" />

            <div className="h-4" />

            {/* Quote / highlighted content */}
            <div className="border-l-4 border-gray-200 pl-4 space-y-2">
              <Shimmer className="h-5 w-[92%] rounded-sm" />
              <Shimmer className="h-5 w-[70%] rounded-sm" />
            </div>

            <div className="h-3" />

            <Shimmer className="h-7 w-[48%] rounded-sm" />

            <Shimmer className="h-5 w-full rounded-sm" />
            <Shimmer className="h-5 w-[93%] rounded-sm" />
            <Shimmer className="h-5 w-[78%] rounded-sm" />
          </div>

          {/* ================================================= */}
          {/* SHARE / BOOKMARK */}
          {/* ================================================= */}

          <div className="flex items-center justify-between gap-3 my-8">
            {/* Share button */}
            <Shimmer className="h-9 w-24 rounded-full" />

            {/* Save button */}
            <Shimmer className="h-10 w-24 rounded-full" />
          </div>
        </div>

        {/* ================================================= */}
        {/* COMMENTS */}
        {/* ================================================= */}

        <div className="mt-10">
          <div className="w-full mx-auto">
            {/* Comments Header */}

            <div className="flex items-center justify-between gap-3 mb-6 px-1">
              <div>
                <Shimmer className="h-7 w-28 rounded-md" />

                <Shimmer className="h-4 w-20 rounded-sm mt-2" />
              </div>

              <Shimmer className="h-9 w-28 sm:w-32 rounded-lg" />
            </div>

            {/* ================================================= */}
            {/* COMMENT CARDS */}
            {/* ================================================= */}

            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-gray-100 bg-white p-4"
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}

                    <Shimmer className="h-9 w-9 rounded-full shrink-0" />

                    <div className="flex-1 min-w-0">
                      {/* Author */}

                      <div className="flex items-center gap-2 mb-2">
                        <Shimmer className="h-4 w-24 rounded-sm" />
                        <Shimmer className="h-3 w-16 rounded-sm" />
                      </div>

                      {/* Comment */}

                      <div className="space-y-2">
                        <Shimmer className="h-4 w-[96%] rounded-sm" />
                        <Shimmer className="h-4 w-[82%] rounded-sm" />
                      </div>

                      {/* Comment actions */}

                      <div className="flex items-center gap-4 mt-4">
                        <Shimmer className="h-4 w-12 rounded-sm" />
                        <Shimmer className="h-4 w-14 rounded-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ================================================= */}
            {/* MORE COMMENT PLACEHOLDER */}
            {/* ================================================= */}

            <div className="mt-4 rounded-xl border border-dashed border-gray-200 px-4 py-8">
              <div className="flex flex-col items-center gap-2">
                <Shimmer className="h-4 w-28 rounded-sm" />
                <Shimmer className="h-3 w-40 rounded-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* FLOATING LIKE / COMMENT BUTTON */}
        {/* ================================================= */}

        <div className="fixed left-4 bottom-6 z-30">
          <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2 py-2 shadow-lg">
            <Shimmer className="h-9 w-16 rounded-full" />
            <Shimmer className="h-9 w-16 rounded-full" />
          </div>
        </div>

        {/* ================================================= */}
        {/* SIDEBAR TOGGLE */}
        {/* ================================================= */}

        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-30">
          <Shimmer className="h-24 w-9 rounded-l-xl" />
        </div>
      </div>
    </div>
  );
};

export default BlogPostViewSkeleton;
