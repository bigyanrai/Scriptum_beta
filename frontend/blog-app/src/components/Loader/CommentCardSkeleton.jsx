const CommentCardSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-gray-200 bg-white p-4 animate-pulse"
        >
          <div className="flex justify-between gap-4">
            {/* Left */}
            <div className="flex flex-1 gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-300"></div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-3 w-24 rounded bg-gray-300"></div>
                  <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                  <div className="h-3 w-20 rounded bg-gray-300"></div>
                </div>

                <div className="space-y-2">
                  <div className="h-3 rounded bg-gray-200 w-full"></div>
                  <div className="h-3 rounded bg-gray-200 w-4/5"></div>
                </div>

                <div className="flex gap-2 mt-4">
                  <div className="h-7 w-16 rounded-full bg-gray-200"></div>
                  <div className="h-7 w-24 rounded-full bg-gray-200"></div>
                  <div className="h-7 w-28 rounded-full bg-gray-200"></div>
                  <div className="h-7 w-24 rounded-full bg-gray-200"></div>
                </div>
              </div>
            </div>

            {/* Post preview */}
            <div className="hidden md:flex items-center gap-3">
              <div className="h-10 w-16 rounded-lg bg-gray-300"></div>

              <div className="space-y-2">
                <div className="h-3 w-28 rounded bg-gray-300"></div>
                <div className="h-3 w-20 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentCardSkeleton;
