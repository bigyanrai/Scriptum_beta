// // // import { BLOG_NAVBAR_DATA, SIDE_MENU_DATA } from "../../utils/data";
// // // import { LuLogOut, LuTrash2, LuUserPen } from "react-icons/lu";
// // // import { useNavigate } from "react-router-dom";
// // // import CharAvatar from "../Cards/CharAvatar";
// // // import { useContext } from "react";
// // // import { UserContext } from "../../context/userContext";

// // // const SideMenu = ({ activeMenu, isBlogMenu, setOpenSideMenu }) => {
// // //   const { user, setUser, setOpenDeleteAccount, setOpenEditProfile } =
// // //     useContext(UserContext);

// // //   const handleDeleteProfile = () => {
// // //     setOpenDeleteAccount(true);
// // //     setOpenSideMenu((prev) => !prev);
// // //   };
// // //   const handleEditProfile = () => {
// // //     setOpenEditProfile(true);
// // //     setOpenSideMenu((prev) => !prev);
// // //   };

// // //   const navigate = useNavigate();

// // //   const handleClick = (route) => {
// // //     if (route === "logout") {
// // //       handleLogout();
// // //       return;
// // //     }

// // //     setOpenSideMenu((prev) => !prev);
// // //     navigate(route);
// // //   };

// // //   const handleLogout = () => {
// // //     localStorage.clear();
// // //     setUser(null);
// // //     setOpenSideMenu((prev) => !prev);
// // //     navigate("/");
// // //   };

// // //   return (
// // //     <>
// // //       <aside className="sticky top-16 h-[calc(100vh-64px)] w-72 bg-white border-r border-gray-200 overflow-y-auto scrollbar-hide shadow-sm">
// // //         {/* Profile */}

// // //         {user && (
// // //           <div className="px-6 pt-8 pb-6 border-b border-gray-100">
// // //             <div className="flex flex-col items-center">
// // //               {user?.profileImageUrl ? (
// // //                 <img
// // //                   src={user.profileImageUrl}
// // //                   alt="Profile"
// // //                   className="w-20 h-20 rounded-full object-cover ring-4 ring-sky-100"
// // //                 />
// // //               ) : (
// // //                 <CharAvatar
// // //                   fullName={user?.name || ""}
// // //                   width="w-20"
// // //                   height="h-20"
// // //                   style="text-xl"
// // //                 />
// // //               )}

// // //               <h2 className="mt-4 text-lg font-semibold text-gray-900">
// // //                 {user?.name}
// // //               </h2>

// // //               <p className="text-sm text-gray-500 text-center break-all">
// // //                 {user?.email}
// // //               </p>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Menu */}

// // //         <div className="px-1 py-2">
// // //           {(isBlogMenu ? BLOG_NAVBAR_DATA : SIDE_MENU_DATA)?.map(
// // //             (item, index) => {
// // //               const active = activeMenu === item.label;

// // //               return (
// // //                 <button
// // //                   key={index}
// // //                   onClick={() => handleClick(item.path)}
// // //                   className={`group w-full flex items-center gap-4 rounded-sm px-5 py-3 mb-2 transition-all duration-200

// // //                   ${
// // //                     active
// // //                       ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-200"
// // //                       : "text-gray-700 hover:bg-sky-50 hover:text-sky-600"
// // //                   }`}
// // //                 >
// // //                   <item.icon
// // //                     className={`text-xl transition-transform duration-200 ${
// // //                       active ? "" : "group-hover:scale-110"
// // //                     }`}
// // //                   />

// // //                   <span className="font-medium">{item.label}</span>
// // //                 </button>
// // //               );
// // //             },
// // //           )}
// // //         </div>

// // //         {/* Logout */}

// // //         {user && (
// // //           <div className="px-1 pb-2 mt-auto space-y-2">
// // //             <button
// // //               onClick={handleEditProfile}
// // //               className="w-full flex items-center gap-4 rounded-xl px-5 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
// // //             >
// // //               <LuUserPen className="text-xl" />
// // //               <span className="font-medium">Edit Profile</span>
// // //             </button>
// // //             {user.role === "member" && (
// // //               <>
// // //                 <button
// // //                   onClick={handleDeleteProfile}
// // //                   className="w-full flex items-center gap-4 rounded-xl px-5 py-3 text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors duration-200"
// // //                 >
// // //                   <LuTrash2 className="text-xl" />
// // //                   <span className="font-medium">Delete Account</span>
// // //                 </button>
// // //               </>
// // //             )}

