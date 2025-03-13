import { User } from '../models/users.js'
import bcrypt from 'bcrypt'
import { sendJwtToken } from '../utils/utilityFunctions.js'

export async function getAllUsers(req, res) {}
export async function registerUser(req, res) {
  /* 
    1. destructure the 'name, email and password' from req.body
    2. find the user in the db by email
    3. if user already exists then redirect the user to login with error
    4. if not then hash the password, then register the user in db with hashed password, 
       then create a jwt token and send it with res as cookie and finally send message as success
  */
  const { name, email, password } = req.body

  let user = await User.findOne({ email })

  if (user) {
    // error
    return res.status(404).json({
      success: false,
      message: 'User already exists',
    })
  }

  // generate hashed password
  const hash = await bcrypt.hash(password, 10)

  // register the user and login with cookie
  user = await User.create({ name, email, password: hash })

  sendJwtToken(user, res, 'User successfully registered!', 201)
}
export async function loginUser(req, res) {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password')

  if (!user)
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    })

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch)
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    })

  sendJwtToken(user, res, 'Logged in successfully', 200)
}
export function logoutUser(req, res) {
  res
    .status(200)
    .cookie('token', null, { expires: new Date(Date.now()) }) // clear token cookie
    .json({
      success: true,
      message: 'logged out successfully',
    })
}
export function getMyProfile(req, res) {
  res.status(200).json({
    success: true,
    user: req.user,
  })
}
