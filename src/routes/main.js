const express = require("express");
const path = require("path");
const router = express.Router();
const ejs = require("ejs")

const mainController = require("../controllers/mainController");

router.get("/", mainController.home);
router.get("/login", mainController.login);
router.get("/register", mainController.register);
router.get("/cart", mainController.cart);

module.exports = router; 