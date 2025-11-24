import { pgTable, integer, varchar, timestamp } from 'drizzle-orm/pg-core';
import {users}  from "./users"
import { games } from "./games"

 export const scores = pgTable('scores', {
  score_id: integer().primaryKey().notNull(),
  score: integer().notNull(),
  user_id: integer().notNull().references(()=>users.user_id, {onDelete:'cascade'}),
  //username: varchar().notNull().references(()=>users.username),
  game_id: integer().notNull().references(()=>games.id, {onDelete:'cascade'}),
  created_on: timestamp().defaultNow().notNull()
});

