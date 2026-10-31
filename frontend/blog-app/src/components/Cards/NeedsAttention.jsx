// import { LuCheckCheck, LuChevronRight, LuMessageCircle } from "react-icons/lu";

// const NeedsAttention = ({ items = [], loading }) => {
//   const priorityStyles = {
//     high: {
//       iconBg: "bg-rose-100",
//       iconColor: "text-rose-500",
//       badgeBg: "bg-rose-50",
//       badgeColor: "text-rose-600",
//       badgeText: "High priority",
//     },

//     medium: {
//       iconBg: "bg-amber-100",
//       iconColor: "text-amber-500",
//       badgeBg: "bg-amber-50",
//       badgeColor: "text-amber-600",
//       badgeText: "Needs attention",
//     },

//     low: {
//       iconBg: "bg-sky-100",
//       iconColor: "text-sky-500",
//       badgeBg: "bg-sky-50",
//       badgeColor: "text-sky-600",
//       badgeText: "Low priority",
//     },
//   };

//   const getIcon = (type) => {
//     switch (type) {
//       case "unanswered_comments":
//         return <LuMessageCircle size={18} />;

//       default:
//         return <LuCheckCheck size={18} />;
//     }
//   };

//   const handleAction = (item) => {
//     switch (item.type) {
//       case "unanswered_comments":
//         window.location.href = "/admin/comments";
//         break;

//       case "stale_drafts":
//         window.location.href = "/admin/posts?status=draft";
//         break;

//       default:
//         break;
//     }
//   };

//   return (
//     <div
//       className="
//         h-full
//         rounded-sm
//         border border-gray-200/70
//         bg-white
//         p-3
//         shadow-xs
//         transition-shadow
//         duration-300
//         hover:shadow-md

//       "
//     >
//       {/* Header */}

//       <div className="mb-5">
//         <div className="flex items-center justify-between gap-3">
//           <div>
//             <h5 className="text-lg font-semibold text-gray-800">
//               Needs Attention
//             </h5>

//             <p className="mt-1 text-sm text-gray-400">
//               Things that may need your attention
//             </p>
//           </div>

//           {/* Item count */}

//           {items.length > 0 && (
//             <span
//               className="
//                 shrink-0
//                 rounded-full
//                 bg-gray-100
//                 px-2.5
//                 py-1
//                 text-xs
//                 font-semibold
//                 text-gray-500
//               "
//             >
//               {items.length}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Empty State */}

//       {items.length === 0 ? (
//         <div
//           className="
//             flex
//             min-h-[180px]
//             items-center
//             justify-center
//             rounded-2xl
//             border
//             border-dashed
//             border-gray-200
//             bg-gray-50/50
//             px-5
//           "
//         >
//           <div className="text-center">
//             <div
//               className="
//                 mx-auto
//                 flex
//                 h-11
//                 w-11
//                 items-center
//                 justify-center
//                 rounded-full
//                 bg-emerald-100
//                 text-emerald-500
//               "
//             >
//               <LuCheckCheck size={20} />
//             </div>

//             <p className="mt-3 text-sm font-semibold text-gray-700">
//               You're all caught up
//             </p>

//             <p className="mt-1 text-xs text-gray-400">
//               Nothing needs your attention right now.
//             </p>
//           </div>
//         </div>
//       ) : (
//         /*
//          * ==================================================
//          * SCROLLABLE LIST
//          * ==================================================
//          *
//          * The card itself does not grow indefinitely.
//          *
//          * Once the list reaches 420px, it becomes scrollable.
//          */

//         <div
//           className="
//             max-h-[420px]
//            sm:max-h-full
//             overflow-y-auto
//             pr-1
//             scrollbar-thin
//             scrollbar-track-transparent
//             scrollbar-thumb-gray-200
//             hover:scrollbar-thumb-gray-300
//           "
//         >
//           <div className="space-y-3">
//             {items.map((item, index) => {
//               const styles =
//                 priorityStyles[item.priority] || priorityStyles.medium;

