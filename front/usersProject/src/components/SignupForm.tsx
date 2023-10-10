import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SignupForm = (props: any) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const axiosInstance = axios.create({
        baseURL: "http://localhost:2000/api/",
      });

      await axiosInstance.post("signUp", { ...credentials });
      navigate(props.navigate);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>username</Form.Label>
        <Form.Control
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          required
          name="username"
          placeholder="Enter username"
          type="text"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          type="password"
          name="password"
          placeholder="Password"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
