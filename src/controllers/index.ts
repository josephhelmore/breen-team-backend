import { getScores, getUsers, getUser, getScoresByScoreId, getGames } from './get-controller.js';
import { postGuestUserAndPostScore, postUser, postGames } from './post-controller.js';
import { deleteGames, deleteUser } from './delete-controller.js';
import { patchUser } from './patch-controller.js';

export {
  getScores,
  getScoresByScoreId,
  postGuestUserAndPostScore,
  getUser,
  getUsers,
  postUser,
  getGames,
  postGames,
  patchUser,
  deleteGames,
  deleteUser
};
