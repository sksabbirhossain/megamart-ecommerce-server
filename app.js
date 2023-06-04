const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//
const userRouter = require("./routes/users/userRouter")

const app = express();

//common middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

//static folder
app.use("/uploads", express.static("./uploads"));

//port
const port = process.env.PORT || 5000;

//database connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("database connection successfull"))
  .catch((err) => console.log(err));

//routes
app.use("/api/user", userRouter);

//error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    next("There was a problem!");
  } else {
    if (err.message) {
      res.status(500).json(err.message);
    } else {
      res.status(500).json("There was an error!");
    }
  }
});

//listen app
app.listen(port, () => {
  console.log(`listening to port on ${port}`);
});
