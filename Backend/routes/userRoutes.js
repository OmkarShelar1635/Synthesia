import express from "express"
import { updateProfile, changePassword } from "../controllers/userController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.put("/profile", authMiddleware, updateProfile)
router.put("/password", authMiddleware, changePassword)

export default router
