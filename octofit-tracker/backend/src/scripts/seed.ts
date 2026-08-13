import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = [
      {
        name: 'OctoDashers',
        city: 'San Francisco',
        coach: 'Morgan Lee',
        members: ['Avery Chen', 'Jordan Patel'],
        weeklyGoalMinutes: 900,
      },
      {
        name: 'Core Crushers',
        city: 'Austin',
        coach: 'Riley Brooks',
        members: ['Taylor Smith', 'Casey Rivera'],
        weeklyGoalMinutes: 780,
      },
    ];

    const users = [
      {
        name: 'Avery Chen',
        email: 'avery.chen@example.com',
        age: 29,
        teamName: 'OctoDashers',
        fitnessGoal: 'Run a 10K under 55 minutes',
        joinedAt: new Date('2026-01-04T15:00:00Z'),
      },
      {
        name: 'Jordan Patel',
        email: 'jordan.patel@example.com',
        age: 34,
        teamName: 'OctoDashers',
        fitnessGoal: 'Improve cardio endurance',
        joinedAt: new Date('2026-01-08T15:00:00Z'),
      },
      {
        name: 'Taylor Smith',
        email: 'taylor.smith@example.com',
        age: 27,
        teamName: 'Core Crushers',
        fitnessGoal: 'Build functional strength',
        joinedAt: new Date('2026-01-11T15:00:00Z'),
      },
      {
        name: 'Casey Rivera',
        email: 'casey.rivera@example.com',
        age: 31,
        teamName: 'Core Crushers',
        fitnessGoal: 'Increase weekly activity consistency',
        joinedAt: new Date('2026-01-14T15:00:00Z'),
      },
    ];

    const activities = [
      {
        userEmail: 'avery.chen@example.com',
        userName: 'Avery Chen',
        teamName: 'OctoDashers',
        activityType: 'Running',
        durationMinutes: 42,
        distanceMiles: 4.8,
        caloriesBurned: 455,
        performedAt: new Date('2026-08-08T13:30:00Z'),
      },
      {
        userEmail: 'jordan.patel@example.com',
        userName: 'Jordan Patel',
        teamName: 'OctoDashers',
        activityType: 'Cycling',
        durationMinutes: 65,
        distanceMiles: 15.2,
        caloriesBurned: 620,
        performedAt: new Date('2026-08-09T12:15:00Z'),
      },
      {
        userEmail: 'taylor.smith@example.com',
        userName: 'Taylor Smith',
        teamName: 'Core Crushers',
        activityType: 'Strength Training',
        durationMinutes: 50,
        distanceMiles: 0,
        caloriesBurned: 385,
        performedAt: new Date('2026-08-10T22:00:00Z'),
      },
      {
        userEmail: 'casey.rivera@example.com',
        userName: 'Casey Rivera',
        teamName: 'Core Crushers',
        activityType: 'Rowing',
        durationMinutes: 38,
        distanceMiles: 5.1,
        caloriesBurned: 410,
        performedAt: new Date('2026-08-11T11:45:00Z'),
      },
    ];

    const leaderboard = [
      {
        rank: 1,
        userEmail: 'jordan.patel@example.com',
        userName: 'Jordan Patel',
        teamName: 'OctoDashers',
        points: 1480,
        activityMinutes: 310,
      },
      {
        rank: 2,
        userEmail: 'avery.chen@example.com',
        userName: 'Avery Chen',
        teamName: 'OctoDashers',
        points: 1325,
        activityMinutes: 285,
      },
      {
        rank: 3,
        userEmail: 'taylor.smith@example.com',
        userName: 'Taylor Smith',
        teamName: 'Core Crushers',
        points: 1210,
        activityMinutes: 260,
      },
      {
        rank: 4,
        userEmail: 'casey.rivera@example.com',
        userName: 'Casey Rivera',
        teamName: 'Core Crushers',
        points: 1095,
        activityMinutes: 235,
      },
    ];

    const workouts = [
      {
        title: 'Tempo 10K Builder',
        focusArea: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 45,
        recommendedForGoal: 'Run a 10K under 55 minutes',
        exercises: ['10 minute warmup jog', '4 x 6 minute tempo intervals', '5 minute cooldown'],
      },
      {
        title: 'Power Circuit',
        focusArea: 'Strength',
        difficulty: 'Intermediate',
        durationMinutes: 40,
        recommendedForGoal: 'Build functional strength',
        exercises: ['Goblet squats', 'Push presses', 'Walking lunges', 'Plank shoulder taps'],
      },
      {
        title: 'Recovery Row',
        focusArea: 'Endurance',
        difficulty: 'Beginner',
        durationMinutes: 30,
        recommendedForGoal: 'Increase weekly activity consistency',
        exercises: ['5 minute easy row', '20 minute steady row', '5 minute mobility flow'],
      },
    ];

    const [createdTeams, createdUsers, createdActivities, createdLeaderboard, createdWorkouts] = await Promise.all([
      Team.insertMany(teams),
      User.insertMany(users),
      Activity.insertMany(activities),
      LeaderboardEntry.insertMany(leaderboard),
      Workout.insertMany(workouts),
    ]);

    console.log('Database seeding complete', {
      teams: createdTeams.length,
      users: createdUsers.length,
      activities: createdActivities.length,
      leaderboard: createdLeaderboard.length,
      workouts: createdWorkouts.length,
    });
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
