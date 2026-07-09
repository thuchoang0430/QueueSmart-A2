import { Link } from 'react-router-dom'
import { useServices } from '../../context/ServicesContext'
import type { Priority } from '../../types'

const priorityBadge: Record<Priority, string> = {
  low: 'badge-gray',
  medium: 'badge-warning',
  high: 'badge-danger',
}

export default function AdminDashboard() {
  const { services, toggleServiceStatus, getQueue } = useServices()

  const openCount = services.filter((s) => s.status === 'open').length
  const totalWaiting = services.reduce((sum, s) => sum + getQueue(s.id).length, 0)

  return (
    <div className="container">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Overview of all services and their current queues.</p>
      </div>

      <div className="grid grid-3" style={{ marginBottom: 24 }}>
        <div className="stat">
          <div className="label">Total Services</div>
          <div className="value">{services.length}</div>
        </div>
        <div className="stat">
          <div className="label">Open Services</div>
          <div className="value">{openCount}</div>
        </div>
        <div className="stat">
          <div className="label">People Waiting</div>
          <div className="value">{totalWaiting}</div>
          <div className="hint">Across all services</div>
        </div>
      </div>

      <div className="card">
        <h2>Services</h2>
        {services.length === 0 ? (
          <p className="empty">No services yet. Add one from Service Management.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Queue Length</th>
                <th>Expected Duration</th>
                <th>Quick Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>
                    <span className={`badge ${priorityBadge[s.priority]}`}>{s.priority}</span>
                  </td>
                  <td>
                    <span className={`badge ${s.status === 'open' ? 'badge-success' : 'badge-gray'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td>{getQueue(s.id).length}</td>
                  <td>{s.duration} min</td>
                  <td>
                    <div className="btn-row">
                      <button
                        type="button"
                        className={`btn btn-sm ${s.status === 'open' ? 'btn-danger' : 'btn-success'}`}
                        onClick={() => toggleServiceStatus(s.id)}
                      >
                        {s.status === 'open' ? 'Close Queue' : 'Open Queue'}
                      </button>
                      <Link className="btn btn-secondary btn-sm" to={`/admin/queue-management?service=${s.id}`}>
                        Manage Queue
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
