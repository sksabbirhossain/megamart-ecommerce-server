const express = require("express");
const {
  getAllBrands,
  addBrand,
  updateBrandStatus,
} = require("../../controller/brand/brandController");
const upload = require("../../middlemare/singleFileUpload");
const router = express.Router();

router.get("/all", getAllBrands);
router.post("/add-brand", upload.single("picture"), addBrand);
router.patch("/update/status/:brandid", updateBrandStatus);

module.exports = router;
