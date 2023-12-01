const mongoose = require("mongoose");

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
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
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
