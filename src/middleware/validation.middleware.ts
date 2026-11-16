import type { Request, Response, NextFunction } from "express"
import type { ZodType } from "zod"

import { ResponseHelper } from "../utils/response.helper.js"

export class ValidationMiddleware {
 static validate(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction): void => {
   const validation = schema.safeParse(req.body)
   if (!validation.success) {
    ResponseHelper.validationError(res, validation.error)
    return
   }

   req.body = validation.data
   next()
  }
 }
}