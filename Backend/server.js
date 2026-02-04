import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import favouriteRoutes from "./routes/favouriteRoutes.js"
import playlistRoutes from "./routes/playlistRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import musicRoutes from "./routes/musicRoutes.js"

dotenv.config()
connectDB()

const app = express()

app.use(cors())
// app.use(express.json())
app.use(express.json({ limit: "5mb" }))
app.use(express.urlencoded({ extended: true, limit: "5mb" }))

app.use("/api/music", musicRoutes)

app.use("/api/auth", authRoutes)
app.use("/api/favourite", favouriteRoutes)
app.use("/playlist", playlistRoutes)
app.use("/api/user", userRoutes)


app.listen(5000, () => console.log("Backend running on 5000"))
