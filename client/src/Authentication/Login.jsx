import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      if (response) {
        alert("login succesfull");
        console.log(response.data.name);
      } else alert("Login failed!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            onChange={(event) => setpassword(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => (window.location.href = "/signup")}
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
