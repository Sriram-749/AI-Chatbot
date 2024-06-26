import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      if (checkPasswords(password, confirmPassword)) {
        const resposne = await axios.post("http://localhost:4000/signup", {
          name,
          email,
          password,
        });

        if (resposne) {
          alert("singup successfull");
        } else {
          alert("Sinup failed please try again");
        }
      } else {
        alert("password and confirm password must be same");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkPasswords = (pass, verify) => {
    return pass === verify;
  };
  return (
    <div>
      <form onSubmit={handleSignup}>
        <div>
          <input
            type="text"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm password"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
