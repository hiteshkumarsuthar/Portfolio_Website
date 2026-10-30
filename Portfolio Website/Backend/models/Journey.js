const mongoose = require("mongoose");

const JourneySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    organization: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "Technical Learning",
    },
    period: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "graduation",
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Journey", JourneySchema);
