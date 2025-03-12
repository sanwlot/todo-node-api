import express from 'express'
import { getAllUsers, getUserById, registerUser } from '../controllers/users.js'

const router = express.Router()

router.get('/all', getAllUsers)
router.get('/:id', getUserById)
router.post('/new', registerUser)

export default router
