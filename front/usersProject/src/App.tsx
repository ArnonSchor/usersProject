import "./App.css";
// import { useState, useEffect } from "react";

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  // fetch("http://localhost:2000");
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);
  return (
    <>
      <h1 style={{ color: "red" }}>aaaaaaaaaaa</h1>
      <form action="http://localhost:2000/api/signUp" method="post">
        <input
          name="username"
          id="username"
          type="text"
          placeholder="username"
        />
        <input
          name="password"
          id="password"
          type="text"
          placeholder="password"
        />
        <button type="submit">sign me!</button>
      </form>
    </>
  );
}
export default App;
