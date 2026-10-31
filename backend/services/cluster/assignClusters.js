import { cosineDistance } from "./distance.js";

export const assignClusters = (vectors, centroids) => {
  return vectors.map((vector) => {
    let closestCluster = 0;
    let smallestDistance = Infinity;

    centroids.forEach((centroid, index) => {
      const distance = cosineDistance(vector, centroid);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestCluster = index;
      }
    });

    return closestCluster;
  });
};
