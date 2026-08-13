import { Router } from 'express'
import { Team } from '../models/Team.js'

export const teamsRouter = Router()

teamsRouter.get('/', async (_request, response) => {
  try {
    const teams = await Team.find().sort({ name: 1 }).lean()

    response.json({ teams })
  } catch (error) {
    response.status(500).json({ error: 'Failed to load teams' })
  }
})