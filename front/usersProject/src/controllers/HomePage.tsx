import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>HomePage</h1>
      <button onClick={() => navigate("/sign-up")}>sign up!</button>
      <button onClick={() => navigate("/sign-in")}>sign in</button>
    </div>
  );
};
