import ErrorHandler from '../middlewares/error.js'
import { Task } from '../models/tasks.js'

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id })

    if (!tasks) return next(new ErrorHandler('Tasks not found', 404))

    res.json({
      success: true,
      tasks,
    })
  } catch (error) {
    next(error)
  }
}

export const addTask = async (req, res, next) => {
  try {
    const { title, description } = req.body

    const task = await Task.create({
      title,
      description,
      user: req.user._id,
    })

    res.status(201).json({
      success: true,
      task,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params
    const task = await Task.findById(id)

    if (!task) return next(new ErrorHandler('Task not found', 404))

    await Task.deleteOne({ _id: id })

    res.json({
      success: true,
      message: 'task successfully deleted!',
    })
  } catch (error) {
    next(error)
  }
}

export async function updateTask(req, res, next) {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) return next(new ErrorHandler('Task not found', 404))

    task.isCompleted = !task.isCompleted
    await task.save()

    res.status(200).json({
      success: true,
      message: 'task updated',
    })
  } catch (error) {
    next(error)
  }
}
