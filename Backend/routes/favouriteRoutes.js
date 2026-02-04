import express from "express"
import { addFavourite, getFavourite, removeFavourite } from "../controllers/favouriteController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/add", authMiddleware, addFavourite)
router.get("/", authMiddleware, getFavourite)
router.delete("/:id", authMiddleware, removeFavourite)

export default router
