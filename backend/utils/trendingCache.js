const trendingCache = {
  data: null,
  expiresAt: null,
};

export const clearTrendingCache = () => {
  trendingCache.data = null;
  trendingCache.expiresAt = null;

  console.log("Trending cache cleared.");
};

export default trendingCache;
