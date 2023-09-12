const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//
const User = require("../../modal/userSchema");

//create a user
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
      role: "user",
    });
    const userData = await user.save();
    if (userData._id) {
      res.status(200).json({
        message: "User Create SuccessFull",
        data: {
          user: userData,
        },
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
const loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user && user._id) {
      if (user.role !== "user") {
        res.status(500).json({
          message: "There was an error!!",
        });
      }

      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        //user object
        const userInfo = { ...user._doc };
        delete userInfo.password;

        //generate token
        const token = jwt.sign(userInfo, process.env.JWT_SECTET, {
          expiresIn: "7d",
        });

        res.status(200).json({
          message: "Loggedin SuccessFull",
          data: {
            user: userInfo,
            accessToken: token,
          },
        });
      } else {
        res.status(500).json({
          message: "There was an error!!",
        });
      }
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

//check user login or not
const checkUser = async (req, res) => {
  try {
    if (req.userId && req.email) {
      res.status(200).json({
        message: "User is Loggedin",
        status: 200,
      });
    } else {
      res.status(500).json({
        message: "User is not Login!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  checkUser,
};