//               return (
//                 <div
//                   key={`${item.type}-${index}`}
//                   className="
//                     rounded-sm
//                     border border-gray-100
//                     bg-gray-50/60
//                     p-3
//                     transition-colors
//                     duration-200
//                     hover:bg-gray-50
//                   "
//                 >
//                   <div className="flex items-start gap-3">
//                     {/* Icon */}

//                     <div
//                       className={`
//                         flex
//                         h-10
//                         w-10
//                         shrink-0
//                         items-center
//                         justify-center
//                         rounded-xl
//                         ${styles.iconBg}
//                         ${styles.iconColor}
//                       `}
//                     >
//                       {getIcon(item.type)}
//                     </div>

//                     {/* Content */}

//                     <div className="min-w-0 flex-1">
//                       <div
//                         className="
//                           flex
//                           flex-wrap
//                           items-center
//                           gap-2
//                         "
//                       >
//                         <h6 className="text-sm font-semibold text-gray-800">
//                           {item.title}
//                         </h6>

//                         <span
//                           className={`
//                             rounded-full
//                             px-2
//                             py-0.5
//                             text-[10px]
//                             font-semibold
//                             ${styles.badgeBg}
//                             ${styles.badgeColor}
//                           `}
//                         >
//                           {styles.badgeText}
//                         </span>
//                       </div>

//                       <p className="mt-1 text-xs leading-5 text-gray-400">
//                         {item.description}
//                       </p>

//                       {/* Action */}
//                       {console.log(item)}

//                       <button
//                         type="button"
//                         onClick={() => {
//                           console.log(item);
//                           handleAction(item);
//                         }}
//                         className="
//                           mt-3
//                           inline-flex
//                           items-center
//                           gap-1
//                           text-xs
//                           font-semibold
//                           text-sky-600
//                           transition-colors
//                           hover:text-sky-700
//                         "
//                       >
//                         Review
//                         <LuChevronRight size={14} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NeedsAttention;

import { LuCheckCheck, LuChevronRight, LuMessageCircle } from "react-icons/lu";

