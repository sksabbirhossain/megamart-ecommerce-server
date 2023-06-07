const express = require("express");
const {
  registerUser,
  loginUser,
} = require("../../controller/users/userController");
const upload = require("../../middlemare/singleFileUpload");

const router = express.Router();

router.post("/register", upload.single("profilePic"), registerUser);
router.post("/login", loginUser);

module.exports = router;
