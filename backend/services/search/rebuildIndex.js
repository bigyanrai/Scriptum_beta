import BlogPost from "../../models/BlogPost.js";

import { cleanMarkdown } from "./cleaner.js";
import { tokenize } from "./tokenizer.js";
import { removeStopWords } from "./stopWords.js";
import { buildVocabulary } from "./vocabulary.js";
import { calculateTF } from "./tf.js";
import { calculateIDF } from "./idf.js";
import { calculateTFIDF } from "./tfidf.js";
import { createVector } from "./vector.js";
import SearchIndex from "../../models/SearchIndex.js";
import { runKMeans } from "../cluster/kmeans.js";
import { ML_CONFIG } from "../../config/mlConfig.js";
import { normalizeVectors } from "../cluster/normalize.js";
import { findOptimalK } from "../cluster/findOptimalK.js";

export const rebuildIndex = async () => {
  console.trace();
  console.log("========== rebuildIndex called ==========");

  const posts = await BlogPost.find({
    isDraft: false,
  }).lean();

  // --------------------------------------------------
  // Process every blog
  // --------------------------------------------------

  const processedDocuments = posts.map((post) => {
    const TITLE_WEIGHT = 5;
    const TAG_WEIGHT = 8;
    const CONTENT_WEIGHT = 1;

    const weightedTitle = Array(TITLE_WEIGHT).fill(post.title).join(" ");

    const weightedTags = Array(TAG_WEIGHT)
      .fill((post.tags || []).join(" "))
      .join(" ");

    const intro = cleanMarkdown(post.content)
      .split(/\s+/)
      .slice(0, 120)
      .join(" ");

    const weightedIntro = Array(2).fill(intro).join(" ");

    const weightedContent = post.content;

    const text = `
${weightedTitle}
${weightedTags}
${weightedIntro}
${weightedContent}
`;

    const cleaned = cleanMarkdown(text);

    const tokens = tokenize(cleaned);

    return {
      post,
      tokens: removeStopWords(tokens),
    };
  });

  // --------------------------------------------------
  // Remove documents that contain no searchable tokens
  // --------------------------------------------------

  const validDocuments = processedDocuments.filter(
    (document) => document.tokens.length > 0,
  );

  const filteredDocuments = validDocuments.map((document) => document.tokens);

  console.log(`Searchable posts: ${filteredDocuments.length}/${posts.length}`);

  // --------------------------------------------------
  // Build vocabulary
  // --------------------------------------------------

  const vocabulary = buildVocabulary(filteredDocuments);

  // --------------------------------------------------
  // Calculate TF
  // --------------------------------------------------

  const tfDocuments = filteredDocuments.map((tokens) => {
    return calculateTF(tokens);
  });

  // --------------------------------------------------
  // Calculate IDF
  // --------------------------------------------------

  const idf = calculateIDF(filteredDocuments, vocabulary);

  // --------------------------------------------------
  // Calculate TF-IDF
  // --------------------------------------------------

  const tfidfDocuments = tfDocuments.map((tf) => {
    return calculateTFIDF(tf, idf);
  });

  // --------------------------------------------------
  // Create vectors
  // --------------------------------------------------

  const vectors = tfidfDocuments.map((tfidf) => {
    return createVector(tfidf, vocabulary);
  });

  const normalizedVectors = normalizeVectors(vectors);

  // --------------------------------------------------
  // K-Means clustering
  // --------------------------------------------------

  const bestK = findOptimalK(
    normalizedVectors,
    ML_CONFIG.MAX_K,
    ML_CONFIG.MAX_ITERATIONS,
    ML_CONFIG.KMEANS_RUNS,
  );

  console.log("Optimal K:", bestK);

  const { clusters, inertia } = runKMeans(
    normalizedVectors,
    bestK,
    ML_CONFIG.MAX_ITERATIONS,
    ML_CONFIG.KMEANS_RUNS,
  );

  console.log("Best inertia:", inertia);
  console.log("Clusters:", clusters);

  // --------------------------------------------------
  // Update clusters
  // --------------------------------------------------

  const updates = validDocuments.map((document, index) => ({
    updateOne: {
      filter: { _id: document.post._id },
      update: {
        $set: {
          cluster: clusters[index],
        },
      },
    },
  }));

  if (updates.length > 0) {
    await BlogPost.bulkWrite(updates, {
      timestamps: false,
    });
  }

  // --------------------------------------------------
  // Create searchable documents
  // --------------------------------------------------

  const documents = validDocuments.map((document, index) => {
    const post = document.post;

    const cleanContent = cleanMarkdown(post.content);

    return {
      postId: post._id,
      title: post.title,
      slug: post.slug,
      coverImageUrl: post.coverImageUrl,
      tags: post.tags,

      excerpt:
        cleanContent.length > 160
          ? cleanContent.substring(0, 160) + "..."
          : cleanContent,

      vector: vectors[index],
    };
  });

  // --------------------------------------------------
  // Replace old index
  // --------------------------------------------------

  await SearchIndex.deleteMany({});

  await SearchIndex.create({
    vocabulary,
    idf,
    documents,
  });

  console.log("Search index rebuilt successfully.");
};
