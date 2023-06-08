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

module.exports = {
  getAllBrands,
};
