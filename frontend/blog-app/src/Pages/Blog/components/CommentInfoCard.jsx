// import { LuChevronDown, LuDot, LuReply } from "react-icons/lu";
// import toast from "react-hot-toast";
// import CommentReplyInput from "../../../components/Inputs/CommentReplyInput";
// import { useContext, useState } from "react";
// import { UserContext } from "../../../context/userContext";
// import axiosInstance from "../../../utils/axiosInstance";
// import { API_PATHS } from "../../../utils/apiPaths";
// import moment from "moment";

// function CommentInfoCard({
//   commentId,
//   authorName,
//   authorId,
//   authorPhoto,
//   content,
//   isDeleted,
//   deletedBy,
//   updatedOn,
//   post,
//   replies = [],
//   getAllComments,
//   onDelete,
//   depth = 0,
// }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedComment, setEditedComment] = useState(content);
//   const [saving, setSaving] = useState(false);

//   const { user, setOpenAuthForm } = useContext(UserContext);
//   const isOwner = user?._id === authorId;

//   const [replyText, setReplyText] = useState("");
//   const [showReplyForm, setShowReplyForm] = useState(false);
//   const [showSubReplies, setShowSubReplies] = useState(false);

//   const handleEditComment = async () => {
//     if (!editedComment.trim()) {
//       toast.error("Comment cannot be empty");
//       return;
//     }

//     try {
//       setSaving(true);

//       await axiosInstance.put(API_PATHS.COMMENT.EDIT_MY_COMMENT(commentId), {
//         content: editedComment,
//       });

//       toast.success("Comment updated");

//       setIsEditing(false);

//       getAllComments?.();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update comment");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDeleteComment = async () => {
//     if (!window.confirm("Delete this comment?")) return;

//     try {
//       await axiosInstance.delete(
//         API_PATHS.COMMENT.DELETE_MY_COMMENT(commentId),
//       );

//       toast.success("Comment deleted");

//       getAllComments?.();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to delete comment");
//     }
//   };

//   const handleCancelReply = () => {
//     setReplyText("");
//     setShowReplyForm(false);
//   };

//   const handleAddReply = async () => {
//     try {
//       await axiosInstance.post(API_PATHS.COMMENT.ADD(post._id), {
//         content: replyText,
//         parentComment: commentId,
//       });

//       toast.success("Reply added successfully");
//       setReplyText("");
//       setShowReplyForm(false);

//       getAllComments?.();
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const shouldIndent = depth < 2;

//   return (
//     <div className="relative py-1 my-3 ">
//       <div className="flex gap-2 sm:gap-3 ">
//         {/* Avatar */}
//         <div className="w-full">
//           <div className="flex-1">
//             {/* Comment Card */}
//             <div className="rounded-xl sm:rounded-md bg-gray-200/50 border border-gray-100 px-1 py-2 sm:px-4">
//               <div className="flex gap-2">
//                 <img
//                   src={authorPhoto}
//                   alt={authorName}
//                   className="w-7 h-7 sm:w-8 sm:h-8 rounded-full mb-1  object-cover flex-shrink-0 border border-gray-200"
//                 />
//                 {/* Header */}
//                 <div className="flex flex-wrap items-center gap-1 text-[11px] sm:text-xs">
//                   <span className="font-semibold text-gray-800 break-all">
//                     @{authorName}
//                   </span>

//                   <LuDot className="text-gray-400" />

//                   <span className="text-gray-500">{updatedOn}</span>
//                 </div>
//               </div>

//               {/* Content */}

//               {isEditing ? (
//                 <>
//                   <input
//                     value={editedComment}
//                     onChange={(e) => setEditedComment(e.target.value)}
//                     className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-sky-500"
//                   />

//                   <div className="flex justify-end gap-2 mt-3">
//                     <button
//                       onClick={() => {
//                         setEditedComment(content);
//                         setIsEditing(false);
//                       }}
//                       className="px-3 py-1.5 rounded-md border border-gray-300 text-sm"
//                     >
//                       Cancel
//                     </button>

//                     <button
//                       onClick={handleEditComment}
//                       disabled={saving}
//                       className="px-4 py-1.5 rounded-md bg-sky-500 text-white text-sm disabled:opacity-50"
//                     >
//                       {saving ? "Saving..." : "Save"}
//                     </button>
//                   </div>
//                 </>
//               ) : isDeleted ? (
//                 <p className="mt-1 italic text-sm text-gray-500">
//                   {deletedBy === "admin"
//                     ? "Removed by moderator"
//                     : "Deleted by user"}
//                 </p>
//               ) : (
//                 <p className="mt-1 text-xs sm:text-[13px] leading-5 sm:leading-6 text-gray-700 whitespace-pre-wrap break-words">
//                   {content}
//                 </p>
//               )}
//             </div>