// // //             <button
// // //               onClick={handleLogout}
// // //               className="w-full flex items-center gap-4 rounded-xl px-5 py-3 text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors duration-200"
// // //             >
// // //               <LuLogOut className="text-xl transition-transform duration-200" />
// // //               <span className="font-medium">Logout</span>
// // //             </button>
// // //           </div>
// // //         )}
// // //       </aside>
// // //     </>
// // //   );
// // // };

// // // export default SideMenu;

// // import { BLOG_NAVBAR_DATA, SIDE_MENU_DATA } from "../../utils/data";
// // import {
// //   LuBookmark,
// //   LuLayoutDashboard,
// //   LuLogOut,
// //   LuTrash2,
// //   LuUserPen,
// // } from "react-icons/lu";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import CharAvatar from "../Cards/CharAvatar";
// // import { useContext } from "react";
// // import { UserContext } from "../../context/userContext";

// // const SideMenu = ({ activeMenu, isBlogMenu, setOpenSideMenu }) => {
// //   const { user, setUser, setOpenDeleteAccount, setOpenEditProfile } =
// //     useContext(UserContext);

// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const handleSavedPosts = () => {
// //     navigate("/saved-posts");
// //     setOpenSideMenu((prev) => !prev);
// //   };
// //   const handleDeleteProfile = () => {
// //     setOpenDeleteAccount(true);
// //   };

// //   const handleEditProfile = () => {
// //     setOpenEditProfile(true);
// //     setOpenSideMenu((prev) => !prev);
// //   };

// //   const handleClick = (route) => {
// //     if (route === "logout") {
// //       handleLogout();
// //       return;
// //     }

// //     setOpenSideMenu((prev) => !prev);
// //     navigate(route);
// //   };

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     setUser(null);
// //     setOpenSideMenu((prev) => !prev);
// //     navigate("/");
// //   };

// //   const handleAdminDashboard = () => {
// //     navigate("/admin/dashboard");

// //     setOpenSideMenu((prev) => !prev);
// //   };

// //   // Check if current path starts with /admin
// //   const isAdminRoute = location.pathname.startsWith("/admin");

// //   return (
// //     <>
// //       <aside className="sticky top-16 h-[calc(100vh-64px)] w-72 bg-white border-r border-gray-200 overflow-y-auto scrollbar-hide shadow-sm">
// //         {/* Profile */}
// //         {user && (
// //           <div className="px-6 pt-8 pb-6 border-b border-gray-100">
// //             <div className="flex flex-col items-center">
// //               {user?.profileImageUrl ? (
// //                 <img
// //                   src={user.profileImageUrl}
// //                   alt="Profile"
// //                   className="w-20 h-20 rounded-full object-cover ring-4 ring-sky-100"
// //                 />
// //               ) : (
// //                 <CharAvatar
// //                   fullName={user?.name || ""}
// //                   width="w-20"
// //                   height="h-20"
// //                   style="text-xl"
// //                 />
// //               )}
// //               <h2 className="mt-4 text-lg font-semibold text-gray-900">
// //                 {user?.name}
// //               </h2>
// //               <p className="text-sm text-gray-500 text-center break-all">
// //                 {user?.email}
// //               </p>
// //             </div>
// //           </div>
// //         )}

