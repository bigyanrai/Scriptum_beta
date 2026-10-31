const DefaultLoader = () => {
  return (
    <div className="flex h-full min-h-[400px] items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Spinner */}
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>

          <div className="absolute inset-0 rounded-full border-4 border-sky-500 border-t-transparent animate-spin"></div>
        </div>

        {/* Loading Text */}
        <p className="text-center text-sm font-medium text-gray-500 animate-pulse">
          Loading your posts...
        </p>
      </div>
    </div>
  );
};

export default DefaultLoader;
