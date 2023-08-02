const express = require("express");
const {
  getCategories,
  getCategory,
  addCategory,
  updateStatus,
  deleteCategory,
  updateCategory,
  getCategoriesByBrandId,
} = require("../../controller/category/categoryController");
const upload = require("../../middlemare/singleFileUpload");
const checkedLogin = require("../../middlemare/checkedLogin");
const router = express.Router();

router.get("/all", getCategories);
router.get("/:categoryId", getCategory);
router.get("/get-category/:brandId", getCategoriesByBrandId);
router.post(
  "/add-category",
  checkedLogin,
  upload.single("picture"),
  addCategory
);
router.patch(
  "/update/:categoryId",
  checkedLogin,
  upload.single("picture"),
  updateCategory
);
router.patch("/update/status/:categoryId", checkedLogin, updateStatus);
router.delete("/delete/:categoryId", checkedLogin, deleteCategory);

module.exports = router;
