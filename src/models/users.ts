import { eq } from 'drizzle-orm';
import db from '../db/connection.js';
import { users } from '../db/data/schema.js';
import { User } from '../types/index.js';

export const readUsers = async (): Promise<User[]> => await db.select().from(users);

export const readUserByGoogleId = async (google_id: string): Promise<User[]> => {
  return await db
    .select({
      user_id: users.user_id,
      username: users.username,
      avatar_url: users.avatar_url,
      email: users.email,
      bio: users.bio
    })
    .from(users)
    .where(eq(users.google_id, google_id));
};

export const readUserByUserId = async (user_id: number): Promise<User[]> =>
  await db.select().from(users).where(eq(users.user_id, user_id));

export const readUserIdByUsername = async (username: string): Promise<{ user_id: number }[]> =>
  await db.select({ user_id: users.user_id }).from(users).where(eq(users.username, username));

export const createUser = async (username: string): Promise<User[]> => {
  try {
    return await db.insert(users).values({ username: username }).returning();
  } catch (err) {
    if (err.cause.code === '23505' && err.cause.constraint === 'users_username_unique') {
      throw {
        status: 400,
        message: 'Username already exists'
      };
    } else {
      throw err;
    }
  }
};

export const updateUser = async (user_id: number, username: string): Promise<User[]> => {
  try {
    return await db
      .update(users)
      .set({ username: username })
      .where(eq(users.user_id, user_id))
      .returning();
  } catch (err) {
    if (err.cause.code === '23505' && err.cause.constraint === 'users_username_unique') {
      throw {
        status: 400,
        message: 'Username already exists'
      };
    } else {
      throw err;
    }
  }
};

export const deleteUserById = async (user_id: number): Promise<User[]> =>
  await db.delete(users).where(eq(users.user_id, user_id)).returning();
