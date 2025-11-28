import { scores, games, users } from '../data/schema.js';
import db from '../connection.js';

import { Score, User, Game } from '../../types/index.js';

export const seed = async ({
  usersData,
  scoresData,
  gamesData
}: {
  scoresData: Score[];
  usersData: User[];
  gamesData: Game[];
}) => {
  await db.insert(users).values(usersData);
  await db.insert(games).values(gamesData);
  await db.insert(scores).values(scoresData);
};
