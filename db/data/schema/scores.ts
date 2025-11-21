const { pgTable, integer, varchar, int, timestamp } = require('drizzle-orm/pg-core');
const users = require("./users")
const games = require("./games")

 const scores = pgTable('scores', {
  score_id: integer().primaryKey().notNull(),
  score: int().notNull(),
  user_id: int().refernces(()=>users.user_id).notNull(),
  username: varchar().notNull().refernces(()=>users.username),
  game_id: int().notNull().refernces(()=>games.game_id),
  created_on: timestamp().defaultNow().notNull()
});

module.exports = scores
