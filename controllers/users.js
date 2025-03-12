import { User } from '../models/users.js'

export async function getAllUsers(req, res) {
  const users = await User.find()
  res.json({
    success: true,
    users,
  })
}

export async function getUserById(req, res) {
  const { id } = req.params
  const user = await User.findById(id)
  res.json({
    success: true,
    user,
  })
}

export async function registerUser(req, res) {
  const { name, email, password } = req.body
  await User.create({
    name,
    email,
    password,
  })

  res.status(201).cookie('temp', 'lol').json({
    success: true,
    message: 'User Registered Successfully',
  })
}
