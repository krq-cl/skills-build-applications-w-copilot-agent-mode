import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch(() => setError('Activities are unavailable right now.'))
  }, [])

  return (
    <section className="content-panel">
      <div className="section-heading"><div><p className="eyebrow">Training Log</p><h1>Activities</h1></div><span className="record-count">{activities.length} entries</span></div>
      {error ? <p className="alert alert-danger">{error}</p> : null}
      <div className="table-responsive"><table className="table align-middle data-table"><thead><tr><th>Activity</th><th>Member</th><th>Duration</th><th>Distance</th><th>When</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id ?? `${activity.userEmail}-${activity.performedAt}`}><td><strong>{activity.activityType}</strong><br /><span>{activity.caloriesBurned} cal</span></td><td>{activity.userName}</td><td>{activity.durationMinutes} min</td><td>{activity.distanceMiles} mi</td><td>{new Date(activity.performedAt).toLocaleDateString()}</td></tr>)}</tbody></table></div>
    </section>
  )
}

export default Activities