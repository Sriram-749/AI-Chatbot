import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [otpField, setOtpField] = useState();
  const [status, setStatus] = useState(false);
  const [otp, setOtp] = useState(null);
  const [verified, setVerified] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const findEmail = async () => {
    try {
      const response = await axios.post("http://localhost:4000/verify", {
        email,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const sendOTP = async () => {
    try {
      setOtp(null);
      setVerified(null);
      const isFound = await findEmail();
      if (isFound) {
        setStatus(true);
        const response = await axios.post("http://localhost:4000/sendotp", {
          email,
        });
        setOtp(response.data.otp);
      } else {
        alert("Please check the email you have entered");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOTP = () => {
    setVerified(otpField === otp);
    setStatus(otpField === otp);
    alert(otpField === otp);
  };

  const resetPassword = async () => {
    if (password !== confirmPassword) {
      alert("Password and confirm password must be same");
      return;
    }
    await axios.post("http://localhost:4000/reset", {
      email,
      password,
    });

    window.location.href = "/login";
  };
  return (
    <div className="container">
      <form>
        <h1>Reset Password</h1>
        {!status ? (
          <div>
            <input
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
            />
            <span>
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
          </div>
        ) : (
          <div>
            <div>
              <p>An OTP is sent to {email}</p>
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter the OTP"
                onChange={(event) => setOtpField(event.target.value)}
              />
            </div>
          </div>
        )}
        {verified === false && (
          <div>
            <p>OTP incorrect! Please try again!</p>
          </div>
        )}
        {!status ? (
          <div>
            <button id="submit" type="button" onClick={sendOTP}>
              Send OTP
            </button>
          </div>
        ) : (
          !verified && (
            <div>
              <button type="submit" id="button" onClick={verifyOTP}>
                Verify OTP
              </button>
            </div>
          )
        )}
        {verified && (
          <div>
            <p>Your OTP is verified successfully!</p>
          </div>
        )}
        {verified && (
          <div>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="New Password"
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
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm new password"
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
              <button id="submit" type="button" onClick={resetPassword}>
                Reset Password
              </button>
            </div>
          </div>
        )}
        <Link to="/login">
          <p style={{ textAlign: "center" }}>Login</p>
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
