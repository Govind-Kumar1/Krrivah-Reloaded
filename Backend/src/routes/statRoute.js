const express = require("express");
const router = express.Router();
const { createAchievementStat, getAllAchievementStats, updateAchievementStat, deleteAchievementStat } = require("../controllers/statController");
const { verifyToken, restrictTo } = require("../middlewares/authMiddleware");


router.post("/create", verifyToken, restrictTo("Admin", "Super_Admin"), createAchievementStat);
router.get("/", getAllAchievementStats);
router.put("/update/:id", verifyToken, restrictTo("Admin", "Super_Admin"), updateAchievementStat);
router.delete("/:id", verifyToken, restrictTo("Admin", "Super_Admin"), deleteAchievementStat);

module.exports = router;