// //         {/* Menu */}
// //         <div className="px-1 py-2">
// //           {(isBlogMenu ? BLOG_NAVBAR_DATA : SIDE_MENU_DATA)?.map(
// //             (item, index) => {
// //               const active = activeMenu === item.label;
// //               return (
// //                 <button
// //                   key={index}
// //                   onClick={() => handleClick(item.path)}
// //                   className={`group w-full flex items-center gap-4 rounded-sm px-5 py-3 mb-2 transition-all duration-200
// //                   ${
// //                     active
// //                       ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-200"
// //                       : "text-gray-700 hover:bg-sky-50 hover:text-sky-600"
// //                   }`}
// //                 >
// //                   <item.icon
// //                     className={`text-xl transition-transform duration-200 ${
// //                       active ? "" : "group-hover:scale-110"
// //                     }`}
// //                   />
// //                   <span className="font-medium">{item.label}</span>
// //                 </button>
// //               );
// //             },
// //           )}
// //           {user?.role === "admin" && !isAdminRoute && (
// //             <button
// //               onClick={handleAdminDashboard}
// //               className={` hover:bg-sky-50 hover:text-sky-600 group w-full flex items-center gap-4 rounded-sm px-5 py-3 mb-2 transition-all duration-200  text-gray-700 hover:bg-sky-50 hover:text-sky-600"
// //                   }`}
// //             >
// //               <LuLayoutDashboard
// //                 size={18}
// //                 className={`text-xl transition-transform duration-200 group-hover:scale-110`}
// //               />
// //               <span className="font-medium">Admin Dashboard</span>
// //             </button>
// //           )}
// //         </div>

// //         {/* Logout & Profile Actions */}
// //         {user && (
// //           <div className="px-1 pb-2 mt-auto space-y-2">
// //             {/* Only show Edit Profile if not in /admin route */}
// //             {!isAdminRoute && (
// //               <button
// //                 onClick={handleEditProfile}
// //                 className={` hover:bg-sky-50 hover:text-sky-600 group w-full flex items-center gap-4 rounded-sm px-5 py-3 mb-2 transition-all duration-200  text-gray-700 hover:bg-sky-50 hover:text-sky-600"
// //                   }`}
// //               >
// //                 <LuUserPen
// //                   className={`text-xl transition-transform duration-200 group-hover:scale-110`}
// //                 />
// //                 <span className="font-medium">Edit Profile</span>
// //               </button>
// //             )}
// //             {!isAdminRoute && (
// //               <button
// //                 onClick={handleSavedPosts}
// //                 className={` hover:bg-sky-50 hover:text-sky-600 group w-full flex items-center gap-4 rounded-sm px-5 py-3 mb-2 transition-all duration-200  text-gray-700 hover:bg-sky-50 hover:text-sky-600"
// //                   }`}
// //               >
// //                 <LuBookmark
// //                   className={`text-xl transition-transform duration-200 group-hover:scale-110`}
// //                 />
// //                 <span className="font-medium">Saved Posts</span>
// //               </button>
// //             )}

// //             {user.role === "member" && (
// //               <button
// //                 onClick={handleDeleteProfile}
// //                 className="w-full flex items-center gap-4 rounded-xl px-5 py-3 text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors duration-200"
// //               >
// //                 <LuTrash2 className="text-xl" />
// //                 <span className="font-medium">Delete Account</span>
// //               </button>
// //             )}

// //             <button
// //               onClick={handleLogout}
// //               className="w-full flex items-center gap-4 rounded-xl px-5 py-3 text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors duration-200"
// //             >
// //               <LuLogOut className="text-xl transition-transform duration-200" />
// //               <span className="font-medium">Logout</span>
// //             </button>
// //           </div>
// //         )}
// //       </aside>
// //     </>
// //   );
// // };

// // export default SideMenu;

// import { BLOG_NAVBAR_DATA, SIDE_MENU_DATA } from "../../utils/data";
// import {
//   LuBookmark,
//   LuLayoutDashboard,
//   LuLogOut,
//   LuTrash2,
//   LuUserPen,
// } from "react-icons/lu";
// import { useNavigate, useLocation } from "react-router-dom";
// import CharAvatar from "../Cards/CharAvatar";
// import { useContext } from "react";
// import { UserContext } from "../../context/userContext";

// const SideMenu = ({ activeMenu, isBlogMenu, setOpenSideMenu }) => {
//   const { user, setUser, setOpenDeleteAccount, setOpenEditProfile } =
//     useContext(UserContext);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleSavedPosts = () => {
//     navigate("/saved-posts");
//     setOpenSideMenu((prev) => !prev);
//   };

//   const handleDeleteProfile = () => {
//     setOpenDeleteAccount(true);
//   };

