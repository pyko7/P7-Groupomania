const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

//signup & login routes
router.post("/auth/signup", userCtrl.createUser);
router.post("/auth/login", userCtrl.logUser);
//update profile routes
router.get("/users/:id", auth, userCtrl.getUserById);
router.put("/users/:id", auth, userCtrl.updateProfile);
router.put("/users/:id/password", auth, userCtrl.updatePassword);
router.delete("/users/:id", auth, userCtrl.deleteProfile);

module.exports = router;
