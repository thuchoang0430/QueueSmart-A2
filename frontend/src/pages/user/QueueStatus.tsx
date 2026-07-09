import { useAuth } from '../../context/AuthContext'
import { useServices } from '../../context/ServicesContext'

export default function QueueStatus() {
  const { currentUser } = useAuth()
  const { services, getQueue } = useServices()

  const activeQueue = currentUser
    ? services
        .map((service) => {
          const queue = getQueue(service.id)
          const userIndex = queue.findIndex((queueUser) => queueUser.email === currentUser.email)

          return {
            service,
            queue,
            userIndex,
          }
        })
        .find((item) => item.userIndex !== -1)
    : null

  if (!currentUser) {
    return (
      <div>
        <div className="page-header">
          <h1>Queue Status</h1>
          <p>Please log in to view your current queue status.</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">No user is currently logged in.</p>
        </div>
      </div>
    )
  }

  if (!activeQueue) {
    return (
      <div>
        <div className="page-header">
          <h1>Queue Status</h1>
          <p>View your current position, wait time, and queue update.</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-slate-900">No active queue</h2>
          <p className="text-sm text-slate-600">
            You are not currently waiting in any queue. Go to Join Queue to select a service.
          </p>
        </div>
      </div>
    )
  }

  const position = activeQueue.userIndex + 1
  const estimatedWait = position * activeQueue.service.duration

  let status = 'Waiting'
  let badgeClass = 'bg-blue-100 text-blue-700'
  let notification = 'You are checked in. Please wait for your turn.'

  if (position === 1) {
    status = 'Almost Ready'
    badgeClass = 'bg-green-100 text-green-700'
    notification = 'You are next. Please stay nearby.'
  } else if (position <= 3) {
    status = 'Getting Close'
    badgeClass = 'bg-yellow-100 text-yellow-700'
    notification = 'Your turn is getting close. Please be ready.'
  }

  return (
    <div>
      <div className="page-header">
        <h1>Queue Status</h1>
        <p>View your current position, estimated wait time, and queue updates.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Service</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{activeQueue.service.name}</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Current Position</p>
          <p className="mt-2 text-4xl font-bold text-blue-600">#{position}</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Estimated Wait</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{estimatedWait} minutes</p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Current Status</h2>
          <span className={`rounded-full px-3 py-1 text-sm font-medium ${badgeClass}`}>
            {status}
          </span>
        </div>

        <p className="text-sm text-slate-600">{notification}</p>

        <div className="mt-5 space-y-2 text-sm text-slate-600">
          <p>
            <strong>Name:</strong> {currentUser.name}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p>
            <strong>People ahead of you:</strong> {position - 1}
          </p>
          <p>
            <strong>Total people in queue:</strong> {activeQueue.queue.length}
          </p>
        </div>
      </div>
    </div>
  )
}
