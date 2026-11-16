import express from "express"
import cors from "cors"
import helmet from "helmet"

import { env } from "./config/environment.js"
import { apiRouter } from "./routes"

const app = express()

// Security middleware
app.use(helmet())

// CORS configuration
app.use(
 cors({
  origin: env.CLIENT_URL,
  credentials: true
 })
)

// Request body parsing
app.use(express.json({ limit: "2mb" }))
app.use(express.urlencoded({ extended: true }))

// Health check
app.get("/health", (_req, res) => {
 res.status(200).json({
  success: true,
  message: "Backend server is running"
 })
})

// API routes
app.use("/api/v1", apiRouter)

export default app