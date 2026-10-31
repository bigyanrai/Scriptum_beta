// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   LuFileText,
// //   LuPlus,
// //   LuPencil,
// //   LuTrash2,
// //   LuEye,
// //   LuSend,
// //   LuClock3,
// //   LuArrowDownUp,
// // } from "react-icons/lu";
// // import toast from "react-hot-toast";

// // import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
// // import Modal from "../../components/Modal";
// // import DeleteAlertContent from "../../components/DeleteAlertContent";
// // import Pagination from "../../components/PaginationCollection";

// // import axiosInstance from "../../utils/axiosInstance";
// // import { API_PATHS } from "../../utils/apiPaths";
// // import BackButton from "../../components/BackButton";

// // const MyPosts = () => {
// //   const navigate = useNavigate();

// //   // ============================================================
// //   // POSTS
// //   // ============================================================

// //   const [posts, setPosts] = useState([]);

// //   const [loading, setLoading] = useState(true);

// //   // ============================================================
// //   // DELETE
// //   // ============================================================

// //   const [deleteLoading, setDeleteLoading] = useState(false);
// //   const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
// //   const [selectedPost, setSelectedPost] = useState(null);

// //   // ============================================================
// //   // FILTER
// //   // ============================================================

// //   const [filter, setFilter] = useState("all");

// //   // ============================================================
// //   // SORT
// //   // ============================================================

// //   const [sort, setSort] = useState("newest");

// //   // ============================================================
// //   // PAGINATION
// //   // ============================================================

// //   const [page, setPage] = useState(1);

// //   const postsPerPage = 10;

// //   const [pagination, setPagination] = useState({
// //     page: 1,
// //     limit: postsPerPage,
// //     totalPosts: 0,
// //     totalPages: 1,
// //     showingFrom: 0,
// //     showingTo: 0,
// //   });

// //   // ============================================================
// //   // SUMMARY COUNTS
// //   // ============================================================

// //   const [postCounts, setPostCounts] = useState({
// //     total: 0,
// //     published: 0,
// //     drafts: 0,
// //   });

// //   // ============================================================
// //   // FETCH MY POSTS
// //   // ============================================================

// //   const fetchMyPosts = async () => {
// //     try {
// //       setLoading(true);

// //       // ----------------------------------------------------------
// //       // Fetch the actual paginated posts
// //       // ----------------------------------------------------------

// //       const postsRequest = axiosInstance.get(API_PATHS.POSTS.GET_MY_POSTS, {
// //         params: {
// //           page,
// //           limit: postsPerPage,
// //           filter,
// //           sort,
// //         },
// //       });

// //       // ----------------------------------------------------------
// //       // Fetch accurate counts for summary
// //       //
// //       // limit=1 means we only retrieve one post while using
// //       // pagination.totalPosts to get the actual count.
// //       // ----------------------------------------------------------

// //       const totalRequest = axiosInstance.get(API_PATHS.POSTS.GET_MY_POSTS, {
// //         params: {
// //           page: 1,
// //           limit: 1,
// //           filter: "all",
// //           sort: "newest",
// //         },
// //       });

// //       const publishedRequest = axiosInstance.get(API_PATHS.POSTS.GET_MY_POSTS, {
// //         params: {
// //           page: 1,
// //           limit: 1,
// //           filter: "published",
// //           sort: "newest",
// //         },
// //       });

// //       const draftsRequest = axiosInstance.get(API_PATHS.POSTS.GET_MY_POSTS, {
// //         params: {
// //           page: 1,
// //           limit: 1,
// //           filter: "draft",
// //           sort: "newest",
// //         },
// //       });

// //       const [postsResponse, totalResponse, publishedResponse, draftsResponse] =
// //         await Promise.all([
// //           postsRequest,
// //           totalRequest,
// //           publishedRequest,
// //           draftsRequest,
// //         ]);

// //       // ----------------------------------------------------------
// //       // POSTS
// //       // ----------------------------------------------------------

// //       setPosts(postsResponse.data?.posts || []);

// //       // ----------------------------------------------------------
// //       // PAGINATION
// //       // ----------------------------------------------------------

// //       const backendPagination = postsResponse.data?.pagination;

// //       if (backendPagination) {
// //         setPagination(backendPagination);

// //         // If backend corrected the page because the requested page
// //         // no longer exists, keep the frontend page synchronized.
// //         if (backendPagination.page !== page) {
// //           setPage(backendPagination.page);
// //         }
// //       } else {
// //         setPagination({
// //           page: 1,
// //           limit: postsPerPage,
// //           totalPosts: 0,
// //           totalPages: 1,
// //           showingFrom: 0,
// //           showingTo: 0,
// //         });
// //       }

// //       // ----------------------------------------------------------
// //       // SUMMARY COUNTS
// //       // ----------------------------------------------------------

// //       setPostCounts({
// //         total: totalResponse.data?.pagination?.totalPosts || 0,

// //         published: publishedResponse.data?.pagination?.totalPosts || 0,

// //         drafts: draftsResponse.data?.pagination?.totalPosts || 0,
// //       });
// //     } catch (error) {
// //       console.error("Failed to fetch my posts:", error);

// //       toast.error(
// //         error?.response?.data?.message || "Failed to load your posts.",
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ============================================================
// //   // FETCH WHEN PAGE / FILTER / SORT CHANGES
// //   // ============================================================

// //   useEffect(() => {
// //     fetchMyPosts();
// //   }, [page, filter, sort]);

// //   // ============================================================
// //   // DELETE
// //   // ============================================================

// //   const handleDelete = async () => {
// //     if (!selectedPost?._id) return;

// //     try {
// //       setDeleteLoading(true);

// //       await axiosInstance.delete(API_PATHS.POSTS.DELETE(selectedPost._id));

// //       toast.success("Blog post deleted successfully.");

// //       setOpenDeleteAlert(false);
// //       setSelectedPost(null);

// //       // ----------------------------------------------------------
// //       // Refetch current page.
// //       //
// //       // If the deleted post was the last item on the last page,
// //       // the backend will return the previous valid page and our
// //       // fetch function will synchronize the page automatically.
// //       // ----------------------------------------------------------

// //       await fetchMyPosts();
// //     } catch (error) {
// //       console.error("Failed to delete post:", error);

// //       toast.error(
// //         error?.response?.data?.message || "Failed to delete blog post.",
// //       );
// //     } finally {
// //       setDeleteLoading(false);
// //     }
// //   };

// //   // ============================================================
// //   // FILTER CHANGE
// //   // ============================================================

// //   const handleFilterChange = (newFilter) => {
// //     if (newFilter === filter) return;

// //     setFilter(newFilter);
// //     setPage(1);
// //   };

// //   // ============================================================
// //   // SORT CHANGE
// //   // ============================================================

// //   const handleSortChange = (event) => {
// //     setSort(event.target.value);
// //     setPage(1);
// //   };

// //   // ============================================================
// //   // DATE
// //   // ============================================================

// //   const formatDate = (date) => {
// //     if (!date) return "";

// //     return new Date(date).toLocaleDateString("en-US", {
// //       month: "short",
// //       day: "numeric",
// //       year: "numeric",
// //     });
// //   };

// //   // ============================================================
// //   // LOADING
// //   // ============================================================

// //   if (loading) {
// //     return (
// //       <BlogLayout activeMenu="My Posts">
// //         <div className="mx-auto w-full py-8">
// //           <div className="animate-pulse space-y-4">
// //             {/* HEADER */}

// //             <div className="h-8 w-40 rounded bg-slate-200" />

// //             <div className="h-4 w-72 rounded bg-slate-200" />

// //             {/* SUMMARY */}

// //             <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
// //               {[1, 2, 3].map((item) => (
// //                 <div
// //                   key={item}
// //                   className="h-20 rounded-sm border border-slate-200 bg-slate-100"
// //                 />
// //               ))}
// //             </div>

// //             {/* FILTER */}

// //             <div className="h-12 rounded-sm bg-slate-100" />

