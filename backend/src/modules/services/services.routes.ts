import { Router } from 'express'
import { getService, getServices, postService } from './services.controller'

const router = Router()

router.get('/', getServices)
router.get('/:id', getService)
// TODO(services owner): POST currently has no admin guard - add requireRole('admin')
// once the auth middleware lands, then add PUT /:id and PATCH /:id/status.
router.post('/', postService)

export default router
