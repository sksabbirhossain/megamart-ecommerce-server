const multer = require("multer");
const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: (req, file, cb) => {
//     const fileExt = path.extname(file.originalname);
//     const fileName =
//       file.originalname
//         .replace(fileExt, "")
//         .toLowerCase()
//         .split(" ")
//         .join("-") +
//       "-" +
//       Date.now();

//     cb(null, fileName + fileExt);
//   },
// });
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = upload;
