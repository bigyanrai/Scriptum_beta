// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import MDEditor, { commands } from "@uiw/react-md-editor";

// import {
//   LuLoaderCircle,
//   LuSave,
//   LuSend,
//   LuSparkles,
//   LuTrash2,
//   LuFileText,
//   LuClock3,
//   LuArrowLeft,
// } from "react-icons/lu";

// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";

// import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
// import CoverImageSelector from "../../components/Inputs/CoverImageSelector";
// import TagInput from "../../components/Inputs/TagInput";
// import SkeletonLoader from "../../components/Loader/SkeletonLoader";
// import BlogPostIdeaCard from "../../components/Cards/BlogPostIdeaCard";
// import Modal from "../../components/Modal";
// import GenerateBlogPostForm from "../Admin/components/GenerateBlogPostForm";

// import uploadImage from "../../utils/uploadImage";
// import toast from "react-hot-toast";
// import { getToastMessageByType } from "../../utils/helper";
// import DeleteAlertContent from "../../components/DeleteAlertContent";

// const MemberPostEditor = ({ isEdit = false }) => {
//   const navigate = useNavigate();
//   const { postId = "" } = useParams();

//   const [postData, setPostData] = useState({
//     id: "",
//     title: "",
//     content: "",
//     coverImageUrl: "",
//     coverPreview: "",
//     tags: [],
//     isDraft: true,
//     generatedByAI: false,
//   });

//   const [postIdeas, setPostIdeas] = useState([]);
//   const [error, setError] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [postDeleteLoading, setPostDeleteLoading] = useState(false);

//   const [fetchLoading, setFetchLoading] = useState(false);
//   const [ideaLoading, setIdeaLoading] = useState(false);

//   const [openBlogPostGenForm, setOpenBlogPostGenForm] = useState({
//     open: false,
//     data: null,
//   });

//   const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

//   // ============================================================
//   // VALUE CHANGE
//   // ============================================================

//   const handleValueChange = (key, value) => {
//     setPostData((prevData) => ({
//       ...prevData,
//       [key]: value,
//     }));

//     if (error) {
//       setError("");
//     }
//   };

//   // ============================================================
//   // GENERATE AI IDEAS
//   // ============================================================

//   const generatePostIdeas = async () => {
//     setIdeaLoading(true);

//     try {
//       const response = await axiosInstance.post(
//         API_PATHS.AI.GENERATE_BLOG_POST_IDEAS,
//       );

//       const generatedIdeas = response.data;

//       if (generatedIdeas?.length > 0) {
//         setPostIdeas(generatedIdeas);
//       }
//     } catch (error) {
//       console.error("Failed to generate blog ideas:", error);
//     } finally {
//       setIdeaLoading(false);
//     }
//   };

//   // ============================================================
//   // FETCH MEMBER POST
//   // ============================================================

//   const fetchPostDetails = async () => {
//     try {
//       setFetchLoading(true);
//       setError("");

//       const response = await axiosInstance.get(
//         API_PATHS.POSTS.GET_MY_POST_BY_ID(postId),
//       );

//       if (response.data) {
//         const data = response.data;

//         setPostData({
//           id: data._id,
//           title: data.title || "",
//           content: data.content || "",
//           coverImageUrl: "",
//           coverPreview: data.coverImageUrl || "",
//           tags: data.tags || [],
//           isDraft: data.isDraft,
//           generatedByAI: data.generatedByAI || false,
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching member post:", error);

//       setError(error?.response?.data?.message || "Failed to load blog post.");
//     } finally {
//       setFetchLoading(false);
//     }
//   };

//   // ============================================================
//   // PUBLISH / SAVE DRAFT
//   // ============================================================

//   const handlePublish = async (isDraft) => {
//     let coverImageUrl = "";

//     // ----------------------------------------------------------
//     // VALIDATION
//     // ----------------------------------------------------------

//     if (!postData.title.trim()) {
//       setError("Please enter a title.");
//       return;
//     }

//     if (!postData.content.trim()) {
//       setError("Please enter some content.");
//       return;
//     }

//     if (!isDraft) {
//       if (!isEdit && !postData.coverImageUrl && !postData.coverPreview) {
//         setError("Please select a cover image.");
//         return;
//       }

//       if (!postData.tags?.length) {
//         setError("Please add at least one tag.");
//         return;
//       }
//     }

//     setLoading(true);
//     setError("");

//     try {
//       // --------------------------------------------------------
//       // COVER IMAGE
//       // --------------------------------------------------------

//       if (postData.coverImageUrl instanceof File) {
//         const imgUploadRes = await uploadImage(postData.coverImageUrl);

//         coverImageUrl = imgUploadRes.imageUrl || "";
//       } else {
//         coverImageUrl = postData.coverPreview || "";
//       }

//       // --------------------------------------------------------
//       // PAYLOAD
//       // --------------------------------------------------------

//       const reqPayload = {
//         title: postData.title.trim(),
//         content: postData.content,
//         coverImageUrl,
//         tags: postData.tags,
//         isDraft,
//         generatedByAI: postData.generatedByAI,
//       };

//       // --------------------------------------------------------
//       // CREATE / UPDATE
//       // --------------------------------------------------------

//       const response = isEdit
//         ? await axiosInstance.put(
//             API_PATHS.POSTS.UPDATE(postData.id),
//             reqPayload,
//           )
//         : await axiosInstance.post(API_PATHS.POSTS.CREATE, reqPayload);

//       if (response.data) {
//         toast.success(
//           getToastMessageByType(
//             isDraft ? "draft" : isEdit ? "edit" : "published",
//           ),
//         );

//         navigate("/posts");
//       }
//     } catch (error) {
//       console.error("Error saving blog post:", error);

//       setError(
//         error?.response?.data?.message ||
//           "Failed to save blog post. Please try again.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================================================
//   // DELETE
//   // ============================================================

//   const deletePost = async () => {
//     if (!postData.id) return;

//     try {
//       setPostDeleteLoading(true);

//       await axiosInstance.delete(API_PATHS.POSTS.DELETE(postData.id));

//       toast.success("Blog Post Deleted Successfully.");

//       setOpenDeleteAlert(false);

//       navigate("/posts");
//     } catch (error) {
//       console.error("Error deleting blog post:", error);

//       toast.error(
//         error?.response?.data?.message || "Failed to delete blog post.",
//       );
//     } finally {
//       setPostDeleteLoading(false);
//     }
//   };

//   // ============================================================
//   // INITIAL LOAD
//   // ============================================================

//   useEffect(() => {
//     if (isEdit) {
//       fetchPostDetails();
//     } else {
//       generatePostIdeas();
//     }
//   }, [isEdit, postId]);

//   // ============================================================
//   // WORD COUNT
//   // ============================================================

//   const wordCount =
//     postData.content
//       ?.replace(/[#_*`>\-\n]/g, " ")
//       .trim()
//       .split(/\s+/)
//       .filter(Boolean).length || 0;
//   const readTime = Math.max(1, Math.ceil(wordCount / 200));

