import { users } from '../data/schema/users';
import { games } from '../data/schema/games';
import { scores } from '../data/schema/scores';
import db from '../connection';

export const seedAPI = async ({ usersData, scoresData, gamesData }) => {
  await db.insert(users).values(usersData);
  await db.insert(games).values(gamesData);
  await db.insert(scores).values(scoresData);
};
