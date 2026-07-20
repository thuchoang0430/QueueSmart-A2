import { Router } from 'express'
import { requireAuth, requireRole } from '../../middleware/auth'
import { getService, getServices, postService } from './services.controller'

const router = Router()

// Browsing services is public - the front end lists them before anyone signs in.
router.get('/', getServices)
router.get('/:id', getService)
// TODO(services owner): add PUT /:id and PATCH /:id/status, both admin only.
router.post('/', requireAuth, requireRole('admin'), postService)

export default router
