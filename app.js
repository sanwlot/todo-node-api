import express from 'express'
import usersRouter from './routes/users.js'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import { isAuth } from './middlewares/auth.js'
config()

export const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())

// using routes
app.use('/api/v1/users', usersRouter)

app.get('/', isAuth, (req, res) => {
  res.send('hello world!')
})
