const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//
const User = require("../../modal/userSchema");

//register a user
const registerUser = async (req, res, next) => {
  try {
    const { password, name, email } = req.body;
    const { filename } = req.file || {};
    const hashedPassword = await bcrypt.hash(password, 11);
    const user = new User({
      name,
      email,
      profilePic: filename || null,
      password: hashedPassword,
    });
    const userData = await user.save();
    if (userData._id) {
      res.status(200).json({
        message: "User Create SuccessFull",
        user: userData,
      });
    } else {
      res.status(500).json({
        message: "There was an error!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//login a user
const loginUser = (req, res, next) => {
  res.send("hello user");
};

module.exports = {
  registerUser,
  loginUser,
};
