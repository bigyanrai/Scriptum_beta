export const calculateTFIDF = (tf, idf) => {
  const tfidf = {};

  Object.keys(tf).forEach((word) => {
    tfidf[word] = tf[word] * idf[word];
  });

  return tfidf;
};
