const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    gitId: {
      type: String,
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
    featured: {
      type: Boolean,
      default: false,
    },
    gitProject: {
      type: Boolean,
      default: false,
    },
    icon: {
      url: String,
      publicId: String,
      width: Number,
      height: Number,
      format: String,
    },
    screenshots: [
      {
        url: String,
        publicId: String,
        width: Number,
        height: Number,
        format: String,
        deleted: Boolean,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
