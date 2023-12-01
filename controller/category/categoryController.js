const path = require("path");
const fs = require("fs");
const Category = require("../../modal/categorySchema");
const cloudinary = require("../../cloudinary/config");
const destroyCloudinary = require("../../utils/destroyCloudinary");
const uploadCloudinary = require("../../utils/uploadCloudinary");

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
const getCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.find({ _id: categoryId }).populate(
      "brandInfo"
    );
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//get categories by brandId
const getCategoriesByBrandId = async (req, res) => {
  try {
    const { brandId } = req.params;
    const categories = await Category.find({ brandInfo: brandId });
    res.status(200).json(categories);
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

    if (!req.file?.buffer) {
      return res.status(404).json("Category Image Is Required");
    }

    //upload picture in cloudinary
    const fileUpload = await uploadCloudinary(req.file);

    if (fileUpload) {
      const category = new Category({
        name,
        status: true,
        brandInfo,
        picture: fileUpload?.secure_url,
        picture_info: {
          public_key: fileUpload?.public_id,
          file_name: req.file?.filename,
        },
      });
      const result = await category.save();
      if (result._id) {
        res.status(200).json(result);
      } else {
        res.status(500).json({
          message: "Something Was Wrong!",
        });
      }
    } else {
      res.status(500).json({
        message: "Internal server Error!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//update a category
const updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { name, brandInfo, status } = req.body;
    const { filename } = req.file || {};

    // Find the brand by brandId
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Update the name if provided
    if (name) {
      category.name = name;
    }

    // Update the description if provided
    if (brandInfo) {
      category.brandInfo = brandInfo;
    }

    // Update the status if provided
    if (status !== undefined) {
      category.status = status;
    }

    // Check if a new picture is provided
    if (req.file?.buffer) {
      // Delete the old picture from the local folder
      if (category.picture_info?.file_name) {
        const oldPicturePath = path.join(
          "./uploads",
          category.picture_info?.file_name
        );

        if (oldPicturePath) {
          if (fs.existsSync(oldPicturePath)) {
            fs.unlinkSync(oldPicturePath);
          }
          //delete picture from cloudinary
          await destroyCloudinary(category.picture_info?.public_key);
        } else {
          await destroyCloudinary(category.picture_info?.public_key);
        }
      } else {
        await destroyCloudinary(category.picture_info?.public_key);
      }

      // upload new picture to Cloudinary
      const fileUpload = await uploadCloudinary(req.file);

      // Update the picture filename
      category.picture = fileUpload?.secure_url;

      category.picture_info = {
        public_key: fileUpload?.public_id,
        file_name: req.file?.filename,
      };
    }

    // Save the updated category
    const updatedCategory = await category.save();

    res.status(200).json(updatedCategory);
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
    const updateData = await Category.findByIdAndUpdate(
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

    // Delete the category from the database
    const category = await Category.findByIdAndDelete(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Delete the picture from the local folder
    if (category.picture_info?.file_name) {
      const picturePath = path.join(
        "./uploads",
        category.picture_info?.file_name
      );
      if (fs.existsSync(picturePath)) {
        fs.unlinkSync(picturePath);
      }
    }

    //delete category picture for cloudinary server
    await destroyCloudinary(category.picture_info?.public_key);

    await res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getCategories,
  getCategory,
  getCategoriesByBrandId,
  addCategory,
  updateCategory,
  updateStatus,
  deleteCategory,
};
