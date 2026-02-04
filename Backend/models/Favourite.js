import mongoose from "mongoose"

const favouriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  songId: {
    type: String,
    required: true
  },

  song: {
    type: Object,
    required: true
  }

}, { timestamps: true })

export default mongoose.model("Favourite", favouriteSchema)
