import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useFormik } from "formik";
import * as Yup from "yup";

interface FormValues {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}
interface Props {
  route: string;
}

export const SignupForm = ({ route }: Props) => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  };
  const onSubmit = async (values: FormValues) => {
    if (values.password === values.confirmPassword) {
      await axiosInstance.post("signUp", { ...values });
      navigate(route);
    } else {
      alert("passwords do not match!");
    }
  };
  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string().required("Required"),
    email: Yup.string()
      .email("please enter a valid email")
      .required("Required"),
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        required
        name="username"
        placeholder="username"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
      />

      <input
        required
        name="password"
        placeholder="password"
        type="password"
        value={formik.values.password}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      <input
        required
        name="confirmPassword"
        placeholder="confirm password"
        type="password"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <input
        required
        name="email"
        placeholder="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <button type="submit">Submit</button>
    </form>
  );
};
