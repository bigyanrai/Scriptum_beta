// import { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import moment from "moment";
// import toast from "react-hot-toast";

// import DashboardLayout from "../../components/layouts/DashboardLayout";
// import CommentInfoCard from "../../components/Cards/CommentInfoCard";
// import Modal from "../../components/Modal";
// import DeleteAlertContent from "../../components/DeleteAlertContent";

// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import Pagination from "../../components/Pagination";
// import CommentCardSkeleton from "../../components/Loader/CommentCardSkeleton";

// const Comments = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const searchedCommentId = searchParams.get("comment");

//   const [searchResult, setSearchResult] = useState(null);
//   const [searchLoading, setSearchLoading] = useState(false);

//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalComments, setTotalComments] = useState(0);

//   // --------------------------------------------------
//   // SORTING
//   // --------------------------------------------------

//   const [sort, setSort] = useState("newest");

//   // --------------------------------------------------
//   // BULK SELECTION
//   // --------------------------------------------------

//   const [selectedComments, setSelectedComments] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [bulkDeleting, setBulkDeleting] = useState(false);

//   // --------------------------------------------------
//   // DELETE MODAL
//   // --------------------------------------------------

//   const [openDeleteAlert, setOpenDeleteAlert] = useState({
//     open: false,
//     type: "comment",
//     data: null,
//   });

//   // --------------------------------------------------
//   // GET SEARCHED COMMENT
//   // --------------------------------------------------

//   const getSearchedComment = async (commentId) => {
//     try {
//       setSearchLoading(true);

//       const response = await axiosInstance.get(
//         API_PATHS.COMMENT.GET_BY_ID_ADMIN(commentId),
//       );

//       setSearchResult(response.data);
//     } catch (error) {
//       console.error("Error fetching searched comment:", error);

//       toast.error(
//         error?.response?.data?.message || "Comment could not be found.",
//       );

//       setSearchParams({});
//       setSearchResult(null);
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   // --------------------------------------------------
//   // GET ALL COMMENTS
//   // --------------------------------------------------

//   const getAllComments = async () => {
//     try {
//       setLoading(true);

//       const response = await axiosInstance.get(
//         `${API_PATHS.COMMENT.GET_ALL}?page=${page}&limit=10&sort=${sort}`,
//       );

//       setComments(response.data.comments || []);

//       setTotalPages(response.data.totalPages || 1);
//       setTotalComments(response.data.totalComments || 0);
//     } catch (error) {
//       console.error(error);

//       toast.error(error?.response?.data?.message || "Failed to load comments.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --------------------------------------------------
//   // RESET DELETE MODAL
//   // --------------------------------------------------

//   const resetDeleteModal = () => {
//     setOpenDeleteAlert({
//       open: false,
//       type: "comment",
//       data: null,
//     });
//   };

//   // --------------------------------------------------
//   // DELETE ENTIRE THREAD
//   // --------------------------------------------------

//   const deleteThread = async (commentId) => {
//     try {
//       await axiosInstance.delete(API_PATHS.COMMENT.DELETE_THREAD(commentId));

//       toast.success("Discussion thread deleted.");

//       resetDeleteModal();

//       await getAllComments();

//       navigate("/admin/comments");
//     } catch (error) {
//       console.error(error);

//       toast.error(
//         error?.response?.data?.message || "Failed to delete discussion thread.",
//       );
//     }
//   };

//   // --------------------------------------------------
//   // DELETE ONLY COMMENT
//   // --------------------------------------------------

//   const deleteCommentOnly = async (commentId) => {
//     try {
//       await axiosInstance.delete(
//         API_PATHS.COMMENT.DELETE_PARENT_ONLY(commentId),
//       );

//       toast.success("Comment removed.");

//       resetDeleteModal();

//       await getAllComments();

//       navigate("/admin/comments");
//     } catch (error) {
//       console.error(error);

//       toast.error(
//         error?.response?.data?.message || "Failed to remove comment.",
//       );
//     }
//   };

//   // --------------------------------------------------
//   // BULK DELETE SELECTED COMMENTS / THREADS
//   // --------------------------------------------------

//   const deleteSelectedComments = async () => {
//     if (selectedComments.length === 0) {
//       toast.error("Please select at least one comment.");
//       return;
//     }

//     try {
//       setBulkDeleting(true);

//       await axiosInstance.delete(API_PATHS.COMMENT.DELETE_BULK, {
//         data: {
//           commentIds: selectedComments,
//         },
//       });

//       toast.success(
//         `${selectedComments.length} discussion ${
//           selectedComments.length === 1 ? "thread" : "threads"
//         } deleted successfully.`,
//       );

//       setSelectedComments([]);
//       setSelectAll(false);

//       resetDeleteModal();

//       await getAllComments();

//       navigate("/admin/comments");
//     } catch (error) {
//       console.error("Bulk delete error:", error);

//       toast.error(
//         error?.response?.data?.message || "Failed to delete selected comments.",
//       );
//     } finally {
//       setBulkDeleting(false);
//     }
//   };

//   // --------------------------------------------------
//   // SELECT / UNSELECT ONE COMMENT
//   // --------------------------------------------------

//   const handleSelectComment = (commentId) => {
//     setSelectedComments((previous) => {
//       if (previous.includes(commentId)) {
//         return previous.filter((id) => id !== commentId);
//       }

//       return [...previous, commentId];
//     });
//   };

//   // --------------------------------------------------
//   // SELECT ALL COMMENTS ON CURRENT PAGE
//   // --------------------------------------------------

//   const handleSelectAll = (checked) => {
//     if (checked) {
//       setSelectedComments(comments.map((comment) => comment._id));
//       setSelectAll(true);
//     } else {
//       setSelectedComments([]);
//       setSelectAll(false);
//     }
//   };