//   // ============================================================
//   // LOADING EDIT PAGE
//   // ============================================================

//   if (fetchLoading) {
//     return (
//       <BlogLayout activeMenu="My Posts">
//         <div className="mx-auto  py-8">
//           <div className="mb-5 h-8 w-48 animate-pulse rounded bg-slate-200" />

//           <div className="rounded-sm border border-slate-200 bg-white p-5">
//             <SkeletonLoader />
//           </div>
//         </div>
//       </BlogLayout>
//     );
//   }

//   return (
//     <BlogLayout activeMenu="My Posts">
//       <div className="min-h-screen">
//         <div className="mx-auto ">
//           {/* ==================================================
//               HEADER
//           ================================================== */}

//           <div className="mb-3 rounded-sm border border-slate-200 bg-white p-2">
//             <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//               <div className="min-w-0">
//                 <button
//                   type="button"
//                   onClick={() => navigate("/posts")}
//                   className=" cursor-pointer mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-slate-900"
//                 >
//                   <LuArrowLeft size={14} />
//                   Back to My Posts
//                 </button>

//                 <h1 className="text-xl font-bold tracking-tight text-slate-900">
//                   {isEdit ? "Edit Your Post" : "Create New Post"}
//                 </h1>

//                 <p className="mt-1 max-w-2xl text-xs text-slate-500">
//                   {isEdit
//                     ? "Update your article, cover image, content and tags."
//                     : "Write, save and publish your article on InkNest."}
//                 </p>
//               </div>

//               {/* ACTIONS */}

//               <div className="flex shrink-0 items-center gap-2">
//                 {isEdit && (
//                   <button
//                     type="button"
//                     disabled={loading || postDeleteLoading}
//                     onClick={() => setOpenDeleteAlert(true)}
//                     className="inline-flex items-center gap-1.5 rounded-sm border border-rose-200 bg-white px-3 py-2 text-xs font-semibold text-rose-600 transition hover:border-rose-300 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
//                   >
//                     <LuTrash2 size={14} />
//                     Delete
//                   </button>
//                 )}

//                 <button
//                   type="button"
//                   disabled={loading}
//                   onClick={() => handlePublish(true)}
//                   className="inline-flex items-center gap-1.5 rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   <LuSave size={14} />
//                   Save Draft
//                 </button>

//                 <button
//                   type="button"
//                   disabled={loading}
//                   onClick={() => handlePublish(false)}
//                   className="inline-flex items-center gap-1.5 rounded-sm bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   {loading ? (
//                     <LuLoaderCircle size={14} className="animate-spin" />
//                   ) : (
//                     <LuSend size={14} />
//                   )}

//                   {loading ? "Saving..." : "Publish"}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* ==================================================
//               MAIN GRID
//           ================================================== */}

//           <div className="grid grid-cols-1 gap-3 xl:grid-cols-12">
//             {/* =================================================
//                 EDITOR
//             ================================================= */}

//             <div className={isEdit ? "xl:col-span-12" : "xl:col-span-8"}>
//               <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
//                 {/* ERROR */}

//                 {error && (
//                   <div className="m-3 flex items-start gap-3 rounded-sm border border-rose-200 bg-rose-50 p-3">
//                     <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-500" />

//                     <div>
//                       <p className="text-xs font-semibold text-rose-700">
//                         Unable to continue
//                       </p>

//                       <p className="mt-0.5 text-xs text-rose-600">{error}</p>
//                     </div>
//                   </div>
//                 )}

//                 <div className="p-3">
//                   {/* =================================================
//                       TITLE
//                   ================================================= */}

//                   <div>
//                     <label className="mb-1.5 block text-xs font-semibold text-slate-700">
//                       Post Title
//                     </label>

//                     <input
//                       type="text"
//                       placeholder="Enter an engaging title..."
//                       value={postData.title}
//                       onChange={({ target }) =>
//                         handleValueChange("title", target.value)
//                       }
//                       className="w-full rounded-sm border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition focus:bg-white"
//                     />
//                   </div>

//                   {/* =================================================
//                       COVER
//                   ================================================= */}

//                   <div className="mt-5 rounded-sm border border-slate-200 bg-slate-50/50 p-3">
//                     <div className="mb-3">
//                       <h3 className="text-sm font-semibold text-slate-800">
//                         Cover Image
//                       </h3>

//                       <p className="mt-0.5 text-[11px] text-slate-400">
//                         Recommended 1600 × 900 · JPG, PNG or WEBP
//                       </p>
//                     </div>

//                     <CoverImageSelector
//                       image={postData.coverImageUrl}
//                       setImage={(value) =>
//                         handleValueChange("coverImageUrl", value)
//                       }
//                       preview={postData.coverPreview}
//                       setPreview={(value) =>
//                         handleValueChange("coverPreview", value)
//                       }
//                     />
//                   </div>

//                   {/* =================================================
//                       CONTENT
//                   ================================================= */}

//                   <div className="mt-5">
//                     <div className="mb-2 flex items-center justify-between">
//                       <label className="text-xs font-semibold text-slate-700">
//                         Content
//                       </label>

//                       <span className="text-[11px] text-slate-400">
//                         Markdown supported
//                       </span>
//                     </div>

//                     <div className="overflow-hidden rounded-sm border border-slate-200 bg-white">
//                       <div className="border-b border-slate-200 bg-slate-50 px-4 py-2">
//                         <div className="flex items-center gap-2">
//                           <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
//                           <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
//                           <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />

//                           <span className="ml-2 text-[10px] font-medium uppercase tracking-wider text-slate-400">
//                             Markdown Editor
//                           </span>
//                         </div>
//                       </div>

//                       <div data-color-mode="light" className="p-1.5">
//                         <MDEditor
//                           value={postData.content}
//                           onChange={(data) =>
//                             handleValueChange("content", data || "")
//                           }
//                           commands={[
//                             commands.bold,
//                             commands.italic,
//                             commands.strikethrough,
//                             commands.hr,
//                             commands.title,
//                             commands.divider,
//                             commands.link,
//                             commands.code,
//                             commands.image,
//                             commands.unorderedListCommand,
//                             commands.orderedListCommand,
//                             commands.checkedListCommand,
//                           ]}
//                           hideMenu={false}
//                           preview="edit"
//                           height={420}
//                         />
//                       </div>
//                     </div>

//                     {/* STATS */}

//                     <div className="mt-2 flex items-center gap-4 px-1">
//                       <span className="flex items-center gap-1 text-[11px] text-slate-400">
//                         <LuFileText size={12} />
//                         {wordCount} words
//                       </span>

//                       <span className="flex items-center gap-1 text-[11px] text-slate-400">
//                         <LuClock3 size={12} />
//                         {readTime} min read
//                       </span>
//                     </div>
//                   </div>

//                   {/* =================================================
//                       TAGS
//                   ================================================= */}

//                   <div className="mt-5 rounded-sm border border-slate-200 bg-slate-50/50 p-3">
//                     <div className="mb-2">
//                       <label className="block text-xs font-semibold text-slate-700">
//                         Tags
//                       </label>

