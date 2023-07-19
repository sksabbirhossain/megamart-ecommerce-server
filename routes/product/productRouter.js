const express = require("express");
const { getProducts, getProduct } = require("../../controller/product/productController");
const router = express.Router();

router.get("/all", getProducts);
router.get("/:productId", getProduct);

module.exports = router;
