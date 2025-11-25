import express from 'express';
import cors from 'cors';
import { getScores } from './controllers';

const app = express();

app.use(cors());
app.use(express.json());

// app.get('/api/users', findAllUsers);

app.get('/api/scores', getScores);

export default app;