const NeedsAttention = ({ items = [], loading }) => {
  const priorityStyles = {
    high: {
      iconBg: "bg-rose-100",
      iconColor: "text-rose-500",
      badgeBg: "bg-rose-50",
      badgeColor: "text-rose-600",
      badgeText: "High priority",
    },

    medium: {
      iconBg: "bg-amber-100",
      iconColor: "text-amber-500",
      badgeBg: "bg-amber-50",
      badgeColor: "text-amber-600",
      badgeText: "Needs attention",
    },

    low: {
      iconBg: "bg-sky-100",
      iconColor: "text-sky-500",
      badgeBg: "bg-sky-50",
      badgeColor: "text-sky-600",
      badgeText: "Low priority",
    },
  };

  const getIcon = (type) => {
    switch (type) {
      case "unanswered_comments":
        return <LuMessageCircle size={18} />;

      default:
        return <LuCheckCheck size={18} />;
    }
  };

  const handleAction = (item) => {
    switch (item.type) {
      case "unanswered_comments":
        window.location.href = "/admin/comments";
        break;

      case "stale_drafts":
        window.location.href = "/admin/posts?status=draft";
        break;

      default:
        break;
    }
  };

  // ==================================================
  // LOADING SKELETON
  // ==================================================

  if (loading) {
    return (
      <div
        className="
          h-full
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

          <div className="mb-5">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                {/* Title */}
                <div className="h-5 w-36 max-w-full rounded bg-gray-200" />

                {/* Description */}
                <div className="mt-2 h-4 w-60 max-w-full rounded bg-gray-100" />
              </div>

              {/* Count */}
              <div className="h-6 w-7 shrink-0 rounded-full bg-gray-100" />
            </div>
          </div>

          {/* ==================================================
              ATTENTION ITEMS
          ================================================== */}

          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  rounded-sm
                  border
                  border-gray-100
                  bg-gray-50/60
                  p-3
                "
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}

                  <div
                    className="
                      h-10
                      w-10
                      shrink-0
                      rounded-xl
                      bg-gray-200
                    "
                  />

                  {/* Content */}

                  <div className="min-w-0 flex-1">
                    {/* Title + Badge */}

                    <div className="flex flex-wrap items-center gap-2">
                      <div className="h-4 w-32 max-w-[60%] rounded bg-gray-200" />

                      <div className="h-5 w-24 rounded-full bg-gray-100" />
                    </div>

                    {/* Description */}

                    <div className="mt-2 space-y-1.5">
                      <div className="h-3 w-full rounded bg-gray-100" />

                      <div className="h-3 w-3/4 rounded bg-gray-100" />
                    </div>

                    {/* Review */}

                    <div className="mt-3 flex items-center gap-1">
                      <div className="h-3.5 w-11 rounded bg-gray-200" />

                      <div className="h-3.5 w-3.5 rounded bg-gray-200" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==================================================
  // EMPTY STATE
  // ==================================================

  return (
    <div
      className="
        h-full
        rounded-sm
        border
        border-gray-200/70
        bg-white
        p-2
     
        transition-shadow
        duration-300

      "
    >
      {/* Header */}

      <div className="mb-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h5 className="text-lg font-semibold text-gray-800">
              Needs Attention
            </h5>

            <p className="mt-1 text-sm text-gray-400">
              Things that may need your attention
            </p>
          </div>

          {/* Item count */}

          {items.length > 0 && (
            <span
              className="
                shrink-0
                rounded-full
                bg-gray-100
                px-2.5
                py-1
                text-xs
                font-semibold
                text-gray-500
              "
            >
              {items.length}
            </span>
          )}
        </div>
      </div>

      {/* Empty State */}

      {items.length === 0 ? (
        <div
          className="
            flex
            min-h-[180px]
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
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-emerald-100
                text-emerald-500
              "
            >
              <LuCheckCheck size={20} />
            </div>

            <p className="mt-3 text-sm font-semibold text-gray-700">
              You're all caught up
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Nothing needs your attention right now.
            </p>
          </div>
        </div>
      ) : (
        <div
          className="
            max-h-[420px]
            overflow-y-auto
            pr-1
            scrollbar-thin
            scrollbar-track-transparent
            scrollbar-thumb-gray-200
            hover:scrollbar-thumb-gray-300
          "
        >
          <div className="space-y-3">
            {items.map((item, index) => {
              const styles =
                priorityStyles[item.priority] || priorityStyles.medium;

              return (
                <div
                  key={`${item.type}-${index}`}
                  className="
                    rounded-sm
                    border
                    border-gray-100
                    bg-gray-50/60
                    p-3
                    transition-colors
                    duration-200
                    hover:bg-gray-50
                  "
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}

                    <div
                      className={`
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        ${styles.iconBg}
                        ${styles.iconColor}
                      `}
                    >
                      {getIcon(item.type)}
                    </div>

                    {/* Content */}

                    <div className="min-w-0 flex-1">
                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-2
                        "
                      >
                        <h6 className="text-sm font-semibold text-gray-800">
                          {item.title}
                        </h6>

                        <span
                          className={`
                            rounded-full
                            px-2
                            py-0.5
                            text-[10px]
                            font-semibold
                            ${styles.badgeBg}
                            ${styles.badgeColor}
                          `}
                        >
                          {styles.badgeText}
                        </span>
                      </div>

                      <p className="mt-1 text-xs leading-5 text-gray-400">
                        {item.description}
                      </p>

                      <button
                        type="button"
                        onClick={() => handleAction(item)}
                        className="
                          mt-3
                          inline-flex
                          items-center
                          gap-1
                          text-xs
                          font-semibold
                          text-sky-600
                          transition-colors
                          hover:text-sky-700
                        "
                      >
                        Review
                        <LuChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NeedsAttention;
