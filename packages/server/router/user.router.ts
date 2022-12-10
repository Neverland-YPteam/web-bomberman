import { Router } from 'express'
import { userController } from '../controllers'

const router = Router()

router.get('/:id', userController.find)
router.post('/:id', userController.create)
router.put('/:id', userController.update)

export default router
