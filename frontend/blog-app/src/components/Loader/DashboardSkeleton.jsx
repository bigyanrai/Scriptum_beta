const DashboardSkeleton = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-1 md:p-2 animate-pulse">
      {/* Header */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/70">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-8 w-72 bg-gray-200 rounded-lg"></div>
            <div className="h-4 w-44 bg-gray-200 rounded"></div>
          </div>

          <div className="hidden md:block">
            <div className="h-6 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-5"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-200 mb-4"></div>

              <div className="h-4 w-20 bg-gray-200 rounded mb-3"></div>

              <div className="h-8 w-14 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
        {/* Tag Insights */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl border border-gray-200 p-6 md:p-7">
          <div className="space-y-3 mb-6">
            <div className="h-6 w-36 bg-gray-200 rounded"></div>
            <div className="h-4 w-56 bg-gray-200 rounded"></div>
          </div>

          <div className="space-y-5 mt-8">
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                  <div className="h-3 w-8 bg-gray-200 rounded"></div>
                </div>

                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gray-300 rounded-full ${
                      i % 3 === 0 ? "w-3/4" : i % 3 === 1 ? "w-2/3" : "w-1/2"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Posts */}
        <div className="col-span-12 md:col-span-5 bg-white rounded-3xl border border-gray-200 p-6 md:p-7">
          <div className="space-y-3 mb-6">
            <div className="h-6 w-28 bg-gray-200 rounded"></div>
            <div className="h-4 w-44 bg-gray-200 rounded"></div>
          </div>

          <div className="space-y-5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-xl bg-gray-200"></div>

                <div className="flex-1">
                  <div className="h-4 w-full bg-gray-200 rounded mb-3"></div>

                  <div className="h-3 w-3/4 bg-gray-200 rounded mb-3"></div>

                  <div className="h-2 w-full bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Comments */}
        <div className="col-span-12 bg-white rounded-3xl border border-gray-200 p-6 md:p-7">
          <div className="space-y-3 mb-6">
            <div className="h-6 w-44 bg-gray-200 rounded"></div>
            <div className="h-4 w-64 bg-gray-200 rounded"></div>
          </div>

          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100"
              >
                <div className="w-11 h-11 rounded-full bg-gray-200 flex-shrink-0"></div>

                <div className="flex-1">
                  <div className="flex gap-2 items-center mb-3">
                    <div className="h-4 w-28 bg-gray-200 rounded"></div>
                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                  </div>

                  <div className="space-y-2">
                    <div className="h-3 w-full bg-gray-200 rounded"></div>
                    <div className="h-3 w-11/12 bg-gray-200 rounded"></div>
                    <div className="h-3 w-4/5 bg-gray-200 rounded"></div>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-200"></div>

                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
