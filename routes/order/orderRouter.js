const express = require("express");
const {
  getAllOrder,
  orderUpdateStatus,
  getUserOrder,
} = require("../../controller/order/orderController");

const router = express.Router();

router.get("/all", getAllOrder);
router.get("/user-order/:userId", getUserOrder);
router.patch("/update-status/:orderId", orderUpdateStatus);

module.exports = router;
