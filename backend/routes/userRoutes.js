const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const verifyJWT = require("../middleware/verifyJWT")

// Route for getting all users - placed first
router.route("/")
  .get(verifyJWT, userController.getAllUsers)

// Route for getting a specific user by ID
router.route("/:id")
  .get(userController.getUser)

module.exports = router
