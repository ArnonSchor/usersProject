import { useEffect, useState } from "react";
import { axiosInstance } from "../axiosInstance";
export const List = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:2000/api/list")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div>
      <h1>{message}</h1>
      <p>weellll</p>
    </div>
  );
};
