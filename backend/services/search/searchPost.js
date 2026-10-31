import SearchIndex from "../../models/SearchIndex.js";
import BlogPost from "../../models/BlogPost.js";
import Comment from "../../models/Comment.js";

import { cleanMarkdown } from "./cleaner.js";
import { tokenize } from "./tokenizer.js";
import { removeStopWords } from "./stopWords.js";
import { calculateTF } from "./tf.js";
import { calculateTFIDF } from "./tfidf.js";
import { createVector } from "./vector.js";
import { cosineSimilarity } from "./cosine.js";

/*
|--------------------------------------------------------------------------
| Search configuration
|--------------------------------------------------------------------------
*/

/*
 * Minimum number of characters required before searching.
 *
 * Example:
 *
 * "j"       -> no search
 * "ja"      -> search
 * "javasc"  -> search
 */
const MIN_QUERY_LENGTH = 2;

/*
 * Maximum number of vocabulary terms that can match
 * a single prefix.
 *
 * This prevents something like:
 *
 * "a"
 *
 * from matching hundreds/thousands of vocabulary terms.
 */
const MAX_PREFIX_MATCHES = 10;

/*
|--------------------------------------------------------------------------
| Relevance configuration
|--------------------------------------------------------------------------
*/

/*
 * Minimum cosine similarity.
 *
 * Very tiny cosine scores usually represent extremely weak
 * relationships between the query and document.
 *
 * We still allow lexical matches to survive through the
 * lexical relevance score.
 */
const MIN_COSINE_SCORE = 0.01;

/*
 * Exact phrase appearing in the title.
 *
 * This is intentionally a bonus rather than replacing
 * cosine similarity.
 */
const EXACT_TITLE_BONUS = 0.2;

/*
 * Exact phrase appearing in a tag.
 */
const EXACT_TAG_BONUS = 0.15;

/*
 * Query token appearing as a prefix of a title token.
 */
const PREFIX_TITLE_BONUS = 0.1;

/*
 * Query token appearing as a prefix of a tag token.
 */
const PREFIX_TAG_BONUS = 0.08;

/*
 * Exact query token appearing in the title.
 *
 * Example:
 *
 * query: javascript
 * title: JavaScript Tutorial
 */
const TITLE_TOKEN_BONUS = 0.08;

/*
 * Exact query token appearing in a tag.
 */
const TAG_TOKEN_BONUS = 0.06;

/*
 * Maximum amount of lexical bonus.
 *
 * This prevents lexical matching from completely
 * overpowering TF-IDF + cosine similarity.
 */
const MAX_LEXICAL_BONUS = 0.35;

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

/**
 * Return an empty paginated response.
 */
const getEmptyPaginatedResponse = (page, limit) => {
  const currentPage = Math.max(Number(page) || 1, 1);

  const perPage = Math.max(Number(limit) || 9, 1);

  return {
    posts: [],

    pagination: {
      currentPage,
      totalPages: 0,
      totalResults: 0,
      limit: perPage,
    },
  };
};

/**
 * Check whether a vector contains a meaningful value.
 */
const hasNonZeroValues = (vector = []) => {
  return vector.some((value) => Number.isFinite(value) && value !== 0);
};

/**
 * Normalize text for lexical comparison.
 *
 * This is NOT replacing your TF-IDF cleaning pipeline.
 *
 * It is only used for exact/prefix lexical relevance signals.
 */
