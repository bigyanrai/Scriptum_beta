import { useEffect, useState } from "react";
import {
  LuHeart,
  LuMessageCircle,
  LuTrendingUp,
  LuEye,
  LuInfo,
} from "react-icons/lu";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const EngagementRate = () => {
  const [engagementData, setEngagementData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getEngagementRate = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.ANALYTICS.GET_ENGAGEMENT_RATE,
      );

      if (response.data) {
        setEngagementData(response.data);
      }
    } catch (error) {
      console.error("Error fetching engagement rate:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEngagementRate();
  }, []);

  if (loading) {
    return (
      <section
        className="
        min-w-0
        overflow-hidden
        rounded-sm
        border border-gray-200/70
        bg-white
        p-3
        shadow-xs
      "
      >
        <div className="animate-pulse">
          {/* ==================================================
            HEADER
        ================================================== */}

          <div
            className="
            flex
            min-w-0
            items-start
            justify-between
            gap-3
            sm:gap-4
          "
          >
            <div className="min-w-0 flex-1">
              {/* Title + Info icon */}
              <div className="flex items-center gap-2">
                <div
                  className="
                  h-6
                  w-40
                  max-w-full
                  rounded
                  bg-gray-200
                "
                />

                <div
                  className="
                  h-4
                  w-4
                  shrink-0
                  rounded-full
                  bg-gray-100
                "
                />
              </div>

              {/* Description */}
              <div
                className="
                mt-2
                h-3.5
                w-64
                max-w-full
                rounded
                bg-gray-100
              "
              />
            </div>

            {/* Heart icon */}
            <div
              className="
              h-10
              w-10
              shrink-0
              rounded-xl
              bg-gray-200
            "
            />
          </div>

          {/* ==================================================
            MAIN METRIC
        ================================================== */}

          <div className="mt-7 min-w-0">
            <div
              className="
              flex
              min-w-0
              flex-col
              gap-3
              sm:flex-row
              sm:items-end
              sm:justify-between
              sm:gap-4
            "
            >
              <div className="min-w-0">
                {/* 00.00% */}
                <div
                  className="
                  h-11
                  w-36
                  max-w-full
                  rounded
                  bg-gray-200
                "
                />

                {/* interactions per 100 views */}
                <div
                  className="
                  mt-2
                  h-3.5
                  w-52
                  max-w-full
                  rounded
                  bg-gray-100
                "
                />
              </div>

              {/* Comparison badge */}
              <div
                className="
                h-7
                w-20
                shrink-0
                rounded-full
                bg-gray-200
              "
              />
            </div>

            {/* Total interactions text */}
            <div
              className="
              mt-2
              h-3
              w-64
              max-w-full
              rounded
              bg-gray-100
            "
            />
          </div>

          {/* ==================================================
            CURRENT WEEK STATS
        ================================================== */}

          <div
            className="
            mt-6
            grid
            grid-cols-3
            divide-x
            divide-gray-200
            overflow-hidden
            rounded-sm
            border
            border-gray-100
            bg-gray-50/70
            py-4
          "
          >
            {/* Views */}
            <div className="min-w-0 px-2 text-center sm:px-3">
              <div className="flex items-center justify-center gap-1.5">
                <div
                  className="
                  h-3.5
                  w-3.5
                  shrink-0
                  rounded-full
                  bg-gray-200
                "
                />

                <div
                  className="
                  h-3
                  w-9
                  rounded
                  bg-gray-100
                "
                />
              </div>

              <div
                className="
                mx-auto
                mt-2
                h-4
                w-8
                rounded
                bg-gray-200
              "
              />
            </div>

            {/* Likes */}
            <div className="min-w-0 px-2 text-center sm:px-3">
              <div className="flex items-center justify-center gap-1.5">
                <div
                  className="
                  h-3.5
                  w-3.5
                  shrink-0
                  rounded-full
                  bg-gray-200
                "
                />

                <div
                  className="
                  h-3
                  w-8
                  rounded
                  bg-gray-100
                "
                />
              </div>

              <div
                className="
                mx-auto
                mt-2
                h-4
                w-8
                rounded
                bg-gray-200
              "
              />
            </div>

            {/* Comments */}
            <div className="min-w-0 px-2 text-center sm:px-3">
              <div className="flex items-center justify-center gap-1.5">
                <div
                  className="
                  h-3.5
                  w-3.5
                  shrink-0
                  rounded-full
                  bg-gray-200
                "
                />

                <div
                  className="
                  h-3
                  w-14
                  rounded
                  bg-gray-100
                "
                />
              </div>

              <div
                className="
                mx-auto
                mt-2
                h-4
                w-8
                rounded
                bg-gray-200
              "
              />
            </div>
          </div>

          {/* ==================================================
            PREVIOUS WEEK COMPARISON
        ================================================== */}

          <div
            className="
            mt-4
            min-w-0
            rounded-sm
            border
            border-gray-100
            bg-white
            p-4
          "
          >
            <div
              className="
              flex
              min-w-0
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
            >
              {/* Previous week information */}

              <div className="min-w-0">
                <div
                  className="
                  h-3
                  w-20
                  rounded
                  bg-gray-100
                "
                />

                <div
                  className="
                  mt-2
                  flex
                  items-baseline
                  gap-2
                "
                >
                  {/* Rate */}
                  <div
                    className="
                    h-5
                    w-16
                    rounded
                    bg-gray-200
                  "
                  />

                  {/* interactions */}
                  <div
                    className="
                    h-3
                    w-24
                    rounded
                    bg-gray-100
                  "
                  />
                </div>
              </div>

              {/* Previous metrics */}

              <div
                className="
                flex
                min-w-0
                flex-wrap
                gap-x-4
                gap-y-2
                sm:gap-x-5
              "
              >
                {/* Views */}
                <div className="flex items-center gap-1.5">
                  <div
                    className="
                    h-3.5
                    w-3.5
                    shrink-0
                    rounded-full
                    bg-gray-200
                  "
                  />

                  <div
                    className="
                    h-3
                    w-14
                    rounded
                    bg-gray-100
                  "
                  />
                </div>

                {/* Likes */}
                <div className="flex items-center gap-1.5">
                  <div
                    className="
                    h-3.5
                    w-3.5
                    shrink-0
                    rounded-full
                    bg-gray-200
                  "
                  />

                  <div
                    className="
                    h-3
                    w-14
                    rounded
                    bg-gray-100
                  "
                  />
                </div>

                {/* Comments */}
                <div className="flex items-center gap-1.5">
                  <div
                    className="
                    h-3.5
                    w-3.5
                    shrink-0
                    rounded-full
                    bg-gray-200
                  "
                  />

                  <div
                    className="
                    h-3
                    w-16
                    rounded
                    bg-gray-100
                  "
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ==================================================
            EXPLANATION
        ================================================== */}

          <div
            className="
            mt-4
            flex
            min-w-0
            items-start
            gap-2
            rounded-xl
            bg-gray-50
            px-3
            py-2.5
          "
          >
            {/* Info icon */}
            <div
              className="
              mt-0.5
              h-3.5
              w-3.5
              shrink-0
              rounded-full
              bg-gray-200
            "
            />

            {/* Explanation text */}
            <div className="min-w-0 flex-1">
              <div className="h-2.5 w-full rounded bg-gray-100" />
              <div className="mt-1.5 h-2.5 w-[90%] rounded bg-gray-100" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!engagementData) {
    return null;
  }

  const current = engagementData.current || {};
  const previous = engagementData.previous || {};
  const comparison = engagementData.comparison || {};

  const isIncrease = comparison.changeType === "increase";
  const isDecrease = comparison.changeType === "decrease";

  const currentViews = Number(current.views || 0);
  const currentLikes = Number(current.likes || 0);
  const currentComments = Number(current.comments || 0);

  const previousViews = Number(previous.views || 0);
  const previousLikes = Number(previous.likes || 0);
  const previousComments = Number(previous.comments || 0);

  const currentInteractions = currentLikes + currentComments;
  const previousInteractions = previousLikes + previousComments;

  const currentRate = Number(current.rate || 0);
  const previousRate = Number(previous.rate || 0);
  const comparisonChange = Number(comparison.change || 0);

  return (
    <section
      className="
        min-w-0
        overflow-hidden
        rounded-sm
        border border-gray-200/70
        bg-white
        p-3
    
        transition-shadow
        duration-300
      
 
      "
    >
      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="flex min-w-0 items-start justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-2">
            <h5 className="min-w-0 truncate text-lg font-semibold text-gray-800">
              Engagement Rate
            </h5>

            {/* Info Tooltip */}
            <div className="group relative shrink-0">
              <LuInfo
                size={15}
                className="
                  cursor-help
                  text-gray-300
                  transition-colors
                  group-hover:text-gray-500
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-6
                  z-20
                  w-[min(16rem,calc(100vw-2rem))]
                  -translate-x-1/2
                  rounded-xl
                  border border-gray-100
                  bg-white
                  p-3
                  text-xs
                  leading-relaxed
                  text-gray-500
                  opacity-0
                  shadow-lg
                  transition-opacity
                  duration-200
                  group-hover:opacity-100
                "
              >
                Measures likes and comments compared with your recorded views.
                The rate can be above 100% because one view can result in
                multiple interactions.
              </div>
            </div>
          </div>

          <p className="mt-1 break-words text-sm text-gray-400">
            How actively your content is being engaged with
          </p>
        </div>

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-rose-50
            text-rose-500
          "
        >
          <LuHeart size={20} />
        </div>
      </div>

      {/* ==================================================
          MAIN METRIC
      ================================================== */}

      <div className="mt-7 min-w-0">
        <div
          className="
            flex
            min-w-0
            flex-col
            gap-3
            sm:flex-row
            sm:items-end
            sm:justify-between
            sm:gap-4
          "
        >
          <div className="min-w-0">
            <p className="text-4xl font-bold tracking-tight text-gray-800">
              {currentRate.toFixed(2)}%
            </p>

            <p className="mt-2 text-sm text-gray-400">
              interactions per 100 views
            </p>
          </div>

          {/* Comparison */}
          <div
            className={`
              inline-flex
              w-fit
              max-w-full
              items-center
              gap-1.5
              rounded-full
              px-3
              py-1.5
              text-xs
              font-semibold
              ${
                isIncrease
                  ? "bg-emerald-50 text-emerald-600"
                  : isDecrease
                    ? "bg-rose-50 text-rose-600"
                    : "bg-gray-100 text-gray-500"
              }
            `}
          >
            <LuTrendingUp
              size={14}
              className={isDecrease ? "rotate-180" : ""}
            />

            <span className="whitespace-nowrap">
              {comparisonChange > 0 ? "+" : ""}
              {comparisonChange.toFixed(2)}%
            </span>
          </div>
        </div>

        <p className="mt-1 break-words text-xs text-gray-400">
          {currentInteractions} total interactions from {currentViews} recorded
          views
        </p>
      </div>

      {/* ==================================================
          CURRENT WEEK STATS
      ================================================== */}

      <div
        className="
          mt-6
          grid
          grid-cols-3
          divide-x
          divide-gray-200
          overflow-hidden
          rounded-sm
          border
          border-gray-100
          bg-gray-50/70
          py-4
        "
      >
        {/* Views */}
        <div className="min-w-0 px-2 text-center sm:px-3">
          <div className="flex min-w-0 items-center justify-center gap-1.5">
            <LuEye size={14} className="shrink-0 text-violet-500" />

            <span className="truncate text-xs text-gray-400">Views</span>
          </div>

          <p className="mt-1 truncate text-base font-semibold text-gray-700">
            {currentViews}
          </p>
        </div>

        {/* Likes */}
        <div className="min-w-0 px-2 text-center sm:px-3">
          <div className="flex min-w-0 items-center justify-center gap-1.5">
            <LuHeart size={14} className="shrink-0 text-rose-500" />

            <span className="truncate text-xs text-gray-400">Likes</span>
          </div>

          <p className="mt-1 truncate text-base font-semibold text-gray-700">
            {currentLikes}
          </p>
        </div>

        {/* Comments */}
        <div className="min-w-0 px-2 text-center sm:px-3">
          <div className="flex min-w-0 items-center justify-center gap-1.5">
            <LuMessageCircle size={14} className="shrink-0 text-sky-500" />

            <span className="truncate text-xs text-gray-400">Comments</span>
          </div>

          <p className="mt-1 truncate text-base font-semibold text-gray-700">
            {currentComments}
          </p>
        </div>
      </div>

      {/* ==================================================
          PREVIOUS WEEK COMPARISON
      ================================================== */}

      <div
        className="
          mt-4
          min-w-0
          rounded-sm
          border
          border-gray-100
          bg-white
          p-4
        "
      >
        <div
          className="
            flex
            min-w-0
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-400">Previous week</p>

            <div className="mt-1 flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
              <p className="text-lg font-semibold text-gray-700">
                {previousRate.toFixed(2)}%
              </p>

              <span className="text-xs text-gray-400">
                {previousInteractions} interactions
              </span>
            </div>
          </div>

          <div className="flex min-w-0 flex-wrap gap-x-4 gap-y-2 sm:gap-x-5">
            {/* Previous Views */}
            <div className="flex min-w-0 items-center gap-1.5">
              <LuEye size={14} className="shrink-0 text-violet-500" />

              <span className="whitespace-nowrap text-xs text-gray-500">
                {previousViews} views
              </span>
            </div>

            {/* Previous Likes */}
            <div className="flex min-w-0 items-center gap-1.5">
              <LuHeart size={14} className="shrink-0 text-rose-500" />

              <span className="whitespace-nowrap text-xs text-gray-500">
                {previousLikes} likes
              </span>
            </div>

            {/* Previous Comments */}
            <div className="flex min-w-0 items-center gap-1.5">
              <LuMessageCircle size={14} className="shrink-0 text-sky-500" />

              <span className="whitespace-nowrap text-xs text-gray-500">
                {previousComments} comments
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          EXPLANATION
      ================================================== */}

      <div
        className="
          mt-4
          flex
          min-w-0
          items-start
          gap-2
          rounded-xl
          bg-gray-50
          px-3
          py-2.5
        "
      >
        <LuInfo size={14} className="mt-0.5 shrink-0 text-gray-400" />

        <p className="min-w-0 break-words text-xs leading-relaxed text-gray-400">
          This rate compares likes and comments with recorded views. A rate
          above 100% is possible because a single view can generate multiple
          interactions.
        </p>
      </div>
    </section>
  );
};

export default EngagementRate;
