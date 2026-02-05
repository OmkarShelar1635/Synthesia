
import { createContext, useState, useEffect } from "react"
import { getFavourite } from "../api/favourite"

export const PlayerContext = createContext()

export const PlayerProvider = ({ children }) => {

  const [currentSong, setCurrentSong] = useState(null)
  const [songs, setSongs] = useState([])
  const [favourites, setFavourites] = useState([])

  // clear songs event
  useEffect(() => {
    const clear = () => setSongs([])
    window.addEventListener("clearSongs", clear)
    return () => window.removeEventListener("clearSongs", clear)
  }, [])

  //  LOAD FAVOURITES ON REFRESH / LOGIN
  useEffect(() => {
  const token = localStorage.getItem("token")

  if (!token) {
    setFavourites([])
    return
  }

  const loadFav = async () => {
    try {
      const res = await getFavourite()
      setFavourites(res.data)
    } catch {
      setFavourites([])
    }
  }

  loadFav()
}, [localStorage.getItem("token")])

  

  return (
    <PlayerContext.Provider value={{
      currentSong,
      setCurrentSong,
      songs,
      setSongs,
      favourites,
      setFavourites
    }}>
      {children}
    </PlayerContext.Provider>
  )
}
