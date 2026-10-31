// // import {
// //   LuCalendarDays,
// //   LuCheck,
// //   LuClock3,
// //   LuFileText,
// //   LuTrendingUp,
// // } from "react-icons/lu";

// // const PublishingInsight = ({ data }) => {
// //   const {
// //     publishedThisWeek = 0,
// //     publishedThisMonth = 0,
// //     drafts = 0,
// //     averagePostsPerWeek = 0,
// //     lastPublished = null,
// //     weeklyActivity = [],
// //   } = data || {};

// //   const maxActivity = Math.max(
// //     ...weeklyActivity.map((item) => Number(item.count) || 0),
// //     1,
// //   );

// //   const getLastPublishedText = () => {
// //     if (!lastPublished?.publishedAt) {
// //       return "No published posts yet";
// //     }

// //     const publishedDate = new Date(lastPublished.publishedAt);

// //     const now = new Date();

// //     const diffInMs = now - publishedDate;

// //     const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

// //     if (diffInDays <= 0) {
// //       return "Today";
// //     }

// //     if (diffInDays === 1) {
// //       return "Yesterday";
// //     }

// //     if (diffInDays < 7) {
// //       return `${diffInDays} days ago`;
// //     }

// //     return publishedDate.toLocaleDateString("en-US", {
// //       month: "short",
// //       day: "numeric",
// //       year: "numeric",
// //     });
// //   };

// //   return (
// //     <div
// //       className="
// //         h-full
// //         rounded-2xl
// //         border border-gray-200/70
// //         bg-white
// //         p-4
// //         shadow-xs
// //         transition-shadow
// //         duration-300
// //         hover:shadow-md
// //         sm:p-5
// //         md:rounded-3xl
// //         md:p-6
// //       "
// //     >
// //       {/* ==================================================
// //           HEADER
// //       ================================================== */}

// //       <div className="flex items-start justify-between gap-4">
// //         <div className="min-w-0">
// //           <h5 className="text-lg font-semibold text-gray-800">
// //             Draft / Publishing Insight
// //           </h5>

// //           <p className="mt-1 text-sm text-gray-400">
// //             Your publishing activity at a glance
// //           </p>
// //         </div>

// //         <div
// //           className="
// //             flex
// //             h-10
// //             w-10
// //             shrink-0
// //             items-center
// //             justify-center
// //             rounded-xl
// //             bg-sky-50
// //             text-sky-500
// //           "
// //         >
// //           <LuCalendarDays size={19} />
// //         </div>
// //       </div>

// //       {/* ==================================================
// //           SUMMARY
// //       ================================================== */}

// //       <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
// //         {/* Published This Week */}

// //         <div
// //           className="
// //             rounded-2xl
// //             border
// //             border-gray-100
// //             bg-gray-50/70
// //             p-3
// //             sm:p-4
// //           "
// //         >
// //           <div className="flex items-center gap-1.5">
// //             <LuCheck className="text-emerald-500" size={14} />

// //             <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 sm:text-[11px]">
// //               This Week
// //             </p>
// //           </div>

// //           <p className="mt-2 text-xl font-semibold text-gray-800 sm:text-2xl">
// //             {publishedThisWeek}
// //           </p>

// //           <p className="mt-0.5 text-[10px] text-gray-400 sm:text-xs">
// //             published
// //           </p>
// //         </div>

// //         {/* Published This Month */}

// //         <div
// //           className="
// //             rounded-2xl
// //             border
// //             border-gray-100
// //             bg-gray-50/70
// //             p-3
// //             sm:p-4
// //           "
// //         >
// //           <div className="flex items-center gap-1.5">
// //             <LuTrendingUp className="text-sky-500" size={14} />

// //             <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 sm:text-[11px]">
// //               This Month
// //             </p>
// //           </div>

// //           <p className="mt-2 text-xl font-semibold text-gray-800 sm:text-2xl">
// //             {publishedThisMonth}
// //           </p>

// //           <p className="mt-0.5 text-[10px] text-gray-400 sm:text-xs">
// //             published
// //           </p>
// //         </div>

// //         {/* Drafts */}

// //         <div
// //           className="
// //             rounded-2xl
// //             border
// //             border-gray-100
// //             bg-gray-50/70
// //             p-3
// //             sm:p-4
// //           "
// //         >
// //           <div className="flex items-center gap-1.5">
// //             <LuFileText className="text-amber-500" size={14} />

