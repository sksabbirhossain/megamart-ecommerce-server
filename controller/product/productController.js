const path = require("path");
const fs = require("fs");
const Product = require("../../modal/productSchema");
const cloudinary = require("../../cloudinary/config");
const uploadCloudinary = require("../../utils/uploadCloudinary");
const destroyCloudinary = require("../../utils/destroyCloudinary");

//get all product
const getProducts = async (req, res) => {
  const { page, limit } = req.query;
  try {
    const productLength = await Product.countDocuments({});
    const products = await Product.find({})
      .skip((page - 1) * limit)
      .limit(limit);
    if (products) {
      res.status(200).json({ data: products, totalItems: productLength });
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

//get feature products
const getFeatureProduct = async (req, res) => {
  try {
    const featureProduct = await Product.aggregate([
      { $match: { feature: true } },
      { $sample: { size: 10 } },
    ]);

    if (featureProduct) {
      res.status(200).json(featureProduct);
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
//get  products by category
const getProductByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const relatedProducts = await Product.find({ category: categoryId });

    if (relatedProducts) {
      res.status(200).json(relatedProducts);
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
    if (!req.file?.buffer) {
      return res.status(404).json("Product Image Is Required");
    }

    //upload picture in cloudinary
    const fileUpload = await uploadCloudinary(req.file);

    if (fileUpload) {
      const product = new Product({
        ...req.body,
        picture: fileUpload?.secure_url,
        picture_info: {
          public_key: fileUpload?.public_id,
          file_name: req.file?.filename,
        },
      });
      const result = await product.save();
      if (result._id) {
        res.status(200).json(result);
      } else {
        res.status(500).json({
          message: "Internal server error!",
        });
      }
    } else {
      res.status(500).json({
        message: "Internal server error!",
      });
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
    if (req.file?.buffer) {
      // Delete the old picture from the local folder
      if (product.picture_info?.file_name) {
        const oldPicturePath = path.join(
          "./uploads",
          product.picture_info?.file_name
        );

        if (oldPicturePath) {
          if (fs.existsSync(oldPicturePath)) {
            fs.unlinkSync(oldPicturePath);
          }
          //delete picture from cloudinary
          await destroyCloudinary(product.picture_info?.public_key);
        } else {
          await destroyCloudinary(product.picture_info?.public_key);
        }
      } else {
        await destroyCloudinary(product.picture_info?.public_key);
      }

      // upload new picture to Cloudinary
      const fileUpload = await uploadCloudinary(req.file);

      // Update the picture filename
      product.picture = fileUpload?.secure_url;

      product.picture_info = {
        public_key: fileUpload?.public_id,
        file_name: req.file?.filename,
      };
    }

    // Save the updated product
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
    if (product.picture_info?.file_name) {
      const picturePath = path.join(
        "./uploads",
        product.picture_info?.file_name
      );
      if (fs.existsSync(picturePath)) {
        fs.unlinkSync(picturePath);
      }
    }

    //delete product picture for cloudinary server
    await destroyCloudinary(product.picture_info?.public_key);

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//search product
const searchProducts = async (req, res) => {
  try {
    const searchQuery = req.query.search;
    if (!searchQuery) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Use regex to make a case-insensitive search across multiple fields
    const regex = new RegExp(searchQuery, "i");

    const products = await Product.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { "brand.name": { $regex: searchQuery, $options: "i" } },
        { "category.name": { $regex: searchQuery, $options: "i" } },
      ],
    })
      .populate("brand", "name") // Populate the brand field with just the name
      .populate("category", "name") // Populate the category field with just the name
      .exec();

    res.status(200).json({ data: products });
  } catch (err) {
    res.status(500).json({
      message: "Something Went Wrong!",
    });
  }
};

module.exports = {
  getProducts,
  getFeatureProduct,
  getProductByCategory,
  getProduct,
  addProduct,
  deleteProduct,
  updateProductStatus,
  updateProuct,
  searchProducts,
};
