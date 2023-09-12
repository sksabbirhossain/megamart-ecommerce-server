const express = require("express");
const { getAllOrder } = require("../../controller/order/orderController");

const router = express.Router();

router.get("/all", getAllOrder);

module.exports = router;
