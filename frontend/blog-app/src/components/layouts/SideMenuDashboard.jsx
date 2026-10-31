// import { BLOG_NAVBAR_DATA, SIDE_MENU_DATA } from "../../utils/data";
// import { LuLogOut, LuTrash2, LuUserPen } from "react-icons/lu";
// import { useNavigate } from "react-router-dom";
// import CharAvatar from "../Cards/CharAvatar";
// import { useContext } from "react";
// import { UserContext } from "../../context/userContext";

// const SideMenuDashboard = ({ activeMenu, isBlogMenu, setOpenSideMenu }) => {
//   const { user, setUser, setOpenDeleteAccount } = useContext(UserContext);

//   const handleDeleteProfile = () => {
//     setOpenDeleteAccount(true);
//     setOpenSideMenu((prev) => !prev);
//   };

//   const navigate = useNavigate();

//   const handleClick = (route) => {
//     if (route === "logout") {
//       handleLogout();
//       return;
//     }

//     setOpenSideMenu((prev) => !prev);
//     navigate(route);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     setUser(null);
//     setOpenSideMenu((prev) => !prev);
//     navigate("/");
//   };

//   return (
//     <>
//       <aside className="sticky top-16 h-[calc(100vh-64px)] w-72 bg-white border-r border-gray-200 overflow-y-auto scrollbar-hide shadow-sm">
//         {/* Profile */}

//         {user && (
//           <div className="px-6 pt-8 pb-6 border-b border-gray-100">
//             <div className="flex flex-col items-center">
//               {user?.profileImageUrl ? (
//                 <img
//                   src={user.profileImageUrl}
//                   alt="Profile"
//                   className="w-20 h-20 rounded-full object-cover ring-4 ring-sky-100"
//                 />
//               ) : (
//                 <CharAvatar
//                   fullName={user?.name || ""}
//                   width="w-20"
//                   height="h-20"
//                   style="text-xl"
//                 />
//               )}

//               <h2 className="mt-4 text-lg font-semibold text-gray-900">
//                 {user?.name}
//               </h2>

//               <p className="text-sm text-gray-500 text-center break-all">
//                 {user?.email}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Menu */}

//         <div className="px-1 py-2">
//           {(isBlogMenu ? BLOG_NAVBAR_DATA : SIDE_MENU_DATA)?.map(
//             (item, index) => {
//               const active = activeMenu === item.label;

//               return (
//                 <button
//                   key={index}
//                   onClick={() => handleClick(item.path)}
//                   className={`group w-full flex items-center gap-4 rounded-sm px-5 py-3 mb-2 transition-all duration-200

//                   ${
//                     active
//                       ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-200"
//                       : "text-gray-700 hover:bg-sky-50 hover:text-sky-600"
//                   }`}
//                 >
//                   <item.icon
//                     className={`text-xl transition-transform duration-200 ${
//                       active ? "" : "group-hover:scale-110"
//                     }`}
//                   />

//                   <span className="font-medium">{item.label}</span>
//                 </button>
//               );
//             },
//           )}
//         </div>

//         {/* Logout */}

//         {user && (
//           <div className="px-1 pb-2 mt-auto space-y-2">
//             {user.role === "member" && (
//               <>
//                 <button
//                   onClick={handleDeleteProfile}
//                   className="w-full flex items-center gap-4 rounded-xl px-5 py-3 text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors duration-200"
//                 >
//                   <LuTrash2 className="text-xl" />
//                   <span className="font-medium">Delete Account</span>
//                 </button>
//               </>
//             )}

//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center gap-4 rounded-xl px-5 py-3 text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors duration-200"
//             >
//               <LuLogOut className="text-xl transition-transform duration-200" />
//               <span className="font-medium">Logout</span>
//             </button>
//           </div>
//         )}
//       </aside>
//     </>
//   );
// };

// export default SideMenuDashboard;

