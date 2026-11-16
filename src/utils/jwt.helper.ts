import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken"
import { env } from "../config/environment.js"

export class JwtHelper {
 static generateToken(payload: object): string {
  return jwt.sign(payload, env.JWT_SECRET, {
   expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
  })
 }

 static verifyToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, env.JWT_SECRET)

  if (typeof decoded === "string") {
   throw new Error("Invalid token payload")
  }

  return decoded
 }
}