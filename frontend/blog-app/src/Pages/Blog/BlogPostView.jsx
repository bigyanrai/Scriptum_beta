// import {
//   LuChevronLeft,
//   LuCircleAlert,
//   LuDot,
//   LuSparkles,
//   LuBookmark,
//   LuBookmarkCheck,
//   LuSearch,
//   LuX,
//   LuSend,
// } from "react-icons/lu";

// import toast from "react-hot-toast";

// import { useNavigate, useParams } from "react-router-dom";

// import { useContext, useEffect, useState } from "react";

// import { UserContext } from "../../context/userContext";

// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";

// import moment from "moment";

// import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
// import MarkdownContent from "./components/MarkdownContent";
// import SharePost from "./components/SharePost";
// import { sanitizeMarkdown } from "../../utils/helper";

// import CommentInfoCard from "./components/CommentInfoCard";
// import CommentReplyInput from "../../components/Inputs/CommentReplyInput";

// import SkeletonLoader from "../../components/Loader/SkeletonLoader";
// import Drawer from "../../components/Drawer";
// import LikeCommentButton from "./components/LikeCommentButton";
// import BlogPostViewSkeleton from "../../components/Loader/BlogPostViewSkeleton";

// import { AnimatePresence, motion } from "framer-motion";

// import RecentPosts from "./components/RecentPostsRename";
// import RecentPostSkeleton from "../../components/Loader/RecentPostSkeleton";

// import BackButton from "../../components/BackButton";

// import NotFound from "../NotFound";

// const BlogPostView = () => {
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

//   const [isBookmarked, setIsBookmarked] = useState(false);

//   const { slug } = useParams();

//   const navigate = useNavigate();

//   const [blogPostData, setBlogPostData] = useState(null);

//   const [comments, setComments] = useState([]);

//   const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

//   const { user, setOpenAuthForm } = useContext(UserContext);

//   const [showReplyForm, setShowReplyForm] = useState(false);

//   // ============================================================
//   // SUMMARY STATE
//   // ============================================================

//   const [openSummarizeDrawer, setOpenSummarizeDrawer] = useState(false);

//   const [summaryContent, setSummaryContent] = useState(null);

//   const [isSummaryLoading, setIsSummaryLoading] = useState(false);

//   const [errorMsg, setErrorMsg] = useState("");

//   // ============================================================
//   // POST LOADING STATE
//   // ============================================================

//   const [isPostLoading, setIsPostLoading] = useState(false);

//   // ============================================================
//   // 404 STATE
//   // ============================================================

//   const [notFound, setNotFound] = useState(false);

//   // ============================================================
//   // CHECK BOOKMARK STATUS
//   // ============================================================

//   const fetchBookmarkStatus = async (postId) => {
//     if (!user || !postId) {
//       setIsBookmarked(false);
//       return;
//     }

//     try {
//       const response = await axiosInstance.get(
//         API_PATHS.POSTS.CHECK_BOOKMARK(postId),
//       );

//       setIsBookmarked(response.data.bookmarked);
//     } catch (error) {
//       console.error("Error checking bookmark status:", error);
//     }
//   };

//   // ============================================================
//   // GET POST DATA BY SLUG
//   // ============================================================

//   const fetchPostDetailsBySlug = async () => {
//     try {
//       setIsPostLoading(true);

//       // Reset previous post / 404 state when slug changes
//       setBlogPostData(null);
//       setNotFound(false);
//       setComments([]);
//       setIsBookmarked(false);

//       // Close summary drawer when changing posts
//       setOpenSummarizeDrawer(false);
//       setSummaryContent(null);
//       setErrorMsg("");
//       setIsSummaryLoading(false);

//       const response = await axiosInstance.get(
//         API_PATHS.POSTS.GET_BY_SLUG(slug),
//       );

//       if (response.data) {
//         const data = response.data;

//         setBlogPostData(data);

//         await fetchBookmarkStatus(data._id);

//         fetchCommentByPostId(data._id);
//       } else {
//         setNotFound(true);
//       }
//     } catch (error) {
//       console.error("Error fetching post:", error);

//       // ========================================================
//       // POST NOT FOUND
//       // ========================================================

//       if (error.response?.status === 404) {
//         setNotFound(true);
//       }
//     } finally {
//       setIsPostLoading(false);
//     }
//   };

//   // ============================================================
//   // GET COMMENTS
//   // ============================================================

//   const fetchCommentByPostId = async (postId) => {
//     try {
//       const response = await axiosInstance.get(
//         API_PATHS.COMMENT.GET_ALL_BY_POST(postId),
//       );

//       if (response.data) {
//         setComments(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//     }
//   };

//   // ============================================================
//   // GENERATE BLOG POST SUMMARY
//   // ============================================================

//   const generateBlogPostSummary = async () => {
//     if (!blogPostData?.content) {
//       toast.error("Post content is not available");
//       return;
//     }

//     try {
//       // Open drawer immediately
//       setOpenSummarizeDrawer(true);

//       // Clear previous summary/error
//       setSummaryContent(null);
//       setErrorMsg("");

//       // Only the summary is loading now.
//       // This will NOT trigger BlogPostViewSkeleton.
//       setIsSummaryLoading(true);

//       const response = await axiosInstance.post(
//         API_PATHS.AI.GENERATE_POST_SUMMARY,
//         {
//           content: blogPostData.content,
//         },
//       );

//       if (response.data) {
//         setSummaryContent(response.data);
//       }
//     } catch (error) {
//       console.error("Error generating summary:", error);

//       setSummaryContent(null);

//       setErrorMsg("Failed to generate summary, try again");
//     } finally {
//       setIsSummaryLoading(false);
//     }
//   };

//   // ============================================================
//   // INCREMENT VIEWS
//   // ============================================================

//   const incrementView = async (postId) => {
//     if (!postId) return;

//     try {
//       await axiosInstance.post(API_PATHS.POSTS.INCREMENT_VIEW(postId));
//     } catch (error) {
//       console.error("Error incrementing view:", error);
//     }
//   };

//   // ============================================================
//   // HANDLE POST VIEW
//   // ============================================================

//   useEffect(() => {
//     if (!blogPostData?._id) return;

//     const postId = blogPostData._id;

//     if (user) {
//       incrementView(postId);
//       return;
//     }

//     const key = `viewed_${postId}`;

//     if (!localStorage.getItem(key)) {
//       incrementView(postId);

//       localStorage.setItem(key, Date.now().toString());
//     }
//   }, [blogPostData?._id, user]);

//   // ============================================================
//   // CANCEL COMMENT
//   // ============================================================

//   const handleCancelReply = () => {
//     setShowReplyForm(false);
//   };

//   // ============================================================
//   // ADD COMMENT
//   // ============================================================

//   const handleAddReply = async (content) => {
//     try {
//       await axiosInstance.post(API_PATHS.COMMENT.ADD(blogPostData._id), {
//         content,
//         parentComment: "",
//       });

//       toast.success("Comment added successfully!");

//       setShowReplyForm(false);

//       fetchCommentByPostId(blogPostData._id);
//     } catch (error) {
//       console.error("Error adding comment:", error);

//       toast.error(error.response?.data?.message || "Failed to add comment");
//     }
//   };

//   const handleAddCommentClick = () => {
//     if (!user) {
//       setOpenAuthForm(true);
//       return;
//     }

//     setShowReplyForm(true);
//   };

//   // ============================================================
//   // BOOKMARK
//   // ============================================================

//   const handleBookmark = async () => {
//     if (!user) {
//       setOpenAuthForm(true);
//       return;
//     }

//     try {
//       if (isBookmarked) {
//         await axiosInstance.delete(
//           API_PATHS.POSTS.REMOVE_BOOKMARK(blogPostData._id),
//         );

//         setIsBookmarked(false);

//         toast.success("Bookmark removed");
//       } else {
//         await axiosInstance.post(API_PATHS.POSTS.BOOKMARK(blogPostData._id));

//         setIsBookmarked(true);

//         toast.success("Post bookmarked");
//       }
//     } catch (error) {
//       console.error(error);

//       toast.error("Something went wrong");
//     }
//   };

//   // ============================================================
//   // FETCH POST WHEN SLUG CHANGES
//   // ============================================================

