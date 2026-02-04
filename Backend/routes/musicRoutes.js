import express from "express"
import axios from "axios"

const router = express.Router()

// PLAYLIST (tag based)
router.get("/playlist/:tag", async (req, res) => {
  const { tag } = req.params

  const { data } = await axios.get(
    `https://api.jamendo.com/v3.0/tracks`,
    {
      params: {
        client_id: process.env.JAMENDO_CLIENT_ID,
        tags: tag,
        limit: 20
      }
    }
  )

  res.json(data.results)
})

// SEARCH (name based)
router.get("/search/:query", async (req, res) => {
  const { query } = req.params

  const { data } = await axios.get(
    `https://api.jamendo.com/v3.0/tracks`,
    {
      params: {
        client_id: process.env.JAMENDO_CLIENT_ID,
        namesearch: query,   // 👈 THIS IS THE KEY
        limit: 30
      }
    }
  )

  res.json(data.results)
})

export default router
