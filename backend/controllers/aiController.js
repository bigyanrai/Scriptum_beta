import { GoogleGenAI } from "@google/genai";
import {
  blogPostIdeasPrompt,
  generateReplyPrompt,
  blogSummaryPrompt,
} from "../utils/prompts.js";

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateBlogPost = async (req, res) => {
  try {
    const { title, tone } = req.body;

    if (!title || !tone) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    //     const prompt = `
    // Generate a complete, engaging blog post about "${title}".

    // Requirements:

    // - Use a ${tone} tone.
    // - Start with an engaging introduction.
    // - Include at least 4 meaningful sections using ## headings.
    // - End with a thoughtful conclusion.
    // - Use proper Markdown formatting.
    // - Make the content informative, accurate, and easy to read.
    // - Write naturally as if it were written by a human.
    // - Add examples only when they help explain the topic.
    // - Keep the blog at least 1000 words.
    // - Generate exactly 3 to 4 short, relevant tags for the blog post.
    // - Tags should be simple topic keywords.
    // - Do not include the # symbol in tags.

    // Code Instructions:

    // - If the topic is about programming, software development, web development, AI,
    //   cybersecurity, databases, DevOps, or other technical coding subjects,
    //   include relevant code snippets using fenced code blocks.
    // - If the topic is NOT related to coding or software development, DO NOT include
    //   any code snippets, pseudo-code, terminal commands, JSON, HTML, CSS,
    //   JavaScript, or programming examples.

    // Important:

    // - Adapt the content to the subject automatically.
    // - Do not force technical explanations into non-technical topics.

    // Return ONLY valid JSON in exactly this structure:

    // {
    //   "content": "The complete blog post in Markdown format",
    //   "tags": ["tag1", "tag2", "tag3", "tag4"]
    // }
    // `;

    const prompt = `
You are an expert professional blog writer, researcher, and editor.

Your task is to create a high-quality, original, publication-ready blog post about:

"${title}"

The article must use a ${tone} tone.

Your goal is NOT to follow a fixed article template. Instead, first understand the subject, identify what type of article would best serve the reader, and then design the structure accordingly.

==================================================
1. UNDERSTAND THE TOPIC FIRST
==================================================

Before writing, internally determine:

- What is the primary subject?
- What type of content best fits the subject?
- Who is the likely audience?
- What would the reader want to learn or understand?
- What context is necessary?
- What supporting information would make the article more valuable?
- What structure would feel natural for this specific subject?

Possible article types include, but are not limited to:

- Educational / explanatory
- Beginner's guide
- Advanced guide
- How-to / tutorial
- Step-by-step guide
- Historical analysis
- Biography
- Conceptual deep dive
- Comparison
- List / ranked article
- Opinion / editorial
- Critical analysis
- Review
- Case study
- Technical guide
- Problem-solving guide
- Industry / business analysis
- Science / technology explainer
- Cultural analysis
- Travel guide
- Practical advice
- Frequently asked questions
- Timeline / chronological article
- Story-driven article

Choose the most appropriate format automatically.

Do NOT force the article into one of these formats if another structure would be more natural.

==================================================
2. DYNAMIC ARTICLE STRUCTURE
==================================================

Do NOT use the same structure for every article.

The structure must depend on the topic.

For example:

- A historical topic may benefit from chronology, causes, major events,
  consequences, important figures, and historical significance.

- A biography may focus on early life, major influences, career,
  achievements, failures, controversies, legacy, and why the person matters.

- A technical topic may include concepts, architecture, implementation,
  examples, common mistakes, best practices, and troubleshooting.

- A how-to topic should prioritize actionable steps, prerequisites,
  practical examples, common problems, and verification.

- A comparison should establish meaningful evaluation criteria and compare
  the subjects fairly instead of simply listing superficial differences.

- A movie/book/cultural analysis should focus on themes, context,
  interpretation, strengths, weaknesses, symbolism, and significance when
  appropriate.

- A scientific topic should explain the underlying concept clearly,
  distinguish established knowledge from uncertainty, and use examples
  or analogies when they improve understanding.

- A business or industry topic may benefit from market context, key factors,
  examples, implications, challenges, and future considerations.

These are examples, NOT mandatory templates.

Create a structure that feels specifically designed for the requested topic.

==================================================
3. LENGTH AND DEPTH
==================================================

Write a substantial, detailed article.

Target approximately 1,800–2,500 words.

For subjects that genuinely require more depth, you may exceed this range.

Do NOT artificially increase length by repeating the same idea, adding filler,
or creating unnecessary sections.

Every section should provide new information, insight, context, examples,
analysis, or practical value.

Prefer depth and usefulness over simply reaching a word count.

==================================================
4. INTRODUCTION
==================================================

Create an engaging introduction that naturally establishes:

- Why the topic matters
- What makes it interesting or relevant
- What the reader will understand by the end

Avoid generic openings such as:

"Have you ever wondered..."
"In today's fast-paced world..."
"Whether you're a beginner or an expert..."
"Technology has changed the world..."

Unless such an opening genuinely fits the topic.

The introduction should feel written specifically for this article.

==================================================
5. CONTENT QUALITY
==================================================

Write as an experienced human writer and subject-matter-aware editor.

The article should be:

- Informative
- Specific
- Accurate
- Well researched
- Coherent
- Natural
- Professional
- Engaging
- Original
- Easy to read without being simplistic

Avoid:

- Generic AI-style filler
- Repetitive explanations
- Excessive bullet points
- Unnecessary headings
- Obvious statements
- Repeating the title in different forms
- Overusing phrases such as "in conclusion"
- Empty motivational language
- Artificially dramatic writing
- Unsupported claims
- Making every section look identical

Use paragraphs when paragraphs are best.

Use lists when lists genuinely improve readability.

Use subsections only when the subject benefits from them.

==================================================
6. MARKDOWN
==================================================

Return the article in clean Markdown.

Use Markdown naturally, including when appropriate:

- ## and ### headings
- Bold text
- Italics
- Bullet lists
- Numbered lists
- Blockquotes
- Tables
- Code blocks
- Links
- Callout-style sections

However:

DO NOT use every Markdown feature in every article.

Only use an element when it genuinely improves the reader's understanding.

==================================================
7. TABLES
==================================================

Tables are OPTIONAL.

Do NOT generate a table simply because Markdown supports tables.

Use a table only when the information is naturally structured for
side-by-side comparison or compact reference.

Good examples include:

- Comparing technologies
- Comparing historical periods
- Comparing products or approaches
- Summarizing specifications
- Showing structured differences
- Presenting compact reference information

If a table would make the article feel forced, confusing, or unnecessary,
DO NOT include one.

==================================================
8. CODE
==================================================

Code is OPTIONAL.

If the topic is related to:

- Programming
- Software development
- Web development
- AI / machine learning
- Cybersecurity
- Databases
- DevOps
- APIs
- Cloud computing
- Data engineering
- Other technical subjects

include code examples ONLY when they genuinely help explain the concept.

Use appropriate fenced code blocks with the correct language identifier.

For example:

\`\`\`javascript
// example
\`\`\`

Do NOT add code merely to make a technical article appear more detailed.

For non-technical topics, NEVER generate code, pseudo-code, terminal commands,
JSON, HTML, CSS, JavaScript, or programming examples.

==================================================
9. EXAMPLES
==================================================

Use examples when they make an abstract concept easier to understand.

Examples may include:

- Real-world situations
- Historical examples
- Hypothetical scenarios
- Technical examples
- Practical demonstrations
- Relevant case studies

Do not force examples into every section.

==================================================
10. FACTS, RESEARCH AND CITATIONS
==================================================

When the article contains factual claims that would benefit from verification,
use credible external sources.

Prioritize authoritative sources such as:

- Official government websites
- Universities and academic institutions
- Peer-reviewed research
- Official documentation
- Established organizations
- Primary sources
- Reputable publications
- Official company documentation when discussing a company's own products

Avoid low-quality SEO websites, content farms, anonymous blogs,
or unreliable sources.

When useful, include inline Markdown links to relevant sources.

For example:

[World Health Organization](https://www.who.int/)

Do NOT invent URLs.

Do NOT invent studies, statistics, quotations, publication titles,
authors, dates, or sources.

If you are not confident that a specific source or URL is real,
do not fabricate it.

Citations and external links are OPTIONAL and should be used when they
meaningfully improve credibility or allow the reader to explore the subject.

Do not add citations to obvious general knowledge merely for decoration.

==================================================
11. LINKS AND REFERENCES
==================================================

Use links when they provide genuine value, such as:

- Official documentation
- Primary sources
- Research papers
- Government resources
- Official organizations
- Original interviews
- Official product pages
- Books or academic resources
- Important historical sources

Do not create a "Sources" section automatically.

Only include a dedicated references/sources section when the nature of the
article makes it useful, such as research-heavy, historical, scientific,
technical, or investigative content.

==================================================
12. SPECIALIZED TOPICS
==================================================

Adapt your writing style to the subject.

For technical subjects:
- Explain concepts progressively.
- Define unfamiliar terminology.
- Include practical examples where useful.
- Mention common mistakes and best practices when relevant.

For historical subjects:
- Provide necessary historical context.
- Maintain chronological clarity where appropriate.
- Distinguish established facts from interpretation.

For scientific subjects:
- Explain complex concepts clearly.
- Avoid overstating uncertain findings.
- Distinguish evidence from speculation.

For reviews and criticism:
- Provide actual analysis rather than simply summarizing.
- Discuss strengths and weaknesses where relevant.
- Explain WHY something succeeds or fails.

For opinion/editorial topics:
- Clearly distinguish opinion from factual claims.
- Build a logical argument.
- Consider reasonable opposing perspectives when appropriate.

For how-to articles:
- Make the instructions practical and sequential.
- Mention prerequisites.
- Explain common mistakes.
- Include troubleshooting when useful.

For comparison articles:
- Compare based on meaningful criteria.
- Avoid declaring an arbitrary winner when the answer depends on the
  reader's needs.

==================================================
13. HUMAN-LIKE EDITORIAL QUALITY
==================================================

The article should feel intentionally written rather than generated from
a reusable template.

Vary:

- Section lengths
- Paragraph lengths
- Sentence structure
- Use of lists
- Use of examples
- Use of subsections
- Article progression

Some articles may have many sections.

Some may have fewer, deeper sections.

Some may use a table.

Some may not.

Some may contain code.

Some may not.

Some may contain external references.

Some may not.

The structure should be determined by the subject, not by a fixed formula.

==================================================
14. CONCLUSION
==================================================

End the article naturally.

The conclusion should synthesize the most important ideas and leave the reader
with a useful final perspective.

Do not simply repeat the introduction.

Do not use a generic conclusion such as:

"In conclusion, [topic] is very important..."

unless it genuinely fits the article.

==================================================
15. TAGS
==================================================

Generate exactly 3 to 4 short, relevant tags.

Rules:

- Tags must be directly related to the article.
- Prefer concise topic keywords.
- Do not use the "#" symbol.
- Do not create generic tags such as "blog", "article", "interesting",
  "information", or "guide" unless genuinely relevant.
- Avoid duplicate or nearly identical tags.

==================================================
16. FINAL OUTPUT
==================================================

Return ONLY valid JSON.

Use exactly this structure:

{
  "content": "Complete blog post in Markdown format",
  "tags": ["tag1", "tag2", "tag3", "tag4"]
}

The "content" field must contain the complete article.

The "tags" field must contain exactly 3 or 4 tags.

Do not include explanations outside the JSON.
Do not wrap the JSON in Markdown code fences.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;

    // Remove possible Markdown code fences around JSON
    rawText = rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const generatedData = JSON.parse(rawText);

    // Safety validation
    const content = generatedData?.content || "";

    const tags = Array.isArray(generatedData?.tags)
      ? generatedData.tags
          .filter((tag) => typeof tag === "string")
          .map((tag) => tag.trim())
          .filter(Boolean)
          .slice(0, 4)
      : [];

    if (!content) {
      return res.status(500).json({
        message: "AI failed to generate blog content.",
      });
    }

    return res.status(200).json({
      content,
      tags,
    });
  } catch (error) {
    console.error("AI blog generation error:", error);

    if (error.status === 429) {
      return res.status(429).json({
        message: "AI request limit reached. Please try again in a minute.",
      });
    }

    if (error instanceof SyntaxError) {
      return res.status(500).json({
        message: "AI returned an invalid response. Please try again.",
      });
    }

    return res.status(500).json({
      message: "Failed to generate blog post",
      error: error.message,
    });
  }
};

export const generateBlogPostIdeas = async (req, res) => {
  try {
    const prompt = blogPostIdeasPrompt();
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });
    let rawText = response.text;

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedText);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate blog post ideas",
      error: error.message,
    });
  }
};

export const generateCommentReply = async (req, res) => {
  try {
    const { author, content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const prompt = generateReplyPrompt({ author, content });

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;
    res.status(200).json(rawText);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate blog post reply",
      error: error.message,
    });
  }
};
export const generatePostSummary = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const prompt = blogSummaryPrompt(content);

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;

    //clean it : remove ```json and ``` from begining and end
    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedText);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate blog post summary",
      error: error.message,
    });
  }
};
