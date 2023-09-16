const express = require("express");
const {
  getAllOrder,
  orderUpdateStatus,
} = require("../../controller/order/orderController");

const router = express.Router();

router.get("/all", getAllOrder);
router.patch("/update-status/:orderId", orderUpdateStatus);

module.exports = router;
