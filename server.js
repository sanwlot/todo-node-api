import { app } from './app.js'
import { connectDB } from './db.js'

connectDB()

app.listen(process.env.PORT, () =>
  console.log(
    `server is running at PORT:${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  )
)
