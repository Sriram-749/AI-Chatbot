import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./css/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [status, setStatus] = useState("");
  const [showPassword, setShowPassword] = useState();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });

      if (response.data) {
        setStatus("success");
        Cookies.set("uid", response.data.uid);
        Cookies.set("name", response.data.name);
      } else {
        setStatus("failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        {status === "failed" && (
          <div>
            <p style={{ color: "red" }}>Invalid login credentials</p>
          </div>
        )}
        <div>
          <input
            type="email"
            placeholder="Email"
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
            onChange={(event) => setpassword(event.target.value)}
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
          <Link to="/forgotpassword">Forgot password?</Link>
        </div>
        {status === "success" && (
          <div>
            <p style={{ color: "green" }}>Login in success</p>
          </div>
        )}
        <div>
          <button type="submit">Login</button>
        </div>
        <div>
          <Link to="/signup">Don't have an account? Create new</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
