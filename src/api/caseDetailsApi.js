import axios from "axios";
import { caseDetailsMockData } from "./mock/caseDetailsMock";

export const getCaseDetails = async (caseId) => {
  try {
    const response = await axios.get(`/fraud/cases/${caseId}`);

    // Vite returning HTML fallback
    if (
      typeof response.data === "string" &&
      response.data.toLowerCase().startsWith("<!doctype")
    ) {
      console.warn("HTML returned → using mock details");
      return caseDetailsMockData[caseId] || caseDetailsMockData["CASE-001"];
    }

    return response.data;
  } catch (error) {
    console.warn("Backend unavailable → using mock details");
    return caseDetailsMockData[caseId] || caseDetailsMockData["CASE-001"];
  }
};
