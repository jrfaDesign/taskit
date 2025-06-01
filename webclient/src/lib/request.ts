import axios from "axios";
import { BASE_API } from "./variables";

const request = axios.create({
  baseURL: BASE_API,
  timeout: 10000, // 10 seconds timeout — adjust as needed
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  config => {
    // const token = getAuthToken(); // Your auth token logic here
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => Promise.reject(error)
);

// Optional: Add a response interceptor (e.g. for global error handling)
request.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export default request;
