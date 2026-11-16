import { User } from "../../models/user.model.js"
import { JwtHelper } from "../../utils/jwt.helper.js"
import { PasswordHelper } from "../../utils/password.helper.js"
import type { RegisterInput, LoginInput } from "./auth.validation.js"

export class AuthService {

 async register(data: RegisterInput) {
  const email = data.email.toLowerCase()

  const existingUser = await User.findOne({ email })
  if (existingUser) throw new Error("User already exists")

  const hashedPassword = await PasswordHelper.hash(data.password)

  const user = await User.create({
   name: data.name,
   email,
   password: hashedPassword
  })

  return {
   id: user._id,
   name: user.name,
   email: user.email
  }
 }

 async login(data: LoginInput) {
  const email = data.email.toLowerCase()

  const user = await User.findOne({ email }).select("+password")
  if (!user) throw new Error("Invalid email or password")

  const isPasswordValid = await PasswordHelper.compare(data.password, user.password)
  if (!isPasswordValid) throw new Error("Invalid email or password")

  const accessToken = JwtHelper.generateToken({ userId: user._id.toString() })

  return {
   user: {
    id: user._id,
    name: user.name,
    email: user.email,
   },
   accessToken
  }
 }
}