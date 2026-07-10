import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useServices } from '../../context/ServicesContext'

export default function JoinQueue() {
  const { currentUser } = useAuth()
  const { services, getQueue, joinQueue, removeFromQueue } = useServices()
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null)
  const [message, setMessage] = useState('')

  const openServices = services.filter((service) => service.status === 'open')
  const selectedService = services.find((service) => service.id === selectedServiceId)
  const selectedQueue = selectedServiceId ? getQueue(selectedServiceId) : []

  const currentUserQueue = currentUser
    ? services
        .map((service) => ({
          service,
          queue: getQueue(service.id),
        }))
        .find(({ queue }) => queue.some((queueUser) => queueUser.email === currentUser.email))
    : null

  function handleJoin(serviceId: number) {
    if (!currentUser) {
      setMessage('Please log in before joining a queue.')
      return
    }

    const service = services.find((s) => s.id === serviceId)

    if (!service) {
      setMessage('Please select a valid service.')
      return
    }

    joinQueue(serviceId, {
      name: currentUser.name,
      email: currentUser.email,
    })

    setSelectedServiceId(serviceId)
    setMessage(`You joined the ${service.name} queue.`)
  }

  function handleLeaveQueue() {
    if (!currentUser || !currentUserQueue) {
      setMessage('You are not currently in a queue.')
      return
    }

    removeFromQueue(
      currentUserQueue.service.id,
      `${currentUserQueue.service.id}-${currentUser.email}`
    )

    setMessage('You left the queue.')
  }

  return (
    <div>
      <div className="page-header">
        <h1>Join a queue</h1>
        <p>Pick a service to view the estimated wait time and join the line.</p>
      </div>

      {message && (
        <div className="mb-4 rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          {message}
        </div>
      )}

      {currentUserQueue && (
        <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          You are currently in the {currentUserQueue.service.name} queue.
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {openServices.map((service) => {
          const queue = getQueue(service.id)
          const estimatedWait = queue.length * service.duration
          const isSelected = selectedServiceId === service.id

          return (
            <div
              key={service.id}
              className={`rounded-lg border bg-white p-5 shadow-sm ${
                isSelected ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200'
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">{service.name}</h2>
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium capitalize text-blue-700">
                  {service.priority}
                </span>
              </div>

              <p className="mb-4 text-sm text-slate-600">{service.description}</p>

              <div className="mb-4 space-y-1 text-sm text-slate-600">
                <p>{queue.length} people in line</p>
                <p>{service.duration} minutes per person</p>
                <p>{estimatedWait} minutes estimated wait</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedServiceId(service.id)}
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Select
                </button>

                <button
                  type="button"
                  onClick={() => handleJoin(service.id)}
                  className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Join queue
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-2 text-base font-semibold text-slate-900">Selected service</h2>

        {selectedService ? (
          <div className="text-sm text-slate-600">
            <p>
              <strong>Service:</strong> {selectedService.name}
            </p>
            <p>
              <strong>Estimated wait:</strong>{' '}
              {selectedQueue.length * selectedService.duration} minutes
            </p>

            <button
              type="button"
              onClick={handleLeaveQueue}
              className="mt-4 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Leave my queue
            </button>
          </div>
        ) : (
          <p className="text-sm text-slate-500">No service selected yet.</p>
        )}
      </div>
    </div>
  )
}
