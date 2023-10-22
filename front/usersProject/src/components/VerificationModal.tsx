import { Button, Container, CssBaseline, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import styles from "./components.module.scss";
import { Formik, Form, Field } from "formik";
import { axiosInstance } from "../axiosInstance";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
interface FormValues {
  code: string;
}
const VerificationModal = ({ setOpen, open }: Props) => {
  const handleSubmit = async (values: FormValues) => {
    await axiosInstance.post("signUp", {
      ...values,
    });
    console.log(values);
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
          <Formik initialValues={{ code: "" }} onSubmit={handleSubmit}>
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
              <Button type="submit"> verify</Button>
            </Form>
          </Formik>
        </Box>
      </Container>
    </Modal>
  );
};

export default VerificationModal;
