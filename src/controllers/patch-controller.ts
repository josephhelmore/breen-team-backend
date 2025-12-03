import { Response } from 'express';
import { RequestWithUser } from '../types/index.js';
import { updateUser } from '../models/index.js';

export const patchUser = async (req: RequestWithUser, res: Response) => {
  const { google_id } = req.user;
  const { username, bio } = req.body;

  const [resUser] = await updateUser(google_id, username, bio);

  return res.send({
    user: {
      username: resUser.username,
      bio: resUser.bio,
      google_id: resUser.google_id,
      email: resUser.email,
      avatar_url: resUser.avatar_url
    }
  });
};