//             {/* Actions */}
//             {/* Actions */}
//             <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-2 ml-1">
//               {!isDeleted && (
//                 <>
//                   {/* Reply */}
//                   <button
//                     onClick={() => {
//                       if (!user) {
//                         setOpenAuthForm(true);
//                         return;
//                       }

//                       setShowReplyForm((prev) => !prev);
//                     }}
//                     className="flex items-center gap-1 text-[11px] sm:text-xs text-gray-500 hover:text-sky-600 transition"
//                   >
//                     <LuReply size={13} />
//                     Reply
//                   </button>

//                   {/* Edit & Delete (Only Comment Owner) */}
//                   {isOwner && (
//                     <>
//                       <button
//                         onClick={() => {
//                           setEditedComment(content);
//                           setIsEditing(true);
//                         }}
//                         className="text-[11px] sm:text-xs text-sky-600 hover:text-sky-700 transition"
//                       >
//                         Edit
//                       </button>

//                       <button
//                         onClick={handleDeleteComment}
//                         className="text-[11px] sm:text-xs text-red-500 hover:text-red-600 transition"
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </>
//               )}

//               {/* Show Replies (Always Visible) */}
//               {replies.length > 0 && (
//                 <button
//                   onClick={() => setShowSubReplies((prev) => !prev)}
//                   className="flex items-center gap-1 text-[11px] sm:text-xs font-medium text-sky-600 hover:text-sky-700 transition"
//                 >
//                   {showSubReplies ? "Hide" : "Show"} {replies.length}{" "}
//                   {replies.length === 1 ? "reply" : "replies"}
//                   <LuChevronDown
//                     size={14}
//                     className={`transition-transform duration-200 ${
//                       showSubReplies ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>
//               )}
//             </div>

//             {/* Reply Input */}
//             {showReplyForm && (
//               <div className="mt-4 mb-4 relative z-20">
//                 <div className="rounded-sm border border-gray-300 bg-white  p-4">
//                   <CommentReplyInput
//                     user={user}
//                     authorName={authorName}
//                     content={content}
//                     replyText={replyText}
//                     setReplyText={setReplyText}
//                     handleAddReply={handleAddReply}
//                     handleCancelReply={handleCancelReply}
//                     disableAutoGen
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Replies */}
//             {showSubReplies && replies.length > 0 && (
//               <div
//                 className={`relative mt-3 border-l border-gray-300 ${
//                   shouldIndent ? "ml-3 pl-3" : "ml-0 pl-3"
//                 }`}
//               >
//                 {replies.map((comment) => (
//                   <div key={comment._id} className="relative">
//                     {/* Connector */}
//                     <span className="absolute -left-3 top-6 w-3 border-t border-gray-300" />

//                     <CommentInfoCard
//                       commentId={comment._id}
//                       authorName={comment.author?.name || "Deleted User"}
//                       authorId={comment.author?._id}
//                       isDeleted={comment.isDeleted}
//                       deletedBy={comment.deletedBy}
//                       authorPhoto={
//                         comment.author?.profileImageUrl ||
//                         "http://localhost:8000/uploads/avatar/avatar.svg"
//                       }
//                       content={comment.content}
//                       updatedOn={
//                         comment.updatedAt
//                           ? moment(comment.updatedAt).format("Do MMM YYYY")
//                           : "-"
//                       }
//                       post={comment.post}
//                       replies={comment.replies || []}
//                       getAllComments={getAllComments}
//                       onDelete={onDelete}
//                       depth={depth + 1}
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CommentInfoCard;

// import {
//   LuChevronDown,
//   LuDot,
//   LuReply,
//   LuPencil,
//   LuTrash2,
//   LuTriangleAlert,
// } from "react-icons/lu";
// import toast from "react-hot-toast";
// import CommentReplyInput from "../../../components/Inputs/CommentReplyInput";
// import { useContext, useState } from "react";
// import { UserContext } from "../../../context/userContext";
// import axiosInstance from "../../../utils/axiosInstance";
// import { API_PATHS } from "../../../utils/apiPaths";
// import moment from "moment";
// import CharAvatar from "../../../components/CharAvatar";

