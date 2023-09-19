const Order = require("../../modal/orderSchema");

const stripe = require("stripe")(
  "sk_test_51M8ztPHF8W9jmg2GHfc6zRXIeCw2e3IELF0OlXgBXPAE0paXrULApWkWd1AQwb4Sc0NKTrJZJv0XEEH78MZdcWlH00hL2oND6s"
);

const createPayment = async (req, res) => {
  const { token, shippingInfo, cartItems, user } = req.body;

  //total calcutation
  const total = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  try {
    // Use the Stripe token to create a charge
    const charge = await stripe.charges.create({
      amount: total, // Amount in cents
      currency: "usd",
      source: token.id,
      description: "Example Charge",
    });

    // Save shipping info and transaction ID to MongoDB
    if (charge.id) {
      const order = new Order({
        user: user._id,
        transactionId: charge.id,
        items: cartItems,
        totalAmount: total,
        shippingInfo: shippingInfo,
      });
      const result = await order.save();
      console.log(result);
      if (result) {
        res.json({ success: true, charge });
      } else {
        res.status(500).json({ error: "Payment failed" });
      }
    } else {
      res.status(500).json({ error: "Payment failed" });
    }
  } catch (err) {
    res.status(500).json({ error: "Payment failed" });
  }
};

module.exports = {
  createPayment,
};
