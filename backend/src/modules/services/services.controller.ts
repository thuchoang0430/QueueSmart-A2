import type { NextFunction, Request, Response } from 'express'
import { parseId } from '../../validation/validators'
import { createService, getServiceById, listServices } from './services.service'

// Controllers stay thin on purpose: read the request, call the service layer,
// send the result. All rules live in services.service.ts so they can be unit
// tested without spinning up Express.
//
// try/catch + next(err) is required because these are async - Express 5 does
// forward rejected promises, but being explicit keeps the pattern obvious for
// everyone copying this file.

export async function getServices(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json({ services: listServices() })
  } catch (err) {
    next(err)
  }
}

export async function getService(req: Request, res: Response, next: NextFunction) {
  try {
    // Express types route params as string | string[]; String() narrows it.
    const id = parseId(String(req.params.id), 'Service id')
    res.json({ service: getServiceById(id) })
  } catch (err) {
    next(err)
  }
}

export async function postService(req: Request, res: Response, next: NextFunction) {
  try {
    const service = createService(req.body)
    res.status(201).json({ service })
  } catch (err) {
    next(err)
  }
}
