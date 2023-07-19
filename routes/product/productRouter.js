const express = require("express");
const {
  getProducts,
  getProduct,
  addProduct,
} = require("../../controller/product/productController");
const upload = require("../../middlemare/singleFileUpload");
const router = express.Router();

router.get("/all", getProducts);
router.get("/:productId", getProduct);
router.post("/add-product", upload.single("picture"), addProduct);

module.exports = router;
