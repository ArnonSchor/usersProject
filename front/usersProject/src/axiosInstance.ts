import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:2000/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
