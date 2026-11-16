import express from "express"
import cors from "cors"
import helmet from "helmet"

import { env } from "./config/environment.js"
import apiRouter from "./routes/index.js"
import { AuthMiddleware } from "./middleware/auth.middleware.js"

const app = express()
const authMiddleware = new AuthMiddleware()

// Security middleware
app.use(helmet())

// CORS configuration
app.use(
 cors({
  origin: env.CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
 })
)

// Body parsing
app.use(express.json({ limit: "2mb" }))
app.use(express.urlencoded({ extended: true, limit: "2mb" }))

// Health check (public)
app.get("/health", (_req, res) => {
 res.status(200).json({ success: true, message: "Backend server is running" })
})

// API routes
app.use("", authMiddleware.authenticate, apiRouter)

export default app