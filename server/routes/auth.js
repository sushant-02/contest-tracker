const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

// router.post("/user/signup", authController.signup);
router.post("/user/signin", authController.signin);

module.exports = router;
