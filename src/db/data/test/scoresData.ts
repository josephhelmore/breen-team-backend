const scoresData = [
  {
    score: 100,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 200,
    user_id: 2,
    username: 'testUser2',
    game_id: 1
  },
  {
    score: 300,
    user_id: 3,
    username: 'testUser3',
    game_id: 3
  },
  {
    score: 400,
    user_id: 1,
    username: 'testUser1',
    game_id: 2
  },
  {
    score: 500,
    user_id: 2,
    username: 'testUser2',
    game_id: 5
  },
  {
    score: 600,
    user_id: 3,
    username: 'testUser3',
    game_id: 1
  },
  {
    score: 100,
    user_id: 3,
    username: 'testUser3',
    game_id: 1
  },
  {
    score: 700,
    user_id: 4,
    username: 'testUser4',
    game_id: 2
  },
  {
    score: 800,
    user_id: 5,
    username: 'testUser5',
    game_id: 3
  },
  {
    score: 900,
    user_id: 2,
    username: 'testUser2',
    game_id: 4
  },
  {
    score: 1000,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 1100,
    user_id: 1,
    username: 'testUser1',
    game_id: 2
  },
  {
    score: 1200,
    user_id: 6,
    username: 'testUser6',
    game_id: 3
  },
  {
    score: 1300,
    user_id: 1,
    username: 'testUser1',
    game_id: 2
  },
  {
    score: 1400,
    user_id: 4,
    username: 'testUser4',
    game_id: 1
  },
  {
    score: 1500,
    user_id: 6,
    username: 'testUser6',
    game_id: 4
  },
  {
    score: 1600,
    user_id: 2,
    username: 'testUser2',
    game_id: 1
  },
  {
    score: 1600,
    user_id: 4,
    username: 'testUser4',
    game_id: 1
  },
  {
    score: 1700,
    user_id: 2,
    username: 'testUser2',
    game_id: 1
  },
  {
    score: 1800,
    user_id: 4,
    username: 'testUser4',
    game_id: 1
  },
  {
    score: 1900,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 2000,
    user_id: 1,
    username: 'testUser1',
    game_id: 3
  },
  {
    score: 2100,
    user_id: 1,
    username: 'testUser1',
    game_id: 2
  },
  {
    score: 900,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 1300,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 1700,
    user_id: 1,
    username: 'testUser1',
    game_id: 3
  },
  {
    score: 1200,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 400,
    user_id: 1,
    username: 'testUser1',
    game_id: 2
  },
  {
    score: 600,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 400,
    user_id: 1,
    username: 'testUser1',
    game_id: 2
  },
  {
    score: 300,
    user_id: 1,
    username: 'testUser1',
    game_id: 4
  },
  {
    score: 500,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 900,
    user_id: 1,
    username: 'testUser1',
    game_id: 3
  },
  {
    score: 400,
    user_id: 1,
    username: 'testUser1',
    game_id: 3
  },
  {
    score: 2000,
    user_id: 1,
    username: 'testUser1',
    game_id: 2
  },
  {
    score: 1600,
    user_id: 1,
    username: 'testUser1',
    game_id: 2
  },
  {
    score: 1400,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 1700,
    user_id: 2,
    username: 'testUser2',
    game_id: 1
  },
  {
    score: 1800,
    user_id: 4,
    username: 'testUser4',
    game_id: 1
  },
  {
    score: 1900,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 2000,
    user_id: 1,
    username: 'testUser1',
    game_id: 3
  },
  {
    score: 2100,
    user_id: 1,
    username: 'testUser1',
    game_id: 2
  },
  {
    score: 900,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 1300,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 1700,
    user_id: 1,
    username: 'testUser1',
    game_id: 3
  },
  {
    score: 1200,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 1700,
    user_id: 2,
    username: 'testUser2',
    game_id: 1
  },
  {
    score: 1800,
    user_id: 4,
    username: 'testUser4',
    game_id: 1
  },
  {
    score: 1900,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 2000,
    user_id: 1,
    username: 'testUser1',
    game_id: 3
  },
  {
    score: 2100,
    user_id: 1,
    username: 'testUser1',
    game_id: 2
  },
  {
    score: 900,
    user_id: 8,
    username: 'testUser8',
    game_id: 5
  },
  {
    score: 1300,
    user_id: 8,
    username: 'testUser8',
    game_id: 4
  },
  {
    score: 1700,
    user_id: 8,
    username: 'testUser8',
    game_id: 4
  },
  {
    score: 1200,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 1700,
    user_id: 2,
    username: 'testUser2',
    game_id: 1
  },
  {
    score: 1800,
    user_id: 4,
    username: 'testUser4',
    game_id: 1
  },
  {
    score: 1900,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 2000,
    user_id: 1,
    username: 'testUser1',
    game_id: 3
  },
  {
    score: 2100,
    user_id: 1,
    username: 'testUser1',
    game_id: 2
  },
  {
    score: 900,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 1300,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 1700,
    user_id: 1,
    username: 'testUser1',
    game_id: 3
  },
  {
    score: 1200,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 1700,
    user_id: 2,
    username: 'testUser2',
    game_id: 1
  },
  {
    score: 1800,
    user_id: 4,
    username: 'testUser4',
    game_id: 1
  },
  {
    score: 1900,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 2000,
    user_id: 1,
    username: 'testUser1',
    game_id: 3
  },
  {
    score: 2100,
    user_id: 8,
    username: 'testUser8',
    game_id: 2
  },
  {
    score: 900,
    user_id: 8,
    username: 'testUser8',
    game_id: 1
  },
  {
    score: 1300,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 1700,
    user_id: 8,
    username: 'testUser8',
    game_id: 3
  },
  {
    score: 1200,
    user_id: 8,
    username: 'testUser8',
    game_id: 1
  },
  {
    score: 1700,
    user_id: 2,
    username: 'testUser2',
    game_id: 1
  },
  {
    score: 1800,
    user_id: 4,
    username: 'testUser4',
    game_id: 1
  },
  {
    score: 1900,
    user_id: 8,
    username: 'testUser8',
    game_id: 1
  },
  {
    score: 2000,
    user_id: 1,
    username: 'testUser1',
    game_id: 3
  },
  {
    score: 2100,
    user_id: 8,
    username: 'testUser8',
    game_id: 2
  },
  {
    score: 900,
    user_id: 8,
    username: 'testUser8',
    game_id: 2
  },
  {
    score: 1300,
    user_id: 8,
    username: 'testUser8',
    game_id: 1
  },
  {
    score: 1700,
    user_id: 1,
    username: 'testUser1',
    game_id: 3
  },
  {
    score: 1200,
    user_id: 8,
    username: 'testUser8',
    game_id: 1
  },
  {
    score: 1700,
    user_id: 2,
    username: 'testUser2',
    game_id: 1
  },
  {
    score: 1800,
    user_id: 4,
    username: 'testUser4',
    game_id: 3
  },
  {
    score: 1900,
    user_id: 1,
    username: 'testUser1',
    game_id: 1
  },
  {
    score: 2000,
    user_id: 1,
    username: 'testUser1',
    game_id: 3
  },
  {
    score: 2100,
    user_id: 1,
    username: 'testUser1',
    game_id: 2
  },
  {
    score: 900,
    user_id: 8,
    username: 'testUser8',
    game_id: 3
  },
  {
    score: 1300,
    user_id: 8,
    username: 'testUser8',
    game_id: 1
  },
  {
    score: 1700,
    user_id: 8,
    username: 'testUser8',
    game_id: 3
  },
  {
    score: 1200,
    user_id: 8,
    username: 'testUser8',
    game_id: 1
  }
];

export default scoresData;
