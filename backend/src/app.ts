import cors from 'cors'
import express, { type Express } from 'express'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'
import servicesRoutes from './modules/services/services.routes'

/**
 * Builds the Express app without starting a server, so Supertest can drive it
 * in tests. `index.ts` is the only place that calls listen().
 */
export function createApp(): Express {
  const app = express()

  app.use(cors())
  app.use(express.json())

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' })
  })

  app.use('/api/services', servicesRoutes)
  // Register new routers here:
  // app.use('/api/auth', authRoutes)
  // app.use('/api/queues', queueRoutes)
  // app.use('/api/notifications', notificationRoutes)
  // app.use('/api/history', historyRoutes)

  // These two must stay last - notFound catches unmatched routes and
  // errorHandler turns every thrown ApiError into the shared error body.
  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
