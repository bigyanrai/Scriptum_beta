import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
} from "react-icons/lu";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];

    // Small number of pages:
    // Show everything.
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    // Near the beginning:
    // 1 2 3 4 5 ... 50
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    // Near the end:
    // 1 ... 46 47 48 49 50
    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // Middle:
    // 1 ... 24 25 26 ... 50
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pages = getPageNumbers();

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      {/* Desktop Pagination */}
      <div className="hidden items-center gap-1.5 sm:flex">
        {/* First */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => goToPage(1)}
          aria-label="First page"
          className="
            flex h-8 w-8 items-center justify-center
            rounded-md border border-gray-300
            text-gray-600
            transition
            hover:border-gray-400
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <LuChevronsLeft size={15} />
        </button>

        {/* Previous */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
          aria-label="Previous page"
          className="
            flex h-8 w-8 items-center justify-center
            rounded-md border border-gray-300
            text-gray-600
            transition
            hover:border-gray-400
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <LuChevronLeft size={16} />
        </button>

        {/* Page Numbers */}
        {pages.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="
                flex h-8 min-w-8
                items-center justify-center
                px-1
                text-xs
                font-medium
                text-gray-400
              "
            >
              ...
            </span>
          ) : (
            <button
              type="button"
              key={page}
              onClick={() => goToPage(page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={`
                flex h-8 min-w-8
                items-center justify-center
                rounded-md
                px-2
                text-xs
                font-medium
                transition
                ${
                  currentPage === page
                    ? "bg-gray-600 text-white shadow-sm"
                    : "border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                }
              `}
            >
              {page}
            </button>
          ),
        )}

        {/* Next */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
          aria-label="Next page"
          className="
            flex h-8 w-8 items-center justify-center
            rounded-md border border-gray-300
            text-gray-600
            transition
            hover:border-gray-400
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <LuChevronRight size={16} />
        </button>

        {/* Last */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(totalPages)}
          aria-label="Last page"
          className="
            flex h-8 w-8 items-center justify-center
            rounded-md border border-gray-300
            text-gray-600
            transition
            hover:border-gray-400
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <LuChevronsRight size={15} />
        </button>
      </div>

      {/* Mobile Pagination */}
      <div className="flex w-full items-center justify-between sm:hidden">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
          className="
            flex h-8 items-center gap-1
            rounded-md
            border border-gray-300
            px-2.5
            text-xs
            font-medium
            text-gray-600
            transition
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <LuChevronLeft size={15} />
          Previous
        </button>

        <span className="text-xs font-medium text-gray-500">
          Page{" "}
          <span className="font-semibold text-gray-700">{currentPage}</span> of{" "}
          <span className="font-semibold text-gray-700">{totalPages}</span>
        </span>

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
          className="
            flex h-8 items-center gap-1
            rounded-md
            border border-gray-300
            px-2.5
            text-xs
            font-medium
            text-gray-600
            transition
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          Next
          <LuChevronRight size={15} />
        </button>
      </div>

      {/* Page information */}
      <p className="hidden text-[10px] text-gray-400 sm:block">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};

export default Pagination;