//   useEffect(() => {
//     fetchPostDetailsBySlug();
//   }, [slug]);

//   // ============================================================
//   // DISABLE BACKGROUND SCROLLING
//   // ============================================================

//   useEffect(() => {
//     if (isImageViewerOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isImageViewerOpen]);

//   // ============================================================
//   // NOT FOUND
//   // ============================================================

//   if (notFound) {
//     return <NotFound />;
//   }

//   // ============================================================
//   // POST LOADING
//   // ============================================================

//   if (isPostLoading || !blogPostData) {
//     return (
//       <BlogLayout>
//         <BlogPostViewSkeleton />
//       </BlogLayout>
//     );
//   }

//   // ============================================================
//   // BLOG POST
//   // ============================================================

//   return (
//     <BlogLayout>
//       <BackButton />

//       <title>{blogPostData.title}</title>

//       <meta name="description" content={blogPostData.title} />

//       <meta name="og:title" content={blogPostData.title} />

//       <meta name="og:image" content={blogPostData.coverImageUrl} />

//       <meta name="og:type" content="article" />

//       <div className="px-1 mb-10">
//         <div className="w-full">
//           <div className="w-full">
//             {/* ================================================= */}
//             {/* TITLE */}
//             {/* ================================================= */}

//             <h1 className="text-lg md:text-xl font-bold mb-2 line-clamp-3">
//               {blogPostData.title}
//             </h1>

//             {/* ================================================= */}
//             {/* META */}
//             {/* ================================================= */}

//             <div className="flex items-center gap-1 flex-wrap mt-3 mb-5">
//               <span className="text-[13px] text-gray-500 font-medium">
//                 {moment(blogPostData.updatedAt || "").format("Do MMM YYYY")}
//               </span>

//               <LuDot className="text-xl text-gray-500" />

//               <div className="flex items-center flex-wrap gap-2">
//                 {blogPostData.tags?.slice(0, 3).map((tag, index) => (
//                   <button
//                     key={index}
//                     className="bg-sky-200/50 text-sky-800/80 text-xs font-medium px-3 py-0.5 rounded-full text-nowrap cursor-pointer"
//                     onClick={(e) => {
//                       e.stopPropagation();

//                       navigate(`/tags/${tag}`);
//                     }}
//                   >
//                     # {tag}
//                   </button>
//                 ))}
//               </div>

//               <LuDot className="text-xl text-gray-400" />

//               <button
//                 className="flex items-center gap-2 bg-linear-to-r from-sky-500 to-cyan-400 text-xs text-white font-medium px-3 py-0.5 rounded-full text-nowrap cursor-pointer hover:scale-[1.02] transition-all my-1"
//                 onClick={generateBlogPostSummary}
//                 disabled={isSummaryLoading}
//               >
//                 <LuSparkles />

//                 {isSummaryLoading
//                   ? "Generating summary..."
//                   : "Summarize this post"}
//               </button>
//             </div>

//             <div className="w-full md:w-[75%] mx-auto">
//               {/* ================================================= */}
//               {/* COVER IMAGE */}
//               {/* ================================================= */}

//               <div
//                 className="relative w-full h-72 sm:h-80 md:h-96 mb-6 cursor-zoom-in group"
//                 onClick={() => setIsImageViewerOpen(true)}
//               >
//                 <img
//                   src={blogPostData.coverImageUrl || ""}
//                   alt={blogPostData.title}
//                   className="w-full h-full object-cover rounded-md"
//                 />

//                 {/* Hover overlay */}

//                 <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-md">
//                   <div className="bg-black/60 text-white rounded-full p-3">
//                     <LuSearch size={28} />
//                   </div>
//                 </div>
//               </div>

//               {/* ================================================= */}
//               {/* CONTENT */}
//               {/* ================================================= */}

//               <MarkdownContent
//                 content={sanitizeMarkdown(blogPostData?.content || "")}
//               />

//               {/* ================================================= */}
//               {/* SHARE / BOOKMARK */}
//               {/* ================================================= */}

//               <div className="flex items-center justify-between gap-3 my-6">
//                 <SharePost title={blogPostData.title} />

//                 <button
//                   onClick={handleBookmark}
//                   className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
//                     isBookmarked
//                       ? "bg-sky-100 text-sky-700 border border-sky-200"
//                       : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
//                   }`}
//                 >
//                   {isBookmarked ? (
//                     <>
//                       <LuBookmarkCheck size={18} />
//                       Saved
//                     </>
//                   ) : (
//                     <>
//                       <LuBookmark size={18} />
//                       Save
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* ================================================= */}
//             {/* COMMENTS */}
//             {/* ================================================= */}

//             <div className="mt-8">
//               <div className="w-full mx-auto">
//                 {/* Comments Header */}

//                 <div className="flex items-center justify-between gap-3 mb-5 px-1">
//                   <div>
//                     <h4 className="text-lg sm:text-xl font-bold text-gray-900">
//                       Comments
//                     </h4>

//                     <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
//                       {comments?.length || 0}{" "}
//                       {comments?.length === 1 ? "comment" : "comments"}
//                     </p>
//                   </div>

//                   <button
//                     className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600 transition-all duration-200 cursor-pointer whitespace-nowrap"
//                     onClick={handleAddCommentClick}
//                   >
//                     <LuSend size={14} />
//                     Add Comment
//                   </button>
//                 </div>

//                 {/* New Comment Input */}

//                 {showReplyForm && (
//                   <div className="mb-6">
//                     <CommentReplyInput
//                       user={user}
//                       authorName={user.name}
//                       content=""
//                       handleAddReply={handleAddReply}
//                       handleCancelReply={handleCancelReply}
//                       disableAutoGen
//                       type="new"
//                     />
//                   </div>
//                 )}

//                 {/* Comments List */}

//                 {comments?.length > 0 ? (
//                   <div className="space-y-2">
//                     {comments.map((comment) => (
//                       <CommentInfoCard
//                         key={comment._id}
//                         commentId={comment._id}
//                         authorId={comment.author?._id}
//                         authorName={comment.author?.name || "Deleted User"}
//                         authorPhoto={comment.author?.profileImageUrl}
//                         content={comment.content}
//                         isDeleted={comment.isDeleted}
//                         deletedBy={comment.deletedBy}
//                         updatedOn={
//                           comment.updatedAt
//                             ? moment(comment.updatedAt).format("Do MMM YYYY")
//                             : "-"
//                         }
//                         post={comment.post}
//                         replies={comment.replies || []}
//                         getAllComments={() =>
//                           fetchCommentByPostId(blogPostData._id)
//                         }
//                         depth={0}
//                       />
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-10 text-center">
//                     <p className="text-sm font-medium text-gray-600">
//                       No comments yet
//                     </p>

//                     <p className="text-xs text-gray-400 mt-1">
//                       Be the first to start the discussion.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* ================================================= */}
//             {/* LIKE / COMMENT BUTTON */}
//             {/* ================================================= */}

//             <LikeCommentButton
//               postId={blogPostData._id || ""}
//               likes={blogPostData.likes || 0}
//               comments={comments?.length || 0}
//               user={user}
//               onCommentClick={handleAddCommentClick}
//             />
//           </div>

//           {/* ================================================= */}
//           {/* SIDEBAR */}
//           {/* ================================================= */}

//           <AnimatePresence>
//             {!isSidebarCollapsed && (
//               <>
//                 <motion.div
//                   className="fixed inset-0 bg-black/20 z-30"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   onClick={() => setIsSidebarCollapsed(true)}
//                 />

//                 <motion.div
//                   className="fixed right-0 top-16 md:top-[68px] bottom-0 md:w-80 w-60 z-40 bg-white border-l border-gray-200 shadow-2xl"
//                   initial={{ x: "100%" }}
//                   animate={{ x: 0 }}
//                   exit={{ x: "100%" }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <div className="h-full overflow-y-auto p-4">
//                     <RecentPosts />
//                   </div>
//                 </motion.div>
//               </>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* ================================================= */}
//         {/* SUMMARY DRAWER */}
//         {/* ================================================= */}