// function CommentInfoCard({
//   commentId,
//   authorName,
//   authorId,
//   authorPhoto,
//   content,
//   isDeleted,
//   deletedBy,
//   updatedOn,
//   post,
//   replies = [],
//   getAllComments,
//   onDelete,
//   depth = 0,
// }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedComment, setEditedComment] = useState(content);
//   const [saving, setSaving] = useState(false);

//   const { user, setOpenAuthForm } = useContext(UserContext);

//   const isOwner = user?._id === authorId;

//   const [showReplyForm, setShowReplyForm] = useState(false);
//   const [showSubReplies, setShowSubReplies] = useState(false);

//   // Delete modal state
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleting, setDeleting] = useState(false);

//   const handleEditComment = async () => {
//     if (!editedComment.trim()) {
//       toast.error("Comment cannot be empty");
//       return;
//     }

//     try {
//       setSaving(true);

//       await axiosInstance.put(API_PATHS.COMMENT.EDIT_MY_COMMENT(commentId), {
//         content: editedComment,
//       });

//       toast.success("Comment updated");

//       setIsEditing(false);

//       getAllComments?.();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update comment");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Open delete confirmation modal
//   const handleDeleteClick = () => {
//     setShowDeleteModal(true);
//   };

//   // Actually delete the comment
//   const handleConfirmDelete = async () => {
//     try {
//       setDeleting(true);

//       await axiosInstance.delete(
//         API_PATHS.COMMENT.DELETE_MY_COMMENT(commentId),
//       );

//       toast.success("Comment deleted");

//       setShowDeleteModal(false);

//       getAllComments?.();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to delete comment");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const handleCancelReply = () => {
//     setShowReplyForm(false);
//   };

//   const handleAddReply = async (content) => {
//     try {
//       await axiosInstance.post(API_PATHS.COMMENT.ADD(post._id), {
//         content,
//         parentComment: commentId,
//       });

//       toast.success("Reply added successfully");

//       setShowReplyForm(false);

//       getAllComments?.();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to add reply");
//     }
//   };
//   // Limit indentation so deeply nested replies
//   // do not become unusable on mobile.
//   const shouldIndent = depth < 2;

//   return (
//     <>
//       <div className="relative py-1.5 sm:py-2">
//         <div className="w-full">
//           {/* ================= COMMENT CARD ================= */}
//           <div
//             className={`rounded-sm border px-3 py-3 sm:px-4 sm:py-4 transition-all duration-200 ${
//               isDeleted
//                 ? "bg-gray-50 border-gray-200"
//                 : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
//             }`}
//           >
//             {/* Header */}
//             <div className="flex items-start gap-2.5 sm:gap-3">
//               {/* Avatar */}
//               {authorPhoto ? (
//                 <img
//                   src={authorPhoto}
//                   alt={authorName}
//                   className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover flex-shrink-0 border border-gray-200"
//                 />
//               ) : (
//                 <CharAvatar
//                   fullName={authorName || "Deleted User"}
//                   width="w-8"
//                   height="h-8"
//                   style="text-xs sm:w-9 sm:h-9 sm:text-sm border border-gray-200"
//                 />
//               )}

//               <div className="flex-1 min-w-0">
//                 {/* Name + Date */}
//                 <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
//                   <span className="text-xs sm:text-sm font-semibold text-gray-900 break-all">
//                     @{authorName}
//                   </span>

//                   <LuDot size={14} className="text-gray-300 flex-shrink-0" />

//                   <span className="text-[10px] sm:text-xs text-gray-400">
//                     {updatedOn}
//                   </span>
//                 </div>

//                 {/* ================= EDITING ================= */}
//                 {isEditing ? (
//                   <div className="mt-3">
//                     <input
//                       value={editedComment}
//                       onChange={(e) => setEditedComment(e.target.value)}
//                       autoFocus
//                       className="w-full rounded-sm border border-gray-300 bg-gray-50 px-3 py-2.5 text-xs sm:text-sm text-gray-700 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
//                     />

//                     <div className="flex justify-end gap-2 mt-3">
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setEditedComment(content);
//                           setIsEditing(false);
//                         }}
//                         className="px-3 py-1.5 rounded-sm border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
//                       >
//                         Cancel
//                       </button>