// //             <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 sm:text-[11px]">
// //               Drafts
// //             </p>
// //           </div>

// //           <p className="mt-2 text-xl font-semibold text-gray-800 sm:text-2xl">
// //             {drafts}
// //           </p>

// //           <p className="mt-0.5 text-[10px] text-gray-400 sm:text-xs">waiting</p>
// //         </div>
// //       </div>

// //       {/* ==================================================
// //           WEEKLY ACTIVITY
// //       ================================================== */}

// //       <div className="mt-7">
// //         <div className="mb-4 flex items-center justify-between">
// //           <div>
// //             <h6 className="text-sm font-semibold text-gray-700">
// //               Publishing activity
// //             </h6>

// //             <p className="mt-0.5 text-xs text-gray-400">
// //               This week's publishing rhythm
// //             </p>
// //           </div>

// //           <span
// //             className="
// //               rounded-full
// //               border
// //               border-sky-100
// //               bg-sky-50
// //               px-2.5
// //               py-1
// //               text-[10px]
// //               font-semibold
// //               text-sky-600
// //             "
// //           >
// //             Mon – Sun
// //           </span>
// //         </div>

// //         <div
// //           className="
// //             rounded-2xl
// //             border
// //             border-gray-100
// //             bg-gray-50/50
// //             px-3
// //             py-4
// //             sm:px-5
// //           "
// //         >
// //           <div className="flex items-end justify-between gap-2">
// //             {weeklyActivity.map((item) => {
// //               const count = Number(item.count) || 0;

// //               const height =
// //                 count > 0 ? Math.max((count / maxActivity) * 100, 18) : 8;

// //               return (
// //                 <div
// //                   key={item.date}
// //                   className="flex min-w-0 flex-1 flex-col items-center"
// //                 >
// //                   {/* Count */}

// //                   <span
// //                     className={`
// //                       mb-2
// //                       text-[11px]
// //                       font-semibold
// //                       ${count > 0 ? "text-sky-600" : "text-gray-300"}
// //                     `}
// //                   >
// //                     {count}
// //                   </span>

// //                   {/* Bar */}

// //                   <div
// //                     className="
// //                       flex
// //                       h-24
// //                       w-full
// //                       max-w-[34px]
// //                       items-end
// //                       overflow-hidden
// //                       rounded-lg
// //                       bg-gray-100
// //                     "
// //                   >
// //                     <div
// //                       className={`
// //                         w-full
// //                         rounded-lg
// //                         transition-all
// //                         duration-500
// //                         ${count > 0 ? "bg-sky-400" : "bg-gray-200"}
// //                       `}
// //                       style={{
// //                         height: `${height}%`,
// //                       }}
// //                     />
// //                   </div>

// //                   {/* Day */}

// //                   <span
// //                     className={`
// //                       mt-2
// //                       text-[10px]
// //                       font-medium
// //                       ${count > 0 ? "text-gray-600" : "text-gray-400"}
// //                     `}
// //                   >
// //                     {item.day}
// //                   </span>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       </div>

// //       {/* ==================================================
// //           BOTTOM INSIGHTS
// //       ================================================== */}

// //       <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
// //         {/* Average */}

// //         <div
// //           className="
// //             flex
// //             items-center
// //             gap-3
// //             rounded-2xl
// //             border
// //             border-gray-100
// //             bg-white
// //             p-3
// //           "
// //         >
// //           <div
// //             className="
// //               flex
// //               h-9
// //               w-9
// //               shrink-0
// //               items-center
// //               justify-center
// //               rounded-xl
// //               bg-violet-50
// //               text-violet-500
// //             "
// //           >
// //             <LuTrendingUp size={17} />
// //           </div>

// //           <div className="min-w-0">
// //             <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
// //               Average
// //             </p>

// //             <p className="mt-0.5 text-sm font-semibold text-gray-700">
// //               {averagePostsPerWeek}{" "}
// //               <span className="font-normal text-gray-400">posts/week</span>
// //             </p>
// //           </div>
// //         </div>

// //         {/* Last Published */}