// //             {/* POSTS */}

// //             {[1, 2, 3].map((item) => (
// //               <div
// //                 key={item}
// //                 className="h-28 rounded-sm border border-slate-200 bg-slate-100"
// //               />
// //             ))}
// //           </div>
// //         </div>
// //       </BlogLayout>
// //     );
// //   }

// //   return (
// //     <BlogLayout activeMenu="My Posts">
// //       <div className="mx-auto w-full">
// //         {/* =====================================================
// //             HEADER
// //         ===================================================== */}

// //         <BackButton />

// //         <section className="mb-7">
// //           <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
// //             <div>
// //               <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
// //                 Your writing
// //               </p>

// //               <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
// //                 My Posts
// //               </h1>

// //               <p className="mt-2 text-gray-500">
// //                 Manage your published articles and unfinished drafts.
// //               </p>
// //             </div>

// //             <button
// //               type="button"
// //               onClick={() => navigate("/posts/create")}
// //               className="inline-flex items-center justify-center gap-2 rounded-sm bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
// //             >
// //               <LuPlus size={16} />
// //               Create Post
// //             </button>
// //           </div>
// //         </section>

// //         {/* =====================================================
// //             SUMMARY
// //         ===================================================== */}

// //         <div className="mb-5 grid grid-cols-3 gap-2 sm:gap-3">
// //           <div className="rounded-sm border border-slate-200 bg-white px-4 py-3">
// //             <p className="text-xs text-slate-400">Total</p>

// //             <p className="mt-1 text-xl font-bold text-slate-900">
// //               {postCounts.total}
// //             </p>
// //           </div>

// //           <div className="rounded-sm border border-slate-200 bg-white px-4 py-3">
// //             <p className="text-xs text-slate-400">Published</p>

// //             <p className="mt-1 text-xl font-bold text-slate-900">
// //               {postCounts.published}
// //             </p>
// //           </div>

// //           <div className="rounded-sm border border-slate-200 bg-white px-4 py-3">
// //             <p className="text-xs text-slate-400">Drafts</p>

// //             <p className="mt-1 text-xl font-bold text-slate-900">
// //               {postCounts.drafts}
// //             </p>
// //           </div>
// //         </div>

// //         {/* =====================================================
// //             FILTER + SORT
// //         ===================================================== */}

// //         <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
// //           {/* FILTER */}

// //           <div className="flex items-center gap-1 overflow-x-auto rounded-sm border border-slate-200 bg-slate-50 p-1">
// //             {[
// //               {
// //                 key: "all",
// //                 label: "All",
// //                 count: postCounts.total,
// //               },
// //               {
// //                 key: "published",
// //                 label: "Published",
// //                 count: postCounts.published,
// //               },
// //               {
// //                 key: "draft",
// //                 label: "Drafts",
// //                 count: postCounts.drafts,
// //               },
// //             ].map((item) => (
// //               <button
// //                 key={item.key}
// //                 type="button"
// //                 onClick={() => handleFilterChange(item.key)}
// //                 className={`shrink-0 rounded-sm px-3 py-2 text-xs font-semibold transition ${
// //                   filter === item.key
// //                     ? "bg-white text-slate-900 shadow-sm"
// //                     : "text-slate-500 hover:text-slate-800"
// //                 }`}
// //               >
// //                 {item.label}

// //                 <span className="ml-1.5 text-slate-400">{item.count}</span>
// //               </button>
// //             ))}
// //           </div>

// //           {/* SORT */}

// //           <div className="relative shrink-0">
// //             <LuArrowDownUp
// //               size={14}
// //               className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
// //             />

// //             <select
// //               value={sort}
// //               onChange={handleSortChange}
// //               className="w-full appearance-none rounded-sm border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-xs font-semibold text-slate-700 outline-none transition hover:border-slate-300 focus:border-slate-400 sm:w-44"
// //             >
// //               <option value="newest">Newest</option>

// //               <option value="oldest">Oldest</option>

// //               <option value="updated">Recently Updated</option>

// //               <option value="mostViewed">Most Viewed</option>

// //               <option value="mostLiked">Most Liked</option>

// //               <option value="titleAZ">Title A–Z</option>

// //               <option value="titleZA">Title Z–A</option>
// //             </select>

// //             <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
// //               ▾
// //             </span>
// //           </div>
// //         </div>

// //         {/* =====================================================
// //             SHOWING INFO
// //         ===================================================== */}

// //         {pagination.totalPosts > 0 && (
// //           <div className="mb-3 flex items-center justify-between">
// //             <p className="text-xs text-slate-400">
// //               Showing{" "}
// //               <span className="font-medium text-slate-600">
// //                 {pagination.showingFrom}–{pagination.showingTo}
// //               </span>{" "}
// //               of{" "}
// //               <span className="font-medium text-slate-600">
// //                 {pagination.totalPosts}
// //               </span>
// //             </p>

// //             <p className="text-xs text-slate-400">
// //               Page{" "}
// //               <span className="font-medium text-slate-600">
// //                 {pagination.page}
// //               </span>{" "}
// //               of{" "}
// //               <span className="font-medium text-slate-600">
// //                 {pagination.totalPages}
// //               </span>
// //             </p>
// //           </div>
// //         )}

// //         {/* =====================================================
// //             EMPTY STATE
// //         ===================================================== */}

// //         {posts.length === 0 ? (
// //           <div className="rounded-sm border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
// //             <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm bg-slate-100">
// //               <LuFileText size={20} className="text-slate-400" />
// //             </div>

// //             <h3 className="mt-4 text-sm font-semibold text-slate-800">
// //               {filter === "draft"
// //                 ? "No drafts yet"
// //                 : filter === "published"
// //                   ? "No published posts yet"
// //                   : "You haven't written anything yet"}
// //             </h3>

// //             <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
// //               Start writing your first article and share your ideas with the
// //               InkNest community.
// //             </p>

// //             <button
// //               type="button"
// //               onClick={() => navigate("/posts/create")}
// //               className="mt-5 inline-flex items-center gap-2 rounded-sm bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700"
// //             >
// //               <LuPlus size={14} />
// //               Create your first post
// //             </button>
// //           </div>
// //         ) : (
// //           /* ===================================================
// //              POSTS
// //           =================================================== */

// //           <div className="space-y-3">
// //             {posts.map((post) => (
// //               <article
// //                 key={post._id}
// //                 className="group rounded-sm border border-slate-200 bg-white p-1 transition hover:border-slate-300 hover:shadow-sm"
// //               >
// //                 <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
// //                   {/* COVER */}

// //                   <div className="h-24 w-full shrink-0 overflow-hidden rounded-sm bg-slate-100 sm:h-20 sm:w-32">
// //                     {post.coverImageUrl ? (
// //                       <img
// //                         src={post.coverImageUrl}
// //                         alt={post.title}
// //                         className="h-full w-full object-cover"
// //                       />
// //                     ) : (
// //                       <div className="flex h-full w-full items-center justify-center">
// //                         <LuFileText size={22} className="text-slate-300" />
// //                       </div>
// //                     )}
// //                   </div>

// //                   {/* CONTENT */}

// //                   <div className="min-w-0 flex-1">
// //                     <div className="mb-2 flex flex-wrap items-center gap-2">
// //                       <span
// //                         className={`inline-flex items-center gap-1 rounded-sm px-2 py-1 text-[10px] font-semibold ${
// //                           post.isDraft
// //                             ? "bg-amber-50 text-amber-700"
// //                             : "bg-emerald-50 text-emerald-700"
// //                         }`}
// //                       >
// //                         {post.isDraft ? (
// //                           <LuClock3 size={10} />
// //                         ) : (
// //                           <LuSend size={10} />
// //                         )}

// //                         {post.isDraft ? "Draft" : "Published"}
// //                       </span>

// //                       <span className="text-[11px] text-slate-400">
// //                         {formatDate(post.updatedAt || post.createdAt)}
// //                       </span>
// //                     </div>