//   // --------------------------------------------------
//   // KEEP SELECT ALL IN SYNC
//   // --------------------------------------------------

//   useEffect(() => {
//     if (comments.length === 0) {
//       setSelectAll(false);
//       return;
//     }

//     const allSelected = comments.every((comment) =>
//       selectedComments.includes(comment._id),
//     );

//     setSelectAll(allSelected);
//   }, [comments, selectedComments]);

//   // --------------------------------------------------
//   // SEARCH COMMENT
//   // --------------------------------------------------

//   useEffect(() => {
//     if (searchedCommentId) {
//       getSearchedComment(searchedCommentId);
//     } else {
//       setSearchResult(null);
//     }
//   }, [searchedCommentId]);

//   // --------------------------------------------------
//   // LOAD COMMENTS
//   // --------------------------------------------------

//   useEffect(() => {
//     getAllComments();

//     setSelectedComments([]);
//     setSelectAll(false);
//   }, [page, sort]);

//   // --------------------------------------------------
//   // CHANGE SORT
//   // --------------------------------------------------

//   const handleSortChange = (value) => {
//     setSort(value);
//     setPage(1);
//   };

//   // --------------------------------------------------
//   // CHANGE PAGE
//   // --------------------------------------------------

//   const handlePageChange = (newPage) => {
//     setPage(newPage);

//     setSelectedComments([]);
//     setSelectAll(false);

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   // --------------------------------------------------
//   // CLEAR SELECTION
//   // --------------------------------------------------

//   const clearSelection = () => {
//     setSelectedComments([]);
//     setSelectAll(false);
//   };

//   // --------------------------------------------------
//   // PARTIAL SELECTION
//   // --------------------------------------------------

//   const someCommentsSelected = selectedComments.length > 0 && !selectAll;

//   return (
//     <DashboardLayout>
//       {/* ==================================================
//           HEADER
//       ================================================== */}

//       <div className="rounded-sm bg-white border border-gray-200/90 p-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
//         <div>
//           <h1 className=" text-xl font-semibold tracking-tight text-gray-800 sm:text-2xl">
//             Comment Moderation
//           </h1>

//           <p className="mt-2 max-w-full text-sm text-gray-500">
//             Review community discussions, remove inappropriate comments while
//             preserving healthy conversations, or permanently remove entire
//             discussion threads when necessary.
//           </p>
//         </div>
//         <div className="mb-5 flex items-center gap-2 sm:gap-3">
//           {/* Total Comments */}
//           <div className="rounded-sm border border-gray-200/70 bg-white px-3 py-2 ">
//             <div className="flex items-center gap-2">
//               <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />

//               <span className="text-[10px] font-medium text-sky-600">
//                 Root Comments
//               </span>

//               <span className="text-sm font-semibold text-sky-600">
//                 {totalComments}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ==================================================
//           STATS
//       ================================================== */}

//       {/* ==================================================
//           COMMENT DIRECTORY
//       ================================================== */}

//       {!searchResult && (
//         <div className="rounded-sm border border-gray-200/70 bg-white p-2 mt-2 sm:p-2">
//           {/* ==================================================
//               DIRECTORY HEADER
//           ================================================== */}

//           <div className="flex flex-col gap-3 border-b border-gray-100 pb-2 sm:flex-row sm:items-center sm:justify-between">
//             {/* Title */}
//             <div>
//               <h3 className="text-base font-semibold text-gray-800">
//                 Comment Directory
//               </h3>

//               <p className="mt-0.5 text-xs text-gray-400">
//                 Review, moderate and manage discussion threads.
//               </p>
//             </div>

//             {/* Sort */}
//             <div
//               className="
//                 flex w-full items-center
//                 rounded-sm border border-gray-200/70
//                 bg-white
//                 transition-all

//                 sm:w-auto
//               "
//             >
//               <div className="flex shrink-0 items-center border-r border-gray-100 px-2.5">
//                 <span className="text-[9px] font-medium uppercase tracking-wide text-gray-400">
//                   Sort
//                 </span>
//               </div>

//               <select
//                 value={sort}
//                 onChange={(e) => handleSortChange(e.target.value)}
//                 className="
//                   min-w-0 flex-1
//                   cursor-pointer
//                   appearance-none
//                   bg-transparent
//                   px-3 py-2
//                   pr-7
//                   text-xs font-medium
//                   text-gray-700
//                   outline-none
//                   sm:w-[165px]
//                   sm:flex-none
//                 "
//               >
//                 <option value="recentlyUpdated">Recently Updated</option>

//                 <option value="newest">Newest</option>

//                 <option value="oldest">Oldest</option>

//                 <option value="mostReplies">Most Replies</option>

//                 <option value="leastReplies">Least Replies</option>
//               </select>
//             </div>
//           </div>

//           {/* ==================================================
//               SELECT ALL / BULK ACTIONS
//           ================================================== */}

//           {!loading && comments.length > 0 && (
//             <div
//               className="
//                 mt-2
//                 overflow-hidden
//                 rounded-sm
//                 border border-gray-200
//                 bg-white

