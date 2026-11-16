import type { Request, Response } from "express"
import { AuthService } from "./auth.service.js"
import { ResponseHelper } from "../../utils/response.helper.js"
import { User } from "../../models/user.model.js"

export class AuthController {
 private authService = new AuthService()

 register = async (req: Request, res: Response): Promise<void> => {
  try {
   const user = await this.authService.register(req.body)
   ResponseHelper.success(res, "User registered successfully", user, 201)
  } catch (error) {
   const message = error instanceof Error ? error.message : "Registration failed"
   ResponseHelper.error(res, message, message === "User already exists" ? 409 : 500)
  }
 }

 login = async (req: Request, res: Response): Promise<void> => {
  try {
   const result = await this.authService.login(req.body)
   ResponseHelper.success(res, "Login successful", result)
  } catch (error) {
   const message = error instanceof Error ? error.message : "Login failed"
   ResponseHelper.error(res, message, message === "Invalid email or password" ? 401 : 500)
  }
 }

 getMe = async (req: Request, res: Response): Promise<void> => {
  try {
   const user = await User.findById(req.auth?.userId)
   if (!user) {
    ResponseHelper.error(res, "User not found", 404)
    return
   }

   ResponseHelper.success(res, "User fetched successfully", { id: user._id, name: user.name, email: user.email })
  } catch {
   ResponseHelper.error(res, "Unable to fetch user", 500)
  }
 }

 logout = (_req: Request, res: Response): void => {
  ResponseHelper.success(res, "Logout successful. Please discard your access token.", null)
 }
}