//   const handleEditProfile = () => {
//     setOpenEditProfile(true);
//     setOpenSideMenu((prev) => !prev);
//   };

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

//   const handleAdminDashboard = () => {
//     navigate("/admin/dashboard");
//     setOpenSideMenu((prev) => !prev);
//   };

//   // Check if current path starts with /admin
//   const isAdminRoute = location.pathname.startsWith("/admin");

//   // --------------------------------------------------
//   // Check whether a menu item is active from URL
//   // --------------------------------------------------
//   const isMenuItemActive = (item) => {
//     const currentPath = location.pathname;
//     const itemPath = item.path;

//     if (!itemPath) return false;

//     // Exact match
//     if (currentPath === itemPath) {
//       return true;
//     }

//     // Match nested routes
//     // Example:
//     // /blogposts
//     // /blogposts/create
//     // /blogposts/edit/123
//     if (itemPath !== "/" && currentPath.startsWith(`${itemPath}/`)) {
//       return true;
//     }

//     return false;
//   };

//   return (
//     <aside
//       className="
//         sticky top-16
//         flex h-[calc(100vh-64px)]
//         w-full sm:w-64 lg:w-72
//         shrink-0
//         flex-col
//         overflow-y-auto
//         border-r border-slate-200
//         bg-white
//         shadow-sm
//         scrollbar-hide
//       "
//     >
//       {/* ==================================================
//           PROFILE
//       ================================================== */}

//       {user && (
//         <div
//           className="
//             border-b border-slate-100
//             px-4 py-6
//             sm:px-5 sm:py-7
//             lg:px-6
//           "
//         >
//           <div className="flex flex-col items-center">
//             {/* Profile image */}

//             <div className="relative">
//               {user?.profileImageUrl ? (
//                 <img
//                   src={user.profileImageUrl}
//                   alt="Profile"
//                   className="
//                     h-16 w-16
//                     rounded-full
//                     object-cover
//                     ring-4 ring-sky-50
//                     sm:h-[72px] sm:w-[72px]
//                     lg:h-20 lg:w-20
//                   "
//                 />
//               ) : (
//                 <CharAvatar
//                   fullName={user?.name || ""}
//                   width="w-16 sm:w-[72px] lg:w-20"
//                   height="h-16 sm:h-[72px] lg:h-20"
//                   style="text-lg sm:text-xl"
//                 />
//               )}

//               {/* Online indicator */}

//               <span
//                 className="
//                   absolute
//                   bottom-0.5
//                   right-0.5
//                   h-3
//                   w-3
//                   rounded-full
//                   border-2
//                   border-white
//                   bg-emerald-500
//                   sm:h-3.5
//                   sm:w-3.5
//                 "
//               />
//             </div>

//             {/* Name */}

//             <h2
//               className="
//                 mt-3
//                 max-w-full
//                 truncate
//                 px-2
//                 text-sm
//                 font-semibold
//                 tracking-tight
//                 text-slate-900
//                 sm:text-[15px]
//               "
//             >
//               {user?.name}
//             </h2>

//             {/* Email */}

//             <p
//               className="
//                 mt-0.5
//                 max-w-full
//                 truncate
//                 px-2
//                 text-[11px]
//                 leading-5
//                 text-slate-400
//                 sm:text-xs
//               "
//               title={user?.email}
//             >
//               {user?.email}
//             </p>

//             {/* Role */}

//             <span
//               className="
//                 mt-2
//                 rounded-full
//                 border border-sky-100
//                 bg-sky-50
//                 px-2.5
//                 py-0.5
//                 text-[9px]
//                 font-semibold
//                 uppercase
//                 tracking-wider
//                 text-sky-600
//               "
//             >
//               {user?.role}
//             </span>
//           </div>
//         </div>
//       )}

//       {/* ==================================================
//           MENU
//       ================================================== */}

//       <nav className="flex-1 px-2 py-3 sm:px-3 sm:py-4">
//         {/* Section label */}

//         <p
//           className="
//             mb-2
//             px-3
//             text-[9px]
//             font-semibold
//             uppercase
//             tracking-[0.12em]
//             text-slate-400
//           "
//         >
//           Navigation
//         </p>

