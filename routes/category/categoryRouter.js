const express = require("express");
const {
  getCategories,
  getCategory,
  addCategory,
} = require("../../controller/category/categoryController");
const upload = require("../../middlemare/singleFileUpload");
const router = express.Router();

router.get("/all", getCategories);
router.get("/:categoryId", getCategory);
router.post("/add-category", upload.single("picture"), addCategory);

module.exports = router;
