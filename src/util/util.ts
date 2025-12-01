import { Score } from '../types/index.js';

export const addRankToScores = (scores: Score[]): Score[] => {
  return scores.map((score: Score, index) => {
    if (index > 0 && score.score === scores[index - 1].score) {
      const { rank } = scores.find(comparedScore => {
        return comparedScore.score === score.score;
      });

      score.rank = rank;
    } else score.rank = index + 1;

    return score;
  });
};
