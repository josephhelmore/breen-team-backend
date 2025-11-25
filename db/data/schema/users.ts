import { relations } from 'drizzle-orm';
import { pgTable, varchar, timestamp, serial } from 'drizzle-orm/pg-core';
import { scores } from './scores';

export const users = pgTable('users', {
  user_id: serial('user_id').primaryKey().notNull(),
  username: varchar('username').notNull().unique(),
  created_on: timestamp('created_on').defaultNow().notNull()
});

export const usersRelations = relations(users, ({ many }) => ({
  scores: many(scores),
}));