//                       <button
//                         type="button"
//                         onClick={handleEditComment}
//                         disabled={saving}
//                         className="px-3.5 py-1.5 rounded-sm bg-sky-500 text-white text-xs sm:text-sm font-medium hover:bg-sky-600 transition disabled:opacity-50"
//                       >
//                         {saving ? "Saving..." : "Save"}
//                       </button>
//                     </div>
//                   </div>
//                 ) : isDeleted ? (
//                   /* ================= DELETED COMMENT ================= */
//                   <div className="mt-2">
//                     <p className="text-xs sm:text-sm italic text-gray-400">
//                       {deletedBy === "admin"
//                         ? "This comment was removed by a moderator."
//                         : "This comment was deleted by the user."}
//                     </p>
//                   </div>
//                 ) : (
//                   /* ================= COMMENT CONTENT ================= */
//                   <p className="mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-700 whitespace-pre-wrap break-words">
//                     {content}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* ================= ACTIONS ================= */}
//           <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2.5 ml-1">
//             {!isDeleted && (
//               <>
//                 {/* Reply */}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     if (!user) {
//                       setOpenAuthForm(true);
//                       return;
//                     }

//                     setShowReplyForm((prev) => !prev);
//                   }}
//                   className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-gray-500 hover:text-sky-600 transition"
//                 >
//                   <LuReply size={13} />
//                   Reply
//                 </button>

//                 {/* Edit */}
//                 {isOwner && (
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setEditedComment(content);
//                       setIsEditing(true);
//                     }}
//                     className="flex items-center gap-1 text-[11px] sm:text-xs font-medium text-gray-500 hover:text-sky-600 transition"
//                   >
//                     <LuPencil size={12} />
//                     Edit
//                   </button>
//                 )}

//                 {/* Delete */}
//                 {isOwner && (
//                   <button
//                     type="button"
//                     onClick={handleDeleteClick}
//                     className="flex items-center gap-1 text-[11px] sm:text-xs font-medium text-gray-500 hover:text-red-500 transition"
//                   >
//                     <LuTrash2 size={12} />
//                     Delete
//                   </button>
//                 )}
//               </>
//             )}

//             {/* Show Replies */}
//             {replies.length > 0 && (
//               <button
//                 type="button"
//                 onClick={() => setShowSubReplies((prev) => !prev)}
//                 className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-sky-600 hover:text-sky-700 transition"
//               >
//                 {showSubReplies ? "Hide" : "Show"} {replies.length}{" "}
//                 {replies.length === 1 ? "reply" : "replies"}
//                 <LuChevronDown
//                   size={13}
//                   className={`transition-transform duration-200 ${
//                     showSubReplies ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>
//             )}
//           </div>

//           {/* ================= REPLY INPUT ================= */}
//           {showReplyForm && (
//             <div className="mt-4 mb-4">
//               <div className="rounded-sm border border-gray-200 bg-gray-50 p-3 sm:p-4">
//                 <CommentReplyInput
//                   user={user}
//                   authorName={authorName}
//                   content={content}
//                   handleAddReply={handleAddReply}
//                   handleCancelReply={handleCancelReply}
//                   disableAutoGen
//                 />
//               </div>
//             </div>
//           )}

//           {/* ================= NESTED REPLIES ================= */}
//           {showSubReplies && replies.length > 0 && (
//             <div
//               className={`relative mt-3 border-l-2 border-gray-200 ${
//                 shouldIndent ? "ml-2 sm:ml-4 pl-3 sm:pl-4" : "ml-0 pl-3 sm:pl-4"
//               }`}
//             >
//               {replies.map((comment) => (
//                 <div key={comment._id} className="relative">
//                   {/* Reply Connector */}
//                   <span className="absolute -left-3 sm:-left-4 top-6 w-3 sm:w-4 border-t-2 border-gray-200" />

//                   <CommentInfoCard
//                     commentId={comment._id}
//                     authorName={comment.author?.name || "Deleted User"}
//                     authorId={comment.author?._id}
//                     authorPhoto={comment.author?.profileImageUrl}
//                     content={comment.content}
//                     isDeleted={comment.isDeleted}
//                     deletedBy={comment.deletedBy}
//                     updatedOn={
//                       comment.updatedAt
//                         ? moment(comment.updatedAt).format("Do MMM YYYY")
//                         : "-"
//                     }
//                     post={comment.post}
//                     replies={comment.replies || []}
//                     getAllComments={getAllComments}
//                     onDelete={onDelete}
//                     depth={depth + 1}
//                   />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ===================================================== */}
//       {/* DELETE CONFIRMATION MODAL */}
//       {/* ===================================================== */}

