import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./css/signup.css";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      if (checkPasswords(password, confirmPassword)) {
        const response = await axios.post("http://localhost:4000/signup", {
          name,
          email,
          password,
        });

        if (response.data) {
          alert("singup successfull");
          window.location.href = "/login";
        } else {
          alert("Account already exists");
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
    <div className="container">
      <form onSubmit={handleSignup}>
        <h1>Sign Up</h1>
        <div>
          <input
            type="text"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
            required
          />
          <span>
            <FontAwesomeIcon icon={faUser} />
          </span>
        </div>
        <div>
          <input
            type="email"
            placeholder="email"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <span>
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
        </div>
        <div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <label for="show">
            {showPassword ? (
              <span>
                <FontAwesomeIcon icon={faEyeSlash} />
              </span>
            ) : (
              <span>
                <FontAwesomeIcon icon={faEye} />
              </span>
            )}
          </label>
          <button
            type="button"
            id="show"
            style={{ display: "none" }}
            onClick={() => {
              setShowPassword((showOrHide) => !showOrHide);
            }}
          ></button>
        </div>
        <div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
          <label for="show">
            {showPassword ? (
              <span>
                <FontAwesomeIcon icon={faEyeSlash} />
              </span>
            ) : (
              <span>
                <FontAwesomeIcon icon={faEye} />
              </span>
            )}
          </label>
          <button
            type="button"
            id="show"
            style={{ display: "none" }}
            onClick={() => {
              setShowPassword((showOrHide) => !showOrHide);
            }}
          ></button>
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
        <div>
          <Link to="/login">Already have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
