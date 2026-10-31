import TopPostCardSkeleton from "./TopPostCardSkeleton";

const TopPostsSkeleton = () => {
  return (
    <div
      className="
        custom-scrollbar
        min-h-0
        flex-1
        overflow-y-auto
        rounded-sm
        bg-gray-100
        p-1
      "
    >
      <div className="space-y-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <TopPostCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
export default TopPostsSkeleton;
