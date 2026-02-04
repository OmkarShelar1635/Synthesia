import Playlist from "../models/Playlist.js"

export const createPlaylist = async (req,res)=>{

 const playlist = await Playlist.create({
  name:req.body.name,
  userId:req.userId,
  tracks:[]
 })

 res.json(playlist)
}

export const addSong = async (req,res)=>{

 const { playlistId, song } = req.body

 const playlist = await Playlist.findById(playlistId)

 playlist.tracks.push(song)
 await playlist.save()

 res.json("Song added")
}

export const getPlaylists = async (req,res)=>{

 const playlists = await Playlist.find({ userId:req.userId })
 res.json(playlists)
}
