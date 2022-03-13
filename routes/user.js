import express from 'express'
const router = express.Router()

import { user } from '../controllers/'

router.get('/', user.getAll)
router.get('/:id', user.get)
router.post('/', user.create)
router.put('/:id', user.update)
router.delete('/:id', user.delete)

export default router
