const express = require("express");
const {
  getAllOrder,
  orderUpdateStatus,
  getUserOrder,
} = require("../../controller/order/orderController");
const checkedLogin = require("../../middlemare/checkedLogin");

const router = express.Router();

router.get("/all", checkedLogin, getAllOrder);
router.get("/user-order/:userId", checkedLogin, getUserOrder);
router.patch("/update-status/:orderId", checkedLogin, orderUpdateStatus);

module.exports = router;
