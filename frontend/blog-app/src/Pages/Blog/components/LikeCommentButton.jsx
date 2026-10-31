// import { useEffect, useState } from "react";
// import { LuMessageCircle, LuThumbsUp } from "react-icons/lu";
// import clsx from "clsx";

// import axiosInstance from "../../../utils/axiosInstance";
// import { API_PATHS } from "../../../utils/apiPaths";

// const LikeCommentButton = ({ postId, likes, comments, user }) => {
//   const [postLikes, setPostLikes] = useState(likes || 0);
//   const [liked, setLiked] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // ============================================================
//   // CHECK LIKE STATUS
//   // ============================================================

//   useEffect(() => {
//     const checkLikeStatus = async () => {
//       if (!postId || !user) {
//         setLiked(false);
//         return;
//       }

//       try {
//         const response = await axiosInstance.get(
//           API_PATHS.POSTS.CHECK_LIKE(postId),
//         );

//         setLiked(response.data.liked);
//       } catch (error) {
//         console.error("Error checking like status:", error);
//       }
//     };

//     checkLikeStatus();
//   }, [postId, user]);

//   // ============================================================
//   // LIKE / UNLIKE
//   // ============================================================

//   const handleLikeClick = async () => {
//     if (!postId || isLoading) return;

//     // ----------------------------------------------------------
//     // USER NOT LOGGED IN
//     // ----------------------------------------------------------

//     if (!user) {
//       return;
//     }

//     try {
//       setIsLoading(true);

//       // ========================================================
//       // UNLIKE
//       // ========================================================

//       if (liked) {
//         const response = await axiosInstance.delete(
//           API_PATHS.POSTS.UNLIKE(postId),
//         );

//         if (response.data.counted) {
//           setPostLikes(response.data.totalLikes);
//           setLiked(false);
//         }

//         return;
//       }

//       // ========================================================
//       // LIKE
//       // ========================================================

//       const response = await axiosInstance.post(API_PATHS.POSTS.LIKE(postId));

//       if (response.data.counted) {
//         setPostLikes(response.data.totalClaps);
//         setLiked(true);
//       }
//     } catch (error) {
//       console.error("Error updating like:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ============================================================
//   // SCROLL TO COMMENTS
//   // ============================================================

//   const handleCommentClick = () => {
//     const commentsSection = document.getElementById("comments-section");

//     if (commentsSection) {
//       commentsSection.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   };

//   return (
//     <div
//       className="
//         fixed
//         bottom-5
//         left-5
//         z-40
//         sm:bottom-6
//         sm:left-6
//       "
//     >
//       <div
//         className="
//           flex
//           items-center
//           gap-1
//           rounded-full
//           border
//           border-gray-200
//           bg-white/95
//           px-2
//           py-1.5
//           shadow-[0_8px_30px_rgba(0,0,0,0.10)]
//           backdrop-blur-md
//         "
//       >
//         {/* ================================================= */}
//         {/* LIKE BUTTON */}
//         {/* ================================================= */}

//         <button
//           type="button"
//           onClick={handleLikeClick}
//           disabled={isLoading}
//           aria-label={liked ? "Unlike post" : "Like post"}
//           className={clsx(
//             "group flex items-center gap-2 rounded-full px-4 py-2",
//             "text-sm font-medium transition-all duration-200",
//             "cursor-pointer disabled:cursor-not-allowed",
//             liked
//               ? "bg-sky-50 text-sky-600"
//               : "text-gray-600 hover:bg-gray-50 hover:text-sky-600",
//           )}
//         >
//           <LuThumbsUp
//             size={18}
//             className={clsx(
//               "transition-all duration-200",
//               liked && "fill-current",
//               !liked && "group-hover:scale-110",
//             )}
//           />

//           <span>{postLikes}</span>
//         </button>

//         {/* ================================================= */}
//         {/* DIVIDER */}
//         {/* ================================================= */}

//         <div className="h-6 w-px bg-gray-200" />

//         {/* ================================================= */}
//         {/* COMMENT BUTTON */}
//         {/* ================================================= */}

