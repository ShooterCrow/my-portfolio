const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
    {
      title: {
        type: String,
      },
    gitId: {
      type: String,
      required: true
    },
    description: String,
    technologies: {
      type: [String],
      required: true,
    },
    githubLink: {
      type: String,
    },
    demoLink: String,
    image: {
      type: String,
      required: true,
      default: "https://placehold.co/600x400/1e293b/fff?text=Project+Image",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
