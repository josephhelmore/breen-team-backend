import { scores, games, users } from '../data/schema.js';
import db from '../connection.js';
import { sql } from 'drizzle-orm';
import { Score, User, Game } from '../../types/index.js';

export const seed = async ({
  usersData,
  scoresData,
  gamesData
}: {
  scoresData: Score[];
  usersData: User[];
  gamesData: Game[];
}) => {
  await db.delete(users);
  await db.delete(games);
  await db.delete(scores);
  await db.execute(sql`ALTER SEQUENCE users_user_id_seq RESTART WITH 1;`);
  await db.execute(sql`ALTER SEQUENCE scores_score_id_seq RESTART WITH 1`);
  await db.execute(sql`ALTER SEQUENCE games_game_id_seq RESTART WITH 1`);
  await db.insert(users).values(usersData);
  await db.insert(games).values(gamesData);
  await db.insert(scores).values(scoresData);
};
