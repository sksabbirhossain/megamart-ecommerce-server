const express = require("express");
const {
  getAllBrands,
  addBrand,
} = require("../../controller/brand/brandController");
const upload = require("../../middlemare/singleFileUpload");
const router = express.Router();

router.get("/all", getAllBrands);
router.post("/add-brand", upload.single("picture"), addBrand);

module.exports = router;
