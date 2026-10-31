const ExploreClusterSkeleton = () => {
  return (
    <section className="relative animate-pulse">
      {/* ====================================================== */}
      {/* COLLECTION HEADER */}
      {/* ====================================================== */}

      <div className="mb-7">
        <div className="flex items-start justify-between gap-5">
          {/* Left */}
          <div className="flex min-w-0 items-start gap-3">
            {/* Number */}
            <div className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-gray-200 bg-gray-50">
              <div className="h-3 w-4 rounded bg-gray-200" />
            </div>

            {/* Heading */}
            <div className="min-w-0">
              {/* Collection label */}
              <div className="mb-1.5 flex items-center gap-2">
                <div className="h-3.5 w-3.5 rounded bg-gray-200" />

                <div className="h-2.5 w-20 rounded bg-gray-200" />
              </div>

              {/* Title */}
              <div className="h-8 w-48 rounded-md bg-gray-200 sm:h-9 sm:w-64" />

              {/* Description */}
              <div className="mt-2 space-y-1.5">
                <div className="h-3 w-72 max-w-full rounded bg-gray-100" />
                <div className="h-3 w-52 rounded bg-gray-100" />
              </div>
            </div>
          </div>

          {/* Desktop explore */}
          <div className="hidden items-center gap-1.5 pt-1 sm:flex">
            <div className="h-3 w-20 rounded bg-gray-100" />
            <div className="h-4 w-4 rounded bg-gray-100" />
          </div>
        </div>

        {/* ====================================================== */}
        {/* KEYWORDS */}
        {/* ====================================================== */}

        <div className="mt-4 flex flex-wrap gap-1.5">
          <div className="h-6 w-16 rounded-sm border border-gray-200 bg-gray-50" />
          <div className="h-6 w-20 rounded-sm border border-gray-200 bg-gray-50" />
          <div className="h-6 w-14 rounded-sm border border-gray-200 bg-gray-50" />
          <div className="h-6 w-24 rounded-sm border border-gray-200 bg-gray-50" />
          <div className="h-6 w-18 rounded-sm border border-gray-200 bg-gray-50" />
        </div>
      </div>

      {/* ====================================================== */}
      {/* DISCOVERY LAYOUT */}
      {/* ====================================================== */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        {/* ==================================================== */}
        {/* FEATURED DISCOVERY */}
        {/* ==================================================== */}

        <div className="lg:col-span-3">
          <div className="relative h-[330px] overflow-hidden rounded-sm bg-gray-200 sm:h-[390px]">
            {/* Featured badge */}
            <div className="absolute left-5 top-5">
              <div className="h-7 w-32 rounded-sm bg-gray-300" />
            </div>

            {/* Featured content */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              {/* Date / views */}
              <div className="mb-2 flex items-center gap-2">
                <div className="h-2.5 w-24 rounded bg-gray-300" />
                <div className="h-2.5 w-1.5 rounded bg-gray-300" />
                <div className="h-2.5 w-16 rounded bg-gray-300" />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <div className="h-6 w-4/5 rounded bg-gray-300 sm:h-7" />
                <div className="h-6 w-3/5 rounded bg-gray-300 sm:h-7" />
              </div>

              {/* Description */}
              <div className="mt-2 space-y-1.5">
                <div className="h-3 w-4/5 rounded bg-gray-300" />
                <div className="h-3 w-3/5 rounded bg-gray-300" />
              </div>

              {/* Author + metrics */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-full bg-gray-300" />
                  <div className="h-3 w-20 rounded bg-gray-300" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-3 w-8 rounded bg-gray-300" />
                  <div className="h-3 w-8 rounded bg-gray-300" />
                  <div className="h-4 w-4 rounded bg-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* RELATED DISCOVERIES */}
        {/* ==================================================== */}

        <div className="flex flex-col gap-3 lg:col-span-2">
          {/* Secondary card 1 */}
          <div className="flex min-h-[145px] gap-4 rounded-sm border border-gray-200 bg-white p-1">
            {/* Image */}
            <div className="relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-[135px] sm:w-[145px]">
              <div className="absolute left-2 top-2 h-6 w-6 rounded-sm bg-gray-300" />
            </div>

            {/* Content */}
            <div className="flex min-w-0 flex-1 flex-col py-0.5">
              <div className="h-2.5 w-20 rounded bg-gray-100" />

              <div className="mt-2 space-y-1.5">
                <div className="h-3.5 w-full rounded bg-gray-200" />
                <div className="h-3.5 w-4/5 rounded bg-gray-200" />
                <div className="h-3.5 w-3/5 rounded bg-gray-200" />
              </div>

              <div className="mt-auto flex items-center gap-3 pt-2">
                <div className="h-2.5 w-8 rounded bg-gray-100" />
                <div className="h-2.5 w-8 rounded bg-gray-100" />
                <div className="h-2.5 w-8 rounded bg-gray-100" />
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden items-start pt-1 sm:flex">
              <div className="h-4 w-4 rounded bg-gray-100" />
            </div>
          </div>

          {/* Secondary card 2 */}
          <div className="flex min-h-[145px] gap-4 rounded-sm border border-gray-200 bg-white p-1">
            {/* Image */}
            <div className="relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-[135px] sm:w-[145px]">
              <div className="absolute left-2 top-2 h-6 w-6 rounded-sm bg-gray-300" />
            </div>

            {/* Content */}
            <div className="flex min-w-0 flex-1 flex-col py-0.5">
              <div className="h-2.5 w-20 rounded bg-gray-100" />

              <div className="mt-2 space-y-1.5">
                <div className="h-3.5 w-full rounded bg-gray-200" />
                <div className="h-3.5 w-4/5 rounded bg-gray-200" />
                <div className="h-3.5 w-3/5 rounded bg-gray-200" />
              </div>

              <div className="mt-auto flex items-center gap-3 pt-2">
                <div className="h-2.5 w-8 rounded bg-gray-100" />
                <div className="h-2.5 w-8 rounded bg-gray-100" />
                <div className="h-2.5 w-8 rounded bg-gray-100" />
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden items-start pt-1 sm:flex">
              <div className="h-4 w-4 rounded bg-gray-100" />
            </div>
          </div>

          {/* ================================================== */}
          {/* MORE DISCOVERIES */}
          {/* ================================================== */}

          <div className="mt-auto flex w-full items-center justify-between rounded-sm border border-dashed border-gray-200 px-4 py-3.5">
            <div>
              <div className="h-3.5 w-32 rounded bg-gray-200" />

              <div className="mt-1.5 h-2.5 w-44 rounded bg-gray-100" />
            </div>

            <div className="h-4 w-4 rounded bg-gray-100" />
          </div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* MOBILE EXPLORE */}
      {/* ====================================================== */}

      <div className="mt-4 flex h-9 w-full items-center justify-center rounded-sm border border-gray-200 bg-gray-50 sm:hidden">
        <div className="h-3 w-28 rounded bg-gray-200" />
      </div>
    </section>
  );
};

export default ExploreClusterSkeleton;
