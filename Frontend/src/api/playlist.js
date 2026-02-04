import axios from "./axios"

export const createPlaylist = (name)=>
 axios.post("/playlist/create",{ name })

export const addSong = (playlistId,song)=>
 axios.put("/playlist/add",{ playlistId,song })

export const getPlaylists = ()=>
 axios.get("/playlist")
