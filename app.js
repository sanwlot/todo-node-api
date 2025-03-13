import express from 'express'
import usersRouter from './routes/users.js'
import { config } from 'dotenv'
config()

export const app = express()

// middlewares
app.use(express.json())

// using routes
app.use('/api/v1/users', usersRouter)

app.get('/', (req, res) => {
  res.send('hello world!')
})
