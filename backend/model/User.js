const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: String,
    phone: String,
    technologies: {
      type: [String],
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    roles: {
      User: { type: Number, default: 1440 },
      Admin: Number,
      Editor: Number,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
