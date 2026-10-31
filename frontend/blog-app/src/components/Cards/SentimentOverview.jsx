// import { LuSmile, LuFrown, LuMessageCircle, LuPercent } from "react-icons/lu";

// import CustomPieChart from "../Charts/CustomPieChart";

// const COLORS = ["#059669", "#e11d48"];

// // ==================================================
// // STAT CARD
// // ==================================================

// const StatCard = ({ icon, label, value, bgColor, color }) => {
//   return (
//     <div
//       className="
//         min-w-0
//         rounded-sm
//         border
//         border-gray-200
//         bg-gray-50/70
//         p-3
//         transition-all
//         duration-200
//         hover:bg-white
//         hover:shadow-sm
//         sm:p-4
//       "
//     >
//       <div
//         className={`
//           mb-3
//           flex
//           h-10
//           w-10
//           items-center
//           justify-center
//           rounded-xl
//           ${bgColor}
//         `}
//       >
//         <span className={`text-lg ${color}`}>{icon}</span>
//       </div>

//       <p
//         className="
//           truncate
//           text-[10px]
//           font-semibold
//           uppercase
//           tracking-wider
//           text-gray-400
//         "
//       >
//         {label}
//       </p>

//       <h3
//         className="
//           mt-1.5
//           break-words
//           text-xl
//           font-bold
//           text-gray-800
//           sm:text-2xl
//         "
//       >
//         {value}
//       </h3>
//     </div>
//   );
// };

// // ==================================================
// // SENTIMENT OVERVIEW
// // ==================================================

// const SentimentOverview = ({ positive = 0, negative = 0, loading }) => {
//   const safePositive = Number(positive) || 0;
//   const safeNegative = Number(negative) || 0;

//   const total = safePositive + safeNegative;

//   const positiveRate =
//     total === 0 ? 0 : ((safePositive / total) * 100).toFixed(1);

//   const negativeRate =
//     total === 0 ? 0 : ((safeNegative / total) * 100).toFixed(1);

//   const chartData = [
//     {
//       name: "Positive",
//       count: safePositive,
//     },
//     {
//       name: "Negative",
//       count: safeNegative,
//     },
//   ];

//   return (
//     <div
//       className="
//         w-full
//         min-w-0
//         rounded-sm
//         border
//         border-gray-200/70
//         bg-white
//         p-3
//         shadow-xs
//         transition-shadow
//         duration-300
//         hover:shadow-md

//       "
//     >
//       {/* ==================================================
//           HEADER
//       ================================================== */}

//       <div
//         className="
//           flex
//           min-w-0
//           flex-col
//           gap-3
//           sm:flex-row
//           sm:items-start
//           sm:justify-between
//         "
//       >
//         <div className="min-w-0">
//           <div className="flex items-center gap-2">
//             <div
//               className="
//                 flex
//                 h-8
//                 w-8
//                 shrink-0
//                 items-center
//                 justify-center
//                 rounded-lg
//                 bg-emerald-50
//                 text-emerald-500
//               "
//             >
//               <LuSmile size={16} />
//             </div>

//             <h5 className="truncate text-lg font-semibold text-gray-800">
//               AI Sentiment Analysis
//             </h5>
//           </div>

//           <p className="mt-2 text-sm text-gray-400">
//             Reader sentiment predicted using SVM.
//           </p>
//         </div>

//         <div
//           className="
//             w-fit
//             shrink-0
//             rounded-full
//             border
//             border-sky-100
//             bg-sky-50
//             px-3
//             py-1.5
//             text-xs
//             font-semibold
//             text-sky-600
//           "
//         >
//           {total.toLocaleString()} comments
//         </div>
//       </div>

//       {/* ==================================================
//           CONTENT
//       ================================================== */}

//       <div
//         className="
//           mt-6
//           grid
//           min-w-0
//           grid-cols-1
//           gap-4
//           lg:grid-cols-12
//         "
//       >
//         {/* ==================================================
//             STATS
//         ================================================== */}

