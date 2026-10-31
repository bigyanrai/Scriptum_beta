const AuthLoader = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>

          <div className="absolute inset-0 rounded-full border-4 border-sky-500 border-t-transparent animate-spin"></div>
        </div>

        {/* Loading Text */}
        <p className="text-sm font-medium text-gray-500 animate-pulse">
          Loading your workspace...
        </p>
      </div>
    </div>
  );
};

export default AuthLoader;
