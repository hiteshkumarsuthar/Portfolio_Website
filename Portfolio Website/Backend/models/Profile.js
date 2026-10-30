const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Hitesh Kumar",
      required: true,
    },
    role: {
      type: String,
      default: "AI & Data Science Developer",
    },
    subtitle: {
      type: String,
      default: "AI & Data Science Developer",
    },
    bio: {
      type: String,
      default:
        "I'm a B.Tech student specializing in Artificial Intelligence and Data Science, passionate about building intelligent applications, exploring emerging technologies, and solving real-world problems through code.",
    },
    detailedBio: {
      type: String,
      default:
        "Passionate engineering student at the intersection of applied machine learning, data engineering, and modern full-stack web applications.",
    },
    profileImage: {
      type: String,
      default: "/images/profile.jpg",
    },
    resumeUrl: {
      type: String,
      default: "",
    },
    availabilityStatus: {
      type: String,
      default: "AVAILABLE FOR OPPORTUNITIES",
    },
    careerObjective: {
      type: String,
      default:
        "To engineer impactful AI-driven solutions and intelligent software systems that solve pressing socio-economic challenges.",
    },
    educationSummary: {
      type: String,
      default:
        "B.Tech in Artificial Intelligence & Data Science (Expected Graduation: 2029)",
    },
    currentWorkingStatus: {
      type: String,
      default: "Student & Independent AI Developer",
    },
    interests: {
      type: [String],
      default: [
        "Machine Learning",
        "LLMs & Agents",
        "Full-Stack Web Dev",
        "Open Source",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", ProfileSchema);
