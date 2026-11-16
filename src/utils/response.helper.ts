import type { Response } from "express"
import { z } from "zod"

export class ResponseHelper {
 static success<T>(
  res: Response,
  message: string,
  data: T = null as T,
  statusCode = 200
 ): Response {
  return res.status(statusCode).json({
   success: true,
   message,
   data
  })
 }

 static error(
  res: Response,
  message: string,
  statusCode = 500,
  data: unknown = null
 ): Response {
  return res.status(statusCode).json({
   success: false,
   message,
   data
  })
 }

 static validationError(
  res: Response,
  error: z.ZodError,
  message = "Validation failed"
 ): Response {
  return res.status(400).json({
   success: false,
   message,
   data: z.treeifyError(error)
  })
 }
}