//         <Drawer
//           isOpen={openSummarizeDrawer}
//           onClose={() => {
//             if (!isSummaryLoading) {
//               setOpenSummarizeDrawer(false);
//             }
//           }}
//           title={
//             isSummaryLoading
//               ? "Generating Summary"
//               : summaryContent?.title || "Post Summary"
//           }
//         >
//           {/* ================================================= */}
//           {/* SUMMARY LOADING */}
//           {/* ================================================= */}

//           {isSummaryLoading && <SkeletonLoader />}

//           {/* ================================================= */}
//           {/* SUMMARY ERROR */}
//           {/* ================================================= */}

//           {!isSummaryLoading && errorMsg && (
//             <div className="flex gap-2 text-sm text-amber-600 font-medium">
//               <LuCircleAlert className="mt-1 shrink-0" />

//               <p>{errorMsg}</p>
//             </div>
//           )}

//           {/* ================================================= */}
//           {/* SUMMARY CONTENT */}
//           {/* ================================================= */}

//           {!isSummaryLoading && !errorMsg && summaryContent && (
//             <MarkdownContent content={summaryContent.summary || ""} />
//           )}
//         </Drawer>

//         {/* ================================================= */}
//         {/* SIDEBAR TOGGLE */}
//         {/* ================================================= */}

//         <button
//           onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
//           className="
//             fixed
//             right-0
//             top-1/2
//             -translate-y-1/2
//             z-50
//             rounded-l-xl
//             bg-gray-200
//             px-2
//             py-5
//             shadow-lg
//             transition-all
//             duration-300
//             hover:bg-gray-300
//             hover:px-3
//           "
//         >
//           <LuChevronLeft
//             size={20}
//             className={`transition-transform duration-300 ${
//               isSidebarCollapsed ? "" : "rotate-180"
//             }`}
//           />
//         </button>
//       </div>

//       {/* ================================================= */}
//       {/* IMAGE FULLSCREEN VIEWER */}
//       {/* ================================================= */}

//       {isImageViewerOpen && (
//         <div
//           className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-3 sm:p-5 cursor-zoom-out"
//           onClick={() => setIsImageViewerOpen(false)}
//         >
//           {/* Close Button */}

//           <button
//             type="button"
//             onClick={(e) => {
//               e.stopPropagation();

//               setIsImageViewerOpen(false);
//             }}
//             className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 cursor-pointer transition"
//           >
//             <LuX size={26} />
//           </button>

//           {/* Image */}

//           <img
//             src={blogPostData.coverImageUrl || ""}
//             alt={blogPostData.title}
//             onClick={(e) => {
//               e.stopPropagation();

//               setIsImageViewerOpen(false);
//             }}
//             className="max-w-full max-h-[90vh] sm:max-h-[92vh] object-contain rounded-sm cursor-zoom-out"
//           />
//         </div>
//       )}
//     </BlogLayout>
//   );
// };

// export default BlogPostView;

// import {
//   LuChevronLeft,
//   LuCircleAlert,
//   LuDot,
//   LuSparkles,
//   LuBookmark,
//   LuBookmarkCheck,
//   LuSearch,
//   LuX,
//   LuSend,
// } from "react-icons/lu";

// import toast from "react-hot-toast";

// import { useNavigate, useParams } from "react-router-dom";

// import { useContext, useEffect, useRef, useState } from "react";

// import { UserContext } from "../../context/userContext";

// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";

// import moment from "moment";

// import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
// import MarkdownContent from "./components/MarkdownContent";
// import SharePost from "./components/SharePost";
// import { sanitizeMarkdown } from "../../utils/helper";

// import CommentInfoCard from "./components/CommentInfoCard";
// import CommentReplyInput from "../../components/Inputs/CommentReplyInput";

// import SkeletonLoader from "../../components/Loader/SkeletonLoader";
// import Drawer from "../../components/Drawer";
// import LikeCommentButton from "./components/LikeCommentButton";
// import BlogPostViewSkeleton from "../../components/Loader/BlogPostViewSkeleton";

// import { AnimatePresence, motion } from "framer-motion";

// import RecentPosts from "./components/RecentPostsRename";

// import BackButton from "../../components/BackButton";

// import NotFound from "../NotFound";

// const BlogPostView = () => {
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

//   const [isBookmarked, setIsBookmarked] = useState(false);

//   const { slug } = useParams();

//   const navigate = useNavigate();

//   const [blogPostData, setBlogPostData] = useState(null);

//   const [comments, setComments] = useState([]);

//   const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

//   const { user, setOpenAuthForm } = useContext(UserContext);

//   const [showReplyForm, setShowReplyForm] = useState(false);

//   // ============================================================
//   // COMMENTS SECTION REF
//   // ============================================================

//   const commentsSectionRef = useRef(null);

//   // ============================================================
//   // SUMMARY STATE
//   // ============================================================

//   const [openSummarizeDrawer, setOpenSummarizeDrawer] = useState(false);

//   const [summaryContent, setSummaryContent] = useState(null);

//   const [isSummaryLoading, setIsSummaryLoading] = useState(false);

//   const [errorMsg, setErrorMsg] = useState("");

//   // ============================================================
//   // POST LOADING STATE
//   // ============================================================

//   const [isPostLoading, setIsPostLoading] = useState(false);

//   // ============================================================
//   // 404 STATE
//   // ============================================================

//   const [notFound, setNotFound] = useState(false);

//   // ============================================================
//   // CHECK BOOKMARK STATUS
//   // ============================================================

//   const fetchBookmarkStatus = async (postId) => {
//     if (!user || !postId) {
//       setIsBookmarked(false);
//       return;
//     }

//     try {
//       const response = await axiosInstance.get(
//         API_PATHS.POSTS.CHECK_BOOKMARK(postId),
//       );

//       setIsBookmarked(response.data.bookmarked);
//     } catch (error) {
//       console.error("Error checking bookmark status:", error);
//     }
//   };

//   // ============================================================
//   // GET POST DATA BY SLUG
//   // ============================================================

//   const fetchPostDetailsBySlug = async () => {
//     try {
//       setIsPostLoading(true);

//       // Reset previous post / 404 state when slug changes
//       setBlogPostData(null);
//       setNotFound(false);
//       setComments([]);
//       setIsBookmarked(false);

//       // Close summary drawer when changing posts
//       setOpenSummarizeDrawer(false);
//       setSummaryContent(null);
//       setErrorMsg("");
//       setIsSummaryLoading(false);

//       // Reset comment form
//       setShowReplyForm(false);

//       const response = await axiosInstance.get(
//         API_PATHS.POSTS.GET_BY_SLUG(slug),
//       );

//       if (response.data) {
//         const data = response.data;

//         setBlogPostData(data);

//         await fetchBookmarkStatus(data._id);

//         fetchCommentByPostId(data._id);
//       } else {
//         setNotFound(true);
//       }
//     } catch (error) {
//       console.error("Error fetching post:", error);

//       if (error.response?.status === 404) {
//         setNotFound(true);
//       }
//     } finally {
//       setIsPostLoading(false);
//     }
//   };

//   // ============================================================
//   // GET COMMENTS
//   // ============================================================

//   const fetchCommentByPostId = async (postId) => {
//     try {
//       const response = await axiosInstance.get(
//         API_PATHS.COMMENT.GET_ALL_BY_POST(postId),
//       );

//       if (response.data) {
//         setComments(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//     }
//   };

//   // ============================================================
//   // GENERATE BLOG POST SUMMARY
//   // ============================================================

//   const generateBlogPostSummary = async () => {
//     if (!blogPostData?.content) {
//       toast.error("Post content is not available");
//       return;
//     }

//     try {
//       // Open drawer immediately
//       setOpenSummarizeDrawer(true);

//       // Clear previous summary/error
//       setSummaryContent(null);
//       setErrorMsg("");

//       // Only the summary is loading now.
//       // This will NOT trigger BlogPostViewSkeleton.
//       setIsSummaryLoading(true);

//       const response = await axiosInstance.post(
//         API_PATHS.AI.GENERATE_POST_SUMMARY,
//         {
//           content: blogPostData.content,
//         },
//       );

//       if (response.data) {
//         setSummaryContent(response.data);
//       }
//     } catch (error) {
//       console.error("Error generating summary:", error);

//       setSummaryContent(null);

