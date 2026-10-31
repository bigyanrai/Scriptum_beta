// import { API_PATHS } from "../../utils/apiPaths";
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   LuLoaderCircle,
//   LuReply,
//   LuSend,
//   LuWandSparkles,
// } from "react-icons/lu";
// import Input from "./Input";
// import { useState } from "react";

// const CommentReplyInput = ({
//   user,
//   authorName,
//   content,
//   replyText,
//   setReplyText,
//   handleAddReply,
//   handleCancelReply,
//   disableAutoGen,
//   type = "reply",
// }) => {
//   const [loading, setLoading] = useState(false);

//   const generateReply = async () => {
//     setLoading(true);

//     try {
//       const aiResponse = await axiosInstance.post(
//         API_PATHS.AI.GENERATE_COMMENT_REPLY,
//         {
//           author: { name: authorName },
//           content,
//         },
//       );

//       const generatedReply = aiResponse.data;

//       if (generatedReply?.length > 0) {
//         setReplyText(generatedReply);
//       }
//     } catch (error) {
//       console.log("Something went wrong. Please try again.", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full">
//       <div className="flex items-start gap-2.5 sm:gap-3">
//         {/* Avatar */}
//         <img
//           src={user?.profileImageUrl}
//           alt={user?.name}
//           className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-gray-200 flex-shrink-0"
//         />

//         <div className="flex-1 min-w-0">
//           <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
//             {/* Header */}
//             <div className="flex items-center justify-between gap-2 px-3 sm:px-4 pt-3">
//               <span className="text-[11px] sm:text-xs font-medium text-gray-500 truncate">
//                 {type === "new"
//                   ? `Comment as @${authorName}`
//                   : `Replying to @${authorName}`}
//               </span>

//               {!disableAutoGen && (
//                 <button
//                   onClick={generateReply}
//                   disabled={loading}
//                   className="flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-sky-600 hover:bg-sky-500 hover:text-white transition disabled:opacity-60 flex-shrink-0"
//                 >
//                   {loading ? (
//                     <LuLoaderCircle className="animate-spin" size={12} />
//                   ) : (
//                     <LuWandSparkles size={12} />
//                   )}

//                   {loading ? "Generating..." : "AI Reply"}
//                 </button>
//               )}
//             </div>

//             {/* Input */}
//             <div className="px-3 sm:px-4 py-2">
//               <Input
//                 value={replyText}
//                 onChange={({ target }) => setReplyText(target.value)}
//                 placeholder={
//                   type === "new" ? "Share your thoughts..." : "Write a reply..."
//                 }
//                 label=""
//                 type="text"
//               />
//             </div>

//             {/* Footer */}
//             <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2 px-3 sm:px-4 py-2.5 border-t border-gray-100 bg-gray-50/70">
//               <span className="hidden sm:block text-[10px] text-gray-400">
//                 Be respectful and keep the discussion constructive.
//               </span>

//               <div className="flex justify-end gap-2">
//                 <button
//                   onClick={handleCancelReply}
//                   disabled={loading}
//                   className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-[11px] sm:text-xs font-medium text-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={handleAddReply}
//                   disabled={replyText.trim().length === 0 || loading}
//                   className="flex items-center justify-center gap-1.5 rounded-lg bg-sky-500 px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold text-white hover:bg-sky-600 transition disabled:opacity-50"
//                 >
//                   {type === "new" ? (
//                     <LuSend size={13} />
//                   ) : (
//                     <LuReply size={13} />
//                   )}

//                   {type === "new" ? "Comment" : "Reply"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CommentReplyInput;

import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import {
  LuLoaderCircle,
  LuReply,
  LuSend,
  LuWandSparkles,
} from "react-icons/lu";
import { useState } from "react";
import CharAvatar from "../CharAvatar";

const CommentReplyInput = ({
  user,
  authorName,
  content,
  handleAddReply,
  handleCancelReply,
  disableAutoGen,
  type = "reply",
}) => {
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const generateReply = async () => {
    if (loading || submitting) return;

    setLoading(true);

    try {
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_COMMENT_REPLY,
        {
          author: { name: authorName },
          content,
        },
      );

      const generatedReply = aiResponse.data;

      if (generatedReply?.length > 0) {
        setReplyText(generatedReply);
      }
    } catch (error) {
      console.error("Failed to generate reply:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!replyText.trim() || loading || submitting) return;

    try {
      setSubmitting(true);

      await handleAddReply(replyText.trim());

      setReplyText("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (loading || submitting) return;

    setReplyText("");
    handleCancelReply?.();
  };

  const isBusy = loading || submitting;

  return (
    <div className="w-full">
      <div className="flex items-start gap-2.5 sm:gap-3">
        {/* Avatar */}
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt={user?.name}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-gray-200 flex-shrink-0"
          />
        ) : (
          <CharAvatar
            fullName={user?.name || "User"}
            width="w-8"
            height="h-8"
            style="text-xs sm:w-9 sm:h-9 sm:text-sm border border-gray-200"
          />
        )}

        <div className="flex-1 min-w-0">
          <div className="rounded-sm border border-gray-200 bg-white overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 px-3 sm:px-4 pt-3">
              <span className="text-[11px] sm:text-xs font-medium text-gray-500 truncate">
                {type === "new"
                  ? `Comment as @${authorName}`
                  : `Replying to @${authorName}`}
              </span>

              {!disableAutoGen && (
                <button
                  type="button"
                  onClick={generateReply}
                  disabled={isBusy}
                  className="flex items-center gap-1.5 rounded-sm border border-sky-200 bg-sky-50 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-sky-600 hover:bg-sky-500 hover:text-white transition disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0"
                >
                  {loading ? (
                    <LuLoaderCircle className="animate-spin" size={12} />
                  ) : (
                    <LuWandSparkles size={12} />
                  )}

                  {loading ? "Generating..." : "AI Reply"}
                </button>
              )}
            </div>

            {/* Input */}
            <div className="px-3 sm:px-4 py-2">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={
                  type === "new" ? "Share your thoughts..." : "Write a reply..."
                }
                rows={3}
                disabled={isBusy}
                className="w-full resize-none border-0 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 disabled:opacity-60"
              />
            </div>

            {/* Footer */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2 px-3 sm:px-4 py-2.5 border-t border-gray-100 bg-gray-50/70">
              <span className="hidden sm:block text-[10px] text-gray-400">
                Be respectful and keep the discussion constructive.
              </span>

              <div className="flex justify-end gap-2">
                {/* Cancel */}
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isBusy}
                  className="rounded-sm border border-gray-300 bg-white px-3 py-1.5 text-[11px] sm:text-xs font-medium text-gray-600 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>

                {/* Submit */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!replyText.trim() || isBusy}
                  className={`flex items-center justify-center gap-1.5 rounded-sm px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold transition ${
                    !replyText.trim() || isBusy
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-sky-500 text-white hover:bg-sky-600"
                  }`}
                >
                  {submitting ? (
                    <>
                      <LuLoaderCircle size={13} className="animate-spin" />
                      {type === "new" ? "Commenting..." : "Replying..."}
                    </>
                  ) : (
                    <>
                      {type === "new" ? (
                        <LuSend size={13} />
                      ) : (
                        <LuReply size={13} />
                      )}

                      {type === "new" ? "Comment" : "Reply"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentReplyInput;
