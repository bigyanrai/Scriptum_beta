import { useContext, useEffect, useState, useRef } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { LuSearch } from "react-icons/lu";

import { BLOG_NAVBAR_DATA } from "../../../utils/data";
import SideMenu from "../SideMenu";
import { UserContext } from "../../../context/userContext";
import ProfileInfoCard from "../../Cards/ProfileInfoCard";
import Signup from "../../Auth/Signup";
import Login from "../../Auth/Login";
import Modal from "../../Modal";
import SearchBarPopup from "../../../Pages/Blog/components/SearchBarPopup";
import ForgotPasswordMember from "../../Auth/ForgotPasswordMember";
import EditProfileModal from "../../EditProfileModal";
import DeleteAccountModal from "../../DeleteAccountModal";
import ChangePasswordModal from "../../ChangePasswordModal";
import NotificationBell from "../../notification/NotificationBell";

function BlogNavbar({ activeMenu }) {
  const { user, setOpenAuthForm } = useContext(UserContext);

  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);

  const sideMenuRef = useRef(null);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpenSideMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (openSideMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openSideMenu]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        openSideMenu &&
        sideMenuRef.current &&
        !sideMenuRef.current.contains(e.target)
      ) {
        setOpenSideMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSideMenu]);

  return (
    // <>
    //   {/* Mobile Menu Overlay */}
    //   {openSideMenu && (
    //     <div
    //       className="fixed inset-0 z-30 bg-black/30 transition-opacity duration-300 lg:hidden"
    //       onClick={() => setOpenSideMenu(false)}
    //     />
    //   )}

    //   {/* =====================================================
    //       NAVBAR
    //       ===================================================== */}
    //   <div className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/70 bg-white/90 backdrop-blur-xl shadow-sm">
    //     <div className="container mx-auto flex h-16 md:h-[68px] items-center justify-between px-5 md:px-2">
    //       {/* =================================================
    //           LEFT
    //           ================================================= */}
    //       <div className="flex items-center gap-4 md:gap-6">
    //         {/* Mobile Menu Button */}
    //         <button
    //           type="button"
    //           aria-label={
    //             openSideMenu ? "Close navigation menu" : "Open navigation menu"
    //           }
    //           className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-black transition-colors duration-200 hover:bg-gray-100 lg:hidden"
    //           onClick={() => setOpenSideMenu((prev) => !prev)}
    //         >
    //           {openSideMenu ? (
    //             <HiOutlineX className="text-2xl" />
    //           ) : (
    //             <HiOutlineMenu className="text-2xl" />
    //           )}
    //         </button>

    //         {/* Logo */}
    //         <Link
    //           to="/"
    //           className="flex items-center justify-center transition-transform duration-300 hover:scale-105"
    //         >
    //           <span className="w-auto object-contain font-bold">Scriptum</span>
    //         </Link>
    //       </div>

    //       {/* =================================================
    //           DESKTOP NAVIGATION
    //           ================================================= */}
    //       <nav className="hidden md:flex items-center gap-9">
    //         {BLOG_NAVBAR_DATA.map((item) => {
    //           if (item?.onlySideMenu) return null;

    //           return (
    //             <Link key={item.id} to={item.path}>
    //               <li className="group relative list-none cursor-pointer py-2 text-[15px] font-medium text-gray-700 transition-colors duration-300 hover:text-sky-500">
    //                 <div className="flex items-center justify-center gap-2">
    //                   <item.icon />
    //                   {item.label}
    //                 </div>

    //                 {/* Active underline */}
    //                 <span
    //                   className={`absolute left-0 -bottom-[2px] h-[2px] rounded-full bg-sky-500 transition-all duration-300 ${
    //                     activeMenu === item.label
    //                       ? "w-full"
    //                       : "w-0 group-hover:w-full"
    //                   }`}
    //                 />
    //               </li>
    //             </Link>
    //           );
    //         })}
    //       </nav>

    //       {/* =================================================
    //           RIGHT
    //           ================================================= */}
    //       <div className="flex items-center gap-4">
    //         {/* Search */}
    //         <button
    //           type="button"
    //           aria-label="Search"
    //           className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-all duration-300 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-500"
    //           onClick={() => setOpenSearchBar(true)}
    //         >
    //           <LuSearch className="text-[19px]" />
    //         </button>

    //         {/* Authentication / Profile */}
    //         {!user ? (
    //           <button
    //             type="button"
    //             className="font-light text-lg transition-transform duration-300 hover:scale-105"
    //             onClick={() => setOpenAuthForm(true)}
    //           >
    //             Login
    //           </button>
    //         ) : (
    //           <div className="hidden md:flex items-center">
    //             <ProfileInfoCard />
    //           </div>
    //         )}
    //       </div>

    //       {/* =================================================
    //           MOBILE SIDE MENU
    //           ================================================= */}
    //       <div
    //         ref={sideMenuRef}
    //         className={`
    //           fixed
    //           left-0
    //           top-16
    //           md:top-[68px]
    //           z-40
    //           h-[calc(100vh-64px)]
    //           md:h-[calc(100vh-68px)]
    //           w-72
    //           bg-white
    //           border-r
    //           border-gray-200
    //           shadow-lg
    //           transform-gpu
    //           will-change-transform
    //           transition-transform
    //           duration-300
    //           ease-out
    //           ${openSideMenu ? "translate-x-0" : "-translate-x-full"}
    //         `}
    //       >
    //         <SideMenu
    //           activeMenu={activeMenu}
    //           isBlogMenu
    //           setOpenSideMenu={setOpenSideMenu}
    //         />
    //       </div>
    //     </div>
    //   </div>

    //   {/* =====================================================
    //       AUTH MODAL
    //       ===================================================== */}
    //   <AuthModel />

    //   {/* =====================================================
    //       SEARCH MODAL
    //       ===================================================== */}
    //   <SearchBarPopup isOpen={openSearchBar} setIsOpen={setOpenSearchBar} />

    //   {/* =====================================================
    //       PROFILE MODALS
    //       ===================================================== */}
    //   <EditProfileModal />
    //   <DeleteAccountModal />
    // </>
    <>
      {/* Mobile Menu Overlay */}
      {openSideMenu && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden"
          onClick={() => setOpenSideMenu(false)}
        />
      )}

      {/* =====================================================
      NAVBAR
      ===================================================== */}
      <div className="fixed inset-x-0 top-0 z-50 border-b border-gray-200/80 bg-white/95 shadow-[0_1px_12px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-2 md:h-[68px] ">
          {/* =================================================
          LEFT
          ================================================= */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={
                openSideMenu ? "Close navigation menu" : "Open navigation menu"
              }
              className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-gray-200
            bg-white
            text-gray-700
            shadow-sm
            transition-all
            duration-200
            hover:border-gray-300
            hover:bg-gray-50
            hover:text-black
            active:scale-95
            lg:hidden
          "
              onClick={() => setOpenSideMenu((prev) => !prev)}
            >
              {openSideMenu ? (
                <HiOutlineX className="text-xl" />
              ) : (
                <HiOutlineMenu className="text-xl" />
              )}
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="
            group
            flex
            items-center
            justify-center
            transition-opacity
            duration-200
            hover:opacity-70
          "
            >
              <span
                className="
              text-lg
              font-bold
              tracking-[-0.03em]
              text-gray-950
              sm:text-xl
            "
              >
                Scriptum
              </span>
            </Link>
          </div>

          {/* =================================================
          DESKTOP NAVIGATION
          ================================================= */}
          <nav className="hidden items-center gap-7 md:flex lg:gap-9">
            {BLOG_NAVBAR_DATA.map((item) => {
              if (item?.onlySideMenu) return null;

              return (
                <Link key={item.id} to={item.path}>
                  <li
                    className="
                  group
                  relative
                  list-none
                  cursor-pointer
                  py-2.5
                  text-[13px]
                  font-medium
                  tracking-[-0.01em]
                  text-gray-500
                  transition-colors
                  duration-200
                  hover:text-gray-950
                  lg:text-sm
                "
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <item.icon
                        className="
                      text-[15px]
                      transition-transform
                      duration-200
                      group-hover:-translate-y-0.5
                    "
                      />

                      {item.label}
                    </div>

                    {/* Active underline */}
                    <span
                      className={`
                    absolute
                    bottom-0
                    left-1/2
                    h-[2px]
                    -translate-x-1/2
                    rounded-full
                    bg-gray-950
                    transition-all
                    duration-300
                    ${
                      activeMenu === item.label
                        ? "w-full"
                        : "w-0 group-hover:w-3/4"
                    }
                  `}
                    />
                  </li>
                </Link>
              );
            })}
          </nav>

          {/* =================================================
          RIGHT
          ================================================= */}
          {/* Search */}
          {/* <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              aria-label="Search"
              className="
            group
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-gray-200
            bg-white
            text-gray-600
            shadow-sm
            transition-all
            duration-200
            hover:border-gray-300
            hover:bg-gray-50
            hover:text-gray-950
            active:scale-95
            sm:h-10
            sm:w-10
          "
              onClick={() => setOpenSearchBar(true)}
            >
              <LuSearch
                className="
              text-[17px]
              transition-transform
              duration-200
              group-hover:scale-105
              sm:text-[18px]
            "
              />
            </button>



            {!user ? (
              <button
                type="button"
                className="
              rounded-lg
              px-2.5
              py-2
              text-sm
              font-medium
              text-gray-700
              transition-all
              duration-200
              hover:bg-gray-100
              hover:text-gray-950
              active:scale-[0.98]
              sm:px-3
              sm:text-[15px]
            "
                onClick={() => setOpenAuthForm(true)}
              >
                Login
              </button>
            ) : (
              <div className="hidden items-center md:flex">
                <ProfileInfoCard />
              </div>
            )}
          </div> */}

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              className="
      group
      flex
      h-9
      w-9
      items-center
      justify-center
      rounded-full
      border
      border-gray-200
      bg-white
      text-gray-600
      shadow-sm
      transition-all
      duration-200
      hover:border-gray-300
      hover:bg-gray-50
      hover:text-gray-950
      active:scale-95
      sm:h-10
      sm:w-10
    "
              onClick={() => setOpenSearchBar(true)}
            >
              <LuSearch
                className="
        text-[17px]
        transition-transform
        duration-200
        group-hover:scale-105
        sm:text-[18px]
      "
              />
            </button>

            {/* Notifications */}
            {user && <NotificationBell />}

            {/* Authentication / Profile */}
            {!user ? (
              <button
                type="button"
                className="
        rounded-lg
        px-2.5
        py-2
        text-sm
        font-medium
        text-gray-700
        transition-all
        duration-200
        hover:bg-gray-100
        hover:text-gray-950
        active:scale-[0.98]
        sm:px-3
        sm:text-[15px]
      "
                onClick={() => setOpenAuthForm(true)}
              >
                Login
              </button>
            ) : (
              <div className="hidden items-center md:flex">
                <ProfileInfoCard />
              </div>
            )}
          </div>

          {/* =================================================
          MOBILE SIDE MENU
          ================================================= */}
          <div
            ref={sideMenuRef}
            className={`
          fixed
          left-0
          top-16
          z-40
          h-[calc(100vh-64px)]
          w-[285px]
          border-r
          border-gray-200
          bg-white
          shadow-[8px_0_30px_rgba(0,0,0,0.08)]
          transform-gpu
          will-change-transform
          transition-transform
          duration-300
          ease-out
          md:top-[68px]
          md:h-[calc(100vh-68px)]
          ${openSideMenu ? "translate-x-0" : "-translate-x-full"}
        `}
          >
            <SideMenu
              activeMenu={activeMenu}
              isBlogMenu
              setOpenSideMenu={setOpenSideMenu}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
      AUTH MODAL
      ===================================================== */}
      <AuthModel />

      {/* =====================================================
      SEARCH MODAL
      ===================================================== */}
      <SearchBarPopup isOpen={openSearchBar} setIsOpen={setOpenSearchBar} />

      {/* =====================================================
      PROFILE MODALS
      ===================================================== */}
      <EditProfileModal />
      <DeleteAccountModal />
      <ChangePasswordModal />
    </>
  );
}

export default BlogNavbar;

/* ============================================================
   AUTH MODAL
   ============================================================ */

const AuthModel = () => {
  const { openAuthForm, setOpenAuthForm } = useContext(UserContext);

  const [currentPage, setCurrentPage] = useState("login");

  return (
    <Modal
      isOpen={openAuthForm}
      onClose={() => {
        setOpenAuthForm(false);
        setCurrentPage("login");
      }}
      hideHeader
    >
      <>
        {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}

        {currentPage === "forgot-password" && (
          <ForgotPasswordMember setCurrentPage={setCurrentPage} />
        )}

        {currentPage === "signup" && <Signup setCurrentPage={setCurrentPage} />}
      </>
    </Modal>
  );
};