// //         <div
// //           className="
// //             flex
// //             min-w-0
// //             items-center
// //             gap-3
// //             rounded-2xl
// //             border
// //             border-gray-100
// //             bg-white
// //             p-3
// //           "
// //         >
// //           <div
// //             className="
// //               flex
// //               h-9
// //               w-9
// //               shrink-0
// //               items-center
// //               justify-center
// //               rounded-xl
// //               bg-emerald-50
// //               text-emerald-500
// //             "
// //           >
// //             <LuClock3 size={17} />
// //           </div>

// //           <div className="min-w-0">
// //             <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
// //               Last published
// //             </p>

// //             {lastPublished ? (
// //               <>
// //                 <p
// //                   className="
// //                     mt-0.5
// //                     truncate
// //                     text-sm
// //                     font-semibold
// //                     text-gray-700
// //                   "
// //                   title={lastPublished.title}
// //                 >
// //                   {lastPublished.title}
// //                 </p>

// //                 <p className="mt-0.5 text-[10px] text-gray-400">
// //                   {getLastPublishedText()}
// //                 </p>
// //               </>
// //             ) : (
// //               <p className="mt-0.5 text-sm font-medium text-gray-400">
// //                 No published posts yet
// //               </p>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PublishingInsight;

// import {
//   LuCalendarDays,
//   LuCheck,
//   LuClock3,
//   LuFileText,
//   LuTrendingUp,
// } from "react-icons/lu";

// const PublishingInsight = ({ data, loading }) => {
//   const {
//     publishedThisWeek = 0,
//     publishedThisMonth = 0,
//     drafts = 0,
//     averagePostsPerWeek = 0,
//     lastPublished = null,
//     weeklyActivity = [],
//   } = data || {};

//   const maxActivity = Math.max(
//     ...weeklyActivity.map((item) => Number(item.count) || 0),
//     1,
//   );

//   const getLastPublishedText = () => {
//     if (!lastPublished?.publishedAt) {
//       return "No published posts yet";
//     }

//     const publishedDate = new Date(lastPublished.publishedAt);
//     const now = new Date();

//     const diffInMs = now - publishedDate;
//     const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

//     if (diffInDays <= 0) {
//       return "Today";
//     }

//     if (diffInDays === 1) {
//       return "Yesterday";
//     }

//     if (diffInDays < 7) {
//       return `${diffInDays} days ago`;
//     }

//     return publishedDate.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   return (
//     <div
//       className="
//         h-full
//         min-w-0
//         overflow-hidden
//         rounded-sm
//         border border-gray-200/70
//         bg-white
//         p-3
//         shadow-xs
//         transition-shadow
//         duration-300
//         hover:shadow-md
//         min-[400px]:p-3

//       "
//     >
//       {/* ==================================================
//           HEADER
//       ================================================== */}

//       <div className="flex min-w-0 items-start justify-between gap-3">
//         <div className="min-w-0 flex-1">
//           <h5 className="truncate text-base font-semibold text-gray-800 sm:text-lg">
//             Draft / Publishing Insight
//           </h5>

//           <p className="mt-1 text-xs text-gray-400 sm:text-sm">
//             Your publishing activity at a glance
//           </p>
//         </div>

//         <div
//           className="
//             flex
//             h-9
//             w-9
//             shrink-0
//             items-center
//             justify-center
//             rounded-xl
//             bg-sky-50
//             text-sky-500
//             sm:h-10
//             sm:w-10
//           "
//         >
//           <LuCalendarDays size={18} className="sm:h-[19px] sm:w-[19px]" />
//         </div>
//       </div>

//       {/* ==================================================
//           SUMMARY
//       ================================================== */}

//       <div
//         className="
//           mt-5
//           grid
//           grid-cols-1
//           gap-2.5
//           min-[400px]:grid-cols-3
//           sm:mt-6
//           sm:gap-3
//         "
//       >
//         {/* Published This Week */}

//         <div
//           className="
//             min-w-0
//             rounded-sm
//             border
//             border-gray-100
//             bg-gray-50/70
//             p-3
//             min-[400px]:p-3.5
//             sm:p-4
//           "
//         >
//           <div className="flex min-w-0 items-center gap-1.5">
//             <LuCheck className="shrink-0 text-emerald-500" size={14} />

//             <p
//               className="
//                 truncate
//                 text-[9px]
//                 font-semibold
//                 uppercase
//                 tracking-wide
//                 text-gray-400
//                 min-[400px]:text-[10px]
//                 sm:text-[11px]
//               "
//             >
//               This Week
//             </p>
//           </div>

