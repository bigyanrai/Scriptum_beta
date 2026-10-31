export const cleanMarkdown = (text = "") => {
  return (
    text
      // Remove fenced code blocks
      .replace(/```[\s\S]*?```/g, " ")

      // Remove inline code
      .replace(/`[^`]*`/g, " ")

      // Remove markdown headings
      .replace(/^#+\s+/gm, "")

      // Remove images
      .replace(/!\[.*?\]\(.*?\)/g, " ")

      // Keep link text
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")

      // Remove markdown emphasis
      .replace(/[*_~]/g, "")

      // Remove apostrophes
      .replace(/'/g, "")

      // Replace punctuation with spaces
      .replace(/[.,!?;:()[\]{}"]/g, " ")

      // Keep + # and .
      .replace(/[-/\\]/g, " ")

      .toLowerCase()

      .replace(/\s+/g, " ")

      .trim()
  );
};