//       {showDeleteModal && (
//         <div
//           className="
//       fixed
//       inset-0
//       z-[200]
//       flex
//       items-center
//       justify-center
//       bg-black/45
//       px-4
//       backdrop-blur-[3px]
//     "
//           onClick={() => {
//             if (!deleting) {
//               setShowDeleteModal(false);
//             }
//           }}
//         >
//           <div
//             className="
//         w-full
//         max-w-md
//         overflow-hidden
//         rounded-sm
//         border
//         border-gray-200
//         bg-white
//         shadow-[0_20px_60px_rgba(0,0,0,0.18)]
//         animate-in
//         fade-in
//         zoom-in-95
//         duration-200
//       "
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* ================================================= */}
//             {/* HEADER / CONTENT */}
//             {/* ================================================= */}

//             <div className="px-5 py-6 sm:px-6">
//               <div className="flex items-start gap-4">
//                 {/* Warning Icon */}

//                 <div
//                   className="
//               flex
//               h-11
//               w-11
//               shrink-0
//               items-center
//               justify-center
//               rounded-sm
//               border
//               border-red-100
//               bg-red-50
//               text-red-500
//             "
//                 >
//                   <LuTriangleAlert size={21} strokeWidth={2} />
//                 </div>

//                 {/* Text */}

//                 <div className="min-w-0">
//                   <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
//                     Delete this comment?
//                   </h3>

//                   <p className="mt-1.5 text-xs leading-5 text-gray-500 sm:text-sm">
//                     This comment will be permanently removed. You won't be able
//                     to recover it once it's deleted.
//                   </p>
//                 </div>
//               </div>

//               {/* Warning Notice */}

//               <div
//                 className="
//             mt-5
//             flex
//             items-start
//             gap-2.5
//             rounded-sm
//             border
//             border-red-100
//             bg-red-50/60
//             px-3.5
//             py-3
//           "
//               >
//                 <LuTriangleAlert
//                   size={15}
//                   className="mt-0.5 shrink-0 text-red-400"
//                 />

//                 <p className="text-[11px] leading-4 text-red-600 sm:text-xs">
//                   Please make sure this is the comment you want to remove before
//                   continuing.
//                 </p>
//               </div>
//             </div>

//             {/* ================================================= */}
//             {/* FOOTER */}
//             {/* ================================================= */}

//             <div
//               className="
//           flex
//           items-center
//           justify-end
//           gap-2
//           border-t
//           border-gray-100
//           bg-gray-50/70
//           px-5
//           py-3.5
//           sm:px-6
//         "
//             >
//               {/* Cancel */}

//               <button
//                 type="button"
//                 disabled={deleting}
//                 onClick={() => setShowDeleteModal(false)}
//                 className="
//             rounded-sm
//             border
//             border-gray-300
//             bg-white
//             px-4
//             py-2
//             text-xs
//             font-medium
//             text-gray-600
//             transition-all
//             duration-200
//             hover:border-gray-400
//             hover:bg-gray-50
//             hover:text-gray-800
//             focus:outline-none
//             focus:ring-2
//             focus:ring-gray-200
//             disabled:cursor-not-allowed
//             disabled:opacity-50
//             sm:text-sm
//           "
//               >
//                 Cancel
//               </button>

//               {/* Delete */}

//               <button
//                 type="button"
//                 disabled={deleting}
//                 onClick={handleConfirmDelete}
//                 className="
//             flex
//             items-center
//             gap-2
//             rounded-sm
//             bg-red-500
//             px-4
//             py-2
//             text-xs
//             font-medium
//             text-white
//             shadow-sm
//             transition-all
//             duration-200
//             hover:bg-red-600
//             hover:shadow-md
//             focus:outline-none
//             focus:ring-2
//             focus:ring-red-200
//             disabled:cursor-not-allowed
//             disabled:opacity-50
//             sm:text-sm
//           "
//               >
//                 <LuTrash2 size={14} />

//                 {deleting ? "Deleting..." : "Delete Comment"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default CommentInfoCard;

import {
  LuChevronDown,
  LuDot,
  LuReply,
  LuPencil,
  LuTrash2,
  LuTriangleAlert,
} from "react-icons/lu";

import toast from "react-hot-toast";

import CommentReplyInput from "../../../components/Inputs/CommentReplyInput";

import { useContext, useEffect, useRef, useState } from "react";

import { UserContext } from "../../../context/userContext";

import axiosInstance from "../../../utils/axiosInstance";

import { API_PATHS } from "../../../utils/apiPaths";

import moment from "moment";

import CharAvatar from "../../../components/CharAvatar";

