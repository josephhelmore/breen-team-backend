import { relations } from "drizzle-orm/relations";
import { users, scores, games } from "./schema";

export const scoresRelations = relations(scores, ({one}) => ({
	user_userId: one(users, {
		fields: [scores.userId],
		references: [users.userId],
		relationName: "scores_userId_users_userId"
	}),
	user_username: one(users, {
		fields: [scores.username],
		references: [users.username],
		relationName: "scores_username_users_username"
	}),
	game: one(games, {
		fields: [scores.gameId],
		references: [games.gameId]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	scores_userId: many(scores, {
		relationName: "scores_userId_users_userId"
	}),
	scores_username: many(scores, {
		relationName: "scores_username_users_username"
	}),
}));

export const gamesRelations = relations(games, ({many}) => ({
	scores: many(scores),
}));