//         <div
//           className="
//             grid
//             min-w-0
//             grid-cols-2
//             gap-3
//             lg:col-span-5
//           "
//         >
//           <StatCard
//             icon={<LuSmile />}
//             label="Positive"
//             value={safePositive}
//             bgColor="bg-emerald-100"
//             color="text-emerald-600"
//           />

//           <StatCard
//             icon={<LuFrown />}
//             label="Negative"
//             value={safeNegative}
//             bgColor="bg-rose-100"
//             color="text-rose-600"
//           />

//           <StatCard
//             icon={<LuMessageCircle />}
//             label="Total"
//             value={total}
//             bgColor="bg-sky-100"
//             color="text-sky-600"
//           />

//           <StatCard
//             icon={<LuPercent />}
//             label="Positive Rate"
//             value={`${positiveRate}%`}
//             bgColor="bg-amber-100"
//             color="text-amber-600"
//           />
//         </div>

//         {/* ==================================================
//             CHART
//         ================================================== */}

//         <div
//           className="
//             min-w-0
//             overflow-hidden
//             rounded-sm
//             border
//             border-gray-200
//             bg-gray-50/70
//             p-3
//             sm:p-4
//             lg:col-span-7
//           "
//         >
//           {/* Chart Header */}

//           <div
//             className="
//               flex
//               min-w-0
//               items-start
//               justify-between
//               gap-3
//             "
//           >
//             <div className="min-w-0">
//               <h4 className="truncate text-sm font-semibold text-gray-800">
//                 Sentiment Distribution
//               </h4>

//               <p className="mt-1 text-xs text-gray-400">
//                 Positive vs negative comments
//               </p>
//             </div>

//             <div className="shrink-0 text-right">
//               <p className="text-[10px] uppercase tracking-wide text-gray-400">
//                 Negative
//               </p>

//               <p className="mt-0.5 text-sm font-semibold text-rose-500">
//                 {negativeRate}%
//               </p>
//             </div>
//           </div>

//           {/* Chart */}

//           <div
//             className="
//               mt-2
//               h-[270px]
//               w-full
//               min-w-0
//               sm:h-[290px]
//               md:h-[310px]
//             "
//           >
//             {total > 0 ? (
//               <CustomPieChart
//                 data={chartData}
//                 colors={COLORS}
//                 height="100%"
//                 innerRadius="55%"
//                 outerRadius="72%"
//               />
//             ) : (
//               <div className="flex h-full items-center justify-center">
//                 <div className="px-5 text-center">
//                   <div
//                     className="
//                       mx-auto
//                       flex
//                       h-10
//                       w-10
//                       items-center
//                       justify-center
//                       rounded-full
//                       bg-gray-100
//                     "
//                   >
//                     <LuMessageCircle size={18} className="text-gray-400" />
//                   </div>

//                   <p className="mt-3 text-sm font-medium text-gray-600">
//                     No sentiment data yet
//                   </p>

//                   <p className="mt-1 max-w-xs text-xs leading-5 text-gray-400">
//                     Sentiment information will appear as comments are analyzed.
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SentimentOverview;

import { LuSmile, LuFrown, LuMessageCircle, LuPercent } from "react-icons/lu";

import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#059669", "#e11d48"];

// ==================================================
// STAT CARD
// ==================================================

const StatCard = ({ icon, label, value, bgColor, color }) => {
  return (
    <div
      className="
        min-w-0
        rounded-sm
        border
        border-gray-200
        bg-gray-50/70
        p-3
        transition-all
        duration-200
        hover:bg-white
        hover:shadow-sm
        sm:p-4
      "
    >
      <div
        className={`
          mb-3
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          ${bgColor}
        `}
      >
        <span className={`text-lg ${color}`}>{icon}</span>
      </div>

      <p
        className="
          truncate
          text-[10px]
          font-semibold
          uppercase
          tracking-wider
          text-gray-400
        "
      >
        {label}
      </p>

      <h3
        className="
          mt-1.5
          break-words
          text-xl
          font-bold
          text-gray-800
          sm:text-2xl
        "
      >
        {value}
      </h3>
    </div>
  );
};

