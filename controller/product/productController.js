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

//get a product by id
const getProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById({ _id: productId })
      .populate("brand")
      .populate("category")
      .exec();
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

//update status
const updateProductStatus = async (req, res) => {
  try {
    const { productId } = req.params;
    const { status } = req.body;
    const updateData = await Product.findByIdAndUpdate(
      { _id: productId },
      {
        $set: {
          status: status,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateData);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//update product
const updateProuct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, brand, category, description, price, stock, status } =
      req.body;
    const { filename } = req.file || {};

    // Find the brand by brandId
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Update the name if provided
    if (name) {
      product.name = name;
    }

    // Update the description if provided
    if (brand) {
      product.brand = brand;
    }
    // Update the category if provided
    if (category) {
      product.category = category;
    }

    // Update the description if provided
    if (description) {
      product.description = description;
    }

    // Update the price if provided
    if (price) {
      product.price = price;
    }

    // Update the stock if provided
    if (stock) {
      product.stock = stock;
    }

    // Update the status if provided
    if (status !== undefined) {
      product.status = status;
    }

    // Check if a new picture is provided
    if (filename) {
      // Delete the old picture from the local folder
      if (product.picture) {
        const oldPicturePath = path.join("./uploads", product.picture);
        fs.unlinkSync(oldPicturePath);
      }

      // Update the picture filename
      product.picture = filename;
    }

    // Save the updated brand
    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Delete  product from the database
    const product = await Product.findByIdAndDelete(productId);
    // console.log(product)

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

    return res.status(200).json({ message: "Product deleted successfully" });
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
  updateProductStatus,
  updateProuct,
};
