const crypto = require("crypto");
const multer = require("multer");
const AppError = require("../utils/appError");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./public/images");
    },
    filename: (req, file, callback) => {
      const fileType = file.mimetype.split("/")[1];
      callback(null, `${crypto.randomUUID()}.${fileType}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith("image/")) {
      callback(null, true);
    } else {
      callback(new AppError("This file is not an image.", 400), false);
    }
  },
});

module.exports = upload.array("photos");
