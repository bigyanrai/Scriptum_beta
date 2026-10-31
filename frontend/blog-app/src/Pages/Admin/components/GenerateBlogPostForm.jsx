import Input from "../../../components/Inputs/Input";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import { LuLoaderCircle, LuSparkles } from "react-icons/lu";
import { useState } from "react";

const GenerateBlogPostForm = ({
  contentParams,
  setPostContent,
  handleCloseForm,
}) => {
  const [formData, setFormData] = useState({
    title: contentParams?.title || "",
    tone: contentParams?.tone || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleGenerateBlogPost = async (e) => {
    e.preventDefault();

    const { title, tone } = formData;

    if (!title || !tone) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_BLOG_POST,
        {
          title,
          tone,
        },
      );

      const generatedPost = aiResponse.data;

      setPostContent(
        title,
        generatedPost?.content || "",
        generatedPost?.tags || [],
      );

      handleCloseForm();
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[520px] p-5">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <LuSparkles className="text-[20px] text-slate-900" />
        </div>

        <h3 className="text-xl font-semibold tracking-tight text-slate-900">
          Generate a Blog Post
        </h3>

        <p className="mt-1.5 max-w-md text-sm leading-5 text-slate-500">
          Give your post a title and choose a writing tone. AI will create a
          complete, structured article for you.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleGenerateBlogPost} className="space-y-4">
        <div>
          <Input
            value={formData.title}
            onChange={({ target }) => handleChange("title", target.value)}
            label="Blog Post Title"
            placeholder="Enter your blog post title"
            type="text"
          />
        </div>

        <div>
          <Input
            value={formData.tone}
            onChange={({ target }) => handleChange("tone", target.value)}
            label="Writing Tone"
            placeholder="e.g. professional, beginner-friendly, casual"
            type="text"
          />

          <p className="mt-1.5 text-[11px] text-slate-400">
            Describe how you want the article to sound.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2.5">
            <p className="text-xs font-medium leading-4 text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* Generate */}
        <button
          className="
            mt-2 flex w-full items-center justify-center gap-2
            rounded-lg bg-black px-4 py-2.5
            text-sm font-semibold text-white
            shadow-sm
            transition-all duration-200
            hover:-translate-y-0.5
            hover:bg-slate-800
            hover:shadow-md
            disabled:cursor-not-allowed
            disabled:opacity-60
            disabled:hover:translate-y-0
            disabled:hover:shadow-sm
          "
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LuLoaderCircle className="animate-spin text-[17px]" />
              <span>Generating your post...</span>
            </>
          ) : (
            <>
              <LuSparkles className="text-[16px]" />
              <span>Generate Post</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default GenerateBlogPostForm;