//                       <p className="mt-0.5 text-[11px] text-slate-400">
//                         Add relevant topics to improve discoverability.
//                       </p>
//                     </div>

//                     <TagInput
//                       tags={postData.tags || []}
//                       setTags={(data) => handleValueChange("tags", data)}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* =================================================
//                 AI IDEAS
//             ================================================= */}

//             {!isEdit && (
//               <div className="xl:col-span-4">
//                 <div className="sticky top-20 overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
//                   {/* AI HEADER */}

//                   <div className="border-b border-slate-200 bg-slate-900 px-4 py-4">
//                     <div className="flex items-center justify-between gap-3">
//                       <div className="flex min-w-0 items-center gap-3">
//                         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-white/10">
//                           <LuSparkles size={17} className="text-sky-300" />
//                         </div>

//                         <div className="min-w-0">
//                           <h4 className="text-sm font-semibold text-white">
//                             AI Blog Ideas
//                           </h4>

//                           <p className="mt-0.5 truncate text-[10px] text-slate-400">
//                             Generate topics with AI assistance
//                           </p>
//                         </div>
//                       </div>

//                       <button
//                         type="button"
//                         onClick={() =>
//                           setOpenBlogPostGenForm({
//                             open: true,
//                             data: null,
//                           })
//                         }
//                         className="shrink-0 rounded-sm bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-800 transition hover:bg-sky-50 hover:text-sky-600"
//                       >
//                         Generate
//                       </button>
//                     </div>
//                   </div>

//                   {/* AI IDEAS */}

//                   <div className="max-h-[calc(100vh-190px)] overflow-y-auto">
//                     {ideaLoading ? (
//                       <div className="p-2">
//                         <SkeletonLoader />
//                       </div>
//                     ) : postIdeas.length > 0 ? (
//                       <div>
//                         {postIdeas.map((idea, index) => (
//                           <BlogPostIdeaCard
//                             key={`idea_${index}`}
//                             title={idea.title || ""}
//                             description={idea.description || ""}
//                             tags={idea.tags || []}
//                             tone={idea.tone || "casual"}
//                             onSelect={() =>
//                               setOpenBlogPostGenForm({
//                                 open: true,
//                                 data: idea,
//                               })
//                             }
//                           />
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="px-5 py-10 text-center">
//                         <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
//                           <LuSparkles size={17} className="text-slate-400" />
//                         </div>

//                         <p className="mt-3 text-xs font-medium text-slate-600">
//                           No ideas available
//                         </p>

//                         <p className="mt-1 text-[11px] text-slate-400">
//                           Generate some AI-powered ideas to get started.
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ========================================================
//           AI GENERATION MODAL
//       ======================================================== */}

//       <Modal
//         isOpen={openBlogPostGenForm?.open}
//         onClose={() =>
//           setOpenBlogPostGenForm({
//             open: false,
//             data: null,
//           })
//         }
//         hideHeader
//       >
//         <GenerateBlogPostForm
//           contentParams={openBlogPostGenForm?.data || null}
//           setPostContent={(title, content, generatedTags) => {
//             const postInfo = openBlogPostGenForm?.data || null;

//             setPostData((prevState) => ({
//               ...prevState,
//               title: title || prevState.title,
//               content: content || "",
//               tags:
//                 generatedTags?.length > 0
//                   ? generatedTags
//                   : postInfo?.tags || prevState.tags,
//               generatedByAI: true,
//             }));
//           }}
//           handleCloseForm={() =>
//             setOpenBlogPostGenForm({
//               open: false,
//               data: null,
//             })
//           }
//         />
//       </Modal>

//       {/* ========================================================
//           DELETE MODAL
//       ======================================================== */}

//       <Modal
//         isOpen={openDeleteAlert}
//         onClose={() => {
//           if (!postDeleteLoading) {
//             setOpenDeleteAlert(false);
//           }
//         }}
//         title="Delete Blog Post"
//       >
//         <div className="w-full max-w-lg p-2">
//           <DeleteAlertContent
//             type="post"
//             loading={postDeleteLoading}
//             danger="true"
//             content="Are you sure you want to permanently delete this blog post? This action cannot be undone."
//             onDelete={deletePost}
//           />
//         </div>
//       </Modal>
//     </BlogLayout>
//   );
// };

// export default MemberPostEditor;

// import { useEffect, useState } from "react";

// import { useNavigate, useParams } from "react-router-dom";

// import MDEditor, { commands } from "@uiw/react-md-editor";

// import {
//   LuLoaderCircle,
//   LuSave,
//   LuSend,
//   LuSparkles,
//   LuTrash2,
//   LuFileText,
//   LuClock3,
//   LuArrowLeft,
// } from "react-icons/lu";

// import axiosInstance from "../../utils/axiosInstance";

// import { API_PATHS } from "../../utils/apiPaths";

// import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";

// import CoverImageSelector from "../../components/Inputs/CoverImageSelector";

// import TagInput from "../../components/Inputs/TagInput";

// import SkeletonLoader from "../../components/Loader/SkeletonLoader";

// import BlogPostIdeaCard from "../../components/Cards/BlogPostIdeaCard";

// import Modal from "../../components/Modal";

// import GenerateBlogPostForm from "../Admin/components/GenerateBlogPostForm";

// import uploadImage from "../../utils/uploadImage";

// import toast from "react-hot-toast";

// import { getToastMessageByType } from "../../utils/helper";

// import DeleteAlertContent from "../../components/DeleteAlertContent";

// const MemberPostEditor = ({ isEdit = false }) => {
//   const navigate = useNavigate();

//   const { postId = "" } = useParams();

//   const [postData, setPostData] = useState({
//     id: "",
//     title: "",
//     content: "",
//     coverImageUrl: "",
//     coverPreview: "",
//     tags: [],
//     isDraft: true,
//     generatedByAI: false,
//   });

//   const [postIdeas, setPostIdeas] = useState([]);

//   const [error, setError] = useState("");

//   const [loading, setLoading] = useState(false);

//   const [postDeleteLoading, setPostDeleteLoading] = useState(false);

//   const [fetchLoading, setFetchLoading] = useState(false);

//   const [ideaLoading, setIdeaLoading] = useState(false);

//   const [openBlogPostGenForm, setOpenBlogPostGenForm] = useState({
//     open: false,
//     data: null,
//   });

//   const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

//   // ============================================================
//   // VALUE CHANGE
//   // ============================================================

//   const handleValueChange = (key, value) => {
//     setPostData((prevData) => ({
//       ...prevData,
//       [key]: value,
//     }));

//     if (error) {
//       setError("");
//     }
//   };

//   // ============================================================
//   // GENERATE AI IDEAS
//   // ============================================================

//   const generatePostIdeas = async () => {
//     setIdeaLoading(true);

//     try {
//       const response = await axiosInstance.post(
//         API_PATHS.AI.GENERATE_BLOG_POST_IDEAS,
//       );

//       const generatedIdeas = response.data;

