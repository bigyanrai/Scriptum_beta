import { getContentPerformance } from "../services/postanalytics/postAnalyticsService.js";

/*
 * ==================================================
 * GET CONTENT PERFORMANCE
 * ==================================================
 */

export const getContentPerformanceData = async (req, res) => {
  try {
    const contentPerformance = await getContentPerformance();

    res.json(contentPerformance);
  } catch (error) {
    console.error("Error fetching content performance:", error);

    res.status(500).json({
      message: "Failed to fetch content performance",
      error: error.message,
    });
  }
};