// //                     <h2 className="truncate text-sm font-semibold text-slate-900 sm:text-base">
// //                       {post.title || "Untitled Post"}
// //                     </h2>

// //                     <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400">
// //                       <span className="inline-flex items-center gap-1">
// //                         <LuEye size={12} />
// //                         {post.views || 0}
// //                       </span>

// //                       <span>{post.likes || 0} likes</span>
// //                     </div>
// //                   </div>

// //                   {/* ACTIONS */}

// //                   <div className="flex shrink-0 items-center gap-2 border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
// //                     {!post.isDraft && (
// //                       <button
// //                         type="button"
// //                         onClick={() => navigate(`/${post.slug}`)}
// //                         className="inline-flex items-center gap-1.5 rounded-sm border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
// //                       >
// //                         <LuEye size={13} />
// //                         View
// //                       </button>
// //                     )}

// //                     <button
// //                       type="button"
// //                       onClick={() => navigate(`/posts/edit/${post._id}`)}
// //                       className="inline-flex items-center gap-1.5 rounded-sm border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
// //                     >
// //                       <LuPencil size={13} />
// //                       Edit
// //                     </button>

// //                     <button
// //                       type="button"
// //                       onClick={() => {
// //                         setSelectedPost(post);
// //                         setOpenDeleteAlert(true);
// //                       }}
// //                       className="inline-flex items-center justify-center rounded-sm border border-rose-200 px-2.5 py-2 text-rose-600 transition hover:bg-rose-50"
// //                     >
// //                       <LuTrash2 size={14} />
// //                     </button>
// //                   </div>
// //                 </div>
// //               </article>
// //             ))}
// //           </div>
// //         )}

// //         {/* =====================================================
// //             PAGINATION
// //         ===================================================== */}

// //         {pagination.totalPosts > 0 && pagination.totalPages > 1 && (
// //           <Pagination
// //             page={pagination.page}
// //             totalPages={pagination.totalPages}
// //             onPageChange={setPage}
// //           />
// //         )}
// //       </div>

// //       {/* =======================================================
// //           DELETE MODAL
// //       ======================================================= */}

// //       <Modal
// //         isOpen={openDeleteAlert}
// //         onClose={() => {
// //           if (!deleteLoading) {
// //             setOpenDeleteAlert(false);
// //             setSelectedPost(null);
// //           }
// //         }}
// //         title="Delete Blog Post"
// //       >
// //         <div className="w-full max-w-lg p-2">
// //           <DeleteAlertContent
// //             type="post"
// //             loading={deleteLoading}
// //             danger="true"
// //             content="Are you sure you want to permanently delete this blog post? This action cannot be undone."
// //             onDelete={handleDelete}
// //           />
// //         </div>
// //       </Modal>
// //     </BlogLayout>
// //   );
// // };

// // export default MyPosts;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   LuFileText,
//   LuPlus,
//   LuPencil,
//   LuTrash2,
//   LuEye,
//   LuSend,
//   LuClock3,
//   LuArrowDownUp,
//   LuCheck,
// } from "react-icons/lu";
// import toast from "react-hot-toast";

// import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
// import Modal from "../../components/Modal";
// import DeleteAlertContent from "../../components/DeleteAlertContent";
// import Pagination from "../../components/PaginationCollection";

// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import BackButton from "../../components/BackButton";

// const MyPosts = () => {
//   const navigate = useNavigate();

//   // ============================================================
//   // POSTS
//   // ============================================================

//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ============================================================
//   // DELETE - SINGLE
//   // ============================================================

//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
//   const [selectedPost, setSelectedPost] = useState(null);

//   // ============================================================
//   // DELETE - MULTIPLE
//   // ============================================================

//   const [selectedPostIds, setSelectedPostIds] = useState([]);
//   const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);
//   const [openBulkDeleteAlert, setOpenBulkDeleteAlert] = useState(false);

//   // ============================================================
//   // FILTER
//   // ============================================================

//   const [filter, setFilter] = useState("all");

//   // ============================================================
//   // SORT
//   // ============================================================

//   const [sort, setSort] = useState("newest");

//   // ============================================================
//   // PAGINATION
//   // ============================================================

//   const [page, setPage] = useState(1);

//   const postsPerPage = 10;

//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: postsPerPage,
//     totalPosts: 0,
//     totalPages: 1,
//     showingFrom: 0,
//     showingTo: 0,
//   });

//   // ============================================================
//   // SUMMARY COUNTS
//   // ============================================================

//   const [postCounts, setPostCounts] = useState({
//     total: 0,
//     published: 0,
//     drafts: 0,
//   });

//   // ============================================================
//   // FETCH MY POSTS
//   // ============================================================

//   const fetchMyPosts = async () => {
//     try {
//       setLoading(true);

//       // ----------------------------------------------------------
//       // Fetch actual paginated posts
//       // ----------------------------------------------------------

//       const postsRequest = axiosInstance.get(API_PATHS.POSTS.GET_MY_POSTS, {
//         params: {
//           page,
//           limit: postsPerPage,
//           filter,
//           sort,
//         },
//       });

//       // ----------------------------------------------------------
//       // Fetch accurate counts for summary
//       // ----------------------------------------------------------

//       const totalRequest = axiosInstance.get(API_PATHS.POSTS.GET_MY_POSTS, {
//         params: {
//           page: 1,
//           limit: 1,
//           filter: "all",
//           sort: "newest",
//         },
//       });

//       const publishedRequest = axiosInstance.get(API_PATHS.POSTS.GET_MY_POSTS, {
//         params: {
//           page: 1,
//           limit: 1,
//           filter: "published",
//           sort: "newest",
//         },
//       });

//       const draftsRequest = axiosInstance.get(API_PATHS.POSTS.GET_MY_POSTS, {
//         params: {
//           page: 1,
//           limit: 1,
//           filter: "draft",
//           sort: "newest",
//         },
//       });

//       const [postsResponse, totalResponse, publishedResponse, draftsResponse] =
//         await Promise.all([
//           postsRequest,
//           totalRequest,
//           publishedRequest,
//           draftsRequest,
//         ]);

//       // ----------------------------------------------------------
//       // POSTS
//       // ----------------------------------------------------------

//       setPosts(postsResponse.data?.posts || []);

//       // ----------------------------------------------------------
//       // PAGINATION
//       // ----------------------------------------------------------

//       const backendPagination = postsResponse.data?.pagination;

//       if (backendPagination) {
//         setPagination(backendPagination);

//         // If backend corrected the page because the requested
//         // page no longer exists, synchronize frontend page.
//         if (backendPagination.page !== page) {
//           setPage(backendPagination.page);
//         }
//       } else {
//         setPagination({
//           page: 1,
//           limit: postsPerPage,
//           totalPosts: 0,
//           totalPages: 1,
//           showingFrom: 0,
//           showingTo: 0,
//         });
//       }

//       // ----------------------------------------------------------
//       // SUMMARY COUNTS
//       // ----------------------------------------------------------

//       setPostCounts({
//         total: totalResponse.data?.pagination?.totalPosts || 0,

//         published: publishedResponse.data?.pagination?.totalPosts || 0,

//         drafts: draftsResponse.data?.pagination?.totalPosts || 0,
//       });
//     } catch (error) {
//       console.error("Failed to fetch my posts:", error);

//       toast.error(
//         error?.response?.data?.message || "Failed to load your posts.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================================================
//   // FETCH WHEN PAGE / FILTER / SORT CHANGES
//   // ============================================================

//   useEffect(() => {
//     fetchMyPosts();
//   }, [page, filter, sort]);

//   // ============================================================
//   // CLEAR SELECTION WHEN PAGE / FILTER / SORT CHANGES
//   // ============================================================

//   useEffect(() => {
//     setSelectedPostIds([]);
//   }, [page, filter, sort]);

//   // ============================================================
//   // SELECT / UNSELECT SINGLE POST
//   // ============================================================

