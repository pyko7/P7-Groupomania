const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

//signup & login routes
router.post("/auth/signup", userCtrl.createUser);
router.post("/auth/login", userCtrl.logUser);
//update profile routes
router.get("/users/:id", auth, multer, userCtrl.getUserById);
router.put("/users/:id", auth, multer, userCtrl.updateProfile);
router.put("/users/:id/password", auth, multer, userCtrl.updatePassword);
router.delete("/users/:id", auth, multer, userCtrl.deleteProfile);

module.exports = router;
