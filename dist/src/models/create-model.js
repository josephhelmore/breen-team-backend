import db from '../db/connection';
import { users } from '../db/data/schema.js';
import { scores } from '../db/data/schema.js';
export const createUser = async (username) => {
    return await db.insert(users).values({ username: username }).returning();
};
export const createScore = async (score, user_id, username, game_id) => {
    return await db
        .insert(scores)
        .values({ score: score, user_id: user_id, username: username, game_id: game_id })
        .returning();
};
//# sourceMappingURL=create-model.js.map