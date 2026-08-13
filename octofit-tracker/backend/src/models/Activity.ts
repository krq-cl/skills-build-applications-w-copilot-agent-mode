import { Schema, model } from 'mongoose'

const activitySchema = new Schema(
  {
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceMiles: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    performedAt: { type: Date, required: true },
  },
  { timestamps: true },
)

export const Activity = model('Activity', activitySchema)