//       if (generatedIdeas?.length > 0) {
//         setPostIdeas(generatedIdeas);
//       }
//     } catch (error) {
//       console.error("Failed to generate blog ideas:", error);
//     } finally {
//       setIdeaLoading(false);
//     }
//   };

//   // ============================================================
//   // FETCH MEMBER POST
//   // ============================================================

//   const fetchPostDetails = async () => {
//     try {
//       setFetchLoading(true);
//       setError("");

//       const response = await axiosInstance.get(
//         API_PATHS.POSTS.GET_MY_POST_BY_ID(postId),
//       );

//       if (response.data) {
//         const data = response.data;

//         setPostData({
//           id: data._id,
//           title: data.title || "",
//           content: data.content || "",
//           coverImageUrl: "",
//           coverPreview: data.coverImageUrl || "",
//           tags: data.tags || [],
//           isDraft: data.isDraft,
//           generatedByAI: data.generatedByAI || false,
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching member post:", error);

//       setError(error?.response?.data?.message || "Failed to load blog post.");
//     } finally {
//       setFetchLoading(false);
//     }
//   };

//   // ============================================================
//   // PUBLISH / SAVE DRAFT
//   // ============================================================

//   const handlePublish = async (isDraft) => {
//     let coverImageUrl = "";

//     // ----------------------------------------------------------
//     // VALIDATION
//     // ----------------------------------------------------------

//     if (!postData.title.trim()) {
//       setError("Please enter a title.");
//       return;
//     }

//     if (!postData.content.trim()) {
//       setError("Please enter some content.");
//       return;
//     }

//     if (!isDraft) {
//       if (!isEdit && !postData.coverImageUrl && !postData.coverPreview) {
//         setError("Please select a cover image.");
//         return;
//       }

//       if (!postData.tags?.length) {
//         setError("Please add at least one tag.");
//         return;
//       }
//     }

//     setLoading(true);
//     setError("");

//     try {
//       // --------------------------------------------------------
//       // COVER IMAGE
//       // --------------------------------------------------------

//       if (postData.coverImageUrl instanceof File) {
//         const imgUploadRes = await uploadImage(postData.coverImageUrl);

//         coverImageUrl = imgUploadRes.imageUrl || "";
//       } else {
//         coverImageUrl = postData.coverPreview || "";
//       }

//       // --------------------------------------------------------
//       // PAYLOAD
//       // --------------------------------------------------------

//       const reqPayload = {
//         title: postData.title.trim(),
//         content: postData.content,
//         coverImageUrl,
//         tags: postData.tags,
//         isDraft,
//         generatedByAI: postData.generatedByAI,
//       };

//       // --------------------------------------------------------
//       // CREATE / UPDATE
//       // --------------------------------------------------------

//       const response = isEdit
//         ? await axiosInstance.put(
//             API_PATHS.POSTS.UPDATE(postData.id),
//             reqPayload,
//           )
//         : await axiosInstance.post(API_PATHS.POSTS.CREATE, reqPayload);

//       if (response.data) {
//         toast.success(
//           getToastMessageByType(
//             isDraft ? "draft" : isEdit ? "edit" : "published",
//           ),
//         );

//         navigate("/posts");
//       }
//     } catch (error) {
//       console.error("Error saving blog post:", error);

//       setError(
//         error?.response?.data?.message ||
//           "Failed to save blog post. Please try again.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================================================
//   // DELETE
//   // ============================================================

//   const deletePost = async () => {
//     if (!postData.id) return;

//     try {
//       setPostDeleteLoading(true);

//       await axiosInstance.delete(API_PATHS.POSTS.DELETE(postData.id));

//       toast.success("Blog Post Deleted Successfully.");

//       setOpenDeleteAlert(false);

//       navigate("/posts");
//     } catch (error) {
//       console.error("Error deleting blog post:", error);

//       toast.error(
//         error?.response?.data?.message || "Failed to delete blog post.",
//       );
//     } finally {
//       setPostDeleteLoading(false);
//     }
//   };

//   // ============================================================
//   // INITIAL LOAD
//   // ============================================================

//   useEffect(() => {
//     if (isEdit) {
//       fetchPostDetails();
//     } else {
//       generatePostIdeas();
//     }
//   }, [isEdit, postId]);

//   // ============================================================
//   // WORD COUNT
//   // ============================================================

//   const wordCount =
//     postData.content
//       ?.replace(/[#_*`>\-\n]/g, " ")
//       .trim()
//       .split(/\s+/)
//       .filter(Boolean).length || 0;
//   const readTime = Math.max(1, Math.ceil(wordCount / 200));

//   // ============================================================
//   // LOADING EDIT PAGE
//   // ============================================================

//   if (fetchLoading) {
//     return (
//       <BlogLayout activeMenu="My Posts">
//         <div className="mx-auto py-8">
//           <div className="mb-5 h-8 w-48 animate-pulse rounded bg-slate-200" />

//           <div className="rounded-sm bg-white p-5">
//             <SkeletonLoader />
//           </div>
//         </div>
//       </BlogLayout>
//     );
//   }

//   return (
//     <BlogLayout activeMenu="My Posts">
//       <div className="min-h-screen">
//         <div className="mx-auto">
//           {/* ==================================================
//               HEADER
//           ================================================== */}

//           <div className="mb-5 bg-white">
//             <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//               <div className="min-w-0">
//                 <button
//                   type="button"
//                   onClick={() => navigate("/posts")}
//                   className="mb-3 inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-slate-900"
//                 >
//                   <LuArrowLeft size={14} />
//                   Back to My Posts
//                 </button>

//                 <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
//                   {isEdit ? "Edit Your Post" : "Create New Post"}
//                 </h1>

//                 <p className="mt-1 max-w-2xl text-xs text-slate-500">
//                   {isEdit
//                     ? "Update your article, cover image, content and tags."
//                     : "Write, save and publish your article on InkNest."}
//                 </p>
//               </div>

//               {/* ACTIONS */}

//               <div className="flex shrink-0 items-center gap-2">
//                 {isEdit && (
//                   <button
//                     type="button"
//                     disabled={loading || postDeleteLoading}
//                     onClick={() => setOpenDeleteAlert(true)}
//                     className="inline-flex items-center gap-1.5 rounded-sm border border-rose-200 bg-white px-3 py-2 text-xs font-semibold text-rose-600 transition hover:border-rose-300 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
//                   >
//                     <LuTrash2 size={14} />
//                     Delete
//                   </button>
//                 )}

//                 <button
//                   type="button"
//                   disabled={loading}
//                   onClick={() => handlePublish(true)}
//                   className="inline-flex items-center gap-1.5 rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   <LuSave size={14} />
//                   Save Draft
//                 </button>

//                 <button
//                   type="button"
//                   disabled={loading}
//                   onClick={() => handlePublish(false)}
//                   className="inline-flex items-center gap-1.5 rounded-sm bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   {loading ? (
//                     <LuLoaderCircle size={14} className="animate-spin" />
//                   ) : (
//                     <LuSend size={14} />
//                   )}

//                   {loading ? "Saving..." : "Publish"}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* ==================================================
//               MAIN GRID
//           ================================================== */}

