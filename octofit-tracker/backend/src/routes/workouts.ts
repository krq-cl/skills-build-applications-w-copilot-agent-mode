import { Router } from 'express'
import { Workout } from '../models/Workout.js'

export const workoutsRouter = Router()

workoutsRouter.get('/', async (_request, response) => {
  try {
    const workouts = await Workout.find().sort({ title: 1 }).lean()

    response.json({ workouts })
  } catch (error) {
    response.status(500).json({ error: 'Failed to load workouts' })
  }
})