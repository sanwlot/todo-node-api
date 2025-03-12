import mongoose from 'mongoose'

// Schema
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  passwword: String,
})

// Modal
export const User = mongoose.model('User', userSchema)