//   const handleSelectPost = (postId) => {
//     setSelectedPostIds((prev) => {
//       if (prev.includes(postId)) {
//         return prev.filter((id) => id !== postId);
//       }

//       return [...prev, postId];
//     });
//   };

//   // ============================================================
//   // SELECT / UNSELECT ALL POSTS ON CURRENT PAGE
//   // ============================================================

//   const handleSelectAll = () => {
//     const currentPageIds = posts.map((post) => post._id);

//     const allSelected =
//       currentPageIds.length > 0 &&
//       currentPageIds.every((id) => selectedPostIds.includes(id));

//     if (allSelected) {
//       setSelectedPostIds((prev) =>
//         prev.filter((id) => !currentPageIds.includes(id)),
//       );
//     } else {
//       setSelectedPostIds((prev) => [...new Set([...prev, ...currentPageIds])]);
//     }
//   };

//   // ============================================================
//   // CURRENT PAGE SELECTION STATE
//   // ============================================================

//   const isAllCurrentPageSelected =
//     posts.length > 0 &&
//     posts.every((post) => selectedPostIds.includes(post._id));

//   const isSomeCurrentPageSelected =
//     posts.some((post) => selectedPostIds.includes(post._id)) &&
//     !isAllCurrentPageSelected;

//   // ============================================================
//   // DELETE SINGLE POST
//   // ============================================================

//   const handleDelete = async () => {
//     if (!selectedPost?._id) return;

//     try {
//       setDeleteLoading(true);

//       await axiosInstance.delete(API_PATHS.POSTS.DELETE(selectedPost._id));

//       toast.success("Blog post deleted successfully.");

//       setOpenDeleteAlert(false);
//       setSelectedPost(null);

//       // Refetch current page.
//       await fetchMyPosts();
//     } catch (error) {
//       console.error("Failed to delete post:", error);

//       toast.error(
//         error?.response?.data?.message || "Failed to delete blog post.",
//       );
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   // ============================================================
//   // DELETE MULTIPLE POSTS
//   // ============================================================

//   const handleBulkDelete = async () => {
//     if (selectedPostIds.length === 0) return;

//     try {
//       setBulkDeleteLoading(true);

//       const response = await axiosInstance.delete(
//         API_PATHS.POSTS.DELETE_MULTIPLE,
//         {
//           data: {
//             postIds: selectedPostIds,
//           },
//         },
//       );

//       toast.success(
//         response.data?.message || "Selected posts deleted successfully.",
//       );

//       setSelectedPostIds([]);
//       setOpenBulkDeleteAlert(false);

//       // Refetch posts and update counts.
//       await fetchMyPosts();
//     } catch (error) {
//       console.error("Failed to delete selected posts:", error);

//       toast.error(
//         error?.response?.data?.message || "Failed to delete selected posts.",
//       );
//     } finally {
//       setBulkDeleteLoading(false);
//     }
//   };

//   // ============================================================
//   // FILTER CHANGE
//   // ============================================================

//   const handleFilterChange = (newFilter) => {
//     if (newFilter === filter) return;

//     setFilter(newFilter);
//     setPage(1);
//   };

//   // ============================================================
//   // SORT CHANGE
//   // ============================================================

//   const handleSortChange = (event) => {
//     setSort(event.target.value);
//     setPage(1);
//   };

//   // ============================================================
//   // DATE
//   // ============================================================

//   const formatDate = (date) => {
//     if (!date) return "";

//     return new Date(date).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   // ============================================================
//   // LOADING
//   // ============================================================

//   if (loading) {
//     return (
//       <BlogLayout activeMenu="My Posts">
//         <div className="mx-auto w-full py-8">
//           <div className="animate-pulse space-y-4">
//             {/* HEADER */}

//             <div className="h-8 w-40 rounded bg-slate-200" />

//             <div className="h-4 w-72 rounded bg-slate-200" />

//             {/* SUMMARY */}

//             <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
//               {[1, 2, 3].map((item) => (
//                 <div
//                   key={item}
//                   className="h-20 rounded-sm border border-slate-200 bg-slate-100"
//                 />
//               ))}
//             </div>

//             {/* FILTER */}

//             <div className="h-12 rounded-sm bg-slate-100" />

//             {/* POSTS */}

//             {[1, 2, 3].map((item) => (
//               <div
//                 key={item}
//                 className="h-28 rounded-sm border border-slate-200 bg-slate-100"
//               />
//             ))}
//           </div>
//         </div>
//       </BlogLayout>
//     );
//   }

//   // ============================================================
//   // MAIN
//   // ============================================================

//   return (
//     <BlogLayout activeMenu="My Posts">
//       <div className="mx-auto w-full">
//         {/* =====================================================
//             HEADER
//         ===================================================== */}

//         <BackButton />

//         <section className="mb-7">
//           <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
//             <div>
//               <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
//                 Your writing
//               </p>

//               <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//                 My Posts
//               </h1>

//               <p className="mt-2 text-gray-500">
//                 Manage your published articles and unfinished drafts.
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={() => navigate("/posts/create")}
//               className="inline-flex items-center justify-center gap-2 rounded-sm bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
//             >
//               <LuPlus size={16} />
//               Create Post
//             </button>
//           </div>
//         </section>

//         {/* =====================================================
//             SUMMARY
//         ===================================================== */}

//         <div className="mb-5 grid grid-cols-3 gap-2 sm:gap-3">
//           <div className="rounded-sm border border-slate-200 bg-white px-4 py-3">
//             <p className="text-xs text-slate-400">Total</p>

//             <p className="mt-1 text-xl font-bold text-slate-900">
//               {postCounts.total}
//             </p>
//           </div>

//           <div className="rounded-sm border border-slate-200 bg-white px-4 py-3">
//             <p className="text-xs text-slate-400">Published</p>

//             <p className="mt-1 text-xl font-bold text-slate-900">
//               {postCounts.published}
//             </p>
//           </div>

//           <div className="rounded-sm border border-slate-200 bg-white px-4 py-3">
//             <p className="text-xs text-slate-400">Drafts</p>

//             <p className="mt-1 text-xl font-bold text-slate-900">
//               {postCounts.drafts}
//             </p>
//           </div>
//         </div>

//         {/* =====================================================
//             BULK SELECTION BAR
//         ===================================================== */}

//         {selectedPostIds.length > 0 && (
//           <div className="mb-4 flex flex-col gap-3 rounded-sm border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex h-7 min-w-7 items-center justify-center rounded-sm bg-slate-900 px-2 text-xs font-semibold text-white">
//                 {selectedPostIds.length}
//               </div>

//               <span className="text-xs font-semibold text-slate-700">
//                 {selectedPostIds.length === 1
//                   ? "post selected"
//                   : "posts selected"}
//               </span>

//               <button
//                 type="button"
//                 onClick={() => setSelectedPostIds([])}
//                 className="text-xs font-medium text-slate-400 transition hover:text-slate-700"
//               >
//                 Clear
//               </button>
//             </div>

//             <button
//               type="button"
//               onClick={() => setOpenBulkDeleteAlert(true)}
//               className="inline-flex items-center justify-center gap-2 rounded-sm bg-rose-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-rose-700"
//             >
//               <LuTrash2 size={14} />
//               Delete selected
//             </button>
//           </div>
//         )}

//         {/* =====================================================
//             FILTER + SORT
//         ===================================================== */}

//         <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           {/* FILTER + SELECT ALL */}

//           <div className="flex min-w-0 items-center gap-2">
//             {/* SELECT ALL */}

//             <label className="flex shrink-0 cursor-pointer items-center gap-2 rounded-sm border border-slate-200 bg-white px-3 py-2">
//               <input
//                 type="checkbox"
//                 checked={isAllCurrentPageSelected}
//                 ref={(element) => {
//                   if (element) {
//                     element.indeterminate = isSomeCurrentPageSelected;
//                   }
//                 }}
//                 onChange={handleSelectAll}
//                 className="h-4 w-4 cursor-pointer rounded border-slate-300 text-slate-900 focus:ring-slate-500"
//                 aria-label="Select all posts on this page"
//               />

