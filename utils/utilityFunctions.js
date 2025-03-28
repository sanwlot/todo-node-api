import jwt from 'jsonwebtoken'

export function sendJwtToken(user, res, message, statusCode = 200) {
  // generate jwt token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
  res
    .status(statusCode)
    .cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
      sameSite: process.env.NODE_ENV === 'dev' ? 'lax' : 'none',
      secure: process.env.NODE_ENV === 'dev' ? false : true,
    })
    .json({
      success: true,
      message,
    })
}
