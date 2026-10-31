// services/search/vector.js

export const createVector = (tfidf, vocabulary) => {
  return vocabulary.map((word) => {
    return tfidf[word] || 0;
  });
};