//               "
//             >
//               <div
//                 className="
//                   flex flex-col
//                   gap-3
//                   px-3 py-3
//                   sm:flex-row
//                   sm:items-center
//                   sm:justify-between
//                   sm:px-4
//                 "
//               >
//                 {/* Left: Select All */}
//                 <div className="flex min-w-0 items-center gap-3">
//                   {/* Custom checkbox */}
//                   <label
//                     className="
//                       relative
//                       flex h-5 w-5
//                       shrink-0
//                       cursor-pointer
//                       items-center
//                       justify-center
//                     "
//                     title={
//                       selectAll
//                         ? "Deselect all comments"
//                         : "Select all comments"
//                     }
//                   >
//                     <input
//                       type="checkbox"
//                       checked={selectAll}
//                       ref={(input) => {
//                         if (input) {
//                           input.indeterminate = someCommentsSelected;
//                         }
//                       }}
//                       onChange={(e) => handleSelectAll(e.target.checked)}
//                       className="
//                         peer
//                         h-4 w-4
//                         cursor-pointer
//                         appearance-none
//                         rounded-md
//                         border border-gray-300
//                         bg-white
//                         transition-all
//                         duration-150
//                         checked:border-sky-600
//                         checked:bg-sky-600
//                         indeterminate:border-sky-600
//                         indeterminate:bg-sky-600
//                         hover:border-sky-400
//                         focus:outline-none
//                         focus:ring-2
//                         focus:ring-sky-100
//                       "
//                     />

//                     {/* Check icon */}
//                     <svg
//                       className="
//                         pointer-events-none
//                         absolute
//                         hidden
//                         h-3 w-3
//                         text-white
//                         peer-checked:block
//                       "
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>

//                     {/* Indeterminate icon */}
//                     {someCommentsSelected && !selectAll && (
//                       <span
//                         className="
//                           pointer-events-none
//                           absolute
//                           h-0.5 w-2.5
//                           rounded-full
//                           bg-white
//                         "
//                       />
//                     )}
//                   </label>

//                   {/* Selection information */}
//                   <div className="min-w-0">
//                     <div className="flex flex-wrap items-center gap-2">
//                       <span className="text-sm font-semibold text-gray-700">
//                         Select all comments
//                       </span>

//                       <span
//                         className="
//                           rounded-full
//                           border border-gray-200
//                           bg-gray-50
//                           px-2
//                           py-0.5
//                           text-[10px]
//                           font-medium
//                           text-gray-500
//                         "
//                       >
//                         {comments.length} available
//                       </span>
//                     </div>

//                     <p className="mt-0.5 text-[11px] text-gray-400">
//                       {selectedComments.length > 0
//                         ? `${selectedComments.length} of ${comments.length} comments selected`
//                         : "Choose comments to perform bulk actions"}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Right: Bulk Actions */}
//                 <div className="flex items-center sm:justify-end">
//                   {selectedComments.length > 0 ? (
//                     <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
//                       {/* Clear Selection */}
//                       <button
//                         type="button"
//                         onClick={clearSelection}
//                         className="
//                           inline-flex
//                           w-full
//                           items-center
//                           justify-center
//                           rounded-lg
//                           border border-gray-200
//                           bg-white
//                           px-3.5 py-2
//                           text-xs
//                           font-semibold
//                           text-gray-600
//                           transition-all
//                           duration-150
//                           hover:bg-gray-50
//                           focus:outline-none
//                           focus:ring-2
//                           focus:ring-gray-100
//                           sm:w-auto
//                         "
//                       >
//                         Clear Selection
//                       </button>

//                       {/* Delete Selected */}
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setOpenDeleteAlert({
//                             open: true,
//                             type: "bulk",
//                             data: selectedComments,
//                           })
//                         }
//                         className="
//                           inline-flex
//                           w-full
//                           items-center
//                           justify-center
//                           gap-2
//                           rounded-lg
//                           border border-red-200
//                           bg-red-50
//                           px-3.5 py-2
//                           text-xs
//                           font-semibold
//                           text-red-600
//                           transition-all
//                           duration-150
//                           hover:border-red-300
//                           hover:bg-red-100
//                           focus:outline-none
//                           focus:ring-2
//                           focus:ring-red-100
//                           sm:w-auto
//                         "
//                       >
//                         {/* Trash icon */}
//                         <svg
//                           className="h-3.5 w-3.5"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="1.8"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M3 6h18M9 6V4h6v2m-8 0 .8 14h8.4L17 6M10 10v6m4-6v6"
//                           />
//                         </svg>
//                         Delete Selected
//                         <span
//                           className="
//                             rounded-md
//                             bg-red-100
//                             px-1.5
//                             py-0.5
//                             text-[10px]
//                             font-bold
//                             text-red-600
//                           "
//                         >
//                           {selectedComments.length}
//                         </span>
//                       </button>
//                     </div>
//                   ) : (
//                     <span
//                       className="
//                         hidden
//                         text-[11px]
//                         text-gray-400
//                         sm:block
//                       "
//                     >
//                       No comments selected
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* Selection progress */}
//               {selectedComments.length > 0 && (
//                 <div className="h-1 w-full bg-gray-100">
//                   <div
//                     className="
//                       h-full
//                       rounded-r-full
//                       bg-sky-500
//                       transition-all
//                       duration-300
//                     "
//                     style={{
//                       width: `${Math.min(
//                         (selectedComments.length / comments.length) * 100,
//                         100,
//                       )}%`,
//                     }}
//                   />
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       )}

//       {/* ==================================================
//           CONTENT
//       ================================================== */}

//       <div className={!searchResult ? "mt-2" : ""}>
//         {/* Loading */}
//         {loading || searchLoading ? (
//           <CommentCardSkeleton count={2} />
//         ) : searchResult ? (
//           /* ==================================================
//               SEARCH RESULT
//           ================================================== */

//           <div>
//             {/* Search Result Header */}
//             <div className="mb-4 flex flex-col gap-3 rounded-xl border border-sky-100 bg-sky-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
//               <div>
//                 <p className="text-[10px] font-semibold uppercase tracking-wide text-sky-600">
//                   Search Result
//                 </p>

