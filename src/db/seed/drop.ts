import db from '../connection.js';
import { scores, games, users } from '../data/schema.js';

async function dropTable() {
  await db.delete(users);
  await db.delete(scores);
  await db.delete(games);
}

export default dropTable;
