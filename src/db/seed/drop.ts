import db from '../connection.js';
import { scores, games, users } from '../data/schema.js';
import { sql } from 'drizzle-orm';

async function dropTable() {
  await db.delete(users);
  await db.delete(scores);
  await db.delete(games);
  await db.execute(sql`ALTER SEQUENCE users_user_id_seq RESTART WITH 1;`);
  await db.execute(sql`ALTER SEQUENCE scores_score_id_seq RESTART WITH 1`);
  await db.execute(sql`ALTER SEQUENCE games_game_id_seq RESTART WITH 1`);
}

export default dropTable;
