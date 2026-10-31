const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { requireAuth, JWT_SECRET } = require("../middleware/auth");

const Admin = require("../models/Admin");
const Profile = require("../models/Profile");
const Skill = require("../models/Skill");
const Journey = require("../models/Journey");
const Project = require("../models/Project");
const ContactInfo = require("../models/ContactInfo");
const SiteSettings = require("../models/SiteSettings");
const Message = require("../models/Message");

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Storage Configuration
// Files are kept in memory and returned as base64 data URLs so they are persisted
// in MongoDB (server disks on local/Render are wiped on shutdown/restart).
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit (keeps documents under MongoDB's 16MB cap)
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|svg|pdf/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only images (jpeg, jpg, png, webp, svg) and PDF documents are allowed"));
    }
  },
});

// ==========================================
// 1. PUBLIC ENDPOINTS
// ==========================================

// Get All Published Portfolio Data for the Public Website
router.get("/portfolio", async (req, res) => {
  try {
    const [profile, skills, journey, projects, contact, settings] =
      await Promise.all([
        Profile.findOne(),
        Skill.find({ isActive: true }).sort({ order: 1, createdAt: 1 }),
        Journey.find({ isActive: true }).sort({ order: 1, createdAt: 1 }),
        Project.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }),
        ContactInfo.findOne(),
        SiteSettings.findOne(),
      ]);

    return res.status(200).json({
      success: true,
      data: {
        profile: profile || {},
        skills: skills || [],
        journey: journey || [],
        projects: projects || [],
        contact: contact || {},
        settings: settings || {},
      },
    });
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Submit Contact Message from Public Site
router.post("/contact", async (req, res) => {
  try {
    const { name, contact, message } = req.body;

    if (!name || !contact || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, contact (email/phone), and message are required.",
      });
    }

    const clientIp =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";

    const newMessage = await Message.create({
      name: name.trim(),
      contact: contact.trim(),
      message: message.trim(),
      ip: clientIp,
    });

    console.log(`[Message Saved] From ${newMessage.name} (${newMessage.contact})`);

    return res.status(200).json({
      success: true,
      message: "Thank you! Your message has been received successfully.",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 2. ADMIN AUTHENTICATION
// ==========================================

// Admin Login
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Please enter your administrator email and password.",
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password.",
      });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password.",
      });
    }

    // Sign JWT
    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      message: "Authentication successful.",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        avatar: admin.avatar,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Get Current Admin Profile
router.get("/auth/me", requireAuth, async (req, res) => {
  return res.status(200).json({
    success: true,
    admin: req.admin,
  });
});

// Update Admin Password or Profile
router.put("/auth/profile", requireAuth, async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword, avatar } = req.body;
    const admin = await Admin.findById(req.admin._id);

    if (name) admin.name = name;
    if (email) admin.email = email.toLowerCase().trim();
    if (avatar) admin.avatar = avatar;

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          error: "Current password is required to set a new password.",
        });
      }
      const isMatch = await admin.matchPassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          error: "Current password does not match.",
        });
      }
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(newPassword, salt);
    }

    await admin.save();
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        avatar: admin.avatar,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 3. DASHBOARD OVERVIEW & METRICS
// ==========================================

