import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { PlayerContext } from "../context/PlayerContext"
import { searchSongs } from "../api/jamendo"
import SongRow from "../components/Playlist/SongRow"
import { Search as SearchIcon, Music, XCircle } from "lucide-react"

export default function Search() {

    const { user, setShowLogin } = useContext(AuthContext)
    const { setSongs, songs } = useContext(PlayerContext)

    const [query, setQuery] = useState("")

    useEffect(() => {
        if (!user) {
            setShowLogin(true)
            return
        }

        if (!query) {
            setSongs([])
            return
        }

        const controller = new AbortController()

        const fetch = async () => {
            try {
                const res = await searchSongs(query)
                setSongs(res.data)
            } catch { }
        }

        fetch()

        return () => controller.abort()
    }, [query])





    return (
        <div className="p-6 pb-32 h-full bg-slate-950">

            {/* SEARCH BAR */}
            <div className="relative mb-8">

                <SearchIcon
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400"
                    size={18}
                />

                <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search songs..."
                    className="w-[978px] pl-10 pr-10 py-2 rounded-full bg-slate-900 border border-purple-500/40 outline-none focus:border-purple-500"
                />

                {query && (
                    <XCircle
                        size={18}
                        className="absolute right-72 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-purple-400"
                        onClick={() => {
                            setQuery("")
                            setSongs([])
                        }}
                    />
                )}

            </div>


            {/* EMPTY STATE */}
            {songs.length === 0 && (
                <div className="h-[55vh] flex items-center justify-center">
                    <div className="w-[520px] bg-slate-900/60 backdrop-blur rounded-xl p-10 text-center border border-slate-800">

                        <Music size={32} className="mx-auto text-purple-400 mb-3" />

                        <h3 className="text-sm mb-1">No songs found</h3>

                        <p className="text-xs text-slate-400">
                            Try searching with a different keyword
                        </p>

                    </div>
                </div>
            )}

            {/* RESULTS TABLE */}
            {songs.length > 0 && (

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
                    <div className="flex-1 overflow-y-auto divide-y divide-slate-700/30 scrollbar-thin scrollbar-thumb-purple-500/30">
                        {songs.map((song, i) => (
                            <SongRow key={song.id} song={{ ...song, position: i + 1 }} />
                        ))}
                    </div>

                </div>
            )}

        </div>
    )
}
