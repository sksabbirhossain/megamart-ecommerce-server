const express = require("express");
const {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProductStatus,
  updateProuct,
  getFeatureProduct,
  getProductByCategory,
  searchProducts,
} = require("../../controller/product/productController");
const upload = require("../../middlemare/singleFileUpload");
const checkedLogin = require("../../middlemare/checkedLogin");
const router = express.Router();

//routes for admin dashboard
router.get("/all", getProducts);
router.get("/product/:productId", getProduct);
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

//routes for users
router.get("/featue-products", getFeatureProduct);
router.get("/product-by-category/:categoryId", getProductByCategory);

//common
router.get("/search", searchProducts);

module.exports = router;