//           <p className="mt-2 text-xl font-semibold text-gray-800 sm:text-2xl">
//             {publishedThisWeek}
//           </p>

//           <p className="mt-0.5 text-[10px] text-gray-400 sm:text-xs">
//             published
//           </p>
//         </div>

//         {/* Published This Month */}

//         <div
//           className="
//             min-w-0
//             rounded-sm
//             border
//             border-gray-100
//             bg-gray-50/70
//             p-3
//             min-[400px]:p-3.5
//             sm:p-4
//           "
//         >
//           <div className="flex min-w-0 items-center gap-1.5">
//             <LuTrendingUp className="shrink-0 text-sky-500" size={14} />

//             <p
//               className="
//                 truncate
//                 text-[9px]
//                 font-semibold
//                 uppercase
//                 tracking-wide
//                 text-gray-400
//                 min-[400px]:text-[10px]
//                 sm:text-[11px]
//               "
//             >
//               This Month
//             </p>
//           </div>

//           <p className="mt-2 text-xl font-semibold text-gray-800 sm:text-2xl">
//             {publishedThisMonth}
//           </p>

//           <p className="mt-0.5 text-[10px] text-gray-400 sm:text-xs">
//             published
//           </p>
//         </div>

//         {/* Drafts */}

//         <div
//           className="
//             min-w-0
//             rounded-sm
//             border
//             border-gray-100
//             bg-gray-50/70
//             p-3
//             min-[400px]:p-3.5
//             sm:p-4
//           "
//         >
//           <div className="flex min-w-0 items-center gap-1.5">
//             <LuFileText className="shrink-0 text-amber-500" size={14} />

//             <p
//               className="
//                 truncate
//                 text-[9px]
//                 font-semibold
//                 uppercase
//                 tracking-wide
//                 text-gray-400
//                 min-[400px]:text-[10px]
//                 sm:text-[11px]
//               "
//             >
//               Drafts
//             </p>
//           </div>

//           <p className="mt-2 text-xl font-semibold text-gray-800 sm:text-2xl">
//             {drafts}
//           </p>

//           <p className="mt-0.5 text-[10px] text-gray-400 sm:text-xs">waiting</p>
//         </div>
//       </div>

//       {/* ==================================================
//           WEEKLY ACTIVITY
//       ================================================== */}

//       <div className="mt-6 min-w-0 sm:mt-7">
//         <div
//           className="
//             mb-4
//             flex
//             min-w-0
//             flex-col
//             gap-2
//             min-[400px]:flex-row
//             min-[400px]:items-center
//             min-[400px]:justify-between
//           "
//         >
//           <div className="min-w-0">
//             <h6 className="text-sm font-semibold text-gray-700">
//               Publishing activity
//             </h6>

//             <p className="mt-0.5 text-xs text-gray-400">
//               This week's publishing rhythm
//             </p>
//           </div>

//           <span
//             className="
//               w-fit
//               shrink-0
//               rounded-full
//               border
//               border-sky-100
//               bg-sky-50
//               px-2.5
//               py-1
//               text-[10px]
//               font-semibold
//               text-sky-600
//             "
//           >
//             Mon – Sun
//           </span>
//         </div>

//         <div
//           className="
//             min-w-0
//             overflow-hidden
//             rounded-sm
//             border
//             border-gray-100
//             bg-gray-50/50
//             px-2
//             py-4
//             min-[400px]:px-3
//             sm:px-5
//           "
//         >
//           <div
//             className="
//               flex
//               min-w-0
//               items-end
//               justify-between
//               gap-1
//               min-[400px]:gap-2
//             "
//           >
//             {weeklyActivity.map((item) => {
//               const count = Number(item.count) || 0;

//               const height =
//                 count > 0 ? Math.max((count / maxActivity) * 100, 18) : 8;

//               return (
//                 <div
//                   key={item.date}
//                   className="
//                     flex
//                     min-w-0
//                     flex-1
//                     flex-col
//                     items-center
//                   "
//                 >
//                   {/* Count */}

//                   <span
//                     className={`
//                       mb-2
//                       text-[10px]
//                       font-semibold
//                       min-[400px]:text-[11px]
//                       ${count > 0 ? "text-sky-600" : "text-gray-300"}
//                     `}
//                   >
//                     {count}
//                   </span>