//                 <p className="mt-0.5 text-xs text-gray-500">
//                   Showing the discussion containing the searched comment.
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setSearchResult(null);
//                   setSearchParams({});
//                   clearSelection();
//                 }}
//                 className="
//                   self-start
//                   rounded-lg
//                   border border-gray-200
//                   bg-white
//                   px-3 py-1.5
//                   text-xs
//                   font-medium
//                   text-gray-600
//                   transition-colors
//                   hover:bg-gray-50
//                   sm:self-auto
//                 "
//               >
//                 Clear Search
//               </button>
//             </div>

//             {/* Searched Comment */}
//             <CommentInfoCard
//               commentId={searchResult.comment._id}
//               authorId={searchResult.comment.author?._id}
//               authorName={searchResult.comment.author?.name || "Deleted User"}
//               authorPhoto={searchResult.comment.author?.profileImageUrl}
//               isSearchMatch={
//                 searchResult.matchedCommentId === searchResult.comment._id
//               }
//               matchedCommentId={searchResult.matchedCommentId}
//               isDeleted={searchResult.comment.isDeleted}
//               deletedBy={searchResult.comment.deletedBy}
//               content={searchResult.comment.content}
//               updatedOn={
//                 searchResult.comment.updatedAt
//                   ? moment(searchResult.comment.updatedAt).format("Do MMM YYYY")
//                   : "-"
//               }
//               post={searchResult.comment.post}
//               replies={searchResult.comment.replies || []}
//               getAllComments={getAllComments}
//               onDeleteComment={(commentId) =>
//                 setOpenDeleteAlert({
//                   open: true,
//                   type: "comment",
//                   data: commentId,
//                 })
//               }
//               onDeleteThread={(commentId) =>
//                 setOpenDeleteAlert({
//                   open: true,
//                   type: "thread",
//                   data: commentId,
//                 })
//               }
//             />
//           </div>
//         ) : comments.length === 0 ? (
//           /* ==================================================
//               NO COMMENTS
//           ================================================== */

//           <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-gray-300 bg-white py-12">
//             <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
//               <svg
//                 className="h-7 w-7 text-gray-300"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.8"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M21 11.5a8.38 8.38 0 01-1.9 5.4L21 21l-4.1-1.9a8.5 8.5 0 01-5.4 1.9A8.5 8.5 0 113 12.5a8.5 8.5 0 0118 0z"
//                 />
//               </svg>
//             </div>

//             <h3 className="text-sm font-semibold text-gray-700">
//               No comments yet
//             </h3>

//             <p className="mt-1 text-xs text-gray-400">
//               Comments posted by users will appear here for moderation.
//             </p>
//           </div>
//         ) : (
//           /* ==================================================
//               COMMENTS
//           ================================================== */

//           <div className="space-y-2.5">
//             {comments.map((comment) => (
//               <div key={comment._id} className="relative">
//                 {/* Selection checkbox */}
//                 <div className="absolute left-3 top-3 z-10">
//                   <label
//                     className="
//                       relative
//                       flex h-5 w-5
//                       cursor-pointer
//                       items-center
//                       justify-center
//                     "
//                   >
//                     <input
//                       type="checkbox"
//                       checked={selectedComments.includes(comment._id)}
//                       onChange={() => handleSelectComment(comment._id)}
//                       className="
//                         peer
//                         h-4 w-4
//                         cursor-pointer
//                         appearance-none
//                         rounded-md
//                         border border-gray-300
//                         bg-white
//                         transition-all
//                         duration-150
//                         checked:border-sky-600
//                         checked:bg-sky-600
//                         hover:border-sky-400
//                         focus:outline-none
//                         focus:ring-2
//                         focus:ring-sky-100
//                       "
//                     />

//                     <svg
//                       className="
//                         pointer-events-none
//                         absolute
//                         hidden
//                         h-3 w-3
//                         text-white
//                         peer-checked:block
//                       "
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </label>
//                 </div>

//                 <CommentInfoCard
//                   commentId={comment._id}
//                   authorName={comment.author?.name || "Deleted User"}
//                   authorPhoto={comment.author?.profileImageUrl}
//                   isDeleted={comment.isDeleted}
//                   deletedBy={comment.deletedBy}
//                   content={comment.content}
//                   updatedOn={
//                     comment.updatedAt
//                       ? moment(comment.updatedAt).format("Do MMM YYYY")
//                       : "-"
//                   }
//                   post={comment.post}
//                   replies={comment.replies || []}
//                   getAllComments={getAllComments}
//                   onDeleteComment={(commentId) =>
//                     setOpenDeleteAlert({
//                       open: true,
//                       type: "comment",
//                       data: commentId,
//                     })
//                   }
//                   onDeleteThread={(commentId) =>
//                     setOpenDeleteAlert({
//                       open: true,
//                       type: "thread",
//                       data: commentId,
//                     })
//                   }
//                   authorId={comment.author?._id}
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ==================================================
//           PAGINATION
//       ================================================== */}

//       {!searchResult && (
//         <Pagination
//           currentPage={page}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       )}

//       {/* ==================================================
//           DELETE MODAL
//       ================================================== */}

