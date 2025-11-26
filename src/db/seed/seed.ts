import { users } from '../data/schema/users';
import { games } from '../data/schema/games';
import { scores } from '../data/schema/scores';
import db from '../connection';

export type ScoresType = {
  score: number;
  user_id: number;
  username: string;
  game_id: number;
}[];

export type usersType = {
  username: string;
}[];

export type gamesType = {
  name: string;
}[];

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
