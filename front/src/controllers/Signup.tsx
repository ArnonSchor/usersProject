import { useState } from "react";
import { SignupForm } from "../components/SignupForm";
import VerificationModal from "../components/VerificationModal";

function Signup() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <SignupForm setOpen={setOpen} />
      <VerificationModal open={open} setOpen={setOpen} />
    </div>
  );
}
export default Signup;
