import express from 'express'
import usersRouter from './routes/users.js'
import tasksRouter from './routes/tasks.js'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middlewares/error.js'
import cors from 'cors'
import { config } from 'dotenv'
config()

export const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)

// using routes
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/tasks', tasksRouter)

app.get('/', (req, res) => res.send('hello world!'))

// error handler middleware
app.use(errorMiddleware)
