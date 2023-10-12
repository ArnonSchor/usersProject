import { ErrorMessage, Field } from "formik";
import TextField from "@mui/material/TextField";
interface Props {
  name: string;
  type: string;
  label: string;
}
const errorText = () => {
  return <div style={{ color: "red" }}>Required</div>;
};
function Input({ name, type, label }: Props) {
  return (
    <div>
      <Field
        fullWidth
        label={label}
        as={TextField}
        required
        name={name}
        type={type}
      />
      <ErrorMessage component={errorText} name={name} />
    </div>
  );
}

export default Input;
