const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const loginLimter = require("../middleware/loginLimiter")

router.post("/", loginLimter, authController.handleLogin)
router.post("/logout", authController.handleLogout)

module.exports = router