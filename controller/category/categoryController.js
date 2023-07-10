const Category = require("../../modal/categorySchema");

const getCategory = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const addCategory = async (req, res, next) => {
  try {
    const { name, brandInfo } = req.body;
    const { filename } = req.file || {};
    const category = new Category({
      name,
      status: true,
      brandInfo,
      picture: filename,
    });
    const result = await category.save();
    if (result._id) {
      res.status(200).json(result);
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
  getCategory,
  addCategory,
};
