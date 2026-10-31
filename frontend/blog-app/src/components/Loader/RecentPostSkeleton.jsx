const RecentPostSkeleton = () => {
  return (
    <div role="status" className="animate-pulse space-y-5">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="flex gap-4 rounded-lg border border-gray-100 bg-white p-2"
        >
          <div className="h-20 w-20 rounded-lg bg-gray-300 "></div>

          <div className="flex-1">
            <div className="mb-3 h-4 w-5/6 rounded bg-gray-300 dark:bg-gray-600"></div>

            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-3 w-10/12 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-3 w-1/3 rounded bg-gray-300 dark:bg-gray-600"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentPostSkeleton;
