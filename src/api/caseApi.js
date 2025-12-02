import api from "./axiosInstance";
import { casesMock } from "./mock/caseMock";

export const getCases = async () => {
  try {
    const response = await api.get("/fraud/cases");

    if (
      typeof response.data === "string" &&
      response.data.toLowerCase().startsWith("<!doctype")
    ) {
      console.warn("HTML returned → using mock cases");
      return casesMock;
    }

    return response.data;
  } catch (err) {
    console.warn("Backend unavailable → using mock cases");
    return casesMock;
  }
};
