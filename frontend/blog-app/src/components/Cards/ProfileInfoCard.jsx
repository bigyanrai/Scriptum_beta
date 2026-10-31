import { useContext, useRef, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "./CharAvatar";

import {
  LuChevronDown,
  LuUserPen,
  LuLogOut,
  LuLayoutDashboard,
  LuTrash2,
  LuBookmark,
  LuKeyRound,
  LuFiles,
  LuNotebook,
  LuActivity,
} from "react-icons/lu";

const ProfileInfoCard = () => {
  const {
    user,
    clearUser,
    setOpenEditProfile,
    setOpenDeleteAccount,
    setOpenChangePassword,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  const handleSavedPosts = () => {
    navigate("/saved-posts");
    setOpenDropdown(false);
  };
  const handleActivity = () => {
    navigate("/activity");
    setOpenDropdown(false);
  };

  const handleEditProfile = () => {
    setOpenEditProfile(true);
    setOpenDropdown(false);
  };
  const handlePosts = () => {
    navigate("/posts");
    setOpenDropdown(false);
  };

  const handleDeleteProfile = () => {
    setOpenDeleteAccount(true);
    setOpenDropdown(false);
  };

  const handleChangePassword = () => {
    setOpenChangePassword(true);
    setOpenDropdown(false);
  };

  const handleAdminDashboard = () => {
    navigate("/admin/dashboard");
    setOpenDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) return null;

  return (
    <div ref={dropdownRef} className="relative">
      {/* =====================================================
          PROFILE TRIGGER
          ===================================================== */}
      <button
        type="button"
        onClick={() => setOpenDropdown((prev) => !prev)}
        aria-expanded={openDropdown}
        className="
          group
          flex
          cursor-pointer
          items-center
          gap-2.5
          py-1
          transition-colors
          duration-200
        "
      >
        {user.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt={user.name}
            className="
              h-8
              w-8
              rounded-full
              object-cover
              transition-all
              duration-200
              group-hover:ring-2
              group-hover:ring-gray-200
            "
          />
        ) : (
          <CharAvatar
            fullName={user.name || ""}
            width="w-8"
            height="h-8"
            textSize="text-sm"
            className="
              transition-all
              duration-200
              group-hover:ring-2
              group-hover:ring-gray-200
            "
          />
        )}

        <span
          className="
            hidden
            max-w-[140px]
            truncate
            text-sm
            font-medium
            text-gray-800
            transition-colors
            duration-200
            lg:block
            group-hover:text-black
          "
        >
          {user.name}
        </span>

        <LuChevronDown
          size={15}
          className={`
            text-gray-400
            transition-all
            duration-200
            group-hover:text-gray-700
            ${openDropdown ? "rotate-180 text-gray-700" : ""}
          `}
        />
      </button>

      {/* =====================================================
          DROPDOWN
          ===================================================== */}
      <div
        className={`
          fixed
          right-0
          top-[68px]
          z-50
          w-[min(21rem,calc(100vw-1rem))]
          origin-top-right
          overflow-hidden
          
          border
          border-gray-200
          bg-white
        
          transition-all
          duration-200
          ${
            openDropdown
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-1 scale-[0.98] opacity-0"
          }
        `}
      >
        {/* =================================================
            PROFILE HEADER
            ================================================= */}
        <div className="border-b border-gray-100 px-4 py-4">
          <div className="flex items-center gap-3">
            {user.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt={user.name}
                className="
                  h-11
                  w-11
                  shrink-0
                  rounded-full
                  object-cover
                  ring-1
                  ring-gray-200
                "
              />
            ) : (
              <CharAvatar
                fullName={user.name || ""}
                width="w-11"
                height="h-11"
                textSize="text-lg"
                className="ring-1 ring-gray-200"
              />
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">
                {user.name}
              </p>

              <p className="mt-0.5 truncate text-xs text-gray-500">
                {user.email}
              </p>

              <span
                className="
                mt-1.5
                inline-flex
                items-center
                rounded-full
                bg-gray-100
                px-2
                py-0.5
                text-[10px]
                font-medium
                capitalize
                text-gray-500
              "
              >
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* =================================================
            MENU
            ================================================= */}
        <div className="p-1.5">
          <ProfileMenuItem
            icon={<LuUserPen size={17} />}
            label="Edit Profile"
            onClick={handleEditProfile}
          />
          <ProfileMenuItem
            icon={<LuNotebook size={17} />}
            label="My Posts"
            onClick={handlePosts}
          />
          <ProfileMenuItem
            icon={<LuKeyRound size={17} />}
            label="Change Password"
            onClick={handleChangePassword}
          />

          <ProfileMenuItem
            icon={<LuBookmark size={17} />}
            label="Saved Posts"
            onClick={handleSavedPosts}
          />
          <ProfileMenuItem
            icon={<LuActivity size={17} />}
            label="My Activity"
            onClick={handleActivity}
          />

          {user?.role === "member" && (
            <>
              <ProfileMenuItem
                icon={<LuTrash2 size={17} />}
                label="Delete Profile"
                onClick={handleDeleteProfile}
              />
            </>
          )}

          {user?.role === "admin" && (
            <ProfileMenuItem
              icon={<LuLayoutDashboard size={17} />}
              label="Admin Dashboard"
              onClick={handleAdminDashboard}
            />
          )}
        </div>

        {/* =================================================
            LOGOUT
            ================================================= */}
        <div className="border-t border-gray-100 p-1.5">
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              w-full
              cursor-pointer
              items-center
              gap-3
              rounded-lg
              px-3
              py-2.5
              text-sm
              font-medium
              text-gray-600
              transition-colors
              duration-150
              hover:bg-red-50
              hover:text-red-600
            "
          >
            <LuLogOut size={17} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   MENU ITEM
   ========================================================= */

const ProfileMenuItem = ({ icon, label, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        w-full
        cursor-pointer
        items-center
        gap-3
        rounded-lg
        px-3
        py-2.5
        text-sm
        font-medium
        text-gray-700
        transition-colors
        duration-150
        hover:bg-gray-50
        hover:text-gray-950
      "
    >
      <span className="shrink-0 text-gray-400">{icon}</span>

      <span>{label}</span>
    </button>
  );
};

export default ProfileInfoCard;
