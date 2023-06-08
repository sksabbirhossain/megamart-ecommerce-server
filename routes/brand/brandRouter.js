const express = require("express");
const { getAllBrands } = require("../../controller/brand/brandController");
const router = express.Router();

router.get("/all", getAllBrands);

module.exports = router;
