import { relations } from 'drizzle-orm';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { scores } from './scores';

export const games = pgTable('games', {
  game_id: serial('game_id').primaryKey().notNull(),
  name: varchar('name').notNull()
});

export const gamesRelations = relations(games, ({ many }) => ({
  scores: many(scores)
}));
