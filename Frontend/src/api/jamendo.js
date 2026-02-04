import axios from "./axios"

export const getPlaylistSongs = tag =>
  axios.get(`/music/playlist/${tag}`)

export const searchSongs = q =>
  axios.get(`/music/search/${q}`)
