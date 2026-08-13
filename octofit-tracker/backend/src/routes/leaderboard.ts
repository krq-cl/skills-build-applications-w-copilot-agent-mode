import { Router } from 'express'
import { LeaderboardEntry } from '../models/LeaderboardEntry.js'

export const leaderboardRouter = Router()

leaderboardRouter.get('/', async (_request, response) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).lean()

    response.json({ leaderboard })
  } catch (error) {
    response.status(500).json({ error: 'Failed to load leaderboard' })
  }
})