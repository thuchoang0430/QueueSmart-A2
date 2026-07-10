import { createContext, useContext, useState, type ReactNode } from 'react'
import { initialServices } from '../data/mockServices'
import { initialQueues } from '../data/mockQueues'
import type { ActivityLogEntry, NewServiceInput, QueueMap, QueueUser, Service } from '../types'

const ACTIVITY_LOG_LIMIT = 20

interface ServicesContextValue {
  services: Service[]
  addService: (service: NewServiceInput) => void
  updateService: (id: number, changes: Partial<Service>) => void
  toggleServiceStatus: (id: number) => void
  removeService: (id: number) => void
  queues: QueueMap
  getQueue: (serviceId: number) => QueueUser[]
  joinQueue: (serviceId: number, user: { name: string; email: string }) => void
  moveQueueUser: (serviceId: number, userId: string, direction: 'up' | 'down') => void
  removeFromQueue: (serviceId: number, userId: string) => void
  serveNextUser: (serviceId: number) => QueueUser | null
  activityLog: ActivityLogEntry[]
}

const ServicesContext = createContext<ServicesContextValue | null>(null)

let nextServiceId = initialServices.length + 1
let nextActivityId = 1

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [queues, setQueues] = useState<QueueMap>(initialQueues)
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>([])

  function logActivity(message: string) {
    const entry: ActivityLogEntry = {
      id: `activity-${nextActivityId++}`,
      message,
      timestamp: Date.now(),
    }
    setActivityLog((prev) => [entry, ...prev].slice(0, ACTIVITY_LOG_LIMIT))
  }

  function addService(service: NewServiceInput) {
    const id = nextServiceId++
    setServices((prev) => [...prev, { ...service, id, status: 'open' }])
    setQueues((prev) => ({ ...prev, [id]: [] }))
    logActivity(`Created service "${service.name}"`)
  }

  function updateService(id: number, changes: Partial<Service>) {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...changes } : s))
    )
    const name = changes.name ?? services.find((s) => s.id === id)?.name
    logActivity(`Updated service "${name}"`)
  }

  function toggleServiceStatus(id: number) {
    const target = services.find((s) => s.id === id)
    setServices((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === 'open' ? 'closed' : 'open' } : s
      )
    )
    if (target) {
      const nextStatus = target.status === 'open' ? 'closed' : 'open'
      logActivity(`${nextStatus === 'open' ? 'Opened' : 'Closed'} queue for "${target.name}"`)
    }
  }

  function removeService(id: number) {
    const target = services.find((s) => s.id === id)
    setServices((prev) => prev.filter((s) => s.id !== id))
    setQueues((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
    if (target) logActivity(`Deleted service "${target.name}"`)
  }

  function getQueue(serviceId: number): QueueUser[] {
    return queues[serviceId] ?? []
  }

  function joinQueue(serviceId: number, user: { name: string; email: string }) {
  setQueues((prev) => {
    const list = prev[serviceId] ?? []

    const alreadyInQueue = list.some((u) => u.email === user.email)
    if (alreadyInQueue) return prev

    const newUser: QueueUser = {
      id: `${serviceId}-${user.email}`,
      name: user.name,
      email: user.email,
      joinedMinutesAgo: 0,
    }

    return {
      ...prev,
      [serviceId]: [...list, newUser],
    }
  })
}
  function moveQueueUser(serviceId: number, userId: string, direction: 'up' | 'down') {
    setQueues((prev) => {
      const list = [...(prev[serviceId] ?? [])]
      const index = list.findIndex((u) => u.id === userId)
      const swapWith = direction === 'up' ? index - 1 : index + 1
      if (index < 0 || swapWith < 0 || swapWith >= list.length) return prev
      ;[list[index], list[swapWith]] = [list[swapWith], list[index]]
      return { ...prev, [serviceId]: list }
    })
  }

  function removeFromQueue(serviceId: number, userId: string) {
    setQueues((prev) => ({
      ...prev,
      [serviceId]: (prev[serviceId] ?? []).filter((u) => u.id !== userId),
    }))
  }

  function serveNextUser(serviceId: number): QueueUser | null {
    let served: QueueUser | null = null
    setQueues((prev) => {
      const list = prev[serviceId] ?? []
      if (list.length === 0) return prev
      served = list[0]
      return { ...prev, [serviceId]: list.slice(1) }
    })
    return served
  }

  return (
    <ServicesContext.Provider
      value={{
        services,
        addService,
        updateService,
        toggleServiceStatus,
        removeService,
        queues,
        getQueue,
        joinQueue,
        moveQueueUser,
        removeFromQueue,
        serveNextUser,
        activityLog,
      }}
    >
      {children}
    </ServicesContext.Provider>
  )
}

export function useServices(): ServicesContextValue {
  const ctx = useContext(ServicesContext)
  if (!ctx) throw new Error('useServices must be used within a ServicesProvider')
  return ctx
}
