import type { Request } from 'express';

export type User = {
  user_id?: number;
  username: string;
  created_on?: string;
  google_id?: string;
  email?: string;
  avatar_url?: string;
  bio?: string;
};

export type AuthUser = {
  google_id: string;
  iat: number;
  exp: number;
};

export type Score = {
  score_id?: number;
  score: number;
  user_id: number;
  username?: string;
  game_id: number;
  created_on?: string;
  rank?: number;
};

export type Game = {
  game_id?: number;
  name: string;
};

export interface RequestWithUser extends Request {
  user?: AuthUser;
}
