import DashboardLayout from "../../components/layouts/DashboardLayout";
import MDEditor, { commands } from "@uiw/react-md-editor";

import {
  LuLoaderCircle,
  LuSave,
  LuSend,
  LuSparkles,
  LuTrash2,
  LuFileText,
  LuClock3,
} from "react-icons/lu";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import CoverImageSelector from "../../components/Inputs/CoverImageSelector";
import TagInput from "../../components/Inputs/TagInput";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import BlogPostIdeaCard from "../../components/Cards/BlogPostIdeaCard";
import Modal from "../../components/Modal";
import GenerateBlogPostForm from "./components/GenerateBlogPostForm";

import uploadImage from "../../utils/uploadImage";
import { toast } from "react-hot-toast";
import { getToastMessageByType } from "../../utils/helper";
import DeleteAlertContent from "../../components/DeleteAlertContent";

const BlogPostEditor = ({ isEdit }) => {
  const navigate = useNavigate();
  const { postSlug = "" } = useParams();

  const [postData, setPostData] = useState({
    id: "",
    title: "",
    content: "",
    coverImageUrl: "",
    coverPreview: "",
    tags: [],
    isDraft: "",
    generatedByAI: false,
  });

  const [postIdeas, setPostIdeas] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [postDeleteLoading, setPostDeleteLoading] = useState(false);

  const [openBlogPostGenForm, setOpenBlogPostGenForm] = useState({
    open: false,
    data: null,
  });

  const [ideaLoading, setIdeaLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setPostData((prevData) => ({
      ...prevData,
      [key]: value,
    }));

    if (error) {
      setError("");
    }
  };

  // --------------------------------------------
  // Generate AI post ideas
  // --------------------------------------------
  const generatePostIdeas = async () => {
    setIdeaLoading(true);

    try {
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_BLOG_POST_IDEAS,
      );

      const generatedIdeas = aiResponse.data;

      if (generatedIdeas?.length > 0) {
        setPostIdeas(generatedIdeas);
      }
    } catch (error) {
      console.error("Failed to generate blog ideas:", error);
    } finally {
      setIdeaLoading(false);
    }
  };

  // --------------------------------------------
  // Publish / Save Draft
  // --------------------------------------------
  const handlePublish = async (isDraft) => {
    let coverImageUrl = "";

    // Validation
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
      // Upload new cover image
      if (postData.coverImageUrl instanceof File) {
        const imgUploadRes = await uploadImage(postData.coverImageUrl);
        coverImageUrl = imgUploadRes.imageUrl || "";
      } else {
        coverImageUrl = postData.coverPreview || "";
      }

      const reqPayload = {
        title: postData.title.trim(),
        content: postData.content,
        coverImageUrl,
        tags: postData.tags,
        isDraft: isDraft,
        generatedByAI: postData.generatedByAI,
      };

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

        navigate("/admin/posts");
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

  // --------------------------------------------
  // Fetch post
  // --------------------------------------------
  const fetchPostDetailsBySlug = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.POSTS.GET_BY_SLUG(postSlug),
      );

      if (response.data) {
        const data = response.data;

        setPostData((prevState) => ({
          ...prevState,
          id: data._id,
          title: data.title,
          content: data.content,
          coverPreview: data.coverImageUrl,
          tags: data.tags || [],
          isDraft: data.isDraft,
          generatedByAI: data.generatedByAI,
        }));
      }
    } catch (error) {
      console.error("Error fetching blog post:", error);
      setError("Failed to load blog post.");
    }
  };

  // --------------------------------------------
  // Delete post
  // --------------------------------------------
  const deletePost = async () => {
    try {
      setPostDeleteLoading(true);
      await axiosInstance.delete(API_PATHS.POSTS.DELETE(postData.id));

      toast.success("Blog Post Deleted Successfully.");

      setOpenDeleteAlert(false);
      navigate("/admin/posts");
    } catch (error) {
      console.error("Error deleting blog post:", error);

      toast.error(
        error?.response?.data?.message || "Failed to delete blog post",
      );
    } finally {
      setPostDeleteLoading(false);
    }
  };

  // --------------------------------------------
  // Initial load
  // --------------------------------------------
  useEffect(() => {
    if (isEdit) {
      fetchPostDetailsBySlug();
    } else {
      generatePostIdeas();
    }
  }, []);

  // --------------------------------------------
  // Word count
  // --------------------------------------------
  const wordCount =
    postData.content
      ?.replace(/[#_*`>\-\n]/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length || 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <DashboardLayout activeMenu="Blog Posts">
      <div className="min-h-screen bg-slate-50 ">
        <div className="mx-auto max-w-[1400px] p-1">
          {/* =========================================================
              HEADER
          ========================================================= */}
          <div className="mb-2">
            <div className="rounded-sm border border-slate-200 bg-white  p-3">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div>
                      <h1 className="text-xl font-bold tracking-tight text-slate-900">
                        {isEdit ? "Edit Blog Post" : "Create New Blog Post"}
                      </h1>
                    </div>
                  </div>

                  <p className="mt-2 max-w-2xl text-xs text-slate-500">
                    {isEdit
                      ? "Update your article, cover image, content and tags."
                      : "Create and publish engaging articles with markdown and AI assistance."}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-2">
                  {isEdit && (
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => setOpenDeleteAlert(true)}
                      className="
                        inline-flex items-center gap-1.5
                        rounded-lg border border-rose-200
                        bg-white px-3 py-2
                        text-xs font-semibold text-rose-600
                        transition-all duration-200
                        hover:border-rose-300
                        hover:bg-rose-50
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      <LuTrash2 size={14} />
                      Delete
                    </button>
                  )}

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handlePublish(true)}
                    className="
                      inline-flex items-center gap-1.5
                      rounded-lg border border-slate-200
                      bg-white px-3 py-2
                      text-xs font-semibold text-slate-600
                      transition-all duration-200
                      hover:border-sky-200
                      hover:bg-gray-100
                     
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <LuSave size={14} />
                    Save Draft
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handlePublish(false)}
                    className="
    inline-flex items-center gap-1.5
    rounded-lg
    bg-black
    px-4 py-2
    text-xs font-semibold text-white
    shadow-sm
    transition-all duration-200
    hover:bg-gray-600
    hover:shadow-md
    hover:-translate-y-0.5
    disabled:cursor-not-allowed
    disabled:opacity-50
  "
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
          </div>

          {/* =========================================================
              MAIN GRID
          ========================================================= */}
          <div className="grid grid-cols-1 gap-2 xl:grid-cols-12">
            {/* =======================================================
                EDITOR
            ======================================================= */}
            <div className={isEdit ? "xl:col-span-12" : "xl:col-span-8"}>
              <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
                {/* Error */}
                {error && (
                  <div className="m-2 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-2">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-500" />

                    <div>
                      <p className="text-xs font-semibold text-rose-700">
                        Unable to continue
                      </p>

                      <p className="mt-0.5 text-xs text-rose-600">{error}</p>
                    </div>
                  </div>
                )}

                <div className="p-2">
                  {/* =================================================
                      TITLE
                  ================================================= */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                      Post Title
                    </label>

                    <input
                      type="text"
                      placeholder="Enter an engaging title..."
                      value={postData.title}
                      onChange={({ target }) =>
                        handleValueChange("title", target.value)
                      }
                      className="
                        w-full
                        rounded-sm
                        border border-slate-200
                        bg-slate-50/50
                        px-4 py-2.5
                        text-sm font-medium text-slate-900
                        placeholder:text-slate-400
                        outline-none
                        transition-all duration-200
                       
                        focus:bg-white
                      
                       
                      "
                    />
                  </div>

                  {/* =================================================
                      COVER IMAGE
                  ================================================= */}
                  <div className="mt-5 rounded-sm border border-slate-200 bg-slate-50/50 p-2">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-800">
                          Cover Image
                        </h3>

                        <p className="mt-0.5 text-[11px] text-slate-400">
                          Recommended 1600 × 900 · JPG, PNG or WEBP
                        </p>
                      </div>
                    </div>

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

                  {/* =================================================
                      CONTENT
                  ================================================= */}
                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-700">
                        Content
                      </label>

                      <span className="text-[11px] text-slate-400">
                        Markdown supported
                      </span>
                    </div>

                    <div className="overflow-hidden rounded-sm border border-slate-200 bg-white">
                      <div className="border-b border-slate-200 bg-slate-50 px-4 py-2">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />

                          <span className="ml-2 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                            Markdown Editor
                          </span>
                        </div>
                      </div>

                      <div data-color-mode="light" className="p-1.5">
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

                    {/* Stats */}
                    <div className="mt-2 flex items-center gap-4 px-1">
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
                  <div className="mt-5 rounded-sm border border-slate-200 bg-slate-50/50 p-2">
                    <div className="mb-2">
                      <label className="block text-xs font-semibold text-slate-700">
                        Tags
                      </label>

                      <p className="mt-0.5 text-[11px] text-slate-400">
                        Add relevant topics to improve discoverability.
                      </p>
                    </div>

                    <TagInput
                      tags={postData?.tags || []}
                      setTags={(data) => handleValueChange("tags", data)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =======================================================
                AI IDEAS
            ======================================================= */}
            {!isEdit && (
              <div className="xl:col-span-4">
                <div className="sticky top-20 overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
                  {/* AI Header */}
                  <div className="border-b border-slate-200 bg-slate-900 px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
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

                      <button
                        type="button"
                        onClick={() =>
                          setOpenBlogPostGenForm({
                            open: true,
                            data: null,
                          })
                        }
                        className="
                          shrink-0
                          rounded-lg
                          bg-white
                          px-3 py-1.5
                          text-[11px]
                          font-semibold
                          text-slate-800
                          transition-all
                          hover:bg-sky-50
                          hover:text-sky-600
                        "
                      >
                        Generate
                      </button>
                    </div>
                  </div>

                  {/* AI Ideas */}
                  <div className="max-h-[calc(100vh-190px)] overflow-y-auto">
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
          </div>
        </div>
      </div>

      {/* =============================================================
          AI GENERATION MODAL
      ============================================================= */}
      <Modal
        isOpen={openBlogPostGenForm?.open}
        onClose={() => {
          setOpenBlogPostGenForm({
            open: false,
            data: null,
          });
        }}
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
          handleCloseForm={() => {
            setOpenBlogPostGenForm({
              open: false,
              data: null,
            });
          }}
        />
      </Modal>

      {/* =============================================================
          DELETE MODAL
      ============================================================= */}
      <Modal
        isOpen={openDeleteAlert}
        onClose={() => {
          setOpenDeleteAlert(false);
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
    </DashboardLayout>
  );
};

export default BlogPostEditor;
