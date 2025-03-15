const asyncHandler = require("express-async-handler");
const Project = require("../model/Project");

const createProject = asyncHandler(async (req, res) => {
  const { title, description, technologies, githubLink, demoLink, image } =
    req.body;
  if (
    !title ||
    !githubLink ||
    !image ||
    !technologies ||
    technologies.length === 0
  )
    return res.status(401).json({ message: "All (*) Fields are Required" });
  const project = await Project.create({
    title,
    description,
    technologies,
    githubLink,
    demoLink,
    image,
  });
  // Send response
  if (project) {
    res.status(201).json({
      message: "Project created successfully!",
      project,
    });
  } else {
    res.status(500).json({ message: "Failed to create project." });
  }
});

const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().lean();
  if (!projects.length)
    return res.status(404).json({ message: "404 Not Found" });
  return res.status(200).json(projects);
});

const updateProject = asyncHandler(async (req, res) => {
  const { id, title, description, technologies, githubLink, demoLink, image } =
    req.body;

  if (!id) {
    return res.status(400).json({ message: "Project ID is required" });
  }

  const project = await Project.findById(id);

  if (!project) {
    return res.status(404).json({ message: "Project Not Found" });
  }

  const isChanged = Object.keys(req.body).some( (key) => req.body[key]?.toString() !== project[key]?.toString() );

  if (!isChanged) return res.status(400).json({ message: "No changes detected" });

  if (title) project.title = title;
  if (description) project.description = description;
  if (technologies) project.technologies = technologies;
  if (githubLink) project.githubLink = githubLink;
  if (demoLink) project.demoLink = demoLink;
  if (image) project.image = image;

  const updatedProject = await project.save();

  return res.status(200).json({
    message: "Project updated successfully",
    project: updatedProject,
  });
});

const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) return res.sendStatus(400);
  const project = await Project.findById(id);
  if (!project) return res.status(404).json({ message: "Project Not Found" });
  const result = await project.deleteOne();
  if (result) return res.json({ l: 99 });
  return res.json({ message: `${project.title} has been deleted` });
});

module.exports = {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
};
