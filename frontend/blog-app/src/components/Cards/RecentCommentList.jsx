import moment from "moment";
import { LuDot } from "react-icons/lu";

const DEFAULT_AVATAR = "http://localhost:8000/uploads/avatar/avatar.svg";

const RecentCommentList = ({ comments }) => {
  return (
    <div className="mt-4">
      <ul className="space-y-4">
        {comments?.slice(0, 10)?.map((comment) => (
          <li
            key={comment._id}
            className="group flex gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all duration-300"
          >
            {/* Avatar */}
            <img
              src={comment.author?.profileImageUrl || DEFAULT_AVATAR}
              alt={comment.author?.name || comment.authorName || "Deleted User"}
              className={`w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0 ${
                !comment.author ? "grayscale opacity-60" : ""
              }`}
            />

            <div className="flex-1 min-w-0">
              {/* User + Date */}
              <div className="flex flex-wrap items-center gap-1">
                <p
                  className={`font-semibold text-sm ${
                    comment.author ? "text-gray-700" : "text-gray-400 italic"
                  }`}
                >
                  @
                  {comment.author?.name || comment.authorName || "Deleted User"}
                </p>

                <LuDot className="text-gray-400" size={18} />

                <span className="text-xs text-gray-400 font-medium">
                  {moment(comment.updatedAt).format("Do MMM YYYY")}
                </span>
              </div>

              {/* Comment Content */}
              <p
                className={`text-sm mt-2 leading-relaxed ${
                  comment.author ? "text-gray-700" : "text-gray-500 italic"
                }`}
              >
                {comment.content}
              </p>

              {/* Post Preview */}
              <div className="mt-4 flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-2">
                <img
                  src={comment.post?.coverImageUrl}
                  alt={comment.post?.title}
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                />

                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">
                    Commented on
                  </p>

                  <p className="text-sm font-medium text-gray-700 line-clamp-1">
                    {comment.post?.title}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentCommentList;
