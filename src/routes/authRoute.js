import express from "express";
import AuthController from './../controllers/authController.js'

const router = express.Router()

router.post('/auth/admin',AuthController.loginAdmin)
router.post('/auth/user',AuthController.loginUser)

export default router