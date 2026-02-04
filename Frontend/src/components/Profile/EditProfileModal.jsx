import { useState, useContext, useRef } from "react"
import { X, Eye, EyeOff, Plus } from "lucide-react"
import { AuthContext } from "../../context/AuthContext"
import axios from "../../api/axios"
import toast from "react-hot-toast"

export default function EditProfileModal({ show, onClose }) {
    const { user, setUser } = useContext(AuthContext)

    const fileRef = useRef()

    const [changingPassword, setChangingPassword] = useState(false)

    const [name, setName] = useState(user?.name || "")
    const [email] = useState(user?.email || "")

    const [currentPass, setCurrentPass] = useState("")
    const [newPass, setNewPass] = useState("")

    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)

    const [avatar, setAvatar] = useState(
        user?.avatar || "https://ui-avatars.com/api/?name=" + user?.name
    )

    if (!show) return null

    /* Avatar Preview */
    const handleAvatar = e => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = () => setAvatar(reader.result)
        reader.readAsDataURL(file)
    }
    const saveProfile = async () => {
        try {
            // update name + avatar
            const res = await axios.put("/user/profile", {
                name,
                avatar
            })

            setUser(res.data.user)
            localStorage.setItem("user", JSON.stringify(res.data.user))

            // toast.success("Profile updated")


            // change password if needed
            if (changingPassword) {
                await axios.put("/user/password", {
                    oldPassword: currentPass,
                    newPassword: newPass
                })
            }
            setUser(data.user)
            localStorage.setItem("user", JSON.stringify(data.user))
            toast.success("Profile updated")
            onClose()

        } catch (err) {
            toast.error(err.response?.data?.message || "Update failed")
        }
    }
    const saveChanges = async () => {
        try {
            if (changingPassword) {

                await axios.put("/user/password", {
                    currentPass,
                    newPass
                })

                toast.success("Password updated")

                setCurrentPass("")
                setNewPass("")
                setChangingPassword(false)

            } else {

                const res = await axios.put("/user/profile", {
                    name,
                    avatar
                })

                setUser(res.data.user)
                localStorage.setItem("user", JSON.stringify(res.data.user))

                toast.success("Profile updated")
            }

        } catch (err) {
            toast.error(err.response?.data?.message || "Update failed")
        }
    }



    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50">

            <div className="w-[380px] bg-[#0b0f1a] rounded-xl p-6 relative shadow-2xl">

                <X
                    onClick={onClose}
                    size={18}
                    className="absolute right-4 top-4 cursor-pointer text-pink-500"
                />

                <h2 className="text-lg font-semibold mb-1">Edit Profile</h2>
                <p className="text-xs text-slate-400 mb-6">Update your account details</p>

                {/* AVATAR */}
                {/* AVATAR – hide during password change */}
                {!changingPassword && (
                    <div className="flex justify-center mb-5 relative">

                        <img
                            src={avatar}
                            className="w-20 h-20 rounded-full object-cover border border-purple-500"
                        />

                        <div
                            onClick={() => fileRef.current.click()}
                            className="absolute bottom-0 right-[120px] bg-purple-600 p-1 rounded-full cursor-pointer"
                        >
                            <Plus size={14} />
                        </div>

                        <input
                            type="file"
                            hidden
                            ref={fileRef}
                            accept="image/*"
                            onChange={handleAvatar}
                        />

                    </div>
                )}


                {!changingPassword ? (
                    <>
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full bg-slate-800 rounded px-3 py-2 mb-3 outline-none"
                            placeholder="Name"
                        />

                        <input
                            value={email}
                            disabled
                            className="w-full bg-slate-800 rounded px-3 py-2 mb-2 outline-none opacity-60"
                        />

                        <span
                            onClick={() => setChangingPassword(true)}
                            className="text-xs text-purple-400 cursor-pointer"
                        >
                            Change Password
                        </span>
                    </>
                ) : (
                    <>
                        <div className="relative mb-3">
                            <input
                                type={showCurrent ? "text" : "password"}
                                value={currentPass}
                                onChange={e => setCurrentPass(e.target.value)}
                                placeholder="Enter current password"
                                className="w-full bg-slate-800 rounded px-3 py-2 outline-none"
                            />

                            <div
                                onClick={() => setShowCurrent(!showCurrent)}
                                className="absolute right-3 top-2.5 cursor-pointer text-slate-400"
                            >
                                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                            </div>
                        </div>

                        <div className="relative mb-2">
                            <input
                                type={showNew ? "text" : "password"}
                                value={newPass}
                                onChange={e => setNewPass(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full bg-slate-800 rounded px-3 py-2 outline-none"
                            />

                            <div
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-3 top-2.5 cursor-pointer text-slate-400"
                            >
                                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                            </div>
                        </div>

                        <span
                            onClick={() => {
                                setChangingPassword(false)
                                setCurrentPass("")
                                setNewPass("")
                            }}

                            className="text-xs text-purple-400 cursor-pointer"
                        >
                            Cancel Password Change
                        </span>
                    </>
                )}

                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={onClose}
                        className="px-4 py-1 rounded bg-slate-700"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={saveChanges}
                        className="px-4 py-1 rounded bg-gradient-to-r from-purple-500 to-pink-500"
                    >
                        SAVE CHANGES
                    </button>


                </div>

            </div>
        </div>
    )
}
