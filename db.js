import mongoose from 'mongoose'

export function connectDB() {
  mongoose
    .connect(process.env.DB_URI, {
      dbName: 'nodeApi',
    })
    .then((c) => console.log(`db connected with ${c.connection.host}`))
    .catch((e) => console.log(e))
}
