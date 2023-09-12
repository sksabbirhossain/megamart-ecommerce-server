const express = require("express");
const {
  registerUser,
  loginUser,
  checkUser,
} = require("../../controller/users/userController");
const upload = require("../../middlemare/singleFileUpload");
const checkedLogin = require("../../middlemare/checkedLogin");

const router = express.Router();

router.post("/register", upload.single("profilePic"), registerUser);
router.post("/login", loginUser);
router.get("/me", checkedLogin, checkUser);

module.exports = router;
