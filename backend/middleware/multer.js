const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (req.route.path === "/users/:id") callback(null, "images/users");
  },

  filename: (req, file, callback) => {
    //add underscores instead of spaces
    const name = uuidv4().split("-").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

const upload = multer({
  //file size limit
  limits: {
    files: 1,
    fileSize: 2097152, //2mb limit
  },

  fileFilter: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    if (extension !== ".png" && extension !== ".jpg" && extension !== ".jpeg") {
      return callback(
        new Error(
          "Seules les images aux formats PNG, JPG et JPEG sont acceptées"
        )
      );
    }
    callback(null, true);
  },

  storage,
}).single("images");

module.exports = (req, res, next) => {
  upload(req, res, (err) => err
    ? res.status(400).json(err)
    : next());
};
