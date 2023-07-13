const express = require("express");
const {
  getCategories,
  getCategory,
  addCategory,
  updateStatus,
} = require("../../controller/category/categoryController");
const upload = require("../../middlemare/singleFileUpload");
const router = express.Router();

router.get("/all", getCategories);
router.get("/:categoryId", getCategory);
router.post("/add-category", upload.single("picture"), addCategory);
router.post("/update/status/:categoryId", updateStatus);

module.exports = router;
