const path = require("path");
const fs = require("fs");
const Product = require("../../modal/productSchema");

//get all product
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(500).json({
        message: "There was a server side error!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//get product by id
const getProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.find({ _id: productId });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(500).json({
        message: "There was a server side error!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//add a product
const addProduct = async (req, res) => {
  try {
    const { filename } = req.file || {};
    const product = new Product({
      ...req.body,
      picture: filename,
    });
    const result = await product.save();
    if (result._id) {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    // Find the category by categoryId
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete the picture from the local folder
    if (product.picture) {
      const picturePath = path.join("./uploads", product.picture);
      if (fs.existsSync(picturePath)) {
        fs.unlinkSync(picturePath);
      }
    }

    // Delete  product from the database
    await Product.findOneAndRemove(productId);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
};
