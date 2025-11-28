import axios from "axios";
import { analyticsMock } from "./mock/analyticsMock";

export const getAnalyticsData = async () => {
  try {
    const response = await axios.get("/fraud/analytics");

    // Vite serving HTML instead of API response
    if (
      typeof response.data === "string" &&
      response.data.toLowerCase().startsWith("<!doctype")
    ) {
      console.warn("HTML returned → using mock analytics data");
      return analyticsMock;
    }

    return response.data;
  } catch (error) {
    console.warn("Backend unavailable → using mock analytics data");
    return analyticsMock;
  }
};
