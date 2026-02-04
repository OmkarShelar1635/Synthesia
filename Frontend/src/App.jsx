import { useState, useContext, useEffect } from "react"
import { Home, Search, Heart, User, Settings } from "lucide-react"
import LoginModal from "./components/Auth/LoginModal"
import HomePage from "./pages/Home"
import SearchPage from "./pages/Search"
import Favourite from "./pages/Favourite"
import AudioPlayer from "./components/Player/AudioPlayer"
import { AuthContext } from "./context/AuthContext"
import { Toaster } from "react-hot-toast"
import EditProfileModal from "./components/Profile/EditProfileModal"

export default function App() {
    const [showProfile, setShowProfile] = useState(false)
    const [page, setPage] = useState("home")
    const {
        setShowLogin,
        setIsSignup,
        user,
        setUser,
        pageAfterLogin,
        setPageAfterLogin
    } = useContext(AuthContext)

    useEffect(() => {
        const handler = e => setPage(e.detail)
        window.addEventListener("navigate", handler)
        return () => window.removeEventListener("navigate", handler)
    }, [])

    useEffect(() => {
        if (page === "search") {
            window.dispatchEvent(new Event("clearSongs"))
        }
    }, [page])



    return (
        <>
            <Toaster position="top-right" />

            <div className="flex h-screen bg-slate-950 text-white relative overflow-hidden">

                {/* SIDEBAR */}
                <div className="w-64 bg-slate-900 p-4 flex flex-col justify-between">

                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <img onClick={() => setPage("home")}
                                src="/image.png"
                                alt="logo"
                                className="w-11 h-11 object-contain cursor-pointer"
                            />

                            <h1 className="text-xl font-bold text-purple-500">
                                Synthesia
                            </h1>
                        </div>


                        <button onClick={() => setPage("home")} className={`flex items-center gap-3 w-full px-3 py-2 rounded ${page === "home" ? "bg-purple-600" : "hover:bg-slate-800"}`}>
                            <Home size={18} /> Home
                        </button>

                        <button onClick={() => {

                            if (!user) {
                                setPageAfterLogin("search")
                                setIsSignup(false)
                                setShowLogin(true)
                            }
                            else {
                                setPage("search")
                            }
                        }}
                            className={`flex items-center gap-3 w-full px-3 py-2 rounded  ${page === "search" ? "bg-purple-600" : "hover:bg-slate-800"}`}>
                            <Search size={18} /> Search
                        </button>

                        <button
                            onClick={() => {
                                if (!user) {
                                    setPageAfterLogin("fav")
                                    setIsSignup(false)
                                    setShowLogin(true)
                                } else {
                                    setPage("fav")
                                }
                            }}
                            className={`flex items-center gap-3 w-full px-3 py-2 rounded ${page === "fav" ? "bg-purple-600" : "hover:bg-slate-800"}`}
                        >
                            <Heart size={18} /> Favourite
                        </button>


                    </div>

                </div>

                {/* MAIN */}
                <div className="flex-1 overflow-y-auto relative">

                    {/* TOP RIGHT AUTH */}
                    <div className="absolute right-10 top-4 flex gap-3">

                        {!user ? (
                            <>
                                <button
                                    onClick={() => { setIsSignup(true); setShowLogin(true) }}
                                    className="px-4 py-1 border rounded"
                                >
                                    Signup
                                </button>

                                <button
                                    onClick={() => { setIsSignup(false); setShowLogin(true) }}
                                    className="px-4 py-1 bg-purple-600 rounded"
                                >
                                    Login
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => {
                                    localStorage.clear()
                                    setUser(null)
                                    window.location.reload()
                                }}
                                className="px-4 py-1 bg-pink-500 rounded"
                            >
                                Logout
                            </button>
                        )}

                    </div>

                    <LoginModal />

                    {page === "home" && <HomePage />}
                    {page === "search" && user && <SearchPage />}

                    {page === "fav" && <Favourite />}

                </div>

                {/* GUEST BOX */}
                <div className="fixed bottom-28 left-4 bg-slate-800/80 backdrop-blur rounded-xl px-3 py-2 w-56 flex items-center justify-between">

                    <div className="flex gap-2 items-center">
                        <div className="bg-purple-600/20 p-2 rounded-lg">
                            {/* <User size={16} className="text-purple-400" /> */}
                            <img
                                src={user?.avatar || "/profile_icon.png"}
                                className="w-6 h-6 rounded-full"
                            />

                        </div>

                        <span className="text-sm">{user?.name || "Guest"}</span>
                    </div>

                    <Settings
                        size={16}
                        onClick={() => {
                            if (!user) {
                                setIsSignup(false)
                                setShowLogin(true)
                                return
                            }
                            setShowProfile(true)
                        }}
                        className="text-slate-400 hover:text-white cursor-pointer"
                    />



                </div>

                <AudioPlayer />
                {user && (
                    <EditProfileModal
                        show={showProfile}
                        onClose={() => setShowProfile(false)}
                    />
                )}



            </div>
        </>
    )
}
