import { axiosInstance } from "../axiosInstance";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "./Copyright";

interface FormValues {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}
interface Props {
  setOpen: (value: boolean) => void;
  setFormValues: (value: FormValues) => void;
}

export const SignupForm = ({ setOpen, setFormValues }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  };

  const mutation = useMutation(
    (values: FormValues) => axiosInstance.post("signUp", { ...values }),
    {
      onSuccess: () => {
        setOpen(true);
      },
      onError: (error) => {
        console.error("There was an error:", error);
      },
    }
  );

  const handleSubmit = async (values: FormValues, { setErrors }: any) => {
    try {
      setFormValues(values);
      await mutation.mutateAsync(values);
    } catch (error) {
      console.log("there was an error:", error);
      setErrors({
        email: "email already exists! try signing in or use a different email",
      });
    }
  };
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(5, "username should be 5-20 characters long")
      .max(20, "username should be 5-20 characters long")
      .required("Required"),
    password: Yup.string()
      .min(5, "password is too short")
      .max(20, "password is long")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("required"),
    email: Yup.string()
      .email("please enter a valid email")
      .required("Required"),
  });

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
          onSubmit={handleSubmit}
        >
          <Form>
            <Box component="div" sx={{ mt: 3, width: "26rem" }}>
              <Grid container spacing={2}>
                <Grid item xs={13}>
                  <Input
                    name="username"
                    type="text"
                    label="Username"
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    name="password"
                    label="Password"
                    type={!showPassword ? "password" : "text"}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    name="confirmPassword"
                    label="Confirm Password"
                    type={!showPassword ? "password" : "text"}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    name="email"
                    label="Email Adress"
                    type="email"
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </Grid>
              </Grid>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {mutation.isLoading ? "Signing Up..." : "Sign Up"}
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
