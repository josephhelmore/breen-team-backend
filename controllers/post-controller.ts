import { Response, Request } from 'express';
import { createUser } from '../models/create-model';

export const postUser = (req: Request, res: Response) => {
    const { username }: { username: string } = req.body

    return createUser(username).then(user => {
        return res.status(201).send({ user: user[0] })
    })
import { createScore } from '../models';

export const postScore = async (req: Request, res: Response) => {
  const { score, user_id, username, game_id } = req.body;

  const [resScore] = await createScore(score, user_id, username, game_id);

  console.log(resScore);

  return res.status(201).send({ score: resScore });
};
