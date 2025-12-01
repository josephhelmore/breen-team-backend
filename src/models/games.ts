import db from '../db/connection.js';
import { games } from '../db//data/schema.js';
import { Game } from '../types/index.js';

export const readGames = async (): Promise<Game[]> => {
  return await db.select().from(games);
};

export const createGame = async (name: string): Promise<Game> => {
  const [game] = await db.insert(games).values({ name: name }).returning();
  return game;
};
