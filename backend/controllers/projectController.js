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
  const { perPage = 100, page = 1 } = req.query; // Changed from req.params to req.query

  // FETCH PROJECTS FROM GITHUB
  const response = await fetch(
    `https://api.github.com/user/repos?visibility=all&per_page=${perPage}&page=${page}`,
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );
  if (!response.ok) {
    return res
      .status(response.status)
      .json({ message: "Failed to fetch GitHub repositories" });
  }
  const gitProjects = await response.json();

  // FETCH PROJECTS FROM DATABASE
  const dbProjects = await Project.find().lean();
  
  // COMPARE LENGTHS AND UPDATE MY DATABASE
  if (dbProjects.length !== gitProjects.length) {
    // Check if there are projects missing gitId (excluding Guru Solutions)
    const projectsNeedingGitId = dbProjects.filter(
      (p) => !p.gitId && !p.title.includes("Guru Solutions")
    );

    if (projectsNeedingGitId.length > 0) {
      try {
        const promises = gitProjects.map((u) =>
          Project.updateOne(
            { githubLink: u.html_url },
            { $set: { gitId: u.id } }
          )
        );
        await Promise.all(promises);
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    }

    // Find projects in GitHub but not in DB
    const unAddedProjects = gitProjects.filter((project) => {
      return !dbProjects.some((dbProject) => {
        return dbProject.gitId?.toString() === project.id?.toString();
      });
    });

    if (unAddedProjects.length > 0) {
      try {
        const newProjects = await Promise.all(
          unAddedProjects.map((u) =>
            Project.create({
              title: u.name,
              gitId: u.id,
              description: u.description,
              technologies: [u.language || "Not Specified"],
              githubLink: u.html_url, // Added missing field
              image:
                u.image ||
                "https://placehold.co/600x400/1e293b/fff?text=Project+Image",
            })
          )
        );
        // Refresh dbProjects after creating new ones
        dbProjects.push(...newProjects.map(p => p.toObject()));
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    }
  }

  // Merge GitHub and DB data
  const projects = gitProjects.map((git) => {
    const match = dbProjects.find(
      (db) => db.gitId?.toString() === git.id?.toString() || db.title.includes("Guru")
    );
    return match ? { ...git, ...match } : git;
  });

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

  const isChanged = Object.keys(req.body).some(
    (key) => req.body[key]?.toString() !== project[key]?.toString()
  );

  if (!isChanged)
    return res.status(400).json({ message: "No changes detected" });

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
  const project = await Project.findById({_id: id});
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
