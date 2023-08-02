const express = require("express");
const {
  getAllBrands,
  addBrand,
  updateBrandStatus,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../../controller/brand/brandController");
const upload = require("../../middlemare/singleFileUpload");
const checkedLogin = require("../../middlemare/checkedLogin");
const router = express.Router();

router.get("/all", getAllBrands);
router.get("/:brandId", getBrand);
router.post("/add-brand", checkedLogin, upload.single("picture"), addBrand);
router.patch(
  "/update/:brandId",
  checkedLogin,
  upload.single("picture"),
  updateBrand
);
router.patch("/update/status/:brandid", checkedLogin, updateBrandStatus);
router.delete("/delete/:brandId", checkedLogin, deleteBrand);

module.exports = router;
