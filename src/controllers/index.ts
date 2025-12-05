import { getScores, getUsers, getUser, getScoresByScoreId, getGames } from './get-controller.js';
import { postGuestUserAndPostScore, postUser, postGames } from './post-controller.js';
import { deleteGames, deleteUser, deleteUserProfile } from './delete-controller.js';
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
  deleteUser,
  deleteUserProfile
};
