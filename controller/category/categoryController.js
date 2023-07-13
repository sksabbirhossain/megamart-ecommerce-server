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

//add a new category
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

//update category status
const updateStatus = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { status } = req.body;
    const updateData = await Brand.findByIdAndUpdate(
      { _id: categoryId },
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

//delete a category
const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    // Find the category by categoryId
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Delete the picture from the local folder
    if (category.picture) {
      const picturePath = path.join("./uploads", category.picture);
      fs.unlinkSync(picturePath);
    }

    // Delete the category from the database
    await Category.findOneAndRemove(categoryId);

    res.status(200).json({ message: "Category deleted successfully" });
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
  updateStatus,
  deleteCategory,
};
