const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");
const verifyUser = require("../middleware/verifyUser");
const verifyAuthor = require("../middleware/verifyAuthor");
const multer = require("../middleware/multer");

//get posts
router.get("/posts", auth, multer, postCtrl.getAllPosts);
router.get("/posts/:id", auth, multer, postCtrl.getPostsById);
//create, update, delete posts routes
router.post("/posts", auth, multer, postCtrl.createPost);
router.put("/posts/:id", auth, verifyAuthor, multer, postCtrl.updatePost);
router.delete("/posts/:id", auth, verifyAuthor, multer, postCtrl.deletePost);

module.exports = router;