//       <Modal
//         isOpen={openDeleteAlert.open}
//         onClose={resetDeleteModal}
//         title={
//           openDeleteAlert.type === "comment"
//             ? "Remove Comment"
//             : openDeleteAlert.type === "thread"
//               ? "Delete Discussion Thread"
//               : "Delete Selected Threads"
//         }
//       >
//         <div className="w-[450px] max-w-full">
//           {openDeleteAlert.type === "bulk" ? (
//             <DeleteAlertContent
//               content={`You are about to permanently delete ${
//                 selectedComments.length
//               } ${
//                 selectedComments.length === 1
//                   ? "discussion thread"
//                   : "discussion threads"
//               }. This will remove the selected comments and their replies. This action cannot be undone.`}
//               danger={true}
//               onDelete={deleteSelectedComments}
//             />
//           ) : (
//             <DeleteAlertContent
//               content={
//                 openDeleteAlert.type === "comment"
//                   ? "Only this comment will be removed. Replies will remain visible beneath a moderator notice."
//                   : "This will permanently delete this comment and every reply beneath it. This action cannot be undone."
//               }
//               danger={openDeleteAlert.type === "thread"}
//               onDelete={() => {
//                 if (openDeleteAlert.type === "comment") {
//                   deleteCommentOnly(openDeleteAlert.data);
//                 } else {
//                   deleteThread(openDeleteAlert.data);
//                 }
//               }}
//             />
//           )}

//           {/* Bulk delete loading indicator */}
//           {bulkDeleting && (
//             <div className="mt-3 text-center text-xs text-gray-400">
//               Deleting selected threads...
//             </div>
//           )}
//         </div>
//       </Modal>
//     </DashboardLayout>
//   );
// };

// export default Comments;

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import CommentInfoCard from "../../components/Cards/CommentInfoCard";
import Modal from "../../components/Modal";
import DeleteAlertContent from "../../components/DeleteAlertContent";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Pagination from "../../components/Pagination";
import CommentCardSkeleton from "../../components/Loader/CommentCardSkeleton";

