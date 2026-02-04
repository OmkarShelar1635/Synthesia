import { useContext } from "react"
import { PlayerContext } from "../../context/PlayerContext"

export default function SongRow({ song }) {

  const { currentSong, setCurrentSong } = useContext(PlayerContext)

  const active = currentSong?.id === song.id

  return (
    <div
      onClick={() => setCurrentSong(song)}
      className={`grid grid-cols-[60px_3fr_2fr_1fr_100px] px-4 py-2 cursor-pointer text-sm
transition-all duration-200 ease-in-out
${active
          ? "bg-purple-600"
          : "hover:bg-slate-900 hover:opacity-90"
        }`}

    >

      {/* No */}
      <span>{song.position}</span>

      {/* Name */}
      <span className="truncate">{song.name}</span>

      {/* Artist */}
      <span className="text-slate-400 truncate">{song.artist_name}</span>

      {/* Year */}
      <span className="text-slate-400">
        {song.releasedate || "—"}
      </span>

      {/* Duration */}
      <span className="text-right text-slate-400">
        {song.duration
          ? `${Math.floor(song.duration / 60)}:${("0" + Math.floor(song.duration % 60)).slice(-2)}`
          : "--"}
      </span>

    </div>
  )
}
