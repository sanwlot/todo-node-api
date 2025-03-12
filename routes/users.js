import express from 'express'
import {
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
} from '../controllers/users.js'

const router = express.Router()

router.get('/all', getAllUsers)
router.post('/new', registerUser)
// if endpoint name is same then we can chain the http methods
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser)

export default router
