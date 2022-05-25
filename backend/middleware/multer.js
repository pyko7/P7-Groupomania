const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  //according to the request, the image will be stored in different folders
  destination: (req, file, callback) => {
    if (req.route.path === "/users/:id") callback(null, "images/users");
    if (req.route.path === "/posts") callback(null, "images/posts");
    if (req.route.path === "/posts/:id") callback(null, "images/posts");
  },

  filename: (req, file, callback) => {
    //add underscores instead of dashes
    const name = uuidv4().split("-").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

//defines the number of file when uploading as well as the size of the file
const limits = {
  files: 1,
  fileSize: 3145728, //3mb limit
};

/**
 * check the extension of the file
 * if it's not an acceptable extension it returns an error
 */
const fileFilter = (req, file, callback) => {
  const extension = path.extname(file.originalname);
  if (extension !== ".png" && extension !== ".jpg" && extension !== ".jpeg") {
    return callback(
      new Error(
        "Seules les images aux formats PNG, JPG et JPEG sont acceptées"
      ),
      false
    );
  }
  callback(null, true);
};

module.exports = multer({ storage, limits, fileFilter }).single("images");
