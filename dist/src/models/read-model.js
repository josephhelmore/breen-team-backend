import { eq } from 'drizzle-orm';
import db from '../db/connection.js';
import { users } from '../db/data/schema.js';
import { scores } from '../db/data/schema.js';
import { desc } from 'drizzle-orm';
export const readUsers = async () => {
    return await db.select().from(users);
};
export const readUser = async (user_id) => {
    return await db.select().from(users).where(eq(users.user_id, user_id));
};
export const readScores = async (page) => {
    const limit = 10;
    const dbScores = await db.select().from(scores).orderBy(desc(scores.score));
    const paginatedScores = dbScores.reduce((acc, cur) => {
        const currentPage = Object.keys(acc).length;
        if (acc[currentPage].length < limit) {
            acc[currentPage].push(cur);
        }
        else {
            acc[currentPage + 1] = [cur];
        }
        return acc;
    }, { 1: [] });
    return { scores: paginatedScores[page], page: page };
};
//# sourceMappingURL=read-model.js.map