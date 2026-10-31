import FeaturedBlogPostSkeleton from "../../../components/Loader/FeaturedBlogPostSkeleton";
import BlogPostSummaryCardSkeleton from "../../../components/Loader/BlogPostSummaryCardSkeleton";

const ExploreSkeleton = () => {
  return (
    <div className="space-y-20">
      {[...Array(3)].map((_, section) => (
        <div key={section}>
          <div className="mb-8">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-8 w-72 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="h-4 w-96 bg-gray-200 rounded animate-pulse" />
          </div>

          <FeaturedBlogPostSkeleton />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
            {[...Array(4)].map((_, i) => (
              <BlogPostSummaryCardSkeleton key={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExploreSkeleton;
