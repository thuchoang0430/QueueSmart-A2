import { Router } from 'express'
import {
  getService,
  getServices,
  patchServiceStatus,
  postService,
  putService,
} from './services.controller'

const router = Router()

router.get('/', getServices)
router.get('/:id', getService)
// TODO(services owner): these routes currently have no admin guard.
// Add requireRole('admin') once Aldo's auth middleware lands.
router.post('/', postService)
router.put('/:id', putService)
router.patch('/:id/status', patchServiceStatus)

export default router
