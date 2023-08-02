const express = require("express");
const {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProductStatus,
  updateProuct,
} = require("../../controller/product/productController");
const upload = require("../../middlemare/singleFileUpload");
const checkedLogin = require("../../middlemare/checkedLogin");
const router = express.Router();

router.get("/all", getProducts);
router.get("/:productId", getProduct);
router.post("/add-product", checkedLogin, upload.single("picture"), addProduct);
router.patch(
  "/update-product-status/:productId",
  checkedLogin,
  updateProductStatus
);
router.patch(
  "/update-product/:productId",
  checkedLogin,
  upload.single("picture"),
  updateProuct
);
router.delete("/delete-product/:productId", checkedLogin, deleteProduct);

module.exports = router;
