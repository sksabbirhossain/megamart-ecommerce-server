const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    picture_info: {
      public_key: String,
      file_name: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    brandInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
