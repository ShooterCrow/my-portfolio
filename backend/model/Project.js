const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    technologies: {
      type: [String],
      required: true,
    },
    githubLink: {
      type: String,
      required: true,
    },
    demoLink: String,
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
