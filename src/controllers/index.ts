import { getScores, getUsers, getUser, getScoresByScoreId, getGames } from './get-controller.js';
import { postGuestUserAndPostScore, postUser, postGames } from './post-controller.js';
import { deleteGames } from './delete-controller.js';

export {
  getScores,
  getScoresByScoreId,
  postGuestUserAndPostScore,
  getUser,
  getUsers,
  postUser,
  getGames,
  postGames,
  deleteGames
};
