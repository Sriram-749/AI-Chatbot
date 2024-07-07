require("dotenv").config({ path: "../.env" });

const express = require("express");
const session = require("express-session");
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

app.use(
  session({
    secret: "Shh... this is a secret key",
    resave: false,
    saveUninitialized: true,
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/chatbot")
  .then(() => console.log("MongoDB connected"));

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "uploads/");
  },

  filename: (request, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const authenticateToken = (request, response, next) => {
  // const
};

app.post("/signup", async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const success = await signup(name, email, password);
    if (success) response.json(true);
    else response.json(false);
  } catch (error) {
    response.status(400).json({
      success: false,
      message: "Opps something went wrong! Please try again",
    });
  }
});

app.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await login(email, password);
    if (user) {
      // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY);
      console.log("success!");
      response.json(user);
    } else {
      console.log("failed");
      response.json(false);
    }
  } catch (error) {
    console.log(error);
    response.status(400).json({
      success: false,
      message: "Opps something went wrong! Please try again",
    });
  }
});

app.post("/verify", async (request, response) => {
  try {
    const email = request.body.email;
    const found = await verify(email);
    response.json(found);
  } catch (error) {
    console.log(error);
  }
});

app.post("/create", async (request, response) => {
  try {
    const botObject = request.body;
    const botData = {
      uid: botObject.uid,
      name: botObject.botname,
      personalities: [
        ...botObject.positivePersonalities,
        ...botObject.negativePersonalities,
      ],
      date: botObject.date,
      time: botObject.time,
    };
    await Bot.create(botData);
    response.status(201).send("Bot created successfully");
  } catch (error) {
    console.error(error);
    response.status(500).send("Error creating bot");
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
  } catch (error) {
    response.json({ status: failed, message: "Opps! Something went wrong" });
  }
});

app.post("/logout", (request, response) => {});

app.listen(4000, () => {
  console.log("Server listening to the port 4000!");
});
