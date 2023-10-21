import { ErrorMessage, Field } from "formik";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
interface Props {
  name: string;
  type: string;
  label: string;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}

function Input({ name, type, label, showPassword, setShowPassword }: Props) {
  return (
    <div>
      <Field
        fullWidth
        label={label}
        variant="outlined"
        as={TextField}
        required
        name={name}
        type={type}
        InputProps={{
          endAdornment: name === "password" && (
            <InputAdornment
              position="end"
              style={{ outline: "none", cursor: "pointer" }}
            >
              {showPassword ? (
                <VisibilityIcon
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              ) : (
                <VisibilityOffIcon
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              )}
            </InputAdornment>
          ),
        }}
      />
      <div style={{ height: "20px" }}>
        <ErrorMessage name={name}>
          {(msg) => <div style={{ color: "red" }}>{msg}</div>}
        </ErrorMessage>
      </div>
    </div>
  );
}

export default Input;
