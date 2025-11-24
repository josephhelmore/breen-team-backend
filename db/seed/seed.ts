import db from '../connection';
import { users } from '../data/schema/users';
import { scores } from '../data/schema/scores';
import { games } from '../data/schema/games';
import { seed } from 'drizzle-seed';

async function seedTable() {
  // const user: typeof users.$inferInsert = {
  //     username: 'gilson'
  // }
  // await db.insert(users).values(user)
  await seed(db, { scores, users, games });
}

export default seedTable;
