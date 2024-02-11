import { PrismaClient, Users } from "@prisma/client";
import { UserWithoutPassword } from "../../types";

class Prisma {
  static client: PrismaClient;
  static getPrismaClient() {
    if (!Prisma.client) {
      Prisma.client = new PrismaClient();
    }
    return Prisma.client;
  }
}

export const client = Prisma.getPrismaClient();

export function excludePassword(user: Users): UserWithoutPassword {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

import * as authModule from "./auth";
import * as usersModule from "./users";
import * as certificatesModule from "./certificates";
import * as categoryModule from "./category";
export default {
  ...usersModule,
  ...authModule,
  ...certificatesModule,
  ...categoryModule,
};
