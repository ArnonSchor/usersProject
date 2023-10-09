import { SignupForm } from "../components/SignupForm";

function SignIn() {
  return (
    <div className="body">
      <div className="signup-modal">
        <h1>sign in</h1>

        <SignupForm navigate="/list" />
      </div>
    </div>
  );
}
export default SignIn;
