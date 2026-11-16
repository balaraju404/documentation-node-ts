import mongoose from "mongoose"
import { env } from "./environment.js"

export const connectDatabase = async (): Promise<void> => {
 try {
  const uri = `mongodb+srv://${encodeURIComponent(env.MONGODB_USER)}:${encodeURIComponent(env.MONGODB_PASSWORD)}@${env.MONGODB_HOST}/${env.MONGODB_DATABASE}?retryWrites=true&w=majority`
  await mongoose.connect(uri)
  console.log("MongoDB Atlas connected successfully")
 } catch (error) {
  console.error("MongoDB Atlas connection failed:", error)
  throw error
 }
}