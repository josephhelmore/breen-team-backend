import db from '../db/connection';
import { users } from '../db/data/schema/users';
import { scores } from '../db/data/schema/scores';

export const createUser = async (username: string) => {
  return await db.insert(users).values({ username: username }).returning()
}

export const createScore = async (
  score: number,
  user_id: number,
  username: string,
  game_id: number
) => {
  return await db
    .insert(scores)
    .values({ score: score, user_id: user_id, username: username, game_id: game_id })
    .returning();
};
