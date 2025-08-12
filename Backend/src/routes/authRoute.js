
const express=require('express');
const {register,login, logout} =require('../controllers/authController');
const { verifyToken, restrictTo } = require('../middlewares/authMiddleware');
 
const router=express.Router();

router.post('/register',register);
router.post('/login',login); 
router.post('/logout',verifyToken,restrictTo("Admin", "Super_Admin"),logout);

module.exports=router;