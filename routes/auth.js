const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Singin
router.post("/signin", userController.singin);

// Login
router.post("/login", userController.login);

module.exports = router;