// ==================================================
// SKELETON STAT CARD
// ==================================================

const SkeletonStatCard = () => {
  return (
    <div
      className="
        min-w-0
        rounded-sm
        border
        border-gray-200
        bg-gray-50/70
        p-3
        sm:p-4
      "
    >
      {/* Icon */}
      <div className="mb-3 h-10 w-10 rounded-xl bg-gray-200" />

      {/* Label */}
      <div className="h-2.5 w-16 max-w-full rounded bg-gray-200" />

      {/* Value */}
      <div className="mt-2 h-7 w-12 max-w-full rounded bg-gray-200 sm:h-8" />
    </div>
  );
};

// ==================================================
// SENTIMENT OVERVIEW
// ==================================================

const SentimentOverview = ({ positive = 0, negative = 0, loading }) => {
  // ==================================================
  // LOADING STATE
  // ==================================================

  if (loading) {
    return (
      <div
        className="
          w-full
          min-w-0
          rounded-sm
          border
          border-gray-200/70
          bg-white
          p-2
       
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
              flex-col
              gap-3
              sm:flex-row
              sm:items-start
              sm:justify-between
            "
          >
            <div className="min-w-0">
              {/* Icon + Title */}
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 shrink-0 rounded-lg bg-gray-200" />

                <div className="h-5 w-48 max-w-[calc(100vw-7rem)] rounded bg-gray-200" />
              </div>

              {/* Description */}
              <div className="mt-2 h-4 w-56 max-w-full rounded bg-gray-100" />
            </div>

            {/* Comments badge */}
            <div className="h-7 w-28 shrink-0 rounded-full bg-gray-100" />
          </div>

          {/* ==================================================
              CONTENT
          ================================================== */}

          <div
            className="
              mt-6
              grid
              min-w-0
              grid-cols-1
              gap-4
              lg:grid-cols-12
            "
          >
            {/* ==================================================
                STAT CARDS
            ================================================== */}

            <div
              className="
                grid
                min-w-0
                grid-cols-2
                gap-3
                lg:col-span-5
              "
            >
              <SkeletonStatCard />
              <SkeletonStatCard />
              <SkeletonStatCard />
              <SkeletonStatCard />
            </div>

            {/* ==================================================
                CHART SKELETON
            ================================================== */}

            <div
              className="
                min-w-0
                overflow-hidden
                rounded-sm
                border
                border-gray-200
                bg-gray-50/70
                p-3
                sm:p-4
                lg:col-span-7
              "
            >
              {/* Chart Header */}

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
                  {/* Title */}
                  <div className="h-4 w-36 max-w-full rounded bg-gray-200" />

                  {/* Subtitle */}
                  <div className="mt-2 h-3 w-44 max-w-full rounded bg-gray-100" />
                </div>

                {/* Negative percentage */}
                <div className="shrink-0 text-right">
                  <div className="ml-auto h-2.5 w-14 rounded bg-gray-200" />

                  <div className="mt-2 ml-auto h-4 w-10 rounded bg-gray-200" />
                </div>
              </div>

              {/* ==================================================
                  DONUT CHART SKELETON
              ================================================== */}

              <div
                className="
                  mt-2
                  flex
                  h-[270px]
                  w-full
                  items-center
                  justify-center
                  sm:h-[290px]
                  md:h-[310px]
                "
              >
                <div
                  className="
                    h-[175px]
                    w-[175px]
                    rounded-full
                    border-[28px]
                    border-gray-200
                    sm:h-[190px]
                    sm:w-[190px]
                    md:h-[205px]
                    md:w-[205px]
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const safePositive = Number(positive) || 0;
  const safeNegative = Number(negative) || 0;

  const total = safePositive + safeNegative;

  const positiveRate =
    total === 0 ? 0 : ((safePositive / total) * 100).toFixed(1);

  const negativeRate =
    total === 0 ? 0 : ((safeNegative / total) * 100).toFixed(1);

  const chartData = [
    {
      name: "Positive",
      count: safePositive,
    },
    {
      name: "Negative",
      count: safeNegative,
    },
  ];

  return (
    <div
      className="
        w-full
        min-w-0
        rounded-sm
        border
        border-gray-200/70
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
          flex
          min-w-0
          flex-col
          gap-3
          sm:flex-row
          sm:items-start
          sm:justify-between
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
                rounded-lg
                bg-emerald-50
                text-emerald-500
              "
            >
              <LuSmile size={16} />
            </div>

            <h5 className="truncate text-lg font-semibold text-gray-800">
              AI Sentiment Analysis
            </h5>
          </div>

          <p className="mt-2 text-sm text-gray-400">
            Reader sentiment predicted using SVM.
          </p>
        </div>

        <div
          className="
            w-fit
            shrink-0
            rounded-full
            border
            border-sky-100
            bg-sky-50
            px-3
            py-1.5
            text-xs
            font-semibold
            text-sky-600
          "
        >
          {total.toLocaleString()} comments
        </div>
      </div>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <div
        className="
          mt-6
          grid
          min-w-0
          grid-cols-1
          gap-4
          lg:grid-cols-12
        "
      >
        {/* ==================================================
            STATS
        ================================================== */}

        <div
          className="
            grid
            min-w-0
            grid-cols-2
            gap-3
            lg:col-span-5
          "
        >
          <StatCard
            icon={<LuSmile />}
            label="Positive"
            value={safePositive}
            bgColor="bg-emerald-100"
            color="text-emerald-600"
          />

          <StatCard
            icon={<LuFrown />}
            label="Negative"
            value={safeNegative}
            bgColor="bg-rose-100"
            color="text-rose-600"
          />

          <StatCard
            icon={<LuMessageCircle />}
            label="Total"
            value={total}
            bgColor="bg-sky-100"
            color="text-sky-600"
          />

          <StatCard
            icon={<LuPercent />}
            label="Positive Rate"
            value={`${positiveRate}%`}
            bgColor="bg-amber-100"
            color="text-amber-600"
          />
        </div>

        {/* ==================================================
            CHART
        ================================================== */}

        <div
          className="
            min-w-0
            overflow-hidden
            rounded-sm
            border
            border-gray-200
            bg-gray-50/70
            p-3
            sm:p-4
            lg:col-span-7
          "
        >
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
              <h4 className="truncate text-sm font-semibold text-gray-800">
                Sentiment Distribution
              </h4>

              <p className="mt-1 text-xs text-gray-400">
                Positive vs negative comments
              </p>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-[10px] uppercase tracking-wide text-gray-400">
                Negative
              </p>

              <p className="mt-0.5 text-sm font-semibold text-rose-500">
                {negativeRate}%
              </p>
            </div>
          </div>

          <div
            className="
              mt-2
              h-[270px]
              w-full
              min-w-0
              sm:h-[290px]
              md:h-[310px]
            "
          >
            {total > 0 ? (
              <CustomPieChart
                data={chartData}
                colors={COLORS}
                height="100%"
                innerRadius="55%"
                outerRadius="72%"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="px-5 text-center">
                  <div
                    className="
                      mx-auto
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-gray-100
                    "
                  >
                    <LuMessageCircle size={18} className="text-gray-400" />
                  </div>

                  <p className="mt-3 text-sm font-medium text-gray-600">
                    No sentiment data yet
                  </p>

                  <p className="mt-1 max-w-xs text-xs leading-5 text-gray-400">
                    Sentiment information will appear as comments are analyzed.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentOverview;
