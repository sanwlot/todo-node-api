import express from 'express'
import {
  getMyProfile,
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/users.js'
import { isAuth } from '../middlewares/auth.js'

const router = express.Router()

router.post('/new', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/profile', isAuth, getMyProfile)

export default router
