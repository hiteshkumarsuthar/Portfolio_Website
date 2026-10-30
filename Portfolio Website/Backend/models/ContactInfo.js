const mongoose = require("mongoose");

const ContactInfoSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      default: "hiteshkumar.techdev@gmail.com",
    },
    phone: {
      type: String,
      default: "+91 98765 43210",
    },
    whatsapp: {
      type: String,
      default: "+91 98765 43210",
    },
    location: {
      type: String,
      default: "India",
    },
    github: {
      type: String,
      default: "https://github.com/hiteshkumar-dev",
    },
    linkedin: {
      type: String,
      default: "https://linkedin.com/in/hiteshkumar-ai",
    },
    twitter: {
      type: String,
      default: "https://twitter.com/hiteshkumar_ai",
    },
    instagram: {
      type: String,
      default: "",
    },
    heading: {
      type: String,
      default: "Contact Me",
    },
    subtitle: {
      type: String,
      default:
        "Got a project waiting to be realized? Let's collaborate and make it happen!",
    },
    availabilityStatus: {
      type: String,
      default: "Available for interesting projects, internships & collaborative research",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ContactInfo", ContactInfoSchema);
