const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

async function addUser(req, res) {
  const { email, username, name, password } = req.body;
  console.log({ email, username, name, password });
  if (!email || !username || !name || !password) {
    return res
      .status(400)
      .send({ message: "Email, username, name, and password are required" });
  }
  try {
    console.log("Request Body:", req.body);
    const userExists = await User.findOne({ email: email });
    console.log("User Exists:", userExists);
    if (userExists) {
      return res.status(200).send({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
      email: email,
      username: username,
      name: name,
      password: hashedPassword,
    });
    console.log("User to be saved:", user);
    await user.save();
    return res
      .status(201)
      .send({ message: "User added successfully", user: user });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message || error,
    });
  }
};


async function getUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid login credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid login credentials" });
    }
    const token = jwt.sign({ _id: user._id }, "ironman", { expiresIn: "1d" });
    const result = {
      message: "Login Successful",
      success: true,
      token: token,
      id: user._id,
      username: user.username,
    };

    res.status(200).send(result);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message || error,
    });
  }
}

module.exports = {
  addUser,
  getUser,
};