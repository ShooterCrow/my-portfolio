const asyncHandler = require("express-async-handler");
const Project = require("../model/Project");
const cloudinary = require("cloudinary").v2;

// Helper function to validate image files
const isValidImageFile = (file) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB
  return allowedTypes.includes(file.mimetype) && file.size <= maxSize;
};

const safeJsonParse = (str, fallback = null) => {
  if (!str || typeof str !== "string") return fallback;

  try {
    return JSON.parse(str);
  } catch (error) {
    console.error("JSON parsing error:", error.message);
    return fallback;
  }
};

// Helper function to cleanup failed uploads
const cleanupFailedUploads = async (files) => {
  const cleanupPromises = [];

  if (files.icon) {
    files.icon.forEach((file) => {
      if (file.filename) {
        cleanupPromises.push(
          cloudinary.uploader.destroy(file.filename).catch((error) => {
            console.error("Error cleaning up failed icon upload:", error);
          })
        );
      }
    });
  }

  if (files.screenshots) {
    files.screenshots.forEach((file) => {
      if (file.filename) {
        cleanupPromises.push(
          cloudinary.uploader.destroy(file.filename).catch((error) => {
            console.error("Error cleaning up failed screenshot upload:", error);
          })
        );
      }
    });
  }

  if (cleanupPromises.length > 0) {
    await Promise.allSettled(cleanupPromises);
  }
};

/** * Process file uploads */
const processFileUploads = async (files, screenshotResult) => {
  const result = {
    success: true,
    errors: [],
    icon: null,
    screenshots: null,
  };

  try {
    // Process icon upload
    if (files && files.icon && files.icon.length > 0) {
      const iconFile = files.icon[0];

      // Validate icon file
      if (!isValidImageFile(iconFile)) {
        result.errors.push("Invalid icon file type");
        result.success = false;
        return result;
      }

      result.icon = {
        url: iconFile.path,
        publicId: iconFile.filename,
        width: iconFile.width || null,
        height: iconFile.height || null,
        format: iconFile.format || iconFile.mimetype,
      };
    }

    // Process screenshots upload
    if (files && files.screenshots && files.screenshots.length > 0) {
      const newScreenshots = [];

      for (const file of files.screenshots) {
        if (!isValidImageFile(file)) {
          result.errors.push(`Invalid screenshot file: ${file.originalname}`);
          result.success = false;
          return result;
        }

        newScreenshots.push({
          url: file.path,
          publicId: file.filename,
          width: file.width || null,
          height: file.height || null,
          format: file.format || file.mimetype,
        });
      }

      // Combine kept existing screenshots with new uploaded ones
      result.screenshots = [...screenshotResult.toKeep, ...newScreenshots];
    } else {
      // No new screenshots uploaded, just use the kept existing ones
      result.screenshots = screenshotResult.toKeep;
    }

    return result;
  } catch (error) {
    console.error("File processing error:", error);
    return {
      success: false,
      errors: ["File processing failed"],
      icon: null,
      screenshots: null,
    };
  }
};

/** * Process screenshots data from form */
const processScreenshotsData = (screenshotsData, existingScreenshots = []) => {
  // If no screenshots data provided, keep all existing screenshots
  if (!screenshotsData) {
    return {
      isValid: true,
      toKeep: existingScreenshots,
      toDelete: [],
    };
  }

  const parsed = safeJsonParse(screenshotsData, []);
  if (!Array.isArray(parsed)) {
    return {
      isValid: false,
      errors: ["Screenshots data must be a valid JSON array"],
    };
  }

  // Create a map of existing screenshots by publicId for easy lookup
  const existingScreenshotsMap = new Map(
    existingScreenshots.map((screenshot) => [screenshot.publicId, screenshot])
  );

  // Find screenshots marked for deletion
  const toDelete = parsed.filter((screenshot) => {
    return screenshot && screenshot.deleted === true && screenshot.publicId;
  });

  // Create a set of publicIds that should be deleted
  const deleteIds = new Set(toDelete.map((s) => s.publicId));

  // Keep all existing screenshots that are NOT marked for deletion
  const toKeep = existingScreenshots.filter((screenshot) => {
    return !deleteIds.has(screenshot.publicId);
  });

  // Also include any new screenshots from parsed data that aren't marked for deletion
  // and aren't already in existing screenshots
  const newScreenshots = parsed.filter((screenshot) => {
    return (
      screenshot &&
      !screenshot.deleted &&
      screenshot.url &&
      screenshot.publicId &&
      !existingScreenshotsMap.has(screenshot.publicId)
    );
  });

  return {
    isValid: true,
    toKeep: [...toKeep, ...newScreenshots],
    toDelete,
  };
};

