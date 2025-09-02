import api from "./api";
import type { ServicesResponse } from "../types/types";

const Services = {
  checkEmailExists: async (email: string): Promise<boolean> => {
    try {
      const response = await api.post<ServicesResponse["checkEmailExists"]>(
        "/User/LoginWhithEmail",
        { email }
      );
      return response.data.data.isReadyToSendCode;
    } catch (err) {
      console.error("Email check failed:", err);
      throw err;
    }
  },
  loginWithPassword: async (email: string, password: string): Promise<any> => {
    try {
      const response = await api.post("/User/Login", { email, password });
      return response.data;
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  },

  sendEmailCode: async (email: string): Promise<any> => {
    try {
      const response = await api.post("/User/SendCode", { email });
      return response.data;
    } catch (err) {
      console.error("Send code failed:", err);
      throw err;
    }
  },

  verifyEmailCode: async (email: string, code: string): Promise<any> => {
    try {
      const response = await api.post("/User/VerifyCode", { email, code });
      return response.data;
    } catch (err) {
      console.error("Verify code failed:", err);
      throw err;
    }
  },
};

export default Services;
