import { client, excludePassword } from ".";

export async function getUser(id: string) {
  // Get user from database
  const user = await client.users.findUnique({
    where: {
      id,
    },
  });
  return user ? excludePassword(user) : null;
}

export async function getUserByEmail(email: string) {
  const user = await client.users.findUnique({
    where: {
      email,
    },
  });
  return user ? excludePassword(user) : null;
}