router.get("/dashboard/stats", requireAuth, async (req, res) => {
  try {
    const [
      totalProjects,
      publishedProjects,
      totalSkills,
      totalJourney,
      totalMessages,
      unreadMessages,
      recentMessages,
      recentProjects,
      recentSkills,
      skillCategories,
      projectCategories,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ isPublished: true }),
      Skill.countDocuments(),
      Journey.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ isRead: false }),
      Message.find().sort({ createdAt: -1 }).limit(10),
      Project.find().sort({ updatedAt: -1 }).limit(6),
      Skill.find().sort({ updatedAt: -1 }).limit(6),
      Skill.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Project.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ]);

    // Build real dynamic activities from MongoDB collections
    const messageActs = (recentMessages || []).map((m) => ({
      id: `msg-${m._id}`,
      type: "message",
      title: `Inquiry from ${m.name}`,
      detail: `${m.contact} · "${m.message.length > 50 ? m.message.slice(0, 50) + "..." : m.message}"`,
      timestamp: m.createdAt,
    }));

    const projectActs = (recentProjects || []).map((p) => ({
      id: `proj-${p._id}`,
      type: "project",
      title: `Project: ${p.title}`,
      detail: `${p.category || "Full Stack"} · ${p.isPublished ? "Live" : "Draft"} · ${p.techStack?.slice(0, 3).join(", ") || "Tech"}`,
      timestamp: p.updatedAt || p.createdAt,
    }));

    const skillActs = (recentSkills || []).map((s) => ({
      id: `skill-${s._id}`,
      type: "skill",
      title: `Skill: ${s.name}`,
      detail: `${s.category} · ${s.proficiency || 85}% proficiency`,
      timestamp: s.updatedAt || s.createdAt,
    }));

    const dynamicActivities = [...messageActs, ...projectActs, ...skillActs]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 8);

    return res.status(200).json({
      success: true,
      data: {
        metrics: {
          totalProjects,
          publishedProjects,
          totalSkills,
          totalJourney,
          totalMessages,
          unreadMessages,
        },
        skillCategories: (skillCategories || []).map((c) => ({
          label: c._id || "Other",
          count: c.count,
        })),
        projectCategories: (projectCategories || []).map((c) => ({
          label: c._id || "Other",
          count: c.count,
        })),
        recentActivities: dynamicActivities,
        recentMessages,
        recentProjects,
        activityTimeline: [
          { month: "Nov", visitors: 4200, inquiries: 24 },
          { month: "Dec", visitors: 5800, inquiries: 38 },
          { month: "Jan", visitors: 7100, inquiries: 45 },
          { month: "Feb", visitors: 6400, inquiries: 34 },
          { month: "Mar", visitors: 8900, inquiries: 62 },
          { month: "Apr", visitors: 9600, inquiries: 71 },
          { month: "May", visitors: 12443, inquiries: 89 },
        ],
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 4. ABOUT ME / PROFILE CRUD
// ==========================================

router.get("/profile", async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }
    return res.status(200).json({ success: true, data: profile });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.put("/profile", requireAuth, async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }
    await profile.save();
    return res.status(200).json({
      success: true,
      message: "About Me profile updated successfully.",
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 5. TECHNICAL EXPERTISE CRUD
// ==========================================

router.get("/skills", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1, createdAt: 1 });
    return res.status(200).json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/skills", requireAuth, async (req, res) => {
  try {
    const count = await Skill.countDocuments();
    const newSkill = await Skill.create({
      ...req.body,
      order: req.body.order !== undefined ? req.body.order : count + 1,
    });
    return res.status(201).json({
      success: true,
      message: "Skill added successfully.",
      data: newSkill,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.put("/skills/:id", requireAuth, async (req, res) => {
  try {
    const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ success: false, error: "Skill not found." });
    }
    return res.status(200).json({
      success: true,
      message: "Skill updated successfully.",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.delete("/skills/:id", requireAuth, async (req, res) => {
  try {
    const deleted = await Skill.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Skill not found." });
    }
    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully.",
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 6. MY JOURNEY CRUD
// ==========================================

router.get("/journey", async (req, res) => {
  try {
    const journey = await Journey.find().sort({ order: 1, createdAt: 1 });
    return res.status(200).json({ success: true, count: journey.length, data: journey });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/journey", requireAuth, async (req, res) => {
  try {
    const count = await Journey.countDocuments();
    const newEntry = await Journey.create({
      ...req.body,
      order: req.body.order !== undefined ? req.body.order : count + 1,
    });
    return res.status(201).json({
      success: true,
      message: "Journey entry added successfully.",
      data: newEntry,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.put("/journey/:id", requireAuth, async (req, res) => {
  try {
    const updated = await Journey.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ success: false, error: "Entry not found." });
    }
    return res.status(200).json({
      success: true,
      message: "Journey entry updated successfully.",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.delete("/journey/:id", requireAuth, async (req, res) => {
  try {
    const deleted = await Journey.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Entry not found." });
    }
    return res.status(200).json({
      success: true,
      message: "Journey entry deleted successfully.",
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 7. PERSONAL PROJECTS CRUD
// ==========================================

router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: 1 });
    return res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/projects", requireAuth, async (req, res) => {
  try {
    const count = await Project.countDocuments();
    const newProject = await Project.create({
      ...req.body,
      order: req.body.order !== undefined ? req.body.order : count + 1,
    });
    return res.status(201).json({
      success: true,
      message: "Project added successfully.",
      data: newProject,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.put("/projects/:id", requireAuth, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ success: false, error: "Project not found." });
    }
    return res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.delete("/projects/:id", requireAuth, async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Project not found." });
    }
    return res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 8. CONTACT INFO & MESSAGES
// ==========================================

router.get("/contact-info", async (req, res) => {
  try {
    let contact = await ContactInfo.findOne();
    if (!contact) {
      contact = await ContactInfo.create({});
    }
    return res.status(200).json({ success: true, data: contact });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.put("/contact-info", requireAuth, async (req, res) => {
  try {
    let contact = await ContactInfo.findOne();
    if (!contact) {
      contact = new ContactInfo(req.body);
    } else {
      Object.assign(contact, req.body);
    }
    await contact.save();
    return res.status(200).json({
      success: true,
      message: "Contact information updated successfully.",
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Admin Inquiries / Messages Center
router.get("/messages", requireAuth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.put("/messages/:id/read", requireAuth, async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    return res.status(200).json({ success: true, data: message });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.delete("/messages/:id", requireAuth, async (req, res) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Message deleted successfully.",
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 9. SITE SETTINGS
// ==========================================

router.get("/settings", async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    return res.status(200).json({ success: true, data: settings });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.put("/settings", requireAuth, async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    return res.status(200).json({
      success: true,
      message: "Site settings updated successfully.",
      data: settings,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 10. FILE UPLOAD (Images & PDFs)
// ==========================================

router.post("/upload", requireAuth, upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file was uploaded." });
    }

    const fileUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully.",
      url: fileUrl,
      fileName: req.file.originalname,
      size: req.file.size,
      mimeType: req.file.mimetype,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
