const Brand = require("../../modal/brandSchema");

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

//add a brand
const addBrand = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const { filename } = req.file || {};
    const brand = new Brand({
      name,
      description,
      picture: filename,
      status: "active",
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
  addBrand,
  updateBrandStatus,
};
