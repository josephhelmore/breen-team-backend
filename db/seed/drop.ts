import db from '../connection';
import { users } from '../data/schema/users';
import { scores } from '../data/schema/scores';
import { games } from '../data/schema/games';
import { seed } from 'drizzle-seed';

async function dropTable() {
  await db.delete(users);
  await db.delete(scores);
  await db.delete(games);
}

export default dropTable;
