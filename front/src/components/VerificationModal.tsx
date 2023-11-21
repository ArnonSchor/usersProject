import { Button, Container, CssBaseline, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import styles from "./components.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { axiosInstance } from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  formValues: {};
}
interface FormValues {
  code: string;
}
const VerificationModal = ({ setOpen, open, formValues }: Props) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    code: Yup.string().required("Required"),
  });

  const handleSubmit = async (values: FormValues, { setErrors }: any) => {
    try {
      await axiosInstance.post("verify", {
        ...values,
        ...formValues,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      setErrors({
        code: "Invalid varification code",
      });
    }
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container maxWidth="xs">
        <CssBaseline />

        <Box className={styles.box}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Check your email
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            We sent a verification code to your email address. please insert the
            code below.
          </Typography>
          <Formik
            initialValues={{ code: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <Field
                fullWidth
                label="verification code"
                variant="outlined"
                as={TextField}
                required
                name="code"
                type="text"
              />
              <ErrorMessage name="code">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
              <Button type="submit"> verify</Button>
            </Form>
          </Formik>
        </Box>
      </Container>
    </Modal>
  );
};

export default VerificationModal;
