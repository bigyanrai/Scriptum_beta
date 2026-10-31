const TrendingPostCardSkeleton = () => {
  return (
    <article
      className="
        relative
        flex
        cursor-default
        gap-3
        overflow-hidden
        rounded-md
        border
        border-gray-200
        bg-white
        p-2
        sm:gap-4
        sm:p-3
      "
    >
      {/* ====================================================== */}
      {/* RANK */}
      {/* ====================================================== */}

      <div
        className="
          absolute
          left-0
          top-0
          z-10
          flex
          h-7
          w-7
          animate-pulse
          items-center
          justify-center
          rounded-br-md
          bg-gray-200
        "
      />

      {/* ====================================================== */}
      {/* COVER IMAGE */}
      {/* ====================================================== */}

      <div
        className="
          relative
          h-24
          w-28
          shrink-0
          animate-pulse
          overflow-hidden
          rounded-sm
          bg-gray-200
          sm:h-28
          sm:w-36
        "
      >
        {/* Trending Icon */}

        <div
          className="
            absolute
            bottom-1.5
            right-1.5
            h-6
            w-6
            animate-pulse
            rounded-full
            bg-gray-100
          "
        />
      </div>

      {/* ====================================================== */}
      {/* CONTENT */}
      {/* ====================================================== */}

      <div className="flex min-w-0 flex-1 flex-col py-0.5">
        {/* ================================================== */}
        {/* TITLE */}
        {/* ================================================== */}

        <div className="space-y-1.5">
          <div
            className="
              h-3.5
              w-[90%]
              animate-pulse
              rounded
              bg-gray-200
            "
          />

          <div
            className="
              h-3.5
              w-[65%]
              animate-pulse
              rounded
              bg-gray-200
            "
          />
        </div>

        {/* ================================================== */}
        {/* DESCRIPTION */}
        {/* ================================================== */}

        <div className="mt-2 space-y-1.5">
          <div
            className="
              h-2.5
              w-full
              animate-pulse
              rounded
              bg-gray-100
            "
          />

          <div
            className="
              h-2.5
              w-[75%]
              animate-pulse
              rounded
              bg-gray-100
            "
          />
        </div>

        {/* ================================================== */}
        {/* TAGS */}
        {/* ================================================== */}

        <div className="mt-2 flex gap-1.5">
          <div
            className="
              h-4
              w-12
              animate-pulse
              rounded-sm
              bg-gray-100
            "
          />

          <div
            className="
              h-4
              w-16
              animate-pulse
              rounded-sm
              bg-gray-100
            "
          />
        </div>

        {/* ================================================== */}
        {/* BOTTOM */}
        {/* ================================================== */}

        <div className="mt-auto pt-2">
          {/* Author + Date */}

          <div className="flex items-center justify-between gap-2">
            {/* Author */}

            <div className="flex min-w-0 items-center gap-1.5">
              <div
                className="
                  h-5
                  w-5
                  shrink-0
                  animate-pulse
                  rounded-full
                  bg-gray-200
                "
              />

              <div
                className="
                  h-2.5
                  w-16
                  animate-pulse
                  rounded
                  bg-gray-100
                "
              />
            </div>

            {/* Date */}

            <div
              className="
                h-2.5
                w-16
                shrink-0
                animate-pulse
                rounded
                bg-gray-100
              "
            />
          </div>

          {/* ================================================= */}
          {/* STATS */}
          {/* ================================================= */}

          <div
            className="
              mt-2
              flex
              items-center
              gap-3
              border-t
              border-gray-100
              pt-2
            "
          >
            {/* Views */}

            <div className="flex items-center gap-1">
              <div
                className="
                  h-3
                  w-3
                  animate-pulse
                  rounded-full
                  bg-gray-200
                "
              />

              <div
                className="
                  h-2
                  w-4
                  animate-pulse
                  rounded
                  bg-gray-100
                "
              />
            </div>

            {/* Likes */}

            <div className="flex items-center gap-1">
              <div
                className="
                  h-3
                  w-3
                  animate-pulse
                  rounded-full
                  bg-gray-200
                "
              />

              <div
                className="
                  h-2
                  w-4
                  animate-pulse
                  rounded
                  bg-gray-100
                "
              />
            </div>

            {/* Comments */}

            <div className="flex items-center gap-1">
              <div
                className="
                  h-3
                  w-3
                  animate-pulse
                  rounded-full
                  bg-gray-200
                "
              />

              <div
                className="
                  h-2
                  w-4
                  animate-pulse
                  rounded
                  bg-gray-100
                "
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TrendingPostCardSkeleton;
