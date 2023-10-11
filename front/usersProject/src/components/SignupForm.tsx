import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useFormik } from "formik";

interface Props {
  route: string;
}

export const SignupForm = ({ route }: Props) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    onSubmit: async (values) => {
      await axiosInstance.post("signUp", { ...values });
      navigate(route);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        required
        name="username"
        placeholder="username"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.username}
      />
      <input
        required
        name="password"
        placeholder="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      <input
        required
        name="email"
        placeholder="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
};
