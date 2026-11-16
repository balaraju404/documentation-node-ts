import { Router } from "express"
import { AuthController } from "./auth.controller.js"
import { registerSchema, loginSchema } from "./auth.validation.js"
import { ValidationMiddleware } from "../../middleware/validation.middleware.js"

const router = Router()
const authController = new AuthController()

router.post(
 "/register",
 ValidationMiddleware.validate(registerSchema),
 authController.register
)

router.post(
 "/login",
 ValidationMiddleware.validate(loginSchema),
 authController.login
)

router.get(
 "/me",
 authController.getMe
)

router.post(
 "/logout",
 authController.logout
)

export default router