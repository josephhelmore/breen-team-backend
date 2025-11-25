import { Response, Request } from 'express';
import { createUser } from '../models/create-model';

export const postUser = (req: Request, res: Response) => {
    const { username }: { username: string } = req.body

    return createUser(username).then(user => {
        return res.status(201).send({ user: user[0] })
    }).catch(err => console.log(err))
};
