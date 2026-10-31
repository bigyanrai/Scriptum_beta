import { LuSparkles, LuX } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ================================================= */}
          {/* BACKDROP */}
          {/* ================================================= */}

          <motion.div
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* ================================================= */}
          {/* DRAWER */}
          {/* ================================================= */}

          <motion.aside
            className="
              fixed
              right-0
              top-16
              md:top-[68px]
              bottom-0
              z-50
              flex
              w-full
              flex-col
              bg-white
              border-l
              border-gray-200
              shadow-[-12px_0_40px_rgba(0,0,0,0.08)]
              md:w-[420px]
              lg:w-[450px]
            "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.3,
              ease: [0.32, 0.72, 0, 1],
            }}
            tabIndex="-1"
            aria-labelledby="drawer-right-label"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div
              className="
                shrink-0
                border-b
                border-gray-100
                bg-white
                px-5
                py-4
              "
            >
              <div className="flex items-start justify-between gap-4">
                {/* Header Content */}

                <div className="min-w-0">
                  {/* AI Badge */}

                  <div
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      border
                      border-sky-100
                      bg-sky-50
                      px-2.5
                      py-1
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-wide
                      text-sky-600
                    "
                  >
                    <LuSparkles size={13} />
                    AI Summary
                  </div>

                  {/* Title */}

                  <h5
                    id="drawer-right-label"
                    className="
                      mt-3
                      line-clamp-2
                      text-base
                      font-semibold
                      leading-6
                      text-gray-900
                    "
                  >
                    {title || "Post Summary"}
                  </h5>

                  {/* Description */}

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    A concise summary generated from this article.
                  </p>
                </div>

                {/* Close Button */}

                <button
                  type="button"
                  onClick={onClose}
                  className="
                    group
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-gray-200
                    bg-white
                    text-gray-400
                    transition-all
                    duration-200
                    hover:border-gray-300
                    hover:bg-gray-100
                    hover:text-gray-700
                    focus:outline-none
                    focus:ring-2
                    focus:ring-sky-200
                    cursor-pointer
                  "
                  aria-label="Close summary"
                >
                  <LuX
                    size={18}
                    className="transition-transform duration-200 group-hover:rotate-90"
                  />
                </button>
              </div>
            </div>

            {/* ================================================= */}
            {/* CONTENT */}
            {/* ================================================= */}

            <div
              className="
                flex-1
                overflow-y-auto
                px-5
                py-6
                scrollbar-thin
              "
            >
              <div className="mx-auto max-w-none">{children}</div>
            </div>

            {/* ================================================= */}
            {/* FOOTER */}
            {/* ================================================= */}

            <div
              className="
                shrink-0
                border-t
                border-gray-100
                bg-gray-50/80
                px-5
                py-3
              "
            >
              <div className="flex items-center gap-2 text-[11px] text-gray-400">
                <LuSparkles size={13} className="text-sky-500" />

                <span>
                  AI-generated summary · Review important details in the
                  original article.
                </span>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
