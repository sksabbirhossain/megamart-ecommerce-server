const Category = require("../../modal/categorySchema");

//get all categories
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//get a category
const getCategory = async () => {
  try {
    const { categoryId } = req.params;
    const category = await Category.find({ _id: categoryId });
    res.status(200).json(category);
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
  getCategories,
  getCategory,
  addCategory,
};
