const User = require("../../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const verify = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (user) return true;
    return false;
  } catch (error) {
    console.log(error);
  }
};

module.exports = verify;
