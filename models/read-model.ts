import { sql } from 'drizzle-orm';
import db from '../db/connection';
import { users } from '../db/data/schema/users';
import { scores } from '../db/data/schema/scores';
import { desc } from 'drizzle-orm';

export const readUsers = async () => {
  return await db.select().from(users);
};

export const readUser = async (user_id: string) => {
  return await db
    .select()
    .from(users)
    .where(sql`${users.user_id} = ${user_id}`);
};

export const readScores = async () => {
  const dbScore = await db.select().from(scores).orderBy(desc(scores.score));

  return { scores: dbScore };
};
