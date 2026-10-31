// // const DeleteAlertContent = ({
// //   content,
// //   onDelete,
// //   danger = false,
// //   type = "comment",
// // }) => {
// //   const getButtonText = () => {
// //     switch (type) {
// //       case "post":
// //         return "Delete Post";

// //       case "member":
// //         return "Delete Member";

// //       case "comment":
// //       default:
// //         return danger ? "Delete Thread" : "Remove Comment";
// //     }
// //   };

// //   return (
// //     <div className="p-6">
// //       <div
// //         className={`mb-5 rounded-xl border p-4 ${
// //           danger ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"
// //         }`}
// //       >
// //         <p className="text-sm leading-6 text-gray-700">{content}</p>
// //       </div>

// //       <div className="flex justify-end gap-3">
// //         <button
// //           type="button"
// //           onClick={onDelete}
// //           className={`rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition ${
// //             danger
// //               ? "bg-red-600 hover:bg-red-700"
// //               : "bg-amber-500 hover:bg-amber-600"
// //           }`}
// //         >
// //           {getButtonText()}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DeleteAlertContent;

// const DeleteAlertContent = ({
//   content,
//   onDelete,
//   danger = false,
//   type = "comment",
// }) => {
//   const getButtonText = () => {
//     switch (type) {
//       case "post":
//         return "Delete Post";

//       case "member":
//         return "Delete Member";

//       case "comment":
//       default:
//         return danger ? "Delete Thread" : "Remove Comment";
//     }
//   };

//   return (
//     <div className="p-2">
//       {/* Confirmation Message */}
//       <div
//         className={`mb-4 flex items-start gap-2.5 rounded-lg border px-3.5 py-3 ${
//           danger ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"
//         }`}
//       >
//         {/* Alert Icon */}
//         <div
//           className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
//             danger ? "bg-red-100" : "bg-amber-100"
//           }`}
//         >
//           <svg
//             className={`h-3.5 w-3.5 ${
//               danger ? "text-red-600" : "text-amber-600"
//             }`}
//             viewBox="0 0 24 24"
//             fill="none"
//             aria-hidden="true"
//           >
//             <path
//               d="M12 9V13M12 17H12.01M10.29 3.86L2.82 17A2 2 0 0 0 4.56 20H19.44A2 2 0 0 0 21.18 17L13.71 3.86A2 2 0 0 0 10.29 3.86Z"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </div>

//         {/* Message */}
//         <p className="min-w-0 flex-1 text-[13px] leading-5 text-gray-700">
//           {content}
//         </p>
//       </div>

//       {/* Action */}
//       <div className="flex justify-end">
//         <button
//           type="button"
//           onClick={onDelete}
//           className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
//             danger
//               ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
//               : "bg-amber-500 hover:bg-amber-600 focus:ring-amber-500"
//           }`}
//         >
//           {getButtonText()}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DeleteAlertContent;

const DeleteAlertContent = ({
  content,
  onDelete,
  danger = false,
  type = "comment",
  loading = false,
}) => {
  const getButtonText = () => {
    switch (type) {
      case "post":
        return "Delete Post";

      case "member":
        return "Delete Member";

      case "comment":
      default:
        return danger ? "Delete Thread" : "Remove Comment";
    }
  };

  return (
    <div className="p-2">
      {/* Confirmation Message */}
      <div
        className={`mb-4 flex items-start gap-2.5 rounded-sm border px-3.5 py-3 ${
          danger ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"
        }`}
      >
        {/* Alert Icon */}
        <div
          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
            danger ? "bg-red-100" : "bg-amber-100"
          }`}
        >
          <svg
            className={`h-3.5 w-3.5 ${
              danger ? "text-red-600" : "text-amber-600"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 9V13M12 17H12.01M10.29 3.86L2.82 17A2 2 0 0 0 4.56 20H19.44A2 2 0 0 0 21.18 17L13.71 3.86A2 2 0 0 0 19.44 20H4.56A2 2 0 0 1 2.82 17L10.29 3.86A2 2 0 0 1 13.71 3.86L21.18 17A2 2 0 0 1 19.44 20H4.56"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Message */}
        <p className="min-w-0 flex-1 text-[13px] leading-5 text-gray-700">
          {content}
        </p>
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onDelete}
          disabled={loading}
          className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-70 ${
            danger
              ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
              : "bg-amber-500 hover:bg-amber-600 focus:ring-amber-500"
          }`}
        >
          {loading && (
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          )}

          {loading ? "Deleting..." : getButtonText()}
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
