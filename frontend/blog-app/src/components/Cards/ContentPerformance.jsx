import {
  LuChartLine,
  LuHeart,
  LuTrendingDown,
  LuTrendingUp,
} from "react-icons/lu";
import ContentPerformanceSkeleton from "../Loader/ContentPerformaceSkeleton";

const ContentPerformance = ({
  loading,
  thisWeek = {
    views: 0,
    likes: 0,
    comments: 0,
  },
  lastWeek = {
    views: 0,
    likes: 0,
    comments: 0,
  },
  changes = {
    views: 0,
    likes: 0,
    comments: 0,
  },
  dailyViews = [],
  dailyLikes = [],
}) => {
  const formatNumber = (value) => {
    return Number(value || 0).toLocaleString();
  };

  const viewsChange = Number(changes.views) || 0;
  const likesChange = Number(changes.likes) || 0;

  const isPositive = viewsChange > 0;
  const isNegative = viewsChange < 0;

  /*
   * --------------------------------------------------
   * VIEWS CHART DATA
   * --------------------------------------------------
   */

  const chartWidth = 1000;
  const chartHeight = 300;

  const chartPaddingX = 35;
  const chartPaddingTop = 25;
  const chartPaddingBottom = 35;

  const usableWidth = chartWidth - chartPaddingX * 2;
  const usableHeight = chartHeight - chartPaddingTop - chartPaddingBottom;

  const maxViews = Math.max(
    ...dailyViews.map((item) => Number(item.views) || 0),
    1,
  );

  const points = dailyViews.map((item, index) => {
    const views = Number(item.views) || 0;

    const x =
      dailyViews.length === 1
        ? chartWidth / 2
        : chartPaddingX + (index / (dailyViews.length - 1)) * usableWidth;

    const y =
      chartPaddingTop + usableHeight - (views / maxViews) * usableHeight;

    return {
      x,
      y,
      views,
      day: item.day,
    };
  });

  const linePath =
    points.length > 0
      ? points
          .map((point, index) => {
            if (index === 0) {
              return `M ${point.x} ${point.y}`;
            }

            const previous = points[index - 1];

            const controlX = (previous.x + point.x) / 2;

            return `C ${controlX} ${previous.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
          })
          .join(" ")
      : "";

  const areaPath =
    points.length > 0
      ? `${linePath}
         L ${points[points.length - 1].x} ${chartHeight - chartPaddingBottom}
         L ${points[0].x} ${chartHeight - chartPaddingBottom}
         Z`
      : "";

  /*
   * --------------------------------------------------
   * VIEWS Y AXIS
   * --------------------------------------------------
   */

  const chartSteps = 4;

  const yAxisValues = Array.from({ length: chartSteps + 1 }, (_, index) => {
    return Math.round(maxViews - (maxViews / chartSteps) * index);
  });

  /*
   * --------------------------------------------------
   * LIKES CHART DATA
   * --------------------------------------------------
   */

  const maxLikes = Math.max(
    ...dailyLikes.map((item) => Number(item.likes) || 0),
    1,
  );

  /*
   * --------------------------------------------------
   * RENDER
   * --------------------------------------------------
   */

  if (loading) {
    return <ContentPerformanceSkeleton />;
  }

  return (
    <section
      className="
        rounded-sm
        border border-gray-200/70
        bg-white
        p-2
      
        transition-shadow
        duration-300
      
        
       
       
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
            <h5 className="text-lg font-semibold text-gray-800">
              Content Performance
            </h5>

            <span
              className="
                rounded-full
                border
                border-sky-100
                bg-sky-50
                px-2
                py-0.5
                text-[10px]
                font-semibold
                text-sky-600
              "
            >
              7 DAYS
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-400">
            Compare your content performance with last week
          </p>
        </div>

        <div
          className="
            flex
            w-fit
            items-center
            gap-2
            rounded-full
            border
            border-gray-100
            bg-gray-50
            px-3
            py-1.5
          "
        >
          <LuChartLine className="text-sm text-sky-500" />

          <span className="text-xs font-medium text-gray-500">This Week</span>
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

          <div className="text-right">
            <span className="text-xs font-semibold text-gray-500">Views</span>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-gray-500">Likes</span>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-gray-500">
              Comments
            </span>
          </div>
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
            <span className="text-xs font-semibold text-gray-700">
              This Week
            </span>
          </div>

          <div className="flex flex-col sm:items-end">
            <span className="text-[10px] text-gray-400 sm:hidden">Views</span>

            <span className="text-sm font-semibold text-gray-800">
              {formatNumber(thisWeek.views)}
            </span>
          </div>

          <div className="flex flex-col sm:items-end">
            <span className="text-[10px] text-gray-400 sm:hidden">Likes</span>

            <span className="text-sm font-semibold text-gray-800">
              {formatNumber(thisWeek.likes)}
            </span>
          </div>

          <div className="flex flex-col sm:items-end">
            <span className="text-[10px] text-gray-400 sm:hidden">
              Comments
            </span>

            <span className="text-sm font-semibold text-gray-800">
              {formatNumber(thisWeek.comments)}
            </span>
          </div>
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
            <span className="text-xs font-medium text-gray-400">Last Week</span>
          </div>

          <div className="flex flex-col sm:items-end">
            <span className="text-[10px] text-gray-400 sm:hidden">Views</span>

            <span className="text-sm font-medium text-gray-500">
              {formatNumber(lastWeek.views)}
            </span>
          </div>

          <div className="flex flex-col sm:items-end">
            <span className="text-[10px] text-gray-400 sm:hidden">Likes</span>

            <span className="text-sm font-medium text-gray-500">
              {formatNumber(lastWeek.likes)}
            </span>
          </div>

          <div className="flex flex-col sm:items-end">
            <span className="text-[10px] text-gray-400 sm:hidden">
              Comments
            </span>

            <span className="text-sm font-medium text-gray-500">
              {formatNumber(lastWeek.comments)}
            </span>
          </div>
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
          <p className="text-xs font-medium text-gray-400">
            Views compared to last week
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-700">
            Weekly performance
          </p>
        </div>

        {viewsChange === 0 ? (
          <span className="text-sm font-semibold text-gray-400">No change</span>
        ) : (
          <div
            className={`
              flex
              items-center
              gap-1.5
              text-sm
              font-semibold
              ${isPositive ? "text-emerald-600" : "text-rose-600"}
            `}
          >
            {isPositive ? <LuTrendingUp /> : <LuTrendingDown />}

            <span>{Math.abs(viewsChange)}%</span>
          </div>
        )}
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
        <div
          className="
            mb-4
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h6 className="text-sm font-semibold text-gray-800">Views</h6>

            <p className="mt-1 text-xs text-gray-400">Daily views this week</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-400" />

            <span className="text-xs font-medium text-gray-400">Views</span>
          </div>
        </div>

        {dailyViews.length > 0 ? (
          <div className="w-full overflow-hidden">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="h-56 w-full overflow-visible sm:h-64"
              preserveAspectRatio="none"
            >
              {/* Horizontal grid lines */}

              {yAxisValues.map((value, index) => {
                const y = chartPaddingTop + (index / chartSteps) * usableHeight;

                return (
                  <g key={index}>
                    <line
                      x1={chartPaddingX}
                      x2={chartWidth - chartPaddingX}
                      y1={y}
                      y2={y}
                      stroke="currentColor"
                      className="text-gray-100"
                      strokeWidth="1"
                    />

                    <text x="0" y={y + 4} className="fill-gray-400 text-[11px]">
                      {formatNumber(value)}
                    </text>
                  </g>
                );
              })}

              {/* Area */}

              {areaPath && <path d={areaPath} className="fill-sky-50" />}

              {/* Line */}

              {linePath && (
                <path
                  d={linePath}
                  fill="none"
                  stroke="currentColor"
                  className="text-sky-400"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Points */}

              {points.map((point, index) => (
                <g key={index}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="6"
                    className="fill-white stroke-sky-400"
                    strokeWidth="3"
                  />

                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="2"
                    className="fill-sky-400"
                  />
                </g>
              ))}

              {/* Day labels */}

              {points.map((point, index) => (
                <text
                  key={`day-${index}`}
                  x={point.x}
                  y={chartHeight - 8}
                  textAnchor="middle"
                  className="fill-gray-400 text-[11px] font-medium"
                >
                  {point.day}
                </text>
              ))}
            </svg>
          </div>
        ) : (
          <div className="flex h-56 items-center justify-center">
            <p className="text-sm text-gray-400">
              No analytics data available yet.
            </p>
          </div>
        )}
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
              <LuHeart className="text-sm text-rose-500" />

              <h6 className="text-sm font-semibold text-gray-800">Likes</h6>
            </div>

            <p className="mt-1 text-xs text-gray-400">Daily likes this week</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rose-400" />

            <span className="text-xs font-medium text-gray-400">Likes</span>
          </div>
        </div>

        {dailyLikes.length > 0 ? (
          <div className="flex h-56 items-end gap-2 sm:h-64 sm:gap-4">
            {dailyLikes.map((item, index) => {
              const likes = Number(item.likes) || 0;

              const height =
                likes === 0 ? 3 : Math.max((likes / maxLikes) * 100, 8);

              return (
                <div
                  key={`${item.date}-${index}`}
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

                  <span
                    className="
                      mb-2
                      text-[10px]
                      font-semibold
                      text-gray-500
                      sm:text-xs
                    "
                  >
                    {formatNumber(likes)}
                  </span>

                  {/* Bar container */}

                  <div
                    className="
                      flex
                      w-full
                      flex-1
                      items-end
                      rounded-t-lg
                      bg-gray-100
                    "
                  >
                    {/* Actual bar */}

                    <div
                      className="
                        w-full
                        rounded-t-lg
                        bg-rose-400
                        transition-all
                        duration-500
                        hover:bg-rose-500
                      "
                      style={{
                        height: `${height}%`,
                      }}
                      title={`${likes} likes`}
                    />
                  </div>

                  {/* Day */}

                  <span
                    className="
                      mt-2
                      text-[10px]
                      font-medium
                      text-gray-400
                      sm:text-xs
                    "
                  >
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex h-56 items-center justify-center">
            <p className="text-sm text-gray-400">
              No likes data available yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentPerformance;
