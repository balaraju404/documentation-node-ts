import type { Request, Response, NextFunction } from "express"
import { JwtHelper } from "../utils/jwt.helper.js"
import { ResponseHelper } from "../utils/response.helper.js"

declare global {
 namespace Express {
  interface Request {
   auth?: {
    userId: string
   }
  }
 }
}

export class AuthMiddleware {
 private readonly publicRoutes = [
  { method: "POST", path: "/auth/register" },
  { method: "POST", path: "/auth/login" },
  { method: "GET", path: "/health" }
 ]

 private isPublicRoute(req: Request): boolean {
  return this.publicRoutes.some((route) => route.method === req.method && route.path === req.path)
 }

 authenticate = (req: Request, res: Response, next: NextFunction): void => {
  // Skip authentication for public routes
  if (this.isPublicRoute(req)) {
   next()
   return
  }

  try {
   const authHeader = req.headers.authorization

   if (!authHeader?.startsWith("Bearer ")) {
    ResponseHelper.error(res, "Authentication required", 401)
    return
   }

   const token = authHeader.slice(7).trim()

   if (!token) {
    ResponseHelper.error(res, "Authentication token is missing", 401)
    return
   }

   const decoded = JwtHelper.verifyToken(token)

   if (typeof decoded.userId !== "string" || !decoded.userId.trim()) {
    ResponseHelper.error(res, "Invalid authentication token", 401)
    return
   }

   req.auth = {
    userId: decoded.userId
   }

   next()
  } catch {
   ResponseHelper.error(res, "Invalid or expired token", 401)
  }
 }
}