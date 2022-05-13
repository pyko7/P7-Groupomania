const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");
const verifyUser = require("../middleware/verifyUser");
const multer = require("../middleware/multer");

//get posts
router.get("/posts", auth, multer, postCtrl.getAllPosts);
router.get("/posts/:id", auth, multer, postCtrl.getPostsById);
//update profile routes
router.post("/posts", auth, multer, postCtrl.createPost);
router.delete("/posts", auth, verifyUser, multer, postCtrl.deletePost);
router.delete("/posts/:id", auth, verifyUser, multer, postCtrl.deletePost);

module.exports = router;
