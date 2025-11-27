import { scores, games, users } from '../data/schema.js';
import db from '../connection';
export const seed = async ({ usersData, scoresData, gamesData }) => {
    await db.insert(users).values(usersData);
    await db.insert(games).values(gamesData);
    await db.insert(scores).values(scoresData);
};
//# sourceMappingURL=seed.js.map