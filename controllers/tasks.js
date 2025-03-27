import { Task } from '../models/tasks.js'

export const getAllTasks = async (req, res, next) => {
  const tasks = await Task.find({ user: req.user._id })

  if (!tasks) return next(new Error('Tasks not found'))

  res.json({
    success: true,
    tasks,
  })
}

export const addTask = async (req, res) => {
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
}

export const deleteTask = async (req, res, next) => {
  const { id } = req.params
  const task = await Task.findById(id)

  if (!task) return next(new Error('Task not found'))

  await Task.deleteOne({ _id: id })

  res.json({
    success: true,
    message: 'task successfully deleted!',
  })
}

export async function updateTask(req, res, next) {
  const task = await Task.findById(req.params.id)

  if (!task) return next(new Error('Task not found'))

  task.isCompleted = !task.isCompleted
  await task.save()

  res.status(200).json({
    success: true,
    message: 'task updated',
  })
}
