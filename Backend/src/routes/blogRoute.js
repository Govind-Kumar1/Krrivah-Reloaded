const express=require("express");
const { restrictTo, verifyToken } = require("../middlewares/authMiddleware");
const { createBlog, getAllBlogs, updateBlog, deleteBlog } = require("../controllers/blogController");
const { upload } = require("../utils/cloudinary");
const catchMulterError = require("../middlewares/catchMulterError");
const router=express.Router();

const multiUpload=upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'mainImage', maxCount: 1 },
  { name: 'middleImage', maxCount: 1 },
])

router.post(
  "/",
  verifyToken,
  restrictTo("Admin", "Super_Admin"),
  catchMulterError(multiUpload),
  createBlog
);

router.get('/',getAllBlogs);

router.put("/:id",verifyToken,restrictTo("Admin", "Super_Admin"),catchMulterError(multiUpload),updateBlog);

router.delete("/:id",verifyToken,restrictTo("Admin", "Super_Admin"),deleteBlog);

module.exports=router; 