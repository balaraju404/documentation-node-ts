import type { Request, Response, NextFunction } from "express"
import { ResponseHelper } from "../utils/response.helper.js"

export class ErrorMiddleware {
 static handle(error: Error, _req: Request, res: Response, _next: NextFunction): void {
  console.error(error)
  ResponseHelper.error(res, error.message || "Internal server error", 500)
 }

 static notFound(_req: Request, res: Response): void {
  ResponseHelper.error(res, "Route not found", 404)
 }
}