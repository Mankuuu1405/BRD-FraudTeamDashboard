import api from "./axiosInstance";
import { dashboardMock } from "./mock/dashboardMock";

export const getFraudDashboard = async () => {
  try {
    const response = await api.get("/fraud/dashboard");

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
