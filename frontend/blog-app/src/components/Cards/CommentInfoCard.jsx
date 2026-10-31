import { useContext, useState } from "react";
import {
  LuChevronDown,
  LuDot,
  LuReply,
  LuPencil,
  LuTrash2,
  LuMessageSquareX,
} from "react-icons/lu";
import { UserContext } from "../../context/userContext";
import moment from "moment";
import CharAvatar from "./CharAvatar";
import CommentReplyInput from "../Inputs/CommentReplyInput";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";

const CommentInfoCard = ({
  onDeleteComment,
  onDeleteThread,
  commentId,
  isSearchMatch = false,
  authorId,
  authorName,
  authorPhoto,
  deletedBy,
  matchedCommentId,
  content,
  updatedOn,
  post,
  replies,
  isDeleted,
  getAllComments,
  isSubReply = false,
}) => {
  const { user } = useContext(UserContext);

  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showSubReplies, setShowSubReplies] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(content);

  // --------------------------------------------------
  // REPLY
  // --------------------------------------------------

  const handleCancelReply = () => {
    setReplyText("");
    setShowReplyForm(false);
  };

  const handleAddReply = async (content) => {
    if (!content?.trim()) {
      toast.error("Reply cannot be empty.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.COMMENT.ADD(post._id), {
        content: content.trim(),
        parentComment: commentId,
      });

      toast.success("Reply added successfully.");

      setReplyText("");
      setShowReplyForm(false);

      getAllComments();
    } catch (error) {
      console.error("Error adding reply:", error);

      toast.error(error?.response?.data?.message || "Failed to add reply.");
    }
  };

  // --------------------------------------------------
  // EDIT
  // --------------------------------------------------

  const handleCancelEdit = () => {
    setEditText(content);
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    if (!editText.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }

    try {
      await axiosInstance.put(API_PATHS.COMMENT.EDIT_MY_COMMENT(commentId), {
        content: editText,
      });

      toast.success("Comment updated successfully.");

      setIsEditing(false);

      getAllComments();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Failed to update comment.",
      );
    }
  };

  // --------------------------------------------------
  // PERMISSIONS
  // --------------------------------------------------

  const canEdit =
    user?.role === "admin" && user?._id === authorId && !isDeleted;

  // --------------------------------------------------
  // SEARCH MATCH
  // --------------------------------------------------

  const isMatchedComment = isSearchMatch || commentId === matchedCommentId;

  // ==================================================
  // COMPACT REPLY
  // ==================================================

  if (isSubReply) {
    return (
      <div
        className={`
          relative
          rounded-sm
          p-1
          transition-colors
          ${
            isMatchedComment
              ? "bg-black-50 ring-1 ring-black-400"
              : "hover:bg-gray-50"
          }
        `}
      >
        <div className="flex min-w-0 gap-2.5">
          {/* AVATAR */}
          {authorPhoto ? (
            <img
              src={authorPhoto}
              alt={authorName}
              className="
                h-7
                w-7
                shrink-0
                rounded-full
                object-cover
                ring-1
                ring-gray-100
                sm:h-8
                sm:w-8
              "
            />
          ) : (
            <CharAvatar
              fullName={authorName || ""}
              width="w-7"
              height="h-7"
              style="
                text-xs
                ring-1
                ring-gray-100
                sm:w-8
                sm:h-8
              "
            />
          )}

          {/* CONTENT */}
          <div className="min-w-0 flex-1">
            {/* HEADER */}
            <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1">
              <span className="max-w-full truncate text-xs font-semibold text-gray-800">
                @{authorName}
              </span>

              <LuDot className="h-3 w-3 shrink-0 text-gray-300" />

              <span className="text-[10px] text-gray-400">{updatedOn}</span>

              {isMatchedComment && (
                <span className="rounded-sm bg-sky-100 px-1.5 py-0.5 text-[9px] font-semibold text-sky-700">
                  Match
                </span>
              )}
            </div>

            {/* CONTENT */}
            {isDeleted ? (
              <div className="mt-1.5 rounded-md border border-red-100 bg-red-50 px-2 py-1.5">
                <span className="text-[9px] font-semibold uppercase tracking-wide text-red-600">
                  {deletedBy === "admin"
                    ? "Removed by moderator"
                    : "Deleted by user"}
                </span>

                <p className="mt-0.5 break-words text-xs italic leading-5 text-gray-500">
                  {content}
                </p>
              </div>
            ) : isEditing ? (
              <div className="mt-2">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={3}
                  className="
                    w-full
                    resize-y
                    rounded-sm
                    border
                    border-gray-300
                    bg-white
                    p-2
                    text-xs
                    leading-5
                    outline-none
                    transition
                    focus:border-sky-400
                    focus:ring-2
                    focus:ring-sky-50
                  "
                />

                <div className="mt-2 flex flex-wrap gap-1.5">
                  <button
                    onClick={handleSaveEdit}
                    className="
                      rounded-sm
                      bg-sky-600
                      px-2.5
                      py-1
                      text-[10px]
                      font-semibold
                      text-white
                      transition
                      hover:bg-sky-700
                    "
                  >
                    Save
                  </button>

                  <button
                    onClick={handleCancelEdit}
                    className="
                      rounded-sm
                      border
                      border-gray-200
                      bg-white
                      px-2.5
                      py-1
                      text-[10px]
                      font-semibold
                      text-gray-600
                      transition
                      hover:bg-gray-50
                    "
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-1 break-words text-xs leading-5 text-gray-600">
                {content}
              </p>
            )}

            {/* ACTIONS */}
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px]">
              {!isDeleted && (
                <button
                  onClick={() => setShowReplyForm((previous) => !previous)}
                  className="
                    inline-flex
                    items-center
                    gap-1
                    font-medium
                    text-gray-400
                    transition
                    hover:text-sky-600
                  "
                >
                  <LuReply size={12} />
                  Reply
                </button>
              )}

              {replies?.length > 0 && (
                <button
                  onClick={() => setShowSubReplies((previous) => !previous)}
                  className="
                    inline-flex
                    items-center
                    gap-1
                    font-medium
                    text-gray-400
                    transition
                    hover:text-sky-600
                  "
                >
                  {showSubReplies ? "Hide" : "Show"} {replies.length}
                  <LuChevronDown
                    size={11}
                    className={`transition-transform ${
                      showSubReplies ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}

              {!isDeleted && canEdit && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="
                    inline-flex
                    items-center
                    gap-1
                    font-medium
                    text-sky-500
                    transition
                    hover:text-sky-700
                  "
                >
                  <LuPencil size={11} />
                  Edit
                </button>
              )}

              {!isDeleted && (
                <>
                  <button
                    onClick={() => onDeleteComment(commentId)}
                    className="
                      inline-flex
                      items-center
                      gap-1
                      font-medium
                      text-amber-500
                      transition
                      hover:text-amber-700
                    "
                  >
                    <LuTrash2 size={11} />
                    Delete
                  </button>

                  <button
                    onClick={() => onDeleteThread(commentId)}
                    className="
                      inline-flex
                      items-center
                      gap-1
                      font-medium
                      text-red-500
                      transition
                      hover:text-red-700
                    "
                  >
                    <LuMessageSquareX size={11} />
                    Thread
                  </button>
                </>
              )}
            </div>

            {/* REPLY INPUT */}
            {showReplyForm && !isDeleted && (
              <div className="mt-2">
                <CommentReplyInput
                  user={user}
                  authorName={authorName}
                  content={content}
                  replyText={replyText}
                  setReplyText={setReplyText}
                  handleAddReply={handleAddReply}
                  handleCancelReply={handleCancelReply}
                />
              </div>
            )}
          </div>
        </div>

        {/* NESTED REPLIES */}
        {showSubReplies && replies?.length > 0 && (
          <div className="mt-2 ml-4 border-l border-gray-200 pl-3 sm:ml-5">
            {replies.map((comment) => (
              <CommentInfoCard
                key={comment._id}
                commentId={comment._id}
                authorId={comment.author?._id}
                authorName={comment.author?.name || "Deleted User"}
                authorPhoto={comment.author?.profileImageUrl}
                content={comment.content}
                updatedOn={
                  comment.updatedAt
                    ? moment(comment.updatedAt).format("Do MMM YYYY")
                    : "-"
                }
                post={comment.post || post}
                replies={comment.replies || []}
                isDeleted={comment.isDeleted}
                deletedBy={comment.deletedBy}
                getAllComments={getAllComments}
                onDeleteComment={onDeleteComment}
                onDeleteThread={onDeleteThread}
                isSubReply={true}
                matchedCommentId={matchedCommentId}
                isSearchMatch={comment._id === matchedCommentId}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // ==================================================
  // ROOT COMMENT
  // ==================================================

  return (
    <div
      className={`
        overflow-hidden
        rounded-sm
        border
        bg-white
       
        transition-all
        ${
          isMatchedComment
            ? "border-sky-300 bg-sky-50/20 ring-2 ring-sky-100"
            : "border-gray-200/80 hover:border-gray-300"
        }
      `}
    >
      <div className="grid grid-cols-12 gap-3 p-3.5 sm:gap-4 sm:p-4">
        {/* ==================================================
            COMMENT CONTENT
        ================================================== */}

        <div className="col-span-12 min-w-0 lg:col-span-8">
          <div className="flex min-w-0 gap-3">
            {/* PROFILE AVATAR */}
            {authorPhoto ? (
              <img
                src={authorPhoto}
                alt={authorName}
                className="
                  h-9
                  w-9
                  shrink-0
                  rounded-full
                  object-cover
                  ring-1
                  ring-gray-100
                  sm:h-10
                  sm:w-10
                "
              />
            ) : (
              <CharAvatar
                fullName={authorName || ""}
                width="w-9"
                height="h-9"
                style="
                  text-sm
                  ring-1
                  ring-gray-100
                  sm:w-10
                  sm:h-10
                "
              />
            )}

            {/* MAIN */}
            <div className="min-w-0 flex-1">
              {/* AUTHOR + DATE */}
              <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1">
                <h3 className="max-w-full truncate text-xs font-semibold text-gray-800 sm:text-sm">
                  @{authorName}
                </h3>

                <LuDot className="h-3.5 w-3.5 shrink-0 text-gray-300" />

                <span className="text-[10px] text-gray-400 sm:text-xs">
                  {updatedOn}
                </span>

                {isMatchedComment && (
                  <span className="rounded-full bg-sky-100 px-1.5 py-0.5 text-[9px] font-semibold text-sky-700 sm:px-2 sm:py-0.5 sm:text-[10px]">
                    Search Match
                  </span>
                )}
              </div>

              {/* COMMENT */}
              {isDeleted ? (
                <div className="mt-2 rounded-lg border border-red-100 bg-red-50 px-2.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

                    <span className="text-[9px] font-semibold uppercase tracking-wide text-red-600">
                      {deletedBy === "admin"
                        ? "Removed by moderator"
                        : "Deleted by user"}
                    </span>
                  </div>

                  <p className="mt-1 break-words text-xs italic leading-5 text-gray-500">
                    {content}
                  </p>
                </div>
              ) : isEditing ? (
                <div className="mt-2.5">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={3}
                    className="
                      w-full
                      resize-y
                      rounded-lg
                      border
                      border-gray-300
                      bg-white
                      p-2.5
                      text-xs
                      leading-5
                      text-gray-700
                      outline-none
                      transition
                      focus:border-sky-400
                      focus:ring-2
                      focus:ring-sky-50
                      sm:text-sm
                    "
                  />

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <button
                      onClick={handleSaveEdit}
                      className="
                        rounded-md
                        bg-sky-600
                        px-3
                        py-1.5
                        text-[10px]
                        font-semibold
                        text-white
                        transition
                        hover:bg-sky-700
                        sm:text-xs
                      "
                    >
                      Save Changes
                    </button>

                    <button
                      onClick={handleCancelEdit}
                      className="
                        rounded-md
                        border
                        border-gray-200
                        bg-white
                        px-3
                        py-1.5
                        text-[10px]
                        font-semibold
                        text-gray-600
                        transition
                        hover:bg-gray-50
                        sm:text-xs
                      "
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-1.5 break-words text-xs leading-5 text-gray-600 sm:text-sm sm:leading-6">
                  {content}
                </p>
              )}

              {/* ACTION BAR */}
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                {/* REPLY */}
                {!isDeleted && (
                  <button
                    onClick={() => setShowReplyForm((previous) => !previous)}
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-md
                      px-1.5
                      py-1
                      text-[10px]
                      font-medium
                      text-gray-500
                      transition
                      hover:bg-sky-50
                      hover:text-sky-600
                      sm:text-xs
                    "
                  >
                    <LuReply size={13} />
                    Reply
                  </button>
                )}

                {/* SHOW REPLIES */}
                {replies?.length > 0 && (
                  <button
                    onClick={() => setShowSubReplies((previous) => !previous)}
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-md
                      px-1.5
                      py-1
                      text-[10px]
                      font-medium
                      text-gray-500
                      transition
                      hover:bg-sky-50
                      hover:text-sky-600
                      sm:text-xs
                    "
                  >
                    <span>
                      {showSubReplies ? "Hide Replies" : "Show Replies"}
                    </span>

                    <span className="rounded-full bg-sky-50 px-1.5 py-0.5 text-[9px] font-semibold text-sky-600">
                      {replies.length}
                    </span>

                    <LuChevronDown
                      size={13}
                      className={`transition-transform ${
                        showSubReplies ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}

                {/* ADMIN ACTIONS */}
                {!isDeleted && (
                  <div
                    className="
                    flex
                    flex-wrap
                    items-center
                    gap-x-2.5
                    gap-y-1
                    border-l
                    border-gray-200
                    pl-2.5
                  "
                  >
                    {canEdit && !isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="
                          inline-flex
                          items-center
                          gap-1
                          text-[10px]
                          font-medium
                          text-sky-600
                          transition
                          hover:text-sky-700
                          sm:text-xs
                        "
                      >
                        <LuPencil size={12} />
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => onDeleteComment(commentId)}
                      className="
                        inline-flex
                        items-center
                        gap-1
                        text-[10px]
                        font-medium
                        text-amber-600
                        transition
                        hover:text-amber-700
                        sm:text-xs
                      "
                    >
                      <LuTrash2 size={12} />
                      Delete
                    </button>

                    <button
                      onClick={() => onDeleteThread(commentId)}
                      className="
                        inline-flex
                        items-center
                        gap-1
                        text-[10px]
                        font-semibold
                        text-red-600
                        transition
                        hover:text-red-700
                        sm:text-xs
                      "
                    >
                      <LuMessageSquareX size={12} />
                      Delete Thread
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            POST PREVIEW
        ================================================== */}

        <div className="col-span-12 min-w-0 lg:col-span-4">
          {post && (
            <div
              className="
              flex
              h-full
              min-w-0
              items-center
              gap-2.5
              border
              border-gray-100
              bg-gray-50/50
              p-2
              transition
              hover:border-gray-200
              hover:bg-gray-50
            "
            >
              {post?.coverImageUrl && (
                <img
                  src={post.coverImageUrl}
                  alt={post?.title || "Post cover"}
                  className="
                    h-12
                    w-16
                    shrink-0
                    
                    object-cover
                    sm:h-14
                    sm:w-20
                  "
                />
              )}

              <div className="min-w-0 flex-1">
                <span
                  className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-gray-400
                "
                >
                  Discussion on
                </span>

                <p
                  className="
                  mt-0.5
                  line-clamp-2
                  text-[11px]
                  font-semibold
                  leading-4
                  text-gray-700
                  sm:text-xs
                "
                >
                  {post?.title || "Untitled Post"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ==================================================
          REPLY INPUT
      ================================================== */}

      {showReplyForm && !isDeleted && (
        <div
          className="
          border-t
          border-gray-100
          bg-gray-50/50
          px-3.5
          py-3
          sm:px-4
        "
        >
          <CommentReplyInput
            user={user}
            authorName={authorName}
            content={content}
            replyText={replyText}
            setReplyText={setReplyText}
            handleAddReply={handleAddReply}
            handleCancelReply={handleCancelReply}
          />
        </div>
      )}

      {/* ==================================================
          REPLIES
      ================================================== */}

      {showSubReplies && replies?.length > 0 && (
        <div
          className="
          border-t
          border-gray-100
          bg-gray-50/60
          px-3
          py-2.5
          sm:px-4
          sm:py-3
        "
        >
          <div className="mb-2 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-sky-500" />

            <span
              className="
              text-[10px]
              font-semibold
              uppercase
              tracking-wide
              text-gray-400
            "
            >
              {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
            </span>
          </div>

          <div className="border-l border-gray-200 pl-2.5 sm:pl-3">
            {replies.map((comment) => (
              <CommentInfoCard
                key={comment._id}
                commentId={comment._id}
                authorId={comment.author?._id}
                authorName={comment.author?.name || "Deleted User"}
                authorPhoto={comment.author?.profileImageUrl}
                content={comment.content}
                updatedOn={
                  comment.updatedAt
                    ? moment(comment.updatedAt).format("Do MMM YYYY")
                    : "-"
                }
                post={comment.post || post}
                replies={comment.replies || []}
                isDeleted={comment.isDeleted}
                deletedBy={comment.deletedBy}
                getAllComments={getAllComments}
                onDeleteComment={onDeleteComment}
                onDeleteThread={onDeleteThread}
                isSubReply={true}
                matchedCommentId={matchedCommentId}
                isSearchMatch={comment._id === matchedCommentId}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentInfoCard;