/** * Clean up old files from Cloudinary */
const cleanupOldFiles = async (oldIcon, screenshotsToDelete) => {
  const cleanupPromises = [];

  // Clean up old icon
  if (oldIcon && oldIcon.publicId) {
    cleanupPromises.push(
      cloudinary.uploader.destroy(oldIcon.publicId).catch((error) => {
        console.error("Error deleting old icon:", error);
      })
    );
  }

  // Clean up old screenshots
  if (screenshotsToDelete && screenshotsToDelete.length > 0) {
    screenshotsToDelete.forEach((screenshot) => {
      if (screenshot.publicId) {
        cleanupPromises.push(
          cloudinary.uploader.destroy(screenshot.publicId).catch((error) => {
            console.error("Error deleting old screenshot:", error);
          })
        );
      }
    });
  }

  // Execute all cleanup operations
  if (cleanupPromises.length > 0) {
    await Promise.allSettled(cleanupPromises);
  }
};

// Validation helpers
const validateTechnologies = (technologies) => {
  if (!Array.isArray(technologies)) {
    return { isValid: false, error: "Technologies must be an array" };
  }

  if (technologies.length === 0) {
    return { isValid: false, error: "At least one technology is required" };
  }

  const invalidTechs = technologies.filter(
    (tech) => typeof tech !== "string" || tech.trim().length === 0
  );

  if (invalidTechs.length > 0) {
    return {
      isValid: false,
      error: "All technologies must be non-empty strings",
    };
  }

  return { isValid: true };
};

const validateFeatured = (featured) => {
  if (featured !== undefined && typeof featured !== "boolean") {
    return { isValid: false, error: "Featured must be a boolean value" };
  }
  return { isValid: true };
};

const sanitizeInput = (input) => {
  if (typeof input === "string") {
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  }
  return input;
};

