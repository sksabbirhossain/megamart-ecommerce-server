const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//
const userRouter = require("./routes/users/userRouter");
const adminRouter = require("./routes/admin/adminRouter");
const brandRouter = require("./routes/brand/brandRouter");
const categoryRouter = require("./routes/category/categoryRouter");
const productRouter = require("./routes/product/productRouter");
const paymentRouter = require("./routes/payment/paymentRouter");
const orderRouter = require("./routes/order/orderRouter");

const app = express();

//common middlemare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

//static folder
app.use("/api/uploads", express.static("./uploads"));

//port
const port = process.env.PORT || 5000;

//database connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("database connection successfull"))
  .catch((err) => console.log(err));

//routes
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/brand", brandRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/order", orderRouter);

//error handler
app.use((err, req, res, next) => {
  console.log(err);
  if (res.headersSent) {
    next(err);
  } else {
    if (err.message) {
      res.status(500).json(err);
    } else {
      res.status(500).json(err);
    }
  }
});

//listen app
app.listen(port, () => {
  console.log(`listening to port on ${port}`);
});
