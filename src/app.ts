import express from 'express';
import { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import { getUser, getUsers } from './controllers/get-controller.js';
import { deleteUserId } from './controllers/delete-controller.js';
import { postUser } from './controllers/post-controller.js';
import { getScores, postScore } from './controllers/index.js';
import { ControllerError } from './controllers/controller-error-handling.js';

const app = express();

app.use(cors());
app.use(express.json());


app.get('/api/users', getUsers);

app.get('/api/users/:user_id', getUser);

app.get('/api/games/:gameid/scores', getScores);

app.post('/api/games/:gameid/scores', postScore);

app.post('/api/users', postUser);

app.delete('/api/users/:user_id', deleteUserId);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.status) {
    return res.status(error.status).json({
      error: error.name || 'CustomError',
      message: error.message,
      cause: error.cause
    });
  }

  if (error.code === "22P02") {
    return res.status(400).json({
      error: "Bad Request",
      message: "Please enter a valid user_id"
    });
  }

  if (error instanceof ControllerError) {
    return res.status(500).json({
      error: error.name,
      message: error.message,
      cause: error.cause
    });
  }

  return res.status(500).json({
    error: 'unknown error',
    message: error.message || 'An error occurred'
  });
});

export default app;
