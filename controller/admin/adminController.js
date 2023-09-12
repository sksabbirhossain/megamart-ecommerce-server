const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//
const User = require("../../modal/userSchema");

//login a user
const loginAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await User.findOne({ email: email });
    if (admin && admin._id) {
      if (admin.role === "admin") {
        const isValidPassword = await bcrypt.compare(
          req.body.password,
          admin.password
        );

        if (isValidPassword) {
          //user object
          const adminInfo = { ...admin._doc };
          delete adminInfo.password;

          //generate token
          const token = jwt.sign(adminInfo, process.env.JWT_SECTET, {
            expiresIn: "1h",
          });

          res.status(200).json({
            message: "Loggedin SuccessFull",
            data: {
              admin: adminInfo,
              accessToken: token,
            },
          });
        } else {
          res.status(401).json({
            message: "Wrong credentials!",
          });
        }
      } else {
        res.status(401).json({
          message: "Authentication failure!",
        });
      }
    } else {
      res.status(401).json({
        message: "Wrong credentials!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  loginAdmin,
};
