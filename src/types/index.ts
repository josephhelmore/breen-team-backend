export type User = {
  user_id: number;
  username: string;
  created_on: string;
  google_id?: string;
};

export type Score = {
  score_id?: number;
  score: number;
  user_id: number;
  username: string;
  game_id: number;
  created_on?: string;
};

export type Game = {
  game_id?: number;
  name: string;
};
