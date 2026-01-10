import api from "./axiosInstance";
import { loginMock } from "./mock/loginMock";

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });

    if (typeof response.data === "string") {
      console.warn("Backend offline → using mock login");
      return loginMock(email);
    }

    return response.data;
  } catch (err) {
    console.warn("Backend offline → using mock login");
    return loginMock(email);
  }
};
