import db from '../connection';
import { scores, games, users } from '../data/schema.js';
import { seed } from 'drizzle-seed';

async function seedTable(count?: number) {
  await seed(db, { users, scores, games }, { count: count || 10 });
}

export default seedTable;
