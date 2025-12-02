import { Response, Request } from 'express';
import { updateUser } from '../models/index.js';

export const patchUser = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { username } = req.body;

  const num_user_id = Number(user_id);

  const [resUser] = await updateUser(num_user_id, username);

  return res.send({ user: resUser });
};