//           <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
//             {/* =================================================
//                 EDITOR
//             ================================================= */}

//             <div className={isEdit ? "xl:col-span-12" : "xl:col-span-8"}>
//               <div className="bg-white">
//                 {/* ERROR */}

//                 {error && (
//                   <div className="mb-5 flex items-start gap-3 rounded-sm border border-rose-200 bg-rose-50 p-3">
//                     <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-500" />

//                     <div>
//                       <p className="text-xs font-semibold text-rose-700">
//                         Unable to continue
//                       </p>

//                       <p className="mt-0.5 text-xs text-rose-600">{error}</p>
//                     </div>
//                   </div>
//                 )}

//                 <div>
//                   {/* =================================================
//                       TITLE
//                   ================================================= */}

//                   <div className="border-b border-slate-100 pb-5">
//                     <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
//                       Post Title
//                     </label>

//                     <input
//                       type="text"
//                       placeholder="Give your story a title..."
//                       value={postData.title}
//                       onChange={({ target }) =>
//                         handleValueChange("title", target.value)
//                       }
//                       className="w-full border-0 bg-transparent px-0 py-1 text-2xl font-semibold tracking-tight text-slate-900 outline-none placeholder:text-slate-300 focus:ring-0 sm:text-3xl"
//                     />
//                   </div>

//                   {/* =================================================
//                       COVER
//                   ================================================= */}

//                   <div className="mt-7">
//                     <div className="mb-3">
//                       <h3 className="text-sm font-semibold text-slate-800">
//                         Cover Image
//                       </h3>

//                       <p className="mt-0.5 text-[11px] text-slate-400">
//                         Recommended 1600 × 900 · JPG, PNG or WEBP
//                       </p>
//                     </div>

//                     <div className="overflow-hidden rounded-sm">
//                       <CoverImageSelector
//                         image={postData.coverImageUrl}
//                         setImage={(value) =>
//                           handleValueChange("coverImageUrl", value)
//                         }
//                         preview={postData.coverPreview}
//                         setPreview={(value) =>
//                           handleValueChange("coverPreview", value)
//                         }
//                       />
//                     </div>
//                   </div>

//                   {/* =================================================
//                       CONTENT
//                   ================================================= */}

//                   <div className="mt-8">
//                     <div className="mb-2 flex items-center justify-between">
//                       <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
//                         Content
//                       </label>

//                       <span className="text-[11px] text-slate-400">
//                         Markdown supported
//                       </span>
//                     </div>

//                     <div className="overflow-hidden bg-white">
//                       <div data-color-mode="light" className="editor-paper">
//                         <MDEditor
//                           value={postData.content}
//                           onChange={(data) =>
//                             handleValueChange("content", data || "")
//                           }
//                           commands={[
//                             commands.bold,
//                             commands.italic,
//                             commands.strikethrough,
//                             commands.hr,
//                             commands.title,
//                             commands.divider,
//                             commands.link,
//                             commands.code,
//                             commands.image,
//                             commands.unorderedListCommand,
//                             commands.orderedListCommand,
//                             commands.checkedListCommand,
//                           ]}
//                           hideMenu={false}
//                           preview="edit"
//                           height={420}
//                         />
//                       </div>
//                     </div>

//                     {/* STATS */}

//                     <div className="mt-3 flex items-center gap-4 px-1">
//                       <span className="flex items-center gap-1 text-[11px] text-slate-400">
//                         <LuFileText size={12} />
//                         {wordCount} words
//                       </span>

//                       <span className="flex items-center gap-1 text-[11px] text-slate-400">
//                         <LuClock3 size={12} />
//                         {readTime} min read
//                       </span>
//                     </div>
//                   </div>

//                   {/* =================================================
//                       TAGS
//                   ================================================= */}

//                   <div className="mt-8 border-t border-slate-100 pt-6">
//                     <div className="mb-2">
//                       <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
//                         Tags
//                       </label>

//                       <p className="mt-0.5 text-[11px] text-slate-400">
//                         Add relevant topics to improve discoverability.
//                       </p>
//                     </div>

//                     <div className="mt-3">
//                       <TagInput
//                         tags={postData.tags || []}
//                         setTags={(data) => handleValueChange("tags", data)}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* =================================================
//                 AI IDEAS
//             ================================================= */}

//             {!isEdit && (
//               <div className="xl:col-span-4">
//                 <div className="sticky top-20 overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
//                   {/* AI HEADER */}

//                   <div className="border-b border-slate-200 bg-slate-900 px-4 py-4">
//                     <div className="flex items-center justify-between gap-3">
//                       <div className="flex min-w-0 items-center gap-3">
//                         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-white/10">
//                           <LuSparkles size={17} className="text-sky-300" />
//                         </div>

//                         <div className="min-w-0">
//                           <h4 className="text-sm font-semibold text-white">
//                             AI Blog Ideas
//                           </h4>

//                           <p className="mt-0.5 truncate text-[10px] text-slate-400">
//                             Generate topics with AI assistance
//                           </p>
//                         </div>
//                       </div>

//                       <button
//                         type="button"
//                         onClick={() =>
//                           setOpenBlogPostGenForm({
//                             open: true,
//                             data: null,
//                           })
//                         }
//                         className="shrink-0 rounded-sm bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-800 transition hover:bg-sky-50 hover:text-sky-600"
//                       >
//                         Generate
//                       </button>
//                     </div>
//                   </div>

//                   {/* AI IDEAS */}

//                   <div className="max-h-[calc(100vh-190px)] overflow-y-auto">
//                     {ideaLoading ? (
//                       <div className="p-2">
//                         <SkeletonLoader />
//                       </div>
//                     ) : postIdeas.length > 0 ? (
//                       <div>
//                         {postIdeas.map((idea, index) => (
//                           <BlogPostIdeaCard
//                             key={`idea_${index}`}
//                             title={idea.title || ""}
//                             description={idea.description || ""}
//                             tags={idea.tags || []}
//                             tone={idea.tone || "casual"}
//                             onSelect={() =>
//                               setOpenBlogPostGenForm({
//                                 open: true,
//                                 data: idea,
//                               })
//                             }
//                           />
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="px-5 py-10 text-center">
//                         <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
//                           <LuSparkles size={17} className="text-slate-400" />
//                         </div>

//                         <p className="mt-3 text-xs font-medium text-slate-600">
//                           No ideas available
//                         </p>

//                         <p className="mt-1 text-[11px] text-slate-400">
//                           Generate some AI-powered ideas to get started.
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ========================================================
//           AI GENERATION MODAL
//       ======================================================== */}

//       <Modal
//         isOpen={openBlogPostGenForm?.open}
//         onClose={() =>
//           setOpenBlogPostGenForm({
//             open: false,
//             data: null,
//           })
//         }
//         hideHeader
//       >
//         <GenerateBlogPostForm
//           contentParams={openBlogPostGenForm?.data || null}
//           setPostContent={(title, content, generatedTags) => {
//             const postInfo = openBlogPostGenForm?.data || null;

