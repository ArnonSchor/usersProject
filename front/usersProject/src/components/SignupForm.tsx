import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SignupForm = (props: any) => {
  const navigate = useNavigate();

  // the handle submit is not working, the db update with no data, last  time it worked it was using action.the axios.post is the area of the problem
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await axios.post("http://localhost:2000/api/signUp", formData);
      console.log(formData);
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
          type="text"
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
