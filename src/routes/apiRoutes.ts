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

apiRoutes.get('/users', getUsers);

apiRoutes.get('/users/:user_id', getUser);

apiRoutes.patch('/users/:user_id', patchUser);

apiRoutes.get('/games', getGames);

apiRoutes.post('/games', postGames);

apiRoutes.delete('/games/:game_id', deleteGames);

apiRoutes.get('/games/:game_id/scores/', getScores);

apiRoutes.get('/games/:game_id/scores/:score_id', getScoresByScoreId);

apiRoutes.post('/games/:game_id/scores', postGuestUserAndPostScore);

apiRoutes.post('/users', postUser);

apiRoutes.delete('/users/:user_id', deleteUser);
