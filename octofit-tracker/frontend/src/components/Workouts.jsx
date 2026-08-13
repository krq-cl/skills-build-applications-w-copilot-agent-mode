import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('workouts').then(setWorkouts).catch(() => setError('Workout suggestions are unavailable right now.'))
  }, [])

  return (
    <section className="content-panel">
      <div className="section-heading"><div><p className="eyebrow">Suggested Training</p><h1>Workouts</h1></div><span className="record-count">{workouts.length} plans</span></div>
      {error ? <p className="alert alert-danger">{error}</p> : null}
      <div className="row g-3">{workouts.map((workout) => <div className="col-md-6 col-xl-4" key={workout._id ?? workout.title}><article className="workout-card"><div className="workout-meta"><span>{workout.focusArea}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.recommendedForGoal}</p><ul>{workout.exercises?.map((exercise) => <li key={exercise}>{exercise}</li>)}</ul><span className="difficulty">{workout.difficulty}</span></article></div>)}</div>
    </section>
  )
}

export default Workouts