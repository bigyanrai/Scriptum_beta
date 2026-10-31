const CollectionBlogCardSkeleton = () => {
  return (
    <div
      className="
     animate-pulse
     relative
     flex
     flex-col
     overflow-hidden
     border
     border-gray-200
     bg-white
     md:flex-row
   "
    >
      {/* ====================================================== */}
      {/* ARTICLE NUMBER */}
      {/* ====================================================== */}
      ```
      <div
        className="
      absolute
      left-4
      top-4
      z-10
      h-7
      w-7
      rounded-md
      bg-gray-300
      md:left-5
      md:top-5
    "
      />
      {/* ====================================================== */}
      {/* COVER */}
      {/* ====================================================== */}
      <div
        className="
      relative
      h-auto
      shrink-0
      overflow-hidden
      bg-gray-200
      md:w-64
      lg:w-72
    "
      >
        <div className="aspect-[16/10] w-full md:h-full md:aspect-auto" />
      </div>
      {/* ====================================================== */}
      {/* CONTENT */}
      {/* ====================================================== */}
      <div
        className="
      flex
      min-w-0
      flex-1
      flex-col
      px-5
      py-5
      md:px-6
      md:py-5
    "
      >
        {/* ================================================== */}
        {/* TOP META */}
        {/* ================================================== */}

        <div className="flex items-center justify-between gap-4">
          {/* Date */}
          <div className="h-3 w-24 rounded bg-gray-200" />

          {/* Arrow */}
          <div className="h-5 w-5 shrink-0 rounded bg-gray-100" />
        </div>

        {/* ================================================== */}
        {/* TITLE */}
        {/* ================================================== */}

        <div className="mt-3 space-y-2">
          <div className="h-5.5 w-4/5 rounded bg-gray-200" />
          <div className="h-5.5 w-3/5 rounded bg-gray-200" />
        </div>

        {/* ================================================== */}
        {/* DESCRIPTION */}
        {/* ================================================== */}

        <div className="mt-4 max-w-3xl space-y-2">
          <div className="h-3.5 w-full rounded bg-gray-100" />
          <div className="h-3.5 w-4/5 rounded bg-gray-100" />
        </div>

        {/* ================================================== */}
        {/* TAGS */}
        {/* ================================================== */}

        <div className="mt-4 flex flex-wrap gap-1.5">
          <div className="h-6 w-14 rounded-md border border-gray-200 bg-gray-100" />
          <div className="h-6 w-18 rounded-md border border-gray-200 bg-gray-100" />
          <div className="h-6 w-16 rounded-md border border-gray-200 bg-gray-100" />
          <div className="h-6 w-20 rounded-md border border-gray-200 bg-gray-100" />
        </div>

        {/* ================================================== */}
        {/* BOTTOM */}
        {/* ================================================== */}

        <div
          className="
        mt-5
        flex
        flex-col
        gap-4
        border-t
        border-gray-100
        pt-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
        >
          {/* ================================================== */}
          {/* AUTHOR */}
          {/* ================================================== */}

          <div className="flex min-w-0 items-center gap-2.5">
            {/* Avatar */}
            <div className="h-8 w-8 shrink-0 rounded-full bg-gray-200" />

            {/* Author info */}
            <div className="min-w-0">
              <div className="h-3 w-24 rounded bg-gray-200" />
              <div className="mt-1.5 h-2.5 w-12 rounded bg-gray-100" />
            </div>
          </div>

          {/* ================================================== */}
          {/* ENGAGEMENT */}
          {/* ================================================== */}

          <div className="flex items-center gap-4">
            {/* Views */}
            <SkeletonEngagement />

            {/* Likes */}
            <SkeletonEngagement />

            {/* Comments */}
            <SkeletonEngagement />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// ENGAGEMENT SKELETON
// ============================================================

const SkeletonEngagement = () => {
  return (
    <div className="flex items-center gap-1.5">
      {" "}
      <div className="h-3.5 w-3.5 rounded bg-gray-100" />{" "}
      <div className="h-3 w-7 rounded bg-gray-100" />{" "}
    </div>
  );
};

export default CollectionBlogCardSkeleton;
