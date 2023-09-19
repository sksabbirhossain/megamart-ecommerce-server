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

//get oders by userId
const getUserOrder = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ user: userId });
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

//update order status
const orderUpdateStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const updateData = await Order.findByIdAndUpdate(
      { _id: orderId },
      {
        $set: {
          oderStatus: status,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something Wrong Try Again!",
    });
  }
};

module.exports = {
  getAllOrder,
  getUserOrder,
  orderUpdateStatus,
};
