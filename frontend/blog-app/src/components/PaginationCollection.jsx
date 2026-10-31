import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const Pagination = ({ page, totalPages, onPageChange, isLoading = false }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [1];

    if (page > 3) {
      pages.push("...");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-1 border-t border-gray-100 pt-5"
    >
      {/* Previous */}
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1 || isLoading}
        className="
          group
          flex
          h-8
          items-center
          gap-1
          rounded-md
          px-2
          text-xs
          font-medium
          text-gray-400
          transition-colors
          hover:bg-gray-50
          hover:text-gray-900
          disabled:pointer-events-none
          disabled:opacity-30
          sm:px-2.5
        "
      >
        <LuChevronLeft
          size={14}
          className="transition-transform group-hover:-translate-x-0.5"
        />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-0.5">
        {getPages().map((item, index) => {
          if (item === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="
                  flex
                  h-8
                  w-6
                  items-center
                  justify-center
                  text-xs
                  text-gray-300
                "
              >
                ···
              </span>
            );
          }

          const isActive = Number(item) === Number(page);

          return (
            <button
              key={item}
              type="button"
              aria-current={isActive ? "page" : undefined}
              disabled={isLoading}
              onClick={() => onPageChange(Number(item))}
              className={`
                flex
                h-8
                min-w-8
                items-center
                justify-center
                rounded-md
                px-1.5
                text-xs
                font-medium
                transition-colors
                disabled:pointer-events-none
                disabled:opacity-40

                ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Next */}
      <button
        type="button"
        aria-label="Next page"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages || isLoading}
        className="
          group
          flex
          h-8
          items-center
          gap-1
          rounded-md
          px-2
          text-xs
          font-medium
          text-gray-400
          transition-colors
          hover:bg-gray-50
          hover:text-gray-900
          disabled:pointer-events-none
          disabled:opacity-30
          sm:px-2.5
        "
      >
        <span className="hidden sm:inline">Next</span>

        <LuChevronRight
          size={14}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </button>
    </nav>
  );
};

export default Pagination;
