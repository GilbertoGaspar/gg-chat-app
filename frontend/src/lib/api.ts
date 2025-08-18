import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.API_URL || "http://localhost:5000/api",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/users/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/users/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/users/register", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
