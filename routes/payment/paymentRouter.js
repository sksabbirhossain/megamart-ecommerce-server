const express = require("express");
const { createPayment } = require("../../controller/payment/paymentController");

const router = express.Router();

router.post("/create-payment-intent", createPayment);

module.exports = router;
