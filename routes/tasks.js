import express from 'express'
import { isAuth } from '../middlewares/auth.js'
import {
  updateTask,
  getAllTasks,
  addTask,
  deleteTask,
} from '../controllers/tasks.js'

const router = express.Router()

router.get('/all', isAuth, getAllTasks)
router.post('/add', isAuth, addTask)
router.route('/:id').put(isAuth, updateTask).delete(isAuth, deleteTask)

export default router
