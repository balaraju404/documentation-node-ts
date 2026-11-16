import app from "./app.js"
import { env } from "./config/environment.js"
import { connectDatabase } from "./config/database.js"

const startServer = async (): Promise<void> => {
 try {
  // Connect MongoDB
  await connectDatabase()

  // Start Express server
  app.listen(env.PORT, () => {
   console.log(`Server running on http://localhost:${env.PORT}`)
   console.log(`Environment: ${env.NODE_ENV}`)
  })

 } catch (error) {
  console.error("Server initialization failed:", error)
  process.exit(1)
 }
}

startServer()