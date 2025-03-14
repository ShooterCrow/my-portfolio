const express = require("express")
const router = express.Router()
const projectController = require("../controllers/projectController")
const verifyJWT = require("../middleware/verifyJWT")

router.route("/")
.get(projectController.getAllProjects)
.post(verifyJWT, projectController.createProject)
.patch(verifyJWT, projectController.createProject)
.delete(verifyJWT, projectController.deleteProject)
module.exports = router