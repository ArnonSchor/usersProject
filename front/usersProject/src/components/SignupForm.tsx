import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../axiosInstance";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./Input";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "./Copyright";
import { useEffect } from "react";

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
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axiosInstance.get("login");
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchMessage();
  }, []);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <Box component="div" sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Input name="username" type="text" label="Username" />
                </Grid>

                <Grid item xs={12}>
                  <Input name="password" label="Password" type="password" />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input name="email" label="Email Adress" type="email" />
                </Grid>
              </Grid>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};
