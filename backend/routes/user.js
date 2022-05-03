const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

//signup & login routes

router.post("/signup", userCtrl.createUser);
router.post("/login", userCtrl.logUser);

module.exports = router;
