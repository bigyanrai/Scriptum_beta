// services/search/vocabulary.js

import { ML_CONFIG } from "../../config/mlConfig.js";

export const buildVocabulary = (documents) => {
  const documentFrequency = new Map();

  // Count in how many documents each word appears
  documents.forEach((tokens) => {
    const uniqueTokens = new Set(tokens);

    uniqueTokens.forEach((word) => {
      documentFrequency.set(word, (documentFrequency.get(word) || 0) + 1);
    });
  });

  const totalDocuments = documents.length;

  const vocabulary = [];

  documentFrequency.forEach((count, word) => {
    // Remove very rare words
    if (count < ML_CONFIG.MIN_DOCUMENT_FREQUENCY) {
      return;
    }

    // Remove overly common words
    if (count / totalDocuments > ML_CONFIG.MAX_DOCUMENT_FREQUENCY) {
      return;
    }

    vocabulary.push(word);
  });

  return vocabulary.sort();
};