//               <span className="text-xs font-semibold text-slate-600">
//                 Select all
//               </span>
//             </label>

//             {/* FILTER */}

//             <div className="flex min-w-0 items-center gap-1 overflow-x-auto rounded-sm border border-slate-200 bg-slate-50 p-1">
//               {[
//                 {
//                   key: "all",
//                   label: "All",
//                   count: postCounts.total,
//                 },
//                 {
//                   key: "published",
//                   label: "Published",
//                   count: postCounts.published,
//                 },
//                 {
//                   key: "draft",
//                   label: "Drafts",
//                   count: postCounts.drafts,
//                 },
//               ].map((item) => (
//                 <button
//                   key={item.key}
//                   type="button"
//                   onClick={() => handleFilterChange(item.key)}
//                   className={`shrink-0 rounded-sm px-3 py-2 text-xs font-semibold transition ${
//                     filter === item.key
//                       ? "bg-white text-slate-900 shadow-sm"
//                       : "text-slate-500 hover:text-slate-800"
//                   }`}
//                 >
//                   {item.label}

//                   <span className="ml-1.5 text-slate-400">{item.count}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* SORT */}

//           <div className="relative shrink-0">
//             <LuArrowDownUp
//               size={14}
//               className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//             />

//             <select
//               value={sort}
//               onChange={handleSortChange}
//               className="w-full appearance-none rounded-sm border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-xs font-semibold text-slate-700 outline-none transition hover:border-slate-300 focus:border-slate-400 sm:w-44"
//             >
//               <option value="newest">Newest</option>

//               <option value="oldest">Oldest</option>

//               <option value="updated">Recently Updated</option>

//               <option value="mostViewed">Most Viewed</option>

//               <option value="mostLiked">Most Liked</option>

//               <option value="titleAZ">Title A–Z</option>

//               <option value="titleZA">Title Z–A</option>
//             </select>

//             <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
//               ▾
//             </span>
//           </div>
//         </div>

//         {/* =====================================================
//             SHOWING INFO
//         ===================================================== */}

//         {pagination.totalPosts > 0 && (
//           <div className="mb-3 flex items-center justify-between">
//             <p className="text-xs text-slate-400">
//               Showing{" "}
//               <span className="font-medium text-slate-600">
//                 {pagination.showingFrom}–{pagination.showingTo}
//               </span>{" "}
//               of{" "}
//               <span className="font-medium text-slate-600">
//                 {pagination.totalPosts}
//               </span>
//             </p>

//             <p className="text-xs text-slate-400">
//               Page{" "}
//               <span className="font-medium text-slate-600">
//                 {pagination.page}
//               </span>{" "}
//               of{" "}
//               <span className="font-medium text-slate-600">
//                 {pagination.totalPages}
//               </span>
//             </p>
//           </div>
//         )}

//         {/* =====================================================
//             EMPTY STATE
//         ===================================================== */}

//         {posts.length === 0 ? (
//           <div className="rounded-sm border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
//             <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm bg-slate-100">
//               <LuFileText size={20} className="text-slate-400" />
//             </div>

//             <h3 className="mt-4 text-sm font-semibold text-slate-800">
//               {filter === "draft"
//                 ? "No drafts yet"
//                 : filter === "published"
//                   ? "No published posts yet"
//                   : "You haven't written anything yet"}
//             </h3>

//             <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
//               Start writing your first article and share your ideas with the
//               InkNest community.
//             </p>

//             <button
//               type="button"
//               onClick={() => navigate("/posts/create")}
//               className="mt-5 inline-flex items-center gap-2 rounded-sm bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700"
//             >
//               <LuPlus size={14} />
//               Create your first post
//             </button>
//           </div>
//         ) : (
//           /* ===================================================
//              POSTS
//           =================================================== */

//           <div className="space-y-3">
//             {posts.map((post) => {
//               const isSelected = selectedPostIds.includes(post._id);

//               return (
//                 <article
//                   key={post._id}
//                   className={`group rounded-sm border bg-white p-1 transition hover:shadow-sm ${
//                     isSelected
//                       ? "border-slate-400 shadow-sm"
//                       : "border-slate-200 hover:border-slate-300"
//                   }`}
//                 >
//                   <div className="flex items-start gap-2 sm:gap-3">
//                     {/* =================================================
//                         CHECKBOX
//                     ================================================= */}

//                     <div className="flex shrink-0 items-center pt-2 pl-2">
//                       <label className="cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={isSelected}
//                           onChange={() => handleSelectPost(post._id)}
//                           className="peer sr-only"
//                           aria-label={`Select ${post.title || "post"}`}
//                         />

//                         <span
//                           className={`flex h-5 w-5 items-center justify-center rounded-sm border transition ${
//                             isSelected
//                               ? "border-slate-900 bg-slate-900 text-white"
//                               : "border-slate-300 bg-white text-transparent hover:border-slate-500"
//                           }`}
//                         >
//                           <LuCheck size={13} strokeWidth={3} />
//                         </span>
//                       </label>
//                     </div>

//                     {/* =================================================
//                         POST CONTENT
//                     ================================================= */}

//                     <div className="min-w-0 flex-1">
//                       <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
//                         {/* COVER */}

//                         <div className="h-24 w-full shrink-0 overflow-hidden rounded-sm bg-slate-100 sm:h-20 sm:w-32">
//                           {post.coverImageUrl ? (
//                             <img
//                               src={post.coverImageUrl}
//                               alt={post.title}
//                               className="h-full w-full object-cover"
//                             />
//                           ) : (
//                             <div className="flex h-full w-full items-center justify-center">
//                               <LuFileText
//                                 size={22}
//                                 className="text-slate-300"
//                               />
//                             </div>
//                           )}
//                         </div>

//                         {/* CONTENT */}

//                         <div className="min-w-0 flex-1">
//                           <div className="mb-2 flex flex-wrap items-center gap-2">
//                             <span
//                               className={`inline-flex items-center gap-1 rounded-sm px-2 py-1 text-[10px] font-semibold ${
//                                 post.isDraft
//                                   ? "bg-amber-50 text-amber-700"
//                                   : "bg-emerald-50 text-emerald-700"
//                               }`}
//                             >
//                               {post.isDraft ? (
//                                 <LuClock3 size={10} />
//                               ) : (
//                                 <LuSend size={10} />
//                               )}

//                               {post.isDraft ? "Draft" : "Published"}
//                             </span>

//                             <span className="text-[11px] text-slate-400">
//                               {formatDate(post.updatedAt || post.createdAt)}
//                             </span>
//                           </div>

//                           <h2 className="truncate text-sm font-semibold text-slate-900 sm:text-base">
//                             {post.title || "Untitled Post"}
//                           </h2>

//                           <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400">
//                             <span className="inline-flex items-center gap-1">
//                               <LuEye size={12} />
//                               {post.views || 0}
//                             </span>

//                             <span>{post.likes || 0} likes</span>
//                           </div>
//                         </div>

//                         {/* ACTIONS */}

//                         <div className="flex shrink-0 items-center gap-2 border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
//                           {!post.isDraft && (
//                             <button
//                               type="button"
//                               onClick={() => navigate(`/${post.slug}`)}
//                               className="inline-flex items-center gap-1.5 rounded-sm border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
//                             >
//                               <LuEye size={13} />
//                               View
//                             </button>
//                           )}

//                           <button
//                             type="button"
//                             onClick={() => navigate(`/posts/edit/${post._id}`)}
//                             className="inline-flex items-center gap-1.5 rounded-sm border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
//                           >
//                             <LuPencil size={13} />
//                             Edit
//                           </button>

//                           <button
//                             type="button"
//                             onClick={() => {
//                               setSelectedPost(post);
//                               setOpenDeleteAlert(true);
//                             }}
//                             className="inline-flex items-center justify-center rounded-sm border border-rose-200 px-2.5 py-2 text-rose-600 transition hover:bg-rose-50"
//                             aria-label={`Delete ${post.title || "post"}`}
//                           >
//                             <LuTrash2 size={14} />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </article>
//               );
//             })}
//           </div>
//         )}

