import { useEffect, useState } from "react";
import { axiosInstance } from "../axiosInstance";
export const TheSite = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axiosInstance.get("the-site");
        setMessage(response.data.message);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchMessage();
  }, []);

  return (
    <div>
      <h1>{message}</h1>
      <p>this is where the app would be</p>
      <button>log out</button>
      <button>delete account</button>
      <button>reset password</button>
    </div>
  );
};