//         <div className="space-y-1">
//           {(isBlogMenu ? BLOG_NAVBAR_DATA : SIDE_MENU_DATA)?.map(
//             (item, index) => {
//               /*
//                * IMPORTANT:
//                * Active state is now determined from the URL.
//                *
//                * activeMenu is kept as a fallback so existing
//                * parent components continue to work exactly as before.
//                */
//               const active =
//                 isMenuItemActive(item) ||
//                 (!location.pathname && activeMenu === item.label);

//               return (
//                 <button
//                   key={index}
//                   type="button"
//                   onClick={() => handleClick(item.path)}
//                   className={`
//                     group
//                     relative
//                     flex
//                     w-full
//                     items-center
//                     gap-3
//                     rounded-lg
//                     px-3
//                     py-2.5
//                     text-left
//                     transition-all
//                     duration-200
//                     sm:px-3.5

//                     ${
//                       active
//                         ? `
//                           bg-sky-50
//                           text-sky-600
//                           shadow-sm
//                         `
//                         : `
//                           text-slate-600
//                           hover:bg-slate-50
//                           hover:text-slate-900
//                         `
//                     }
//                   `}
//                 >
//                   {/* Active indicator */}

//                   {active && (
//                     <span
//                       className="
//                         absolute
//                         left-0
//                         top-1/2
//                         h-5
//                         w-0.5
//                         -translate-y-1/2
//                         rounded-r-full
//                         bg-sky-500
//                       "
//                     />
//                   )}

//                   {/* Icon */}

//                   <span
//                     className={`
//                       flex
//                       h-8
//                       w-8
//                       shrink-0
//                       items-center
//                       justify-center
//                       rounded-lg
//                       transition-all
//                       duration-200

//                       ${
//                         active
//                           ? "bg-white text-sky-600 shadow-sm"
//                           : "text-slate-400 group-hover:bg-white group-hover:text-slate-600"
//                       }
//                     `}
//                   >
//                     <item.icon
//                       className="
//                         text-[17px]
//                         transition-transform
//                         duration-200
//                         group-hover:scale-105
//                       "
//                     />
//                   </span>

//                   {/* Label */}

//                   <span
//                     className={`
//                       truncate
//                       text-[12px]
//                       sm:text-[13px]

//                       ${
//                         active
//                           ? "font-semibold text-sky-600"
//                           : "font-medium text-slate-600"
//                       }
//                     `}
//                   >
//                     {item.label}
//                   </span>
//                 </button>
//               );
//             },
//           )}
//         </div>

//         {/* ==================================================
//             ADMIN DASHBOARD
//         ================================================== */}

//         {user?.role === "admin" && !isAdminRoute && (
//           <div className="mt-4 border-t border-slate-100 pt-3">
//             <p
//               className="
//                 mb-2
//                 px-3
//                 text-[9px]
//                 font-semibold
//                 uppercase
//                 tracking-[0.12em]
//                 text-slate-400
//               "
//             >
//               Administration
//             </p>

//             <button
//               type="button"
//               onClick={handleAdminDashboard}
//               className="
//                 group
//                 flex
//                 w-full
//                 items-center
//                 gap-3
//                 rounded-lg
//                 px-3
//                 py-2.5
//                 text-left
//                 text-slate-600
//                 transition-all
//                 duration-200
//                 hover:bg-sky-50
//                 hover:text-sky-600
//                 sm:px-3.5
//               "
//             >
//               <span
//                 className="
//                   flex
//                   h-8
//                   w-8
//                   shrink-0
//                   items-center
//                   justify-center
//                   rounded-lg
//                   bg-slate-50
//                   text-slate-400
//                   transition-all
//                   duration-200
//                   group-hover:bg-white
//                   group-hover:text-sky-600
//                   group-hover:shadow-sm
//                 "
//               >
//                 <LuLayoutDashboard
//                   className="
//                     text-[17px]
//                     transition-transform
//                     duration-200
//                     group-hover:scale-105
//                   "
//                 />
//               </span>

//               <span className="text-[12px] font-medium sm:text-[13px]">
//                 Admin Dashboard
//               </span>
//             </button>
//           </div>
//         )}