//       setErrorMsg("Failed to generate summary, try again");
//     } finally {
//       setIsSummaryLoading(false);
//     }
//   };

//   // ============================================================
//   // INCREMENT VIEWS
//   // ============================================================

//   const incrementView = async (postId) => {
//     if (!postId) return;

//     try {
//       await axiosInstance.post(API_PATHS.POSTS.INCREMENT_VIEW(postId));
//     } catch (error) {
//       console.error("Error incrementing view:", error);
//     }
//   };

//   // ============================================================
//   // HANDLE POST VIEW
//   // ============================================================

//   useEffect(() => {
//     if (!blogPostData?._id) return;

//     const postId = blogPostData._id;

//     if (user) {
//       incrementView(postId);
//       return;
//     }

//     const key = `viewed_${postId}`;

//     if (!localStorage.getItem(key)) {
//       incrementView(postId);

//       localStorage.setItem(key, Date.now().toString());
//     }
//   }, [blogPostData?._id, user]);

//   // ============================================================
//   // SCROLL TO COMMENTS
//   // ============================================================

//   const scrollToComments = () => {
//     const section = commentsSectionRef.current;

//     if (!section) return;

//     section.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   };

//   // ============================================================
//   // CANCEL COMMENT
//   // ============================================================

//   const handleCancelReply = () => {
//     setShowReplyForm(false);
//   };

//   // ============================================================
//   // ADD COMMENT
//   // ============================================================

//   const handleAddReply = async (content) => {
//     try {
//       await axiosInstance.post(API_PATHS.COMMENT.ADD(blogPostData._id), {
//         content,
//         parentComment: "",
//       });

//       toast.success("Comment added successfully!");

//       setShowReplyForm(false);

//       fetchCommentByPostId(blogPostData._id);
//     } catch (error) {
//       console.error("Error adding comment:", error);

//       toast.error(error.response?.data?.message || "Failed to add comment");
//     }
//   };

//   // ============================================================
//   // HANDLE COMMENT BUTTON
//   // ============================================================

//   const handleAddCommentClick = () => {
//     if (!user) {
//       setOpenAuthForm(true);
//       return;
//     }

//     // Open the comment input exactly like the Add Comment button.
//     setShowReplyForm(true);

//     /*
//       Scroll after React has had a chance to update the DOM.

//       This is intentionally executed every single time the button
//       is clicked. Therefore, if the user scrolls back up and clicks
//       the comment icon again, it will scroll back to the comments
//       section again.
//     */
//     setTimeout(() => {
//       scrollToComments();
//     }, 50);
//   };

//   // ============================================================
//   // BOOKMARK
//   // ============================================================

//   const handleBookmark = async () => {
//     if (!user) {
//       setOpenAuthForm(true);
//       return;
//     }

//     try {
//       if (isBookmarked) {
//         await axiosInstance.delete(
//           API_PATHS.POSTS.REMOVE_BOOKMARK(blogPostData._id),
//         );

//         setIsBookmarked(false);

//         toast.success("Bookmark removed");
//       } else {
//         await axiosInstance.post(API_PATHS.POSTS.BOOKMARK(blogPostData._id));

//         setIsBookmarked(true);

//         toast.success("Post bookmarked");
//       }
//     } catch (error) {
//       console.error(error);

//       toast.error("Something went wrong");
//     }
//   };

//   // ============================================================
//   // FETCH POST WHEN SLUG CHANGES
//   // ============================================================

//   useEffect(() => {
//     fetchPostDetailsBySlug();
//   }, [slug]);

//   // ============================================================
//   // DISABLE BACKGROUND SCROLLING
//   // ============================================================

//   useEffect(() => {
//     if (isImageViewerOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isImageViewerOpen]);

//   // ============================================================
//   // NOT FOUND
//   // ============================================================

//   if (notFound) {
//     return <NotFound />;
//   }

//   // ============================================================
//   // POST LOADING
//   // ============================================================

//   if (isPostLoading || !blogPostData) {
//     return (
//       <BlogLayout>
//         <BlogPostViewSkeleton />
//       </BlogLayout>
//     );
//   }

//   // ============================================================
//   // BLOG POST
//   // ============================================================

//   return (
//     <BlogLayout>
//       <BackButton />

//       <title>{blogPostData.title}</title>

//       <meta name="description" content={blogPostData.title} />

//       <meta name="og:title" content={blogPostData.title} />

//       <meta name="og:image" content={blogPostData.coverImageUrl} />

//       <meta name="og:type" content="article" />

//       <div className="mb-10 px-1">
//         <div className="w-full">
//           <div className="w-full">
//             {/* ================================================= */}
//             {/* ARTICLE HEADER */}
//             {/* ================================================= */}

//             <header className="mb-8">
//               {/* Article Label */}

//               <div className="mb-3 flex items-center gap-2">
//                 <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 sm:text-[11px]">
//                   Article
//                 </span>

//                 <span className="h-1 w-1 rounded-full bg-gray-300" />

//                 <span className="text-[11px] font-medium text-gray-400 sm:text-xs">
//                   {moment(blogPostData.updatedAt || "").format("Do MMM YYYY")}
//                 </span>
//               </div>

//               {/* ================================================= */}
//               {/* TITLE */}
//               {/* ================================================= */}

//               <h1
//                 className="
//                   max-w-5xl
//                   text-3xl
//                   font-bold
//                   leading-[1.12]
//                   tracking-[-0.025em]
//                   text-gray-950
//                   sm:text-4xl
//                   md:text-5xl
//                   lg:text-[54px]
//                   xl:text-[60px]
//                 "
//               >
//                 {blogPostData.title}
//               </h1>

//               {/* ================================================= */}
//               {/* TAGS + SUMMARY */}
//               {/* ================================================= */}

//               <div className="mt-6 flex flex-wrap items-center gap-2">
//                 {blogPostData.tags?.slice(0, 3).map((tag, index) => (
//                   <button
//                     key={index}
//                     type="button"
//                     className="
//                       cursor-pointer
//                       rounded-sm
//                       border
//                       border-gray-200
//                       bg-gray-50
//                       px-2.5
//                       py-1
//                       text-[10px]
//                       font-medium
//                       text-gray-600
//                       transition-all
//                       duration-200
//                       hover:border-gray-300
//                       hover:bg-gray-100
//                       hover:text-gray-900
//                       sm:text-[11px]
//                     "
//                     onClick={(e) => {
//                       e.stopPropagation();

//                       navigate(`/tags/${tag}`);
//                     }}
//                   >
//                     #{tag}
//                   </button>
//                 ))}

//                 {blogPostData.tags?.length > 0 && (
//                   <span className="mx-1 hidden h-4 w-px bg-gray-200 sm:block" />
//                 )}

//                 {/* ================================================= */}
//                 {/* SUMMARIZE BUTTON */}
//                 {/* ================================================= */}

//                 <button
//                   type="button"
//                   className="
//                     group
//                     inline-flex
//                     cursor-pointer
//                     items-center
//                     gap-1.5
//                     rounded-sm
//                     border
//                     border-gray-300
//                     bg-white
//                     px-3
//                     py-1.5
//                     text-[10px]
//                     font-semibold
//                     text-gray-800
//                     shadow-sm
//                     transition-all
//                     duration-200
//                     hover:border-gray-400
//                     hover:bg-gray-50
//                     hover:text-gray-950
//                     hover:shadow
//                     disabled:cursor-not-allowed
//                     disabled:opacity-60
//                     sm:text-[11px]
//                   "
//                   onClick={generateBlogPostSummary}
//                   disabled={isSummaryLoading}
//                 >
//                   <LuSparkles
//                     size={13}
//                     className="
//                       text-gray-600
//                       transition-transform
//                       duration-300
//                       group-hover:rotate-12
//                     "
//                   />

//                   {isSummaryLoading
//                     ? "Generating summary..."
//                     : "Summarize this post"}
//                 </button>
//               </div>
//             </header>

//             {/* ================================================= */}
//             {/* ARTICLE CONTENT */}
//             {/* ================================================= */}

//             <div className="mx-auto w-full md:w-[75%]">
//               {/* ================================================= */}
//               {/* COVER IMAGE */}
//               {/* ================================================= */}

