const Order = require("../../modal/orderSchema");

//get all order
const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find({});
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(500).json({
        message: "Something Wrong Try Again!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something Wrong Try Again!",
    });
  }
};

module.exports = {
  getAllOrder,
};
