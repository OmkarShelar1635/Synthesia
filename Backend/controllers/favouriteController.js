import Favourite from "../models/Favourite.js"

export const addFavourite = async (req, res) => {
  try {
    const exists = await Favourite.findOne({
      user: req.userId,
      songId: req.body.id
    })

    if (exists) return res.json({ message: "Already exists" })

    const fav = await Favourite.create({
      user: req.userId,
      songId: req.body.id,
      song: req.body
    })

    res.json(fav)

  } catch (err) {
    console.log(err)
    res.status(500).json("Error adding favourite")
  }
}

export const getFavourite = async (req, res) => {
  try {
    const favs = await Favourite.find({ user: req.userId })
    res.json(favs.map(f => f.song))
  } catch (err) {
    console.log(err)
    res.status(500).json("Error fetching favourites")
  }
}

export const removeFavourite = async (req, res) => {
  try {
    await Favourite.deleteOne({
      user: req.userId,
      songId: req.params.id
    })

    res.json({ message: "Removed" })

  } catch (err) {
    console.log(err)
    res.status(500).json("Error removing favourite")
  }
}
