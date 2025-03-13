import express from 'express'
import {
  getAllUsers,
  getUserById,
  loginUser,
  registerUser,
} from '../controllers/users.js'

const router = express.Router()

router.get('/all', getAllUsers)
router.post('/new', registerUser)
router.post('/login', loginUser)
router.get('/:id', getUserById)

export default router
