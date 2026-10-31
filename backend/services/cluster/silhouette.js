import { cosineDistance } from "./distance.js";

export const calculateSilhouetteScore = (vectors, clusters) => {
  if (vectors.length <= 1) {
    return 0;
  }

  const uniqueClusters = [...new Set(clusters)];

  if (uniqueClusters.length <= 1) {
    return 0;
  }

  const silhouetteScores = [];

  for (let i = 0; i < vectors.length; i++) {
    const currentCluster = clusters[i];

    const sameClusterDistances = [];
    const otherClusterDistances = {};

    // Calculate distance from current vector to every other vector
    for (let j = 0; j < vectors.length; j++) {
      if (i === j) continue;

      const distance = cosineDistance(vectors[i], vectors[j]);
      const otherCluster = clusters[j];

      if (otherCluster === currentCluster) {
        sameClusterDistances.push(distance);
      } else {
        if (!otherClusterDistances[otherCluster]) {
          otherClusterDistances[otherCluster] = [];
        }

        otherClusterDistances[otherCluster].push(distance);
      }
    }

    // a(i): average distance to points in the same cluster
    const a =
      sameClusterDistances.length > 0
        ? sameClusterDistances.reduce((sum, value) => sum + value, 0) /
          sameClusterDistances.length
        : 0;

    // b(i): smallest average distance to another cluster
    let b = Infinity;

    for (const cluster of uniqueClusters) {
      if (cluster === currentCluster) continue;

      const distances = otherClusterDistances[cluster];

      if (!distances || distances.length === 0) continue;

      const averageDistance =
        distances.reduce((sum, value) => sum + value, 0) / distances.length;

      b = Math.min(b, averageDistance);
    }

    // A single-item cluster has a silhouette score of 0
    if (sameClusterDistances.length === 0 || b === Infinity) {
      silhouetteScores.push(0);
      continue;
    }

    const denominator = Math.max(a, b);

    const score = denominator === 0 ? 0 : (b - a) / denominator;

    silhouetteScores.push(score);
  }

  return (
    silhouetteScores.reduce((sum, score) => sum + score, 0) /
    silhouetteScores.length
  );
};
