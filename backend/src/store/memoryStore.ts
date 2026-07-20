// The single source of truth for the whole backend. A3 does not use a database,
// so every module reads and writes these collections. Keeping them behind this
// one module is what makes the A4 swap to real persistence a contained change:
// only this file changes, controllers and services keep their signatures.

export type Priority = 'low' | 'medium' | 'high'
export type ServiceStatus = 'open' | 'closed'
export type Role = 'user' | 'admin'

// Priority carried by a single person waiting, not by the service. Ordering
// needs this to be per-entry, otherwise every entry in a queue ties and the
// arrival-vs-priority rule can never actually change the order.
export type EntryPriority = 'normal' | 'priority'

export type HistoryOutcome = 'served' | 'left'
export type NotificationType = 'joined' | 'almost-up' | 'served'

export interface User {
  id: number
  name: string
  email: string
  // Plain text is acceptable for A3 (no persistence, no real accounts).
  // Hashing belongs with the real data layer in A4.
  password: string
  role: Role
}

export interface Service {
  id: number
  name: string
  description: string
  /** Expected service time in minutes. Drives wait-time estimation. */
  duration: number
  priority: Priority
  status: ServiceStatus
}

export interface QueueEntry {
  id: number
  serviceId: number
  userId: number
  name: string
  email: string
  priority: EntryPriority
  /** Epoch ms. Arrival order tiebreaker and the basis for waited-time. */
  joinedAt: number
}

export interface HistoryRecord {
  id: number
  userId: number
  serviceId: number
  /** Denormalised so history survives the service being deleted. */
  serviceName: string
  joinedAt: number
  endedAt: number
  waitMinutes: number
  outcome: HistoryOutcome
}

export interface Notification {
  id: number
  userId: number
  type: NotificationType
  message: string
  createdAt: number
  read: boolean
}

export interface Store {
  users: User[]
  services: Service[]
  queueEntries: QueueEntry[]
  history: HistoryRecord[]
  notifications: Notification[]
}

type Collection = keyof Store

// Exported as a const object rather than a mutable binding so that
// `import { store }` keeps working after a reset - resetStore() replaces the
// arrays inside, never the object itself.
export const store: Store = {
  users: [],
  services: [],
  queueEntries: [],
  history: [],
  notifications: [],
}

const counters: Record<Collection, number> = {
  users: 0,
  services: 0,
  queueEntries: 0,
  history: 0,
  notifications: 0,
}

/** Auto-increment id generator, one sequence per collection. */
export function nextId(collection: Collection): number {
  counters[collection] += 1
  return counters[collection]
}

// Same credentials and services the A2 front end already demos with, so the
// UI behaves identically once it is pointed at the API.
function seedUsers(): User[] {
  return [
    { id: 1, name: 'Student User', email: 'user@test.com', password: 'password', role: 'user' },
    { id: 2, name: 'Admin User', email: 'admin@test.com', password: 'password', role: 'admin' },
  ]
}

function seedServices(): Service[] {
  return [
    {
      id: 1,
      name: 'Academic Advising',
      description: 'General academic guidance and course planning for students.',
      duration: 20,
      priority: 'medium',
      status: 'open',
    },
    {
      id: 2,
      name: 'Financial Aid',
      description: 'Assistance with financial aid applications and questions.',
      duration: 30,
      priority: 'high',
      status: 'open',
    },
    {
      id: 3,
      name: 'IT Help Desk',
      description: 'Technical support for student accounts, devices, and campus wifi.',
      duration: 15,
      priority: 'low',
      status: 'open',
    },
  ]
}

/**
 * Restores the store to its seeded state. Every test file must call this in
 * `beforeEach` - in-memory state is shared across tests in a file and one
 * leftover queue entry will silently break an unrelated assertion.
 */
export function resetStore(): void {
  store.users = seedUsers()
  store.services = seedServices()
  store.queueEntries = []
  store.history = []
  store.notifications = []

  counters.users = store.users.length
  counters.services = store.services.length
  counters.queueEntries = 0
  counters.history = 0
  counters.notifications = 0
}

resetStore()
