const ContentPerformanceSkeleton = () => {
  return (
    <section
      className="
        rounded-sm
        border
        border-gray-200/70
        bg-white
        p-3
        shadow-xs
      "
    >
      {/* ==================================================
          HEADER
      ================================================== */}

      <div
        className="
          mb-6
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <div className="flex items-center gap-2">
            {/* Title */}
            <div
              className="
                h-6
                w-40
                animate-pulse
                rounded
                bg-gray-200
              "
            />

            {/* 7 DAYS badge */}
            <div
              className="
                h-5
                w-14
                animate-pulse
                rounded-full
                bg-gray-200
              "
            />
          </div>

          {/* Description */}
          <div
            className="
              mt-2
              h-3
              w-64
              animate-pulse
              rounded
              bg-gray-100
            "
          />
        </div>

        {/* This Week badge */}
        <div
          className="
            flex
            h-8
            w-28
            animate-pulse
            items-center
            gap-2
            rounded-full
            bg-gray-100
            px-3
          "
        >
          <div className="h-3 w-3 rounded-full bg-gray-200" />
          <div className="h-2.5 w-14 rounded bg-gray-200" />
        </div>
      </div>

      {/* ==================================================
          WEEKLY COMPARISON
      ================================================== */}

      <div
        className="
          overflow-hidden
          rounded-sm
          border
          border-gray-100
        "
      >
        {/* Desktop header */}

        <div
          className="
            hidden
            grid-cols-4
            border-b
            border-gray-100
            bg-gray-50/70
            px-4
            py-3
            sm:grid
          "
        >
          <div />

          {[1, 2, 3].map((item) => (
            <div key={item} className="flex justify-end">
              <div
                className="
                  h-3
                  w-10
                  animate-pulse
                  rounded
                  bg-gray-200
                "
              />
            </div>
          ))}
        </div>

        {/* This Week */}

        <div
          className="
            grid
            grid-cols-2
            gap-y-3
            border-b
            border-gray-100
            px-4
            py-4
            sm:grid-cols-4
            sm:gap-0
          "
        >
          <div className="flex items-center">
            <div
              className="
                h-3
                w-16
                animate-pulse
                rounded
                bg-gray-200
              "
            />
          </div>

          {[1, 2, 3].map((item) => (
            <div key={item} className="flex flex-col sm:items-end">
              {/* Mobile label */}
              <div
                className="
                  mb-1
                  h-2
                  w-9
                  animate-pulse
                  rounded
                  bg-gray-100
                  sm:hidden
                "
              />

              {/* Value */}
              <div
                className="
                  h-4
                  w-12
                  animate-pulse
                  rounded
                  bg-gray-200
                "
              />
            </div>
          ))}
        </div>

        {/* Last Week */}

        <div
          className="
            grid
            grid-cols-2
            gap-y-3
            bg-gray-50/40
            px-4
            py-4
            sm:grid-cols-4
            sm:gap-0
          "
        >
          <div className="flex items-center">
            <div
              className="
                h-3
                w-16
                animate-pulse
                rounded
                bg-gray-100
              "
            />
          </div>

          {[1, 2, 3].map((item) => (
            <div key={item} className="flex flex-col sm:items-end">
              {/* Mobile label */}
              <div
                className="
                  mb-1
                  h-2
                  w-9
                  animate-pulse
                  rounded
                  bg-gray-100
                  sm:hidden
                "
              />

              {/* Value */}
              <div
                className="
                  h-4
                  w-12
                  animate-pulse
                  rounded
                  bg-gray-100
                "
              />
            </div>
          ))}
        </div>
      </div>

      {/* ==================================================
          OVERALL CHANGE
      ================================================== */}

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
          rounded-sm
          border
          border-gray-100
          bg-gray-50/50
          px-4
          py-3
        "
      >
        <div>
          {/* Description */}
          <div
            className="
              h-2.5
              w-40
              animate-pulse
              rounded
              bg-gray-100
            "
          />

          {/* Weekly performance */}
          <div
            className="
              mt-2
              h-3
              w-32
              animate-pulse
              rounded
              bg-gray-200
            "
          />
        </div>

        {/* Percentage */}
        <div
          className="
            h-4
            w-14
            animate-pulse
            rounded
            bg-gray-200
          "
        />
      </div>

      {/* ==================================================
          VIEWS CHART
      ================================================== */}

      <div
        className="
          mt-5
          rounded-sm
          border
          border-gray-100
          bg-white
          p-3
          sm:p-5
        "
      >
        {/* Chart Header */}

        <div
          className="
            mb-4
            flex
            items-center
            justify-between
          "
        >
          <div>
            <div
              className="
                h-4
                w-10
                animate-pulse
                rounded
                bg-gray-200
              "
            />

            <div
              className="
                mt-2
                h-3
                w-32
                animate-pulse
                rounded
                bg-gray-100
              "
            />
          </div>

          <div className="flex items-center gap-2">
            <div
              className="
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-gray-200
              "
            />

            <div
              className="
                h-2.5
                w-8
                animate-pulse
                rounded
                bg-gray-100
              "
            />
          </div>
        </div>

        {/* Views Chart Skeleton */}

        <div
          className="
            relative
            h-56
            overflow-hidden
            sm:h-64
          "
        >
          {/* Horizontal grid lines */}

          <div className="absolute inset-x-0 top-4 h-px bg-gray-100" />
          <div className="absolute inset-x-0 top-1/4 h-px bg-gray-100" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-gray-100" />
          <div className="absolute inset-x-0 top-3/4 h-px bg-gray-100" />
          <div className="absolute inset-x-0 bottom-5 h-px bg-gray-100" />

          {/* Fake chart line */}

          <div
            className="
              absolute
              bottom-[28%]
              left-[5%]
              h-1
              w-[20%]
              rotate-[-8deg]
              animate-pulse
              rounded-full
              bg-gray-200
            "
          />

          <div
            className="
              absolute
              bottom-[38%]
              left-[23%]
              h-1
              w-[18%]
              rotate-[12deg]
              animate-pulse
              rounded-full
              bg-gray-200
            "
          />

          <div
            className="
              absolute
              bottom-[48%]
              left-[41%]
              h-1
              w-[18%]
              rotate-[-5deg]
              animate-pulse
              rounded-full
              bg-gray-200
            "
          />

          <div
            className="
              absolute
              bottom-[42%]
              left-[59%]
              h-1
              w-[18%]
              rotate-[10deg]
              animate-pulse
              rounded-full
              bg-gray-200
            "
          />

          <div
            className="
              absolute
              bottom-[55%]
              left-[77%]
              h-1
              w-[18%]
              rotate-[-8deg]
              animate-pulse
              rounded-full
              bg-gray-200
            "
          />

          {/* Chart points */}

          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="
                absolute
                bottom-[42%]
                h-3
                w-3
                animate-pulse
                rounded-full
                bg-gray-200
              "
              style={{
                left: `${5 + index * 15}%`,
                bottom: `${28 + [0, 10, 20, 14, 24, 18, 28][index]}%`,
              }}
            />
          ))}

          {/* Day labels */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              flex
              justify-between
              px-4
            "
          >
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="
                  h-2.5
                  w-6
                  animate-pulse
                  rounded
                  bg-gray-100
                "
              />
            ))}
          </div>
        </div>
      </div>

      {/* ==================================================
          LIKES CHART
      ================================================== */}

      <div
        className="
          mt-5
          rounded-sm
          border
          border-gray-100
          bg-white
          p-3
          sm:p-5
        "
      >
        {/* Chart Header */}

        <div
          className="
            mb-4
            flex
            items-center
            justify-between
          "
        >
          <div>
            <div className="flex items-center gap-2">
              <div
                className="
                  h-3.5
                  w-3.5
                  animate-pulse
                  rounded-full
                  bg-gray-200
                "
              />

              <div
                className="
                  h-4
                  w-10
                  animate-pulse
                  rounded
                  bg-gray-200
                "
              />
            </div>

            <div
              className="
                mt-2
                h-3
                w-32
                animate-pulse
                rounded
                bg-gray-100
              "
            />
          </div>

          <div className="flex items-center gap-2">
            <div
              className="
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-gray-200
              "
            />

            <div
              className="
                h-2.5
                w-8
                animate-pulse
                rounded
                bg-gray-100
              "
            />
          </div>
        </div>

        {/* Likes Bars */}

        <div
          className="
            flex
            h-56
            items-end
            gap-2
            sm:h-64
            sm:gap-4
          "
        >
          {["35%", "55%", "42%", "70%", "48%", "62%", "80%"].map(
            (height, index) => (
              <div
                key={index}
                className="
                flex
                h-full
                min-w-0
                flex-1
                flex-col
                items-center
                justify-end
              "
              >
                {/* Value */}

                <div
                  className="
                  mb-2
                  h-2.5
                  w-7
                  animate-pulse
                  rounded
                  bg-gray-100
                "
                />

                {/* Bar */}

                <div
                  className="
                  w-full
                  rounded-t-lg
                  bg-gray-100
                "
                  style={{ height }}
                >
                  <div
                    className="
                    h-full
                    w-full
                    animate-pulse
                    rounded-t-lg
                    bg-gray-200
                  "
                  />
                </div>

                {/* Day */}

                <div
                  className="
                  mt-2
                  h-2.5
                  w-6
                  animate-pulse
                  rounded
                  bg-gray-100
                "
                />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};
export default ContentPerformanceSkeleton;
