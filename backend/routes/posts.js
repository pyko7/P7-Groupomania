const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");
const verifyAuthor = require("../middleware/verifyAuthor");
const verifySharedPost = require("../middleware/verifySharedPost");
const multer = require("../middleware/multer");

//get posts
router.get("/posts", auth, multer, postCtrl.getAllPosts);
router.get("/posts/:id", auth, multer, postCtrl.getPostsById);
//create, update, delete posts routes
router.post("/posts", auth, multer, postCtrl.createPost);
router.post("/posts/:id", auth, multer, postCtrl.sharePost);
router.put("/posts/:id", auth, verifyAuthor, multer, postCtrl.updatePost);
router.delete("/posts/:id", auth, verifyAuthor, multer, postCtrl.deletePost);
router.delete("/posts/shared/:id", auth, verifySharedPost, multer, postCtrl.deletePost);

module.exports = router;