import { BLOG_NAVBAR_DATA, SIDE_MENU_DATA } from "../../utils/data";
import { LuLogOut, LuTrash2 } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const SideMenuDashboard = ({ activeMenu, isBlogMenu, setOpenSideMenu }) => {
  const { user, setUser, setOpenDeleteAccount } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleDeleteProfile = () => {
    setOpenDeleteAccount(true);
    setOpenSideMenu((prev) => !prev);
  };

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }

    setOpenSideMenu((prev) => !prev);
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setOpenSideMenu((prev) => !prev);
    navigate("/");
  };

  /*
   * Determine active menu item.
   *
   * Exact paths and nested routes are handled using the
   * current URL, with activeMenu kept as a fallback.
   */
  const menuData = isBlogMenu ? BLOG_NAVBAR_DATA : SIDE_MENU_DATA;

  const isItemActive = (item) => {
    if (location.pathname === item.path) {
      return true;
    }

    if (
      item.path &&
      item.path !== "/" &&
      location.pathname.startsWith(`${item.path}/`)
    ) {
      return true;
    }

    return activeMenu === item.label;
  };

  return (
    <aside
      className="
        sticky top-16
        flex h-[calc(100vh-64px)]
        w-full shrink-0
        flex-col
        border-r border-gray-200
        bg-white
        sm:w-64
        lg:w-72
      "
    >
      {/* Profile */}

      {user && (
        <div className="shrink-0 border-b border-gray-100 px-5 py-5">
          <div className="flex items-center gap-3">
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="Profile"
                className="h-11 w-11 rounded-full object-cover"
              />
            ) : (
              <CharAvatar
                fullName={user?.name || ""}
                width="w-11"
                height="h-11"
                style="text-sm"
              />
            )}

            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-gray-900">
                {user?.name}
              </h2>

              <p className="truncate text-xs text-gray-400" title={user?.email}>
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Menu */}

      <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4 scrollbar-hide">
        <div className="space-y-1">
          {menuData?.map((item, index) => {
            const active = isItemActive(item);

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleClick(item.path)}
                className={`
                  flex w-full items-center gap-3
                  rounded-md
                  px-3 py-2.5
                  text-left
                  transition-colors
                  duration-150
                  ${
                    active
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <item.icon
                  className={`
                    shrink-0 text-lg
                    ${active ? "text-gray-900" : "text-gray-400"}
                  `}
                />

                <span
                  className={`
                    truncate text-sm
                    ${active ? "font-medium" : "font-normal"}
                  `}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Account Actions */}

      {user && (
        <div className="shrink-0 border-t border-gray-100 px-3 py-3">
          {/* Delete Account */}

          {user.role === "member" && (
            <button
              type="button"
              onClick={handleDeleteProfile}
              className="
                flex w-full items-center gap-3
                rounded-md
                px-3 py-2.5
                text-left
                text-gray-500
                transition-colors
                duration-150
                hover:bg-red-50
                hover:text-red-600
              "
            >
              <LuTrash2 className="shrink-0 text-lg text-gray-400" />

              <span className="text-sm font-normal">Delete Account</span>
            </button>
          )}

          {/* Logout */}

          <button
            type="button"
            onClick={handleLogout}
            className="
              mt-1
              flex w-full items-center gap-3
              rounded-md
              px-3 py-2.5
              text-left
              text-gray-500
              transition-colors
              duration-150
              hover:bg-red-50
              hover:text-red-600
            "
          >
            <LuLogOut className="shrink-0 text-lg text-gray-400" />

            <span className="text-sm font-normal">Logout</span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default SideMenuDashboard;

// import { BLOG_NAVBAR_DATA, SIDE_MENU_DATA } from "../../utils/data";
// import { LuLogOut, LuTrash2 } from "react-icons/lu";
// import { useNavigate } from "react-router-dom";
// import CharAvatar from "../Cards/CharAvatar";
// import { useContext } from "react";
// import { UserContext } from "../../context/userContext";

// const SideMenuDashboard = ({ activeMenu, isBlogMenu, setOpenSideMenu }) => {
//   const { user, setUser, setOpenDeleteAccount } = useContext(UserContext);

//   const handleDeleteProfile = () => {
//     setOpenDeleteAccount(true);
//     setOpenSideMenu((prev) => !prev);
//   };

//   const navigate = useNavigate();

//   const handleClick = (route) => {
//     if (route === "logout") {
//       handleLogout();
//       return;
//     }

//     setOpenSideMenu((prev) => !prev);
//     navigate(route);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     setUser(null);
//     setOpenSideMenu((prev) => !prev);
//     navigate("/");
//   };

//   return (
//     <>
//       <aside
//         className="
//           sticky top-16
//           flex flex-col
//           w-72
//           h-[calc(100vh-64px)]
//           min-h-0
//           shrink-0
//           bg-white
//           border-r border-gray-200
//         "
//       >
//         {/* Profile */}

//         {user && (
//           <div className="px-5 py-5 border-b border-gray-100 shrink-0">
//             <div className="flex items-center gap-3">
//               {user?.profileImageUrl ? (
//                 <img
//                   src={user.profileImageUrl}
//                   alt="Profile"
//                   className="w-11 h-11 rounded-full object-cover"
//                 />
//               ) : (
//                 <CharAvatar
//                   fullName={user?.name || ""}
//                   width="w-11"
//                   height="h-11"
//                   style="text-sm"
//                 />
//               )}

//               <div className="min-w-0">
//                 <h2 className="text-sm font-semibold text-gray-900 truncate">
//                   {user?.name}
//                 </h2>

//                 <p
//                   className="text-xs text-gray-400 truncate"
//                   title={user?.email}
//                 >
//                   {user?.email}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Menu */}

//         <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide px-3 py-4">
//           <div className="space-y-1">
//             {(isBlogMenu ? BLOG_NAVBAR_DATA : SIDE_MENU_DATA)?.map(
//               (item, index) => {
//                 const active = activeMenu === item.label;

//                 return (
//                   <button
//                     key={index}
//                     onClick={() => handleClick(item.path)}
//                     className={`
//                       w-full flex items-center gap-3
//                       rounded-md px-3 py-2.5
//                       text-left transition-colors duration-150
//                       ${
//                         active
//                           ? "bg-gray-100 text-gray-900"
//                           : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                       }
//                     `}
//                   >
//                     <item.icon
//                       className={`text-lg shrink-0 ${
//                         active ? "text-gray-900" : "text-gray-400"
//                       }`}
//                     />

//                     <span
//                       className={`text-sm ${
//                         active ? "font-medium" : "font-normal"
//                       }`}
//                     >
//                       {item.label}
//                     </span>
//                   </button>
//                 );
//               },
//             )}
//           </div>
//         </div>

//         {/* Logout */}

//         {user && (
//           <div className="px-3 py-3 shrink-0 border-t border-gray-100 space-y-1">
//             {user.role === "member" && (
//               <button
//                 onClick={handleDeleteProfile}
//                 className="
//                   w-full flex items-center gap-3
//                   rounded-md px-3 py-2.5
//                   text-gray-500
//                   hover:bg-red-50 hover:text-red-600
//                   transition-colors duration-150
//                 "
//               >
//                 <LuTrash2 className="text-lg text-gray-400" />

//                 <span className="text-sm font-normal">Delete Account</span>
//               </button>
//             )}

//             <button
//               onClick={handleLogout}
//               className="
//                 w-full flex items-center gap-3
//                 rounded-md px-3 py-2.5
//                 text-gray-500
//                 hover:bg-red-50 hover:text-red-600
//                 transition-colors duration-150
//               "
//             >
//               <LuLogOut className="text-lg text-gray-400" />

//               <span className="text-sm font-normal">Logout</span>
//             </button>
//           </div>
//         )}
//       </aside>
//     </>
//   );
// };

// export default SideMenuDashboard;
