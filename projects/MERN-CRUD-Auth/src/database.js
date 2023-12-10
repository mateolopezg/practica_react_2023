import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://user:password@your.clouster.mongodb.net/?retryWrites=true&w=majority')
    console.log('-->> DB is connected')
  } catch (error) {
    console.error(error)
  }
}
