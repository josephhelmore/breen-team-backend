import { pgTable, integer, varchar, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import { games } from './games';
import { relations } from 'drizzle-orm';

export const scores = pgTable('scores', {
  score_id: integer('score_id').primaryKey().notNull(),
  score: integer('score').notNull(),
  user_id: integer('user_id')
    .notNull()
    .references(() => users.user_id, { onDelete: 'cascade' }),
  username: varchar('username', { length: 255 })
    .notNull()
    .references(() => users.username, { onDelete: 'cascade' }),
  game_id: integer('game_id')
    .notNull()
    .references(() => games.game_id, { onDelete: 'cascade' }),
  created_on: timestamp('created_on').defaultNow().notNull()
});

export const scoresRelations = relations(scores, ({ one }) => ({
  user: one(users, {
    fields: [scores.username],
    references: [users.username],
  }),
  game: one(games, {
    fields: [scores.game_id],
    references: [games.game_id],
  }),
}));


