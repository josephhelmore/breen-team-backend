import express from 'express';
import cors from 'cors';
import { getUser, getUsers } from './controllers/get-controller';
import { deleteUserId } from './controllers/delete-controller';
import { postUser } from './controllers/post-controller';
import { getScores, postScore } from './controllers';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/users', getUsers);
app.get('/api/users/:user_id', getUser);
app.get('/api/scores', getScores);

app.post('/api/games/:gameid/scores', postScore);

app.use((err, req, res, next) => {
  console.log(err);
});
app.post('/api/users', postUser)

app.delete('/api/users/:user_id', deleteUserId);
export default app;
