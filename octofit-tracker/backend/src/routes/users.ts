import { Router } from 'express'
import { User } from '../models/User.js'

export const usersRouter = Router()

usersRouter.get('/', async (_request, response) => {
  try {
    const users = await User.find().sort({ name: 1 }).lean()

    response.json({ users })
  } catch (error) {
    response.status(500).json({ error: 'Failed to load users' })
  }
})