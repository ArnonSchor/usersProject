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

interface FormValues {
  username: string;
  password: string;
}
interface Props {
  route: string;
}

export const SignInForm = ({ route }: Props) => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };
  const onSubmit = async (values: FormValues) => {
    try {
      await axiosInstance.post("login", { ...values });
      navigate(route);
    } catch (error) {
      console.log("you are not authorized:", error);
    }
  };
  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
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
          Sign In
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
              </Grid>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  Don't have an account? Sign Up
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