//               <div
//                 className="
//                   group
//                   relative
//                   mb-8
//                   h-72
//                   w-full
//                   cursor-zoom-in
//                   overflow-hidden
//                   rounded-md
//                   bg-gray-100
//                   sm:h-80
//                   md:h-96
//                   lg:h-[440px]
//                 "
//                 onClick={() => setIsImageViewerOpen(true)}
//               >
//                 <img
//                   src={blogPostData.coverImageUrl || ""}
//                   alt={blogPostData.title}
//                   className="
//                     h-full
//                     w-full
//                     object-cover
//                     transition-transform
//                     duration-700
//                     group-hover:scale-[1.015]
//                   "
//                 />

//                 {/* Hover Overlay */}

//                 <div
//                   className="
//                     absolute
//                     inset-0
//                     flex
//                     items-center
//                     justify-center
//                     bg-black/0
//                     transition-all
//                     duration-300
//                     group-hover:bg-black/20
//                   "
//                 >
//                   <div
//                     className="
//                       flex
//                       scale-90
//                       items-center
//                       justify-center
//                       rounded-full
//                       bg-black/60
//                       p-3
//                       text-white
//                       opacity-0
//                       backdrop-blur-sm
//                       transition-all
//                       duration-300
//                       group-hover:scale-100
//                       group-hover:opacity-100
//                     "
//                   >
//                     <LuSearch size={22} />
//                   </div>
//                 </div>
//               </div>

//               {/* ================================================= */}
//               {/* CONTENT */}
//               {/* ================================================= */}

//               <div className="article-content">
//                 <MarkdownContent
//                   content={sanitizeMarkdown(blogPostData?.content || "")}
//                 />
//               </div>

//               {/* ================================================= */}
//               {/* SHARE / BOOKMARK */}
//               {/* ================================================= */}

//               <div
//                 className="
//                   my-8
//                   flex
//                   items-center
//                   justify-between
//                   gap-3
//                   border-y
//                   border-gray-100
//                   py-4
//                 "
//               >
//                 <SharePost title={blogPostData.title} />

//                 <button
//                   type="button"
//                   onClick={handleBookmark}
//                   className={`
//                     inline-flex
//                     cursor-pointer
//                     items-center
//                     gap-2
//                     rounded-sm
//                     border
//                     px-3.5
//                     py-2
//                     text-xs
//                     font-medium
//                     transition-all
//                     duration-200
//                     ${
//                       isBookmarked
//                         ? "border-gray-800 bg-gray-900 text-white hover:bg-black"
//                         : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
//                     }
//                   `}
//                 >
//                   {isBookmarked ? (
//                     <>
//                       <LuBookmarkCheck size={15} />
//                       Saved
//                     </>
//                   ) : (
//                     <>
//                       <LuBookmark size={15} />
//                       Save
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* ================================================= */}
//             {/* COMMENTS */}
//             {/* ================================================= */}

//             <section ref={commentsSectionRef} className="mt-12 scroll-mt-24">
//               <div className="mx-auto w-full">
//                 {/* ================================================= */}
//                 {/* COMMENTS HEADER */}
//                 {/* ================================================= */}

//                 <div
//                   className="
//                     mb-6
//                     flex
//                     items-end
//                     justify-between
//                     gap-3
//                     border-b
//                     border-gray-100
//                     pb-4
//                   "
//                 >
//                   <div>
//                     <h4
//                       className="
//                         text-xl
//                         font-bold
//                         tracking-tight
//                         text-gray-950
//                         sm:text-2xl
//                       "
//                     >
//                       Discussion
//                     </h4>

//                     <p className="mt-1 text-xs text-gray-400 sm:text-sm">
//                       {comments?.length || 0}{" "}
//                       {comments?.length === 1 ? "comment" : "comments"}
//                     </p>
//                   </div>

//                   <button
//                     type="button"
//                     className="
//                       inline-flex
//                       cursor-pointer
//                       items-center
//                       gap-2
//                       rounded-sm
//                       border
//                       border-gray-200
//                       bg-white
//                       px-3
//                       py-2
//                       text-xs
//                       font-medium
//                       text-gray-700
//                       shadow-sm
//                       transition-all
//                       duration-200
//                       hover:border-gray-300
//                       hover:bg-gray-50
//                       hover:text-gray-950
//                       sm:px-3.5
//                       sm:text-sm
//                     "
//                     onClick={handleAddCommentClick}
//                   >
//                     <LuSend size={14} />

//                     <span>Add Comment</span>
//                   </button>
//                 </div>

//                 {/* ================================================= */}
//                 {/* NEW COMMENT INPUT */}
//                 {/* ================================================= */}

//                 {showReplyForm && (
//                   <div className="mb-7">
//                     <CommentReplyInput
//                       user={user}
//                       authorName={user.name}
//                       content=""
//                       handleAddReply={handleAddReply}
//                       handleCancelReply={handleCancelReply}
//                       disableAutoGen
//                       type="new"
//                     />
//                   </div>
//                 )}

//                 {/* ================================================= */}
//                 {/* COMMENTS LIST */}
//                 {/* ================================================= */}

//                 {comments?.length > 0 ? (
//                   <div className="space-y-2">
//                     {comments.map((comment) => (
//                       <CommentInfoCard
//                         key={comment._id}
//                         commentId={comment._id}
//                         authorId={comment.author?._id}
//                         authorName={comment.author?.name || "Deleted User"}
//                         authorPhoto={comment.author?.profileImageUrl}
//                         content={comment.content}
//                         isDeleted={comment.isDeleted}
//                         deletedBy={comment.deletedBy}
//                         updatedOn={
//                           comment.updatedAt
//                             ? moment(comment.updatedAt).format("Do MMM YYYY")
//                             : "-"
//                         }
//                         post={comment.post}
//                         replies={comment.replies || []}
//                         getAllComments={() =>
//                           fetchCommentByPostId(blogPostData._id)
//                         }
//                         depth={0}
//                       />
//                     ))}
//                   </div>
//                 ) : (
//                   <div
//                     className="
//                       rounded-md
//                       border
//                       border-dashed
//                       border-gray-200
//                       bg-gray-50/70
//                       px-4
//                       py-12
//                       text-center
//                     "
//                   >
//                     <p className="text-sm font-medium text-gray-600">
//                       No comments yet
//                     </p>

//                     <p className="mt-1 text-xs text-gray-400">
//                       Be the first to start the discussion.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </section>

//             {/* ================================================= */}
//             {/* LIKE / COMMENT BUTTON */}
//             {/* ================================================= */}

//             <LikeCommentButton
//               postId={blogPostData._id || ""}
//               likes={blogPostData.likes || 0}
//               comments={comments?.length || 0}
//               user={user}
//               onCommentClick={handleAddCommentClick}
//             />
//           </div>

//           {/* ================================================= */}
//           {/* SIDEBAR */}
//           {/* ================================================= */}

//           <AnimatePresence>
//             {!isSidebarCollapsed && (
//               <>
//                 {/* Overlay */}

//                 <motion.div
//                   className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px]"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   onClick={() => setIsSidebarCollapsed(true)}
//                 />

//                 {/* Sidebar */}

//                 <motion.div
//                   className="
//                     fixed
//                     bottom-0
//                     right-0
//                     top-16
//                     z-40
//                     w-60
//                     border-l
//                     border-gray-200
//                     bg-white
//                     shadow-2xl
//                     md:top-[68px]
//                     md:w-80
//                   "
//                   initial={{ x: "100%" }}
//                   animate={{ x: 0 }}
//                   exit={{ x: "100%" }}
//                   transition={{
//                     duration: 0.3,
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                 >
//                   <div className="h-full overflow-y-auto p-4">
//                     <RecentPosts />
//                   </div>
//                 </motion.div>
//               </>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* ================================================= */}
//         {/* SUMMARY DRAWER */}
//         {/* ================================================= */}

//         <Drawer
//           isOpen={openSummarizeDrawer}
//           onClose={() => {
//             if (!isSummaryLoading) {
//               setOpenSummarizeDrawer(false);
//             }
//           }}
//           title={
//             isSummaryLoading
//               ? "Generating Summary"
//               : summaryContent?.title || "Post Summary"
//           }
//         >
//           {/* ================================================= */}
//           {/* SUMMARY LOADING */}
//           {/* ================================================= */}

