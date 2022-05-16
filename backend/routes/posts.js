const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");
const verifyUser = require("../middleware/verifyUser");
const verifyAuhtor = require("../middleware/verifyAuthor");
const multer = require("../middleware/multer");

//get posts
router.get("/posts", auth, multer, postCtrl.getAllPosts);
router.get("/posts/:id", auth, multer, postCtrl.getPostsById);
//update profile routes
router.post("/posts", auth, multer, postCtrl.createPost);
router.put("/posts/:id", auth, verifyAuhtor, multer, postCtrl.updatePost);
router.delete("/posts", auth, verifyAuhtor, multer, postCtrl.deletePost);
router.delete("/posts/:id", auth, verifyAuhtor, multer, postCtrl.deletePost);

module.exports = router;
