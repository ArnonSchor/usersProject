import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Input from "./Input";
import { useState } from "react";
import { SignupCredentials } from "../types";

interface Props {
  route: string;
}
export const SignupForm = ({ route }: Props) => {
  const [credentials, setCredentials] = useState<SignupCredentials>({
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axiosInstance.post("signUp", { ...credentials });
      navigate(route);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="username"
        placeholder="username"
        type="text"
        credentials={credentials}
        setCredentials={setCredentials}
        value={credentials.username}
        key="username"
      />
      <Input
        name="username"
        placeholder="username"
        type="text"
        credentials={credentials}
        setCredentials={setCredentials}
        value={credentials.password}
        key="password"
      />
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
