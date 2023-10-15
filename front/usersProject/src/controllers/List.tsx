import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

export const List = async () => {
  const [message, setMessage] = useState("a");

  useEffect(() => {
    fetch("http://localhost:2000/api/list")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  return <h1>{message}</h1>;
};
