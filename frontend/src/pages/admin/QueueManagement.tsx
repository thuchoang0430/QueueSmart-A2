import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useServices } from '../../context/ServicesContext'
import type { QueueUser } from '../../types'

interface Toast {
  type: 'success' | 'error'
  message: string
}

export default function QueueManagement() {
  const { services, getQueue, moveQueueUser, removeFromQueue, serveNextUser } = useServices()
  const [searchParams, setSearchParams] = useSearchParams()
  const [toast, setToast] = useState<Toast | null>(null)

  const preselected = searchParams.get('service')
  const [selectedId, setSelectedId] = useState<number | ''>(
    preselected ? Number(preselected) : services[0]?.id ?? ''
  )

  useEffect(() => {
    if (preselected) setSelectedId(Number(preselected))
  }, [preselected])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(timer)
  }, [toast])

  function handleSelectChange(id: string) {
    setSelectedId(id ? Number(id) : '')
    setSearchParams(id ? { service: id } : {})
  }

  const selectedService = services.find((s) => s.id === Number(selectedId))
  const queue = selectedService ? getQueue(selectedService.id) : []

  function handleServeNext() {
    if (!selectedService) return
    const served = serveNextUser(selectedService.id)
    if (served) {
      setToast({ type: 'success', message: `Served ${served.name} for ${selectedService.name}.` })
    } else {
      setToast({ type: 'error', message: 'Queue is empty — no one to serve.' })
    }
  }

  function handleRemove(user: QueueUser) {
    if (!selectedService) return
    removeFromQueue(selectedService.id, user.id)
    setToast({ type: 'success', message: `Removed ${user.name} from the queue.` })
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Queue Management</h1>
        <p>View and manage the live queue for a service.</p>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="form-group" style={{ marginBottom: 0, maxWidth: 320 }}>
          <label htmlFor="service-select">Select a service</label>
          <select
            id="service-select"
            value={selectedId}
            onChange={(e) => handleSelectChange(e.target.value)}
          >
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.status})
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedService && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 style={{ marginBottom: 0 }}>
              {selectedService.name} — {queue.length} waiting
            </h2>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleServeNext}
              disabled={queue.length === 0}
            >
              Serve Next User
            </button>
          </div>

          {queue.length === 0 ? (
            <p className="empty">No one is currently waiting for this service.</p>
          ) : (
            queue.map((user, index) => (
              <div className="queue-user-item" key={user.id}>
                <div className="pos">{index + 1}</div>
                <div className="info">
                  <div className="email">{user.name}</div>
                  <div className="joined">
                    {user.email} · joined {user.joinedMinutesAgo} min ago
                  </div>
                </div>
                <div className="btn-row">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => moveQueueUser(selectedService.id, user.id, 'up')}
                    disabled={index === 0}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => moveQueueUser(selectedService.id, user.id, 'down')}
                    disabled={index === queue.length - 1}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(user)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>{toast.message}</div>
        </div>
      )}
    </div>
  )
}
