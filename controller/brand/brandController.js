const Brand = require("../../modal/brandSchema");
const fs = require("fs");
const path = require("path");

//get all brands
const getAllBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find({});
    res.status(200).json({
      brands: brands,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//get a brand
const getBrand = async (req, res, nex) => {
  try {
    const { brandId } = req.params;
    const brands = await Brand.find({ _id: brandId });
    res.status(200).json(brands);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//add a brand
const addBrand = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const { filename } = req.file || {};
    const brand = new Brand({
      name,
      description,
      picture: filename,
    });
    const result = await brand.save();
    if (result._id) {
      res.status(200).json({
        brand: brand,
      });
    } else {
      res.status(500).json({
        message: "Something Was Wrong!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//update a brand
const updateBrand = async (req, res, next) => {
  try {
    const { brandId } = req.params;
    const { name, description, status } = req.body;
    const { filename } = req.file || {};

    // Find the brand by brandId
    const brand = await Brand.findById(brandId);

    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }

    // Update the name if provided
    if (name) {
      brand.name = name;
    }

    // Update the description if provided
    if (description) {
      brand.description = description;
    }

    // Update the status if provided
    if (status !== undefined) {
      brand.status = status;
    }

    // Check if a new picture is provided
    if (filename) {
      // Delete the old picture from the local folder
      if (brand.picture) {
        const oldPicturePath = path.join("./uploads", brand.picture);
        fs.unlinkSync(oldPicturePath);
      }

      // Update the picture filename
      brand.picture = filename;
    }

    // Save the updated brand
    const updatedBrand = await brand.save();

    res.status(200).json(updatedBrand);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//update a brand status
const updateBrandStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { brandid } = req.params;
    const updateData = await Brand.findByIdAndUpdate(
      { _id: brandid },
      {
        $set: {
          status: status,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      brand: updateData,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getAllBrands,
  getBrand,
  addBrand,
  updateBrand,
  updateBrandStatus,
};
