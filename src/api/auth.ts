import api from "./api";

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const response = await api.post<{ exists: boolean }>(
      "/User/LoginWithEmail",
      { email }
    );
    return response.data.exists;
  } catch (err) {
    console.error("Email check failed:", err);
    throw err;
  }
};

export const loginWithPassword = async (
  email: string,
  password: string
): Promise<any> => {
  try {
    const response = await api.post("/User/Login", { email, password });
    return response.data; // e.g. { token: "...", success: true }
  } catch (err) {
    console.error("Login failed:", err);
    throw err;
  }
};

export const sendEmailCode = async (email: string): Promise<any> => {
  try {
    const response = await api.post("/User/SendCode", { email });
    return response.data;
  } catch (err) {
    console.error("Send code failed:", err);
    throw err;
  }
};

export const verifyEmailCode = async (
  email: string,
  code: string
): Promise<any> => {
  try {
    const response = await api.post("/User/VerifyCode", { email, code });
    return response.data; // e.g. { verified: true }
  } catch (err) {
    console.error("Verify code failed:", err);
    throw err;
  }
};
