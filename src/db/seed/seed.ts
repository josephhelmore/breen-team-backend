import { scores, games, users } from '../data/schema.js';
import db from '../connection.js';

import { ScoresType, usersType, gamesType } from '../../types/index.js';

export const seed = async ({
  usersData,
  scoresData,
  gamesData
}: {
  scoresData: ScoresType;
  usersData: usersType;
  gamesData: gamesType;
}) => {
  await db.insert(users).values(usersData);
  await db.insert(games).values(gamesData);
  await db.insert(scores).values(scoresData);
};
