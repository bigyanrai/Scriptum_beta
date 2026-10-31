// services/search/tf.js

export const calculateTF = (tokens) => {
  const tf = {};

  const totalWords = tokens.length;

  // Count occurrences
  tokens.forEach((word) => {
    tf[word] = (tf[word] || 0) + 1;
  });

  // Convert counts to term frequency
  Object.keys(tf).forEach((word) => {
    tf[word] = tf[word] / totalWords;
  });

  return tf;
};
