import mongoose from "mongoose"

const playlistSchema = new mongoose.Schema({
 name: String,
 tracks: [],
 userId: String
})

export default mongoose.model("Playlist", playlistSchema)
