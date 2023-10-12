import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { Formik, Form, Field, ErrorMessage } from "formik";
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <Field required name="username" placeholder="username" type="text" />
        <ErrorMessage name="username" />

        <Field
          required
          name="password"
          placeholder="password"
          type="password"
        />
        <ErrorMessage name="password" />

        <Field
          required
          name="confirmPassword"
          placeholder="confirm password"
          type="password"
        />
        <ErrorMessage name="confirmPassword" />

        <Field required name="email" placeholder="email" type="email" />
        <ErrorMessage name="email" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
