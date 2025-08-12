const express = require("express");
const router = express.Router();
const { createImage, getImageById, getImagesByPageName, updateImage, getAllImages, deleteImage } = require("../controllers/imageController");
const { upload } = require("../utils/cloudinary");
const catchMulterError = require("../middlewares/catchMulterError");
const { verifyToken, restrictTo } = require("../middlewares/authMiddleware");


router.post(
  "/",
  verifyToken,
  restrictTo("Admin", "Super_Admin"),
  catchMulterError(upload.single("image")),
  createImage
);

router.put(
  "/:id",
  verifyToken,
  restrictTo("Admin", "Super_Admin"),
  catchMulterError(upload.single("image")),
  updateImage
);

router.delete(
  "/:id",
  verifyToken,
  restrictTo("Admin", "Super_Admin"),
  deleteImage
);

router.get("/getByPage/:pageName", getImagesByPageName);
router.get("/:id", getImageById);
router.get("/", getAllImages);



module.exports = router;