//         {/* =====================================================
//             PAGINATION
//         ===================================================== */}

//         {pagination.totalPosts > 0 && pagination.totalPages > 1 && (
//           <Pagination
//             page={pagination.page}
//             totalPages={pagination.totalPages}
//             onPageChange={setPage}
//           />
//         )}
//       </div>

//       {/* =======================================================
//           SINGLE DELETE MODAL
//       ======================================================= */}

//       <Modal
//         isOpen={openDeleteAlert}
//         onClose={() => {
//           if (!deleteLoading) {
//             setOpenDeleteAlert(false);
//             setSelectedPost(null);
//           }
//         }}
//         title="Delete Blog Post"
//       >
//         <div className="w-full max-w-lg p-2">
//           <DeleteAlertContent
//             type="post"
//             loading={deleteLoading}
//             danger="true"
//             content="Are you sure you want to permanently delete this blog post? This action cannot be undone."
//             onDelete={handleDelete}
//           />
//         </div>
//       </Modal>

//       {/* =======================================================
//           BULK DELETE MODAL
//       ======================================================= */}

//       <Modal
//         isOpen={openBulkDeleteAlert}
//         onClose={() => {
//           if (!bulkDeleteLoading) {
//             setOpenBulkDeleteAlert(false);
//           }
//         }}
//         title="Delete Selected Posts"
//       >
//         <div className="w-full max-w-lg p-2">
//           <DeleteAlertContent
//             type="post"
//             loading={bulkDeleteLoading}
//             danger="true"
//             content={`Are you sure you want to permanently delete ${
//               selectedPostIds.length
//             } selected post${
//               selectedPostIds.length === 1 ? "" : "s"
//             }? This action cannot be undone.`}
//             onDelete={handleBulkDelete}
//           />
//         </div>
//       </Modal>
//     </BlogLayout>
//   );
// };

// export default MyPosts;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuFileText,
  LuPlus,
  LuPencil,
  LuTrash2,
  LuEye,
  LuSend,
  LuClock3,
  LuArrowDownUp,
  LuCheck,
  LuSearch,
  LuX,
} from "react-icons/lu";
import toast from "react-hot-toast";

import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
import Modal from "../../components/Modal";
import DeleteAlertContent from "../../components/DeleteAlertContent";
import Pagination from "../../components/PaginationCollection";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import BackButton from "../../components/BackButton";
import BlogSidebar from "../../components/layouts/BlogLayout/BlogSidebar";

