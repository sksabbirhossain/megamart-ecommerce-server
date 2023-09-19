const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Assuming you have a User model
      ref: "User", // Reference to the User model
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    items: [], // An array of cart items
    totalAmount: {
      type: Number,
      required: true,
    },

    //ShippingInfo
    shippingInfo: {
      type: Object,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["delivered", "processing", "completed"],
      default: "processing",
    },
  },

  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Order model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
