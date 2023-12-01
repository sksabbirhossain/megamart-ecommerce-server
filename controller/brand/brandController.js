const Brand = require("../../modal/brandSchema");
const fs = require("fs");
const path = require("path");
const uploadCloudinary = require("../../utils/uploadCloudinary");
const destroyCloudinary = require("../../utils/destroyCloudinary");

//get all brands
const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.status(200).json(brands);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//get a brand
const getBrand = async (req, res) => {
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
const addBrand = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!req.file?.buffer) {
      return res.status(404).json("Brand Image Is Required");
    }

    // Upload Base64-encoded image to Cloudinary
    const fileUpload = await uploadCloudinary(req.file);

    if (fileUpload) {
      const brand = new Brand({
        name,
        description,
        picture: fileUpload?.secure_url,
        picture_info: {
          public_key: fileUpload?.public_id,
          file_name: req.file?.filename,
        },
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
    } else {
      res.status(500).json({
        message: "Internal server error!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

//update a brand
const updateBrand = async (req, res, next) => {
  try {
    const { brandId } = req.params;
    const { name, description, status } = req.body;
    // const { filename } = req.file || {};

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
    if (req.file?.buffer) {
      // Delete the old picture from the local folder
      if (brand.picture_info?.file_name) {
        const oldPicturePath = path.join(
          "./uploads",
          brand.picture_info?.file_name
        );

        if (oldPicturePath) {
          if (fs.existsSync(oldPicturePath)) {
            fs.unlinkSync(oldPicturePath);
          }
          //delete picture from cloudinary
          await destroyCloudinary(brand.picture_info?.public_key);
        } else {
          await destroyCloudinary(brand.picture_info?.public_key);
        }
      } else {
        await destroyCloudinary(brand.picture_info?.public_key);
      }

      // upload new picture to Cloudinary
      const fileUpload = await uploadCloudinary(req.file);

      // Update the picture filename
      brand.picture = fileUpload?.secure_url;

      brand.picture_info = {
        public_key: fileUpload?.public_id,
        file_name: req.file?.filename,
      };
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

//delete brand
const deleteBrand = async (req, res, next) => {
  try {
    const { brandId } = req.params;

    // Delete the brand from the database
    const brand = await Brand.findByIdAndDelete(brandId);

    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }

    // Delete the picture from the local folder
    if (brand.picture_info?.file_name) {
      const picturePath = path.join("./uploads", brand.picture_info?.file_name);
      if (fs.existsSync(picturePath)) {
        fs.unlinkSync(picturePath);
      }
    }

    //delete brand picture for cloudinary server
    await destroyCloudinary(brand.picture_info?.public_key);

    return res.status(200).json({ message: "Brand deleted successfully" });
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
  deleteBrand,
};