//                   {/* Bar */}

//                   <div
//                     className="
//                       flex
//                       h-20
//                       w-full
//                       max-w-[22px]
//                       items-end
//                       overflow-hidden
//                       rounded-sm
//                       bg-gray-100
//                       min-[400px]:h-24
//                       min-[400px]:max-w-[28px]
//                       sm:max-w-[34px]

//                     "
//                   >
//                     <div
//                       className={`
//                         w-full
//                         rounded-sm
//                         transition-all
//                         duration-500
//                         sm:rounded-lg
//                         ${count > 0 ? "bg-sky-400" : "bg-gray-200"}
//                       `}
//                       style={{
//                         height: `${height}%`,
//                       }}
//                     />
//                   </div>

//                   {/* Day */}

//                   <span
//                     className={`
//                       mt-2
//                       text-[9px]
//                       font-medium
//                       min-[400px]:text-[10px]
//                       ${count > 0 ? "text-gray-600" : "text-gray-400"}
//                     `}
//                   >
//                     {item.day}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* ==================================================
//           BOTTOM INSIGHTS
//       ================================================== */}

//       <div className="mt-4 grid min-w-0 grid-cols-1 gap-2.5 sm:mt-5 sm:grid-cols-2 sm:gap-3">
//         {/* Average */}

//         <div
//           className="
//             flex
//             min-w-0
//             items-center
//             gap-3
//             rounded-sm
//             border
//             border-gray-100
//             bg-white
//             p-3
//           "
//         >
//           <div
//             className="
//               flex
//               h-9
//               w-9
//               shrink-0
//               items-center
//               justify-center
//               rounded-xl
//               bg-violet-50
//               text-violet-500
//             "
//           >
//             <LuTrendingUp size={17} />
//           </div>

//           <div className="min-w-0">
//             <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
//               Average
//             </p>

//             <p className="mt-0.5 text-sm font-semibold text-gray-700">
//               {averagePostsPerWeek}{" "}
//               <span className="font-normal text-gray-400">posts/week</span>
//             </p>
//           </div>
//         </div>

//         {/* Last Published */}

//         <div
//           className="
//             flex
//             min-w-0
//             items-center
//             gap-3
//             rounded-sm
//             border
//             border-gray-100
//             bg-white
//             p-3
//           "
//         >
//           <div
//             className="
//               flex
//               h-9
//               w-9
//               shrink-0
//               items-center
//               justify-center
//               rounded-xl
//               bg-emerald-50
//               text-emerald-500
//             "
//           >
//             <LuClock3 size={17} />
//           </div>

//           <div className="min-w-0 flex-1">
//             <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
//               Last published
//             </p>

//             {lastPublished ? (
//               <>
//                 <p
//                   className="
//                     mt-0.5
//                     truncate
//                     text-sm
//                     font-semibold
//                     text-gray-700
//                   "
//                   title={lastPublished.title}
//                 >
//                   {lastPublished.title}
//                 </p>

//                 <p className="mt-0.5 text-[10px] text-gray-400">
//                   {getLastPublishedText()}
//                 </p>
//               </>
//             ) : (
//               <p className="mt-0.5 text-sm font-medium text-gray-400">
//                 No published posts yet
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PublishingInsight;

import {
  LuCalendarDays,
  LuCheck,
  LuClock3,
  LuFileText,
  LuTrendingUp,
} from "react-icons/lu";

