import "./App.css";
// import { useState, useEffect } from "react";

function App() {
  return (
    <>
      <h1>sign up to our page!</h1>
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
