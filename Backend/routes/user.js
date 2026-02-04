router.put("/profile", authMiddleware, async (req, res) => {
  const { name, avatar } = req.body

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, avatar },
    { new: true }
  )

  res.json(user)
})
router.put("/password", authMiddleware, async (req, res) => {
  const { oldPassword, newPassword } = req.body

  const user = await User.findById(req.user.id)

  const match = await bcrypt.compare(oldPassword, user.password)

  if (!match)
    return res.status(400).json({ message: "Old password incorrect" })

  user.password = await bcrypt.hash(newPassword, 10)
  await user.save()

  res.json({ success: true })
})
