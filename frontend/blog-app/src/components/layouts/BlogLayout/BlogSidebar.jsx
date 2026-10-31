import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuChevronLeft } from "react-icons/lu";

import RecentPosts from "../../../Pages/Blog/components/RecentPostsRename";

const BlogSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsCollapsed(true);
  };

  return (
    <>
      {/* =====================================================
          SIDEBAR
          ===================================================== */}
      <AnimatePresence>
        {!isCollapsed && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-30 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
            />

            {/* Sidebar Panel */}
            <motion.div
              className="
                fixed
                right-0
                top-16
                md:top-[68px]
                bottom-0
                w-80
                z-40
                bg-white
                border-l
                border-gray-200
                shadow-2xl
              "
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <div className="h-full overflow-y-auto  p-2">
                <RecentPosts />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =====================================================
          SIDEBAR TOGGLE BUTTON
          ===================================================== */}
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label={isCollapsed ? "Open recent posts" : "Close recent posts"}
        className="
          fixed
          right-0
          top-1/2
          z-50
          -translate-y-1/2
          cursor-pointer
          rounded-l-md
          border
          border-r-0
          border-gray-200
          bg-white
          px-1.5
          py-4
          text-gray-500
          shadow-md
          transition-all
          duration-200
          hover:bg-gray-50
          hover:text-gray-900
          hover:shadow-lg
          sm:px-2
        "
      >
        <LuChevronLeft
          size={20}
          className={`transition-transform duration-300 ease-in-out ${
            isCollapsed ? "rotate-0" : "rotate-180"
          }`}
        />
      </button>
    </>
  );
};

export default BlogSidebar;
