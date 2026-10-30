const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      default: "",
    },
    problemStatement: {
      type: String,
      default: "",
    },
    proposedSolution: {
      type: String,
      default: "",
    },
    keyFeatures: {
      type: [String],
      default: [],
    },
    techStack: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: "/images/leetcode_sync.jpg",
    },
    containerBg: {
      type: String,
      default: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
    },
    githubUrl: {
      type: String,
      default: "",
    },
    liveUrl: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "AI & Full Stack",
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", ProjectSchema);