const Comments = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchedCommentId = searchParams.get("comment");

  const [searchResult, setSearchResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalComments, setTotalComments] = useState(0);

  // --------------------------------------------------
  // SORTING
  // --------------------------------------------------

  const [sort, setSort] = useState("newest");

  // --------------------------------------------------
  // BULK SELECTION
  // --------------------------------------------------

  const [selectedComments, setSelectedComments] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  // --------------------------------------------------
  // DELETE MODAL
  // --------------------------------------------------

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    type: "comment",
    data: null,
  });

  // --------------------------------------------------
  // GET SEARCHED COMMENT
  // --------------------------------------------------

  const getSearchedComment = async (commentId) => {
    try {
      setSearchLoading(true);

      const response = await axiosInstance.get(
        API_PATHS.COMMENT.GET_BY_ID_ADMIN(commentId),
      );

      setSearchResult(response.data);
    } catch (error) {
      console.error("Error fetching searched comment:", error);

      toast.error(
        error?.response?.data?.message || "Comment could not be found.",
      );

      setSearchParams({});
      setSearchResult(null);
    } finally {
      setSearchLoading(false);
    }
  };

  // --------------------------------------------------
  // GET ALL COMMENTS
  // --------------------------------------------------

  const getAllComments = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `${API_PATHS.COMMENT.GET_ALL}?page=${page}&limit=10&sort=${sort}`,
      );

      setComments(response.data.comments || []);
      setTotalPages(response.data.totalPages || 1);
      setTotalComments(response.data.totalComments || 0);
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Failed to load comments.");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // RESET DELETE MODAL
  // --------------------------------------------------

  const resetDeleteModal = () => {
    setOpenDeleteAlert({
      open: false,
      type: "comment",
      data: null,
    });
  };

  // --------------------------------------------------
  // DELETE ENTIRE THREAD
  // --------------------------------------------------

  const deleteThread = async (commentId) => {
    try {
      await axiosInstance.delete(API_PATHS.COMMENT.DELETE_THREAD(commentId));

      toast.success("Discussion thread deleted.");

      resetDeleteModal();

      await getAllComments();

      navigate("/admin/comments");
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Failed to delete discussion thread.",
      );
    }
  };

  // --------------------------------------------------
  // DELETE ONLY COMMENT
  // --------------------------------------------------

  const deleteCommentOnly = async (commentId) => {
    try {
      await axiosInstance.delete(
        API_PATHS.COMMENT.DELETE_PARENT_ONLY(commentId),
      );

      toast.success("Comment removed.");

      resetDeleteModal();

      await getAllComments();

      navigate("/admin/comments");
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Failed to remove comment.",
      );
    }
  };

  // --------------------------------------------------
  // BULK DELETE SELECTED COMMENTS / THREADS
  // --------------------------------------------------

  const deleteSelectedComments = async () => {
    if (selectedComments.length === 0) {
      toast.error("Please select at least one comment.");
      return;
    }

    try {
      setBulkDeleting(true);

      await axiosInstance.delete(API_PATHS.COMMENT.DELETE_BULK, {
        data: {
          commentIds: selectedComments,
        },
      });

      toast.success(
        `${selectedComments.length} discussion ${
          selectedComments.length === 1 ? "thread" : "threads"
        } deleted successfully.`,
      );

      setSelectedComments([]);
      setSelectAll(false);

      resetDeleteModal();

      await getAllComments();

      navigate("/admin/comments");
    } catch (error) {
      console.error("Bulk delete error:", error);

      toast.error(
        error?.response?.data?.message || "Failed to delete selected comments.",
      );
    } finally {
      setBulkDeleting(false);
    }
  };

  // --------------------------------------------------
  // SELECT / UNSELECT ONE COMMENT
  // --------------------------------------------------

  const handleSelectComment = (commentId) => {
    setSelectedComments((previous) => {
      if (previous.includes(commentId)) {
        return previous.filter((id) => id !== commentId);
      }

      return [...previous, commentId];
    });
  };

  // --------------------------------------------------
  // SELECT ALL COMMENTS ON CURRENT PAGE
  // --------------------------------------------------

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedComments(comments.map((comment) => comment._id));
      setSelectAll(true);
    } else {
      setSelectedComments([]);
      setSelectAll(false);
    }
  };

  // --------------------------------------------------
  // KEEP SELECT ALL IN SYNC
  // --------------------------------------------------

  useEffect(() => {
    if (comments.length === 0) {
      setSelectAll(false);
      return;
    }

    const allSelected = comments.every((comment) =>
      selectedComments.includes(comment._id),
    );

    setSelectAll(allSelected);
  }, [comments, selectedComments]);

  // --------------------------------------------------
  // SEARCH COMMENT
  // --------------------------------------------------

  useEffect(() => {
    if (searchedCommentId) {
      getSearchedComment(searchedCommentId);
    } else {
      setSearchResult(null);
    }
  }, [searchedCommentId]);

  // --------------------------------------------------
  // LOAD COMMENTS
  // --------------------------------------------------

  useEffect(() => {
    getAllComments();

    setSelectedComments([]);
    setSelectAll(false);
  }, [page, sort]);

  // --------------------------------------------------
  // CHANGE SORT
  // --------------------------------------------------

  const handleSortChange = (value) => {
    setSort(value);
    setPage(1);
  };

  // --------------------------------------------------
  // CHANGE PAGE
  // --------------------------------------------------

  const handlePageChange = (newPage) => {
    setPage(newPage);

    setSelectedComments([]);
    setSelectAll(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // --------------------------------------------------
  // CLEAR SELECTION
  // --------------------------------------------------

  const clearSelection = () => {
    setSelectedComments([]);
    setSelectAll(false);
  };

  // --------------------------------------------------
  // PARTIAL SELECTION
  // --------------------------------------------------

  const someCommentsSelected = selectedComments.length > 0 && !selectAll;

  return (
    <DashboardLayout>
      {/* ==================================================
          HEADER
      ================================================== */}

      <div
        className="
          rounded-sm
          border border-gray-200/90
          bg-white
          p-3
          sm:p-4
        "
      >
        <div
          className="
            flex flex-col gap-4
            lg:flex-row lg:items-end lg:justify-between
          "
        >
          {/* Header Content */}
          <div className="min-w-0">
            <h1
              className="
                text-xl font-semibold tracking-tight text-gray-800
                sm:text-2xl
              "
            >
              Comment Moderation
            </h1>

            <p
              className="
                mt-1.5
                max-w-3xl
                text-xs leading-relaxed text-gray-500
                sm:mt-2 sm:text-sm
              "
            >
              Review community discussions, remove inappropriate comments while
              preserving healthy conversations, or permanently remove entire
              discussion threads when necessary.
            </p>
          </div>

          {/* Total Comments */}
          <div
            className="
              flex shrink-0 items-center
              rounded-sm
              border border-gray-200/70
              bg-gray-50/50
              px-3 py-2
              sm:px-3.5
            "
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />

              <span className="text-[10px] font-medium text-sky-600 sm:text-[11px]">
                Root Comments
              </span>

              <span className="text-sm font-semibold text-sky-600">
                {totalComments}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          COMMENT DIRECTORY
      ================================================== */}

      {!searchResult && (
        <div className="mt-2 rounded-sm border border-gray-200/70 bg-white p-2">
          {/* DIRECTORY HEADER */}
          <div
            className="
              flex flex-col gap-3
              border-b border-gray-100
              pb-2.5
              sm:flex-row sm:items-center sm:justify-between
            "
          >
            {/* Title */}
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-gray-800 sm:text-base">
                Comment Directory
              </h3>

              <p className="mt-0.5 text-[11px] text-gray-400 sm:text-xs">
                Review, moderate and manage discussion threads.
              </p>
            </div>

            {/* Sort */}
            <div
              className="
                flex w-full items-center
                overflow-hidden
                rounded-sm
                border border-gray-200/70
                bg-white
                sm:w-auto
              "
            >
              <div
                className="
                  flex shrink-0 items-center
                  border-r border-gray-100
                  px-2.5 py-2
                "
              >
                <span
                  className="
                    text-[9px] font-medium
                    uppercase tracking-wide
                    text-gray-400
                  "
                >
                  Sort
                </span>
              </div>

              <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="
                  min-w-0 flex-1
                  cursor-pointer
                  appearance-none
                  bg-transparent
                  px-3 py-2
                  pr-7
                  text-xs font-medium
                  text-gray-700
                  outline-none
                  sm:w-[165px]
                  sm:flex-none
                "
              >
                <option value="recentlyUpdated">Recently Updated</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="mostReplies">Most Replies</option>
                <option value="leastReplies">Least Replies</option>
              </select>
            </div>
          </div>

          {/* ==================================================
              SELECT ALL / BULK ACTIONS
          ================================================== */}

          {!loading && comments.length > 0 && (
            <div
              className="
                mt-2
                overflow-hidden
                rounded-sm
                border border-gray-200
                bg-white
              "
            >
              <div
                className="
                  flex flex-col gap-3
                  px-3 py-3
                  sm:px-4
                  md:flex-row md:items-center md:justify-between
                "
              >
                {/* SELECT ALL */}
                <div className="flex min-w-0 items-center gap-3">
                  <label
                    className="
                      relative
                      flex h-5 w-5
                      shrink-0
                      cursor-pointer
                      items-center justify-center
                    "
                    title={
                      selectAll
                        ? "Deselect all comments"
                        : "Select all comments"
                    }
                  >
                    <input
                      type="checkbox"
                      checked={selectAll}
                      ref={(input) => {
                        if (input) {
                          input.indeterminate = someCommentsSelected;
                        }
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="
                        peer
                        h-4 w-4
                        cursor-pointer
                        appearance-none
                        rounded-sm
                        border border-gray-300
                        bg-white
                        transition-all
                        duration-150
                        checked:border-sky-600
                        checked:bg-sky-600
                        hover:border-sky-400
                        focus:outline-none
                        focus:ring-2
                        focus:ring-sky-100
                      "
                    />

                    <svg
                      className="
                        pointer-events-none
                        absolute
                        hidden
                        h-3 w-3
                        text-white
                        peer-checked:block
                      "
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>

                    {someCommentsSelected && !selectAll && (
                      <span
                        className="
                          pointer-events-none
                          absolute
                          h-0.5 w-2.5
                          rounded-full
                          bg-white
                        "
                      />
                    )}
                  </label>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-gray-700 sm:text-sm">
                        Select all comments
                      </span>

                      <span
                        className="
                          rounded-full
                          border border-gray-200
                          bg-gray-50
                          px-2 py-0.5
                          text-[9px]
                          font-medium
                          text-gray-500
                        "
                      >
                        {comments.length} available
                      </span>
                    </div>

                    <p className="mt-0.5 text-[10px] text-gray-400 sm:text-[11px]">
                      {selectedComments.length > 0
                        ? `${selectedComments.length} of ${comments.length} comments selected`
                        : "Choose comments to perform bulk actions"}
                    </p>
                  </div>
                </div>

                {/* BULK ACTIONS */}
                <div className="w-full md:w-auto">
                  {selectedComments.length > 0 ? (
                    <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
                      {/* Clear */}
                      <button
                        type="button"
                        onClick={clearSelection}
                        className="
                          inline-flex
                          w-full items-center justify-center
                          rounded-md
                          border border-gray-200
                          bg-white
                          px-3 py-2
                          text-[11px]
                          font-semibold
                          text-gray-600
                          transition-all duration-150
                          hover:bg-gray-50
                          focus:outline-none
                          focus:ring-2
                          focus:ring-gray-100
                          sm:w-auto
                        "
                      >
                        Clear Selection
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDeleteAlert({
                            open: true,
                            type: "bulk",
                            data: selectedComments,
                          })
                        }
                        className="
                          inline-flex
                          w-full items-center justify-center gap-2
                          rounded-md
                          border border-red-200
                          bg-red-50
                          px-3 py-2
                          text-[11px]
                          font-semibold
                          text-red-600
                          transition-all duration-150
                          hover:border-red-300
                          hover:bg-red-100
                          focus:outline-none
                          focus:ring-2
                          focus:ring-red-100
                          sm:w-auto
                        "
                      >
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 6h18M9 6V4h6v2m-8 0 .8 14h8.4L17 6M10 10v6m4-6v6"
                          />
                        </svg>
                        Delete Selected
                        <span
                          className="
                            rounded-md
                            bg-red-100
                            px-1.5 py-0.5
                            text-[9px]
                            font-bold
                            text-red-600
                          "
                        >
                          {selectedComments.length}
                        </span>
                      </button>
                    </div>
                  ) : (
                    <span
                      className="
                        hidden
                        text-[10px]
                        text-gray-400
                        md:block
                      "
                    >
                      No comments selected
                    </span>
                  )}
                </div>
              </div>

              {/* Selection Progress */}
              {selectedComments.length > 0 && (
                <div className="h-0.5 w-full bg-gray-100">
                  <div
                    className="
                      h-full
                      rounded-r-full
                      bg-sky-500
                      transition-all
                      duration-300
                    "
                    style={{
                      width: `${Math.min(
                        (selectedComments.length / comments.length) * 100,
                        100,
                      )}%`,
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ==================================================
          CONTENT
      ================================================== */}

      <div className={!searchResult ? "mt-2" : ""}>
        {/* LOADING */}
        {loading || searchLoading ? (
          <CommentCardSkeleton count={2} />
        ) : searchResult ? (
          /* ==================================================
              SEARCH RESULT
          ================================================== */

          <div>
            {/* Search Result Header */}
            <div
              className="
                mb-3
                flex flex-col gap-3
                rounded-sm
                border border-sky-100
                bg-sky-50/50
                p-3
                sm:mb-4 sm:flex-row sm:items-center sm:justify-between
                sm:p-4
              "
            >
              <div className="min-w-0">
                <p
                  className="
                    text-[9px] font-semibold
                    uppercase tracking-wide
                    text-sky-600
                  "
                >
                  Search Result
                </p>

                <p className="mt-0.5 text-[11px] text-gray-500 sm:text-xs">
                  Showing the discussion containing the searched comment.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSearchResult(null);
                  setSearchParams({});
                  clearSelection();
                }}
                className="
                  self-start
                  rounded-md
                  border border-gray-200
                  bg-white
                  px-3 py-1.5
                  text-[11px]
                  font-medium
                  text-gray-600
                  transition-colors
                  hover:bg-gray-50
                  sm:self-auto
                "
              >
                Clear Search
              </button>
            </div>

            {/* Searched Comment */}
            <CommentInfoCard
              commentId={searchResult.comment._id}
              authorId={searchResult.comment.author?._id}
              authorName={searchResult.comment.author?.name || "Deleted User"}
              authorPhoto={searchResult.comment.author?.profileImageUrl}
              isSearchMatch={
                searchResult.matchedCommentId === searchResult.comment._id
              }
              matchedCommentId={searchResult.matchedCommentId}
              isDeleted={searchResult.comment.isDeleted}
              deletedBy={searchResult.comment.deletedBy}
              content={searchResult.comment.content}
              updatedOn={
                searchResult.comment.updatedAt
                  ? moment(searchResult.comment.updatedAt).format("Do MMM YYYY")
                  : "-"
              }
              post={searchResult.comment.post}
              replies={searchResult.comment.replies || []}
              getAllComments={getAllComments}
              onDeleteComment={(commentId) =>
                setOpenDeleteAlert({
                  open: true,
                  type: "comment",
                  data: commentId,
                })
              }
              onDeleteThread={(commentId) =>
                setOpenDeleteAlert({
                  open: true,
                  type: "thread",
                  data: commentId,
                })
              }
            />
          </div>
        ) : comments.length === 0 ? (
          /* ==================================================
              NO COMMENTS
          ================================================== */

          <div
            className="
              flex flex-col
              items-center justify-center
              rounded-sm
              border border-dashed
              border-gray-300
              bg-white
              px-4
              py-12
            "
          >
            <div
              className="
                mb-3
                flex h-14 w-14
                items-center justify-center
                rounded-full
                bg-gray-100
              "
            >
              <svg
                className="h-7 w-7 text-gray-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 11.5a8.38 8.38 0 01-1.9 5.4L21 21l-4.1-1.9a8.5 8.5 0 01-5.4 1.9A8.5 8.5 0 113 12.5a8.5 8.5 0 0118 0z"
                />
              </svg>
            </div>

            <h3 className="text-sm font-semibold text-gray-700">
              No comments yet
            </h3>

            <p className="mt-1 text-center text-[11px] text-gray-400 sm:text-xs">
              Comments posted by users will appear here for moderation.
            </p>
          </div>
        ) : (
          /* ==================================================
              COMMENTS
          ================================================== */

          <div className="space-y-1">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className={`
        relative
        rounded-sm
        border
        bg-white
        p-2
        transition-all
        duration-200
        ${
          selectedComments.includes(comment._id)
            ? "border-black"
            : "border-gray-200/70 hover:border-gray-300"
        }
      `}
              >
                {/* ==================================================
          CHECKBOX
          Positioned near the top-left of the comment card
      ================================================== */}
                <div className="absolute left-2 top-2 z-10">
                  <label
                    className="
            relative
            flex
            h-5
            w-5
            cursor-pointer
            items-center
            justify-center
            rounded-md
            bg-white
          "
                    title={
                      selectedComments.includes(comment._id)
                        ? "Deselect comment"
                        : "Select comment"
                    }
                  >
                    <input
                      type="checkbox"
                      checked={selectedComments.includes(comment._id)}
                      onChange={() => handleSelectComment(comment._id)}
                      aria-label={`Select comment by ${
                        comment.author?.name || "Deleted User"
                      }`}
                      className="
              peer
              h-4
              w-4
              cursor-pointer
              appearance-none
              rounded-sm
              border
              border-gray-300
              bg-white
              transition-all
              duration-150
              checked:border-sky-600
              checked:bg-sky-600
              hover:border-sky-400
              focus:outline-none
            "
                    />

                    {/* Check */}
                    <svg
                      className="
              pointer-events-none
              absolute
              hidden
              h-3
              w-3
              text-white
              peer-checked:block
            "
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </label>
                </div>

                {/* ==================================================
          COMMENT CONTENT
          Small left offset keeps checkbox away from avatar
      ================================================== */}
                <div className="pl-7">
                  <CommentInfoCard
                    commentId={comment._id}
                    authorName={comment.author?.name || "Deleted User"}
                    authorPhoto={comment.author?.profileImageUrl}
                    isDeleted={comment.isDeleted}
                    deletedBy={comment.deletedBy}
                    content={comment.content}
                    updatedOn={
                      comment.updatedAt
                        ? moment(comment.updatedAt).format("Do MMM YYYY")
                        : "-"
                    }
                    post={comment.post}
                    replies={comment.replies || []}
                    getAllComments={getAllComments}
                    onDeleteComment={(commentId) =>
                      setOpenDeleteAlert({
                        open: true,
                        type: "comment",
                        data: commentId,
                      })
                    }
                    onDeleteThread={(commentId) =>
                      setOpenDeleteAlert({
                        open: true,
                        type: "thread",
                        data: commentId,
                      })
                    }
                    authorId={comment.author?._id}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ==================================================
          PAGINATION
      ================================================== */}

      {!searchResult && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* ==================================================
          DELETE MODAL
      ================================================== */}

      <Modal
        isOpen={openDeleteAlert.open}
        onClose={resetDeleteModal}
        title={
          openDeleteAlert.type === "comment"
            ? "Remove Comment"
            : openDeleteAlert.type === "thread"
              ? "Delete Discussion Thread"
              : "Delete Selected Threads"
        }
      >
        <div className="max-w-full">
          {openDeleteAlert.type === "bulk" ? (
            <DeleteAlertContent
              content={`You are about to permanently delete ${
                selectedComments.length
              } ${
                selectedComments.length === 1
                  ? "discussion thread"
                  : "discussion threads"
              }. This will remove the selected comments and their replies. This action cannot be undone.`}
              danger={true}
              onDelete={deleteSelectedComments}
            />
          ) : (
            <DeleteAlertContent
              content={
                openDeleteAlert.type === "comment"
                  ? "Only this comment will be removed. Replies will remain visible beneath a moderator notice."
                  : "This will permanently delete this comment and every reply beneath it. This action cannot be undone."
              }
              danger={openDeleteAlert.type === "thread"}
              onDelete={() => {
                if (openDeleteAlert.type === "comment") {
                  deleteCommentOnly(openDeleteAlert.data);
                } else {
                  deleteThread(openDeleteAlert.data);
                }
              }}
            />
          )}

          {/* Bulk delete loading indicator */}
          {bulkDeleting && (
            <div className="mt-3 text-center text-xs text-gray-400">
              Deleting selected threads...
            </div>
          )}
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Comments;
