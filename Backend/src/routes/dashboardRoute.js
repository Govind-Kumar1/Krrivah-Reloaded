const express=require('express');
const { getDashboardData } = require('../controllers/dashboardController');
const { verifyToken, restrictTo } = require('../middlewares/authMiddleware');

const router=express.Router();
 
router.get('/',verifyToken,restrictTo("Admin", "Super_Admin"),getDashboardData);

module.exports=router;