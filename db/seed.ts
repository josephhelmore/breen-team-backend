import { users } from './data/schema/users';
import db from './connection';

export async function seed() {
    const user: typeof users.$inferInsert = {
        username: 'Gilson'
    }

    await db.insert(users).values(user);
    console.log('New user created!')

}

