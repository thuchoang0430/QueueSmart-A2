export type Priority = 'low' | 'medium' | 'high'
export type ServiceStatus = 'open' | 'closed'

export interface Service {
  id: number
  name: string
  description: string
  duration: number
  priority: Priority
  status: ServiceStatus
}

export interface NewServiceInput {
  name: string
  description: string
  duration: number
  priority: Priority
}

export interface QueueUser {
  id: string
  name: string
  email: string
  joinedMinutesAgo: number
}

export type QueueMap = Record<number, QueueUser[]>
