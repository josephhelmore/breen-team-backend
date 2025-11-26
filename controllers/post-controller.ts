import { Response, Request } from 'express';
import { createUser } from '../models/create-model';
import { createScore } from '../models';

export const postUser = async (req: Request, res: Response) => {
  const { username }: { username: string } = req.body

  const [resUsername] = await createUser(username)

  return res.status(201).send({ user: resUsername })
}

export const postScore = async (req: Request, res: Response) => {
  const { score, user_id, username } = req.body;
  const { gameid } = req.params;
  const game_id = Number(gameid);

  const [resScore] = await createScore(score, user_id, username, game_id);

  return res.status(201).send({ score: resScore });
};
