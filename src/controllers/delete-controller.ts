import { Response, Request } from 'express';
import { deleteUser } from '../models/index.js';
import { userExist, validId } from './controller-error-handling.js';

export const deleteUserId = async (req: Request, res: Response) => {
  const checkUser = req.params
  const user_id = req.params.user_id;
  validId(user_id)
  const convertedUserIdToNumber = Number(user_id);
  const user = await deleteUser(convertedUserIdToNumber);
  userExist(user)
  res.send(user);
};
