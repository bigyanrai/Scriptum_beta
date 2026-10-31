import moment from "moment";
import { LuMessageSquareWarning } from "react-icons/lu";

const RecentNegativeComments = ({ comments = [] }) => {
  return (
    <div className="bg-white p-6 md:p-7 rounded-3xl w-full shadow-xs border border-gray-200/70 hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      <div className="mb-5">
        <h5 className="text-lg font-semibold text-gray-800">
          Recent Negative Comments
        </h5>

        <p className="text-sm text-gray-400 mt-1">
          Latest comments classified as negative by AI
        </p>
      </div>

      {!comments.length ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <LuMessageSquareWarning className="text-6xl text-gray-300 mb-4" />

          <p className="font-medium text-gray-600">
            No negative comments found
          </p>

          <p className="text-sm text-gray-400 mt-2">
            Everything looks positive 🎉
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="rounded-2xl border border-red-100 bg-red-50 p-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={comment.author?.profileImageUrl}
                  alt={comment.author?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-800 truncate">
                    {comment.author?.name}
                  </h4>

                  <p className="text-xs text-gray-500">
                    {moment(comment.createdAt).fromNow()}
                  </p>
                </div>

                <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600 flex-shrink-0">
                  Negative
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-700 break-words">
                {comment.content}
              </p>

              <p className="mt-2 text-xs text-gray-500 truncate">
                Post: {comment.post?.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentNegativeComments;
