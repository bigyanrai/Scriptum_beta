import moment from "moment";
import DashboardSummaryCard from "./DashboardSummaryCard";
import {
  LuChartLine,
  LuCheckCheck,
  LuGalleryVerticalEnd,
  LuHeart,
} from "react-icons/lu";

function HeaderSummary({ stats, user, loading }) {
  if (loading) {
    return (
      <>
        <div className="animate-pulse">
          {/* Header Section */}
          <div
            className="
          flex
          flex-col
          gap-5
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
          >
            <div className="min-w-0">
              {/* Small label */}
              <div className="mb-2 h-4 w-24 rounded bg-sky-100" />

              {/* Greeting */}
              <div className="h-6 w-48 rounded bg-gray-200 sm:h-8 sm:w-64" />

              {/* Date */}
              <div className="mt-2 h-4 w-40 rounded bg-gray-100" />
            </div>

            {/* Welcome Badge */}
            <div
              className="
            hidden
            shrink-0
            rounded-sm
            border border-gray-100
            bg-gray-50
            p-2
            sm:block
          "
            >
              <div className="h-3 w-28 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-24 rounded bg-gray-300" />
            </div>
          </div>

          {/* Summary Cards */}
          <div
            className="
          mt-7
          grid
          grid-cols-1
          gap-3
          min-[480px]:grid-cols-2
          sm:gap-4
          lg:grid-cols-4
        "
          >
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="
              flex
              flex-row
              items-center
              rounded-md
              border
              border-gray-100
              bg-gray-50
              p-1
              gap-3
            "
              >
                {/* Icon placeholder */}
                <div className="h-8 w-8 rounded bg-gray-200" />

                {/* Label */}
                <div className="h-4 w-24 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Header */}

      <div
        className="
          flex
          flex-col
          gap-5
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="min-w-0">
          <p className="mb-2 text-sm font-medium text-gray-500">
            Admin Dashboard
          </p>

          <h2
            className="
              break-words
              text-2xl
              font-semibold
              tracking-tight
              text-gray-800
              sm:text-3xl
            "
          >
            Greetings!! {user?.name || "Admin"}
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            {moment().format("dddd, MMMM Do YYYY")}
          </p>
        </div>

        {/* Welcome Badge */}

        <div
          className="
            hidden
            shrink-0
            rounded-sm
            border border-gray-100
            bg-gray-50
            p-2
            sm:block
          "
        >
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-wider
              text-gray-400
            "
          >
            Dashboard Overview
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-700">
            Welcome back
          </p>
        </div>
      </div>

      {/* Summary Cards */}

      <div
        className="
          mt-7
          grid
          grid-cols-1
          gap-3
          min-[480px]:grid-cols-2
          sm:gap-4
          lg:grid-cols-4
        "
      >
        <DashboardSummaryCard
          icon={<LuGalleryVerticalEnd />}
          label="Total Posts"
          value={stats.totalPosts || 0}
          bgColor="bg-sky-100/70"
          color="text-sky-500"
        />

        <DashboardSummaryCard
          icon={<LuCheckCheck />}
          label="Published"
          value={stats.published || 0}
          bgColor="bg-emerald-100/70"
          color="text-emerald-500"
        />

        <DashboardSummaryCard
          icon={<LuChartLine />}
          label="Total Views"
          value={stats.totalViews || 0}
          bgColor="bg-violet-100/70"
          color="text-violet-500"
        />

        <DashboardSummaryCard
          icon={<LuHeart />}
          label="Total Likes"
          value={stats.totalLikes || 0}
          bgColor="bg-rose-100/70"
          color="text-rose-500"
        />
      </div>
    </>
  );
}

export default HeaderSummary;
