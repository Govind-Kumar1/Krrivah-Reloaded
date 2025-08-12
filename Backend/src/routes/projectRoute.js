const express = require("express");
const router = express.Router();
const { upload } = require("../utils/cloudinary");
const catchMulterError = require("../middlewares/catchMulterError");
const { verifyToken, restrictTo } = require("../middlewares/authMiddleware");
const { createProject, updateProject, getAllProjects, getProjectById, deleteProject } = require("../controllers/projectController");

const multiUpload = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "brochure", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

router.post(
  "/",
  verifyToken,
  restrictTo("Admin", "Super_Admin"),
  catchMulterError(multiUpload),
  createProject
);

router.put(
  "/:id",
  verifyToken,
  restrictTo("Admin", "Super_Admin"),
  catchMulterError(multiUpload),
  updateProject
);

router.delete(
  "/:id",
  verifyToken,
  restrictTo("Admin", "Super_Admin"),
  deleteProject
);

router.get("/", getAllProjects);
router.get("/:id", getProjectById);

module.exports = router;