//             setPostData((prevState) => ({
//               ...prevState,
//               title: title || prevState.title,
//               content: content || "",
//               tags:
//                 generatedTags?.length > 0
//                   ? generatedTags
//                   : postInfo?.tags || prevState.tags,
//               generatedByAI: true,
//             }));
//           }}
//           handleCloseForm={() =>
//             setOpenBlogPostGenForm({
//               open: false,
//               data: null,
//             })
//           }
//         />
//       </Modal>

//       {/* ========================================================
//           DELETE MODAL
//       ======================================================== */}

//       <Modal
//         isOpen={openDeleteAlert}
//         onClose={() => {
//           if (!postDeleteLoading) {
//             setOpenDeleteAlert(false);
//           }
//         }}
//         title="Delete Blog Post"
//       >
//         <div className="w-full max-w-lg p-2">
//           <DeleteAlertContent
//             type="post"
//             loading={postDeleteLoading}
//             danger="true"
//             content="Are you sure you want to permanently delete this blog post? This action cannot be undone."
//             onDelete={deletePost}
//           />
//         </div>
//       </Modal>
//     </BlogLayout>
//   );
// };

// export default MemberPostEditor;

import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import MDEditor, { commands } from "@uiw/react-md-editor";

import {
  LuLoaderCircle,
  LuSave,
  LuSend,
  LuSparkles,
  LuTrash2,
  LuFileText,
  LuClock3,
  LuArrowLeft,
  LuChevronLeft,
  LuChevronRight,
  LuX,
} from "react-icons/lu";

import axiosInstance from "../../utils/axiosInstance";

import { API_PATHS } from "../../utils/apiPaths";

import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";

import CoverImageSelector from "../../components/Inputs/CoverImageSelector";

import TagInput from "../../components/Inputs/TagInput";

import SkeletonLoader from "../../components/Loader/SkeletonLoader";

import BlogPostIdeaCard from "../../components/Cards/BlogPostIdeaCard";

import Modal from "../../components/Modal";

import GenerateBlogPostForm from "../Admin/components/GenerateBlogPostForm";

import uploadImage from "../../utils/uploadImage";

import toast from "react-hot-toast";

import { getToastMessageByType } from "../../utils/helper";

import DeleteAlertContent from "../../components/DeleteAlertContent";
import BlogSidebar from "../../components/layouts/BlogLayout/BlogSidebar";