function CommentInfoCard({
  commentId,
  authorName,
  authorId,
  authorPhoto,
  content,
  isDeleted,
  deletedBy,
  updatedOn,
  post,
  replies = [],
  getAllComments,
  onDelete,
  depth = 0,

  // ============================================================
  // COMMENT DEEP-LINK PROPS
  // ============================================================

  targetCommentId = null,
  autoExpand = false,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [editedComment, setEditedComment] = useState(content);

  const [saving, setSaving] = useState(false);

  const { user, setOpenAuthForm } = useContext(UserContext);

  const isOwner = user?._id === authorId;

  const [showReplyForm, setShowReplyForm] = useState(false);

  /*
    Existing behavior is preserved.

    autoExpand is only true when this comment is part of the path
    required to reach the comment from the URL.
  */
  const [showSubReplies, setShowSubReplies] = useState(autoExpand);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [deleting, setDeleting] = useState(false);

  // ============================================================
  // TARGET COMMENT REF
  // ============================================================

  const commentRef = useRef(null);

  // ============================================================
  // IS THIS THE ACTUAL TARGET?
  // ============================================================

  const isTargetComment =
    Boolean(targetCommentId) && commentId === targetCommentId;

  // ============================================================
  // AUTO EXPAND WHEN URL TARGET CHANGES
  // ============================================================

  useEffect(() => {
    if (!autoExpand) {
      return;
    }

    setShowSubReplies(true);
  }, [autoExpand]);

  // ============================================================
  // SCROLL TARGET COMMENT INTO VIEW
  // ============================================================

  useEffect(() => {
    if (!isTargetComment) {
      return;
    }

    /*
      The parent comment may have just opened its replies.
      Wait briefly so the nested DOM tree is fully rendered before
      scrolling to the target.
    */
    const timeout = setTimeout(() => {
      if (!commentRef.current) {
        return;
      }

      commentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 200);

    return () => clearTimeout(timeout);
  }, [isTargetComment, showSubReplies]);

  // ============================================================
  // EDIT COMMENT
  // ============================================================

  const handleEditComment = async () => {
    if (!editedComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      setSaving(true);

      await axiosInstance.put(API_PATHS.COMMENT.EDIT_MY_COMMENT(commentId), {
        content: editedComment,
      });

      toast.success("Comment updated");

      setIsEditing(false);

      getAllComments?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update comment");
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // DELETE MODAL
  // ============================================================

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  // ============================================================
  // CONFIRM DELETE
  // ============================================================

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);

      await axiosInstance.delete(
        API_PATHS.COMMENT.DELETE_MY_COMMENT(commentId),
      );

      toast.success("Comment deleted");

      setShowDeleteModal(false);

      getAllComments?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete comment");
    } finally {
      setDeleting(false);
    }
  };

  // ============================================================
  // CANCEL REPLY
  // ============================================================

  const handleCancelReply = () => {
    setShowReplyForm(false);
  };

  // ============================================================
  // ADD REPLY
  // ============================================================

  const handleAddReply = async (content) => {
    try {
      await axiosInstance.post(API_PATHS.COMMENT.ADD(post._id), {
        content,
        parentComment: commentId,
      });

      toast.success("Reply added successfully");

      setShowReplyForm(false);

      getAllComments?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add reply");
    }
  };

  // ============================================================
  // LIMIT INDENTATION
  // ============================================================

  const shouldIndent = depth < 2;

  return (
    <>
      <div
        ref={commentRef}
        id={`comment-${commentId}`}
        className="relative py-1.5 sm:py-2 scroll-mt-24"
      >
        <div className="w-full">
          {/* ================================================== */}
          {/* COMMENT CARD */}
          {/* ================================================== */}

          <div
            className={`
              rounded-sm
              border
              px-3
              py-3
              sm:px-4
              sm:py-4
              transition-all
              duration-300
              ${
                isDeleted
                  ? "bg-gray-50 border-gray-200"
                  : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }

              ${
                isTargetComment
                  ? "ring-2 ring-sky-200 border-sky-300 shadow-md"
                  : ""
              }
            `}
          >
            {/* Header */}

            <div className="flex items-start gap-2.5 sm:gap-3">
              {/* Avatar */}

              {authorPhoto ? (
                <img
                  src={authorPhoto}
                  alt={authorName}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover flex-shrink-0 border border-gray-200"
                />
              ) : (
                <CharAvatar
                  fullName={authorName || "Deleted User"}
                  width="w-8"
                  height="h-8"
                  style="text-xs sm:w-9 sm:h-9 sm:text-sm border border-gray-200"
                />
              )}

              <div className="flex-1 min-w-0">
                {/* Name + Date */}

                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 break-all">
                    @{authorName}
                  </span>

                  <LuDot size={14} className="text-gray-300 flex-shrink-0" />

                  <span className="text-[10px] sm:text-xs text-gray-400">
                    {updatedOn}
                  </span>
                </div>

                {/* ================================================== */}
                {/* EDITING */}
                {/* ================================================== */}

                {isEditing ? (
                  <div className="mt-3">
                    <input
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      autoFocus
                      className="w-full rounded-sm border border-gray-300 bg-gray-50 px-3 py-2.5 text-xs sm:text-sm text-gray-700 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />

                    <div className="flex justify-end gap-2 mt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setEditedComment(content);
                          setIsEditing(false);
                        }}
                        className="px-3 py-1.5 rounded-sm border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={handleEditComment}
                        disabled={saving}
                        className="px-3.5 py-1.5 rounded-sm bg-sky-500 text-white text-xs sm:text-sm font-medium hover:bg-sky-600 transition disabled:opacity-50"
                      >
                        {saving ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                ) : isDeleted ? (
                  /* ================================================== */
                  /* DELETED COMMENT */
                  /* ================================================== */

                  <div className="mt-2">
                    <p className="text-xs sm:text-sm italic text-gray-400">
                      {deletedBy === "admin"
                        ? "This comment was removed by a moderator."
                        : "This comment was deleted by the user."}
                    </p>
                  </div>
                ) : (
                  /* ================================================== */
                  /* COMMENT CONTENT */
                  /* ================================================== */

                  <p className="mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-700 whitespace-pre-wrap break-words">
                    {content}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ================================================== */}
          {/* ACTIONS */}
          {/* ================================================== */}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2.5 ml-1">
            {!isDeleted && (
              <>
                {/* Reply */}

                <button
                  type="button"
                  onClick={() => {
                    if (!user) {
                      setOpenAuthForm(true);
                      return;
                    }

                    setShowReplyForm((prev) => !prev);
                  }}
                  className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-gray-500 hover:text-sky-600 transition"
                >
                  <LuReply size={13} />
                  Reply
                </button>

                {/* Edit */}

                {isOwner && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditedComment(content);
                      setIsEditing(true);
                    }}
                    className="flex items-center gap-1 text-[11px] sm:text-xs font-medium text-gray-500 hover:text-sky-600 transition"
                  >
                    <LuPencil size={12} />
                    Edit
                  </button>
                )}

                {/* Delete */}

                {isOwner && (
                  <button
                    type="button"
                    onClick={handleDeleteClick}
                    className="flex items-center gap-1 text-[11px] sm:text-xs font-medium text-gray-500 hover:text-red-500 transition"
                  >
                    <LuTrash2 size={12} />
                    Delete
                  </button>
                )}
              </>
            )}

            {/* ================================================== */}
            {/* SHOW REPLIES */}
            {/* ================================================== */}

            {replies.length > 0 && (
              <button
                type="button"
                onClick={() => setShowSubReplies((prev) => !prev)}
                className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-sky-600 hover:text-sky-700 transition"
              >
                {showSubReplies ? "Hide" : "Show"} {replies.length}{" "}
                {replies.length === 1 ? "reply" : "replies"}
                <LuChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${
                    showSubReplies ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>

          {/* ================================================== */}
          {/* REPLY INPUT */}
          {/* ================================================== */}

          {showReplyForm && (
            <div className="mt-4 mb-4">
              <div className="rounded-sm border border-gray-200 bg-gray-50 p-3 sm:p-4">
                <CommentReplyInput
                  user={user}
                  authorName={authorName}
                  content={content}
                  handleAddReply={handleAddReply}
                  handleCancelReply={handleCancelReply}
                  disableAutoGen
                />
              </div>
            </div>
          )}

          {/* ================================================== */}
          {/* NESTED REPLIES */}
          {/* ================================================== */}

          {showSubReplies && replies.length > 0 && (
            <div
              className={`relative mt-3 border-l-2 border-gray-200 ${
                shouldIndent ? "ml-2 sm:ml-4 pl-3 sm:pl-4" : "ml-0 pl-3 sm:pl-4"
              }`}
            >
              {replies.map((comment) => (
                <div key={comment._id} className="relative">
                  {/* Reply Connector */}

                  <span className="absolute -left-3 sm:-left-4 top-6 w-3 sm:w-4 border-t-2 border-gray-200" />

                  <CommentInfoCard
                    commentId={comment._id}
                    authorName={comment.author?.name || "Deleted User"}
                    authorId={comment.author?._id}
                    authorPhoto={comment.author?.profileImageUrl}
                    content={comment.content}
                    isDeleted={comment.isDeleted}
                    deletedBy={comment.deletedBy}
                    updatedOn={
                      comment.updatedAt
                        ? moment(comment.updatedAt).format("Do MMM YYYY")
                        : "-"
                    }
                    post={comment.post}
                    replies={comment.replies || []}
                    getAllComments={getAllComments}
                    onDelete={onDelete}
                    depth={depth + 1}
                    // ==================================================
                    // PASS DEEP-LINK INFORMATION DOWN RECURSIVELY
                    // ==================================================

                    targetCommentId={targetCommentId}
                    autoExpand={
                      autoExpand &&
                      (() => {
                        /*
                          If this child is itself the target, it doesn't
                          need to expand anything.

                          If it contains the target somewhere inside its
                          replies, it needs to open its reply section.
                        */

                        if (comment._id === targetCommentId) {
                          return false;
                        }

                        const containsTarget = (list, targetId) => {
                          if (!Array.isArray(list)) {
                            return false;
                          }

                          for (const item of list) {
                            if (item?._id === targetId) {
                              return true;
                            }

                            if (
                              Array.isArray(item?.replies) &&
                              containsTarget(item.replies, targetId)
                            ) {
                              return true;
                            }
                          }

                          return false;
                        };

                        return containsTarget(comment.replies, targetCommentId);
                      })()
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===================================================== */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ===================================================== */}

      {showDeleteModal && (
        <div
          className="
            fixed
            inset-0
            z-[200]
            flex
            items-center
            justify-center
            bg-black/45
            px-4
            backdrop-blur-[3px]
          "
          onClick={() => {
            if (!deleting) {
              setShowDeleteModal(false);
            }
          }}
        >
          <div
            className="
              w-full
              max-w-md
              overflow-hidden
              rounded-sm
              border
              border-gray-200
              bg-white
              shadow-[0_20px_60px_rgba(0,0,0,0.18)]
              animate-in
              fade-in
              zoom-in-95
              duration-200
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER / CONTENT */}

            <div className="px-5 py-6 sm:px-6">
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-sm
                    border
                    border-red-100
                    bg-red-50
                    text-red-500
                  "
                >
                  <LuTriangleAlert size={21} strokeWidth={2} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                    Delete this comment?
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-gray-500 sm:text-sm">
                    This comment will be permanently removed. You won't be able
                    to recover it once it's deleted.
                  </p>
                </div>
              </div>

              <div
                className="
                  mt-5
                  flex
                  items-start
                  gap-2.5
                  rounded-sm
                  border
                  border-red-100
                  bg-red-50/60
                  px-3.5
                  py-3
                "
              >
                <LuTriangleAlert
                  size={15}
                  className="mt-0.5 shrink-0 text-red-400"
                />

                <p className="text-[11px] leading-4 text-red-600 sm:text-xs">
                  Please make sure this is the comment you want to remove before
                  continuing.
                </p>
              </div>
            </div>

            {/* FOOTER */}

            <div
              className="
                flex
                items-center
                justify-end
                gap-2
                border-t
                border-gray-100
                bg-gray-50/70
                px-5
                py-3.5
                sm:px-6
              "
            >
              <button
                type="button"
                disabled={deleting}
                onClick={() => setShowDeleteModal(false)}
                className="
                  rounded-sm
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-2
                  text-xs
                  font-medium
                  text-gray-600
                  transition-all
                  duration-200
                  hover:border-gray-400
                  hover:bg-gray-50
                  hover:text-gray-800
                  focus:outline-none
                  focus:ring-2
                  focus:ring-gray-200
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  sm:text-sm
                "
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={handleConfirmDelete}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-sm
                  bg-red-500
                  px-4
                  py-2
                  text-xs
                  font-medium
                  text-white
                  shadow-sm
                  transition-all
                  duration-200
                  hover:bg-red-600
                  hover:shadow-md
                  focus:outline-none
                  focus:ring-2
                  focus:ring-red-200
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  sm:text-sm
                "
              >
                <LuTrash2 size={14} />

                {deleting ? "Deleting..." : "Delete Comment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CommentInfoCard;
