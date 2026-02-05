
import axios from "./axios"

export const getFavourite = () => axios.get("/favourite")

export const addFavourite = song =>
  axios.post("/favourite/add", song)

export const removeFavourite = id =>
  axios.delete(`/favourite/${id}`)
