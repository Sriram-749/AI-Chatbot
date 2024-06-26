const Bot = require("../../models/Bot");
const mongoose = require("mongoose");

const create = async (botObject) => {
  try {
    // console.log(botObject);
    await Bot.create(botObject);
  } catch (error) {
    console.log(error);
  }
};

module.exports = create;
