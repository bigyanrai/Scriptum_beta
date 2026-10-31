export const tokenize = (text = "") => {
  return text.match(/[a-z0-9+#.]+/g) || [];
};