//         {/* ==================================================
//             USER ACTIONS
//         ================================================== */}

//         {user && !isAdminRoute && (
//           <div className="mt-4 border-t border-slate-100 pt-3">
//             <p
//               className="
//                 mb-2
//                 px-3
//                 text-[9px]
//                 font-semibold
//                 uppercase
//                 tracking-[0.12em]
//                 text-slate-400
//               "
//             >
//               Account
//             </p>

//             {/* Edit Profile */}

//             <button
//               type="button"
//               onClick={handleEditProfile}
//               className="
//                 group
//                 flex
//                 w-full
//                 items-center
//                 gap-3
//                 rounded-lg
//                 px-3
//                 py-2.5
//                 text-left
//                 text-slate-600
//                 transition-all
//                 duration-200
//                 hover:bg-slate-50
//                 hover:text-slate-900
//                 sm:px-3.5
//               "
//             >
//               <span
//                 className="
//                   flex
//                   h-8
//                   w-8
//                   shrink-0
//                   items-center
//                   justify-center
//                   rounded-lg
//                   bg-slate-50
//                   text-slate-400
//                   transition-all
//                   duration-200
//                   group-hover:bg-white
//                   group-hover:text-slate-600
//                   group-hover:shadow-sm
//                 "
//               >
//                 <LuUserPen
//                   className="
//                     text-[17px]
//                     transition-transform
//                     duration-200
//                     group-hover:scale-105
//                   "
//                 />
//               </span>

//               <span className="text-[12px] font-medium sm:text-[13px]">
//                 Edit Profile
//               </span>
//             </button>

//             {/* Saved Posts */}

//             <button
//               type="button"
//               onClick={handleSavedPosts}
//               className={`
//                 group
//                 mt-1
//                 flex
//                 w-full
//                 items-center
//                 gap-3
//                 rounded-lg
//                 px-3
//                 py-2.5
//                 text-left
//                 transition-all
//                 duration-200
//                 sm:px-3.5

//                 ${
//                   location.pathname === "/saved-posts"
//                     ? "bg-sky-50 text-sky-600 shadow-sm"
//                     : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//                 }
//               `}
//             >
//               {/* Active indicator */}

//               {location.pathname === "/saved-posts" && (
//                 <span
//                   className="
//                     absolute
//                     left-0
//                     h-5
//                     w-0.5
//                     rounded-r-full
//                     bg-sky-500
//                   "
//                 />
//               )}

//               <span
//                 className={`
//                   flex
//                   h-8
//                   w-8
//                   shrink-0
//                   items-center
//                   justify-center
//                   rounded-lg
//                   transition-all
//                   duration-200

//                   ${
//                     location.pathname === "/saved-posts"
//                       ? "bg-white text-sky-600 shadow-sm"
//                       : "bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-slate-600"
//                   }
//                 `}
//               >
//                 <LuBookmark
//                   className="
//                     text-[17px]
//                     transition-transform
//                     duration-200
//                     group-hover:scale-105
//                   "
//                 />
//               </span>

//               <span
//                 className={`
//                   text-[12px]
//                   sm:text-[13px]
//                   ${
//                     location.pathname === "/saved-posts"
//                       ? "font-semibold text-sky-600"
//                       : "font-medium text-slate-600"
//                   }
//                 `}
//               >
//                 Saved Posts
//               </span>
//             </button>

//             {/* Delete Account */}

//             {user.role === "member" && (
//               <button
//                 type="button"
//                 onClick={handleDeleteProfile}
//                 className="
//                   group
//                   mt-1
//                   flex
//                   w-full
//                   items-center
//                   gap-3
//                   rounded-lg
//                   px-3
//                   py-2.5
//                   text-left
//                   text-slate-500
//                   transition-all
//                   duration-200
//                   hover:bg-red-50
//                   hover:text-red-600
//                   sm:px-3.5
//                 "
//               >
//                 <span
//                   className="
//                     flex
//                     h-8
//                     w-8
//                     shrink-0
//                     items-center
//                     justify-center
//                     rounded-lg
//                     bg-slate-50
//                     text-slate-400
//                     transition-all
//                     duration-200
//                     group-hover:bg-red-100
//                     group-hover:text-red-500
//                   "
//                 >
//                   <LuTrash2
//                     className="
//                       text-[17px]
//                       transition-transform
//                       duration-200
//                       group-hover:scale-105
//                     "
//                   />
//                 </span>

