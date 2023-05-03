import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
  first_name: { type: String, required: true, maxLength: 30 },
  last_name: { type: String, required: true, maxLength: 30 },
  email: { type: String, required: true, max: 20 },
  age: { type: Number, required: true, min: 1, max: 150 },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
}, { timestamps: true })

export default usersSchema 