const createProject = asyncHandler(async (req, res) => {
  let { title, description, technologies, demoLink, featured } = req.body;

  // Sanitize inputs
  const sanitizedTitle = sanitizeInput(title);
  const sanitizedDescription = sanitizeInput(description);

  // Validate required fields
  if (!sanitizedTitle || !technologies) {
    return res.status(400).json({
      success: false,
      message: "Title and technologies are required fields",
    });
  }

  // Validate technologies format
  if (!Array.isArray(technologies) || technologies.length < 0) {
    technologies = technologies.split(",").map((tech) => tech.trim());
  }

  if (technologies) {
    if (typeof technologies === "string") {
      try {
        // Try to parse as JSON first (from FormData with JSON.stringify)
        technologies = JSON.parse(technologies);
      } catch (e) {
        // If not JSON, treat as comma-separated string
        technologies = technologies.split(",").map((tech) => tech.trim());
      }
    }

    // Ensure it's an array
    if (!Array.isArray(technologies)) {
      technologies = [technologies];
    }
  }

  // Validate featured field
  if (featured !== undefined && typeof featured !== "boolean") {
    if (featured.toLowerCase() === "true") {
      featured = true;
    } else if (featured.toLowerCase() === "false") {
      featured = false;
    }
  }

  // Check for duplicate project title
  const existingProject = await Project.findOne({
    title: { $regex: new RegExp(`^${sanitizedTitle}$`, "i") },
  });

  if (existingProject) {
    return res.status(409).json({
      success: false,
      message: "A project with this title already exists",
    });
  }

  // Handle icon upload to Cloudinary
  let icon = null;
  if (req.files && req.files.icon && req.files.icon.length > 0) {
    const iconFile = req.files.icon[0];

    if (!isValidImageFile(iconFile)) {
      return res.status(400).json({
        success: false,
        message: "Invalid icon file type or size",
      });
    }

    icon = {
      url: iconFile.path,
      publicId: iconFile.filename,
      width: iconFile.width || null,
      height: iconFile.height || null,
      format: iconFile.format || iconFile.mimetype,
    };
  }

  // Handle screenshots upload to Cloudinary
  let screenshots = [];
  if (req.files && req.files.screenshots && req.files.screenshots.length > 0) {
    for (const file of req.files.screenshots) {
      if (!isValidImageFile(file)) {
        // Clean up any already uploaded files
        if (icon?.publicId) {
          await cloudinary.uploader.destroy(icon.publicId);
        }
        if (screenshots.length > 0) {
          await Promise.allSettled(
            screenshots.map((screenshot) =>
              cloudinary.uploader.destroy(screenshot.publicId)
            )
          );
        }

        return res.status(400).json({
          success: false,
          message: `Invalid screenshot file: ${file.originalname}`,
        });
      }

      screenshots.push({
        url: file.path,
        publicId: file.filename,
        width: file.width || null,
        height: file.height || null,
        format: file.format || file.mimetype,
      });
    }
  }

  try {
    const project = await Project.create({
      title: sanitizedTitle,
      description: sanitizedDescription,
      technologies,
      demoLink: sanitizeInput(demoLink),
      icon,
      screenshots,
      featured: featured || false,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully!",
      project,
    });
  } catch (err) {
    // If database save fails, clean up uploaded files
    if (icon?.publicId) {
      try {
        await cloudinary.uploader.destroy(icon.publicId);
      } catch (cleanupError) {
        console.error("Error cleaning up icon:", cleanupError);
      }
    }
    if (screenshots.length > 0) {
      const cleanupPromises = screenshots.map((screenshot) =>
        cloudinary.uploader
          .destroy(screenshot.publicId)
          .catch((err) => console.error("Error cleaning up screenshot:", err))
      );
      await Promise.allSettled(cleanupPromises);
    }

    res.status(500).json({
      success: false,
      message: "Failed to create project.",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

const getAllProjects = asyncHandler(async (req, res) => {
  const { perPage = 100, page = 1, featured, showProject } = req.query;

  try {
    let dbQuery = {};

    // Featured filter
    if (featured !== undefined) {
      dbQuery.featured = featured === "true";
    }

    // Show project filter
    if (showProject !== undefined) {
      dbQuery.showProject = showProject === "true";
    }

    console.log("DB Query:", dbQuery);

    // FETCH PROJECTS FROM DATABASE with pagination
    const projects = await Project.find(dbQuery)
      .limit(parseInt(perPage))
      .skip((parseInt(page) - 1) * parseInt(perPage))
      .sort({ updatedAt: -1 })
      .lean();

    // Get total count for pagination
    const total = await Project.countDocuments(dbQuery);

    return res.status(200).json({
      success: true,
      data: projects,
      pagination: {
        page: parseInt(page),
        perPage: parseInt(perPage),
        total,
        totalPages: Math.ceil(total / parseInt(perPage)),
      },
    });
  } catch (error) {
    console.error("Error in getAllProjects:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching projects",
    });
  }
});

const getGithubProjectsAndUpdate = asyncHandler(async (req, res) => {
  const { perPage = 100, page = 1 } = req.query;

  try {
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
      return res.status(response.status).json({
        success: false,
        message: "Failed to fetch GitHub repositories",
      });
    }

    const gitProjects = await response.json();

    // FETCH EXISTING PROJECTS FROM DATABASE
    const dbProjects = await Project.find({ gitId: { $exists: true } }).lean();

    // Create a set of existing GitHub IDs in DB
    const existingGitIds = new Set(
      dbProjects.map((project) => project.gitId.toString())
    );

    // Find GitHub projects that don't exist in DB
    const projectsToCreate = gitProjects.filter(
      (gitProject) => !existingGitIds.has(gitProject.id.toString())
    );

    let createdCount = 0;

    // Create missing projects in DB
    if (projectsToCreate.length > 0) {
      try {
        const newProjects = await Project.insertMany(
          projectsToCreate.map((project) => ({
            title: project.name,
            gitId: project.id,
            description: project.description,
            technologies: [project.language || "Not Specified"],
            githubLink: project.html_url,
            gitProject: true,
            featured: false,
            showProject: false,
          }))
        );
        createdCount = newProjects.length;
      } catch (err) {
        console.error("Error creating GitHub projects in DB:", err);
        return res.status(500).json({
          success: false,
          message: "Error syncing GitHub projects to database",
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "GitHub projects synced successfully",
      data: {
        totalFetched: gitProjects.length,
        newProjectsCreated: createdCount,
        existingProjects: gitProjects.length - createdCount,
      },
    });
  } catch (error) {
    console.error("Error in syncGithubProjects:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while syncing GitHub projects",
    });
  }
});

// const getGithubProjectsAndUpdate = asyncHandler(async (req, res) => {
//   const { perPage = 100, page = 1 } = req.query; // Higher default for syncing

//   try {
//     // FETCH PROJECTS FROM GITHUB
//     const response = await fetch(
//       `https://api.github.com/user/repos?visibility=all&per_page=${perPage}&page=${page}&sort=updated`,
//       {
//         headers: {
//           Authorization: `token ${process.env.GITHUB_TOKEN}`,
//           Accept: "application/vnd.github.v3+json",
//         },
//       }
//     );

//     if (!response.ok) {
//       return res.status(response.status).json({
//         success: false,
//         message: "Failed to fetch GitHub repositories",
//       });
//     }

//     const gitProjects = await response.json();

//     // FETCH EXISTING PROJECTS FROM DATABASE
//     const dbProjects = await Project.find({ gitId: { $in: gitProjects.map(p => p.id) } }).lean();

//     // IDENTIFY PROJECTS TO CREATE OR UPDATE
//     const gitProjectIds = new Set(gitProjects.map(project => project.id.toString()));
//     const existingProjectsMap = new Map(
//       dbProjects.map(project => [project.gitId.toString(), project])
//     );

//     const projectsToCreate = [];
//     const projectsToUpdate = [];

//     gitProjects.forEach(gitProject => {
//       const gitIdStr = gitProject.id.toString();
//       const existingProject = existingProjectsMap.get(gitIdStr);

//       if (!existingProject) {
//         // Create new project
//         projectsToCreate.push({
//           title: gitProject.name,
//           gitId: gitProject.id,
//           description: gitProject.description,
//           technologies: gitProject.language ? [gitProject.language] : ["Not Specified"],
//           githubLink: gitProject.html_url,
//           gitProject: true,
//           updatedAt: gitProject.updated_at ? new Date(gitProject.updated_at) : new Date(),
//         });
//       } else {
//         // Update existing project if GitHub data is newer
//         const gitUpdated = gitProject.updated_at ? new Date(gitProject.updated_at) : new Date();
//         const dbUpdated = existingProject.updatedAt;

//         if (gitUpdated > dbUpdated) {
//           projectsToUpdate.push({
//             updateOne: {
//               filter: { gitId: gitProject.id },
//               update: {
//                 $set: {
//                   title: gitProject.name,
//                   description: gitProject.description,
//                   technologies: gitProject.language ? [gitProject.language] : ["Not Specified"],
//                   githubLink: gitProject.html_url,
//                   updatedAt: gitUpdated,
//                 }
//               }
//             }
//           });
//         }
//       }
//     });

//     // EXECUTE DATABASE OPERATIONS
//     const results = {
//       created: 0,
//       updated: 0,
//       total: gitProjects.length
//     };

//     if (projectsToCreate.length > 0) {
//       const createResult = await Project.insertMany(projectsToCreate);
//       results.created = createResult.length;
//     }

//     if (projectsToUpdate.length > 0) {
//       const updateResult = await Project.bulkWrite(projectsToUpdate);
//       results.updated = updateResult.modifiedCount;
//     }

//     return res.status(200).json({
//       success: true,
//       message: "GitHub projects synced successfully",
//       data: results,
//     });

//   } catch (error) {
//     console.error("Error in getGithubProjectsAndUpdate:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error while syncing GitHub projects",
//     });
//   }
// });

// const getAllProjects = asyncHandler(async (req, res) => {
//   const { perPage = 20, page = 1, featured } = req.query;

//   try {
//     // FETCH PROJECTS FROM GITHUB
//     const response = await fetch(
//       `https://api.github.com/user/repos?visibility=all&per_page=${perPage}&page=${page}`,
//       {
//         headers: {
//           Authorization: `token ${process.env.GITHUB_TOKEN}`,
//           Accept: "application/vnd.github.v3+json",
//         },
//       }
//     );

//     if (!response.ok) {
//       return res.status(response.status).json({
//         success: false,
//         message: "Failed to fetch GitHub repositories",
//       });
//     }

//     const gitProjects = await response.json();

//     let dbQuery = {};

//     // Featured filter
//     if (featured !== undefined) {
//       dbQuery.featured = featured === "true";
//     }

//     // FETCH PROJECTS FROM DATABASE
//     const dbProjects = await Project.find(dbQuery).lean();

//     // IMPROVED SYNC LOGIC: Identify GitHub repos not in DB
//     const gitProjectIds = new Set(
//       gitProjects.map((project) => project.id.toString())
//     );
//     const existingGitProjects = dbProjects.filter(
//       (project) => project.gitId && gitProjectIds.has(project.gitId.toString())
//     );

//     // Find GitHub projects that don't exist in DB
//     const projectsToCreate = gitProjects.filter(
//       (gitProject) =>
//         !dbProjects.some(
//           (dbProject) =>
//             dbProject.gitId &&
//             dbProject.gitId.toString() === gitProject.id.toString()
//         )
//     );

//     // Create missing projects in DB
//     if (projectsToCreate.length > 0) {
//       try {
//         const newProjects = await Project.insertMany(
//           projectsToCreate.map((project) => ({
//             title: project.name,
//             gitId: project.id,
//             description: project.description,
//             technologies: [project.language || "Not Specified"],
//             githubLink: project.html_url,
//             gitProject: true,
//           }))
//         );

//         // Add new projects to existing DB projects for the response
//         dbProjects.push(...newProjects.map((p) => p.toObject()));
//       } catch (err) {
//         console.error("Error creating GitHub projects in DB:", err);
//         // Continue with existing projects even if sync fails
//       }
//     }

//     // Merge strategy: GitHub projects first, then non-GitHub projects from DB
//     const mergedProjects = [];

//     // Add GitHub projects (merged with DB data)
//     gitProjects.forEach((gitProject) => {
//       const dbMatch = dbProjects.find(
//         (dbProject) =>
//           dbProject.gitId &&
//           dbProject.gitId.toString() === gitProject.id.toString()
//       );

//       if (dbMatch) {
//         // Merge GitHub data with DB data (DB data takes precedence)
//         mergedProjects.push({
//           ...gitProject,
//           ...dbMatch,
//           // Ensure DB fields override GitHub fields
//           title: dbMatch.title || gitProject.name,
//           description: dbMatch.description || gitProject.description,
//         });
//       } else {
//         // This shouldn't happen due to sync above, but as fallback
//         mergedProjects.push({
//           ...gitProject,
//           gitProject: true,
//         });
//       }
//     });

//     // Add non-GitHub projects from DB (projects without gitId)
//     const nonGitProjects = dbProjects.filter((project) => !project.gitId);
//     mergedProjects.push(...nonGitProjects);

//     return res.status(200).json({
//       success: true,
//       data: mergedProjects,
//       pagination: {
//         page: parseInt(page),
//         perPage: parseInt(perPage),
//         total: mergedProjects.length,
//       },
//     });
//   } catch (error) {
//     console.error("Error in getAllProjects:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error while fetching projects",
//     });
//   }
// });

const getProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Project ID is required" });
  }

  const project = await Project.findById(id).lean().exec();

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.status(200).json(project);
});

const updateProject = asyncHandler(async (req, res) => {
  let { id, title, description, technologies, githubLink, demoLink, featured, showProject } =
    req.body;

  if (typeof featured === "string") {
    if (featured.toLowerCase() === "true") {
      featured = true;
    } else if (featured.toLowerCase() === "false") {
      featured = false;
    }
  }

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Project ID is required",
    });
  }

  try {
    // 1. Confirm project exists FIRST
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project Not Found",
      });
    }

    // Sanitize inputs
    const sanitizedTitle = title ? sanitizeInput(title) : project.title;
    const sanitizedDescription = description
      ? sanitizeInput(description)
      : project.description;

    // Validate technologies if provided
    if (technologies) {
      if (typeof technologies === "string") {
        try {
          // Try to parse as JSON first (from FormData with JSON.stringify)
          technologies = JSON.parse(technologies);
        } catch (e) {
          // If not JSON, treat as comma-separated string
          technologies = technologies.split(",").map((tech) => tech.trim());
        }
      }

      // Ensure it's an array
      if (!Array.isArray(technologies)) {
        technologies = [technologies];
      }
    }

    // Validate featured if provided
    if (featured !== undefined) {
      const featuredValidation = validateFeatured(featured);
      if (!featuredValidation.isValid) {
        return res.status(400).json({
          success: false,
          message: featuredValidation.error,
        });
      }
    }

    // Check for duplicate title (excluding current project)
    if (title && title !== project.title) {
      const existingProject = await Project.findOne({
        title: { $regex: new RegExp(`^${sanitizedTitle}$`, "i") },
        _id: { $ne: id },
      });

      if (existingProject) {
        return res.status(409).json({
          success: false,
          message: "A project with this title already exists",
        });
      }
    }

    // 2. Process screenshots data
    const screenshotResult = processScreenshotsData(
      req.body.screenshots,
      project.screenshots
    );

    if (!screenshotResult.isValid) {
      return res.status(400).json({
        success: false,
        message: "Screenshot processing failed",
        errors: screenshotResult.errors,
      });
    }

    // 3. Process file uploads
    const fileProcessingResult = await processFileUploads(
      req.files,
      screenshotResult
    );

    if (!fileProcessingResult.success) {
      return res.status(400).json({
        success: false,
        message: "File processing failed",
        errors: fileProcessingResult.errors,
      });
    }

    // Store old files for cleanup
    const oldIcon = project.icon;
    const screenshotsToDelete = screenshotResult.toDelete;

    // 4. Update project data
    const updateData = {};
    if (title) updateData.title = sanitizedTitle;
    if (description !== undefined)
      updateData.description = sanitizedDescription;
    if (technologies) updateData.technologies = technologies;
    if (githubLink !== undefined)
      updateData.githubLink = sanitizeInput(githubLink);
    if (demoLink !== undefined) updateData.demoLink = sanitizeInput(demoLink);
    if (featured !== undefined) updateData.featured = featured;
    if (showProject !== undefined) updateData.showProject = showProject;
    if (fileProcessingResult.icon) updateData.icon = fileProcessingResult.icon;
    if (fileProcessingResult.screenshots)
      updateData.screenshots = fileProcessingResult.screenshots;

    // Check if any changes were made
    const hasChanges = Object.keys(updateData).length > 0;
    if (!hasChanges) {
      return res.status(400).json({
        success: false,
        message: "No changes detected",
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    // 5. Clean up old files after successful update
    await cleanupOldFiles(
      fileProcessingResult.icon ? oldIcon : null,
      screenshotsToDelete
    );

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (err) {
    // Clean up any newly uploaded files if update failed
    if (req.files) {
      await cleanupFailedUploads(req.files);
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Project ID is required",
    });
  }

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project Not Found",
      });
    }

    // Store file info for cleanup
    const filesToDelete = [];
    if (project.icon?.publicId) {
      filesToDelete.push(project.icon.publicId);
    }

    if (project.screenshots?.length > 0) {
      project.screenshots.forEach((screenshot) => {
        if (screenshot.publicId) {
          filesToDelete.push(screenshot.publicId);
        }
      });
    }

    // Delete project from database
    await Project.findByIdAndDelete(id);

    // Clean up files from Cloudinary
    if (filesToDelete.length > 0) {
      await Promise.allSettled(
        filesToDelete.map((publicId) =>
          cloudinary.uploader.destroy(publicId).catch((error) => {
            console.error(`Error deleting file ${publicId}:`, error);
          })
        )
      );
    }

    return res.status(200).json({
      success: true,
      message: `Project "${project.title}" has been deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
});

const deleteAllProjects = asyncHandler(async (req, res) => {
  try {
    // Find all projects to get their screenshots
    const projects = await Project.find();

    // Collect all publicIds for deletion
    const filesToDelete = [];

    projects.forEach((project) => {
      if (project.screenshots?.length > 0) {
        project.screenshots.forEach((screenshot) => {
          if (screenshot.publicId) {
            filesToDelete.push(screenshot.publicId);
          }
        });
      }
    });

    // Delete all projects from database
    await Project.deleteMany({});

    // Clean up files from Cloudinary
    if (filesToDelete.length > 0) {
      await Promise.allSettled(
        filesToDelete.map((publicId) =>
          cloudinary.uploader.destroy(publicId).catch((error) => {
            console.error(`Error deleting file ${publicId}:`, error);
          })
        )
      );
    }

    return res.status(200).json({
      success: true,
      message: `All projects (${projects.length}) have been deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting all projects:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete all projects",
    });
  }
});

module.exports = {
  createProject,
  getAllProjects,
  getGithubProjectsAndUpdate,
  getProject,
  updateProject,
  deleteProject,
  deleteAllProjects,
};
