import axios from "axios";

export const axiosInstance = () => {
    const axiosInstance = axios.create({
        baseURL: "http://localhost:2000/api/",
      });
}
