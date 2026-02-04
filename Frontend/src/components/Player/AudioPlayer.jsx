import { useContext, useRef, useState, useEffect } from "react"
import { PlayerContext } from "../../context/PlayerContext"
import {
    SkipBack,
    SkipForward,
    Play,
    Pause,
    Shuffle,
    Repeat,
    Volume2,
    VolumeX,
    Heart
} from "lucide-react"
import { AuthContext } from "../../context/AuthContext"
import { addFavourite, removeFavourite } from "../../api/favourite"


export default function AudioPlayer() {

    const { currentSong, songs, setCurrentSong, favourites, setFavourites } = useContext(PlayerContext)
    const audioRef = useRef()

    const [playing, setPlaying] = useState(false)
    const [volume, setVolume] = useState(1)
    const [loop, setLoop] = useState(false)
    const [speed, setSpeed] = useState(1)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [shuffle, setShuffle] = useState(false)
    const [muted, setMuted] = useState(false)
    const { user } = useContext(AuthContext)


    const isFav = favourites.some(f => f.id === currentSong?.id)

    useEffect(() => {
        if (currentSong) {
            audioRef.current.load()
            audioRef.current.play()
            setPlaying(true)
        }

    }, [currentSong])

    const next = () => {
        if (!currentSong) return

        if (shuffle) {
            const random = Math.floor(Math.random() * songs.length)
            setCurrentSong(songs[random])
            return
        }

        const i = songs.findIndex(s => s.id === currentSong.id)
        setCurrentSong(songs[(i + 1) % songs.length])
    }



    const prev = () => {
        if (!currentSong) return
        const i = songs.findIndex(s => s.id === currentSong.id)
        setCurrentSong(songs[i === 0 ? songs.length - 1 : i - 1])
    }

    return (
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-slate-900 border-t border-slate-800 px-6 text-white flex items-center">

            <div className="relative w-full h-full">

                {/* LEFT : Album box */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3 min-w-[260px]">

                    {/* placeholder if no image */}
                    <div className="w-14 h-14 bg-slate-800 rounded overflow-hidden">
                        <img
                            src={currentSong?.image || "/Nosong.webp"}
                            className="w-full h-full object-cover"
                        />
                    </div>


                    <div>
                        <p className="text-sm font-semibold truncate">
                            {currentSong ? currentSong.name : "Song not selected"}
                        </p>

                        <p className="text-xs text-slate-400 truncate">
                            {currentSong ? currentSong.artist_name : "Not selected"}
                        </p>
                    </div>

                </div>

                {/* AUDIO */}
                {currentSong && (
                    <audio
                        ref={audioRef}
                        loop={loop}
                        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
                        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
                    >
                        <source src={currentSong.audio} />
                    </audio>
                )}

                {/* CENTER CONTROLS */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">

                    <div className="flex gap-4 items-center">

                        <SkipBack size={18} onClick={prev} className="cursor-pointer" />

                        <button
                            onClick={() => {
                                if (playing) {
                                    audioRef.current.pause()
                                } else {
                                    audioRef.current.play()
                                }
                                setPlaying(!playing)
                            }}
                            className="bg-purple-600 rounded-full p-2"
                        >
                            {playing ? <Pause size={18} /> : <Play size={18} />}
                        </button>

                        <SkipForward size={18} onClick={next} className="cursor-pointer" />

                        {/* ❤️ Favourite — only when logged in + song selected */}
                        {user && currentSong && (
                            <Heart
                                size={18}
                                onClick={async () => {
                                    if (!isFav) {
                                        await addFavourite(currentSong)
                                        setFavourites([...favourites, currentSong])
                                    } else {
                                        await removeFavourite(currentSong.id)
                                        setFavourites(favourites.filter(f => f.id !== currentSong.id))
                                    }
                                }}
                                className={`cursor-pointer transition ${isFav
                                        ? "text-pink-500 fill-pink-500"
                                        : "text-slate-400 hover:text-pink-400"
                                    }`}
                            />
                        )}



                    </div>


                    {/* Progress */}
                    <div className="flex items-center gap-2 text-xs">

                        <span>
                            {Math.floor(currentTime / 60)}:{("0" + Math.floor(currentTime % 60)).slice(-2)}
                        </span>

                        <input
                            type="range"
                            min="0"
                            max={duration}
                            value={currentTime}
                            onChange={e => {
                                audioRef.current.currentTime = e.target.value
                                setCurrentTime(e.target.value)
                            }}
                            className="w-80 cursor-pointer"
                        />

                        <span>
                            {Math.floor(duration / 60)}:{("0" + Math.floor(duration % 60)).slice(-2)}
                        </span>

                    </div>

                </div>

                {/* RIGHT */}
                {/* RIGHT */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">


                    {/* SHUFFLE */}
                    <Shuffle
                        size={16}
                        onClick={() => {
                            setShuffle(!shuffle)
                            setLoop(false)     // disable loop
                        }}
                        className={`cursor-pointer ${shuffle ? "text-purple-400" : ""}`}
                    />

                    {/* LOOP */}
                    <Repeat
                        size={16}
                        onClick={() => {
                            setLoop(!loop)
                            setShuffle(false) // disable shuffle
                        }}
                        className={`cursor-pointer ${loop ? "text-purple-400" : ""}`}
                    />

                    {/* VOLUME */}
                    {muted ? (
                        <VolumeX
                            size={16}
                            onClick={() => {
                                setMuted(false)
                                audioRef.current.muted = false
                            }}
                            className="cursor-pointer"
                        />
                    ) : (
                        <Volume2
                            size={16}
                            onClick={() => {
                                setMuted(true)
                                audioRef.current.muted = true
                            }}
                            className="cursor-pointer"
                        />
                    )}


                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={muted ? 0 : volume}
                        onChange={e => {
                            setMuted(false)
                            setVolume(e.target.value)
                            audioRef.current.volume = e.target.value
                        }}
                        className="w-24 cursor-pointer"
                    />

                    {/* SPEED */}
                    <select
                        value={speed}
                        onChange={e => {
                            setSpeed(e.target.value)
                            audioRef.current.playbackRate = e.target.value
                        }}
                        className="bg-slate-800 text-xs rounded px-2 py-1 cursor-pointer"
                    >
                        <option value="0.5">0.5x</option>
                        <option value="1">1x</option>
                        <option value="1.25">1.25x</option>
                        <option value="1.5">1.5x</option>
                    </select>

                </div>




            </div>

        </div>
    )
}
