import { Response, Request } from 'express';
import { deleteUserById, deleteGameByGameId, readUser } from '../models/index.js';
import { isValid, userExist } from './controller-error-handling.js';

export const deleteUser = async (req: Request, res: Response) => {
  const user_id = req.params.user_id;
  isValid(user_id);
  const convertedUserIdToNumber = Number(user_id);
  const user = await readUser(convertedUserIdToNumber);
  userExist(user);
  const [deletedUser] = await deleteUserById(convertedUserIdToNumber);
  return res.send({ user: deletedUser });
};

export const deleteGames = async (req: Request, res: Response) => {
  const { game_id } = req.params;

  const [game] = await deleteGameByGameId(Number(game_id));

  return res.send({ game: game });
};
