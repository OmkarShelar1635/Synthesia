import { createContext, useState,useEffect } from "react"

export const PlayerContext = createContext()

export const PlayerProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([])

  const [currentSong, setCurrentSong] = useState(null)
  const [songs, setSongs] = useState([])
  useEffect(() => {
  const clear = () => setSongs([])
  window.addEventListener("clearSongs", clear)
  return () => window.removeEventListener("clearSongs", clear)
}, [])

  return (
    <PlayerContext.Provider value={{ currentSong, setCurrentSong, songs, setSongs,favourites,
 setFavourites }}>
      {children}
    </PlayerContext.Provider>
  )
}
