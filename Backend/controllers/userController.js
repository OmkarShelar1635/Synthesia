import User from "../models/User.js"
import bcrypt from "bcryptjs"

export const updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body

    const user = await User.findById(req.userId)

    if (!user) return res.status(404).json({ message: "User not found" })

    if (name) user.name = name
    if (avatar) user.avatar = avatar

    await user.save()

    res.json({
      message: "Profile updated",
      user
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Profile update failed" })
  }
}

export const changePassword = async (req, res) => {
  try {
    const { currentPass, newPass } = req.body

    const user = await User.findById(req.userId)

    if (!user) return res.status(404).json({ message: "User not found" })

    const match = await bcrypt.compare(currentPass, user.password)

    if (!match) return res.status(400).json({ message: "Wrong current password" })

    user.password = await bcrypt.hash(newPass, 10)

    await user.save()

    res.json({ message: "Password updated" })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Password change failed" })
  }
}
