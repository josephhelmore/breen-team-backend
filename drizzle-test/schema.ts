import { pgTable, unique, serial, varchar, timestamp, foreignKey, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	userId: serial("user_id").primaryKey().notNull(),
	username: varchar().notNull(),
	createdOn: timestamp("created_on", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("users_username_unique").on(table.username),
]);

export const scores = pgTable("scores", {
	scoreId: serial("score_id").primaryKey().notNull(),
	score: integer().notNull(),
	userId: integer("user_id").notNull(),
	username: varchar({ length: 255 }).notNull(),
	gameId: integer("game_id").notNull(),
	createdOn: timestamp("created_on", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.userId],
			name: "scores_user_id_users_user_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.username],
			foreignColumns: [users.username],
			name: "scores_username_users_username_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.gameId],
			foreignColumns: [games.gameId],
			name: "scores_game_id_games_game_id_fk"
		}).onDelete("cascade"),
]);

export const games = pgTable("games", {
	gameId: serial("game_id").primaryKey().notNull(),
	name: varchar().notNull(),
});
