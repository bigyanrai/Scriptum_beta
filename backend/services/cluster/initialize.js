import { cosineDistance } from "./distance.js";

export const initializeCentroids = (vectors, k) => {
  if (vectors.length === 0) return [];

  // Pick first centroid randomly
  const centroids = [vectors[Math.floor(Math.random() * vectors.length)]];

  while (centroids.length < k) {
    let added = false;
    // Distance from every point to its nearest centroid
    const distances = vectors.map((vector) => {
      let minDistance = Infinity;

      centroids.forEach((centroid) => {
        const d = cosineDistance(vector, centroid);

        if (d < minDistance) {
          minDistance = d;
        }
      });

      // Square the distance (K-Means++ weighting)
      return minDistance * minDistance;
    });

    const totalDistance = distances.reduce((a, b) => a + b, 0);

    // All vectors identical
    if (totalDistance === 0) {
      break;
    }

    const random = Math.random() * totalDistance;

    let cumulative = 0;

    for (let i = 0; i < vectors.length; i++) {
      cumulative += distances[i];

      if (cumulative >= random) {
        const alreadyChosen = centroids.some((centroid) => {
          return centroid.every(
            (value, index) => Math.abs(value - vectors[i][index]) < 1e-10,
          );
        });

        if (!alreadyChosen) {
          centroids.push([...vectors[i]]);
          added = true;
        }

        break;
      }
    }
    if (!added) {
      break;
    }
  }

  return centroids;
};
