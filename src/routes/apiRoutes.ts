import { Router } from 'express';
import {
  getUser,
  getUsers,
  getScores,
  postGuestUserAndPostScore,
  getScoresByScoreId,
  getGames,
  postGames,
  deleteGames,
  postUser,
  patchUser,
  deleteUser
} from '../controllers/index.js';

export const apiRoutes = Router();

apiRoutes.route('/users').get(getUsers).post(postUser);

apiRoutes.route('/users/:user_id').get(getUser).patch(patchUser).delete(deleteUser);

apiRoutes.route('/games').get(getGames).post(postGames);

apiRoutes.delete('/games/:game_id', deleteGames);

apiRoutes.route('/games/:game_id/scores/').get(getScores).post(postGuestUserAndPostScore);

apiRoutes.get('/games/:game_id/scores/:score_id', getScoresByScoreId);
