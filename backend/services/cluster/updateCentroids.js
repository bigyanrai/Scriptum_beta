export const updateCentroids = (vectors, clusters, k) => {
  const dimensions = vectors[0].length;

  const centroids = Array.from({ length: k }, () => Array(dimensions).fill(0));

  const counts = Array(k).fill(0);

  vectors.forEach((vector, index) => {
    const cluster = clusters[index];

    counts[cluster]++;

    vector.forEach((value, dimension) => {
      centroids[cluster][dimension] += value;
    });
  });

  // Calculate the mean of each cluster
  centroids.forEach((centroid, clusterIndex) => {
    if (counts[clusterIndex] === 0) return;

    centroid.forEach((_, dimension) => {
      centroid[dimension] /= counts[clusterIndex];
    });
  });

  // <-- ADD THIS ENTIRE BLOCK HERE
  centroids.forEach((centroid) => {
    const magnitude = Math.sqrt(
      centroid.reduce((sum, value) => sum + value * value, 0),
    );

    if (magnitude === 0) return;

    for (let i = 0; i < centroid.length; i++) {
      centroid[i] /= magnitude;
    }
  });

  return centroids;
};
