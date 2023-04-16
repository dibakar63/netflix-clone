import express from 'express';
import registerController from '../controllers/authController.js'
import { isAdmin, requireSign } from '../middlewares/authMiddleware.js';
import { loginController,testController,logoutController } from '../controllers/authController.js';
//router object
const router=express.Router()

//routing
//Register || Method Post
router.post('/register',registerController)
//login||post
router.post('/login',loginController)
router.post('/logout',logoutController)

router.get('/test',requireSign,isAdmin, testController)

export default router