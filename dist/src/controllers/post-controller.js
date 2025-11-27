import { createUser } from '../models/create-model';
import { createScore } from '../models/index';
export const postUser = async (req, res) => {
    const { username } = req.body;
    const [resUsername] = await createUser(username);
    return res.status(201).send({ user: resUsername });
};
export const postScore = async (req, res) => {
    const { score, user_id, username } = req.body;
    const { gameid } = req.params;
    const game_id = Number(gameid);
    const [resScore] = await createScore(score, user_id, username, game_id);
    return res.status(201).send({ score: resScore });
};
//# sourceMappingURL=post-controller.js.map