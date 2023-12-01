const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//
const User = require("../../modal/userSchema");
const uploadCloudinary = require("../../utils/uploadCloudinary");

//create a user
const registerUser = async (req, res, next) => {
  try {
    const { password, name, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 11);

    let user;

    if (req.file?.buffer) {
      //upload picture in cloudinary
      const fileUpload = await uploadCloudinary(req.file);
      if (fileUpload) {
        user = new User({
          name,
          email,
          profilePic: fileUpload?.secure_url,
          picture_info: {
            public_key: fileUpload?.public_id,
            file_name: req.file?.filename,
          },
          password: hashedPassword,
          role: "user",
        });
      } else {
        res.status(500).json({
          message: "server error!",
        });
      }
    } else {
      user = new User({
        name,
        email,
        profilePic: null,
        password: hashedPassword,
        role: "user",
      });
    }

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
