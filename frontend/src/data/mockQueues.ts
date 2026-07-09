import type { QueueMap, QueueUser } from '../types'

function generateQueue(serviceId: number, count: number): QueueUser[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${serviceId}-${i + 1}`,
    name: `Student ${i + 1}`,
    email: `student${i + 1}@test.edu`,
    joinedMinutesAgo: (i + 1) * 4,
  }))
}

export const initialQueues: QueueMap = {
  1: generateQueue(1, 5),
  2: generateQueue(2, 7),
  3: [],
}
