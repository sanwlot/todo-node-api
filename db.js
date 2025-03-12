import mongoose from 'mongoose'

export function connectDB() {
  mongoose
    .connect(process.env.DB_URI, {
      dbName: 'nodeApi',
    })
    .then(() => console.log('db connected'))
    .catch((e) => console.log(e))
}
