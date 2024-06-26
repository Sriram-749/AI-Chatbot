const User = require("../../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const returnObj = {
        uid: user._id.toString(),
        email: user.email,
        name: user.name,
      };
      return returnObj;
    } else return false;
  } else return false;
};

module.exports = login;
