const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const verifyUser = require("../middleware/verifyUser");
const multer = require("../middleware/multer");

//signup & login routes
router.post("/auth/signup", userCtrl.createUser);
router.post("/auth/login", userCtrl.logUser);
router.get("/auth/logout", userCtrl.logOut);

//update profile routes
router.get("/users/", auth, multer, userCtrl.getAllUsers);
router.get("/users/:id", auth, multer, userCtrl.getUserById);
router.put("/users/:id", auth, verifyUser, multer, userCtrl.updateProfile);
router.put("/users/:id/password", auth, verifyUser, multer, userCtrl.updatePassword);
router.delete("/users/:id", auth, verifyUser, multer, userCtrl.deleteProfile);

module.exports = router;
