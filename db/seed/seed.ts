import db from '../connection';
import { users, } from '../data/schema/users';
import { scores } from '../data/schema/scores';
import { games } from '../data/schema/games';
import { seed } from 'drizzle-seed';

async function seedTable() {

  await seed(db, { users, scores, games });
}

export default seedTable;
