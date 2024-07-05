const User = require("../../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const changePassword = async (email, password) => {
  try {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await User.updateOne({ email, password: hashedPassword });
  } catch (error) {
    console.log(error);
  }
};

module.exports = changePassword;
