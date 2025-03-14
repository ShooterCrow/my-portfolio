const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    keyFeatures: {
      type: [String],
      default: [],
    },
    pricing: {
      type: String,
      default: "",
    },
    relatedServices: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Service",
      default: [],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);