require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports = {
  regis: async (req, res) => {
    const { username, password } = req.body;

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({ username, password: hash });
    await newUser.save();

    res.json({ message: "Registration successful" });
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Login failed" });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Login failed" });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_KEY);

    res.json({ message: "Login successful", token });
  },
};