const normalizeText = (text = "") => {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9+#.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

/**
 * Convert text into simple lexical tokens.
 *
 * We intentionally use the same tokenizer used by
 * the search system.
 */
const getSearchTokens = (text = "") => {
  const cleaned = cleanMarkdown(String(text || ""));

  const tokens = tokenize(cleaned);

  return removeStopWords(tokens);
};

/**
 * Check whether a query phrase appears in text.
 */
const containsExactPhrase = (text, query) => {
  const normalizedText = normalizeText(text);
  const normalizedQuery = normalizeText(query);

  if (!normalizedText || !normalizedQuery) {
    return false;
  }

  return normalizedText.includes(normalizedQuery);
};

/**
 * Check whether any query token exactly appears in a collection
 * of tokens.
 */
const hasExactTokenMatch = (queryTokens, targetTokens) => {
  if (!queryTokens.length || !targetTokens.length) {
    return false;
  }

  const targetSet = new Set(targetTokens);

  return queryTokens.some((token) => targetSet.has(token));
};

/**
 * Check whether any query token is a prefix of any target token.
 *
 * Example:
 *
 * query token:
 *     javasc
 *
 * target:
 *     javascript
 *
 * result:
 *     true
 */
const hasPrefixTokenMatch = (queryTokens, targetTokens) => {
  if (!queryTokens.length || !targetTokens.length) {
    return false;
  }

  return queryTokens.some((queryToken) =>
    targetTokens.some(
      (targetToken) =>
        targetToken.startsWith(queryToken) && targetToken !== queryToken,
    ),
  );
};

/**
 * Calculate lexical relevance.
 *
 * This DOES NOT replace cosine similarity.
 *
 * It is only an additional ranking signal.
 */
const calculateLexicalRelevance = ({ query, queryTokens, title, tags }) => {
  const normalizedTitle = normalizeText(title);

  const normalizedTags = (tags || []).map((tag) => normalizeText(tag));

  /*
  |--------------------------------------------------------------------------
  | Title tokens
  |--------------------------------------------------------------------------
  */

  const titleTokens = getSearchTokens(title);

  /*
  |--------------------------------------------------------------------------
  | Tag tokens
  |--------------------------------------------------------------------------
  */

  const tagTokens = [];

  normalizedTags.forEach((tag) => {
    tagTokens.push(...getSearchTokens(tag));
  });

  let lexicalBonus = 0;

  /*
  |--------------------------------------------------------------------------
  | Exact title phrase
  |--------------------------------------------------------------------------
  |
  | Example:
  |
  | query:
  |     javascript
  |
  | title:
  |     Learn JavaScript in 30 Minutes
  |
  */

  if (containsExactPhrase(normalizedTitle, query)) {
    lexicalBonus += EXACT_TITLE_BONUS;
  }

  /*
  |--------------------------------------------------------------------------
  | Exact tag phrase
  |--------------------------------------------------------------------------
  */

  if (normalizedTags.some((tag) => containsExactPhrase(tag, query))) {
    lexicalBonus += EXACT_TAG_BONUS;
  }

  /*
  |--------------------------------------------------------------------------
  | Exact title token
  |--------------------------------------------------------------------------
  */

  if (hasExactTokenMatch(queryTokens, titleTokens)) {
    lexicalBonus += TITLE_TOKEN_BONUS;
  }

  /*
  |--------------------------------------------------------------------------
  | Exact tag token
  |--------------------------------------------------------------------------
  */

  if (hasExactTokenMatch(queryTokens, tagTokens)) {
    lexicalBonus += TAG_TOKEN_BONUS;
  }

  /*
  |--------------------------------------------------------------------------
  | Prefix title match
  |--------------------------------------------------------------------------
  |
  | Example:
  |
  | query:
  |     javasc
  |
  | title:
  |     JavaScript Tutorial
  |
  */

  if (hasPrefixTokenMatch(queryTokens, titleTokens)) {
    lexicalBonus += PREFIX_TITLE_BONUS;
  }

  /*
  |--------------------------------------------------------------------------
  | Prefix tag match
  |--------------------------------------------------------------------------
  */

  if (hasPrefixTokenMatch(queryTokens, tagTokens)) {
    lexicalBonus += PREFIX_TAG_BONUS;
  }

  /*
  |--------------------------------------------------------------------------
  | Prevent lexical bonuses from becoming too powerful.
  |--------------------------------------------------------------------------
  */

  return Math.min(lexicalBonus, MAX_LEXICAL_BONUS);
};

/*
|--------------------------------------------------------------------------
| Prefix vocabulary expansion
|--------------------------------------------------------------------------
*/

/**
 * Expand one query token into vocabulary terms.
 *
 * Example:
 *
 * query:
 *     javasc
 *
 * vocabulary:
 *     java
 *     javascript
 *     javascriptdom
 *     javascriptframework
 *
 * result:
 *
 *     javascript
 *     javascriptdom
 *     javascriptframework
 */
const expandQueryToken = (token, vocabularySet, vocabulary) => {
  const normalizedToken = token.toLowerCase();

  /*
  |--------------------------------------------------------------------------
  | Exact vocabulary match
  |--------------------------------------------------------------------------
  */

  if (vocabularySet.has(normalizedToken)) {
    return [
      {
        term: normalizedToken,
        weight: 1,
        type: "exact",
      },
    ];
  }

  /*
  |--------------------------------------------------------------------------
  | Prefix vocabulary match
  |--------------------------------------------------------------------------
  */

  const prefixMatches = vocabulary
    .filter(
      (term) => typeof term === "string" && term.startsWith(normalizedToken),
    )
    .slice(0, MAX_PREFIX_MATCHES);

  return prefixMatches.map((term) => ({
    term,
    weight: 0.75,
    type: "prefix",
  }));
};

/**
 * Build weighted query TF.
 *
 * Exact vocabulary matches receive:
 *
 *     1.0
 *
 * Prefix vocabulary matches receive:
 *
 *     0.75
 */
const buildWeightedQueryTF = (queryTokens, vocabulary) => {
  const vocabularySet = new Set(vocabulary);

  const weightedTerms = {};

  for (const token of queryTokens) {
    if (!token || !token.trim()) {
      continue;
    }

    const matches = expandQueryToken(token, vocabularySet, vocabulary);

    for (const match of matches) {
      const existingWeight = weightedTerms[match.term] || 0;

      weightedTerms[match.term] = existingWeight + match.weight;
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Normalize weighted query TF
  |--------------------------------------------------------------------------
  */

  const totalWeight = Object.values(weightedTerms).reduce(
    (sum, value) => sum + value,
    0,
  );

  if (totalWeight === 0) {
    return {};
  }

  const normalizedTF = {};

  for (const [term, value] of Object.entries(weightedTerms)) {
    normalizedTF[term] = value / totalWeight;
  }

  return normalizedTF;
};

/*
|--------------------------------------------------------------------------
| Main search function
|--------------------------------------------------------------------------
*/

export const searchPosts = async (
  query,
  { page = null, limit = null, sort = "relevance" } = {},
) => {
  /*
  |--------------------------------------------------------------------------
  | Normalize query
  |--------------------------------------------------------------------------
  */

  const normalizedQuery = String(query || "")
    .trim()
    .toLowerCase();

  /*
  |--------------------------------------------------------------------------
  | Minimum query length
  |--------------------------------------------------------------------------
  */

  if (normalizedQuery.length < MIN_QUERY_LENGTH) {
    return page !== null && limit !== null
      ? getEmptyPaginatedResponse(page, limit)
      : [];
  }

  /*
  |--------------------------------------------------------------------------
  | Load search index
  |--------------------------------------------------------------------------
  */

  const index = await SearchIndex.findOne().lean();

  if (!index) {
    return page !== null && limit !== null
      ? getEmptyPaginatedResponse(page, limit)
      : [];
  }

  const { vocabulary = [], idf = {}, documents = [] } = index;

  if (vocabulary.length === 0 || documents.length === 0) {
    return page !== null && limit !== null
      ? getEmptyPaginatedResponse(page, limit)
      : [];
  }

  /*
  |--------------------------------------------------------------------------
  | Process query
  |--------------------------------------------------------------------------
  */

  const cleaned = cleanMarkdown(normalizedQuery);

  const tokens = tokenize(cleaned);

  const filteredTokens = removeStopWords(tokens);

  /*
  |--------------------------------------------------------------------------
  | Protect against empty query after stop-word removal
  |--------------------------------------------------------------------------
  */

  if (filteredTokens.length === 0) {
    return page !== null && limit !== null
      ? getEmptyPaginatedResponse(page, limit)
      : [];
  }

  /*
  |--------------------------------------------------------------------------
  | Exact + prefix vocabulary expansion
  |--------------------------------------------------------------------------
  */

  const weightedTF = buildWeightedQueryTF(filteredTokens, vocabulary);

  /*
  |--------------------------------------------------------------------------
  | Protect against query with no vocabulary matches
  |--------------------------------------------------------------------------
  */

  if (Object.keys(weightedTF).length === 0) {
    return page !== null && limit !== null
      ? getEmptyPaginatedResponse(page, limit)
      : [];
  }

  /*
  |--------------------------------------------------------------------------
  | TF-IDF
  |--------------------------------------------------------------------------
  |
  | IMPORTANT:
  |
  | TF-IDF remains part of the search algorithm.
  |
  */

  const queryTFIDF = calculateTFIDF(weightedTF, idf);

  /*
  |--------------------------------------------------------------------------
  | Query vector
  |--------------------------------------------------------------------------
  */

  const queryVector = createVector(queryTFIDF, vocabulary);

  /*
  |--------------------------------------------------------------------------
  | Zero-vector protection
  |--------------------------------------------------------------------------
  */

  if (!hasNonZeroValues(queryVector)) {
    return page !== null && limit !== null
      ? getEmptyPaginatedResponse(page, limit)
      : [];
  }

  /*
  |--------------------------------------------------------------------------
  | Debug
  |--------------------------------------------------------------------------
  */

  console.log("========================================");
  console.log("Search query:", normalizedQuery);
  console.log("Query tokens:", filteredTokens);
  console.log("Weighted TF:", weightedTF);
  console.log("Query TF-IDF:", queryTFIDF);
  console.log(
    "Non-zero query values:",
    queryVector.filter((value) => value !== 0).length,
  );
  console.log("========================================");

  /*
  |--------------------------------------------------------------------------
  | Calculate relevance
  |--------------------------------------------------------------------------
  |
  | COSINE SIMILARITY remains the primary
  | mathematical relevance algorithm.
  |
  */

  let results = documents
    .map((doc) => {
      /*
      |--------------------------------------------------------------------------
      | Base TF-IDF cosine similarity
      |--------------------------------------------------------------------------
      */

      const cosineScore = cosineSimilarity(queryVector, doc.vector);

      /*
      |--------------------------------------------------------------------------
      | Lexical relevance
      |--------------------------------------------------------------------------
      */

      const lexicalBonus = calculateLexicalRelevance({
        query: normalizedQuery,
        queryTokens: filteredTokens,
        title: doc.title,
        tags: doc.tags || [],
      });

      /*
      |--------------------------------------------------------------------------
      | Final relevance score
      |--------------------------------------------------------------------------
      |
      | The cosine similarity is preserved.
      |
      | The lexical bonus only helps exact/prefix
      | matches rank more naturally.
      |
      */

      const relevanceScore = cosineScore + lexicalBonus;

      return {
        postId: doc.postId,

        title: doc.title,

        slug: doc.slug,

        coverImageUrl: doc.coverImageUrl,

        tags: doc.tags || [],

        excerpt: doc.excerpt,

        /*
         * Original mathematical score.
         */
        score: cosineScore,

        /*
         * Final ranking score.
         */
        relevanceScore,

        /*
         * Useful for debugging/UI later.
         */
        lexicalBonus,
      };
    })
    .filter(
      (result) =>
        Number.isFinite(result.score) &&
        Number.isFinite(result.relevanceScore) &&
        (result.score >= MIN_COSINE_SCORE || result.lexicalBonus > 0),
    );

  /*
  |--------------------------------------------------------------------------
  | Sort by final relevance
  |--------------------------------------------------------------------------
  */

  results.sort((a, b) => b.relevanceScore - a.relevanceScore);

  /*
  |--------------------------------------------------------------------------
  | Popup search
  |--------------------------------------------------------------------------
  |
  | No pagination means this is the search popup.
  |
  */

  if (page === null || limit === null) {
    return results.slice(0, 5);
  }

  /*
  |--------------------------------------------------------------------------
  | Full search page
  |--------------------------------------------------------------------------
  */

  const currentPage = Math.max(Number(page) || 1, 1);

  const perPage = Math.max(Number(limit) || 9, 1);

  /*
  |--------------------------------------------------------------------------
  | Get actual BlogPost documents
  |--------------------------------------------------------------------------
  */

  const postIds = results.map((result) => result.postId);

  const posts = await BlogPost.find({
    _id: {
      $in: postIds,
    },

    isDraft: false,
  })
    .select(
      "_id title slug content coverImageUrl tags author createdAt updatedAt views likes",
    )
    .populate("author", "name profileImageUrl")
    .lean();

  /*
  |--------------------------------------------------------------------------
  | Add comment counts
  |--------------------------------------------------------------------------
  */

  const postsWithCommentCount = await Promise.all(
    posts.map(async (post) => {
      const commentCount = await Comment.countDocuments({
        post: post._id,
        isDeleted: false,
      });

      return {
        ...post,
        commentCount,
      };
    }),
  );

  /*
  |--------------------------------------------------------------------------
  | Create quick lookup map
  |--------------------------------------------------------------------------
  */

  const postMap = new Map(
    postsWithCommentCount.map((post) => [post._id.toString(), post]),
  );

  /*
  |--------------------------------------------------------------------------
  | Combine BlogPost data + search scores
  |--------------------------------------------------------------------------
  */

  results = results
    .map((result) => {
      const post = postMap.get(result.postId.toString());

      if (!post) {
        return null;
      }

      return {
        ...post,

        /*
         * Original cosine similarity.
         */
        score: result.score,

        /*
         * Final relevance score.
         */
        relevanceScore: result.relevanceScore,

        /*
         * Lexical bonus.
         */
        lexicalBonus: result.lexicalBonus,
      };
    })
    .filter(Boolean);

  /*
  |--------------------------------------------------------------------------
  | Sorting
  |--------------------------------------------------------------------------
  */

  switch (sort) {
    /*
    |--------------------------------------------------------------------------
    | Relevance
    |--------------------------------------------------------------------------
    */

    case "relevance":
      results.sort((a, b) => b.relevanceScore - a.relevanceScore);
      break;

    /*
    |--------------------------------------------------------------------------
    | Newest
    |--------------------------------------------------------------------------
    */

    case "newest":
      results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;

    /*
    |--------------------------------------------------------------------------
    | Oldest
    |--------------------------------------------------------------------------
    */

    case "oldest":
      results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;

    /*
    |--------------------------------------------------------------------------
    | Most viewed
    |--------------------------------------------------------------------------
    */

    case "mostViewed":
      results.sort((a, b) => (b.views || 0) - (a.views || 0));
      break;

    /*
    |--------------------------------------------------------------------------
    | Most liked
    |--------------------------------------------------------------------------
    */

    case "mostLiked":
      results.sort((a, b) => (b.likes || 0) - (a.likes || 0));
      break;

    default:
      results.sort((a, b) => b.relevanceScore - a.relevanceScore);
      break;
  }

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  const totalResults = results.length;

  const totalPages = Math.ceil(totalResults / perPage);

  const startIndex = (currentPage - 1) * perPage;

  const paginatedResults = results.slice(startIndex, startIndex + perPage);

  /*
  |--------------------------------------------------------------------------
  | Final response
  |--------------------------------------------------------------------------
  */

  return {
    posts: paginatedResults,

    pagination: {
      currentPage,

      totalPages,

      totalResults,

      limit: perPage,
    },
  };
};
