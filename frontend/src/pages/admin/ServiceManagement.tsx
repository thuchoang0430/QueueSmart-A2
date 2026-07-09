import { useState } from 'react'
import { useServices } from '../../context/ServicesContext'
import ServiceForm from './components/ServiceForm'
import type { NewServiceInput, Priority } from '../../types'

const priorityBadge: Record<Priority, string> = {
  low: 'badge-gray',
  medium: 'badge-warning',
  high: 'badge-danger',
}

type Mode = 'create' | { id: number } | null

export default function ServiceManagement() {
  const { services, addService, updateService, removeService } = useServices()
  const [mode, setMode] = useState<Mode>(null)

  const editingService =
    mode && mode !== 'create' ? services.find((s) => s.id === mode.id) : null

  function handleSubmit(values: NewServiceInput) {
    if (mode === 'create') {
      addService(values)
    } else if (editingService) {
      updateService(editingService.id, values)
    }
    setMode(null)
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Service Management</h1>
        <p>Create and edit the services available to users.</p>
      </div>

      {mode ? (
        <div className="card" style={{ maxWidth: 520 }}>
          <h2>{mode === 'create' ? 'Create Service' : `Edit ${editingService?.name}`}</h2>
          <ServiceForm
            initialValues={editingService ?? undefined}
            onSubmit={handleSubmit}
            onCancel={() => setMode(null)}
          />
        </div>
      ) : (
        <>
          <div className="btn-row" style={{ marginBottom: 16 }}>
            <button type="button" className="btn btn-primary" onClick={() => setMode('create')}>
              + Add New Service
            </button>
          </div>

          <div className="card">
            <h2>Existing Services</h2>
            {services.length === 0 ? (
              <p className="empty">No services yet. Click "Add New Service" to create one.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Priority</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s) => (
                    <tr key={s.id}>
                      <td>{s.name}</td>
                      <td>{s.description}</td>
                      <td>{s.duration} min</td>
                      <td>
                        <span className={`badge ${priorityBadge[s.priority]}`}>{s.priority}</span>
                      </td>
                      <td>
                        <div className="btn-row">
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => setMode({ id: s.id })}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => removeService(s.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  )
}
