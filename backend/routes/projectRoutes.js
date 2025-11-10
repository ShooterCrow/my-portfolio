const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const verifyJWT = require("../middleware/verifyJWT");
const upload = require("../config/multer");

// Specific routes first
router.route("/:id").get(projectController.getProject);

router.route("/delete/all").delete(projectController.deleteAllProjects);

router
  .route("/git-update")
  .post(verifyJWT, projectController.getGithubProjectsAndUpdate);

// General routes after
router
  .route("/")
  .get(projectController.getAllProjects)
  .post(
    verifyJWT,
    upload.fields([
      { name: "icon", maxCount: 1 },
      { name: "screenshots", maxCount: 10 },
    ]),
    projectController.createProject
  )
  .patch(
    verifyJWT,
    upload.fields([
      { name: "icon", maxCount: 1 },
      { name: "screenshots", maxCount: 10 },
    ]),
    projectController.updateProject
  )
  .delete(verifyJWT, projectController.deleteProject);

module.exports = router;
