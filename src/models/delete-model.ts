import { eq } from 'drizzle-orm';
import db from '../db/connection.js';
import { users, games } from '../db/data/schema.js';

export const deleteUser = async (user_id: number) => {
  return await db.delete(users).where(eq(users.user_id, user_id)).returning();
};

export const deleteGameByGameId = async (game_id: number) => {
  return await db.delete(games).where(eq(games.game_id, game_id)).returning();
};
