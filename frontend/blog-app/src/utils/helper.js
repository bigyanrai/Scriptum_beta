export const getInitials = (name = "") => {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return "";

  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
export const getToastMessageByType = (type) => {
  switch (type) {
    case "edit":
      return "Blog post updated successfully!";
    case "draft":
      return "Blog post saved as draft successfully!";
    case "published":
      return "Blog post published successfully!";
    default:
      return "Blog post published successfully!";
  }
};

export const sanitizeMarkdown = (content) => {
  const markdownBlockRegex = /^```(?:markdown)?\n([\s\S]*?)\n```$/;

  const match = content.match(markdownBlockRegex);
  return match ? match[1] : content;
};

export const calculateReadingTime = (text = "") => {
  const words = text
    .replace(/[#*_>`~[\]()!-]/g, "")
    .trim()
    .split(/\s+/).length;

  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} min read`;
};
