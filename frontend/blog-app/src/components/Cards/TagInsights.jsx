import CustomPieChart from "../Charts/CustomPieChart";
import { LuTag } from "react-icons/lu";

const COLORS = [
  "#2563eb",
  "#4f46e5",
  "#0891b2",
  "#0f766e",
  "#7c3aed",
  "#64748b",
  "#94a3b8",
];

// ==================================================
// TAG CLOUD
// ==================================================

const TagCloud = ({ tags = [] }) => {
  const maxCount = Math.max(...tags.map((tag) => Number(tag.count) || 0), 1);

  if (!tags.length) {
    return (
      <div className="flex min-h-[180px] items-center justify-center">
        <p className="text-xs text-gray-400">No tag data available</p>
      </div>
    );
  }

  return (
    <div
      className="
        custom-scrollbar
        h-full
        min-h-0
        max-h-[180px]
        overflow-y-auto
        pr-1
        sm:max-h-[220px]
        md:max-h-[250px]
        xl:max-h-none
      "
    >
      <div
        className="
          flex
          flex-wrap
          items-start
          gap-1
          mt-1
        "
      >
        {tags.map((tag) => {
          const count = Number(tag.count) || 0;

          const fontSize = 11 + (count / maxCount) * 2.5;

          return (
            <div
              key={tag.name}
              className="
                group
                inline-flex
                max-w-full
                items-center
                gap-1.5
                rounded-sm
                border
                border-sky-100
                bg-white
                
                px-2.5
                py-1.5
                
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-sky-200
                hover:bg-sky-50
                hover:shadow
              "
            >
              <LuTag
                className="
                  shrink-0
                  text-black
                  transition-transform
                  duration-200
                  group-hover:rotate-[-8deg]
                "
                size={12}
              />

              <span
                className="
                  min-w-0
                  max-w-[110px]
                  truncate
                  whitespace-nowrap
                  font-medium
                  leading-none
                  text-black
                  sm:max-w-[140px]
                  md:max-w-[160px]
                "
                style={{ fontSize }}
                title={`#${tag.name}`}
              >
                #{tag.name}
              </span>

              <span
                className="
                  shrink-0
                  rounded-full
                  bg-blue-500
                  px-1.5
                  py-0.5
                  text-[9px]
                  font-semibold
                  leading-none
                  text-white
                "
              >
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==================================================
// TAG INSIGHTS
// ==================================================

const TagInsights = ({ tagUsage = [], loading }) => {
  const processedData = (() => {
    const sorted = [...tagUsage].sort(
      (a, b) => (Number(b.count) || 0) - (Number(a.count) || 0),
    );

    const topFour = sorted.slice(0, 4);
    const others = sorted.slice(4);

    const othersCount = others.reduce(
      (sum, item) => sum + (Number(item.count) || 0),
      0,
    );

    const finalData = topFour.map((item) => ({
      name: item.tag,
      count: Number(item.count) || 0,
    }));

    if (othersCount > 0) {
      finalData.push({
        name: "Others",
        count: othersCount,
      });
    }

    return finalData;
  })();

  // ==================================================
  // EMPTY STATE
  // ==================================================

  if (loading) {
    return <TagInsightsSkeleton />;
  }

  if (!tagUsage.length) {
    return (
      <div
        className="
          flex
          h-full
          min-h-[300px]
          items-center
          justify-center
          rounded-sm
          border
          border-gray-200
          bg-gray-50/50
          px-5
          py-10
        "
      >
        <div className="text-center">
          <div
            className="
              mx-auto
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-sm
              bg-sky-50
              text-sky-400
            "
          >
            <LuTag size={20} />
          </div>

          <p className="mt-3 text-sm font-semibold text-gray-700">
            No tags available
          </p>

          <p
            className="
              mt-1
              max-w-xs
              text-xs
              leading-5
              text-gray-400
            "
          >
            Tags will appear here after publishing posts.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        h-full
        min-h-0
        grid-cols-1
        gap-4
        xl:grid-cols-12
      "
    >
      {/* ==================================================
          PIE CHART
      ================================================== */}

      <div className="min-h-0 min-w-0 xl:col-span-7">
        <div
          className="
            flex
            h-full
            min-h-0
            min-w-0
            flex-col
            overflow-hidden
            rounded-sm
            border
            border-sky-100
            bg-gradient-to-br
            from-sky-50/80
            via-white
            to-white
            p-3
            
          "
        >
          {/* Header */}

          <div
            className="
              flex
              min-w-0
              items-start
              justify-between
              gap-3
            "
          >
            <div className="min-w-0">
              <h4
                className="
                  truncate
                  text-sm
                  font-semibold
                  text-gray-800
                "
              >
                Tag Distribution
              </h4>

              <p
                className="
                  mt-0.5
                  truncate
                  text-[11px]
                  text-gray-400
                "
              >
                Usage across published posts
              </p>
            </div>
          </div>

          {/* Chart */}

          <div
            className="
              mt-2
              flex
              min-h-0
              flex-1
              items-center
              justify-center
            "
          >
            <div
              className="
                h-[220px]
                w-full
                min-w-0
                sm:h-[250px]
                md:h-[270px]
              "
            >
              <CustomPieChart data={processedData} colors={COLORS} />
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          POPULAR TAGS
      ================================================== */}

      <div className="min-h-0 min-w-0 xl:col-span-5">
        <div
          className="
            flex
            h-full
            min-h-0
            min-w-0
            flex-col
            rounded-sm
            border
            border-gray-200
            bg-gray-50/50
            p-3
           
          "
        >
          {/* Header */}

          <div
            className="
              flex
              items-start
              justify-between
              gap-3
            "
          >
            <div className="min-w-0">
              <h4
                className="
                  truncate
                  text-sm
                  font-semibold
                  text-gray-800
                "
              >
                Popular Tags
              </h4>

              <p
                className="
                  mt-0.5
                  text-[11px]
                  text-gray-400
                "
              >
                Ordered by usage frequency
              </p>
            </div>

            <div
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-sky-50
                text-sky-500
              "
            >
              <LuTag size={13} />
            </div>
          </div>

          {/* Divider */}

          <div className="my-3 h-px bg-gray-200/70" />

          {/* Tag Cloud */}

          <div className="min-h-0 flex-1">
            <TagCloud
              tags={tagUsage.map((item) => ({
                name: item.tag || "",
                count: Number(item.count) || 0,
              }))}
            />
          </div>

          {/* Bottom Summary */}

          <div
            className="
              mt-3
              flex
              items-center
              justify-between
              border-t
              border-gray-200/70
              pt-3
            "
          >
            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-wider
                text-gray-400
              "
            >
              Total Tags
            </span>

            <span
              className="
                rounded-full
                bg-white
                px-2
                py-1
                text-[10px]
                font-semibold
                text-gray-700
                shadow-sm
                ring-1
                ring-gray-200
              "
            >
              {tagUsage.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TagInsightsSkeleton = () => {
  return (
    <div
      className="
        grid
        h-full
        min-h-0
        grid-cols-1
        gap-4
        xl:grid-cols-12
      "
    >
      {/* ==================================================
          PIE CHART SKELETON
      ================================================== */}

      <div className="min-h-0 min-w-0 xl:col-span-7">
        <div
          className="
            flex
            h-full
            min-h-0
            min-w-0
            flex-col
            overflow-hidden
            rounded-sm
            border
            border-gray-200
            bg-gray-50/50
            p-3
          "
        >
          {/* Header */}

          <div className="min-w-0">
            <div
              className="
                h-4
                w-28
                animate-pulse
                rounded
                bg-gray-200
              "
            />

            <div
              className="
                mt-1.5
                h-3
                w-44
                animate-pulse
                rounded
                bg-gray-200/80
              "
            />
          </div>

          {/* Chart */}

          <div
            className="
              mt-2
              flex
              min-h-0
              flex-1
              items-center
              justify-center
            "
          >
            <div
              className="
                h-[180px]
                w-[180px]
                animate-pulse
                rounded-full
                border-[32px]
                border-gray-200
                sm:h-[200px]
                sm:w-[200px]
                md:h-[220px]
                md:w-[220px]
              "
            />
          </div>
        </div>
      </div>

      {/* ==================================================
          POPULAR TAGS SKELETON
      ================================================== */}

      <div className="min-h-0 min-w-0 xl:col-span-5">
        <div
          className="
            flex
            h-full
            min-h-0
            min-w-0
            flex-col
            rounded-sm
            border
            border-gray-200
            bg-gray-50/50
            p-3
          "
        >
          {/* Header */}

          <div
            className="
              flex
              items-start
              justify-between
              gap-3
            "
          >
            <div className="min-w-0">
              <div
                className="
                  h-4
                  w-24
                  animate-pulse
                  rounded
                  bg-gray-200
                "
              />

              <div
                className="
                  mt-1.5
                  h-3
                  w-40
                  animate-pulse
                  rounded
                  bg-gray-200/80
                "
              />
            </div>

            <div
              className="
                h-7
                w-7
                shrink-0
                animate-pulse
                rounded-lg
                bg-gray-200
              "
            />
          </div>

          {/* Divider */}

          <div className="my-3 h-px bg-gray-200/70" />

          {/* Tag Cloud */}

          <div className="min-h-0 flex-1">
            <div
              className="
                custom-scrollbar
                flex
                h-full
                max-h-[180px]
                flex-wrap
                content-start
                gap-2
                overflow-hidden
                pr-1
                sm:max-h-[220px]
                md:max-h-[250px]
                xl:max-h-none
              "
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="
                    h-7
                    animate-pulse
                    rounded-full
                    bg-gray-200
                  "
                  style={{
                    width: `${65 + (index % 4) * 18}px`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bottom Summary */}

          <div
            className="
              mt-3
              flex
              items-center
              justify-between
              border-t
              border-gray-200/70
              pt-3
            "
          >
            <div
              className="
                h-2.5
                w-16
                animate-pulse
                rounded
                bg-gray-200
              "
            />

            <div
              className="
                h-6
                w-8
                animate-pulse
                rounded-full
                bg-gray-200
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TagInsights;
