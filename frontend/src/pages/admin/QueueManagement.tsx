import { useEffect, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useServices } from '../../context/ServicesContext'
import type { QueueUser } from '../../types'

interface Toast {
  type: 'success' | 'error'
  message: string
}

const priorityBadge: Record<string, ReactNode> = {
  low: <span className="badge badge-gray">Low priority</span>,
  medium: <span className="badge badge-primary">Medium priority</span>,
  high: <span className="badge badge-warning">High priority</span>,
}

export default function QueueManagement() {
  const { services, getQueue, moveQueueUser, removeFromQueue, serveNextUser } = useServices()
  const [searchParams, setSearchParams] = useSearchParams()
  const [toast, setToast] = useState<Toast | null>(null)
  const [confirmRemove, setConfirmRemove] = useState<QueueUser | null>(null)

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
  const estimatedWait = selectedService ? queue.length * selectedService.duration : 0

  function handleServeNext() {
    if (!selectedService) return
    const served = serveNextUser(selectedService.id)
    if (served) {
      setToast({ type: 'success', message: `Served ${served.name} for ${selectedService.name}.` })
    } else {
      setToast({ type: 'error', message: 'Queue is empty — no one to serve.' })
    }
  }

  function handleRemoveConfirmed() {
    if (!selectedService || !confirmRemove) return
    removeFromQueue(selectedService.id, confirmRemove.id)
    setToast({ type: 'success', message: `Removed ${confirmRemove.name} from the queue.` })
    setConfirmRemove(null)
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Queue Management</h1>
        <p>View and manage the live queue for a service.</p>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ marginBottom: 0, minWidth: 260, flex: 1 }}>
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

          {selectedService && (
            <div style={{ display: 'flex', gap: 20 }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Waiting
                </div>
                <div style={{ fontSize: 22, fontWeight: 600 }}>{queue.length}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Est. total wait
                </div>
                <div style={{ fontSize: 22, fontWeight: 600 }}>{estimatedWait} min</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedService && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4, flexWrap: 'wrap', gap: 10 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h2 style={{ marginBottom: 0 }}>{selectedService.name}</h2>
                {selectedService.priority && priorityBadge[selectedService.priority]}
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
                {queue.length} {queue.length === 1 ? 'person' : 'people'} waiting · ~{selectedService.duration} min per person
              </p>
            </div>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleServeNext}
              disabled={queue.length === 0}
              style={queue.length === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              Serve Next User
            </button>
          </div>

          <div style={{ marginTop: 14 }}>
            {queue.length === 0 ? (
              <div className="empty">
                <p style={{ marginBottom: 4, fontWeight: 500, color: 'var(--text)' }}>No one is waiting</p>
                <p>People who join this service's queue will show up here.</p>
              </div>
            ) : (
              queue.map((user, index) => (
                <div className="queue-user-item" key={user.id}>
                  <div
                    className="pos"
                    style={index === 0 ? { background: 'var(--success-light)', color: 'var(--success)' } : {}}
                  >
                    {index + 1}
                  </div>
                  <div className="info">
                    <div className="email">
                      {user.name}
                      {index === 0 && (
                        <span className="badge badge-success" style={{ marginLeft: 8 }}>
                          Up next
                        </span>
                      )}
                    </div>
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
                      aria-label={`Move ${user.name} up`}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => moveQueueUser(selectedService.id, user.id, 'down')}
                      disabled={index === queue.length - 1}
                      aria-label={`Move ${user.name} down`}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => setConfirmRemove(user)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {confirmRemove && (
        <div className="modal-backdrop show" onClick={(e) => e.target === e.currentTarget && setConfirmRemove(null)}>
          <div className="modal">
            <h2>Remove from queue?</h2>
            <p className="subtitle">
              {confirmRemove.name} will be removed from the {selectedService?.name} queue. This can't be undone.
            </p>
            <div className="btn-row" style={{ justifyContent: 'flex-end', marginTop: 24 }}>
              <button type="button" className="btn btn-secondary" onClick={() => setConfirmRemove(null)}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={handleRemoveConfirmed}>
                Remove
              </button>
            </div>
          </div>
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
