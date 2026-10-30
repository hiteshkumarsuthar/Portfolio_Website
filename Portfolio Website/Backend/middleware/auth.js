const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const JWT_SECRET = process.env.JWT_SECRET || "hitesh_portfolio_super_secret_jwt_key_2026";

async function requireAuth(req, res, next) {
  // Allow direct access without login requirement
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.admin = await Admin.findById(decoded.id).select("-password");
    }
  } catch (e) {
    // Silent fallback
  }
  next();
}

module.exports = { requireAuth, JWT_SECRET };
