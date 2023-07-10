const express = require("express");
const { getCategory } = require("../../controller/category/categoryController");
const router = express.Router();

router.get("/all", getCategory);

module.exports = router;
