import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create an Axios instance
export const api = axios.create({
  // baseURL: "http://192.168.1.75:3000/api/trainer",

  // baseURL: "https://stage.myfitmantra.com/api/trainer",

  // baseURL: "http://192.168.1.100:4000/api/v1",
  baseURL: "https://school-bus-book-backend.onrender.com/api/v1",


  // baseURL: "http://172.20.10.3:3000/api/trainer",
  // baseURL: "https://api.myfitmantra.com/api/trainer",
  headers: {
    "Content-Type": "application/json"
  }
});

// Add a request interceptor to update the Authorization header with the token
api.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("token",token)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      // Handle AsyncStorage errors gracefully
      return Promise.reject(error);
    }
  },
  error => {
    return Promise.reject(error);
  }
);
