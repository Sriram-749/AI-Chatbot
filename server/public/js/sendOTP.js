const nodemailer = require("nodemailer");

const generateOTP = require("./generateOPT");

const sendOTP = async (email) => {
  const otp = generateOTP();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP",
    text: `Your OTP is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    return otp;
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendOTP;
