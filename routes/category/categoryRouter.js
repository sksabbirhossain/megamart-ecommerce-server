const express = require("express");
const {
  getCategories,
  getCategory,
  addCategory,
  updateStatus,
  deleteCategory,
  updateCategory,
} = require("../../controller/category/categoryController");
const upload = require("../../middlemare/singleFileUpload");
const router = express.Router();

router.get("/all", getCategories);
router.get("/:categoryId", getCategory);
router.post("/add-category", upload.single("picture"), addCategory);
router.patch("/update/:categoryId", upload.single("picture"), updateCategory);
router.patch("/update/status/:categoryId", updateStatus);
router.delete("/delete/:categoryId", deleteCategory);

module.exports = router;