//         <button
//           type="button"
//           onClick={handleCommentClick}
//           aria-label="View comments"
//           className="
//             group
//             flex
//             items-center
//             gap-2
//             rounded-full
//             px-4
//             py-2
//             text-sm
//             font-medium
//             text-gray-600
//             transition-all
//             duration-200
//             hover:bg-gray-50
//             hover:text-sky-600
//             active:scale-95
//             cursor-pointer
//           "
//         >
//           <LuMessageCircle
//             size={18}
//             className="transition-transform duration-200 group-hover:scale-110"
//           />

//           <span>{comments || 0}</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LikeCommentButton;

import { useEffect, useState } from "react";
import { LuMessageCircle, LuThumbsUp } from "react-icons/lu";
import clsx from "clsx";

import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";

const LikeCommentButton = ({
  postId,
  likes,
  comments,
  user,
  onCommentClick,
}) => {
  const [postLikes, setPostLikes] = useState(likes || 0);
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ============================================================
  // CHECK LIKE STATUS
  // ============================================================

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (!postId || !user) {
        setLiked(false);
        return;
      }

      try {
        const response = await axiosInstance.get(
          API_PATHS.POSTS.CHECK_LIKE(postId),
        );

        setLiked(response.data.liked);
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };

    checkLikeStatus();
  }, [postId, user]);

  // ============================================================
  // LIKE / UNLIKE
  // ============================================================

  const handleLikeClick = async () => {
    if (!postId || isLoading || !user) return;

    try {
      setIsLoading(true);

      // ========================================================
      // UNLIKE
      // ========================================================

      if (liked) {
        const response = await axiosInstance.delete(
          API_PATHS.POSTS.UNLIKE(postId),
        );

        if (response.data.counted) {
          setPostLikes(response.data.totalLikes);
          setLiked(false);
        }

        return;
      }

      // ========================================================
      // LIKE
      // ========================================================

      const response = await axiosInstance.post(API_PATHS.POSTS.LIKE(postId));

      if (response.data.counted) {
        setPostLikes(response.data.totalClaps);
        setLiked(true);
      }
    } catch (error) {
      console.error("Error updating like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================
  // COMMENT
  // ============================================================

  const handleCommentClick = () => {
    if (onCommentClick) {
      onCommentClick();
    }
  };

  return (
    <div
      className="
        fixed
        
        bottom-5
        left-5
        z-40
        sm:bottom-6
        sm:left-6
      "
    >
      <div
        className="

          flex
          items-center
          gap-1
          rounded-full
          border
          border-gray-300
          bg-white/95
          px-2
          py-1.5
          shadow-[0_8px_30px_rgba(0,0,0,0.10)]
          backdrop-blur-md
        "
      >
        {/* ================================================= */}
        {/* LIKE BUTTON */}
        {/* ================================================= */}

        <button
          type="button"
          onClick={handleLikeClick}
          disabled={isLoading}
          aria-label={liked ? "Unlike post" : "Like post"}
          className={clsx(
            "group flex items-center gap-2 rounded-full px-4 py-2",
            "text-sm font-medium transition-all duration-200",
            "cursor-pointer disabled:cursor-not-allowed",
            liked
              ? "bg-sky-50 text-sky-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-sky-600",
          )}
        >
          <LuThumbsUp
            size={18}
            className={clsx(
              "transition-all duration-200",
              liked && "fill-current",
              !liked && "group-hover:scale-110",
            )}
          />

          <span>{postLikes}</span>
        </button>

        {/* ================================================= */}
        {/* DIVIDER */}
        {/* ================================================= */}

        <div className="h-6 w-px bg-gray-200" />

        {/* ================================================= */}
        {/* COMMENT BUTTON */}
        {/* ================================================= */}

        <button
          type="button"
          onClick={handleCommentClick}
          aria-label="Add comment"
          className="
            group
            flex
            items-center
            gap-2
            rounded-full
            px-4
            py-2
            text-sm
            font-medium
            text-gray-600
            transition-all
            duration-200
            hover:bg-gray-50
            hover:text-sky-600
            active:scale-95
            cursor-pointer
          "
        >
          <LuMessageCircle
            size={18}
            className="transition-transform duration-200 group-hover:scale-110"
          />

          <span>{comments || 0}</span>
        </button>
      </div>
    </div>
  );
};

export default LikeCommentButton;
