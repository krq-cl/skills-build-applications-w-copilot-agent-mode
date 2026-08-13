import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('leaderboard').then(setLeaderboard).catch(() => setError('Leaderboard is unavailable right now.'))
  }, [])

  return (
    <section className="content-panel">
      <div className="section-heading"><div><p className="eyebrow">This Week</p><h1>Leaderboard</h1></div><span className="record-count">{leaderboard.length} ranked</span></div>
      {error ? <p className="alert alert-danger">{error}</p> : null}
      <ol className="leaderboard-list">{leaderboard.map((entry) => <li key={entry._id ?? entry.userEmail}><span className="rank">{entry.rank}</span><div><strong>{entry.userName}</strong><span>{entry.teamName} · {entry.activityMinutes} active min</span></div><b>{entry.points.toLocaleString()} pts</b></li>)}</ol>
    </section>
  )
}

export default Leaderboard