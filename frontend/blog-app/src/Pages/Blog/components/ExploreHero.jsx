import { LuCompass, LuSparkles, LuArrowRight } from "react-icons/lu";

const ExploreHero = ({ totalClusters = 0, totalBlogs = 0, topics = [] }) => {
  return (
    <section className="relative overflow-hidden rounded-sm border border-gray-200 bg-gradient-to-br from-sky-50 via-white to-indigo-50 px-6 py-8 md:px-10 md:py-10 mb-10">
      {/* Background Blur */}
      <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-sky-200/30 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-indigo-200/25 blur-3xl" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Left */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-100/80 px-3 py-1.5 text-xs font-semibold text-sky-700">
            <LuCompass className="text-sm" />
            Explore Collections
          </div>

          <h1 className="mt-4 text-3xl md:text-4xl font-bold leading-tight text-gray-900">
            Discover blogs grouped by
            <span className="text-sky-600"> similar interests</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm md:text-base leading-7 text-gray-600">
            Browse AI-organized collections of articles and discover related
            stories, tutorials, technologies, movies, music, and much more.
          </p>

          {topics.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {topics.slice(0, 6).map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-sky-100 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition hover:border-sky-300 hover:bg-sky-50"
                >
                  #{topic}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right */}
        <div className="hidden lg:block w-72 shrink-0">
          <div className="rounded-sm border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100">
                <LuSparkles className="text-sky-600 text-lg" />
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  AI Collections
                </h3>

                <p className="text-xs text-gray-500">Organized automatically</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Collections</span>

                <span className="text-lg font-bold text-gray-900">
                  {totalClusters}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Articles</span>

                <span className="text-lg font-bold text-gray-900">
                  {totalBlogs}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Popular Topic</span>

                <span className="max-w-[110px] truncate text-sm font-semibold text-sky-600">
                  {topics[0] || "-"}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-sm font-medium text-gray-700">
                <span>Start Reading</span>

                <LuArrowRight className="text-base" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreHero;