//                 <span className="text-[12px] font-medium sm:text-[13px]">
//                   Delete Account
//                 </span>
//               </button>
//             )}
//           </div>
//         )}
//       </nav>

//       {/* ==================================================
//           LOGOUT
//       ================================================== */}

//       {user && (
//         <div
//           className="
//             shrink-0
//             border-t
//             border-slate-100
//             bg-slate-50/50
//             px-2
//             py-3
//             sm:px-3
//             sm:py-4
//           "
//         >
//           <button
//             type="button"
//             onClick={handleLogout}
//             className="
//               group
//               flex
//               w-full
//               items-center
//               gap-3
//               rounded-lg
//               px-3
//               py-2.5
//               text-left
//               text-slate-500
//               transition-all
//               duration-200
//               hover:bg-red-50
//               hover:text-red-600
//               sm:px-3.5
//             "
//           >
//             <span
//               className="
//                 flex
//                 h-8
//                 w-8
//                 shrink-0
//                 items-center
//                 justify-center
//                 rounded-lg
//                 bg-white
//                 text-slate-400
//                 shadow-sm
//                 transition-all
//                 duration-200
//                 group-hover:bg-red-100
//                 group-hover:text-red-500
//               "
//             >
//               <LuLogOut
//                 className="
//                   text-[17px]
//                   transition-transform
//                   duration-200
//                   group-hover:translate-x-0.5
//                 "
//               />
//             </span>

//             <span className="text-[12px] font-medium sm:text-[13px]">
//               Logout
//             </span>
//           </button>
//         </div>
//       )}
//     </aside>
//   );
// };

// export default SideMenu;

