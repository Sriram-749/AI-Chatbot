const mongoose = require("mongoose");

const botSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true },
  personalities: { type: Array, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

module.exports = mongoose.model("bots", botSchema);
