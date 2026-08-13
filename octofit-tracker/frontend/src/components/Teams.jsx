import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('teams').then(setTeams).catch(() => setError('Teams are unavailable right now.'))
  }, [])

  return (
    <section className="content-panel">
      <div className="section-heading"><div><p className="eyebrow">Community</p><h1>Teams</h1></div><span className="record-count">{teams.length} teams</span></div>
      {error ? <p className="alert alert-danger">{error}</p> : null}
      <div className="row g-3">{teams.map((team) => <div className="col-md-6" key={team._id ?? team.name}><article className="team-card"><p className="eyebrow">{team.city}</p><h2>{team.name}</h2><dl><div><dt>Coach</dt><dd>{team.coach}</dd></div><div><dt>Weekly goal</dt><dd>{team.weeklyGoalMinutes} min</dd></div><div><dt>Members</dt><dd>{team.members?.join(', ')}</dd></div></dl></article></div>)}</div>
    </section>
  )
}

export default Teams