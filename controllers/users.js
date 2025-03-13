import { User } from '../models/users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

  // generate jwt token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

  res
    .status(201)
    .cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
    })
    .json({
      success: true,
      message: 'User registered successfully',
    })
}

export async function loginUser(req, res, next) {}

export async function getUserById(req, res) {}
