import express from 'express'
const router = express.Router()

import { post } from '../controllers/'

router.get('/', post.getAll)
router.get('/:id', post.get)
router.post('/', post.create)
router.put('/:id', post.update)
router.delete('/:id', post.delete)

export default router
