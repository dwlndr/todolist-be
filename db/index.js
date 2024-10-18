require("dotenv").config();
const mongoose = require("mongoose");

const dbURL = process.env.DB_URL;

const db = mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = db;