const MyPosts = () => {
  const navigate = useNavigate();

  // ============================================================
  // POSTS
  // ============================================================

  const [posts, setPosts] = useState([]);

  // ============================================================
  // LOADING
  // ============================================================

  const [isLoading, setIsLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  // ============================================================
  // SEARCH
  // ============================================================

  const [searchQuery, setSearchQuery] = useState("");

  // ============================================================
  // DELETE - SINGLE
  // ============================================================

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // ============================================================
  // DELETE - MULTIPLE
  // ============================================================

  const [selectedPostIds, setSelectedPostIds] = useState([]);
  const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);
  const [openBulkDeleteAlert, setOpenBulkDeleteAlert] = useState(false);

  // ============================================================
  // FILTER
  // ============================================================

  const [filter, setFilter] = useState("all");

  // ============================================================
  // SORT
  // ============================================================

  const [sort, setSort] = useState("newest");

  // ============================================================
  // PAGINATION
  // ============================================================

  const [page, setPage] = useState(1);

  const postsPerPage = 10;

  const [pagination, setPagination] = useState({
    page: 1,
    limit: postsPerPage,
    totalPosts: 0,
    totalPages: 1,
    showingFrom: 0,
    showingTo: 0,
  });

  // ============================================================
  // SUMMARY COUNTS
  // ============================================================

  const [postCounts, setPostCounts] = useState({
    total: 0,
    published: 0,
    drafts: 0,
  });

  // ============================================================
  // FETCH MY POSTS
  // ============================================================

  const fetchMyPosts = async () => {
    try {
      // Same loading behavior as SavedPostsPage:
      //
      // No existing posts = initial/full loading
      // Existing posts = page/search/filter/sort loading

      if (posts.length === 0) {
        setIsLoading(true);
      } else {
        setPageLoading(true);
      }

      // ----------------------------------------------------------
      // Fetch actual paginated posts
      // ----------------------------------------------------------

      const postsRequest = axiosInstance.get(API_PATHS.POSTS.GET_MY_POSTS, {
        params: {
          page,
          limit: postsPerPage,
          filter,
          sort,
          search: searchQuery,
        },
      });

      // ----------------------------------------------------------
      // Fetch accurate counts for summary
      //
      // Search is intentionally NOT included here.
      // These remain the user's overall post counts.
      // ----------------------------------------------------------

      const totalRequest = axiosInstance.get(API_PATHS.POSTS.GET_MY_POSTS, {
        params: {
          page: 1,
          limit: 1,
          filter: "all",
          sort: "newest",
        },
      });

      const publishedRequest = axiosInstance.get(API_PATHS.POSTS.GET_MY_POSTS, {
        params: {
          page: 1,
          limit: 1,
          filter: "published",
          sort: "newest",
        },
      });

      const draftsRequest = axiosInstance.get(API_PATHS.POSTS.GET_MY_POSTS, {
        params: {
          page: 1,
          limit: 1,
          filter: "draft",
          sort: "newest",
        },
      });

      const [postsResponse, totalResponse, publishedResponse, draftsResponse] =
        await Promise.all([
          postsRequest,
          totalRequest,
          publishedRequest,
          draftsRequest,
        ]);

      // ----------------------------------------------------------
      // POSTS
      // ----------------------------------------------------------

      setPosts(postsResponse.data?.posts || []);

      // ----------------------------------------------------------
      // PAGINATION
      // ----------------------------------------------------------

      const backendPagination = postsResponse.data?.pagination;

      if (backendPagination) {
        setPagination(backendPagination);

        // If backend corrected the requested page,
        // synchronize frontend page.
        if (backendPagination.page !== page) {
          setPage(backendPagination.page);
        }
      } else {
        setPagination({
          page: 1,
          limit: postsPerPage,
          totalPosts: 0,
          totalPages: 1,
          showingFrom: 0,
          showingTo: 0,
        });
      }

      // ----------------------------------------------------------
      // SUMMARY COUNTS
      // ----------------------------------------------------------

      setPostCounts({
        total: totalResponse.data?.pagination?.totalPosts || 0,
        published: publishedResponse.data?.pagination?.totalPosts || 0,
        drafts: draftsResponse.data?.pagination?.totalPosts || 0,
      });
    } catch (error) {
      console.error("Failed to fetch my posts:", error);

      toast.error(
        error?.response?.data?.message || "Failed to load your posts.",
      );
    } finally {
      setIsLoading(false);
      setPageLoading(false);
    }
  };

  // ============================================================
  // FETCH WHEN PAGE / FILTER / SORT / SEARCH CHANGES
  // ============================================================

  useEffect(() => {
    fetchMyPosts();
  }, [page, filter, sort, searchQuery]);

  // ============================================================
  // CLEAR SELECTION WHEN PAGE / FILTER / SORT / SEARCH CHANGES
  // ============================================================

  useEffect(() => {
    setSelectedPostIds([]);
  }, [page, filter, sort, searchQuery]);

  // ============================================================
  // SELECT / UNSELECT SINGLE POST
  // ============================================================

  const handleSelectPost = (postId) => {
    setSelectedPostIds((prev) => {
      if (prev.includes(postId)) {
        return prev.filter((id) => id !== postId);
      }

      return [...prev, postId];
    });
  };

  // ============================================================
  // SELECT / UNSELECT ALL POSTS ON CURRENT PAGE
  // ============================================================

  const handleSelectAll = () => {
    const currentPageIds = posts.map((post) => post._id);

    const allSelected =
      currentPageIds.length > 0 &&
      currentPageIds.every((id) => selectedPostIds.includes(id));

    if (allSelected) {
      setSelectedPostIds((prev) =>
        prev.filter((id) => !currentPageIds.includes(id)),
      );
    } else {
      setSelectedPostIds((prev) => [...new Set([...prev, ...currentPageIds])]);
    }
  };

  // ============================================================
  // CURRENT PAGE SELECTION STATE
  // ============================================================

  const isAllCurrentPageSelected =
    posts.length > 0 &&
    posts.every((post) => selectedPostIds.includes(post._id));

  const isSomeCurrentPageSelected =
    posts.some((post) => selectedPostIds.includes(post._id)) &&
    !isAllCurrentPageSelected;

  // ============================================================
  // DELETE SINGLE POST
  // ============================================================

  const handleDelete = async () => {
    if (!selectedPost?._id) return;

    try {
      setDeleteLoading(true);

      await axiosInstance.delete(API_PATHS.POSTS.DELETE(selectedPost._id));

      toast.success("Blog post deleted successfully.");

      setOpenDeleteAlert(false);
      setSelectedPost(null);

      await fetchMyPosts();
    } catch (error) {
      console.error("Failed to delete post:", error);

      toast.error(
        error?.response?.data?.message || "Failed to delete blog post.",
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // ============================================================
  // DELETE MULTIPLE POSTS
  // ============================================================

  const handleBulkDelete = async () => {
    if (selectedPostIds.length === 0) return;

    try {
      setBulkDeleteLoading(true);

      const response = await axiosInstance.delete(
        API_PATHS.POSTS.DELETE_MULTIPLE,
        {
          data: {
            postIds: selectedPostIds,
          },
        },
      );

      toast.success(
        response.data?.message || "Selected posts deleted successfully.",
      );

      setSelectedPostIds([]);
      setOpenBulkDeleteAlert(false);

      await fetchMyPosts();
    } catch (error) {
      console.error("Failed to delete selected posts:", error);

      toast.error(
        error?.response?.data?.message || "Failed to delete selected posts.",
      );
    } finally {
      setBulkDeleteLoading(false);
    }
  };

  // ============================================================
  // SEARCH CHANGE
  // ============================================================

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  // ============================================================
  // CLEAR SEARCH
  // ============================================================

  const handleClearSearch = () => {
    setSearchQuery("");
    setPage(1);
  };

  // ============================================================
  // FILTER CHANGE
  // ============================================================

  const handleFilterChange = (newFilter) => {
    if (newFilter === filter) return;

    setFilter(newFilter);
    setPage(1);
  };

  // ============================================================
  // SORT CHANGE
  // ============================================================

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setPage(1);
  };

  // ============================================================
  // PAGE CHANGE
  // ============================================================

  const handlePageChange = (newPage) => {
    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================================================
  // DATE
  // ============================================================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // ============================================================
  // MAIN
  // ============================================================

  return (
    <BlogLayout activeMenu="My Posts">
      <div className="mx-auto w-full">
        <BackButton />

        {/* =====================================================
            HEADER
        ===================================================== */}

        <section className="mb-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Your writing
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                My Posts
              </h1>

              <p className="mt-2 text-gray-500">
                Manage your published articles and unfinished drafts.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/posts/create")}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
            >
              <LuPlus size={16} />
              Create Post
            </button>
          </div>
        </section>

        {/* =====================================================
            SUMMARY
        ===================================================== */}

        <div className="mb-5 grid grid-cols-3 gap-2 sm:gap-3">
          <div className="rounded-sm border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs text-slate-400">Total</p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {postCounts.total}
            </p>
          </div>

          <div className="rounded-sm border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs text-slate-400">Published</p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {postCounts.published}
            </p>
          </div>

          <div className="rounded-sm border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs text-slate-400">Drafts</p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {postCounts.drafts}
            </p>
          </div>
        </div>

        {/* =====================================================
            SEARCH
        ===================================================== */}

        <div className="mb-4">
          <div className="relative">
            <LuSearch
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search your posts..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="
                h-10
                w-full
                rounded-md
                border
                border-gray-200
                bg-gray-50/50
                pl-10
                pr-10
                text-sm
                text-gray-900
                outline-none
                transition-all
                placeholder:text-gray-400
                hover:border-gray-300
                hover:bg-white
                focus:border-gray-400
                focus:bg-white
                focus:ring-2
                focus:ring-gray-100
              "
            />

            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Clear search"
                className="
                  absolute
                  right-2.5
                  top-1/2
                  -translate-y-1/2
                  rounded-md
                  p-1.5
                  text-gray-400
                  transition
                  hover:bg-gray-100
                  hover:text-gray-700
                "
              >
                <LuX size={15} />
              </button>
            )}
          </div>
        </div>

        {/* =====================================================
            BULK SELECTION BAR
        ===================================================== */}

        {selectedPostIds.length > 0 && (
          <div className="mb-4 flex flex-col gap-3 rounded-sm border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-7 min-w-7 items-center justify-center rounded-sm bg-slate-900 px-2 text-xs font-semibold text-white">
                {selectedPostIds.length}
              </div>

              <span className="text-xs font-semibold text-slate-700">
                {selectedPostIds.length === 1
                  ? "post selected"
                  : "posts selected"}
              </span>

              <button
                type="button"
                onClick={() => setSelectedPostIds([])}
                className="text-xs font-medium text-slate-400 transition hover:text-slate-700"
              >
                Clear
              </button>
            </div>

            <button
              type="button"
              onClick={() => setOpenBulkDeleteAlert(true)}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-rose-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-rose-700"
            >
              <LuTrash2 size={14} />
              Delete selected
            </button>
          </div>
        )}

        {/* =====================================================
            FILTER + SORT
        ===================================================== */}

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* FILTER + SELECT ALL */}

          <div className="flex min-w-0 items-center gap-2">
            {/* SELECT ALL */}

            <label className="flex shrink-0 cursor-pointer items-center gap-2 rounded-sm border border-slate-200 bg-white px-3 py-2">
              <input
                type="checkbox"
                checked={isAllCurrentPageSelected}
                ref={(element) => {
                  if (element) {
                    element.indeterminate = isSomeCurrentPageSelected;
                  }
                }}
                onChange={handleSelectAll}
                className="h-4 w-4 cursor-pointer rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                aria-label="Select all posts on this page"
              />

              <span className="text-xs font-semibold text-slate-600">
                Select all
              </span>
            </label>

            {/* FILTER */}

            <div className="flex min-w-0 items-center gap-1 overflow-x-auto rounded-sm border border-slate-200 bg-slate-50 p-1">
              {[
                {
                  key: "all",
                  label: "All",
                  count: postCounts.total,
                },
                {
                  key: "published",
                  label: "Published",
                  count: postCounts.published,
                },
                {
                  key: "draft",
                  label: "Drafts",
                  count: postCounts.drafts,
                },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleFilterChange(item.key)}
                  className={`shrink-0 rounded-sm px-3 py-2 text-xs font-semibold transition ${
                    filter === item.key
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {item.label}

                  <span className="ml-1.5 text-slate-400">{item.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SORT */}

          <div className="relative shrink-0">
            <LuArrowDownUp
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={sort}
              onChange={handleSortChange}
              className="w-full appearance-none rounded-sm border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-xs font-semibold text-slate-700 outline-none transition hover:border-slate-300 focus:border-slate-400 sm:w-44"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="updated">Recently Updated</option>
              <option value="mostViewed">Most Viewed</option>
              <option value="mostLiked">Most Liked</option>
              <option value="titleAZ">Title A–Z</option>
              <option value="titleZA">Title Z–A</option>
            </select>

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              ▾
            </span>
          </div>
        </div>

        {/* =====================================================
            SHOWING INFO
        ===================================================== */}

        {!isLoading && posts.length > 0 && (
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-400">
            <span>
              Showing{" "}
              <span className="font-medium text-gray-700">
                {pagination.showingFrom}–{pagination.showingTo}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-700">
                {pagination.totalPosts}
              </span>
            </span>

            <span>
              Page{" "}
              <span className="font-medium text-gray-700">
                {pagination.page}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-700">
                {pagination.totalPages}
              </span>
            </span>
          </div>
        )}

        {/* =====================================================
            POSTS
        ===================================================== */}

        <div className="space-y-3">
          {/* INITIAL LOADING */}

          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-sm border border-slate-200 bg-white p-1"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-2 ml-2 h-5 w-5 rounded-sm bg-slate-200" />

                  <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="h-24 w-full rounded-sm bg-slate-200 sm:h-20 sm:w-32" />

                    <div className="flex-1 space-y-3">
                      <div className="h-4 w-20 rounded bg-slate-200" />
                      <div className="h-5 w-3/4 rounded bg-slate-200" />
                      <div className="h-3 w-28 rounded bg-slate-200" />
                    </div>

                    <div className="flex gap-2 border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
                      <div className="h-8 w-14 rounded bg-slate-200" />
                      <div className="h-8 w-14 rounded bg-slate-200" />
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* PAGE / SEARCH / FILTER / SORT LOADING */}

          {!isLoading &&
            pageLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-sm border border-slate-200 bg-white p-1"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-2 ml-2 h-5 w-5 rounded-sm bg-slate-200" />

                  <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="h-24 w-full rounded-sm bg-slate-200 sm:h-20 sm:w-32" />

                    <div className="flex-1 space-y-3">
                      <div className="h-4 w-20 rounded bg-slate-200" />
                      <div className="h-5 w-3/4 rounded bg-slate-200" />
                      <div className="h-3 w-28 rounded bg-slate-200" />
                    </div>

                    <div className="flex gap-2 border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
                      <div className="h-8 w-14 rounded bg-slate-200" />
                      <div className="h-8 w-14 rounded bg-slate-200" />
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* EMPTY STATE */}

          {!isLoading && !pageLoading && !searchQuery && posts.length === 0 && (
            <div className="rounded-sm border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm bg-slate-100">
                <LuFileText size={20} className="text-slate-400" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-800">
                {filter === "draft"
                  ? "No drafts yet"
                  : filter === "published"
                    ? "No published posts yet"
                    : "You haven't written anything yet"}
              </h3>

              <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
                Start writing your first article and share your ideas with the
                InkNest community.
              </p>

              <button
                type="button"
                onClick={() => navigate("/posts/create")}
                className="mt-5 inline-flex items-center gap-2 rounded-sm bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
              >
                <LuPlus size={14} />
                Create your first post
              </button>
            </div>
          )}

          {/* SEARCH EMPTY STATE */}

          {!isLoading && !pageLoading && searchQuery && posts.length === 0 && (
            <div className="rounded-sm border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm bg-slate-100">
                <LuSearch size={20} className="text-slate-400" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-800">
                No posts found
              </h3>

              <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
                No posts matched "{searchQuery}". Try a different search term.
              </p>

              <button
                type="button"
                onClick={handleClearSearch}
                className="mt-5 inline-flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <LuX size={14} />
                Clear search
              </button>
            </div>
          )}

          {/* POSTS */}

          {!isLoading &&
            !pageLoading &&
            posts.map((post) => {
              const isSelected = selectedPostIds.includes(post._id);

              return (
                <article
                  key={post._id}
                  className={`group rounded-sm border bg-white p-1 transition hover:shadow-sm ${
                    isSelected
                      ? "border-slate-400 shadow-sm"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    {/* CHECKBOX */}

                    <div className="flex shrink-0 items-center pt-2 pl-2">
                      <label className="cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectPost(post._id)}
                          className="peer sr-only"
                          aria-label={`Select ${post.title || "post"}`}
                        />

                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-sm border transition ${
                            isSelected
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-slate-300 bg-white text-transparent hover:border-slate-500"
                          }`}
                        >
                          <LuCheck size={13} strokeWidth={3} />
                        </span>
                      </label>
                    </div>

                    {/* POST CONTENT */}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        {/* COVER */}

                        <div className="h-24 w-full shrink-0 overflow-hidden rounded-sm bg-slate-100 sm:h-20 sm:w-32">
                          {post.coverImageUrl ? (
                            <img
                              src={post.coverImageUrl}
                              alt={post.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <LuFileText
                                size={22}
                                className="text-slate-300"
                              />
                            </div>
                          )}
                        </div>

                        {/* CONTENT */}

                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-1 rounded-sm px-2 py-1 text-[10px] font-semibold ${
                                post.isDraft
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-emerald-50 text-emerald-700"
                              }`}
                            >
                              {post.isDraft ? (
                                <LuClock3 size={10} />
                              ) : (
                                <LuSend size={10} />
                              )}

                              {post.isDraft ? "Draft" : "Published"}
                            </span>

                            <span className="text-[11px] text-slate-400">
                              {formatDate(post.updatedAt || post.createdAt)}
                            </span>
                          </div>

                          <h2 className="truncate text-sm font-semibold text-slate-900 sm:text-base">
                            {post.title || "Untitled Post"}
                          </h2>

                          <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400">
                            <span className="inline-flex items-center gap-1">
                              <LuEye size={12} />
                              {post.views || 0}
                            </span>

                            <span>{post.likes || 0} likes</span>
                          </div>
                        </div>

                        {/* ACTIONS */}

                        <div className="flex shrink-0 items-center gap-2 border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
                          {!post.isDraft && (
                            <button
                              type="button"
                              onClick={() => navigate(`/${post.slug}`)}
                              className="inline-flex items-center gap-1.5 rounded-sm border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                            >
                              <LuEye size={13} />
                              View
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => navigate(`/posts/edit/${post._id}`)}
                            className="inline-flex items-center gap-1.5 rounded-sm border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            <LuPencil size={13} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPost(post);
                              setOpenDeleteAlert(true);
                            }}
                            className="inline-flex items-center justify-center rounded-sm border border-rose-200 px-2.5 py-2 text-rose-600 transition hover:bg-rose-50"
                            aria-label={`Delete ${post.title || "post"}`}
                          >
                            <LuTrash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          <BlogSidebar />
        </div>

        {/* =====================================================
            PAGINATION
        ===================================================== */}

        {!isLoading &&
          pagination.totalPosts > 0 &&
          pagination.totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              isLoading={pageLoading}
            />
          )}
      </div>

      {/* =======================================================
          SINGLE DELETE MODAL
      ======================================================= */}

      <Modal
        isOpen={openDeleteAlert}
        onClose={() => {
          if (!deleteLoading) {
            setOpenDeleteAlert(false);
            setSelectedPost(null);
          }
        }}
        title="Delete Blog Post"
      >
        <div className="w-full max-w-lg p-2">
          <DeleteAlertContent
            type="post"
            loading={deleteLoading}
            danger="true"
            content="Are you sure you want to permanently delete this blog post? This action cannot be undone."
            onDelete={handleDelete}
          />
        </div>
      </Modal>

      {/* =======================================================
          BULK DELETE MODAL
      ======================================================= */}

      <Modal
        isOpen={openBulkDeleteAlert}
        onClose={() => {
          if (!bulkDeleteLoading) {
            setOpenBulkDeleteAlert(false);
          }
        }}
        title="Delete Selected Posts"
      >
        <div className="w-full max-w-lg p-2">
          <DeleteAlertContent
            type="post"
            loading={bulkDeleteLoading}
            danger="true"
            content={`Are you sure you want to permanently delete ${
              selectedPostIds.length
            } selected post${
              selectedPostIds.length === 1 ? "" : "s"
            }? This action cannot be undone.`}
            onDelete={handleBulkDelete}
          />
        </div>
      </Modal>
    </BlogLayout>
  );
};

export default MyPosts;
