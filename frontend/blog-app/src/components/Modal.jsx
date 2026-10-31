// import { useEffect } from "react";

// const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
//   useEffect(() => {
//     if (!isOpen) return;

//     const handleEsc = (e) => {
//       if (e.key === "Escape") {
//         onClose();
//       }
//     };

//     document.addEventListener("keydown", handleEsc);

//     // Save current scroll position
//     const scrollY = window.scrollY;

//     // Lock the page without causing layout shift
//     document.body.style.position = "fixed";
//     document.body.style.top = `-${scrollY}px`;
//     document.body.style.left = "0";
//     document.body.style.right = "0";
//     document.body.style.width = "100%";
//     document.body.style.overflowY = "scroll";

//     return () => {
//       document.removeEventListener("keydown", handleEsc);

//       document.body.style.position = "";
//       document.body.style.top = "";
//       document.body.style.left = "";
//       document.body.style.right = "";
//       document.body.style.width = "";
//       document.body.style.overflowY = "";

//       window.scrollTo(0, scrollY);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4"
//       onClick={onClose}
//     >
//       {/* Modal */}
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="relative flex max-h-[90vh] flex-col overflow-hidden rounded-sm bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
//       >
//         {!hideHeader && (
//           <div className="border-b border-gray-200 p-4">
//             <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
//           </div>
//         )}

//         <button
//           type="button"
//           onClick={onClose}
//           className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-sky-100 hover:text-gray-700"
//         >
//           <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none">
//             <path
//               d="M1 1L13 13M13 1L1 13"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//             />
//           </svg>
//         </button>

//         <div className="flex-1 overflow-y-auto custom-scrollbar">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

import { useEffect } from "react";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    // Lock background scrolling while preserving scroll position
    const body = document.body;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);

      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";

      window.scrollTo(0, scrollY);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/40
        p-4
        backdrop-blur-[2px]
      "
      onClick={onClose}
    >
      {/* Modal */}

      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          flex
          w-full
          max-w-lg
          max-h-[90vh]
          flex-col
          overflow-hidden
          rounded-sm
          bg-white
          shadow-2xl
          animate-in
          fade-in
          zoom-in-95
          duration-200
        "
      >
        {/* Header */}

        {!hideHeader && (
          <div className="shrink-0 border-b border-gray-100 px-5 py-4">
            <h3 className="pr-8 text-base font-semibold text-gray-900 sm:text-lg">
              {title}
            </h3>
          </div>
        )}

        {/* Close */}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="
            absolute
            right-3
            top-3
            z-10
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            text-gray-400
            transition-colors
            duration-150
            hover:bg-gray-100
            hover:text-gray-700
            focus:outline-none
            focus:ring-2
            focus:ring-gray-200
          "
        >
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Content */}

        <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
