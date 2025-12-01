import { Score } from '../types/index.js';

export const addRankToScores = (scores: Score[]): Score[] => {
  return scores.map((score: Score, index) => {
    score.rank = index + 1;
    return score;
  });
};
