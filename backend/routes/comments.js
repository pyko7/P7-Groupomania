const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comments");
const auth = require("../middleware/auth");
const verifyCommentator = require("../middleware/verifyCommentator");

//create, update, delete comments routes
router.post("/posts/:id/comments", auth, commentCtrl.createComment);
router.put("/comments/:id", auth, verifyCommentator, commentCtrl.updateComment);
router.delete("/comments/:id", auth, verifyCommentator, commentCtrl.deleteComment);

module.exports = router;