//           {isSummaryLoading && <SkeletonLoader />}

//           {/* ================================================= */}
//           {/* SUMMARY ERROR */}
//           {/* ================================================= */}

//           {!isSummaryLoading && errorMsg && (
//             <div className="flex gap-2 text-sm font-medium text-amber-600">
//               <LuCircleAlert className="mt-1 shrink-0" />

//               <p>{errorMsg}</p>
//             </div>
//           )}

//           {/* ================================================= */}
//           {/* SUMMARY CONTENT */}
//           {/* ================================================= */}

//           {!isSummaryLoading && !errorMsg && summaryContent && (
//             <MarkdownContent content={summaryContent.summary || ""} />
//           )}
//         </Drawer>

//         {/* ================================================= */}
//         {/* SIDEBAR TOGGLE */}
//         {/* ================================================= */}

//         <button
//           type="button"
//           onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
//           aria-label={
//             isSidebarCollapsed ? "Open recent posts" : "Close recent posts"
//           }
//           className="
//             fixed
//             right-0
//             top-1/2
//             z-50
//             -translate-y-1/2
//             cursor-pointer
//             rounded-l-md
//             border
//             border-r-0
//             border-gray-200
//             bg-white
//             px-1.5
//             py-4
//             text-gray-500
//             shadow-md
//             transition-all
//             duration-200
//             hover:bg-gray-50
//             hover:text-gray-900
//             hover:shadow-lg
//             sm:px-2
//           "
//         >
//           <LuChevronLeft
//             size={18}
//             className={`transition-transform duration-300 ${
//               isSidebarCollapsed ? "" : "rotate-180"
//             }`}
//           />
//         </button>
//       </div>

//       {/* ================================================= */}
//       {/* IMAGE FULLSCREEN VIEWER */}
//       {/* ================================================= */}

//       {isImageViewerOpen && (
//         <div
//           className="
//             fixed
//             inset-0
//             z-[100]
//             flex
//             cursor-zoom-out
//             items-center
//             justify-center
//             bg-black/95
//             p-3
//             sm:p-5
//           "
//           onClick={() => setIsImageViewerOpen(false)}
//         >
//           {/* Close Button */}

//           <button
//             type="button"
//             aria-label="Close image viewer"
//             onClick={(e) => {
//               e.stopPropagation();

//               setIsImageViewerOpen(false);
//             }}
//             className="
//               absolute
//               right-4
//               top-4
//               z-10
//               cursor-pointer
//               rounded-full
//               bg-white/10
//               p-2
//               text-white
//               transition
//               hover:bg-white/20
//               sm:right-5
//               sm:top-5
//             "
//           >
//             <LuX size={24} />
//           </button>

//           {/* Image */}

//           <img
//             src={blogPostData.coverImageUrl || ""}
//             alt={blogPostData.title}
//             onClick={(e) => {
//               e.stopPropagation();

//               setIsImageViewerOpen(false);
//             }}
//             className="
//               max-h-[90vh]
//               max-w-full
//               cursor-zoom-out
//               rounded-sm
//               object-contain
//               sm:max-h-[92vh]
//             "
//           />
//         </div>
//       )}
//     </BlogLayout>
//   );
// };

// export default BlogPostView;

import {
  LuChevronLeft,
  LuCircleAlert,
  LuDot,
  LuSparkles,
  LuBookmark,
  LuBookmarkCheck,
  LuSearch,
  LuX,
  LuSend,
} from "react-icons/lu";

import toast from "react-hot-toast";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { useContext, useEffect, useRef, useState } from "react";

import { UserContext } from "../../context/userContext";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

import moment from "moment";

import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
import MarkdownContent from "./components/MarkdownContent";
import SharePost from "./components/SharePost";
import { sanitizeMarkdown } from "../../utils/helper";

import CommentInfoCard from "./components/CommentInfoCard";
import CommentReplyInput from "../../components/Inputs/CommentReplyInput";

import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import Drawer from "../../components/Drawer";
import LikeCommentButton from "./components/LikeCommentButton";
import BlogPostViewSkeleton from "../../components/Loader/BlogPostViewSkeleton";

import { AnimatePresence, motion } from "framer-motion";

import RecentPosts from "./components/RecentPostsRename";

import BackButton from "../../components/BackButton";

import NotFound from "../NotFound";

