const Brand = require("../../modal/brandSchema");

//get all brands
const getAllBrands = async (req, res, next) => {
  try {
    const brand = await Brand.find({});
    res.status(200).json({
      message: "success",
      data: {
        brand: brand,
      },
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
    });
    const result = await brand.save();
    if (result._id) {
      res.status(200).json({
        message: "success",
        data: {
          brand: brand,
        },
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

module.exports = {
  getAllBrands,
  addBrand,
};