const MemberPostEditor = ({ isEdit = false }) => {
  const navigate = useNavigate();

  const { postId = "" } = useParams();

  const [postData, setPostData] = useState({
    id: "",
    title: "",
    content: "",
    coverImageUrl: "",
    coverPreview: "",
    tags: [],
    isDraft: true,
    generatedByAI: false,
  });

  const [postIdeas, setPostIdeas] = useState([]);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [postDeleteLoading, setPostDeleteLoading] = useState(false);

  const [fetchLoading, setFetchLoading] = useState(false);

  const [ideaLoading, setIdeaLoading] = useState(false);

  // Desktop AI sidebar
  const [isAIIdeasOpen, setIsAIIdeasOpen] = useState(true);

  // Mobile / tablet AI popout
  const [isAIMobileOpen, setIsAIMobileOpen] = useState(false);

  const [openBlogPostGenForm, setOpenBlogPostGenForm] = useState({
    open: false,
    data: null,
  });

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  // ============================================================
  // VALUE CHANGE
  // ============================================================

  const handleValueChange = (key, value) => {
    setPostData((prevData) => ({
      ...prevData,
      [key]: value,
    }));

    if (error) {
      setError("");
    }
  };

  // ============================================================
  // GENERATE AI IDEAS
  // ============================================================

  const generatePostIdeas = async () => {
    setIdeaLoading(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_BLOG_POST_IDEAS,
      );

      const generatedIdeas = response.data;

      if (generatedIdeas?.length > 0) {
        setPostIdeas(generatedIdeas);
      }
    } catch (error) {
      console.error("Failed to generate blog ideas:", error);
    } finally {
      setIdeaLoading(false);
    }
  };

  // ============================================================
  // FETCH MEMBER POST
  // ============================================================

  const fetchPostDetails = async () => {
    try {
      setFetchLoading(true);
      setError("");

      const response = await axiosInstance.get(
        API_PATHS.POSTS.GET_MY_POST_BY_ID(postId),
      );

      if (response.data) {
        const data = response.data;

        setPostData({
          id: data._id,
          title: data.title || "",
          content: data.content || "",
          coverImageUrl: "",
          coverPreview: data.coverImageUrl || "",
          tags: data.tags || [],
          isDraft: data.isDraft,
          generatedByAI: data.generatedByAI || false,
        });
      }
    } catch (error) {
      console.error("Error fetching member post:", error);

      setError(error?.response?.data?.message || "Failed to load blog post.");
    } finally {
      setFetchLoading(false);
    }
  };

  // ============================================================
  // PUBLISH / SAVE DRAFT
  // ============================================================

  const handlePublish = async (isDraft) => {
    let coverImageUrl = "";

    // ----------------------------------------------------------
    // VALIDATION
    // ----------------------------------------------------------

    if (!postData.title.trim()) {
      setError("Please enter a title.");
      return;
    }

    if (!postData.content.trim()) {
      setError("Please enter some content.");
      return;
    }

    if (!isDraft) {
      if (!isEdit && !postData.coverImageUrl && !postData.coverPreview) {
        setError("Please select a cover image.");
        return;
      }

      if (!postData.tags?.length) {
        setError("Please add at least one tag.");
        return;
      }
    }

    setLoading(true);
    setError("");

    try {
      // --------------------------------------------------------
      // COVER IMAGE
      // --------------------------------------------------------

      if (postData.coverImageUrl instanceof File) {
        const imgUploadRes = await uploadImage(postData.coverImageUrl);

        coverImageUrl = imgUploadRes.imageUrl || "";
      } else {
        coverImageUrl = postData.coverPreview || "";
      }

      // --------------------------------------------------------
      // PAYLOAD
      // --------------------------------------------------------

      const reqPayload = {
        title: postData.title.trim(),
        content: postData.content,
        coverImageUrl,
        tags: postData.tags,
        isDraft,
        generatedByAI: postData.generatedByAI,
      };

      // --------------------------------------------------------
      // CREATE / UPDATE
      // --------------------------------------------------------

      const response = isEdit
        ? await axiosInstance.put(
            API_PATHS.POSTS.UPDATE(postData.id),
            reqPayload,
          )
        : await axiosInstance.post(API_PATHS.POSTS.CREATE, reqPayload);

      if (response.data) {
        toast.success(
          getToastMessageByType(
            isDraft ? "draft" : isEdit ? "edit" : "published",
          ),
        );

        navigate("/posts");
      }
    } catch (error) {
      console.error("Error saving blog post:", error);

      setError(
        error?.response?.data?.message ||
          "Failed to save blog post. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // DELETE
  // ============================================================

  const deletePost = async () => {
    if (!postData.id) return;

    try {
      setPostDeleteLoading(true);

      await axiosInstance.delete(API_PATHS.POSTS.DELETE(postData.id));

      toast.success("Blog Post Deleted Successfully.");

      setOpenDeleteAlert(false);

      navigate("/posts");
    } catch (error) {
      console.error("Error deleting blog post:", error);

      toast.error(
        error?.response?.data?.message || "Failed to delete blog post.",
      );
    } finally {
      setPostDeleteLoading(false);
    }
  };

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    if (isEdit) {
      fetchPostDetails();
    } else {
      generatePostIdeas();
    }
  }, [isEdit, postId]);

  // ============================================================
  // WORD COUNT
  // ============================================================

  const wordCount =
    postData.content
      ?.replace(/[#_*`>\-\n]/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length || 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // ============================================================
  // LOADING EDIT PAGE
  // ============================================================

  if (fetchLoading) {
    return (
      <BlogLayout activeMenu="My Posts">
        <div className="mx-auto py-8">
          <div className="mb-5 h-8 w-48 animate-pulse rounded bg-slate-200" />

          <div className="rounded-sm bg-white p-5">
            <SkeletonLoader />
          </div>
        </div>
      </BlogLayout>
    );
  }

  return (
    <BlogLayout activeMenu="My Posts">
      <div className="min-h-screen">
        <div className="mx-auto">
          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="mb-5 bg-white">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <button
                  type="button"
                  onClick={() => navigate("/posts")}
                  className="mb-3 inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-slate-900"
                >
                  <LuArrowLeft size={14} />
                  Back to My Posts
                </button>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {isEdit ? "Edit Your Post" : "Create New Post"}
                </h1>

                <p className="mt-1 max-w-2xl text-xs text-slate-500">
                  {isEdit
                    ? "Update your article, cover image, content and tags."
                    : "Write, save and publish your article on InkNest."}
                </p>
              </div>

              {/* ACTIONS */}

              <div className="flex shrink-0 items-center gap-2">
                {isEdit && (
                  <button
                    type="button"
                    disabled={loading || postDeleteLoading}
                    onClick={() => setOpenDeleteAlert(true)}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-rose-200 bg-white px-3 py-2 text-xs font-semibold text-rose-600 transition hover:border-rose-300 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <LuTrash2 size={14} />
                    Delete
                  </button>
                )}

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handlePublish(true)}
                  className="inline-flex items-center gap-1.5 rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <LuSave size={14} />
                  Save Draft
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handlePublish(false)}
                  className="inline-flex items-center gap-1.5 rounded-sm bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <LuLoaderCircle size={14} className="animate-spin" />
                  ) : (
                    <LuSend size={14} />
                  )}

                  {loading ? "Saving..." : "Publish"}
                </button>
              </div>
            </div>
          </div>

          {/* ==================================================
              MAIN GRID
          ================================================== */}

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            {/* =================================================
                EDITOR
            ================================================= */}

            <div
              className={
                isEdit || !isAIIdeasOpen ? "xl:col-span-12" : "xl:col-span-8"
              }
            >
              <div className="bg-white">
                {/* ERROR */}

                {error && (
                  <div className="mb-5 flex items-start gap-3 rounded-sm border border-rose-200 bg-rose-50 p-3">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-500" />

                    <div>
                      <p className="text-xs font-semibold text-rose-700">
                        Unable to continue
                      </p>

                      <p className="mt-0.5 text-xs text-rose-600">{error}</p>
                    </div>
                  </div>
                )}

                <div>
                  {/* =================================================
                      TITLE
                  ================================================= */}

                  <div className="border-b border-slate-100 pb-5">
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Post Title
                    </label>

                    <input
                      type="text"
                      placeholder="Give your story a title..."
                      value={postData.title}
                      onChange={({ target }) =>
                        handleValueChange("title", target.value)
                      }
                      className="w-full border-0 bg-transparent px-0 py-1 text-2xl font-semibold tracking-tight text-slate-900 outline-none placeholder:text-slate-300 focus:ring-0 sm:text-3xl"
                    />
                  </div>

                  {/* =================================================
                      COVER
                  ================================================= */}

                  <div className="mt-7">
                    <div className="mb-3">
                      <h3 className="text-sm font-semibold text-slate-800">
                        Cover Image
                      </h3>

                      <p className="mt-0.5 text-[11px] text-slate-400">
                        Recommended 1600 × 900 · JPG, PNG or WEBP
                      </p>
                    </div>

                    <div className="overflow-hidden rounded-sm">
                      <CoverImageSelector
                        image={postData.coverImageUrl}
                        setImage={(value) =>
                          handleValueChange("coverImageUrl", value)
                        }
                        preview={postData.coverPreview}
                        setPreview={(value) =>
                          handleValueChange("coverPreview", value)
                        }
                      />
                    </div>
                  </div>

                  {/* =================================================
                      CONTENT
                  ================================================= */}

                  <div className="mt-8">
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Content
                      </label>

                      <span className="text-[11px] text-slate-400">
                        Markdown supported
                      </span>
                    </div>

                    <div className="overflow-hidden bg-white">
                      <div data-color-mode="light" className="editor-paper">
                        <MDEditor
                          value={postData.content}
                          onChange={(data) =>
                            handleValueChange("content", data || "")
                          }
                          commands={[
                            commands.bold,
                            commands.italic,
                            commands.strikethrough,
                            commands.hr,
                            commands.title,
                            commands.divider,
                            commands.link,
                            commands.code,
                            commands.image,
                            commands.unorderedListCommand,
                            commands.orderedListCommand,
                            commands.checkedListCommand,
                          ]}
                          hideMenu={false}
                          preview="edit"
                          height={420}
                        />
                      </div>
                    </div>

                    {/* STATS */}

                    <div className="mt-3 flex items-center gap-4 px-1">
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <LuFileText size={12} />
                        {wordCount} words
                      </span>

                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <LuClock3 size={12} />
                        {readTime} min read
                      </span>
                    </div>
                  </div>

                  {/* =================================================
                      TAGS
                  ================================================= */}

                  <div className="mt-8 border-t border-slate-100 pt-6">
                    <div className="mb-2">
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Tags
                      </label>

                      <p className="mt-0.5 text-[11px] text-slate-400">
                        Add relevant topics to improve discoverability.
                      </p>
                    </div>

                    <div className="mt-3">
                      <TagInput
                        tags={postData.tags || []}
                        setTags={(data) => handleValueChange("tags", data)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                AI IDEAS - DESKTOP OPEN
            ================================================= */}

            {!isEdit && isAIIdeasOpen && (
              <div className="hidden xl:col-span-4 xl:block">
                <div className="sticky top-20 max-h-[calc(100vh-100px)] overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
                  {/* AI HEADER */}

                  <div className="shrink-0 border-b border-slate-200 bg-slate-900 px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-white/10">
                          <LuSparkles size={17} className="text-sky-300" />
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-white">
                            AI Blog Ideas
                          </h4>

                          <p className="mt-0.5 truncate text-[10px] text-slate-400">
                            Generate topics with AI assistance
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenBlogPostGenForm({
                              open: true,
                              data: null,
                            })
                          }
                          className="rounded-sm bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-800 transition hover:bg-sky-50 hover:text-sky-600"
                        >
                          Generate
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsAIIdeasOpen(false)}
                          className="flex h-7 w-7 items-center justify-center rounded-sm text-slate-400 transition hover:bg-white/10 hover:text-white"
                          aria-label="Collapse AI Blog Ideas"
                          title="Collapse AI Blog Ideas"
                        >
                          <LuChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* AI IDEAS */}

                  <div className="min-h-0 max-h-[calc(100vh-180px)] overflow-y-auto">
                    {ideaLoading ? (
                      <div className="p-2">
                        <SkeletonLoader />
                      </div>
                    ) : postIdeas.length > 0 ? (
                      <div>
                        {postIdeas.map((idea, index) => (
                          <BlogPostIdeaCard
                            key={`idea_${index}`}
                            title={idea.title || ""}
                            description={idea.description || ""}
                            tags={idea.tags || []}
                            tone={idea.tone || "casual"}
                            onSelect={() =>
                              setOpenBlogPostGenForm({
                                open: true,
                                data: idea,
                              })
                            }
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="px-5 py-10 text-center">
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                          <LuSparkles size={17} className="text-slate-400" />
                        </div>

                        <p className="mt-3 text-xs font-medium text-slate-600">
                          No ideas available
                        </p>

                        <p className="mt-1 text-[11px] text-slate-400">
                          Generate some AI-powered ideas to get started.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* =================================================
                COLLAPSED AI BUTTON - DESKTOP
            ================================================= */}

            {!isEdit && !isAIIdeasOpen && (
              <div className="hidden xl:block">
                <button
                  type="button"
                  onClick={() => setIsAIIdeasOpen(true)}
                  className="fixed right-0 top-[70%] z-30 flex -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-l-sm border border-r-0 border-slate-200 bg-slate-900 px-2 py-2.5 text-white shadow-md transition hover:bg-slate-800"
                  aria-label="Open AI Blog Ideas"
                  title="Open AI Blog Ideas"
                >
                  <LuChevronLeft size={13} />

                  <LuSparkles size={13} className="text-sky-300" />

                  <span className="text-[8px] font-semibold tracking-wide text-slate-300 [writing-mode:vertical-rl]">
                    AI
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================
          MOBILE AI BACKDROP
      ======================================================== */}

      {!isEdit && isAIMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-[2px] xl:hidden"
          onClick={() => setIsAIMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ========================================================
          MOBILE AI FLOATING WINDOW
      ======================================================== */}

      {!isEdit && isAIMobileOpen && (
        <div className="fixed left-1/2 top-20 z-50 flex w-[calc(100vw-2rem)] max-w-[520px] -translate-x-1/2 overflow-hidden rounded-sm bg-white shadow-2xl xl:hidden">
          <div className="flex max-h-[calc(100vh-6rem)] min-h-0 w-full flex-col">
            {/* MOBILE AI HEADER */}

            <div className="shrink-0 border-slate-200 bg-slate-900 px-3 py-3.5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-white/10">
                    <LuSparkles size={15} className="text-sky-300" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-white">
                      AI Blog Ideas
                    </h4>

                    <p className="mt-0.5 truncate text-[9px] text-slate-400">
                      Generate topics with AI assistance
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenBlogPostGenForm({
                        open: true,
                        data: null,
                      })
                    }
                    className="rounded-sm bg-white px-2.5 py-1.5 text-[10px] font-semibold text-slate-800 transition hover:bg-sky-50 hover:text-sky-600"
                  >
                    Generate
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAIMobileOpen(false)}
                    className="flex h-7 w-7 items-center justify-center rounded-sm text-slate-400 transition hover:bg-white/10 hover:text-white"
                    aria-label="Close AI Blog Ideas"
                    title="Close AI Blog Ideas"
                  >
                    <LuX size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* MOBILE AI IDEAS */}

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {ideaLoading ? (
                <div className="p-2">
                  <SkeletonLoader />
                </div>
              ) : postIdeas.length > 0 ? (
                <div>
                  {postIdeas.map((idea, index) => (
                    <BlogPostIdeaCard
                      key={`mobile_idea_${index}`}
                      title={idea.title || ""}
                      description={idea.description || ""}
                      tags={idea.tags || []}
                      tone={idea.tone || "casual"}
                      onSelect={() =>
                        setOpenBlogPostGenForm({
                          open: true,
                          data: idea,
                        })
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="px-5 py-10 text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                    <LuSparkles size={17} className="text-slate-400" />
                  </div>

                  <p className="mt-3 text-xs font-medium text-slate-600">
                    No ideas available
                  </p>

                  <p className="mt-1 text-[11px] text-slate-400">
                    Generate some AI-powered ideas to get started.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MOBILE AI OPEN BUTTON
      ======================================================== */}

      {!isEdit && !isAIMobileOpen && (
        <button
          type="button"
          onClick={() => setIsAIMobileOpen(true)}
          className="fixed right-0 top-[70%] z-30 flex h-9 w-8 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-l-sm border border-r-0 border-slate-200 bg-slate-900 text-white shadow-md transition hover:bg-slate-800 xl:hidden"
          aria-label="Open AI Blog Ideas"
          title="Open AI Blog Ideas"
        >
          <LuChevronLeft size={12} className="text-slate-400" />

          <LuSparkles size={13} className="text-sky-300" />

          <span className="text-[7px] font-semibold tracking-wide text-slate-300">
            AI
          </span>
        </button>
      )}

      {/* ========================================================
          AI GENERATION MODAL
      ======================================================== */}

      <Modal
        isOpen={openBlogPostGenForm?.open}
        onClose={() =>
          setOpenBlogPostGenForm({
            open: false,
            data: null,
          })
        }
        hideHeader
      >
        <GenerateBlogPostForm
          contentParams={openBlogPostGenForm?.data || null}
          setPostContent={(title, content, generatedTags) => {
            const postInfo = openBlogPostGenForm?.data || null;

            setPostData((prevState) => ({
              ...prevState,
              title: title || prevState.title,
              content: content || "",
              tags:
                generatedTags?.length > 0
                  ? generatedTags
                  : postInfo?.tags || prevState.tags,
              generatedByAI: true,
            }));
          }}
          handleCloseForm={() =>
            setOpenBlogPostGenForm({
              open: false,
              data: null,
            })
          }
        />
      </Modal>

      {/* ========================================================
          DELETE MODAL
      ======================================================== */}

      <Modal
        isOpen={openDeleteAlert}
        onClose={() => {
          if (!postDeleteLoading) {
            setOpenDeleteAlert(false);
          }
        }}
        title="Delete Blog Post"
      >
        <div className="w-full max-w-lg p-2">
          <DeleteAlertContent
            type="post"
            loading={postDeleteLoading}
            danger="true"
            content="Are you sure you want to permanently delete this blog post? This action cannot be undone."
            onDelete={deletePost}
          />
        </div>
      </Modal>
      <BlogSidebar />
    </BlogLayout>
  );
};

export default MemberPostEditor;
