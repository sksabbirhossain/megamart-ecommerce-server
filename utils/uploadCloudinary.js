const cloudinary = require("../cloudinary/config");

const uploadCloudinary = async (file) => {
  // Convert file buffer to Base64
  const base64Image = file.buffer.toString("base64");

  // Upload Base64-encoded image to Cloudinary
  return await cloudinary.uploader.upload(
    `data:image/png;base64,${base64Image}`,
    {
      resource_type: "auto",
    }
  );
};

module.exports = uploadCloudinary;
