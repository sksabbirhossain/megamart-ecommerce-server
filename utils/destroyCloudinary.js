const cloudinary = require("../cloudinary/config");

const destroyCloudinary = async (publicKey) => {
  // delete Base64-encoded image to Cloudinary
  return await cloudinary.uploader.destroy(publicKey);
};

module.exports = destroyCloudinary;
