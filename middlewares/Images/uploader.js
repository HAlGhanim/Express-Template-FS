const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const imageTypes = ["image/jpeg", "image/jpg", "image/png"];
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (imageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only JPG, JPEG, and PNG images are supported"));
    }
  },
});

module.exports = upload;
