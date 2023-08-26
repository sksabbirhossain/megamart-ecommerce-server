const stripe = require("stripe")(
  "sk_test_51M8ztPHF8W9jmg2GHfc6zRXIeCw2e3IELF0OlXgBXPAE0paXrULApWkWd1AQwb4Sc0NKTrJZJv0XEEH78MZdcWlH00hL2oND6s"
);

const createPayment = async (req, res) => {
  try {
    const { items, amount } = req.body; // Consider passing the total amount from the client

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert the amount to cents (assuming amount is in dollars)
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("Error creating PaymentIntent:", err.message);
    res.status(500).send({
      message: "Error creating PaymentIntent.",
    });
  }
};

module.exports = {
  createPayment,
};
