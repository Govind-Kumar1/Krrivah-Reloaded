const express = require("express");
const { upload } = require("../utils/cloudinary");
const catchMulterError = require("../middlewares/catchMulterError");
const { verifyToken, restrictTo } = require("../middlewares/authMiddleware");
const {
  createHeroBrand,
  updateHeroBrand,
  getAllHeroBrands,
  deleteHeroBrand,
} = require("../controllers/HeroBrandController");

const router = express.Router();
router.get('/', getAllHeroBrands);
router.post('/', verifyToken,restrictTo("Admin", "Super_Admin"), upload.single('image'), createHeroBrand); // validation
 router.put('/update/:id', verifyToken,restrictTo("Admin", "Super_Admin"),upload.single('image'), updateHeroBrand); 
 router.delete('/:id', verifyToken,restrictTo("Admin", "Super_Admin"), deleteHeroBrand);  // validation

module.exports=router
 