const express = require("express");
const router = express.Router();
const likeDislikeCtrl = require("../controllers/likes");
const auth = require("../middleware/auth");

//like routes
router.get("/posts/:id/like", likeDislikeCtrl.getLikes);
router.post("/posts/:id/like", auth, likeDislikeCtrl.likePost);

module.exports = router;
