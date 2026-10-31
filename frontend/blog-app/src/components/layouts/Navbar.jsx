import { useState, useEffect, useRef } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SearchDropdown from "../../Pages/Admin/components/SearchDropdown";

const Navbar = ({ activeMenu }) => {
  const navigate = useNavigate();

  const [openSideMenu, setOpenSideMenu] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    posts: [],
    members: [],
    comments: [],
  });

  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const [showSearchResults, setShowSearchResults] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const sideMenuRef = useRef(null);
  const searchRef = useRef(null);
  const mobileSearchInputRef = useRef(null);

  // Close menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpenSideMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scrolling when mobile side menu is open
  useEffect(() => {
    document.body.style.overflow = openSideMenu ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openSideMenu]);

  // Close side menu on outside click
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

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showSearchResults &&
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchResults]);

  // Focus mobile search input when opened
  useEffect(() => {
    if (mobileSearchOpen) {
      setTimeout(() => {
        mobileSearchInputRef.current?.focus();
      }, 0);
    }
  }, [mobileSearchOpen]);

  // Search API with debounce
  useEffect(() => {
    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) {
      setSearchResults({
        posts: [],
        members: [],
        comments: [],
      });

      setSearchLoading(false);
      setSearchError("");
      setShowSearchResults(false);

      return;
    }

    setShowSearchResults(true);
    setSearchLoading(true);
    setSearchError("");

    const timer = setTimeout(async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.ADMIN_SEARCH.GLOBAL_SEARCH,
          {
            params: {
              q: trimmedQuery,
            },
          },
        );

        setSearchResults({
          posts: response.data?.posts || [],
          members: response.data?.members || [],
          comments: response.data?.comments || [],
        });
      } catch (error) {
        console.error("Admin global search error:", error);

        setSearchResults({
          posts: [],
          members: [],
          comments: [],
        });

        setSearchError(
          error?.response?.data?.message ||
            "Unable to search right now. Please try again.",
        );
      } finally {
        setSearchLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowSearchResults(false);
        setMobileSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const hasResults =
    searchResults.posts.length > 0 ||
    searchResults.members.length > 0 ||
    searchResults.comments.length > 0;

  const handleSearchFocus = () => {
    if (searchQuery.trim()) {
      setShowSearchResults(true);
    }
  };

  const handleViewAllResults = () => {
    const query = searchQuery.trim();

    if (!query) return;

    setShowSearchResults(false);
    setMobileSearchOpen(false);

    navigate(`/admin/search?q=${encodeURIComponent(query)}&type=posts`);
  };

  const handlePostClick = (post) => {
    setShowSearchResults(false);
    setMobileSearchOpen(false);

    navigate(`/admin/posts?post=${post._id}`);
  };

  const handleMemberClick = (member) => {
    setShowSearchResults(false);
    setMobileSearchOpen(false);

    // Members currently use a modal rather than a dedicated route.
    // Full member result handling will be added in the search results page.
    navigate(`/admin/members?member=${member._id}`);
  };

  const handleCommentClick = (comment) => {
    setShowSearchResults(false);
    setMobileSearchOpen(false);

    navigate(`/admin/comments?comment=${comment._id}`);
  };

  const clearSearch = () => {
    setSearchQuery("");

    setSearchResults({
      posts: [],
      members: [],
      comments: [],
    });

    setShowSearchResults(false);
  };

  return (
    <>
      {/* Backdrop */}
      {openSideMenu && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px] lg:hidden"
          onClick={() => setOpenSideMenu(false)}
        />
      )}

      {/* Navbar */}
      <div className="sticky top-0 z-30 border-b border-gray-200/70 bg-white/90 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto flex h-16 md:h-[68px] items-center gap-3 sm:gap-5 px-4 sm:px-5 md:px-2">
          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Open navigation menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-black transition-all duration-300 hover:bg-gray-100 lg:hidden"
            onClick={() => setOpenSideMenu((prev) => !prev)}
          >
            {openSideMenu ? (
              <HiOutlineX className="text-2xl" />
            ) : (
              <HiOutlineMenu className="text-2xl" />
            )}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex shrink-0 items-center transition-transform duration-300 hover:scale-105"
          >
            <span
              className="
              text-lg
              font-bold
              tracking-[-0.03em]
              text-gray-950
              sm:text-xl"
            >
              Scriptum
            </span>
          </Link>

          {/* Desktop Global Search */}
          <div
            ref={searchRef}
            className="relative hidden min-w-0 flex-1 md:flex md:justify-center"
          >
            <div className="relative w-full max-w-xl">
              <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                placeholder="Search posts, members, comments..."
                className="w-full rounded-sm border border-gray-200 bg-gray-50/80 py-2 pl-11 pr-10 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400  focus:bg-white focus:shadow-sm"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                >
                  <HiOutlineX className="text-base" />
                </button>
              )}

              {/* Desktop Search Dropdown */}
              {showSearchResults && (
                <SearchDropdown
                  searchQuery={searchQuery}
                  searchLoading={searchLoading}
                  searchError={searchError}
                  searchResults={searchResults}
                  hasResults={hasResults}
                  onPostClick={handlePostClick}
                  onMemberClick={handleMemberClick}
                  onCommentClick={handleCommentClick}
                  onViewAll={handleViewAllResults}
                />
              )}
            </div>
          </div>

          {/* Mobile Search Button */}
          <button
            type="button"
            aria-label="Open search"
            className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all duration-300 hover:bg-gray-100 md:hidden"
            onClick={() => setMobileSearchOpen(true)}
          >
            <LuSearch className="text-lg" />
          </button>

          {/* Mobile Side Menu */}
          <div
            ref={sideMenuRef}
            className={`fixed left-0 top-16 z-40 h-[calc(100vh-64px)] w-72 bg-white shadow-2xl transition-all duration-300 ease-in-out md:top-[68px] md:h-[calc(100vh-68px)] ${
              openSideMenu
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
          >
            <SideMenu
              activeMenu={activeMenu}
              setOpenSideMenu={setOpenSideMenu}
            />
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {mobileSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-gray-50 md:hidden">
          {/* =====================================================
      MOBILE SEARCH HEADER
      ===================================================== */}

          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md">
            <div className="flex h-[64px] items-center gap-2.5 px-3.5">
              {/* Close */}
              <button
                type="button"
                aria-label="Close search"
                onClick={() => {
                  setMobileSearchOpen(false);
                  setShowSearchResults(false);
                }}
                className="
        flex h-9 w-9 shrink-0
        items-center justify-center
        rounded-full
        text-gray-500
        transition-all duration-200
        hover:bg-gray-100
        hover:text-gray-800
        active:scale-95
      "
              >
                <HiOutlineX className="text-[20px]" />
              </button>

              {/* Search Input */}
              <div className="relative min-w-0 flex-1">
                <LuSearch
                  className="
          pointer-events-none
          absolute left-3.5 top-1/2
          -translate-y-1/2
          text-[18px] text-gray-400
        "
                />

                <input
                  ref={mobileSearchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  placeholder="Search posts, members, comments..."
                  className="
          h-10.5 w-full
          rounded-xl
          border border-gray-200
          bg-gray-50
          pl-10 pr-10
          text-sm text-gray-800
          placeholder:text-gray-400
          outline-none
          shadow-sm shadow-gray-200/60
          transition-all duration-200
          focus:border-gray-300
          focus:bg-white
          focus:shadow-md focus:shadow-gray-200/70
        "
                />

                {/* Clear */}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    aria-label="Clear search"
                    className="
            absolute right-1.5 top-1/2
            flex h-7.5 w-7.5
            -translate-y-1/2
            items-center justify-center
            rounded-lg
            text-gray-400
            transition-all duration-200
            hover:bg-gray-100
            hover:text-gray-600
            active:scale-95
          "
                  >
                    <HiOutlineX className="text-[16px]" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* =====================================================
      SEARCH RESULTS
      ===================================================== */}
          <div className="h-[calc(100vh-68px)] overflow-y-auto">
            <div className="mx-auto w-full max-w-xl px-3 py-3">
              <SearchDropdown
                searchQuery={searchQuery}
                searchLoading={searchLoading}
                searchError={searchError}
                searchResults={searchResults}
                hasResults={hasResults}
                onPostClick={handlePostClick}
                onMemberClick={handleMemberClick}
                onCommentClick={handleCommentClick}
                onViewAll={handleViewAllResults}
                mobile
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
