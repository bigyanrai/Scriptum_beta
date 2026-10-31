// import { useContext, useState } from "react";
// import { UserContext } from "../../context/userContext.jsx";

// import Navbar from "./Navbar.jsx";
// import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
// import SideMenuDashboard from "./SideMenuDashboard.jsx";

// function DashboardLayout({ children, activeMenu }) {
//   const { user } = useContext(UserContext);
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar activeMenu={activeMenu} />

//       {user && (
//         <div className="flex relative">
//           {/* Sidebar */}
//           <div
//             className={`hidden min-[1000px]:block transition-transform duration-300 ${
//               collapsed ? "-translate-x-full absolute" : "translate-x-0"
//             }`}
//           >
//             <SideMenuDashboard
//               activeMenu={activeMenu}
//               setOpenSideMenu={() => {}}
//             />
//           </div>

//           {/* Toggle */}
//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className={`hidden min-[1000px]:flex fixed top-20 z-50
//     h-9 w-9 items-center justify-center
//     rounded-full border border-gray-200 bg-white shadow-md
//     hover:bg-gray-100 transition-all duration-300
//     ${collapsed ? "left-3" : "left-[270px] translate-x-1/2"}
//   `}
//           >
//             {collapsed ? (
//               <LuPanelLeftOpen size={20} />
//             ) : (
//               <LuPanelLeftClose size={20} />
//             )}
//           </button>

//           {/* Main */}
//           <main
//             className={`flex-1 p-2 transition-all duration-300 ${
//               collapsed ? "" : "ml-0"
//             }`}
//           >
//             <div className="max-w-7xl mx-auto">{children}</div>
//           </main>
//         </div>
//       )}
//     </div>
//   );
// }

// export default DashboardLayout;

import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext.jsx";

import Navbar from "./Navbar.jsx";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import SideMenuDashboard from "./SideMenuDashboard.jsx";

function DashboardLayout({ children, activeMenu }) {
  const { user } = useContext(UserContext);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="relative flex">
          {/* Sidebar */}
          <div
            className={`hidden min-[1000px]:block transition-transform duration-300 ${
              collapsed ? "-translate-x-full absolute" : "translate-x-0"
            }`}
          >
            <SideMenuDashboard
              activeMenu={activeMenu}
              setOpenSideMenu={() => {}}
            />
          </div>

          {/* Toggle */}
          {/* Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Open sidebar" : "Collapse sidebar"}
            title={collapsed ? "Open sidebar" : "Collapse sidebar"}
            className={`
    hidden
    min-[1000px]:flex
    fixed
    top-[82px]
    z-50
    h-6
    w-6
    items-center
    justify-center
    text-gray-400
    transition-all
    duration-200
    hover:text-gray-700
    active:scale-90
    cursor-pointer
    ${collapsed ? "left-3" : "left-[252px]"}
  `}
          >
            {collapsed ? (
              <LuPanelLeftOpen size={20} strokeWidth={2} />
            ) : (
              <LuPanelLeftClose size={20} strokeWidth={2} />
            )}
          </button>

          {/* Main */}
          <main
            className={`flex-1 p-2 transition-all duration-300 ${
              collapsed ? "" : "ml-0"
            }`}
          >
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;
