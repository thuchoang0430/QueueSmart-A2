import { ApiError } from '../../errors'
import { nextId, store, type Service } from '../../store/memoryStore'
import { validateOrThrow, type Schema } from '../../validation/validators'

// REFERENCE MODULE - copy this file/controller/routes trio when building the
// auth, queue, notification and history modules.
//
// The rule that keeps this testable: everything below is plain logic over the
// store. No `req`, no `res`, no Express imports. Unit tests call these
// functions directly, which is where most of the coverage target comes from.

export const PRIORITY_LEVELS = ['low', 'medium', 'high'] as const
export const SERVICE_STATUSES = ['open', 'closed'] as const

export const createServiceSchema: Schema = {
  name: { required: true, type: 'string', minLength: 2, maxLength: 50, label: 'Service name' },
  description: {
    required: true,
    type: 'string',
    minLength: 5,
    maxLength: 200,
    label: 'Description',
  },
  duration: { required: true, type: 'number', min: 1, max: 240, label: 'Expected duration' },
  priority: { required: true, type: 'string', oneOf: PRIORITY_LEVELS, label: 'Priority level' },
}

export interface NewServiceInput {
  name: string
  description: string
  duration: number
  priority: (typeof PRIORITY_LEVELS)[number]
}

export function listServices(): Service[] {
  return [...store.services]
}

export function getServiceById(id: number): Service {
  const service = store.services.find((s) => s.id === id)
  if (!service) throw ApiError.notFound(`No service with id ${id}.`)
  return service
}

export function createService(input: unknown): Service {
  validateOrThrow(input, createServiceSchema)
  const data = input as NewServiceInput

  const name = data.name.trim()
  const duplicate = store.services.some((s) => s.name.toLowerCase() === name.toLowerCase())
  if (duplicate) {
    throw ApiError.conflict(`A service named "${name}" already exists.`)
  }

  const service: Service = {
    id: nextId('services'),
    name,
    description: data.description.trim(),
    duration: data.duration,
    priority: data.priority,
    status: 'open',
  }

  store.services.push(service)
  return service
}
