import "../signup.css";
import { SignupForm } from "../components/SignupForm";

function Signup() {
  return (
    <div className="body">
      <div className="signup-modal">
        <h1>sign up</h1>
        <SignupForm navigate="/" />
      </div>
    </div>
  );
}
export default Signup;
