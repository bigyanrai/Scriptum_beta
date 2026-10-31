export const blogPostIdeasPrompt = () => `
Generate a list of 5 unique blog post ideas.

Choose fresh and interesting topics yourself from current trending areas such as technology, artificial intelligence, software development, science, sports, entertainment, business, global events, culture, or other relevant fields.

Avoid repeating common generic ideas. Select topics that are currently interesting and have potential value for readers.

For each blog post idea, return:
- a title
- a 2-line description about the post
- 3 relevant tags
- the tone (e.g., technical, casual, beginner-friendly, analytical, etc.)

Return the result as an array of JSON objects in this exact format:

[
  {
    "title": "",
    "description": "",
    "tags": ["", "", ""],
    "tone": ""
  }
]

Important:
- Do not add any explanation or extra text outside the JSON format.
- Only return valid JSON.
- Each generation should contain different ideas and topics.
`;

export const generateReplyPrompt = (comment) => {
  const authorName = comment.author?.name || "User";
  const content = comment.content;

  return `You are replying to a blog comment written by ${authorName}.

Comment:
"${content}"

Write ONE thoughtful, concise, natural, and relevant reply to this comment.

Rules:
- Return only the reply text.
- Do not provide multiple options.
- Do not use labels such as "Option 1", "Option 2", or "Option 3".
- Do not explain your reasoning.
- Do not put the reply inside quotation marks.
- Keep it conversational and suitable for a blog comment.
- Keep the reply between 1 and 3 sentences.`;
};
export const blogSummaryPrompt = (blogContent) => `
  You are an AI assistant that summarizes blog posts.
  
  Instructions:
  - Read the blog post content below.
  - Generate a short, catchy, SEO-friendly title (max 12 words).
  - Write a clear, engaging summary of about 300 words.
  - At the end of the summary, add a markdown section titled **## What You'll Learn**.
  - Under that heading, list 3-5 key takeaways or skills the reader will learn in **bullet points** using markdown (\`- \`).

  Return the result in **valid JSON** with the following structure:

  {
  "title": "Short SEO-friendly title",
  "summary": "300-word summary with a markdown section for What You'll Learn"
  }

  Only return valid JSON. Do not include markdown or code blocks around the JSON.

  Blog Post Content:
  ${blogContent}
  `;
