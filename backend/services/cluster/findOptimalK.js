// import { runKMeans } from "./kmeans.js";
// import { calculateInertia } from "./calculateInertia.js";

// export const findOptimalK = (
//   vectors,
//   maxK = 8,
//   maxIterations = 100,
//   runs = 10,
// ) => {
//   if (vectors.length <= 2) {
//     return 2;
//   }

//   const limit = Math.min(maxK, vectors.length);

//   const results = [];

//   for (let k = 2; k <= limit; k++) {
//     const { clusters, centroids } = runKMeans(vectors, k, maxIterations, runs);

//     const inertia = calculateInertia(vectors, clusters, centroids);

//     results.push({
//       k,
//       inertia,
//     });
//   }

//   console.table(results);
//   // Smooth inertia values using a simple moving average
//   const smoothed = results.map((point, index) => {
//     const previous = results[index - 1]?.inertia ?? point.inertia;
//     const current = point.inertia;
//     const next = results[index + 1]?.inertia ?? point.inertia;

//     return {
//       ...point,
//       inertia: (previous + current + next) / 3,
//     };
//   });

//   // If only one K was tested
//   if (results.length === 1) {
//     return results[0].k;
//   }

//   // Largest percentage drop (simple elbow heuristic)
//   const first = smoothed[0];
//   const last = smoothed[smoothed.length - 1];

//   let bestK = first.k;
//   let maxDistance = -1;

//   for (const point of smoothed) {
//     const numerator = Math.abs(
//       (last.inertia - first.inertia) * point.k -
//         (last.k - first.k) * point.inertia +
//         last.k * first.inertia -
//         last.inertia * first.k,
//     );

//     const denominator = Math.sqrt(
//       Math.pow(last.inertia - first.inertia, 2) + Math.pow(last.k - first.k, 2),
//     );

//     const distance = numerator / denominator;

//     if (distance > maxDistance) {
//       maxDistance = distance;
//       bestK = point.k;
//     }
//   }

//   console.log("Selected K:", bestK);

//   return bestK;
// };

import { runKMeans } from "./kmeans.js";
import { calculateInertia } from "./calculateInertia.js";
import { calculateSilhouetteScore } from "./silhouette.js";

export const findOptimalK = (
  vectors,
  maxK = 8,
  maxIterations = 100,
  runs = 10,
) => {
  if (vectors.length <= 2) {
    return 2;
  }

  const limit = Math.min(maxK, vectors.length);

  const results = [];

  for (let k = 2; k <= limit; k++) {
    const { clusters, centroids } = runKMeans(vectors, k, maxIterations, runs);

    const inertia = calculateInertia(vectors, clusters, centroids);

    const silhouette = calculateSilhouetteScore(vectors, clusters);

    results.push({
      k,
      inertia,
      silhouette,
    });
  }

  console.table(results);

  // Smooth inertia values using a simple moving average
  const smoothed = results.map((point, index) => {
    const previous = results[index - 1]?.inertia ?? point.inertia;
    const current = point.inertia;
    const next = results[index + 1]?.inertia ?? point.inertia;

    return {
      ...point,
      inertia: (previous + current + next) / 3,
    };
  });

  // If only one K was tested
  if (results.length === 1) {
    return results[0].k;
  }

  // Elbow heuristic using smoothed inertia
  const first = smoothed[0];
  const last = smoothed[smoothed.length - 1];

  let bestK = first.k;
  let maxDistance = -1;

  for (const point of smoothed) {
    const numerator = Math.abs(
      (last.inertia - first.inertia) * point.k -
        (last.k - first.k) * point.inertia +
        last.k * first.inertia -
        last.inertia * first.k,
    );

    const denominator = Math.sqrt(
      Math.pow(last.inertia - first.inertia, 2) + Math.pow(last.k - first.k, 2),
    );

    const distance = numerator / denominator;

    if (distance > maxDistance) {
      maxDistance = distance;
      bestK = point.k;
    }
  }

  // Find the K with the highest silhouette score
  const bestSilhouette = results.reduce((best, current) => {
    return current.silhouette > best.silhouette ? current : best;
  });

  console.log("Selected K using elbow:", bestK);
  console.log(
    "Best silhouette K:",
    bestSilhouette.k,
    "Score:",
    bestSilhouette.silhouette,
  );

  const selectedResult = results.find((result) => result.k === bestK);

  console.log("Selected K silhouette score:", selectedResult?.silhouette ?? 0);

  return bestK;
};
