// const Tabs = ({ loading = false, tabs = [], activeTab, setActiveTab }) => {
//   return (
//     <div className="my-2">
//       {loading ? (
//         <div className="flex">
//           {[0, 1, 2].map((item) => (
//             <div key={item} className="relative px-3 py-2 md:px-4">
//               <div className="flex items-center">
//                 {/* Tab label */}
//                 <div
//                   className={`h-4 animate-pulse rounded bg-gray-200 ${
//                     item === 0 ? "w-7" : item === 1 ? "w-16" : "w-10"
//                   }`}
//                 />

//                 {/* Count */}
//                 <div className="ml-2 h-5 w-7 animate-pulse rounded-full bg-gray-200" />
//               </div>

//               {/* Active tab underline */}
//               {item === 0 && (
//                 <div className="absolute bottom-0 left-0 h-0.5 w-full animate-pulse rounded bg-gray-200" />
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="flex">
//           {tabs.map((tab) => (
//             <button
//               key={tab.label}
//               className={`relative cursor-pointer px-3 py-2 text-sm font-medium md:px-4 ${
//                 activeTab === tab.label
//                   ? "text-black"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//               onClick={() => setActiveTab(tab.label)}
//             >
//               <div className="flex items-center">
//                 <span className="text-sm">{tab.label}</span>

//                 <span
//                   className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${
//                     activeTab === tab.label
//                       ? "bg-black text-white"
//                       : "bg-gray-200/70 text-gray-600"
//                   }`}
//                 >
//                   {tab.count}
//                 </span>
//               </div>

//               {activeTab === tab.label && (
//                 <div className="absolute bottom-0 left-0 h-0.5 w-full bg-black" />
//               )}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Tabs;

const Tabs = ({ loading = false, tabs = [], activeTab, setActiveTab }) => {
  return (
    <div className="my-1.5">
      {loading ? (
        <div className="flex">
          {[0, 1, 2].map((item) => (
            <div key={item} className="relative px-2.5 py-1.5 md:px-3">
              <div className="flex items-center">
                {/* Tab label skeleton */}
                <div
                  className={`h-3 animate-pulse rounded bg-gray-200 ${
                    item === 0 ? "w-6" : item === 1 ? "w-12" : "w-8"
                  }`}
                />

                {/* Count skeleton */}
                <div className="ml-1.5 h-4 w-6 animate-pulse rounded-full bg-gray-200" />
              </div>

              {/* Active tab skeleton */}
              {item === 0 && (
                <div className="absolute bottom-0 left-0 h-px w-full animate-pulse bg-gray-300" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.label;

            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(tab.label)}
                className={`
                  relative
                  cursor-pointer
                  px-2.5
                  py-1.5
                  text-xs
                  font-medium
                  transition-colors
                  duration-150
                  md:px-3
                  ${
                    isActive
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-800"
                  }
                `}
              >
                <div className="flex items-center">
                  <span>{tab.label}</span>

                  <span
                    className={`
                      ml-1.5
                      min-w-[20px]
                      rounded-full
                      px-1.5
                      py-0.5
                      text-center
                      text-[10px]
                      font-semibold
                      leading-none
                      ${
                        isActive
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    {tab.count}
                  </span>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 h-px w-[70%] -translate-x-1/2 bg-gray-900" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Tabs;
