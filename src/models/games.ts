import { eq } from 'drizzle-orm';
import db from '../db/connection.js';
import { games } from '../db//data/schema.js';
import { Game } from '../types/index.js';

export const readGames = async (): Promise<Game[]> => await db.select().from(games);

export const readGame = async (game_id: number): Promise<Game[]> =>
  await db.select().from(games).where(eq(games.game_id, game_id));

export const createGame = async (name: string): Promise<Game[]> =>
  await db.insert(games).values({ name: name }).returning();

export const deleteGameByGameId = async (game_id: number): Promise<Game[]> =>
  await db.delete(games).where(eq(games.game_id, game_id)).returning();
