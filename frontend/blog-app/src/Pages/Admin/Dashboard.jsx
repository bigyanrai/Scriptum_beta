import { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserContext } from "../../context/userContext";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";

import {
  LuChartLine,
  LuCheckCheck,
  LuGalleryVerticalEnd,
  LuHeart,
} from "react-icons/lu";

import DashboardSummaryCard from "../../components/Cards/DashboardSummaryCard";
import TagInsights from "../../components/Cards/TagInsights";
import TopPostCard from "../../components/Cards/TopPostCard";
import DashboardSkeleton from "../../components/Loader/DashboardSkeleton";
import SentimentOverview from "../../components/Cards/SentimentOverview";
import ContentPerformance from "../../components/Cards/ContentPerformance";
import EngagementRate from "../../components/Cards/EngagementRate";
import NeedsAttention from "../../components/Cards/NeedsAttention";
import PublishingInsight from "../../components/Cards/PublishingInsight";
import HeaderSummary from "../../components/Cards/HeaderSummary";
import TopPostsSkeleton from "../../components/Loader/TopPostsSkeleton";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  const [dashboardData, setDashboardData] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [maxViews, setMaxViews] = useState(1);

  /* ==================================================
      DASHBOARD DATA
  ================================================== */

  const getDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.DASHBOARD.GET_DASHBOARD_DATA,
      );

      if (response.data) {
        setDashboardData(response.data);

        const topPosts = Array.isArray(response.data?.topPosts)
          ? response.data.topPosts
          : [];

        const highestViews = Math.max(
          ...topPosts.map((post) => Number(post.views) || 0),
          1,
        );

        setMaxViews(highestViews);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /* ==================================================
      CONTENT ANALYTICS
  ================================================== */

  const getAnalyticsData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.ANALYTICS.GET_CONTENT_PERFORMANCE,
      );

      if (response.data) {
        setAnalyticsData(response.data);
      }
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  /* ==================================================
      INITIAL LOAD
  ================================================== */

  useEffect(() => {
    getDashboardData();
    getAnalyticsData();
  }, []);

  /* ==================================================
      SAFE DATA
  ================================================== */

  const stats = dashboardData?.stats || {};

  const topPosts = Array.isArray(dashboardData?.topPosts)
    ? dashboardData.topPosts
    : [];

  const tagUsage = Array.isArray(dashboardData?.tagUsage)
    ? dashboardData.tagUsage
    : [];

  const sentiment = dashboardData?.sentiment || {};

  const needsAttention = Array.isArray(dashboardData?.needsAttention)
    ? dashboardData.needsAttention
    : [];

  const publishingInsight = dashboardData?.publishingInsight || null;

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="min-h-screen bg-gray-50 ">
        <>
          {/* ==================================================
                HEADER + SUMMARY
            ================================================== */}

          <section
            className="
                rounded-sm
                border border-gray-200/70
                bg-white
                p-2
              "
          >
            <HeaderSummary loading={isLoading} user={user} stats={stats} />
          </section>

          {/* ==================================================
                DASHBOARD CONTENT
            ================================================== */}

          <main
            className="
                mt-2
                grid
                grid-cols-1
                gap-2
                md:grid-cols-12 
              "
          >
            {/* ==================================================
                  TAG INSIGHTS
              ================================================== */}

            <section className="min-w-0 md:col-span-12 xl:col-span-7">
              <div
                className="
      flex
      h-full
      min-h-[520px]
      flex-col
      rounded-sm
      border
      border-gray-200/70
      bg-white
      p-2
      
      transition-shadow
      duration-300
     
      xl:h-[560px]
      xl:min-h-0
    "
              >
                {/* Header */}

                <div
                  className="
        mb-2
        flex
        shrink-0
        items-start
        justify-between
        gap-4
      "
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div
                        className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-sm
              bg-sky-50
              text-sky-500
            "
                      >
                        <LuGalleryVerticalEnd size={15} />
                      </div>

                      <h5 className="text-lg font-semibold text-gray-800">
                        Tag Insights
                      </h5>
                    </div>

                    <p className="mt-1.5 pl-10 text-sm text-gray-400">
                      Overview of your most used blog categories
                    </p>
                  </div>

                  {isLoading ? (
                    <span
                      className="
      block
      h-6
      w-14
      shrink-0
      animate-pulse
      rounded-full
      border
      border-gray-200
      bg-gray-100
    "
                    />
                  ) : (
                    tagUsage.length > 0 && (
                      <span
                        className="
        shrink-0
        rounded-full
        border
        border-sky-100
        bg-sky-50
        px-2.5
        py-1
        text-[10px]
        font-semibold
        text-sky-600
      "
                      >
                        {tagUsage.length}{" "}
                        {tagUsage.length === 1 ? "Tag" : "Tags"}
                      </span>
                    )
                  )}
                </div>

                {/* Content */}

                <div className="min-h-0 flex-1">
                  <TagInsights loading={isLoading} tagUsage={tagUsage} />
                </div>
              </div>
            </section>

            {/* ==================================================
    TOP POSTS
================================================== */}

            <section className="min-w-0 md:col-span-12 xl:col-span-5">
              <div
                className="
      flex
      h-[520px]
      min-h-0
      flex-col
      rounded-sm
      border
      border-gray-200/70
      bg-white
      p-3
   
      transition-shadow
      duration-300
      
      sm:h-[540px]
     
      md:h-[560px]
      
     
      xl:h-[560px]
    "
              >
                {/* Header */}

                <div
                  className="
        mb-5
        flex
        shrink-0
        items-start
        justify-between
        gap-4
      "
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div
                        className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-sm
              bg-violet-50
              text-violet-500
            "
                      >
                        <LuChartLine size={15} />
                      </div>

                      <h5 className="text-lg font-semibold text-gray-800">
                        Top Posts
                      </h5>
                    </div>

                    <p className="mt-1.5 pl-10 text-sm text-gray-400">
                      Your highest performing articles
                    </p>
                  </div>

                  {isLoading ? (
                    <span
                      className="
      block
      h-6
      w-14
      shrink-0
      animate-pulse
      rounded-full
      border
      border-gray-200
      bg-gray-100
    "
                    />
                  ) : (
                    topPosts.length > 0 && (
                      <span
                        className="
        shrink-0
        rounded-full
        border
        border-violet-100
        bg-violet-50
        px-2.5
        py-1
        text-[10px]
        font-semibold
        text-violet-600
      "
                      >
                        {topPosts.length} Posts
                      </span>
                    )
                  )}
                </div>

                {/* Posts */}

                {isLoading ? (
                  <TopPostsSkeleton />
                ) : topPosts.length > 0 ? (
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
                      {topPosts.map((post, index) => (
                        <TopPostCard
                          authorName={post.authorName}
                          key={post._id}
                          rank={index + 1}
                          title={post.title}
                          coverImageUrl={post.coverImageUrl}
                          views={post.views}
                          likes={post.likes}
                          commentCount={post.commentCount}
                          maxViews={maxViews}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div
                    className="
      flex
      min-h-0
      flex-1
      items-center
      justify-center
      rounded-2xl
      border
      border-dashed
      border-gray-200
      bg-gray-50/50
      px-5
    "
                  >
                    <div className="text-center">
                      <div
                        className="
          mx-auto
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-violet-50
          text-violet-400
        "
                      >
                        <LuGalleryVerticalEnd size={18} />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-gray-700">
                        No published posts yet
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Your best performing posts will appear here.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* ==================================================
                  CONTENT PERFORMANCE
              ================================================== */}

            <section className="min-w-0 md:col-span-12">
              <ContentPerformance
                loading={isLoading}
                thisWeek={analyticsData?.thisWeek}
                lastWeek={analyticsData?.lastWeek}
                changes={analyticsData?.changes}
                dailyViews={analyticsData?.dailyViews}
                dailyLikes={analyticsData?.dailyLikes}
              />
            </section>

            {/* ==================================================
                  ENGAGEMENT RATE
              ================================================== */}

            <section className="min-w-0 md:col-span-12">
              <EngagementRate />
            </section>

            {/* ==================================================
                  AI SENTIMENT
              ================================================== */}

            <section className="min-w-0 md:col-span-12">
              <SentimentOverview
                loading={isLoading}
                positive={sentiment.positive || 0}
                negative={sentiment.negative || 0}
              />
            </section>

            {/* ==================================================
                  NEEDS ATTENTION
              ================================================== */}

            {console.log(needsAttention)}
            <section className="min-w-0 md:col-span-12 xl:col-span-6">
              <NeedsAttention loading={isLoading} items={needsAttention} />
            </section>

            {/* ==================================================
                  PUBLISHING INSIGHT
              ================================================== */}

            <section className="min-w-0 md:col-span-12 xl:col-span-6">
              <PublishingInsight loading={isLoading} data={publishingInsight} />
            </section>
          </main>
        </>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
