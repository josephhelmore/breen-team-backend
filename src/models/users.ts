import { eq } from 'drizzle-orm';
import db from '../db/connection.js';
import { users } from '../db/data/schema.js';

export const readUsers = async () => {
  return await db.select().from(users);
};

export const readUser = async (user_id: number) => {
  return await db.select().from(users).where(eq(users.user_id, user_id));
};

export const readUserIdByUsername = async (username: string): Promise<{ user_id: number }[]> => {
  return await db
    .select({ user_id: users.user_id })
    .from(users)
    .where(eq(users.username, username));
};

export const createUser = async (username: string) => {
  return await db.insert(users).values({ username: username }).returning();
};

export const deleteUser = async (user_id: number) => {
  return await db.delete(users).where(eq(users.user_id, user_id)).returning();
};
