const User = require("../../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const signup = async (name, email, password) => {
  try {
    const duplicate = await User.findOne({ email });
    console.log(duplicate);
    if (!duplicate) {
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await User.create({ name, email, password: hashedPassword });
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

module.exports = signup;
