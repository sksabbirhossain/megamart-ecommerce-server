const express = require("express");
const { registerUser } = require("../../controller/users/userController");

const router = express.Router();

router.get("/register", registerUser);

module.exports = router;
