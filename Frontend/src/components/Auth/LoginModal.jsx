import { useContext, useState } from "react"
import axios from "../../api/axios"
import { AuthContext } from "../../context/AuthContext"
import { X, Eye, EyeOff } from "lucide-react"
import toast from "react-hot-toast"

export default function LoginModal() {

    const {
        showLogin,
        setShowLogin,
        isSignup,
        setIsSignup,
        setUser,
        redirectPage,
        setRedirectPage, pageAfterLogin, setPageAfterLogin
    } = useContext(AuthContext)


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPass, setShowPass] = useState(false)



    if (!showLogin) return null

    const submit = async () => {
        try {
            const url = isSignup ? "/auth/signup" : "/auth/login"

            const { data } = await axios.post(url, {
                name,
                email,
                password
            })
            if (!isSignup) {
                localStorage.setItem("token", data.token)
                setUser(data.user)
                localStorage.setItem("user", JSON.stringify(data.user))
                

                toast.success("Welcome back!")

                setShowLogin(false)
            }

            else {
                toast.success("Signup successful! Please login.")
                setIsSignup(false)
            }

        } catch (err) {
            toast.error(err.response?.data?.message || "Authentication failed")
        }
    }




    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="w-[380px] bg-[#0b0f1a] rounded-xl p-6 relative shadow-2xl">

                {/* Close */}
                <X
                    className="absolute right-4 top-4 cursor-pointer text-slate-400 hover:text-white"
                    size={18}
                    onClick={() => setShowLogin(false)}
                />

                <h2 className="text-xl font-semibold mb-1">
                    {isSignup ? "Create Account" : "Welcome Back"}
                </h2>

                <p className="text-sm text-slate-400 mb-5">
                    Please enter your details to {isSignup ? "signup" : "login"}
                </p>

                {/* Name */}
                {isSignup && (
                    <input
                        className="w-full bg-slate-800 rounded px-3 py-2 mb-3 outline-none"
                        placeholder="Name"
                        name="name"
                        autoComplete="name"
                        onChange={e => setName(e.target.value)}
                    />
                )}

                {/* Email */}
                <input
                    className="w-full bg-slate-800 rounded px-3 py-2 mb-3 outline-none"
                    placeholder="Email Address"
                    type="email"
                    name="email"
                    autoComplete="email"
                    onChange={e => setEmail(e.target.value)}
                />


                {/* Password */}
                <div className="relative mb-2">

                    <input
                        type={showPass ? "text" : "password"}
                        name="password"
                        autoComplete={isSignup ? "new-password" : "current-password"}
                        className="w-full bg-slate-800 rounded px-3 py-2 outline-none"
                        placeholder="Min 8 character"
                        onChange={e => setPassword(e.target.value)}
                    />


                    <div
                        className="absolute right-3 top-2.5 cursor-pointer text-slate-400"
                        onClick={() => setShowPass(!showPass)}
                    >
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </div>

                </div>

                {/* Links */}
                <div className="flex justify-between text-xs text-purple-400 mb-5">

                    <span className="cursor-pointer">
                        Forgot Password?
                    </span>

                    <span
                        className="cursor-pointer"
                        onClick={() => setIsSignup(!isSignup)}
                    >
                        {isSignup ? "Already have account? Login" : "Don't have an account? Sign up"}
                    </span>

                </div>

                {/* Button */}
                <button
                    onClick={submit}
                    className="w-full py-2 rounded bg-gradient-to-r from-purple-500 to-pink-500 font-medium"
                >
                    {isSignup ? "SIGN UP" : "LOGIN"}
                </button>

            </div>

        </div>
    )
}
