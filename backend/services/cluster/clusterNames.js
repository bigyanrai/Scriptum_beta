export const generateClusterNames = (posts) => {
  const clusterMap = new Map();

  posts.forEach((post) => {
    const cluster = post.cluster;

    if (cluster === null || cluster === undefined) return;

    if (!clusterMap.has(cluster)) {
      clusterMap.set(cluster, {});
    }

    const tagScores = clusterMap.get(cluster);

    const viewScore = Math.log((post.views || 0) + 1);
    const likeScore = (post.likes || 0) * 2;

    (post.tags || []).forEach((tag) => {
      const normalized = tag.trim().toLowerCase();

      const wordBonus = normalized.includes(" ") ? 1.5 : 1;

      const score =
        3 + // tag frequency
        viewScore + // popular posts matter more
        likeScore + // liked posts matter more
        wordBonus; // prefer multi-word tags

      tagScores[normalized] = (tagScores[normalized] || 0) + score;
    });
  });

  return Object.fromEntries(
    [...clusterMap.entries()].map(([cluster, tagScores]) => {
      const topTags = Object.entries(tagScores)
        .sort((a, b) => b[1] - a[1])
        .map(([tag]) => tag)
        .filter((tag, index, array) => {
          // remove near-duplicates
          return !array
            .slice(0, index)
            .some(
              (existing) => existing.includes(tag) || tag.includes(existing),
            );
        })
        .slice(0, 3);

      return [
        cluster,
        {
          title: topTags.length ? topTags.join(" • ") : `Cluster ${cluster}`,
          keywords: topTags,
        },
      ];
    }),
  );
};
