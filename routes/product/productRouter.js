const express = require("express");
const { getProducts } = require("../../controller/product/productController");
const router = express.Router();

router.get("/all", getProducts);

module.exports = router;
