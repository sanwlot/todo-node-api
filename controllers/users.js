import { User } from '../models/users.js'
import bcrypt from 'bcryptjs'
import { sendJwtToken } from '../utils/utilityFunctions.js'
import ErrorHandler from '../middlewares/error.js'

export async function registerUser(req, res, next) {
  /* 
    1. destructure the 'name, email and password' from req.body
    2. find the user in the db by email
    3. if user already exists then redirect the user to login with error
    4. if not then hash the password, then register the user in db with hashed password, 
       then create a jwt token and send it with res as cookie and finally send message as success
  */
  try {
    const { name, email, password } = req.body

    let user = await User.findOne({ email })

    if (user) return next(new ErrorHandler('User already exists'))

    // generate hashed password
    const hash = await bcrypt.hash(password, 10)

    // register the user and login with cookie
    user = await User.create({ name, email, password: hash })

    sendJwtToken(user, res, 'User successfully registered!', 201)
  } catch (error) {
    next(error)
  }
}
export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user) return next(new ErrorHandler('Invalid credentials'))

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) return next(new ErrorHandler('Invalid credentials'))

    sendJwtToken(user, res, 'Logged in successfully', 200)
  } catch (error) {
    next(error)
  }
}

export function logoutUser(req, res) {
  res
    .status(200)
    .cookie('token', '', {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true in production, false in dev
      sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
      path: '/', // make sure this matches how the cookie was set
    })
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
