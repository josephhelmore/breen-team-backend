export type User = {
  username: string;
  user_id?: number;
  created_on?: string;
};

export type Score = {
  score_id?: number;
  score: number;
  user_id: number;
  username: string;
  game_id: number;
  created_on?: string;
  rank?: number;
};

export type Game = {
  game_id?: number;
  name: string;
};
