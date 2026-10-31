import { cosineDistance } from "./distance.js";

export const calculateInertia = (vectors, clusters, centroids) => {
  let inertia = 0;

  for (let i = 0; i < vectors.length; i++) {
    const clusterIndex = clusters[i];
    inertia += Math.pow(cosineDistance(vectors[i], centroids[clusterIndex]), 2);
  }

  return inertia;
};
