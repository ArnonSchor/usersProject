import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:2000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set the user's token
export const setAccessToken = (accessToken: string | null) => {
  console.log(accessToken);

  if (accessToken) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  } else {
    // Remove the Authorization header if the token is null
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