const BlogPostView = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const [isBookmarked, setIsBookmarked] = useState(false);

  const { slug } = useParams();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const [blogPostData, setBlogPostData] = useState(null);

  const [comments, setComments] = useState([]);

  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  const { user, setOpenAuthForm } = useContext(UserContext);

  const [showReplyForm, setShowReplyForm] = useState(false);

  // ============================================================
  // COMMENTS SECTION REF
  // ============================================================

  const commentsSectionRef = useRef(null);

  // ============================================================
  // COMMENT DEEP LINK
  // ============================================================

  const commentIdFromUrl = searchParams.get("comment");

  // ============================================================
  // SUMMARY STATE
  // ============================================================

  const [openSummarizeDrawer, setOpenSummarizeDrawer] = useState(false);

  const [summaryContent, setSummaryContent] = useState(null);

  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  // ============================================================
  // POST LOADING STATE
  // ============================================================

  const [isPostLoading, setIsPostLoading] = useState(false);

  // ============================================================
  // 404 STATE
  // ============================================================

  const [notFound, setNotFound] = useState(false);

  // ============================================================
  // CHECK BOOKMARK STATUS
  // ============================================================

  const fetchBookmarkStatus = async (postId) => {
    if (!user || !postId) {
      setIsBookmarked(false);
      return;
    }

    try {
      const response = await axiosInstance.get(
        API_PATHS.POSTS.CHECK_BOOKMARK(postId),
      );

      setIsBookmarked(response.data.bookmarked);
    } catch (error) {
      console.error("Error checking bookmark status:", error);
    }
  };

  // ============================================================
  // GET COMMENTS
  // ============================================================

  const fetchCommentByPostId = async (postId) => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.COMMENT.GET_ALL_BY_POST(postId),
      );

      if (response.data) {
        setComments(response.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // ============================================================
  // FIND COMMENT PATH
  //
  // Returns the chain of comment IDs required to reach the
  // requested comment.
  //
  // Example:
  //
  // parent
  //   └── reply
  //        └── nested reply
  //
  // target = nested reply
  //
  // result:
  // [parentId, replyId, targetId]
  // ============================================================

  const findCommentPath = (commentList, targetId, path = []) => {
    if (!Array.isArray(commentList) || !targetId) {
      return null;
    }

    for (const comment of commentList) {
      if (!comment?._id) continue;

      const currentPath = [...path, comment._id];

      if (comment._id === targetId) {
        return currentPath;
      }

      if (Array.isArray(comment.replies) && comment.replies.length > 0) {
        const nestedPath = findCommentPath(
          comment.replies,
          targetId,
          currentPath,
        );

        if (nestedPath) {
          return nestedPath;
        }
      }
    }

    return null;
  };

  // ============================================================
  // OPEN COMMENT FROM URL
  // ============================================================

  useEffect(() => {
    if (!commentIdFromUrl || comments.length === 0) {
      return;
    }

    const commentPath = findCommentPath(comments, commentIdFromUrl);

    if (!commentPath) {
      return;
    }

    /*
      We wait until CommentInfoCard instances have rendered before
      scrolling.

      The target CommentInfoCard receives its ID through the normal
      recursive rendering tree. The component itself handles
      opening its parent reply sections.
    */
    const scrollToTargetComment = () => {
      const targetElement = document.getElementById(
        `comment-${commentIdFromUrl}`,
      );

      if (!targetElement) {
        return;
      }

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    };

    /*
      First render the required nested reply sections.
      Then scroll after the DOM has updated.
    */
    const timeout = setTimeout(() => {
      scrollToTargetComment();
    }, 150);

    return () => clearTimeout(timeout);
  }, [commentIdFromUrl, comments]);

  // ============================================================
  // GENERATE BLOG POST SUMMARY
  // ============================================================

  const generateBlogPostSummary = async () => {
    if (!blogPostData?.content) {
      toast.error("Post content is not available");
      return;
    }

    try {
      setOpenSummarizeDrawer(true);

      setSummaryContent(null);
      setErrorMsg("");

      setIsSummaryLoading(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_POST_SUMMARY,
        {
          content: blogPostData.content,
        },
      );

      if (response.data) {
        setSummaryContent(response.data);
      }
    } catch (error) {
      console.error("Error generating summary:", error);

      setSummaryContent(null);

      setErrorMsg("Failed to generate summary, try again");
    } finally {
      setIsSummaryLoading(false);
    }
  };

  // ============================================================
  // INCREMENT VIEWS
  // ============================================================

  const incrementView = async (postId) => {
    if (!postId) return;

    try {
      await axiosInstance.post(API_PATHS.POSTS.INCREMENT_VIEW(postId));
    } catch (error) {
      console.error("Error incrementing view:", error);
    }
  };

  // ============================================================
  // HANDLE POST VIEW
  // ============================================================

  useEffect(() => {
    if (!blogPostData?._id) return;

    const postId = blogPostData._id;

    if (user) {
      incrementView(postId);
      return;
    }

    const key = `viewed_${postId}`;

    if (!localStorage.getItem(key)) {
      incrementView(postId);

      localStorage.setItem(key, Date.now().toString());
    }
  }, [blogPostData?._id, user]);

  // ============================================================
  // SCROLL TO COMMENTS
  // ============================================================

  const scrollToComments = () => {
    const section = commentsSectionRef.current;

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // ============================================================
  // CANCEL COMMENT
  // ============================================================

  const handleCancelReply = () => {
    setShowReplyForm(false);
  };

  // ============================================================
  // ADD COMMENT
  // ============================================================

  const handleAddReply = async (content) => {
    try {
      await axiosInstance.post(API_PATHS.COMMENT.ADD(blogPostData._id), {
        content,
        parentComment: "",
      });

      toast.success("Comment added successfully!");

      setShowReplyForm(false);

      fetchCommentByPostId(blogPostData._id);
    } catch (error) {
      console.error("Error adding comment:", error);

      toast.error(error.response?.data?.message || "Failed to add comment");
    }
  };

  // ============================================================
  // HANDLE COMMENT BUTTON
  // ============================================================

  const handleAddCommentClick = () => {
    if (!user) {
      setOpenAuthForm(true);
      return;
    }

    setShowReplyForm(true);

    setTimeout(() => {
      scrollToComments();
    }, 50);
  };

  // ============================================================
  // BOOKMARK
  // ============================================================

  const handleBookmark = async () => {
    if (!user) {
      setOpenAuthForm(true);
      return;
    }

    try {
      if (isBookmarked) {
        await axiosInstance.delete(
          API_PATHS.POSTS.REMOVE_BOOKMARK(blogPostData._id),
        );

        setIsBookmarked(false);

        toast.success("Bookmark removed");
      } else {
        await axiosInstance.post(API_PATHS.POSTS.BOOKMARK(blogPostData._id));

        setIsBookmarked(true);

        toast.success("Post bookmarked");
      }
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong");
    }
  };

  // ============================================================
  // FETCH POST DETAILS BY SLUG
  // ============================================================

  const fetchPostDetailsBySlug = async () => {
    try {
      setIsPostLoading(true);

      setBlogPostData(null);
      setNotFound(false);
      setComments([]);
      setIsBookmarked(false);

      setOpenSummarizeDrawer(false);
      setSummaryContent(null);
      setErrorMsg("");
      setIsSummaryLoading(false);

      setShowReplyForm(false);

      const response = await axiosInstance.get(
        API_PATHS.POSTS.GET_BY_SLUG(slug),
      );

      if (response.data) {
        const data = response.data;

        setBlogPostData(data);

        await fetchBookmarkStatus(data._id);

        fetchCommentByPostId(data._id);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching post:", error);

      if (error.response?.status === 404) {
        setNotFound(true);
      }
    } finally {
      setIsPostLoading(false);
    }
  };

  // ============================================================
  // FETCH POST WHEN SLUG CHANGES
  // ============================================================

  useEffect(() => {
    fetchPostDetailsBySlug();
  }, [slug]);

  // ============================================================
  // DISABLE BACKGROUND SCROLLING
  // ============================================================

  useEffect(() => {
    if (isImageViewerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isImageViewerOpen]);

  // ============================================================
  // NOT FOUND
  // ============================================================

  if (notFound) {
    return <NotFound />;
  }

  // ============================================================
  // POST LOADING
  // ============================================================

  if (isPostLoading || !blogPostData) {
    return (
      <BlogLayout>
        <BlogPostViewSkeleton />
      </BlogLayout>
    );
  }

  // ============================================================
  // BLOG POST
  // ============================================================

  return (
    <BlogLayout>
      <BackButton />

      <title>{blogPostData.title}</title>

      <meta name="description" content={blogPostData.title} />

      <meta name="og:title" content={blogPostData.title} />

      <meta name="og:image" content={blogPostData.coverImageUrl} />

      <meta name="og:type" content="article" />

      <div className="mb-10 px-1">
        <div className="w-full">
          <div className="w-full">
            {/* ================================================= */}
            {/* ARTICLE HEADER */}
            {/* ================================================= */}

            <header className="mb-8">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 sm:text-[11px]">
                  Article
                </span>

                <span className="h-1 w-1 rounded-full bg-gray-300" />

                <span className="text-[11px] font-medium text-gray-400 sm:text-xs">
                  {moment(blogPostData.updatedAt || "").format("Do MMM YYYY")}
                </span>
              </div>

              <h1
                className="
                  max-w-5xl
                  text-3xl
                  font-bold
                  leading-[1.12]
                  tracking-[-0.025em]
                  text-gray-950
                  sm:text-4xl
                  md:text-5xl
                "
              >
                {blogPostData.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {blogPostData.tags?.slice(0, 3).map((tag, index) => (
                  <button
                    key={index}
                    type="button"
                    className="
                      cursor-pointer
                      rounded-sm
                      border
                      border-gray-200
                      bg-gray-50
                      px-2.5
                      py-1
                      text-[10px]
                      font-medium
                      text-gray-600
                      transition-all
                      duration-200
                      hover:border-gray-300
                      hover:bg-gray-100
                      hover:text-gray-900
                      sm:text-[11px]
                    "
                    onClick={(e) => {
                      e.stopPropagation();

                      navigate(`/tags/${tag}`);
                    }}
                  >
                    #{tag}
                  </button>
                ))}

                {blogPostData.tags?.length > 0 && (
                  <span className="mx-1 hidden h-4 w-px bg-gray-200 sm:block" />
                )}

                <button
                  type="button"
                  className="
                    group
                    inline-flex
                    cursor-pointer
                    items-center
                    gap-1.5
                    rounded-sm
                    border
                    border-gray-300
                    bg-white
                    px-3
                    py-1.5
                    text-[10px]
                    font-semibold
                    text-gray-800
                    shadow-sm
                    transition-all
                    duration-200
                    hover:border-gray-400
                    hover:bg-gray-50
                    hover:text-gray-950
                    hover:shadow
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    sm:text-[11px]
                  "
                  onClick={generateBlogPostSummary}
                  disabled={isSummaryLoading}
                >
                  <LuSparkles
                    size={13}
                    className="
                      text-gray-600
                      transition-transform
                      duration-300
                      group-hover:rotate-12
                    "
                  />

                  {isSummaryLoading
                    ? "Generating summary..."
                    : "Summarize this post"}
                </button>
              </div>
            </header>

            {/* ================================================= */}
            {/* ARTICLE CONTENT */}
            {/* ================================================= */}

            <div className="mx-auto w-full md:w-[75%]">
              {/* COVER IMAGE */}

              <div
                className="
    group
    relative
    mb-8
    flex
    w-[85%]
    mx-auto
    cursor-zoom-in
    items-center
    justify-center
    overflow-hidden
    rounded-md
   
  "
                onClick={() => setIsImageViewerOpen(true)}
              >
                <img
                  src={blogPostData.coverImageUrl || ""}
                  alt={blogPostData.title}
                  className="
      block
      h-auto
      max-h-[650px]
      w-full
      object-contain
      transition-transform
      duration-700
      group-hover:scale-[1.015]
    "
                />

                <div
                  className="
      absolute
      inset-0
      flex
      items-center
      justify-center
      bg-black/0
      transition-all
      duration-300
      group-hover:bg-black/20
    "
                >
                  <div
                    className="
        flex
        scale-90
        items-center
        justify-center
        rounded-full
        bg-black/60
        p-3
        text-white
        opacity-0
        backdrop-blur-sm
        transition-all
        duration-300
        group-hover:scale-100
        group-hover:opacity-100
      "
                  >
                    <LuSearch size={22} />
                  </div>
                </div>
              </div>

              {/* CONTENT */}

              <div className="article-content">
                <MarkdownContent
                  content={sanitizeMarkdown(blogPostData?.content || "")}
                />
              </div>

              {/* SHARE / BOOKMARK */}

              <div
                className="
                  my-8
                  flex
                  items-center
                  justify-between
                  gap-3
                  border-y
                  border-gray-100
                  py-4
                "
              >
                <SharePost title={blogPostData.title} />

                <button
                  type="button"
                  onClick={handleBookmark}
                  className={`
                    inline-flex
                    cursor-pointer
                    items-center
                    gap-2
                    rounded-sm
                    border
                    px-3.5
                    py-2
                    text-xs
                    font-medium
                    transition-all
                    duration-200
                    ${
                      isBookmarked
                        ? "border-gray-800 bg-gray-900 text-white hover:bg-black"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  {isBookmarked ? (
                    <>
                      <LuBookmarkCheck size={15} />
                      Saved
                    </>
                  ) : (
                    <>
                      <LuBookmark size={15} />
                      Save
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ================================================= */}
            {/* COMMENTS */}
            {/* ================================================= */}

            <section ref={commentsSectionRef} className="mt-12 scroll-mt-24">
              <div className="mx-auto w-full">
                {/* COMMENTS HEADER */}

                <div
                  className="
                    mb-6
                    flex
                    items-end
                    justify-between
                    gap-3
                    border-b
                    border-gray-100
                    pb-4
                  "
                >
                  <div>
                    <h4
                      className="
                        text-xl
                        font-bold
                        tracking-tight
                        text-gray-950
                        sm:text-2xl
                      "
                    >
                      Discussion
                    </h4>

                    <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                      {comments?.length || 0}{" "}
                      {comments?.length === 1 ? "comment" : "comments"}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="
                      inline-flex
                      cursor-pointer
                      items-center
                      gap-2
                      rounded-sm
                      border
                      border-gray-200
                      bg-white
                      px-3
                      py-2
                      text-xs
                      font-medium
                      text-gray-700
                      shadow-sm
                      transition-all
                      duration-200
                      hover:border-gray-300
                      hover:bg-gray-50
                      hover:text-gray-950
                      sm:px-3.5
                      sm:text-sm
                    "
                    onClick={handleAddCommentClick}
                  >
                    <LuSend size={14} />

                    <span>Add Comment</span>
                  </button>
                </div>

                {/* NEW COMMENT INPUT */}

                {showReplyForm && (
                  <div className="mb-7">
                    <CommentReplyInput
                      user={user}
                      authorName={user.name}
                      content=""
                      handleAddReply={handleAddReply}
                      handleCancelReply={handleCancelReply}
                      disableAutoGen
                      type="new"
                    />
                  </div>
                )}

                {/* COMMENTS LIST */}

                {comments?.length > 0 ? (
                  <div className="space-y-2">
                    {comments.map((comment) => {
                      const commentPath = commentIdFromUrl
                        ? findCommentPath(comments, commentIdFromUrl)
                        : null;

                      const shouldAutoExpand =
                        commentPath?.includes(comment._id) || false;

                      return (
                        <CommentInfoCard
                          key={comment._id}
                          commentId={comment._id}
                          authorId={comment.author?._id}
                          authorName={comment.author?.name || "Deleted User"}
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
                          getAllComments={() =>
                            fetchCommentByPostId(blogPostData._id)
                          }
                          depth={0}
                          targetCommentId={commentIdFromUrl}
                          autoExpand={shouldAutoExpand}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div
                    className="
                      rounded-md
                      border
                      border-dashed
                      border-gray-200
                      bg-gray-50/70
                      px-4
                      py-12
                      text-center
                    "
                  >
                    <p className="text-sm font-medium text-gray-600">
                      No comments yet
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Be the first to start the discussion.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* LIKE / COMMENT BUTTON */}

            <LikeCommentButton
              postId={blogPostData._id || ""}
              likes={blogPostData.likes || 0}
              comments={comments?.length || 0}
              user={user}
              onCommentClick={handleAddCommentClick}
            />
          </div>

          {/* ================================================= */}
          {/* SIDEBAR */}
          {/* ================================================= */}

          <AnimatePresence>
            {!isSidebarCollapsed && (
              <>
                <motion.div
                  className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsSidebarCollapsed(true)}
                />

                <motion.div
                  className="
                    fixed
                    bottom-0
                    right-0
                    top-16
                    z-40
                    w-60
                    border-l
                    border-gray-200
                    bg-white
                    shadow-2xl
                    md:top-[68px]
                    md:w-80
                  "
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="h-full overflow-y-auto p-4">
                    <RecentPosts />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* ================================================= */}
        {/* SUMMARY DRAWER */}
        {/* ================================================= */}

        <Drawer
          isOpen={openSummarizeDrawer}
          onClose={() => {
            if (!isSummaryLoading) {
              setOpenSummarizeDrawer(false);
            }
          }}
          title={
            isSummaryLoading
              ? "Generating Summary"
              : summaryContent?.title || "Post Summary"
          }
        >
          {isSummaryLoading && <SkeletonLoader />}

          {!isSummaryLoading && errorMsg && (
            <div className="flex gap-2 text-sm font-medium text-amber-600">
              <LuCircleAlert className="mt-1 shrink-0" />

              <p>{errorMsg}</p>
            </div>
          )}

          {!isSummaryLoading && !errorMsg && summaryContent && (
            <MarkdownContent content={summaryContent.summary || ""} />
          )}
        </Drawer>

        {/* ================================================= */}
        {/* SIDEBAR TOGGLE */}
        {/* ================================================= */}

        <button
          type="button"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          aria-label={
            isSidebarCollapsed ? "Open recent posts" : "Close recent posts"
          }
          className="
            fixed
            right-0
            top-1/2
            z-50
            -translate-y-1/2
            cursor-pointer
            rounded-l-md
            border
            border-r-0
            border-gray-200
            bg-white
            px-1.5
            py-4
            text-gray-500
            shadow-md
            transition-all
            duration-200
            hover:bg-gray-50
            hover:text-gray-900
            hover:shadow-lg
            sm:px-2
          "
        >
          <LuChevronLeft
            size={18}
            className={`transition-transform duration-300 ${
              isSidebarCollapsed ? "" : "rotate-180"
            }`}
          />
        </button>
      </div>

      {/* ================================================= */}
      {/* IMAGE FULLSCREEN VIEWER */}
      {/* ================================================= */}

      {isImageViewerOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            cursor-zoom-out
            items-center
            justify-center
            bg-black/95
            p-3
            sm:p-5
          "
          onClick={() => setIsImageViewerOpen(false)}
        >
          <button
            type="button"
            aria-label="Close image viewer"
            onClick={(e) => {
              e.stopPropagation();

              setIsImageViewerOpen(false);
            }}
            className="
              absolute
              right-4
              top-4
              z-10
              cursor-pointer
              rounded-full
              bg-white/10
              p-2
              text-white
              transition
              hover:bg-white/20
              sm:right-5
              sm:top-5
            "
          >
            <LuX size={24} />
          </button>

          <img
            src={blogPostData.coverImageUrl || ""}
            alt={blogPostData.title}
            onClick={(e) => {
              e.stopPropagation();

              setIsImageViewerOpen(false);
            }}
            className="
              max-h-[90vh]
              max-w-full
              cursor-zoom-out
              rounded-sm
              object-contain
              sm:max-h-[92vh]
            "
          />
        </div>
      )}
    </BlogLayout>
  );
};

export default BlogPostView;
