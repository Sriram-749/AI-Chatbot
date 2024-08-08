require("dotenv").config({ path: "../.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Bot = require("./models/Bot");

const signup = require("./public/js/signup");
const login = require("./public/js/login");
const create = require("./public/js/create");
const verify = require("./public/js/verify");
const sendOTP = require("./public/js/sendOTP");
const changePassword = require("./public/js/changePassword");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/images", express.static(__dirname + "/public/images"));

mongoose
  .connect("mongodb://127.0.0.1:27017/chatbot")
  .then(() => console.log("MongoDB connected"));

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const success = await signup(name, email, password);
    if (success) res.json(true);
    else res.json(false);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Opps something went wrong! Please try again",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await login(email, password);
    if (user) {
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY);
      res.json({ user: user, token: accessToken });
    } else {
      res.json(false);
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Opps something went wrong! Please try again",
    });
  }
});

app.post("/verify", async (req, res) => {
  try {
    const email = req.body.email;
    const found = await verify(email);
    res.json(found);
  } catch (err) {
    console.log(err);
  }
});

app.post("/sendotp", async (request, response) => {
  try {
    const otp = await sendOTP(request.body.email);
    await response.json({ otp: otp });
  } catch (error) {
    console.log(error);
  }
});

app.post("/reset", async (request, response) => {
  try {
    const { email, password } = request.body;
    changePassword(email, password);
    response.json({ status: "success" });
  } catch (err) {
    response.json({ status: failed, message: "Opps! Something went wrong" });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get("/createbot", authenticateToken, (req, res) => {
  if (req.user) return res.json(true);
  res.status(403).json({
    success: false,
    message: "Unauthorized",
  });
});

app.listen(4000, () => {
  console.log("Server listening to the port 4000!");
});
