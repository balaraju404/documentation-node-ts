import { Router } from "express"
import authRoutes from "../modules/auth/auth.routes.js"

const apiRouter = Router()

apiRouter.use("/auth", authRoutes)

// User routes
// apiRouter.use("/users", userRouter)

// Workspace routes
// apiRouter.use("/workspaces", workspaceRouter)

// Project routes
// apiRouter.use("/projects", projectRouter)

// Section routes
// apiRouter.use("/sections", sectionRouter)

// Documentation page routes
// apiRouter.use("/pages", pageRouter)

export default apiRouter