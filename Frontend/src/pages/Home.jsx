import { useContext, useEffect } from "react"
import { PlayerContext } from "../context/PlayerContext"
import { getPlaylistSongs } from "../api/jamendo"
import SongRow from "../components/Playlist/SongRow"
import { Play } from "lucide-react"

const playlists = [
  {
    name: "Workout",
    tag: "electronic",
    image: "/playlists/workout.jpg"
  },
  {
    name: "Chill",
    tag: "chill",
    image: "/playlists/chill.webp"
  },
  {
    name: "Happy",
    tag: "pop",
    image: "/playlists/happy.webp"
  },
  {
    name: "Relaxing",
    tag: "ambient",
    image: "/playlists/relaxing.jpg"
  },
  {
    name: "Rock",
    tag: "rock",
    image: "/playlists/rock.jpg"
  },
]

export default function Home() {

  const { songs, setSongs } = useContext(PlayerContext)

  const loadPlaylist = async (tag) => {
    const res = await getPlaylistSongs(tag)
    setSongs(res.data)
  }

  useEffect(() => {
    if (songs.length === 0) loadPlaylist("rock")
  }, [])


  return (
    <div className="p-6 pr-10 pb-32 h-full overflow-hidden bg-slate-950">

      <h2 className="text-xl mb-4">Playlists</h2>

      {/* Playlist Cards */}
      <div className="grid grid-cols-5 gap-6 mb-8">
        {playlists.map(p => (
          <div
            key={p.tag}
            onClick={() => loadPlaylist(p.tag)}
            className="group cursor-pointer"
          >

            <div className="relative w-full h-40 rounded-xl overflow-hidden bg-slate-800">

              {/* Image */}
              <img
                src={p.image}
                className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <div className="bg-purple-600 rounded-full p-3 shadow-lg">
                  <Play size={18} fill="white" />
                </div>

              </div>

            </div>

            <p className="mt-2 text-sm text-center group-hover:text-purple-400 transition">
              {p.name}
            </p>

          </div>
        ))}
      </div>


      {/* Songs Table */}
      {/* Songs Table */}
      <div className="border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[52vh]">

        {/* Headers (fixed) */}
        <div className="grid grid-cols-[60px_3fr_2fr_1fr_100px] px-4 py-3 text-slate-400 text-sm bg-slate-900 border-b border-slate-800">
          <span>No</span>
          <span>Name</span>
          <span>Artist</span>
          <span>Year</span>
          <span className="text-right">Duration</span>
        </div>

        {/* Rows (scrollable) */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-700/30 scrollbar-thin scrollbar-thumb-purple-500/30">

          {songs.map((song, i) => (
            <SongRow key={song.id} song={{ ...song, position: i + 1 }} />
          ))}

        </div>

      </div>



    </div>
  )
}
