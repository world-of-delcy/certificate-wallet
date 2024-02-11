import { Users } from "@prisma/client";
import { Request } from "express";

export type UserWithoutPassword = Omit<Users, "password">;

declare global {
  namespace Express {
    interface Request {
      user: UserWithoutPassword;
    }
  }
}
