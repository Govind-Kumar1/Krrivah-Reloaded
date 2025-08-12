const express = require("express");
const router = express.Router();
const {
  createContact,
  getAllContacts,
} = require("../controllers/contactController");
const {
  verifyToken,
  restrictTo,
} = require("../middlewares/authMiddleware");

// Public Contact Form
router.post("/", createContact);

// Admin-only: View all contacts
router.get("/", verifyToken, restrictTo("Admin", "Super_Admin"), getAllContacts);

module.exports = router;
