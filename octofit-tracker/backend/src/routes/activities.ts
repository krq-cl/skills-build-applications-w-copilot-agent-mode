import { Router } from 'express'
import { Activity } from '../models/Activity.js'

export const activitiesRouter = Router()

activitiesRouter.get('/', async (_request, response) => {
  try {
    const activities = await Activity.find().sort({ performedAt: -1 }).lean()

    response.json({ activities })
  } catch (error) {
    response.status(500).json({ error: 'Failed to load activities' })
  }
})