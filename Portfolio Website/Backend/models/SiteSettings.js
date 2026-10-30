const mongoose = require("mongoose");

const SiteSettingsSchema = new mongoose.Schema(
  {
    siteTitle: {
      type: String,
      default: "Hitesh Kumar | AI & Data Science Developer Portfolio",
    },
    metaDescription: {
      type: String,
      default:
        "Portfolio of Hitesh Kumar, an AI & Data Science Developer and B.Tech student specializing in machine learning, full-stack development, and intelligent web applications.",
    },
    metaKeywords: {
      type: String,
      default:
        "Hitesh Kumar, AI Developer, Data Science, Machine Learning, Full Stack Developer, React, Python, Portfolio",
    },
    themePreference: {
      type: String,
      enum: ["dark", "light", "system"],
      default: "dark",
    },
    analyticsEnabled: {
      type: Boolean,
      default: true,
    },
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SiteSettings", SiteSettingsSchema);
