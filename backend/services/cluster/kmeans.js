import { initializeCentroids } from "./initialize.js";
import { assignClusters } from "./assignClusters.js";
import { updateCentroids } from "./updateCentroids.js";
import { calculateInertia } from "./calculateInertia.js";

export const runKMeans = (vectors, k = 5, maxIterations = 100, runs = 10) => {
  if (!vectors.length) {
    return {
      clusters: [],
      centroids: [],
      inertia: 0,
    };
  }

  // Never allow more clusters than documents
  k = Math.min(k, vectors.length);

  let bestClusters = [];
  let bestCentroids = [];
  let bestInertia = Infinity;

  for (let run = 0; run < runs; run++) {
    let centroids = initializeCentroids(vectors, k);
    let clusters = [];

    // Run K-Means until convergence
    for (let i = 0; i < maxIterations; i++) {
      const newClusters = assignClusters(vectors, centroids);

      if (JSON.stringify(newClusters) === JSON.stringify(clusters)) {
        break;
      }

      clusters = newClusters;
      centroids = updateCentroids(vectors, clusters, k);
    }

    // Calculate clustering quality
    const inertia = calculateInertia(vectors, clusters, centroids);

    // Keep the best clustering
    if (inertia < bestInertia) {
      bestInertia = inertia;
      bestClusters = [...clusters];
      bestCentroids = centroids.map((centroid) => [...centroid]);
    }
  }

  return {
    clusters: bestClusters,
    centroids: bestCentroids,
    inertia: bestInertia,
  };
};
