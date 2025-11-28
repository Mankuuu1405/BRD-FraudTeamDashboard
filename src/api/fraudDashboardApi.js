console.log("fraudDashboardApi.js LOADED FROM:", import.meta.url);

import axios from "axios";
import { dashboardMock } from "./mock/dashboardMock";

export const getFraudDashboard = async () => {
  try {
    const response = await axios.get("/fraud/dashboard");

    // Detect Vite serving index.html instead of JSON
    if (
      typeof response.data === "string" &&
      response.data.toLowerCase().startsWith("<!doctype")
    ) {
      console.warn("Received HTML → using mock fraud dashboard data");
      return dashboardMock;
    }

    return response.data;
  } catch (error) {
    console.warn("Backend unavailable → using mock fraud dashboard data");
    return dashboardMock;
  }
};
