import { useContext } from "react"
import { PlayerContext } from "../context/PlayerContext"
import SongRow from "../components/Playlist/SongRow"
import { Heart } from "lucide-react"

export default function Favourite() {
  const { favourites } = useContext(PlayerContext)

  return (
    <div className="p-6 pb-32 h-full bg-slate-950">

      {/* EMPTY STATE */}
      {favourites.length === 0 && (
        <div className="h-[55vh] flex items-center justify-center">
          <div className="w-[520px] bg-slate-900/60 backdrop-blur rounded-xl p-10 text-center border border-slate-800">

            <Heart size={32} className="mx-auto text-pink-400 mb-3" />

            <h3 className="text-sm mb-1">No favourite songs yet</h3>

            <p className="text-xs text-slate-400">
              Start exploring and add songs to your favourites!
            </p>

          </div>
        </div>
      )}

      {/* FAVOURITES TABLE */}
      {favourites.length > 0 && (

        <div className="border border-slate-800 rounded-xl overflow-hidden flex flex-col max-h-[72vh]">

          {/* Headers */}
          <div className="grid grid-cols-[60px_3fr_2fr_1fr_100px] px-4 py-3 text-slate-400 text-sm bg-slate-900 border-b border-slate-800">
            <span>No</span>
            <span>Name</span>
            <span>Artist</span>
            <span>Year</span>
            <span className="text-right">Duration</span>
          </div>

          {/* Rows */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-700/30 scrollbar-thin scrollbar-thumb-pink-500/30">

            {favourites.map((song, i) => (
              <SongRow key={song.id} song={{ ...song, position: i + 1 }} />
            ))}

          </div>

        </div>
      )}

    </div>
  )
}
