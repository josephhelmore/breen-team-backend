import { eq } from 'drizzle-orm';
import db from '../db/connection.js';
import { users, scores, games } from '../db/data/schema.js';
import { Score } from '../types/index.js';
import { desc } from 'drizzle-orm';

export const readUsers = async () => {
  return await db.select().from(users);
};

export const readUser = async (user_id: number) => {
  return await db.select().from(users).where(eq(users.user_id, user_id));
};

export const readUserIdByUsername = async (username: string) => {
  return await db
    .select({ user_id: users.user_id })
    .from(users)
    .where(eq(users.username, username));
};

export const readScores = async (page: number) => {

  const limit = 10;

  const dbScores = await db.select().from(scores).orderBy(desc(scores.score));

  const paginatedScores = dbScores.reduce(
    (acc: { [key: number]: Score[] }, cur) => {
      const currentPage = Object.keys(acc).length;
      if (acc[currentPage]!.length < limit) {
        acc[currentPage]!.push(cur);
      } else {
        acc[currentPage + 1] = [cur];
      }
      return acc;
    },
    { 1: [] }
  );

  return { scores: paginatedScores[page], page: page };
};

export const readGame = async (game_id: number) => db.select().from(games).where(eq(games.game_id, game_id))