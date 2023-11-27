import { useState } from "react";
import { SignupForm } from "../components/SignupForm";
import VerificationModal from "../components/VerificationModal";

function Signup() {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({});

  return (
    <div>
      <SignupForm setFormValues={setFormValues} setOpen={setOpen} />
      <VerificationModal
        formValues={formValues}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
export default Signup;
