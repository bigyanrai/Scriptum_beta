export const calculateIDF = (processedDocuments, vocabulary) => {
  const idf = {};

  const totalDocuments = processedDocuments.length;

  vocabulary.forEach((word) => {
    let documentCount = 0;

    processedDocuments.forEach((tokens) => {
      if (tokens.includes(word)) {
        documentCount++;
      }
    });

    idf[word] = Math.log(totalDocuments / documentCount);
  });

  return idf;
};
