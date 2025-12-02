import { eq } from 'drizzle-orm';
import db from '../db/connection.js';
import { scores } from '../db/data/schema.js';
import { Score } from '../types/index.js';
import { desc, asc } from 'drizzle-orm';
import { addRankToScores } from '../util/util.js';

export const readScores = async (
  page: number,
  game_id: number
): Promise<{ scores: Score[]; page?: number }> => {
  const limit = 10;

  const dbScores: Score[] =
    game_id === 1
      ? await db
          .select()
          .from(scores)
          .where(eq(scores.game_id, game_id))
          .orderBy(desc(scores.score))
      : await db
          .select()
          .from(scores)
          .where(eq(scores.game_id, game_id))
          .orderBy(asc(scores.score));

  const rankedScores = addRankToScores(dbScores);

  const paginatedScores = rankedScores.reduce(
    (acc: { [key: number]: Score[] }, cur) => {
      const currentPage = Object.keys(acc).length;
      if (acc[currentPage]!.length < limit) {
        acc[currentPage]!.push(cur);
      } else {
        acc[currentPage + 1] = [cur];
      }
      return acc;
    },
    { 1: [] }
  );

  return { scores: paginatedScores[page], page: page };
};

export const readScoresByScoreId = async (
  score_id: number,
  game_id: number
): Promise<{ scores: Score[] }> => {
  const dbScores: Score[] =
    game_id === 1
      ? await db
          .select()
          .from(scores)
          .where(eq(scores.game_id, game_id))
          .orderBy(desc(scores.score))
      : await db
          .select()
          .from(scores)
          .where(eq(scores.game_id, game_id))
          .orderBy(asc(scores.score));

  const rankedScores = addRankToScores(dbScores);

  if (rankedScores.length < 10) {
    return { scores: rankedScores };
  }

  const indexOfScoreId = rankedScores.findIndex(score => score.score_id === score_id);
  const topOverflow = indexOfScoreId < 4 ? 4 - indexOfScoreId : 0;
  const botOverflow =
    dbScores.length - indexOfScoreId < 6 ? 6 - (dbScores.length - indexOfScoreId) : 0;

  const scoreIdPage = dbScores.slice(
    indexOfScoreId - (4 - topOverflow + botOverflow),
    indexOfScoreId + (6 + topOverflow - botOverflow)
  );

  return { scores: scoreIdPage };
};

export const readScore = async (score_id: number): Promise<Score[]> =>
  await db.select().from(scores).where(eq(scores.score_id, score_id));

export const createScore = async (
  score: number,
  user_id: number,
  username: string,
  game_id: number
): Promise<Score[]> =>
  await db
    .insert(scores)
    .values({ score: score, user_id: user_id, username: username, game_id: game_id })
    .returning();