import { BLOG_NAVBAR_DATA, SIDE_MENU_DATA } from "../../utils/data";
import {
  LuActivity,
  LuBookmark,
  LuKeyRound,
  LuLayoutDashboard,
  LuLogOut,
  LuNotebook,
  LuTrash2,
  LuUserPen,
} from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const SideMenu = ({ activeMenu, isBlogMenu, setOpenSideMenu }) => {
  const {
    user,
    setUser,
    setOpenDeleteAccount,
    setOpenEditProfile,
    setOpenChangePassword,
  } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSavedPosts = () => {
    navigate("/saved-posts");
    setOpenSideMenu((prev) => !prev);
  };
  const handleActivity = () => {
    navigate("/activity");
    setOpenSideMenu((prev) => !prev);
  };
  const handleMyPosts = () => {
    navigate("/posts");
    setOpenSideMenu((prev) => !prev);
  };

  const handleDeleteProfile = () => {
    setOpenDeleteAccount(true);
  };

  const handleChangePassword = () => {
    setOpenChangePassword(true);
    setOpenSideMenu((prev) => !prev);
  };

  const handleEditProfile = () => {
    setOpenEditProfile(true);
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

  const handleAdminDashboard = () => {
    navigate("/admin/dashboard");
    setOpenSideMenu((prev) => !prev);
  };

  // Check if current path starts with /admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  // --------------------------------------------------
  // Check whether a menu item is active from URL
  // --------------------------------------------------
  const isMenuItemActive = (item) => {
    const currentPath = location.pathname;
    const itemPath = item.path;

    if (!itemPath) return false;

    // Exact match
    if (currentPath === itemPath) {
      return true;
    }

    // Match nested routes
    // Example:
    // /blogposts
    // /blogposts/create
    // /blogposts/edit/123
    if (itemPath !== "/" && currentPath.startsWith(`${itemPath}/`)) {
      return true;
    }

    return false;
  };

  return (
    <aside
      className="
        sticky top-16
        flex h-[calc(100vh-64px)]
        w-full 
        shrink-0
        flex-col
        overflow-y-auto
        
        bg-white
        scrollbar-hide
      "
    >
      {/* Profile */}
      {user && (
        <div className="border-b border-gray-100 px-5 py-5">
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
              <p className="truncate text-sm font-semibold text-gray-900">
                {user?.name}
              </p>

              <p className="truncate text-xs text-gray-400" title={user?.email}>
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Menu */}
      <nav className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {(isBlogMenu ? BLOG_NAVBAR_DATA : SIDE_MENU_DATA)?.map(
            (item, index) => {
              const active =
                isMenuItemActive(item) ||
                (!location.pathname && activeMenu === item.label);

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
                    ${
                      active
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  <item.icon
                    className={`shrink-0 text-lg ${
                      active ? "text-gray-900" : "text-gray-400"
                    }`}
                  />

                  <span
                    className={`text-sm ${
                      active ? "font-medium" : "font-normal"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            },
          )}

          {/* Admin Dashboard */}
          {user?.role === "admin" && !isAdminRoute && (
            <button
              type="button"
              onClick={handleAdminDashboard}
              className="
                flex w-full items-center gap-3
                rounded-md
                px-3 py-2.5
                text-left
                text-gray-600
                transition-colors
                hover:bg-gray-50
                hover:text-gray-900
              "
            >
              <LuLayoutDashboard className="shrink-0 text-lg text-gray-400" />

              <span className="text-sm">Admin Dashboard</span>
            </button>
          )}

          {/* Edit Profile */}
          {user && !isAdminRoute && (
            <>
              <button
                type="button"
                onClick={handleEditProfile}
                className="
                  flex w-full items-center gap-3
                  rounded-md
                  px-3 py-2.5
                  text-left
                  text-gray-600
                  transition-colors
                  hover:bg-gray-50
                  hover:text-gray-900
                "
              >
                <LuUserPen className="shrink-0 text-lg text-gray-400" />

                <span className="text-sm">Edit Profile</span>
              </button>

              {/* Saved Posts */}
              <button
                type="button"
                onClick={handleSavedPosts}
                className={`
                  flex w-full items-center gap-3
                  rounded-md
                  px-3 py-2.5
                  text-left
                  transition-colors
                  ${
                    location.pathname === "/saved-posts"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <LuBookmark
                  className={`shrink-0 text-lg ${
                    location.pathname === "/saved-posts"
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                />

                <span className="text-sm">Saved Posts</span>
              </button>
              {/* activity */}
              <button
                type="button"
                onClick={handleActivity}
                className={`
                  flex w-full items-center gap-3
                  rounded-md
                  px-3 py-2.5
                  text-left
                  transition-colors
                  ${
                    location.pathname === "/activity"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <LuActivity
                  className={`shrink-0 text-lg ${
                    location.pathname === "/activity"
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                />

                <span className="text-sm">Activity</span>
              </button>
              <button
                type="button"
                onClick={handleMyPosts}
                className={`
                  flex w-full items-center gap-3
                  rounded-md
                  px-3 py-2.5
                  text-left
                  transition-colors
                  ${
                    location.pathname === "/posts"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <LuNotebook
                  className={`shrink-0 text-lg ${
                    location.pathname === "/posts"
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                />

                <span className="text-sm">My Posts</span>
              </button>

              {/* Delete Account */}
              {user.role === "member" && (
                <>
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
                    hover:bg-red-50
                    hover:text-red-600
                  "
                  >
                    <LuTrash2 className="shrink-0 text-lg text-gray-400" />

                    <span className="text-sm">Delete Account</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleChangePassword}
                    className="
                    flex w-full items-center gap-3
                    rounded-md
                    px-3 py-2.5
                    text-left
                    text-gray-500
                    transition-colors
                    hover:bg-red-50
                    hover:text-red-600
                  "
                  >
                    <LuKeyRound className="shrink-0 text-lg text-gray-400" />

                    <span className="text-sm">Change Password</span>
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </nav>

      {/* Logout */}
      {user && (
        <div className="border-t border-gray-100 px-3 py-3">
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex w-full items-center gap-3
              rounded-md
              px-3 py-2.5
              text-left
              text-gray-500
              transition-colors
              hover:bg-red-50
              hover:text-red-600
            "
          >
            <LuLogOut className="shrink-0 text-lg text-gray-400" />

            <span className="text-sm">Logout</span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default SideMenu;
