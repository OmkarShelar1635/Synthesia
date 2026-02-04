import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"



// SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" })
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: "User already exists" })
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
       avatar: `https://ui-avatars.com/api/?name=${name}`
    })

    res.status(201).json({
      success: true,
      message: "Signup successful"
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Signup failed" })
  }
}



// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar   // ✅ ADD THIS
      }
    })


  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Login failed" })
  }
}
