import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('users').then(setUsers).catch(() => setError('Users are unavailable right now.'))
  }, [])

  return (
    <section className="content-panel">
      <div className="section-heading">
        <div><p className="eyebrow">Member Directory</p><h1>Users</h1></div>
        <span className="record-count">{users.length} members</span>
      </div>
      {error ? <p className="alert alert-danger">{error}</p> : null}
      <div className="table-responsive"><table className="table align-middle data-table"><thead><tr><th>Member</th><th>Team</th><th>Fitness goal</th><th>Age</th></tr></thead><tbody>{users.map((user) => <tr key={user._id ?? user.email}><td><strong>{user.name}</strong><br /><span>{user.email}</span></td><td>{user.teamName}</td><td>{user.fitnessGoal}</td><td>{user.age}</td></tr>)}</tbody></table></div>
    </section>
  )
}

export default Users