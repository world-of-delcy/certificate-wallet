import bcrypt from "bcrypt";

import { client, excludePassword } from ".";

export async function login(email: string, password: string) {
  const user = await client.users.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return new Error("User not found");
  }
  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    return new Error("Invalid Password");
  }
  return excludePassword(user);
}

export async function register(email: string, name: string, password: string) {
  const user = await client.users.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    return new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await client.users.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
  return excludePassword(newUser);
}
