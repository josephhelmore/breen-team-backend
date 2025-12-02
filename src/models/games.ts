import { eq } from 'drizzle-orm';
import db from '../db/connection.js';
import { games } from '../db//data/schema.js';
import { Game } from '../types/index.js';

export const readGames = async (): Promise<Game[]> => {
  return await db.select().from(games);
};

export const readGame = async (game_id: number): Promise<Game[]> =>
  db.select().from(games).where(eq(games.game_id, game_id));

export const createGame = async (name: string): Promise<Game> => {
  const [game] = await db.insert(games).values({ name: name }).returning();
  return game;
};

export const deleteGameByGameId = async (game_id: number): Promise<Game[]> => {
  return await db.delete(games).where(eq(games.game_id, game_id)).returning();
};