const PublishingInsight = ({ data, loading }) => {
  // ==================================================
  // SKELETON LOADER
  // ==================================================

  if (loading) {
    return (
      <div
        className="
          h-full
          min-w-0
          overflow-hidden
          rounded-sm
          border border-gray-200/70
          bg-white
          p-2
        
          
        "
      >
        <div className="animate-pulse">
          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              {/* Title */}
              <div className="h-5 w-48 max-w-full rounded bg-gray-200" />

              {/* Description */}
              <div className="mt-2 h-3.5 w-56 max-w-full rounded bg-gray-100" />
            </div>

            {/* Calendar icon */}
            <div
              className="
                h-9
                w-9
                shrink-0
                rounded-xl
                bg-gray-200
                sm:h-10
                sm:w-10
              "
            />
          </div>

          {/* ==================================================
              SUMMARY CARDS
          ================================================== */}

          <div
            className="
              mt-5
              grid
              grid-cols-1
              gap-2.5
              min-[400px]:grid-cols-3
              sm:mt-6
              sm:gap-3
            "
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  min-w-0
                  rounded-sm
                  border
                  border-gray-100
                  bg-gray-50/70
                  p-3
                  min-[400px]:p-3.5
                  sm:p-4
                "
              >
                {/* Label + icon */}
                <div className="flex min-w-0 items-center gap-1.5">
                  <div className="h-3.5 w-3.5 shrink-0 rounded-full bg-gray-200" />

                  <div
                    className="
                      h-2.5
                      w-16
                      max-w-full
                      rounded
                      bg-gray-200
                    "
                  />
                </div>

                {/* Number */}
                <div className="mt-2 h-7 w-10 rounded bg-gray-200 sm:h-8" />

                {/* Bottom label */}
                <div className="mt-2 h-2.5 w-14 rounded bg-gray-100" />
              </div>
            ))}
          </div>

          {/* ==================================================
              WEEKLY ACTIVITY
          ================================================== */}

          <div className="mt-6 min-w-0 sm:mt-7">
            {/* Activity header */}

            <div
              className="
                mb-4
                flex
                min-w-0
                flex-col
                gap-2
                min-[400px]:flex-row
                min-[400px]:items-center
                min-[400px]:justify-between
              "
            >
              <div className="min-w-0">
                <div className="h-4 w-36 rounded bg-gray-200" />

                <div className="mt-2 h-3 w-48 rounded bg-gray-100" />
              </div>

              {/* Mon - Sun badge */}

              <div className="h-6 w-16 shrink-0 rounded-full bg-gray-100" />
            </div>

            {/* Chart */}

            <div
              className="
                min-w-0
                overflow-hidden
                rounded-sm
                border
                border-gray-100
                bg-gray-50/50
                px-2
                py-4
                min-[400px]:px-3
                sm:px-5
              "
            >
              <div
                className="
                  flex
                  min-w-0
                  items-end
                  justify-between
                  gap-1
                  min-[400px]:gap-2
                "
              >
                {[45, 70, 35, 85, 55, 65, 30].map((height, index) => (
                  <div
                    key={index}
                    className="
                      flex
                      min-w-0
                      flex-1
                      flex-col
                      items-center
                    "
                  >
                    {/* Count */}

                    <div
                      className="
                        mb-2
                        h-3
                        w-4
                        rounded
                        bg-gray-200
                      "
                    />

                    {/* Bar */}

                    <div
                      className="
                        flex
                        h-20
                        w-full
                        max-w-[22px]
                        items-end
                        overflow-hidden
                        rounded-sm
                        bg-gray-100
                        min-[400px]:h-24
                        min-[400px]:max-w-[28px]
                        sm:max-w-[34px]
                      "
                    >
                      <div
                        className="
                          w-full
                          rounded-sm
                          bg-gray-200
                          sm:rounded-lg
                        "
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    </div>

                    {/* Day */}

                    <div
                      className="
                        mt-2
                        h-2.5
                        w-5
                        rounded
                        bg-gray-100
                      "
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ==================================================
              BOTTOM INSIGHTS
          ================================================== */}

          <div
            className="
              mt-4
              grid
              min-w-0
              grid-cols-1
              gap-2.5
              sm:mt-5
              sm:grid-cols-2
              sm:gap-3
            "
          >
            {/* Average */}

            <div
              className="
                flex
                min-w-0
                items-center
                gap-3
                rounded-sm
                border
                border-gray-100
                bg-white
                p-3
              "
            >
              {/* Icon */}

              <div
                className="
                  h-9
                  w-9
                  shrink-0
                  rounded-xl
                  bg-gray-100
                "
              />

              <div className="min-w-0 flex-1">
                {/* Label */}

                <div className="h-2.5 w-14 rounded bg-gray-100" />

                {/* Value */}

                <div className="mt-2 h-4 w-28 max-w-full rounded bg-gray-200" />
              </div>
            </div>

            {/* Last Published */}

            <div
              className="
                flex
                min-w-0
                items-center
                gap-3
                rounded-sm
                border
                border-gray-100
                bg-white
                p-3
              "
            >
              {/* Icon */}

              <div
                className="
                  h-9
                  w-9
                  shrink-0
                  rounded-xl
                  bg-gray-100
                "
              />

              <div className="min-w-0 flex-1">
                {/* Label */}

                <div className="h-2.5 w-20 rounded bg-gray-100" />

                {/* Title */}

                <div
                  className="
                    mt-2
                    h-4
                    w-32
                    max-w-full
                    rounded
                    bg-gray-200
                  "
                />

                {/* Date */}

                <div className="mt-2 h-2.5 w-16 rounded bg-gray-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================================================
  // DATA
  // ==================================================

  const {
    publishedThisWeek = 0,
    publishedThisMonth = 0,
    drafts = 0,
    averagePostsPerWeek = 0,
    lastPublished = null,
    weeklyActivity = [],
  } = data || {};

  const maxActivity = Math.max(
    ...weeklyActivity.map((item) => Number(item.count) || 0),
    1,
  );

  const getLastPublishedText = () => {
    if (!lastPublished?.publishedAt) {
      return "No published posts yet";
    }

    const publishedDate = new Date(lastPublished.publishedAt);
    const now = new Date();

    const diffInMs = now - publishedDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays <= 0) {
      return "Today";
    }

    if (diffInDays === 1) {
      return "Yesterday";
    }

    if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    }

    return publishedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // ==================================================
  // MAIN COMPONENT
  // ==================================================

  return (
    <div
      className="
        h-full
        min-w-0
        overflow-hidden
        rounded-sm
        border border-gray-200/70
        bg-white
        p-2
       
        transition-shadow
        duration-300
       
        min-[400px]:p-3
      "
    >
      {/* HEADER */}

      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h5 className="truncate text-base font-semibold text-gray-800 sm:text-lg">
            Draft / Publishing Insight
          </h5>

          <p className="mt-1 text-xs text-gray-400 sm:text-sm">
            Your publishing activity at a glance
          </p>
        </div>

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-sky-50
            text-sky-500
            sm:h-10
            sm:w-10
          "
        >
          <LuCalendarDays size={18} className="sm:h-[19px] sm:w-[19px]" />
        </div>
      </div>

      {/* SUMMARY */}

      <div
        className="
          mt-5
          grid
          grid-cols-1
          gap-2.5
          min-[400px]:grid-cols-3
          sm:mt-6
          sm:gap-3
        "
      >
        {/* Published This Week */}

        <div
          className="
            min-w-0
            rounded-sm
            border
            border-gray-100
            bg-gray-50/70
            p-3
            min-[400px]:p-3.5
            sm:p-4
          "
        >
          <div className="flex min-w-0 items-center gap-1.5">
            <LuCheck className="shrink-0 text-emerald-500" size={14} />

            <p
              className="
                truncate
                text-[9px]
                font-semibold
                uppercase
                tracking-wide
                text-gray-400
                min-[400px]:text-[10px]
                sm:text-[11px]
              "
            >
              This Week
            </p>
          </div>

          <p className="mt-2 text-xl font-semibold text-gray-800 sm:text-2xl">
            {publishedThisWeek}
          </p>

          <p className="mt-0.5 text-[10px] text-gray-400 sm:text-xs">
            published
          </p>
        </div>

        {/* Published This Month */}

        <div
          className="
            min-w-0
            rounded-sm
            border
            border-gray-100
            bg-gray-50/70
            p-3
            min-[400px]:p-3.5
            sm:p-4
          "
        >
          <div className="flex min-w-0 items-center gap-1.5">
            <LuTrendingUp className="shrink-0 text-sky-500" size={14} />

            <p
              className="
                truncate
                text-[9px]
                font-semibold
                uppercase
                tracking-wide
                text-gray-400
                min-[400px]:text-[10px]
                sm:text-[11px]
              "
            >
              This Month
            </p>
          </div>

          <p className="mt-2 text-xl font-semibold text-gray-800 sm:text-2xl">
            {publishedThisMonth}
          </p>

          <p className="mt-0.5 text-[10px] text-gray-400 sm:text-xs">
            published
          </p>
        </div>

        {/* Drafts */}

        <div
          className="
            min-w-0
            rounded-sm
            border
            border-gray-100
            bg-gray-50/70
            p-3
            min-[400px]:p-3.5
            sm:p-4
          "
        >
          <div className="flex min-w-0 items-center gap-1.5">
            <LuFileText className="shrink-0 text-amber-500" size={14} />

            <p
              className="
                truncate
                text-[9px]
                font-semibold
                uppercase
                tracking-wide
                text-gray-400
                min-[400px]:text-[10px]
                sm:text-[11px]
              "
            >
              Drafts
            </p>
          </div>

          <p className="mt-2 text-xl font-semibold text-gray-800 sm:text-2xl">
            {drafts}
          </p>

          <p className="mt-0.5 text-[10px] text-gray-400 sm:text-xs">waiting</p>
        </div>
      </div>

      {/* WEEKLY ACTIVITY */}

      <div className="mt-6 min-w-0 sm:mt-7">
        <div
          className="
            mb-4
            flex
            min-w-0
            flex-col
            gap-2
            min-[400px]:flex-row
            min-[400px]:items-center
            min-[400px]:justify-between
          "
        >
          <div className="min-w-0">
            <h6 className="text-sm font-semibold text-gray-700">
              Publishing activity
            </h6>

            <p className="mt-0.5 text-xs text-gray-400">
              This week's publishing rhythm
            </p>
          </div>

          <span
            className="
              w-fit
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
            Mon – Sun
          </span>
        </div>

        <div
          className="
            min-w-0
            overflow-hidden
            rounded-sm
            border
            border-gray-100
            bg-gray-50/50
            px-2
            py-4
            min-[400px]:px-3
            sm:px-5
          "
        >
          <div
            className="
              flex
              min-w-0
              items-end
              justify-between
              gap-1
              min-[400px]:gap-2
            "
          >
            {weeklyActivity.map((item) => {
              const count = Number(item.count) || 0;

              const height =
                count > 0 ? Math.max((count / maxActivity) * 100, 18) : 8;

              return (
                <div
                  key={item.date}
                  className="
                    flex
                    min-w-0
                    flex-1
                    flex-col
                    items-center
                  "
                >
                  <span
                    className={`
                      mb-2
                      text-[10px]
                      font-semibold
                      min-[400px]:text-[11px]
                      ${count > 0 ? "text-sky-600" : "text-gray-300"}
                    `}
                  >
                    {count}
                  </span>

                  <div
                    className="
                      flex
                      h-20
                      w-full
                      max-w-[22px]
                      items-end
                      overflow-hidden
                      rounded-sm
                      bg-gray-100
                      min-[400px]:h-24
                      min-[400px]:max-w-[28px]
                      sm:max-w-[34px]
                    "
                  >
                    <div
                      className={`
                        w-full
                        rounded-sm
                        transition-all
                        duration-500
                        sm:rounded-lg
                        ${count > 0 ? "bg-sky-400" : "bg-gray-200"}
                      `}
                      style={{
                        height: `${height}%`,
                      }}
                    />
                  </div>

                  <span
                    className={`
                      mt-2
                      text-[9px]
                      font-medium
                      min-[400px]:text-[10px]
                      ${count > 0 ? "text-gray-600" : "text-gray-400"}
                    `}
                  >
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* BOTTOM INSIGHTS */}

      <div
        className="
          mt-4
          grid
          min-w-0
          grid-cols-1
          gap-2.5
          sm:mt-5
          sm:grid-cols-2
          sm:gap-3
        "
      >
        {/* Average */}

        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
            rounded-sm
            border
            border-gray-100
            bg-white
            p-3
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-violet-50
              text-violet-500
            "
          >
            <LuTrendingUp size={17} />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
              Average
            </p>

            <p className="mt-0.5 text-sm font-semibold text-gray-700">
              {averagePostsPerWeek}{" "}
              <span className="font-normal text-gray-400">posts/week</span>
            </p>
          </div>
        </div>

        {/* Last Published */}

        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
            rounded-sm
            border
            border-gray-100
            bg-white
            p-3
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-emerald-50
              text-emerald-500
            "
          >
            <LuClock3 size={17} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
              Last published
            </p>

            {lastPublished ? (
              <>
                <p
                  className="
                    mt-0.5
                    truncate
                    text-sm
                    font-semibold
                    text-gray-700
                  "
                  title={lastPublished.title}
                >
                  {lastPublished.title}
                </p>

                <p className="mt-0.5 text-[10px] text-gray-400">
                  {getLastPublishedText()}
                </p>
              </>
            ) : (
              <p className="mt-0.5 text-sm font-medium text-gray-400">
                No published posts yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishingInsight;
