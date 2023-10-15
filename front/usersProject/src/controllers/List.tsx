import { useEffect, useState } from "react";
import { axiosInstance } from "../axiosInstance";
export const List = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axiosInstance.get("list");
        setMessage(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchMessage();
  }, []);

  return <h1>{message}</h1>;
};
