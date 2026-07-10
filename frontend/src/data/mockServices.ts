import type { Priority, Service } from '../types'

export const initialServices: Service[] = [
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

export const PRIORITY_LEVELS: Priority[] = ['low', 'medium', 'high']
