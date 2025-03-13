import { User } from '../models/users.js'
import jwt from 'jsonwebtoken'

export async function isAuth(req, res, next) {
  const { token } = req.cookies
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Login first!',
    })
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  req.user = await User.findById(decodedToken._id)
  next()
}
