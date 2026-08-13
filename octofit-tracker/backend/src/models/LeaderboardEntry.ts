import { Schema, model } from 'mongoose'

const leaderboardEntrySchema = new Schema(
  {
    rank: { type: Number, required: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true },
    activityMinutes: { type: Number, required: true },
  },
  { timestamps: true },
)

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema)