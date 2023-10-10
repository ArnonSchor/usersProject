import { Form } from "react-bootstrap";

interface Props {
  name: string;
  placeholder: string;
  type: string;
  credentials: {};
  setCredentials: {};
  value: string;
  key: string;
}

const Input = ({
  name,
  placeholder,
  type,
  credentials,
  setCredentials,
  value,
  key,
}: Props) => {
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>username</Form.Label>
      <Form.Control
        onChange={(e) =>
          setCredentials({ ...credentials, [key]: e.target.value })
        }
        required
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>
  );
};
export default Input;
