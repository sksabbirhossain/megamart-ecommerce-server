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

//delete 

module.exports = {
  getProducts,
  getProduct,
  addProduct,
};
