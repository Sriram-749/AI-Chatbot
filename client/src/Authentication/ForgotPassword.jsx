import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [otpField, setOtpField] = useState();
  const [status, setStatus] = useState(false);
  const [otp, setOtp] = useState(null);
  const [verified, setVerified] = useState(true);
  // const [otpVerified, setOtpVerified] = useState(false);

  const findEmail = async () => {
    try {
      const response = await axios.post("http://localhost:4000/verify", {
        email,
      });
      return response.data.verified;
    } catch (error) {
      console.log(error);
    }
  };

  const sendOTP = async () => {
    try {
      setOtp(null);
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
    alert(otpField === otp);
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
        {!verified && (
          <div>
            <p>OTP incorrect! Please try again!</p>
          </div>
        )}
        {!status ? (
          <div>
            <button type="button" onClick={sendOTP}>
              Send OTP
            </button>
          </div>
        ) : (
          <div>
            <button type="button" onClick={verifyOTP}>
              Verify OTP
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
