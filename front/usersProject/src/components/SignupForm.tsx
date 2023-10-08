import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const SignupForm = () => {
  const navigate = useNavigate();

  return (
    <Form action="http://localhost:2000/api/signUp" method="post">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>username</Form.Label>
        <Form.Control
          name="username"
          id="username"
          placeholder="Enter username"
          type="text"
          required
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="text"
          name="password"
          id="password"
          placeholder="Password"
          required
        />
      </Form.Group>
      <Button onClick={() => navigate("/List")} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
