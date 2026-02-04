import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { createPlaylist, addSong, getPlaylists } from "../controllers/playlistController.js"

const router = express.Router()

router.post("/create", authMiddleware, createPlaylist)
router.put("/add", authMiddleware, addSong)
router.get("/", authMiddleware, getPlaylists)

export default router
